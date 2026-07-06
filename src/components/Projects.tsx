import { useScrambleOnScroll } from '../hooks/useScrambleOnScroll';
import { Eye } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  // Pass HTMLHeadingElement to the generic hook - clean and type-safe!
  const { displayedText, elementRef } = useScrambleOnScroll<HTMLHeadingElement>('Featured Works', 30);
  const projectsData = [
    {
      category: 'Backend / Systems',
      title: 'Query Engine',
      description: 'Engineered a containerized Approximate Query Engine delivering high-speed data analytics. Built a custom SQL engine in Rust to bypass database I/O bottlenecks and integrated zero-latency gRPC RPC.',
      github: 'https://github.com/Devkanti/GDG-Query-Engine',
      live: 'https://queryengine.vercel.app/'
    },
    {
      category: 'AI & Data Science',
      title: 'Automated Resume Scoring',
      description: 'Built an AI-powered resume screening system for automated candidate ranking using NLP embeddings (HuggingFace). Features scalable FastAPI backend and interactive Streamlit analytics dashboard.',
      github: 'https://github.com/Devkanti/SAH-Hackathon-ResumeScoring'
    },
    {
      category: 'Full-Stack Development',
      title: 'LMS - Learning Platform',
      description: 'Full-stack Learning Management System with secure role-based access. Includes dynamic video lecture delivery, automated backend grading logic using MongoDB, and interactive teacher grading desk.',
      github: 'https://github.com/Devkanti/Learning-Portal',
      live: 'https://devkantilearningportal.vercel.app/'
    }
  ];

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* The ref is now natively typed, no "as" keyword needed */}
        <h2 className="section-title fade-in-section" ref={elementRef}>{displayedText}</h2>

        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="project-card-brutalist fade-in-section"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="project-badge">{project.category}</div>
              <h3 className="project-title-large">{project.title}</h3>
              <p className="project-description-large">{project.description}</p>

              <div className="project-action">
                <a href={project.github} className="btn-view-project cursor-target" target="_blank" rel="noopener noreferrer">
                  VIEW CODE &rarr;
                </a>
                {project.live && (
                  <a href={project.live} className="btn-view-project btn-icon-only cursor-target" target="_blank" rel="noopener noreferrer" title="View Live Website">
                    <Eye size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;