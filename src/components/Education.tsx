
import { useScrambleOnScroll } from '../hooks/useScrambleOnScroll';
import './Education.css';

const Education = () => {
  const { displayedText, elementRef } = useScrambleOnScroll('ACADEMIC BACKGROUND', 30);
  const educationData = [
    {
      period: '2024 - 2028',
      institution: 'Vellore Institute of Technology',
      degree: 'B.Tech in Information Technology',
      details: 'CGPA: 8.6',
    },
    {
      period: '2022 - 2024',
      institution: 'North Point School, Asansol',
      degree: 'Higher Secondary Education',
      details: 'Completed with Physics, Chemistry, Mathematics and Biology',
    },
    {
      period: '2011 - 2022',
      institution: "St. Vincent's High & Technical School",
      degree: 'Secondary Education',
      details: 'General Studies',
    }
  ];

  return (
    <section id="education" className="section education-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 className="section-title fade-in-section is-visible" style={{ alignSelf: 'flex-start' }} ref={elementRef as React.RefObject<HTMLHeadingElement>}>
          {displayedText}
        </h2>
        
        <div className="education-grid">
          {/* Academic Background Box */}
          <div className="academic-box fade-in-section is-visible">
            <div className="education-timeline">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="timeline-item"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className={`timeline-dot ${index === 0 ? 'blinking-dot cursor-target' : 'solid-dot'}`}></div>
                  <div className="education-content">
                    <div className="education-period">
                      {edu.period}
                    </div>

                    <h3 className="institution-name">
                      {edu.institution}
                    </h3>

                    <div className="degree-name">
                      {edu.degree}
                      {edu.details && `, ${edu.details}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Lingual Proficiency Box */}
          <div className="lingual-box fade-in-section is-visible">
            <h3 className="lingual-title">LINGUAL PROFICIENCY</h3>
            <ul className="lingual-list">
              <li className="lingual-item">
                <span className="lang-name">English</span>
                <span className="lang-level">C2</span>
              </li>
              <li className="lingual-item">
                <span className="lang-name">Bengali</span>
                <span className="lang-level">FLUENT</span>
              </li>
              <li className="lingual-item">
                <span className="lang-name">Hindi</span>
                <span className="lang-level">FLUENT</span>
              </li>
              <li className="lingual-item">
                <span className="lang-name">Japanese</span>
                <span className="lang-level">N5</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
