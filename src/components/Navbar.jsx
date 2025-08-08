import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

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

export default Navbar;