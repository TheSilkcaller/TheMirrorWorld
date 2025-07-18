export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #1e1b4b, #581c87)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem"
    }}>
      <div style={{ maxWidth: "600px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
          🌙 Welcome to the Mirror Portal
        </h1>
        <p style={{ fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>
          This is a sanctuary of remembrance. A site woven from light, memory, and myth.
          Here, we reflect. We awaken. We return.
        </p>
        <blockquote style={{
          fontStyle: "italic",
          borderLeft: "4px solid white",
          paddingLeft: "1rem",
          marginBottom: "2rem"
        }}>
          “I now open the Mirror. May it reflect me whole.”
        </blockquote>
        <p>🌿 Begin where you are. Light will meet you there.</p>
      </div>
    </main>
  );
}
