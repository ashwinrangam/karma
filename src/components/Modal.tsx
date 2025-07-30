import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Modal({ open, onClose, children }: { open: boolean, onClose: () => void, children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-transparent p-0"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            {children}
            <button
              className="absolute top-4 right-4 text-white text-2xl bg-black/40 rounded-full p-2 hover:bg-black/70 transition"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}