function App() {
  return (
    <div className="container">
      <h1>Tool Results & Structured Output</h1>

      <div className="card">
        <h2>AI Response</h2>
        <p>
          Hello! This is a simulated AI response returned from a structured API.
        </p>
      </div>

      <div className="card">
        <h2>Structured JSON Output</h2>

        <pre>{`{
  "status": "success",
  "tool": "Weather API",
  "temperature": "31°C",
  "city": "Faisalabad"
}`}</pre>
      </div>

      <div className="card">
        <h2>Error State</h2>

        <p className="error">
          Failed to load data. Please try again.
        </p>
      </div>

      <div className="card">
        <h2>Loading State</h2>

        <div className="loader"></div>
      </div>
    </div>
  );
}

export default App;