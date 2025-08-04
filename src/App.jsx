import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useParams, useLocation } from 'react-router-dom';
import emailjs from 'emailjs-com';
import './App.css';
import profileGlow from './assets/profile-glow.png';
// Firebase imports
import { auth, db, storage } from './firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function Navbar() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'services', 'projects', 'contact'];
      let current = 'hero';
      const scrollPos = window.scrollY + 120;
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollPos) {
          current = sec;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className="main-navbar">
      <div className="navbar-content">
        <span className="navbar-logo">Portfolio</span>
        <ul className="navbar-links">
          <li><a href="#hero" className={active === 'hero' ? 'active' : ''}>Home</a></li>
          <li><a href="#about" className={active === 'about' ? 'active' : ''}>About</a></li>
          <li><a href="#services" className={active === 'services' ? 'active' : ''}>Services</a></li>
          <li><a href="#projects" className={active === 'projects' ? 'active' : ''}>Projects</a></li>
          <li><a href="#contact" className={active === 'contact' ? 'active' : ''}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

function useTypewriter(text, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

function Hero({ profileUrl }) {
  const tagline = useTypewriter('Turning ideas into reality through logic, design & clean development.');
  return (
    <section className="hero-section gradient-bg section" id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I’m <span className="highlight">Nitesh Badgujar</span> <span role="img" aria-label="wave">👋</span></h1>
          <h2>An SE IT student with a passion for building real-world solutions through code.</h2>
          <p className="typewriter">{tagline}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">🟣 View My Projects</a>
            <a href="#contact" className="btn btn-secondary">⚪ Let’s Connect</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={profileUrl || profileGlow} alt="Nitesh Badgujar" className="profile-img-glow" />
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about-section section" id="about">
      <h2 className="section-title">✨ About Me</h2>
      <div className="about-content-grid">
        <div className="about-bio">
          <p>🎓 Currently a Second Year IT Engineering student (SE IT), driven by a love for solving problems and bringing ideas to life with technology.</p>
          <p>🧠 Whether it’s debugging code, building mini-projects, or exploring new tech stacks — I believe learning never stops.</p>
          <p>🌐 I’m exploring the world of web development, software design, and data structures — one line of code at a time.</p>
          <p>🟢 Fun fact: I treat every bug as a puzzle waiting to be solved 🐞🧩</p>
        </div>
        <div className="about-highlights">
          <div className="highlight-card" tabIndex={0} title="I focus on writing clean, maintainable code.">💻 <span>Clean Code</span></div>
          <div className="highlight-card" tabIndex={0} title="I'm always exploring new tech, tools & frameworks.">📚 <span>Lifelong Learner</span></div>
          <div className="highlight-card" tabIndex={0} title="I love optimizing UI and UX with precision.">🔍 <span>Detail-Oriented</span></div>
          <div className="highlight-card" tabIndex={0} title="Problem-solving is my favorite workout.">🧩 <span>Logical Thinker</span></div>
        </div>
      </div>
    </section>
  );
}

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
            <div className="service-card"><span className="service-icon">🌐</span><h3>Web Design & Development</h3><p>Frontend-focused with responsive design</p></div>
            <div className="service-card"><span className="service-icon">⚙️</span><h3>Code Debugging & Logic Building</h3><p>Fixing, refactoring, and optimizing</p></div>
            <div className="service-card"><span className="service-icon">📊</span><h3>Mini Project Development</h3><p>From idea to deployment</p></div>
            <div className="service-card"><span className="service-icon">🧠</span><h3>Collaborative Team Work</h3><p>Ready to contribute and learn</p></div>
          </>
        )}
      </div>
    </section>
  );
}

