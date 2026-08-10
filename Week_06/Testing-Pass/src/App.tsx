import { useState } from "react";
import "./App.css";

type MessageType = "success" | "error" | "info";

interface TestMessage {
  type: MessageType;
  text: string;
}

function App() {
  const [message, setMessage] = useState<TestMessage>({
    type: "info",
    text: "Testing dashboard is ready.",
  });

  const runTest = (type: "success" | "error") => {
    if (type === "success") {
      setMessage({
        type: "success",
        text: "All tests passed successfully!",
      });
    } else {
      setMessage({
        type: "error",
        text: "Test failed. Please review the reported issue.",
      });
    }
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <span className="badge">WEEK 6 • TESTING PASS</span>
          <h1>Testing Dashboard</h1>
          <p>
            A simple React testing interface for verifying component behavior
            and user interactions.
          </p>
        </div>

        <div className="status">
          <span className="status-dot"></span>
          Test Suite Ready
        </div>
      </header>

      <main className="container">
        <section className="overview">
          <div className="card">
            <span className="card-label">Test Suite</span>
            <strong>React UI</strong>
            <p>Component behavior & interaction tests</p>
          </div>

          <div className="card">
            <span className="card-label">Test Cases</span>
            <strong>6+</strong>
            <p>Meaningful component tests</p>
          </div>

          <div className="card">
            <span className="card-label">Status</span>
            <strong className="green">Ready</strong>
            <p>Prepared for CI validation</p>
          </div>
        </section>

        <section className="test-panel">
          <div className="panel-header">
            <div>
              <span className="eyebrow">Interactive Test Runner</span>
              <h2>Run Component Tests</h2>
            </div>

            <span className={`result ${message.type}`}>
              {message.type === "success"
                ? "PASSED"
                : message.type === "error"
                ? "FAILED"
                : "READY"}
            </span>
          </div>

          <div className="test-list">
            <div className="test-item">
              <div>
                <strong>Message Rendering</strong>
                <p>Checks that the correct message appears.</p>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="test-item">
              <div>
                <strong>Success State</strong>
                <p>Verifies successful test feedback.</p>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="test-item">
              <div>
                <strong>Error State</strong>
                <p>Verifies failure feedback and recovery.</p>
              </div>
              <span className="check">✓</span>
            </div>

            <div className="test-item">
              <div>
                <strong>Role & Label Support</strong>
                <p>Elements are accessible and easy to query.</p>
              </div>
              <span className="check">✓</span>
            </div>
          </div>

          <div className="actions">
            <button
              className="primary-btn"
              onClick={() => runTest("success")}
              aria-label="Run successful test"
            >
              Run Passing Test
            </button>

            <button
              className="secondary-btn"
              onClick={() => runTest("error")}
              aria-label="Run failing test"
            >
              Simulate Failure
            </button>
          </div>

          <div
            className={`message ${message.type}`}
            role="status"
            aria-live="polite"
          >
            <span className="message-icon">
              {message.type === "success"
                ? "✓"
                : message.type === "error"
                ? "!"
                : "i"}
            </span>

            <div>
              <strong>
                {message.type === "success"
                  ? "Test Passed"
                  : message.type === "error"
                  ? "Test Failed"
                  : "Test Runner"}
              </strong>
              <p>{message.text}</p>
            </div>
          </div>
        </section>

        <section className="coverage">
          <div>
            <span className="eyebrow">Coverage Checklist</span>
            <h2>Testing Requirements</h2>
          </div>

          <div className="check-grid">
            <div>✓ Component rendering</div>
            <div>✓ User interaction</div>
            <div>✓ Accessible roles</div>
            <div>✓ Edge cases</div>
            <div>✓ Success & failure states</div>
            <div>✓ CI-ready test suite</div>
          </div>
        </section>
      </main>

      <footer>
        Built with React + TypeScript • Week 6 Frontend AI Engineering
      </footer>
    </div>
  );
}

export default App;