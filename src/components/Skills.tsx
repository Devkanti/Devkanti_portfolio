import { Server, Layout, Database, Terminal, Globe } from 'lucide-react';
import { useTypewriterOnScroll } from '../hooks/useTypewriterOnScroll';
import './Skills.css';

const Skills = () => {
  const { displayedText, elementRef } = useTypewriterOnScroll('Tech Stack and Languages', 100);
  const skillsData = [
    {
      title: 'Languages',
      icon: <Globe className="skill-icon" size={24} />,
      description: 'English - Fluent, Bengali - Fluent, Hindi - Fluent, Japanese - N5',
    },
    {
      title: 'Programming Languages',
      icon: <Terminal className="skill-icon" size={24} />,
      description: 'Python, C, C++, Java, JavaScript',
    },
    {
      title: 'Web and App Development',
      icon: <Layout className="skill-icon" size={24} />,
      description: 'HTML, CSS, React.js, Node.js, Express.js, Flutter, Streamlit, REST APIs, Git, GitHub',
    },
    {
      title: 'Database Management',
      icon: <Database className="skill-icon" size={24} />,
      description: 'MongoDB, PostgreSQL, SQL, Firebase',
    },
    {
      title: 'AI & Data Science',
      icon: <Server className="skill-icon" size={24} />,
      description: 'Machine Learning, NLP, HuggingFace, Data Structures.',
    }
  ];

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <h2 className="section-title fade-in-section" ref={elementRef as React.RefObject<HTMLHeadingElement>}>{displayedText}<span className="cursor-blink">|</span></h2>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              className="glass-card skill-card fade-in-section"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="skill-icon-wrapper">
                {skill.icon}
              </div>
              <h3 className="skill-title">{skill.title}</h3>
              <div className="skill-tags">
                {skill.description.split(', ').map((tag, i) => (
                  <span key={i} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
