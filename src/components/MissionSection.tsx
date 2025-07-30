import React from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

export default function MissionSection() {
  return (
    <section className="relative min-h-screen bg-[#0C0C0D] overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-8"
          >
            The Karmuu Mission
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 leading-relaxed"
          >
            We're not just building technology—we're rewiring the future of intelligence itself. 
            Through AI, cloud infrastructure, deep strategy, and human-centered design, 
            we create solutions that don't just work—they transform.
          </motion.p>
        </div>
      </div>
    </section>
  );
}