function Projects({ projects }) {
  const location = useLocation();
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
              <div className="project-img-placeholder">{p.image ? <img src={p.image} alt={p.title} style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:'0.7rem'}} /> : '🔹'}</div>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-tags">{p.tags && p.tags.split(',').map(tag => <span key={tag.trim()}>{tag.trim()}</span>)}</div>
              {p.link && <span className="project-btn">See Details</span>}
            </div>
          </Link>
        )) : (
          <>
            <div className="project-card"><div className="project-img-placeholder">🔹</div><h3>Portfolio Website</h3><p>A responsive personal portfolio built with React, Firebase, and CSS.</p><div className="project-tags"><span>React</span><span>Firebase</span><span>CSS</span></div></div>
            <div className="project-card"><div className="project-img-placeholder">🔹</div><h3>Responsive login/signup form</h3><p>Modern, mobile-friendly authentication UI.</p><div className="project-tags"><span>HTML</span><span>CSS</span></div></div>
            <div className="project-card"><div className="project-img-placeholder">🔹</div><h3>Python-based quiz app</h3><p>Simple quiz application using Python.</p><div className="project-tags"><span>Python</span></div></div>
            <div className="project-card"><div className="project-img-placeholder">🔹</div><h3>Mini C program using DSA</h3><p>Mini project using data structures in C.</p><div className="project-tags"><span>C</span><span>DSA</span></div></div>
            <div className="project-card coming-soon"><div className="project-img-placeholder">📁</div><h3>More coming soon...</h3></div>
          </>
        )}
      </div>
    </section>
  );
}

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
          {project.image ? <img src={project.image} alt={project.title} style={{width:'100%',maxWidth:400,borderRadius:'1rem'}} /> : '🔹'}
        </div>
        <div className="project-detail-info">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.tags && <div className="project-tags">{project.tags.split(',').map(tag => <span key={tag.trim()}>{tag.trim()}</span>)}</div>}
          {project.link && <a href={project.link} className="project-btn" target="_blank" rel="noopener noreferrer">Visit Project</a>}
        </div>
      </div>
    </div>
  );
}

