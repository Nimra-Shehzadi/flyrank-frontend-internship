import "./App.css";

function App() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Nimra Shehzadi</h1>

          <p>
            Frontend AI Engineering Intern
            <br />
            Computer Science Student
          </p>

          <div className="buttons">
            <a href="#projects" className="btn">
              View Projects
            </a>

            <a href="#contact" className="btn outline">
              Contact Me
            </a>
          </div>
        </div>
      </header>

      <main>

        <section id="about">
          <h2>About Me</h2>

          <p>
            I am a Computer Science student passionate about Frontend
            Development, Artificial Intelligence, and creating modern web
            applications using React and TypeScript.
          </p>
        </section>

        <section id="skills">

          <h2>Skills</h2>

          <div className="cards">

            <div className="card">HTML5</div>
            <div className="card">CSS3</div>
            <div className="card">JavaScript</div>
            <div className="card">TypeScript</div>
            <div className="card">React.js</div>
            <div className="card">Next.js</div>
            <div className="card">Node.js</div>
            <div className="card">Git & GitHub</div>

          </div>

        </section>

        <section id="projects">

          <h2>Projects</h2>

          <div className="project">

            <h3>NutriVision AI</h3>

            <p>
              AI-powered food recognition and nutrition recommendation system.
            </p>

          </div>

          <div className="project">

            <h3>LOC8 GPS Tracking</h3>

            <p>
              Modern GPS tracking dashboard with live monitoring interface.
            </p>

          </div>

          <div className="project">

            <h3>Decision Pilot AI</h3>

            <p>
              AI assistant that helps users make smarter decisions through
              intelligent suggestions.
            </p>

          </div>

        </section>

        <section id="resume">

          <h2>Resume</h2>

          <p>
           <p>
  My resume highlights my experience in Frontend Development, React, TypeScript, AI-powered web applications, and academic projects. It is available upon request.
</p>
          </p>

        </section>

        <section id="contact">

          <h2>Contact</h2>

          <p>📧 nimra.shehzadi.5094@gmail.com</p>

          <p>
            💻
            <a
              href="https://github.com/Nimra-Shehzadi"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>

          <p>
            💼
            <a
              href="https://www.linkedin.com/in/nimra-shehzadi-22262338a"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
          </p>

        </section>

      </main>

      <footer>

       <p>© 2026 Nimra Shehzadi</p>
<p>Built with React + Vite</p>

      </footer>
    </>
  );
}

export default App;