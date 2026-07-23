import { useState } from "react";

export default function Modal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>Modal Component</h2>

      <button onClick={() => setOpen(true)}>
        Open Modal
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "8px",
              width: "300px",
              textAlign: "center",
            }}
          >
            <h3>Hello!</h3>

            <p>This is an accessible modal.</p>

            <button onClick={() => setOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}