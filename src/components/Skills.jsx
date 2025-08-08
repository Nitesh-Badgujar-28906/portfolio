import { useState, useEffect, useRef } from 'react';
import '../styles/Skills.css';

const skillsData = [
  { name: 'React', level: 85, icon: '⚛️', color: '#61DAFB' },
  { name: 'JavaScript', level: 90, icon: '🟨', color: '#F7DF1E' },
  { name: 'CSS/SCSS', level: 88, icon: '🎨', color: '#1572B6' },
  { name: 'Node.js', level: 75, icon: '🟢', color: '#339933' },
  { name: 'Python', level: 80, icon: '🐍', color: '#3776AB' },
  { name: 'Firebase', level: 70, icon: '🔥', color: '#FFCA28' },
  { name: 'Git/GitHub', level: 85, icon: '🐙', color: '#F05032' },
  { name: 'MongoDB', level: 65, icon: '🍃', color: '#47A248' },
];

function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const skillsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Animate skills with staggered delays
          skillsData.forEach((skill, index) => {
            setTimeout(() => {
              setAnimatedSkills(prev => [...prev, skill.name]);
            }, index * 150);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section className="skills-section section" id="skills" ref={skillsRef}>
      <h2 className="section-title">💡 Skills & Technologies</h2>
      <div className="skills-intro">
        <p>Here are the technologies I work with and my proficiency levels. I'm always learning and improving!</p>
      </div>
      <div className="skills-grid">
        {skillsData.map((skill, index) => (
          <div 
            key={skill.name} 
            className={`skill-card ${animatedSkills.includes(skill.name) ? 'animate' : ''}`}
            style={{ 
              animationDelay: `${index * 150}ms`,
              '--skill-color': skill.color
            }}
          >
            <div className="skill-header">
              <div className="skill-info">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-name">{skill.name}</span>
              </div>
              <span className="skill-percentage">{skill.level}%</span>
            </div>
            <div className="skill-progress-container">
              <div 
                className={`skill-progress ${animatedSkills.includes(skill.name) ? 'animate' : ''}`}
                style={{ 
                  '--progress': `${skill.level}%`,
                  '--skill-color': skill.color
                }}
              >
                <div className="skill-progress-glow"></div>
              </div>
            </div>
            <div className="skill-particles">
              {[...Array(3)].map((_, i) => (
                <div key={i} className={`particle particle-${i + 1}`}></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;