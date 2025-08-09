import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';
import '../styles/Navbar.css';

function Navbar() {
  const [active, setActive] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Handle escape key to close menu
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  return (
    <nav className="main-navbar">
      <div className="navbar-content">
        <span className="navbar-logo">Portfolio</span>
        
        {/* Mobile menu button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className="navbar-actions desktop-only">
          <ThemeToggle />
        </div>
        
        {/* Navigation menu */}
        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="navbar-menu-header">
            <span className="navbar-logo">Portfolio</span>
            <ThemeToggle />
          </div>
          
          <ul className="navbar-links">
            <li><a href="#hero" className={active === 'hero' ? 'active' : ''} onClick={handleLinkClick}>Home</a></li>
            <li><a href="#about" className={active === 'about' ? 'active' : ''} onClick={handleLinkClick}>About</a></li>
            <li><a href="#skills" className={active === 'skills' ? 'active' : ''} onClick={handleLinkClick}>Skills</a></li>
            <li><a href="#services" className={active === 'services' ? 'active' : ''} onClick={handleLinkClick}>Services</a></li>
            <li><a href="#projects" className={active === 'projects' ? 'active' : ''} onClick={handleLinkClick}>Projects</a></li>
            <li><a href="#testimonials" className={active === 'testimonials' ? 'active' : ''} onClick={handleLinkClick}>Reviews</a></li>
            <li><a href="#contact" className={active === 'contact' ? 'active' : ''} onClick={handleLinkClick}>Contact</a></li>
          </ul>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className="navbar-overlay" onClick={() => setIsMenuOpen(false)}></div>}
      </div>
    </nav>
  );
}

export default Navbar;