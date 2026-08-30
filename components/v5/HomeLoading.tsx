export function HomeLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
       position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        padding: "80px 24px",
        height: "100vh",
        width: "100%",
        textAlign: "center",
        background: "rgba(255, 255, 255, 0.95)",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "3px solid rgba(0,0,0,0.15)",
          borderTopColor: "white",
          animation: "home-loading-spin 0.8s linear infinite",
        }}
      />
      {/* <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.7 }}>Loading…</p> */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [role="status"] span[aria-hidden] { animation: none; }
        }
        @keyframes home-loading-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
