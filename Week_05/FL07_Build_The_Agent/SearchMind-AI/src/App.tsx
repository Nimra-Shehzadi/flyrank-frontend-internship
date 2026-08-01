import "./App.css";
import { useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);

  const analyzeKeyword = () => {
    if (!keyword.trim()) {
      alert("Please enter a keyword.");
      return;
    }

    setResult({
      keyword,
      intent: "Informational",
      seoScore: "89%",
      title: `Top ${keyword} Guide for 2026`,
      recommendations: [
        "Add FAQs Section",
        "Improve Meta Description",
        "Include Internal Links",
        "Use Long-tail Keywords",
      ],
    });
  };

  return (
    <div className="container">
      <header>
        <h1>🌿 SearchMind AI</h1>

        <p>
          Smart AI Keyword Research Assistant
        </p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Enter a keyword..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          <button onClick={analyzeKeyword}>
            Analyze
          </button>
        </div>
      </header>

      {result && (
        <div className="result-card">

          <h2>Analysis Result</h2>

          <div className="info">

            <div>
              <span>Keyword</span>
              <strong>{result.keyword}</strong>
            </div>

            <div>
              <span>Search Intent</span>
              <strong>{result.intent}</strong>
            </div>

            <div>
              <span>SEO Score</span>
              <strong className="score">
                {result.seoScore}
              </strong>
            </div>

          </div>

          <div className="title-box">
            <h3>Suggested SEO Title</h3>

            <p>{result.title}</p>
          </div>

          <div className="recommendations">

            <h3>Optimization Recommendations</h3>

            <ul>

              {result.recommendations.map((item: string, index: number) => (

                <li key={index}>
                  ✅ {item}
                </li>

              ))}

            </ul>

          </div>

        </div>
      )}

      <footer>

       SearchMind AI
React • TypeScript • Simulated AI Tool

Frontend AI Engineering Internship
Week 5 Build Assignment

      </footer>

    </div>
  );
}

export default App;