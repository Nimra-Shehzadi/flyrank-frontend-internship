import { useState } from "react";
import "./App.css";

type ButtonState = "idle" | "loading" | "success" | "error";

function App() {
  const [state, setState] = useState<ButtonState>("idle");

  const handleGenerate = () => {
    if (state === "loading") return;

    setState("loading");

    setTimeout(() => {
      const failed = Math.random() < 0.2;
      setState(failed ? "error" : "success");

      setTimeout(() => {
        setState("idle");
      }, 2200);
    }, 1800);
  };

  const getButtonContent = () => {
    switch (state) {
      case "loading":
        return (
          <>
            <span className="spinner" />
            Generating...
          </>
        );

      case "success":
        return (
          <>
            <span className="icon">✓</span>
            Report Generated
          </>
        );

      case "error":
        return (
          <>
            <span className="icon">!</span>
            Try Again
          </>
        );

      default:
        return (
          <>
            <span className="icon">✦</span>
            Generate Report
          </>
        );
    }
  };

  return (
    <main className="page">
      <div className="glow glow-one" />
      <div className="glow glow-two" />

      <section className="card">
        <div className="badge">INTERACTIVE UI · WEEK 6</div>

        <h1>Generate Your Report</h1>

        <p className="subtitle">
          A state-driven action button with intentional motion,
          feedback, and accessible interaction.
        </p>

        <div className="demo-area">
          <button
            className={`action-button ${state}`}
            onClick={handleGenerate}
            disabled={state === "loading"}
            aria-live="polite"
            aria-label="Generate report"
          >
            {getButtonContent()}
          </button>

          <p className={`status ${state}`}>
            {state === "idle" && "Ready to generate"}
            {state === "loading" && "Processing your request..."}
            {state === "success" && "Your report is ready."}
            {state === "error" && "Something went wrong. Please retry."}
          </p>
        </div>

        <div className="state-list">
          <div>
            <span className="dot idle-dot" />
            Idle
          </div>

          <div>
            <span className="dot hover-dot" />
            Hover / Focus
          </div>

          <div>
            <span className="dot active-dot" />
            Active
          </div>

          <div>
            <span className="dot loading-dot" />
            Loading
          </div>

          <div>
            <span className="dot success-dot" />
            Success / Error
          </div>
        </div>

        <p className="hint">
          Tip: Use <kbd>Tab</kbd> to focus the button and{" "}
          <kbd>Enter</kbd> to trigger it.
        </p>
      </section>

      <footer>
        Built with React + TypeScript · Frontend AI Engineering
      </footer>
    </main>
  );
}

export default App;