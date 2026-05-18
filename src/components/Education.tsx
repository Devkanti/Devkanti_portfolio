import { GraduationCap, Calendar, Award } from 'lucide-react';
import { useTypewriterOnScroll } from '../hooks/useTypewriterOnScroll';
import './Education.css';

const Education = () => {
  const { displayedText, elementRef } = useTypewriterOnScroll('Academic', 100);
  const educationData = [
    {
      period: '2024 - 2028',
      institution: 'Vellore Institute of Technology',
      degree: 'B.Tech in Information Technology',
      details: 'CGPA - 7.14',
    },
    {
      period: '2022 - 2024',
      institution: 'North Point School, Asansol',
      degree: 'Higher Secondary Education',
      details: 'Completed with focus on Physics, Chemistry, and Mathematics',
    },
    {
      period: '2011 - 2022',
      institution: "St. Vincent's High & Technical School",
      degree: 'General Studies',
      details: '',
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="container">
        <h2 className="section-title fade-in-section" ref={elementRef as React.RefObject<HTMLHeadingElement>}>{displayedText}<span className="cursor-blink">|</span></h2>

        <div className="education-timeline">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className="timeline-item fade-in-section"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`timeline-dot ${index === 0 ? 'blinking-dot' : 'solid-dot'}`}></div>
              <div className="education-card">
                <div className="education-header">
                  <div className="education-period">
                    <Calendar size={16} className="text-accent" />
                    <span>{edu.period}</span>
                  </div>
                </div>

                <h3 className="institution-name">
                  <GraduationCap size={20} className="text-accent mr-2 inline" style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                  {edu.institution}
                </h3>

                <div className="degree-name">{edu.degree}</div>

                {edu.details && (
                  <div className="education-details">
                    <Award size={16} className="text-accent" style={{ marginRight: '6px' }} />
                    <p>{edu.details}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
