import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThreeBackground } from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export const MissionSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const missionStatements = [
    "We build scalable systems.",
    "We empower bold talent.",
    "We deliver clarity through complexity."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate mission statements on scroll
      gsap.fromTo('.mission-line', 
        { 
          y: 100, 
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".mission-section",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Parallax background effect
      gsap.to('.mission-bg', {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: ".mission-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="mission-section relative min-h-screen flex items-center justify-center neural-bg py-24"
    >
      {/* Animated Background */}
      <div className="mission-bg absolute inset-0">
        <ThreeBackground type="neural" />
      </div>

      {/* Vignette Overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-vantablack/30 to-vantablack/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="space-y-16">
          {missionStatements.map((statement, index) => (
            <div
              key={index}
              className="mission-line relative"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-porcelain mb-6">
                {statement}
              </h2>
              
              {/* Decorative Elements */}
              <div className="flex justify-center items-center space-x-4 opacity-60">
                <div className="w-12 h-px bg-gradient-to-r from-transparent to-coral"></div>
                <div className="w-3 h-3 border border-coral rounded-full animate-pulse-glow"></div>
                <div className="w-12 h-px bg-gradient-to-l from-transparent to-coral"></div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-8 h-8 opacity-30">
                <div className="w-full h-full border border-violet rounded-lg animate-float"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 opacity-20">
                <div className="w-full h-full bg-coral/20 rounded-full animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Ghost Effect */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-coral/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};