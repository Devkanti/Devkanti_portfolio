import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import './index.css';

function App() {
  const [showGetInTouch, setShowGetInTouch] = useState(true);

  useEffect(() => {
    // 1. Observer for scroll animations (fade-in)
    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => fadeObserver.observe(el));

    // 2. Observer for the Contact Section to hide the "Get In Touch" button
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        // If the contact section is currently intersecting (visible), hide the button
        setShowGetInTouch(!entry.isIntersecting);
      },
      { root: null, threshold: 0.1 } // Triggers when 10% of the contact section is in view
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactObserver.observe(contactSection);
    }

    // Safely disconnect all observers when the component unmounts
    return () => {
      fadeObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Certificates />
        <Contact />
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '24px',
        color: 'var(--text-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto'
      }}>
        <p>&copy; {new Date().getFullYear()} Devkanti Sarkar. All rights reserved.</p>
      </footer>

      <a href="#contact" className={`header-get-in-touch ${showGetInTouch ? 'visible' : 'hidden'}`}>
        Get In Touch
      </a>
    </>
  );
}

export default App;