import { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/ProjectDetail.css';

function ProjectDetail() {
  const { id } = useParams();
  const location = useLocation();
  const [project, setProject] = useState(location.state?.project || null);
  const [loading, setLoading] = useState(!project);

  useEffect(() => {
    if (!project) {
      // Fetch from Firestore if not passed via state
      getDoc(doc(db, 'projects', id)).then(snap => {
        if (snap.exists()) setProject({ id: snap.id, ...snap.data() });
        setLoading(false);
      });
    }
  }, [id, project]);

  if (loading) return <div className="project-detail-page"><div>Loading...</div></div>;
  if (!project) return <div className="project-detail-page"><div>Project not found.</div></div>;

  return (
    <div className="project-detail-page">
      <Link to="/" className="back-btn">← Back to Projects</Link>
      <div className="project-detail-card">
        <div className="project-detail-img">
          {project.image ? (
            <img 
              src={project.image} 
              alt={project.title} 
              style={{width:'100%',maxWidth:400,borderRadius:'1rem'}} 
            />
          ) : '🔹'}
        </div>
        <div className="project-detail-info">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.tags && (
            <div className="project-tags">
              {project.tags.split(',').map(tag => (
                <span key={tag.trim()}>{tag.trim()}</span>
              ))}
            </div>
          )}
          {project.link && (
            <a href={project.link} className="project-btn" target="_blank" rel="noopener noreferrer">
              Visit Project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;