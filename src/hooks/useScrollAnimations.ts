import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero text animations
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      })
      .to(".hero-title", { y: -100, opacity: 0.5, duration: 1 })
      .to(".hero-subtitle", { y: -80, opacity: 0.3, duration: 1 }, 0.2);

      // Mission section reveals
      gsap.fromTo(".mission-line", 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.3,
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Service tiles animation
      gsap.fromTo(".service-tile",
        { scale: 0.8, opacity: 0, y: 50 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Team cards horizontal scroll
      const teamSection = document.querySelector('.team-section');
      if (teamSection) {
        gsap.to(".team-cards", {
          x: () => -(teamSection.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: teamSection,
            pin: true,
            scrub: 1,
            end: () => `+=${teamSection.scrollWidth - window.innerWidth}`
          }
        });
      }

      // Metrics counter animation
      gsap.fromTo(".metric-number",
        { innerText: 0 },
        {
          innerText: (i, target) => target.dataset.value,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: ".metrics-section",
            start: "top 80%",
            toggleActions: "play none none reset"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return { containerRef };
};