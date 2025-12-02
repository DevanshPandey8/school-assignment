import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("/api/getSchools");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch schools");
        }

        setSchools(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Schools</h1>
        <p>Loading schools...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
        <h1>Schools</h1>
        <p style={{ color: "red" }}>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "sans-serif",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Schools</h1>
      <p style={{ marginBottom: "20px", color: "#555" }}>
        List of schools from the database, displayed like products.
      </p>

      {schools.length === 0 ? (
        <p>No schools found. Go to /addSchool and add some.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 300px))",
            gap: "16px",
            justifyContent: "center",
          }}
        >
          {schools.map((school) => (
            <div
              key={school.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                overflow: "hidden",
                background: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Image */}
              {school.image && (
                <div
                  style={{
                    width: "100%",
                    height: "150px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={school.image}
                    alt={school.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              )}

              {/* Info */}
              <div style={{ padding: "10px 12px", flex: "1" }}>
                <h2
                  style={{
                    fontSize: "1rem",
                    marginBottom: "4px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {school.name}
                </h2>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.85rem",
                    color: "#555",
                    minHeight: "2.4em",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {school.address}
                </p>
                <p
                  style={{
                    marginTop: "6px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                  }}
                >
                  {school.city}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
