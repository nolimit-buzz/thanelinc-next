/**
 * Client-only semantic search. Runs a real small embedding model fully
 * in-browser via transformers.js (WASM/ONNX) — no backend, no API key, no
 * per-query cost, consistent with this repo having no backend at all
 * (D-012). First call downloads and caches the model (~25–35MB, quantized);
 * every call after that, on any page, reuses it from the browser cache.
 *
 * This file must never be imported from server-rendered code — only ever
 * via `import("@/lib/search/embeddings")` inside a client-side event
 * handler, so it's never part of the SSR or initial client bundle.
 */

const MODEL_ID = "Xenova/all-MiniLM-L6-v2";

type Extractor = (
  text: string | string[],
  opts: { pooling: "mean"; normalize: boolean },
) => Promise<{ data: Float32Array; dims: number[] }>;

let extractorPromise: Promise<Extractor> | null = null;

async function getExtractor(): Promise<Extractor> {
  if (!extractorPromise) {
    extractorPromise = (async () => {
      const { pipeline, env } = await import("@huggingface/transformers");
      // Only fetch from the HF hub — never probe for a local copy on this
      // static site, which has nowhere to serve one from.
      env.allowLocalModels = false;
      const extractor = await pipeline("feature-extraction", MODEL_ID, { dtype: "q8" });
      return extractor as unknown as Extractor;
    })();
  }
  return extractorPromise;
}

export async function embed(text: string): Promise<Float32Array> {
  const extractor = await getExtractor();
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return output.data;
}

export async function embedBatch(texts: string[]): Promise<Float32Array[]> {
  const extractor = await getExtractor();
  // One batched inference call, not a loop of individual ones — looping was
  // taking ~20s for the ~30-item corpus on first use; batching lets the
  // model process them together instead of paying per-call overhead ~30
  // times over.
  const output = await extractor(texts, { pooling: "mean", normalize: true });
  const hidden = output.dims[output.dims.length - 1];
  const out: Float32Array[] = [];
  for (let i = 0; i < texts.length; i++) {
    out.push(output.data.slice(i * hidden, (i + 1) * hidden));
  }
  return out;
}

export function cosineSimilarity(a: Float32Array, b: Float32Array): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  // both vectors are already L2-normalized (normalize:true above), so the
  // dot product alone is the cosine similarity.
  return dot;
}

/** Kicks off the model download without blocking on a result — call this the
 *  moment the search UI opens, so it's likely warm by the time the user
 *  finishes typing their first query. */
export function warmUp(): void {
  void getExtractor();
}
