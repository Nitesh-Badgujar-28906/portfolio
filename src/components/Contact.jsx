import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import '../styles/Contact.css';

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
              <a key={link.id} href={link.url} className="contact-link" target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          <input 
            type="text" 
            name="subject" 
            placeholder="Subject" 
            value={form.subject} 
            onChange={handleChange} 
          />
          <textarea 
            name="message" 
            placeholder="Your Message" 
            rows={4} 
            value={form.message} 
            onChange={handleChange} 
            required 
          />
          <button type="submit" className="btn btn-primary">Send Message</button>
          {status && <div className="contact-status">{status}</div>}
        </form>
      </div>
    </section>
  );
}

export default Contact;