function Contact({ links }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Sending...');
    // Send email via EmailJS
    emailjs.send(
      'service_pdphq12',
      'template_xu53ua4',
      {
        from_name: form.name,
        from_email: form.email,
        subject: form.subject,
        message: form.message,
      },
      '_dRRVTl1PcOtLj908'
    )
      .then(() => {
        setStatus('Message sent! Thank you.');
        setForm({ name: '', email: '', subject: '', message: '' });
      })
      .catch(() => {
        setStatus('Failed to send message. Please try again.');
      });
    // Also save to Firestore
    addDoc(collection(db, 'contacts'), {
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      created: Timestamp.now(),
    });
  };

  return (
    <section className="contact-section section" id="contact">
      <h2 className="section-title">📬 Contact Me</h2>
      <div className="contact-content">
        <div className="contact-info">
          <p>Got a project, idea, or just want to say hi?<br />I'm always open to collaboration and learning opportunities!</p>
          <p>📧 <a href="mailto:niteshbadgujar32@gmail.com">niteshbadgujar32@gmail.com</a></p>
          <div className="contact-links">
            {links && links.map(link => (
              <a key={link.id} href={link.url} className="contact-link" target="_blank" rel="noopener noreferrer">{link.label}</a>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
          <textarea name="message" placeholder="Your Message" rows={4} value={form.message} onChange={handleChange} required />
          <button type="submit" className="btn btn-primary">Send Message</button>
          {status && <div className="contact-status">{status}</div>}
        </form>
      </div>
    </section>
  );
}

function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [profileStatus, setProfileStatus] = useState('');
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [projectForm, setProjectForm] = useState({ title: '', description: '', image: '', tags: '', link: '' });
  const [serviceForm, setServiceForm] = useState({ icon: '', title: '', description: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [editingService, setEditingService] = useState(null);
  const [projectStatus, setProjectStatus] = useState('');
  const [serviceStatus, setServiceStatus] = useState('');
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [links, setLinks] = useState([]);
  const [linkForm, setLinkForm] = useState({ label: '', url: '' });
  const [editingLink, setEditingLink] = useState(null);
  const [linkStatus, setLinkStatus] = useState('');

  // Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsub();
  }, []);

  // Fetch profile image, projects, services
  useEffect(() => {
    if (!isAdmin) return;
    // Profile image
    getDoc(doc(db, 'profile', 'main')).then(snap => {
      if (snap.exists()) setProfileUrl(snap.data().imageUrl);
    });
    // Projects
    return onSnapshot(collection(db, 'projects'), snap => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [isAdmin]);
  useEffect(() => {
    if (!isAdmin) return;
    // Services
    return onSnapshot(collection(db, 'services'), snap => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [isAdmin]);

  // Listen for contact messages
  useEffect(() => {
    if (!isAdmin) return;
    return onSnapshot(collection(db, 'contacts'), snap => {
      setContacts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => b.created?.seconds - a.created?.seconds));
    });
  }, [isAdmin]);

  // Listen for links
  useEffect(() => {
    if (!isAdmin) return;
    return onSnapshot(collection(db, 'links'), snap => {
      setLinks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
  }, [isAdmin]);

  // Login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (e) {
      setError('Login failed: ' + e.message);
    }
  };
  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  // Profile image upload (now requires button click)
  const handleProfileFileChange = (e) => {
    setProfileFile(e.target.files[0]);
    setProfileStatus('');
  };
  const handleProfileUpload = async () => {
    if (!profileFile) return;
    setUploading(true);
    setProfileStatus('Uploading...');
    const storageRef = ref(storage, 'profile/' + profileFile.name);
    await uploadBytes(storageRef, profileFile);
    const url = await getDownloadURL(storageRef);
    setProfileUrl(url);
    await setDoc(doc(db, 'profile', 'main'), { imageUrl: url });
    setProfileStatus('Profile image updated!');
    setProfileFile(null);
    setUploading(false);
  };

  // Projects CRUD
  const handleProjectSave = async () => {
    if (editingProject) {
      await updateDoc(doc(db, 'projects', editingProject.id), projectForm);
      setEditingProject(null);
      setProjectStatus('Project updated!');
    } else {
      await addDoc(collection(db, 'projects'), projectForm);
      setProjectStatus('Project added!');
    }
    setProjectForm({ title: '', description: '', image: '', tags: '', link: '' });
    setTimeout(() => setProjectStatus(''), 1500);
  };
  const handleProjectEdit = (p) => {
    setEditingProject(p);
    setProjectForm({ title: p.title, description: p.description, image: p.image, tags: p.tags, link: p.link });
  };
  const handleProjectDelete = async (id) => {
    await deleteDoc(doc(db, 'projects', id));
  };

  // Services CRUD
  const handleServiceSave = async () => {
    if (editingService) {
      await updateDoc(doc(db, 'services', editingService.id), serviceForm);
      setEditingService(null);
      setServiceStatus('Service updated!');
    } else {
      await addDoc(collection(db, 'services'), serviceForm);
      setServiceStatus('Service added!');
    }
    setServiceForm({ icon: '', title: '', description: '' });
    setTimeout(() => setServiceStatus(''), 1500);
  };
  const handleServiceEdit = (s) => {
    setEditingService(s);
    setServiceForm({ icon: s.icon, title: s.title, description: s.description });
  };
  const handleServiceDelete = async (id) => {
    await deleteDoc(doc(db, 'services', id));
  };

  // Links CRUD
  const handleLinkSave = async () => {
    if (editingLink) {
      await updateDoc(doc(db, 'links', editingLink.id), linkForm);
      setEditingLink(null);
      setLinkStatus('Link updated!');
    } else {
      await addDoc(collection(db, 'links'), linkForm);
      setLinkStatus('Link added!');
    }
    setLinkForm({ label: '', url: '' });
    setTimeout(() => setLinkStatus(''), 1500);
  };
  const handleLinkEdit = (l) => {
    setEditingLink(l);
    setLinkForm({ label: l.label, url: l.url });
  };
  const handleLinkDelete = async (id) => {
    await deleteDoc(doc(db, 'links', id));
  };

  if (!isAdmin) {
    return (
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="password-input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        <button onClick={handleLogin}>Login</button>
        {error && <div className="admin-error">{error}</div>}
      </div>
    );
  }
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <div className="admin-section">
        <h3>Profile Image</h3>
        {profileUrl && <img src={profileUrl} alt="Profile" style={{ width: 120, borderRadius: '50%' }} />}
        <input type="file" accept="image/*" onChange={handleProfileFileChange} />
        <button onClick={handleProfileUpload} disabled={!profileFile || uploading}>
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {profileStatus && <div className="admin-status">{profileStatus}</div>}
      </div>
      <div className="admin-section">
        <h3>Projects</h3>
        <form onSubmit={e => { e.preventDefault(); handleProjectSave(); }}>
          <input type="text" placeholder="Title" value={projectForm.title} onChange={e => setProjectForm(f => ({ ...f, title: e.target.value }))} required />
          <input type="text" placeholder="Description" value={projectForm.description} onChange={e => setProjectForm(f => ({ ...f, description: e.target.value }))} required />
          <input type="text" placeholder="Image URL" value={projectForm.image} onChange={e => setProjectForm(f => ({ ...f, image: e.target.value }))} />
          <input type="text" placeholder="Tags (comma separated)" value={projectForm.tags} onChange={e => setProjectForm(f => ({ ...f, tags: e.target.value }))} />
          <input type="text" placeholder="Project Link" value={projectForm.link} onChange={e => setProjectForm(f => ({ ...f, link: e.target.value }))} />
          <button type="submit">{editingProject ? 'Update' : 'Add'} Project</button>
          {editingProject && <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', image: '', tags: '', link: '' }); }}>Cancel</button>}
        </form>
        {projectStatus && <div className="admin-status">{projectStatus}</div>}
        <div className="admin-list">
          {projects.map(p => (
            <div key={p.id} className="admin-list-item">
              <strong>{p.title}</strong> - {p.description}
              <button onClick={() => handleProjectEdit(p)}>Edit</button>
              <button onClick={() => handleProjectDelete(p.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-section">
        <h3>Services</h3>
        <form onSubmit={e => { e.preventDefault(); handleServiceSave(); }}>
          <input type="text" placeholder="Icon (emoji)" value={serviceForm.icon} onChange={e => setServiceForm(f => ({ ...f, icon: e.target.value }))} />
          <input type="text" placeholder="Title" value={serviceForm.title} onChange={e => setServiceForm(f => ({ ...f, title: e.target.value }))} required />
          <input type="text" placeholder="Description" value={serviceForm.description} onChange={e => setServiceForm(f => ({ ...f, description: e.target.value }))} required />
          <button type="submit">{editingService ? 'Update' : 'Add'} Service</button>
          {editingService && <button type="button" onClick={() => { setEditingService(null); setServiceForm({ icon: '', title: '', description: '' }); }}>Cancel</button>}
        </form>
        {serviceStatus && <div className="admin-status">{serviceStatus}</div>}
        <div className="admin-list">
          {services.map(s => (
            <div key={s.id} className="admin-list-item">
              <strong>{s.icon} {s.title}</strong> - {s.description}
              <button onClick={() => handleServiceEdit(s)}>Edit</button>
              <button onClick={() => handleServiceDelete(s.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-section">
        <h3>Social Links</h3>
        <form onSubmit={e => { e.preventDefault(); handleLinkSave(); }}>
          <input type="text" placeholder="Label (LinkedIn, GitHub, Resume)" value={linkForm.label} onChange={e => setLinkForm(f => ({ ...f, label: e.target.value }))} required />
          <input type="url" placeholder="URL" value={linkForm.url} onChange={e => setLinkForm(f => ({ ...f, url: e.target.value }))} required />
          <button type="submit">{editingLink ? 'Update' : 'Add'} Link</button>
          {editingLink && <button type="button" onClick={() => { setEditingLink(null); setLinkForm({ label: '', url: '' }); }}>Cancel</button>}
        </form>
        {linkStatus && <div className="admin-status">{linkStatus}</div>}
        <div className="admin-list">
          {links.map(l => (
            <div key={l.id} className="admin-list-item">
              <strong>{l.label}</strong>: <a href={l.url} target="_blank" rel="noopener noreferrer">{l.url}</a>
              <button onClick={() => handleLinkEdit(l)}>Edit</button>
              <button onClick={() => handleLinkDelete(l.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-section">
        <h3>Contact Messages</h3>
        <div className="admin-list">
          {contacts.length === 0 && <div>No messages yet.</div>}
          {contacts.map(msg => (
            <div key={msg.id} className="admin-list-item" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <div><b>{msg.name}</b> &lt;{msg.email}&gt; {msg.subject && <span style={{ color: '#a78bfa' }}>({msg.subject})</span>}</div>
              <div style={{ margin: '0.5rem 0' }}>{msg.message}</div>
              <div style={{ fontSize: '0.9em', color: '#aaa' }}>{msg.created && new Date(msg.created.seconds * 1000).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  // State for public data
  const [profileUrl, setProfileUrl] = useState('');
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Profile image
    getDoc(doc(db, 'profile', 'main')).then(snap => {
      if (snap.exists()) setProfileUrl(snap.data().imageUrl);
    });
    // Projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), snap => {
      setProjects(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Services
    const unsubServices = onSnapshot(collection(db, 'services'), snap => {
      setServices(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    // Links
    const unsubLinks = onSnapshot(collection(db, 'links'), snap => {
      setLinks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubProjects();
      unsubServices();
      unsubLinks();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/*" element={
          <>
            <Navbar />
            <Hero profileUrl={profileUrl} />
            <About />
            <Services services={services} />
            <Projects projects={projects} />
            <Contact links={links} />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
