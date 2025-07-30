import React from 'react';
import { motion } from 'framer-motion';
import ThreeBackground from './ThreeBackground';

const services = [
  {
    title: "Cloud Infrastructure",
    description: "Scalable, secure, and performant cloud solutions that power the future.",
    color: "#FD3555"
  },
  {
    title: "Artificial Intelligence",
    description: "Cutting-edge AI systems that learn, adapt, and transform your business.",
    color: "#B853FF"
  },
  {
    title: "Deep Strategy",
    description: "Strategic consulting that aligns technology with business objectives.",
    color: "#EFEFEF"
  },
  {
    title: "People Systems",
    description: "Human-centered design that puts people at the heart of technology.",
    color: "#B2B2B2"
  }
];

export default function ServicesSection() {
  return (
    <section className="relative min-h-screen bg-[#0C0C0D] overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold text-white text-center mb-16"
          >
            What We Do
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:bg-white/10 transition-all duration-300"
              >
                <h3 
                  className="text-2xl font-bold text-white mb-4"
                  style={{ color: service.color }}
                >
                  {service.title}
                </h3>
                <p className="text-white/70 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}