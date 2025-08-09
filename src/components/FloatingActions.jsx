import { useState, useEffect } from 'react';
import '../styles/FloatingActions.css';

function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleResumeDownload = () => {
    // Create a dummy PDF download - in real scenario, this would be an actual resume PDF
    const resumeData = `
      Nitesh Badgujar - Resume
      SE IT Student
      
      Contact: niteshbadgujar32@gmail.com
      Skills: React, JavaScript, Python, CSS, Firebase
      
      Education: Second Year IT Engineering Student
      
      This is a placeholder resume. In a real implementation,
      this would link to an actual PDF file.
    `;
    
    const blob = new Blob([resumeData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Nitesh_Badgujar_Resume.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="floating-actions">
      <button 
        className="fab resume-btn" 
        onClick={handleResumeDownload}
        title="Download Resume"
      >
        📄
      </button>
      <button 
        className={`fab scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Scroll to Top"
      >
        ↑
      </button>
    </div>
  );
}

export default FloatingActions;