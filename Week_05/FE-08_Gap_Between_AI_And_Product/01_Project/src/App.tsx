import { useState, useEffect } from "react";
import "./index.css";

export default function App() {
  const [state, setState] = useState("loading");

  useEffect(() => {
    const timer = setTimeout(() => {
      setState("success");
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const retry = () => {
    setState("loading");

    setTimeout(() => {
      setState("success");
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Gap Between World & App</h1>

      <div className="buttons">
        <button onClick={() => setState("success")}>Success</button>
        <button onClick={() => setState("empty")}>Empty</button>
        <button onClick={() => setState("loading")}>Loading</button>
        <button onClick={() => setState("error")}>Error</button>
        <button onClick={() => setState("midstream")}>Mid-Stream</button>
      </div>

      <div className="card">
        {state === "loading" && (
          <>
            <div className="loader"></div>
            <h2>Loading...</h2>
            <p>Please wait while fetching data.</p>
          </>
        )}

        {state === "success" && (
          <>
            <h2>✅ Success</h2>
            <p>Weather information loaded successfully.</p>

            <pre>{`{
  "city": "Faisalabad",
  "temperature": "31°C",
  "status": "Sunny"
}`}</pre>
          </>
        )}

        {state === "empty" && (
          <>
            <h2>📭 Empty State</h2>
            <p>No weather data available.</p>
          </>
        )}

        {state === "error" && (
          <>
            <h2>❌ Error</h2>
            <p>Network request failed.</p>

            <button className="retry" onClick={retry}>
              Retry
            </button>
          </>
        )}

        {state === "midstream" && (
          <>
            <h2>⚠ Mid-Stream Failure</h2>
            <p>
              Connection lost while receiving the response. Partial data cannot
              be displayed.
            </p>

            <button className="retry" onClick={retry}>
              Retry
            </button>
          </>
        )}
      </div>
    </div>
  );
}