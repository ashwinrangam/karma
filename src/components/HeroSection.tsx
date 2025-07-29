import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import MagneticCursor from './MagneticCursor';
import ThreeBackground from './ThreeBackground';
import Modal from './Modal';

const videoUrl = '/assets/cover/28510b1514ac4c3782ee4bf65b9b3a51.jpg'; // Replace with actual video path

export default function HeroSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0C0C0D]">
      {/* Video Background */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={videoUrl}
        autoPlay
        loop
        muted
        playsInline
        poster={videoUrl}
        style={{ filter: 'brightness(0.7) blur(1px)' }}
      />
      {/* Vignette Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-[#2d001a99] to-[#0C0C0D]/90 pointer-events-none" />
      {/* Floating WebGL Elements */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ThreeBackground />
        </Canvas>
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          className="flex flex-col md:flex-row gap-6 justify-center mt-8"
        >
          <button
            className="px-8 py-4 rounded-full bg-[#FD3555] text-white font-bold text-lg shadow-lg transition-transform duration-300 hover:scale-105 hover:bg-[#B853FF] focus:outline-none"
          >
            Explore Karmuu
          </button>
          <button
            className="px-8 py-4 rounded-full bg-white/10 border border-white/30 text-white font-bold text-lg shadow-lg backdrop-blur-md transition-transform duration-300 hover:scale-105 hover:bg-white/20 focus:outline-none"
            onClick={() => setModalOpen(true)}
          >
            Watch How We Work
          </button>
        </motion.div>
      </div>
      {/* Magnetic Cursor */}
      <MagneticCursor />
      {/* Modal Sizzle Reel */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="w-full h-full flex items-center justify-center">
          <video src="/assets/cover/b1701654921245689e5e1f2ddb46ce05.jpg" controls className="w-full h-auto rounded-xl shadow-2xl" />
        </div>
      </Modal>
    </section>
  );
}