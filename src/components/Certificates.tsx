import { Award } from 'lucide-react';
import { useScrambleOnScroll } from '../hooks/useScrambleOnScroll';
import './Certificates.css';

const Certificates = () => {
  const { displayedText, elementRef } = useScrambleOnScroll('Certification', 30);
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
      title: 'Finalist: Smart ABES Hackathon (SAH) 2.0',
      issuer: 'ABES ACM Chapters',
      date: 'Feb 2026',
      link: '/sahcertificate.jpg'
    },
    {
      title: 'Hackathon: Develop Secure Mobile/Web App',
      issuer: 'VIT Vellore & Samunnati',
      date: 'Jan 2026',
      link: '/vit-hackathon.jpg'
    },
    {
      title: 'Oracle Certified Professional: Generative AI',
      issuer: 'Oracle University',
      date: 'Sep 2025',
      link: '/oracle-cert.jpg'
    }
  ];

  return (
    <section id="certificates" className="section certificates-section">
      <div className="container">
        <h2 className="section-title fade-in-section" ref={elementRef as React.RefObject<HTMLHeadingElement>}>{displayedText}</h2>
        
        <div className="certificates-grid">
          {certsData.map((cert, index) => (
            <div 
              key={index} 
              className="certificate-card fade-in-section"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <span className="cert-date-brutalist">{cert.date}</span>
              <div className="cert-icon-wrapper">
                <Award size={24} className="cert-icon" />
              </div>
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <div className="cert-footer">
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-link-new cursor-target">
                    VIEW &rarr;
                  </a>
                </div>
              </div>
              <div className="cert-thumbnail">
                <img src={cert.link} alt={`${cert.title} Preview`} loading="lazy" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
