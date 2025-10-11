import React from "react";

function AppMinimal() {
  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#333" }}>🦁 App is Working!</h1>
      <p style={{ color: "#666" }}>React is mounted and rendering correctly.</p>
      <button
        onClick={() => alert("JavaScript is working!")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#059669",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Test Button
      </button>
    </div>
  );
}

export default AppMinimal;
