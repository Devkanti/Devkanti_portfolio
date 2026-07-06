import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { VscHome, VscMortarBoard, VscCode, VscBriefcase, VscPass, VscMail } from 'react-icons/vsc';
import Dock from './Dock';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > window.innerHeight * 0.8);

      // Dynamically track active section
      const sections = ['home', 'education', 'skills', 'projects', 'certificates', 'contact'];
      let current = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section's top is in the upper half of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call to set active section on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', icon: <VscHome size={22} /> },
    { name: 'Education', href: '#education', icon: <VscMortarBoard size={22} /> },
    { name: 'Skills', href: '#skills', icon: <VscCode size={22} /> },
    { name: 'Projects', href: '#projects', icon: <VscBriefcase size={22} /> },
    { name: 'Certificates', href: '#certificates', icon: <VscPass size={22} /> },
    { name: 'Contact', href: '#contact', icon: <VscMail size={22} /> },
  ];

  const dockItems = navLinks.map(link => ({ 
    icon: link.icon,
    label: link.name, 
    onClick: () => window.location.hash = link.href,
    active: activeSection === link.href.substring(1) 
  }));

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        {/* Desktop Nav - Floating Mac-style Dock */}
        <div className="desktop-nav">
          <AnimatePresence>
            {!isPastHero ? (
              <motion.div
                key="horizontal-dock"
                initial={{ opacity: 0, y: 50, x: '-50%' }}
                animate={{ opacity: 1, y: 0, x: '-50%' }}
                exit={{ opacity: 0, y: 50, x: '-50%' }}
                transition={{ duration: 0.3 }}
                style={{ position: 'fixed', bottom: '1rem', left: '50%', zIndex: 1000 }}
              >
                <Dock 
                  items={dockItems} 
                  panelHeight={68}
                  baseItemSize={50}
                  magnification={70}
                  direction="horizontal"
                />
              </motion.div>
            ) : (
              <motion.div
                key="vertical-dock"
                initial={{ opacity: 0, x: -50, y: '-50%' }}
                animate={{ opacity: 1, x: 0, y: '-50%' }}
                exit={{ opacity: 0, x: -50, y: '-50%' }}
                transition={{ duration: 0.3 }}
                style={{ position: 'fixed', top: '50%', left: '1rem', zIndex: 1000 }}
              >
                <Dock 
                  items={dockItems} 
                  panelHeight={68}
                  baseItemSize={50}
                  magnification={70}
                  direction="vertical"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mobile Nav Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
