export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-teal-accent">
        Scaffold · Phase 1
      </p>
      <h1 className="max-w-[20ch] text-3xl font-bold leading-tight tracking-tight text-headline-dark sm:text-4xl">
        Thanelinc — NDPC-Licensed Data Protection Compliance Organization
      </h1>
      <p className="max-w-[60ch] text-body">
        Repository scaffolded. Design tokens, fonts, and the content type
        contract are in place. Components and routes are ported next.
      </p>
      <p className="font-mono text-xs text-muted">
        See <code>docs/BUILD_STATE.md</code> and <code>changelog.md</code>
      </p>
    </main>
  );
}
