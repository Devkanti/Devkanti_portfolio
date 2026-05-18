import { Award } from 'lucide-react';
import { useTypewriterOnScroll } from '../hooks/useTypewriterOnScroll';
import './Certificates.css';

const Certificates = () => {
  const { displayedText, elementRef } = useTypewriterOnScroll('Certification', 100);
  // Add your certificates here
  const certsData: { title: string; issuer: string; date: string; link: string; }[] = [
    {
      title: "Participation: WomenTechies'26",
      issuer: 'Google Developer Groups, VIT',
      date: 'Apr 2026',
      link: '/women-techies.jpg' 
    },
    {
      title: 'Organizer: Hybrid Hackathon',
      issuer: 'IEEE-Information Theory Society',
      date: 'Mar 2026',
      link: '/ieee-organizer.jpg' 
    },
    {
      title: 'Hackathon: Develop Secure Mobile/Web App',
      issuer: 'VIT Vellore & Samunnati',
      date: 'Jan 2026',
      link: '/vit-hackathon.jpg' // Save your image as 'vit-hackathon.jpg' in the public folder
    }
  ];

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        <h2 className="section-title fade-in-section" ref={elementRef as React.RefObject<HTMLHeadingElement>}>{displayedText}<span className="cursor-blink">|</span></h2>
        
        <div className="certificates-grid">
          {certsData.map((cert, index) => (
            <div 
              key={index} 
              className="certificate-card fade-in-section"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span className="cert-date-brutalist">{cert.date}</span>
              <div className="cert-icon-wrapper">
                <Award size={32} className="cert-icon" />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-footer">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link-new">
                    VIEW &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
