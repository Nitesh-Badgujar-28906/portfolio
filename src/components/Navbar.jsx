import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

function Navbar() {
  const [active, setActive] = useState('hero');
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'services', 'projects', 'testimonials', 'contact'];
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
        <div className="navbar-center">
          <ul className="navbar-links">
            <li><a href="#hero" className={active === 'hero' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" className={active === 'about' ? 'active' : ''}>About</a></li>
            <li><a href="#skills" className={active === 'skills' ? 'active' : ''}>Skills</a></li>
            <li><a href="#services" className={active === 'services' ? 'active' : ''}>Services</a></li>
            <li><a href="#projects" className={active === 'projects' ? 'active' : ''}>Projects</a></li>
            <li><a href="#testimonials" className={active === 'testimonials' ? 'active' : ''}>Reviews</a></li>
            <li><a href="#contact" className={active === 'contact' ? 'active' : ''}>Contact</a></li>
          </ul>
        </div>
        <div className="navbar-actions">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;