import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springConfig = { stiffness: 500, damping: 40 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      x.set(e.clientX - 16);
      y.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [x, y]);

  return (
    <motion.div
      ref={cursorRef}
      className="fixed z-[1000] pointer-events-none w-8 h-8 rounded-full border-2 border-[#FD3555] bg-[#FD3555]/20 mix-blend-difference"
      style={{ left: 0, top: 0, x: springX, y: springY }}
    />
  );
};

export default MagneticCursor;