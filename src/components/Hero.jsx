import { useTypewriter } from '../hooks/useTypewriter';
import profileGlow from '../assets/profile-glow.png';
import '../styles/Hero.css';

function Hero({ profileUrl }) {
  const tagline = useTypewriter('Turning ideas into reality through logic, design & clean development.');
  
  return (
    <section className="hero-section gradient-bg section" id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Hi, I'm <span className="highlight">Nitesh Badgujar</span> <span role="img" aria-label="wave">👋</span></h1>
          <h2>An SE IT student with a passion for building real-world solutions through code.</h2>
          <p className="typewriter">{tagline}</p>
          <div className="hero-btns">
            <a href="#projects" className="btn btn-primary">🟣 View My Projects</a>
            <a href="#contact" className="btn btn-secondary">⚪ Let's Connect</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={profileUrl || profileGlow} alt="Nitesh Badgujar" className="profile-img-glow" />
        </div>
      </div>
    </section>
  );
}

export default Hero;