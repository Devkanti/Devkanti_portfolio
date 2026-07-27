import { useState, useEffect, useRef } from 'react';

export const useTypewriterOnScroll = <T extends HTMLElement>(fullText: string, speed: number = 80) => {
  const [index, setIndex] = useState(0);
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
      { threshold: 0.25 } // Lower threshold so it starts typing earlier
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    if (index >= fullText.length) return;

    // Use a clean timeout linked to the exact index state. 
    // This perfectly prevents overlapping intervals and lag!
    const timeout = setTimeout(() => {
      setIndex((prevIndex) => prevIndex + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [isVisible, index, fullText.length, speed]);

  const displayedText = fullText.substring(0, index);

  return { displayedText, elementRef };
};