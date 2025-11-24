import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

/*
═══════════════════════════════════════════════════════════════════
  BACK TO TOP - Ultra-Premium Royal Scroll Button
═══════════════════════════════════════════════════════════════════

  Premium Features:
  - Appears after scrolling 400px
  - Platinum frame with shimmer effect
  - Smooth animation on hover
  - Royal corner accents
  - Smooth scroll to top
  
═══════════════════════════════════════════════════════════════════
*/

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={scrollToTop}
          className="group fixed bottom-8 right-8 z-40 w-14 h-14 overflow-hidden bg-transparent border border-[#E5E4E2]/30 hover:border-[#A8A9AD]/80 transition-all duration-700 flex items-center justify-center"
          aria-label="Back to top"
        >
          {/* Shimmer background on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
              backgroundSize: '200% 200%',
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
          
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0F0F0F]/95 group-hover:bg-[#0F0F0F]/70 transition-all duration-700" />

          {/* Arrow Icon */}
          <motion.div
            className="relative z-10"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowUp 
              size={24} 
              strokeWidth={1.5}
              className="text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500" 
            />
          </motion.div>

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Glow effect on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none blur-xl"
            style={{
              background: 'radial-gradient(circle, #E5E4E2 0%, transparent 70%)',
            }}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
}