import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { onSnapshot, collection, doc } from 'firebase/firestore';
import { db } from './firebase';

// Import components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';

// Import styles
import './styles/globals.css';
import './App.css';

function App() {
  // State for public data
  const [profileUrl, setProfileUrl] = useState('');
  const [projects, setProjects] = useState([]);
  const [services, setServices] = useState([]);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Profile image
    const unsubProfile = onSnapshot(doc(db, 'profile', 'main'), (snap) => {
      if (snap.exists()) setProfileUrl(snap.data().url);
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
      unsubProfile();
      unsubProjects();
      unsubServices();
      unsubLinks();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route 
          path="/admin" 
          element={
            <AdminPanel 
              profileUrl={profileUrl} 
              projects={projects} 
              services={services} 
              links={links} 
            />
          } 
        />
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