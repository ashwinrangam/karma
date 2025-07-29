import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0C0C0D]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0C0C0D] via-[#1a0a1a] to-[#0C0C0D]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FD3555]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#B853FF]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#EFEFEF]/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
        >
          <span className="block">Redesigning Intelligence.</span>
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
            className="block text-[#FD3555]"
          >
            Rebuilding the World.
          </motion.span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }}
          className="text-xl md:text-2xl text-white/70 mb-8 max-w-3xl"
        >
          AI / Cloud / Strategy / People — Delivered with Precision & Heart.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          className="flex flex-col md:flex-row gap-6 justify-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-[#FD3555] text-white font-bold text-lg shadow-lg transition-all duration-300 hover:bg-[#B853FF] focus:outline-none"
          >
            Explore Karmuu
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-bold text-lg shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/20 focus:outline-none"
            onClick={() => setModalOpen(true)}
          >
            Watch How We Work
          </motion.button>
        </motion.div>
      </div>

      {/* Simple Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)}>
          <div className="bg-[#0C0C0D] p-8 rounded-xl max-w-2xl mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-xl font-bold">How We Work</h3>
              <button onClick={() => setModalOpen(false)} className="text-white text-2xl hover:text-[#FD3555]">×</button>
            </div>
            <div className="bg-gradient-to-r from-[#FD3555]/20 to-[#B853FF]/20 p-6 rounded-lg">
              <p className="text-white/80 text-center">
                Our innovative approach combines cutting-edge AI with human-centered design to deliver transformative solutions.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}