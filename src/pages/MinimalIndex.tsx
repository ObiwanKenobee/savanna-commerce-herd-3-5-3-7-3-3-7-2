import React from "react";

const MinimalIndex = () => {
  return (
    <div style={{ padding: "20px", minHeight: "100vh", background: "#f0f0f0" }}>
      <h1 style={{ color: "#333", fontSize: "32px", marginBottom: "20px" }}>
        🦁 Savanna Marketplace - Working!
      </h1>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#059669", marginBottom: "10px" }}>
          System Status: ✅ ONLINE
        </h2>
        <p style={{ color: "#666", marginBottom: "20px" }}>
          The application is running correctly. This minimal component confirms
          React is working.
        </p>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            style={{
              background: "#059669",
              color: "white",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() => alert("Button clicked! React is working.")}
          >
            Test Button
          </button>
          <a
            href="/enterprise"
            style={{
              background: "#3B82F6",
              color: "white",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            Enterprise Dashboard
          </a>
        </div>
      </div>

      <div
        style={{
          marginTop: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ color: "#333", marginBottom: "10px" }}>
          Debug Information
        </h3>
        <ul style={{ color: "#666", lineHeight: "1.6" }}>
          <li>✅ React rendering successfully</li>
          <li>✅ Basic styling working</li>
          <li>✅ JavaScript events functional</li>
          <li>✅ Navigation available</li>
          <li>✅ No critical runtime errors</li>
        </ul>
      </div>
    </div>
  );
};

export default MinimalIndex;
