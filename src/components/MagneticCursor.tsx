import { useEffect } from 'react';
import { useMagneticCursor } from '@/hooks/useMagneticCursor';

export const MagneticCursor = () => {
  const { cursorRef } = useMagneticCursor();

  useEffect(() => {
    // Hide default cursor
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        cursor: none !important;
      }
      .magnetic {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div 
      ref={cursorRef}
      className="magnetic-cursor hidden md:block fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9999] mix-blend-lighten"
      style={{
        boxShadow: '0 0 32px 8px rgba(255,0,60,0.25), 0 0 64px 16px rgba(124,69,255,0.15)',
        background: 'rgba(30, 20, 60, 0.18)',
        backdropFilter: 'blur(8px)',
        filter: 'blur(2px)',
        border: '2px solid rgba(255,0,60,0.25)',
        transition: 'background 0.2s, box-shadow 0.2s',
      }}
      aria-hidden="true"
    />
  );
};