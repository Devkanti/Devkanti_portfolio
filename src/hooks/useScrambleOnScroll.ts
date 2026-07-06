import { useState, useEffect, useRef } from 'react';

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const useScrambleOnScroll = <T extends HTMLElement>(fullText: string, speed: number = 30) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayedText(() => {
        return fullText.split("").map((letter, index) => {
          if (index < iteration) {
            return fullText[index];
          }
          if (letter === " ") return " ";
          return LETTERS[Math.floor(Math.random() * LETTERS.length)];
        }).join("");
      });
      
      iteration += 1 / 3;

      if (iteration >= fullText.length) {
        clearInterval(interval);
        // Ensure final text is perfectly matched
        setDisplayedText(fullText);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isVisible, fullText, speed]);

  // Initially show it scrambled before scrolling if you want, but empty string is fine so it pops in
  return { displayedText, elementRef };
};
