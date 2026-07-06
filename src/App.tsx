import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Lanyard from './components/Lanyard';
import TargetCursor from './components/TargetCursor';
import PixelBlast from './components/PixelBlast';
import './index.css';

function App() {
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const showLanyard = !isHeroVisible; // Keep mounted while past hero
  const showGetInTouch = !isContactVisible;

  useEffect(() => {
    // Force scroll to top on page load/refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

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

    // 2. Observer for the Hero Section to show the Lanyard
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        setIsHeroVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 } 
    );

    const heroSection = document.getElementById('home') || document.querySelector('section');
    if (heroSection) {
      heroObserver.observe(heroSection);
    }

    // 3. Observer for the Contact Section to hide the "Get In Touch" button
    const contactObserver = new IntersectionObserver(
      ([entry]) => {
        setIsContactVisible(entry.isIntersecting);
      },
      { root: null, threshold: 0.1 }
    );

    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactObserver.observe(contactSection);
    }

    return () => {
      fadeObserver.disconnect();
      heroObserver.disconnect();
      contactObserver.disconnect();
    };
  }, []);

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }}>
        <PixelBlast
          variant="square"
          pixelSize={4}
          color="#2a2a35"
          patternScale={2}
          patternDensity={1}
          pixelSizeJitter={0}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid={false}
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.5}
          edgeFade={0.25}
          transparent
        />
      </div>
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor
        parallaxOn
        hoverDuration={0.2}
        cursorColor="#ffffff"
        cursorColorOnTarget="var(--accent-color)"
      />
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
        padding: '40px 24px',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '12px 28px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '100px',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
          <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
            Designed & Developed by{' '}
            <span style={{ 
              color: 'var(--accent-color)', 
              fontWeight: 600,
              textShadow: '0 0 10px rgba(204, 255, 0, 0.3)'
            }}>
              Devkanti Sarkar
            </span>
          </p>
        </div>
      </footer>

      {/* Render Lanyard only when past Hero, pull it up when at Contact */}
      {showLanyard && (
        <div className={`lanyard-wrapper ${isContactVisible ? 'hide-up' : ''}`}>
          <Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} frontImage="/profile.jpg" backImage="/back-yellow.svg" />
        </div>
      )}

      {/* Standard Button (Hidden when Lanyard is shown or at Contact) */}
      <a 
        href="#contact" 
        className={`header-get-in-touch cursor-target ${(!showLanyard && showGetInTouch) ? 'visible' : 'hidden'}`}
      >
        Get In Touch
      </a>

      {/* Scroll to Top Button (Shows when at Contact) */}
      <button 
        onClick={() => window.scrollTo(0, 0)}
        className={`scroll-to-top cursor-target ${isContactVisible ? 'visible' : 'hidden'}`}
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </>
  );
}

export default App;