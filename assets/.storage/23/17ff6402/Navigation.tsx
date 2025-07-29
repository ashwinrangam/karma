import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Team', href: '#team' },
    { label: 'Case Studies', href: '#cases' },
    { label: 'Results', href: '#metrics' },
    { label: 'Contact', href: '#contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, { 
        duration: 1.5, 
        scrollTo: element,
        ease: "power2.inOut"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'glassmorphic backdrop-blur-md border-b border-coral/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "power3.out" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer magnetic"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-coral to-violet rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">K</span>
              </div>
              <span className="text-2xl font-bold cinematic-text">Karmuu</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.label}
                  className="text-porcelain/80 hover:text-coral transition-colors magnetic relative group"
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {link.label}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-coral group-hover:w-full transition-all duration-300"></div>
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Button 
                  className="bg-coral hover:bg-coral/80 text-white magnetic"
                  onClick={() => scrollToSection('#contact')}
                >
                  Get Started
                </Button>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-porcelain magnetic"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
                <motion.div
                  className="w-6 h-0.5 bg-current"
                  animate={{
                    rotate: isMobileMenuOpen ? 45 : 0,
                    y: isMobileMenuOpen ? 6 : 0
                  }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-current"
                  animate={{
                    opacity: isMobileMenuOpen ? 0 : 1
                  }}
                />
                <motion.div
                  className="w-6 h-0.5 bg-current"
                  animate={{
                    rotate: isMobileMenuOpen ? -45 : 0,
                    y: isMobileMenuOpen ? -6 : 0
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div 
              className="absolute inset-0 bg-vantablack/90 backdrop-blur-md"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              className="absolute top-20 left-6 right-6 glassmorphic rounded-lg p-6"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="space-y-4">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    className="block w-full text-left text-lg text-porcelain hover:text-coral transition-colors py-2"
                    onClick={() => scrollToSection(link.href)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="pt-4 border-t border-coral/20">
                  <Button 
                    className="w-full bg-coral hover:bg-coral/80 text-white"
                    onClick={() => scrollToSection('#contact')}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};