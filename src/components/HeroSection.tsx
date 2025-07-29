import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { ThreeBackground } from './ThreeBackground';

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [bgMode, setBgMode] = useState<'particles' | 'video'>('particles');

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline();
      
      tl.from('.hero-title', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      })
      .from('.hero-subtitle', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      }, "-0.5")
      .from('.hero-cta', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }, "-0.3")
      .from('.scroll-hint', {
        opacity: 0,
        duration: 0.5
      }, "-0.2");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="hero-section relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js Background */}
      <ThreeBackground type="particles" enabled={bgMode === 'particles'} />
      {/* Video Background (Optional) */}
      {bgMode === 'video' && (
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-20"
            preload="auto"
          >
            <source src="/api/placeholder/1920/1080/mp4" type="video/mp4" />
          </video>
        </div>
      )}
      {/* Overlay Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <motion.h1 
          className="hero-title text-6xl md:text-8xl font-bold mb-6 cinematic-text"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          Redesigning Intelligence.
          <br />
          <span className="text-coral">Rebuilding the World.</span>
        </motion.h1>
        <motion.p 
          className="hero-subtitle text-xl md:text-2xl text-porcelain/80 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
        >
          AI / Cloud / Strategy / People — Delivered with Precision & Heart.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Button 
            className="hero-cta glassmorphic magnetic text-lg px-8 py-4 hover:bg-coral/20 transition-all duration-300"
            size="lg"
          >
            Explore Karmuu
          </Button>
          <Button 
            variant="outline"
            className="hero-cta glassmorphic magnetic text-lg px-8 py-4 border-coral/30 hover:border-coral hover:bg-coral/10 transition-all duration-300"
            size="lg"
          >
            Watch How We Work
          </Button>
        </div>
        {/* Background Toggle */}
        <div className="mt-8 flex justify-center gap-4">
          <button
            className={`px-4 py-2 rounded-full border ${bgMode === 'particles' ? 'bg-coral text-porcelain' : 'bg-vantablack text-coral border-coral'}`}
            onClick={() => setBgMode('particles')}
          >
            Particles
          </button>
          <button
            className={`px-4 py-2 rounded-full border ${bgMode === 'video' ? 'bg-coral text-porcelain' : 'bg-vantablack text-coral border-coral'}`}
            onClick={() => setBgMode('video')}
          >
            Video
          </button>
        </div>
        {/* Scroll Hint */}
        <motion.div 
          className="scroll-hint absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="flex flex-col items-center text-porcelain/60">
            <span className="text-sm mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-coral/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-coral rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* Ambient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vantablack/20 to-vantablack/80 pointer-events-none"></div>
    </section>
  );
};