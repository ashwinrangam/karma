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
      className="magnetic-cursor hidden md:block"
    />
  );
};