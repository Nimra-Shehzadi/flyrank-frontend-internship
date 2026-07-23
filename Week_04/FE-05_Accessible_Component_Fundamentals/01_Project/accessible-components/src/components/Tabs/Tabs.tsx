import { useState } from "react";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <div>
      <h2>Tabs Component</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("Home")}>
          Home
        </button>

        <button onClick={() => setActiveTab("About")}>
          About
        </button>

        <button onClick={() => setActiveTab("Contact")}>
          Contact
        </button>
      </div>

      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {activeTab === "Home" && <p>Welcome to the Home tab.</p>}

        {activeTab === "About" && <p>This is the About tab.</p>}

        {activeTab === "Contact" && <p>This is the Contact tab.</p>}
      </div>
    </div>
  );
}