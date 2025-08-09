import { useState, useEffect } from 'react';
import '../styles/Testimonials.css';

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Senior Developer at TechCorp",
    content: "Nitesh has exceptional problem-solving skills and writes very clean, maintainable code. His attention to detail and willingness to learn make him a valuable team member.",
    avatar: "👩‍💻",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Johnson",
    role: "Project Manager",
    content: "Working with Nitesh was a pleasure. He delivered high-quality work on time and was always proactive in communication. His technical skills are impressive for a student.",
    avatar: "👨‍💼",
    rating: 5
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    role: "Computer Science Professor",
    content: "Nitesh demonstrates strong analytical thinking and programming fundamentals. His dedication to learning new technologies and solving complex problems is commendable.",
    avatar: "👩‍🏫",
    rating: 5
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    role: "Frontend Developer",
    content: "Great collaborative spirit and excellent React skills. Nitesh brings fresh perspectives and isn't afraid to ask questions or suggest improvements.",
    avatar: "👨‍💻",
    rating: 5
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  return (
    <section className="testimonials-section section" id="testimonials">
      <h2 className="section-title">💬 What People Say</h2>
      <div className="testimonials-intro">
        <p>Here's what colleagues and mentors have to say about working with me.</p>
      </div>
      
      <div 
        className="testimonials-carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="carousel-btn prev" onClick={goToPrevious}>
          ❮
        </button>
        
        <div className="testimonials-container">
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <div className="quote-icon">❝</div>
                  <p className="testimonial-text">{testimonial.content}</p>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">⭐</span>
                    ))}
                  </div>
                </div>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <button className="carousel-btn next" onClick={goToNext}>
          ❯
        </button>
      </div>
      
      <div className="testimonials-dots">
        {testimonialsData.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;