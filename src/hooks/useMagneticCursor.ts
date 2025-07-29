import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useMagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out"
      });

      // Create particle trail
      if (Math.random() > 0.8) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const createParticle = (x: number, y: number) => {
      const particle = document.createElement('div');
      particle.className = 'particle-trail';
      particle.style.left = `${x - 2}px`;
      particle.style.top = `${y - 2}px`;
      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 1000);
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('magnetic')) {
        gsap.to(cursor, {
          scale: 1.5,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return { cursorRef };
};