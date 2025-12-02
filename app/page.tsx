import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          background: "#ffffff",
          padding: "28px 36px",
          borderRadius: "12px",
          boxShadow: "0 8px 24px rgba(16,24,40,0.08)",
          border: "1px solid rgba(16,24,40,0.04)",
          maxWidth: "480px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: "6px", color: "#0f172a", fontSize: "1.6rem" }}>School Directory</h1>
        <p style={{ marginBottom: "20px", color: "#334155", fontSize: "0.95rem" }}>
          Use the options below to add a new school or view all schools.
        </p>

        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link href="/addSchool">
            <button
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                background: "#2563EB",
                color: "#ffffff",
                boxShadow: "0 6px 18px rgba(37,99,235,0.12)",
                transition: "background 150ms ease, transform 120ms ease",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
              }}
              aria-label="Add School"
            >
              ➕ Add School
            </button>
          </Link>

          <Link href="/showSchools">
            <button
              style={{
                padding: "10px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: 500,
                background: "#10B981",
                color: "#ffffff",
                boxShadow: "0 6px 18px rgba(16,185,129,0.12)",
                transition: "background 150ms ease, transform 120ms ease",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
              }}
              aria-label="View Schools"
            >
              📋 View Schools
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
