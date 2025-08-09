import { Link } from 'react-router-dom';
import '../styles/Projects.css';

function Projects({ projects }) {
  return (
    <section className="projects-section section" id="projects">
      <h2 className="section-title">💼 Projects</h2>
      <div className="projects-grid">
        {projects.length > 0 ? projects.map(p => (
          <Link
            key={p.id}
            to={`/project/${p.id}`}
            state={{ project: p }}
            className="project-card-link"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="project-card">
              <div className="project-img-placeholder">
                {p.image ? (
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'0.7rem'}} 
                  />
                ) : '🔹'}
              </div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-tags">
                {p.tags && p.tags.split(',').map(tag => (
                  <span key={tag.trim()}>{tag.trim()}</span>
                ))}
              </div>
              {p.link && <span className="project-btn">See Details</span>}
            </div>
          </Link>
        )) : (
          <>
            <div className="project-card">
              <div className="project-img-placeholder">🔹</div>
              <h3>Portfolio Website</h3>
              <p>A responsive personal portfolio built with React, Firebase, and CSS.</p>
              <div className="project-tags">
                <span>React</span><span>Firebase</span><span>CSS</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img-placeholder">🔹</div>
              <h3>Responsive login/signup form</h3>
              <p>Modern, mobile-friendly authentication UI.</p>
              <div className="project-tags">
                <span>HTML</span><span>CSS</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img-placeholder">🔹</div>
              <h3>Python-based quiz app</h3>
              <p>Simple quiz application using Python.</p>
              <div className="project-tags">
                <span>Python</span>
              </div>
            </div>
            <div className="project-card">
              <div className="project-img-placeholder">🔹</div>
              <h3>Mini C program using DSA</h3>
              <p>Mini project using data structures in C.</p>
              <div className="project-tags">
                <span>C</span><span>DSA</span>
              </div>
            </div>
            <div className="project-card coming-soon">
              <div className="project-img-placeholder">📁</div>
              <h3>More coming soon...</h3>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Projects;