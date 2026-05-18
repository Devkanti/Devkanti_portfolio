import { useState } from 'react';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { FiInstagram } from 'react-icons/fi';
import { useTypewriterOnScroll } from '../hooks/useTypewriterOnScroll';
import './Contact.css';

const Contact = () => {
  // Using the updated generic hook for type safety
  const { displayedText, elementRef } = useTypewriterOnScroll<HTMLHeadingElement>('Get In Touch', 100);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Sending data to your new Vercel serverless API
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus('success');
        // Clear the form fields upon success
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error("Form error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Reset the success/error message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title fade-in-section" ref={elementRef}>
          {displayedText}<span className="cursor-blink">|</span>
        </h2>

        <div className="contact-container">
          <div className="contact-info fade-in-section">
            <p className="contact-text" style={{ marginTop: '0', fontSize: '1.2rem' }}>
              Feel free to reach out for internships, part-time roles, collaborations, hackathons, or interesting project opportunities.
            </p>

            <div className="contact-details">
              <div className="contact-detail-item">
                <div className="detail-icon">
                  <Mail size={20} />
                </div>
                <div className="detail-text">
                  <span>Email</span>
                  <a href="mailto:work.devkantisarkar@gmail.com">work.devkantisarkar@gmail.com</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">
                  <FiInstagram size={20} />
                </div>
                <div className="detail-text">
                  <span>Instagram</span>
                  <a href="https://instagram.com/devkanti_sarkar" target="_blank" rel="noopener noreferrer">@devkanti_sarkar</a>
                </div>
              </div>

              <div className="contact-detail-item">
                <div className="detail-icon">
                  <MapPin size={20} />
                </div>
                <div className="detail-text">
                  <span>Location</span>
                  <p>Asansol, West Bengal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container cyber-card fade-in-section" style={{ transitionDelay: '200ms' }}>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-input"
                  placeholder="Devkanti Sarkar"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-input"
                  placeholder="dev@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="form-input form-textarea"
                  placeholder="Drop a message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                ></textarea>
              </div>

              <button
                type="submit"
                className={`btn-submit-brutalist ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'SENDING...' : (
                  <>
                    SEND MESSAGE <ArrowUpRight size={20} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="submit-message success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="submit-message error" style={{ color: '#ff4b4b', marginTop: '10px' }}>
                  Oops! Something went wrong. Please try again.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;