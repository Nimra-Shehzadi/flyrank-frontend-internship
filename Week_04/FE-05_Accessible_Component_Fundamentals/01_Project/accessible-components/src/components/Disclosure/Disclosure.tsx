import { useState } from "react";

export default function Disclosure() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>Disclosure Component</h2>

      <button onClick={() => setOpen(!open)}>
        {open ? "Hide Details" : "Show Details"}
      </button>

      {open && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        >
          <p>
            This is the disclosure content. It can be expanded and collapsed.
          </p>
        </div>
      )}
    </div>
  );
}