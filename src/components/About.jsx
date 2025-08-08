import '../styles/About.css';

function About() {
  return (
    <section className="about-section section" id="about">
      <h2 className="section-title">✨ About Me</h2>
      <div className="about-content-grid">
        <div className="about-bio">
          <p>🎓 Currently a Second Year IT Engineering student (SE IT), driven by a love for solving problems and bringing ideas to life with technology.</p>
          <p>🧠 Whether it's debugging code, building mini-projects, or exploring new tech stacks — I believe learning never stops.</p>
          <p>🌐 I'm exploring the world of web development, software design, and data structures — one line of code at a time.</p>
          <p>🟢 Fun fact: I treat every bug as a puzzle waiting to be solved 🐞🧩</p>
        </div>
        <div className="about-highlights">
          <div className="highlight-card" tabIndex={0} title="I focus on writing clean, maintainable code.">
            💻 <span>Clean Code</span>
          </div>
          <div className="highlight-card" tabIndex={0} title="I'm always exploring new tech, tools & frameworks.">
            📚 <span>Lifelong Learner</span>
          </div>
          <div className="highlight-card" tabIndex={0} title="I love optimizing UI and UX with precision.">
            🔍 <span>Detail-Oriented</span>
          </div>
          <div className="highlight-card" tabIndex={0} title="Problem-solving is my favorite workout.">
            🧩 <span>Logical Thinker</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;