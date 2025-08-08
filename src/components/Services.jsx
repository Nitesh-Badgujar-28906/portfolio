import '../styles/Services.css';

function Services({ services }) {
  return (
    <section className="services-section section" id="services">
      <h2 className="section-title">🚀 Services / What I Can Do</h2>
      <div className="services-grid">
        {services.length > 0 ? services.map(s => (
          <div className="service-card" key={s.id}>
            <span className="service-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        )) : (
          <>
            <div className="service-card">
              <span className="service-icon">🌐</span>
              <h3>Web Design & Development</h3>
              <p>Frontend-focused with responsive design</p>
            </div>
            <div className="service-card">
              <span className="service-icon">⚙️</span>
              <h3>Code Debugging & Logic Building</h3>
              <p>Fixing, refactoring, and optimizing</p>
            </div>
            <div className="service-card">
              <span className="service-icon">📊</span>
              <h3>Mini Project Development</h3>
              <p>From idea to deployment</p>
            </div>
            <div className="service-card">
              <span className="service-icon">🧠</span>
              <h3>Collaborative Team Work</h3>
              <p>Ready to contribute and learn</p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Services;