"use client";

import { useEffect, useRef, useState } from "react";
import { searchIndex, type SearchEntry } from "@/lib/content/searchIndex";

/** Corpus embeddings are cached at module scope, not component state — the
 *  App Router remounts `SiteNav` (and this) on every route change (no shared
 *  layout wraps it), but this module stays warm for the life of the tab, so
 *  the ~30-item corpus is only ever embedded once per visit, not per page. */
type CorpusEntry = { entry: SearchEntry; vector: Float32Array };
let corpusCache: CorpusEntry[] | null = null;
let corpusCachePromise: Promise<CorpusEntry[]> | null = null;

async function getCorpusEmbeddings(): Promise<CorpusEntry[]> {
  if (corpusCache) return corpusCache;
  if (!corpusCachePromise) {
    corpusCachePromise = (async () => {
      const { embedBatch } = await import("@/lib/search/embeddings");
      const texts = searchIndex.map((e) => `${e.label}. ${e.description}`);
      const vectors = await embedBatch(texts);
      corpusCache = searchIndex.map((entry, i) => ({ entry, vector: vectors[i] }));
      return corpusCache;
    })();
  }
  return corpusCachePromise;
}

function substringMatch(query: string): SearchEntry[] {
  const q = query.toLowerCase();
  return searchIndex.filter((e) => e.label.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
}

function SoonTag() {
  return (
    <span
      style={{
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: "var(--color-text-muted)",
        background: "rgba(10, 28, 30, 0.06)",
        borderRadius: "3px",
        padding: "2px 6px",
        marginLeft: "8px",
      }}
    >
      Soon
    </span>
  );
}

/**
 * Mounted only while open — `SiteNav` renders `{searchOpen && <SiteSearch/>}`,
 * so every `useState` here starts fresh on open rather than needing an
 * effect to reset it (an effect that calls `setState` synchronously in its
 * own body is a lint error here — `react-hooks/set-state-in-effect` — and
 * rightly so: it's one extra render for state a fresh mount gives for free).
 */
export function SiteSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [enhancing, setEnhancing] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqIdRef = useRef(0);

  // Autofocus and warm the model on mount — no setState here, just DOM focus
  // and kicking off (not awaiting) the embedding download.
  useEffect(() => {
    inputRef.current?.focus();
    getCorpusEmbeddings();
  }, []);

  function runSearch(value: string) {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!value.trim()) {
      setResults([]);
      setEnhancing(false);
      setActiveIndex(0);
      return;
    }

    // Instant substring pass — zero latency, so the list is never empty
    // while the model is still loading or a keystroke is in flight.
    setResults(substringMatch(value).slice(0, 8));
    setActiveIndex(0);
    setEnhancing(true);

    const myReq = ++reqIdRef.current;
    debounceRef.current = setTimeout(async () => {
      try {
        const corpus = await getCorpusEmbeddings();
        const { embed, cosineSimilarity } = await import("@/lib/search/embeddings");
        const qVec = await embed(value);
        if (myReq !== reqIdRef.current) return; // a newer keystroke superseded this request
        const ranked = corpus.map((c) => ({ entry: c.entry, score: cosineSimilarity(qVec, c.vector) })).sort((a, b) => b.score - a.score);
        // Opt-in only (`window.__SEARCH_DEBUG__ = true` in the console) —
        // raw cosine scores for threshold recalibration if the corpus grows
        // or the model changes. No-op in normal use.
        if (typeof window !== "undefined" && (window as unknown as { __SEARCH_DEBUG__?: boolean }).__SEARCH_DEBUG__) {
          console.log(`[search] "${value}" top scores:`, ranked.slice(0, 6).map((r) => `${r.entry.label}=${r.score.toFixed(3)}`));
        }
        // Calibrated empirically, not guessed: "hacked" → Breach Response
        // scores 0.231 (a genuinely correct match — MiniLM's cosine scale
        // for a short query against paragraph-length corpus text runs lower
        // than intuition suggests). 0.25 cut that off; 0.15 keeps it.
        const scored = ranked
          .filter((r) => r.score > 0.15)
          .slice(0, 8)
          .map((r) => r.entry);
        if (myReq === reqIdRef.current) {
          if (scored.length) {
            setResults(scored);
            setActiveIndex(0);
          }
          setEnhancing(false);
        }
      } catch {
        // Model failed to load (offline, blocked, etc.) — the instant
        // substring results already shown stand on their own.
        if (myReq === reqIdRef.current) setEnhancing(false);
      }
    }, 220);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        const r = results[activeIndex];
        if (r && r.status === "live") {
          window.location.href = r.href;
          onClose();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [results, activeIndex, onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1200,
        background: "rgba(8, 23, 25, 0.55)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "12vh",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#FFFFFF",
          width: "min(600px, 92vw)",
          borderRadius: "var(--radius-md)",
          boxShadow: "0 40px 80px rgba(0, 0, 0, 0.35)",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "18px 20px", borderBottom: "1px solid rgba(10, 28, 30, 0.08)" }}>
          <svg width="18" height="18" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" viewBox="0 0 24 24" aria-hidden>
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              const value = e.target.value;
              setQuery(value);
              runSearch(value);
            }}
            placeholder="Search services, sectors, resources…"
            aria-label="Search the site"
            style={{ flex: 1, border: "none", outline: "none", fontSize: "1rem", fontFamily: "var(--font-outfit)", background: "transparent" }}
          />
          {enhancing ? <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)", whiteSpace: "nowrap" }}>enhancing…</span> : null}
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 600,
              color: "var(--color-text-muted)",
              border: "1px solid rgba(10, 28, 30, 0.15)",
              borderRadius: "4px",
              padding: "2px 6px",
            }}
          >
            Esc
          </span>
        </div>

        <div style={{ maxHeight: "50vh", overflowY: "auto", padding: results.length ? "8px" : "0" }}>
          {!query.trim() ? (
            <div style={{ padding: "28px 20px", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Try &quot;penalty&quot;, &quot;university&quot;, or &quot;breach&quot; — search understands what you mean, not just the exact words.
            </div>
          ) : results.length === 0 && enhancing ? (
            // A query with zero literal-word overlap (e.g. "hacked" for
            // Breach Response) has nothing for the instant substring pass to
            // find and depends entirely on the semantic pass — which, on a
            // first-ever visit with a cold model cache, can take up to ~30–40s
            // to download. Without this branch that reads as a false "no
            // matches" for a query search would otherwise answer correctly.
            <div style={{ padding: "28px 20px", textAlign: "center", color: "var(--color-text-muted)", fontSize: "0.9rem" }}>
              Finding results for &quot;{query}&quot;…
            </div>
          ) : results.length === 0 ? (
            <div style={{ padding: "28px 20px", textAlign: "center", color: "var(--color-text-muted)" }}>No matches for &quot;{query}&quot;</div>
          ) : (
            results.map((r, i) => {
              const isLive = r.status === "live";
              const isActive = i === activeIndex;
              const row = (
                <div
                  onMouseEnter={() => setActiveIndex(i)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background: isActive ? "rgba(28, 176, 184, 0.08)" : "transparent",
                    cursor: isLive ? "pointer" : "default",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", fontWeight: 600, fontSize: "0.92rem", color: isLive ? "var(--color-forest-dark)" : "var(--color-text-muted)" }}>
                    {r.label}
                    {!isLive ? <SoonTag /> : null}
                    <span style={{ marginLeft: "auto", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-muted)" }}>
                      {r.group}
                    </span>
                  </span>
                  {r.description ? (
                    <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", marginTop: "2px" }}>{r.description}</span>
                  ) : null}
                </div>
              );
              return isLive ? (
                <a key={r.id} href={r.href} onClick={onClose} style={{ textDecoration: "none", display: "block" }}>
                  {row}
                </a>
              ) : (
                <div key={r.id} aria-disabled="true">
                  {row}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
