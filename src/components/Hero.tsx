import { useState, useEffect } from 'react';
import { ArrowDown, Download } from 'lucide-react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const [nameText, setNameText] = useState('');
  const fullText = "Hi, I'M DEVKANTI";
  const speed = 150; // Slower typing speed

  const welcomeWords = [
    "Welcome", // English
    "স্বাগতম", // Bengali
    "स्वागत", // Hindi
    "ようこそ", // Japanese
    "Bienvenue", // French
    "Bienvenido", // Spanish
    "Willkommen", // German
    "Benvenuto", // Italian
    "Bem-vindo", // Portuguese
    "欢迎", // Chinese (Mandarin)
    "Добро пожаловать", // Russian
    "أهلاً بك", // Arabic
    "환영합니다", // Korean
    "Hoş geldiniz", // Turkish
    "Chào mừng", // Vietnamese
    "Welkom", // Dutch
    "Καλώς ήρθατε", // Greek
    "Välkommen", // Swedish
    "Witaj", // Polish
    "ברוך הבא", // Hebrew
    "ยินดีต้อนรับ", // Thai
    "Selamat datang", // Indonesian
    "Karibu", // Swahili
    "خوش آمدید", // Urdu/Persian
    "நல்வரவு", // Tamil
    "స్వాగతం", // Telugu
    "സ്വാഗതം", // Malayalam
    "स्वागत आहे", // Marathi
    "સ્વાગત છે" // Gujarati
  ];
  const [welcomeIndex, setWelcomeIndex] = useState(0);

  useEffect(() => {
    if (nameText.length >= fullText.length) return;

    const timeout = setTimeout(() => {
      setNameText(fullText.substring(0, nameText.length + 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [nameText, fullText, speed]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="hero section">
      <div className="container hero-container">
        <div className="hero-content fade-in-section is-visible">
          <div className="greeting-hire">
            <span className="pulse-dot-pink"></span>
            Available For Hire
          </div>
          <h1 className="name">
            {nameText}<span className="cursor-blink">|</span>
          </h1>
          <h2 className="welcome-text" key={welcomeIndex}>
            {welcomeWords[welcomeIndex]}
          </h2>
          <p className="description">
            Undergraduate at VIT Vellore passionate about building AI-powered applications and scalable full-stack systems. I thrive on solving complex problems, from training machine learning models to designing elegant, high-performance web experiences.
          </p>

          <div className="hero-cta">
            <a href="#projects" className="btn btn-view-work cursor-target">
              View My Work <ArrowDown size={20} />
            </a>
            <a href="/Devkanti_Sarkar_Resume.pdf" download className="btn btn-outline cursor-target">
              Download Resume <Download size={20} style={{ marginLeft: '8px' }} />
            </a>
          </div>

          <div className="social-links">
            <a href="https://github.com/Devkanti" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon cursor-target">
              <FiGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/devkantisarkar/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon cursor-target">
              <FiLinkedin size={24} />
            </a>
            <a href="mailto:work.devkantisarkar@gmail.com" aria-label="Email" className="social-icon cursor-target">
              <FiMail size={24} />
            </a>
          </div>
        </div>

        <div className="hero-visual fade-in-section is-visible">
          <div className="blob-container">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="hero-image-card-brutalist">
              <img src="/profile.jpg" alt="Devkanti Sarkar" className="hero-profile-image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;