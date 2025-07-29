import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ThreeBackground } from './ThreeBackground';

gsap.registerPlugin(ScrollTrigger);

export const FinalCTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 100, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".final-cta-section",
            start: "top 70%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Glowing border animation
      gsap.to('.glow-border', {
        backgroundPosition: '400% 0',
        duration: 3,
        repeat: -1,
        ease: "none"
      });

      // Floating elements
      gsap.to('.floating-element', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        stagger: 0.3
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="final-cta-section relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video (Abstract/Particles) */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground type="particles" />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-10"
        >
          <source src="/api/placeholder/1920/1080/mp4" type="video/mp4" />
        </video>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-vantablack/80 via-transparent to-vantablack/90"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-coral/5 to-violet/10"></div>

      <div className="cta-content relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Floating Decorative Elements */}
        <div className="floating-element absolute -top-12 -left-12 w-24 h-24 border border-coral/20 rounded-full opacity-30"></div>
        <div className="floating-element absolute -bottom-8 -right-8 w-16 h-16 bg-gradient-to-br from-coral/20 to-violet/20 rounded-lg opacity-40" style={{ animationDelay: '0.5s' }}></div>
        <div className="floating-element absolute top-1/2 -left-20 w-8 h-8 bg-coral/30 rounded-full opacity-50" style={{ animationDelay: '1s' }}></div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-8 cinematic-text">
            Let's Build the Future
          </h2>
          
          <p className="text-xl md:text-2xl text-porcelain/80 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with cutting-edge AI, cloud solutions, and strategic innovation? 
            Your journey to technological excellence starts with a single conversation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              className="glow-border magnetic text-lg px-12 py-6 bg-coral hover:bg-coral/80 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              Book a Discovery Call
            </Button>
            
            <Button 
              variant="outline"
              className="glassmorphic magnetic text-lg px-12 py-6 border-2 border-coral/30 hover:border-coral hover:bg-coral/10 text-porcelain font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              View Our Thinking
            </Button>
          </div>

          {/* Contact Information Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div 
              className="glassmorphic p-6 rounded-lg text-center group cursor-pointer"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-3">📧</div>
              <h3 className="font-semibold text-porcelain mb-2 group-hover:text-coral transition-colors">Email Us</h3>
              <p className="text-porcelain/70 text-sm">hello@karmuu.tech</p>
            </motion.div>

            <motion.div 
              className="glassmorphic p-6 rounded-lg text-center group cursor-pointer"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-3">📞</div>
              <h3 className="font-semibold text-porcelain mb-2 group-hover:text-coral transition-colors">Call Us</h3>
              <p className="text-porcelain/70 text-sm">+1 (555) 123-TECH</p>
            </motion.div>

            <motion.div 
              className="glassmorphic p-6 rounded-lg text-center group cursor-pointer"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="font-semibold text-porcelain mb-2 group-hover:text-coral transition-colors">Visit Us</h3>
              <p className="text-porcelain/70 text-sm">San Francisco, NYC, London</p>
            </motion.div>
          </div>

          {/* Social Proof */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-center">
              <div className="text-2xl font-bold text-coral">24/7</div>
              <div className="text-xs text-porcelain/70">Support</div>
            </div>
            <div className="w-px h-8 bg-porcelain/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-coral">ISO</div>
              <div className="text-xs text-porcelain/70">Certified</div>
            </div>
            <div className="w-px h-8 bg-porcelain/20"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-coral">GDPR</div>
              <div className="text-xs text-porcelain/70">Compliant</div>
            </div>
          </div>
        </motion.div>

        {/* Ambient Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-coral/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vantablack to-transparent"></div>
    </section>
  );
};