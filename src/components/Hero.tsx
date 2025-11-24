import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Crown } from 'lucide-react';

/*
═══════════════════════════════════════════════════════════════════
  HERO SECTION - Minimalist design with video background
═══════════════════════════════════════════════════════════════════

  Features:
  - Looped HD video background
  - Dark gradient overlay for readability
  - Linart Realty LLC logo
  - Platinum shimmer effect on heading
  - Smooth scroll animation
  
  Configuration:
  - Logo size: Adjust w-[280px] lg:w-[320px]
  - Video: Replace image URL with video source
  
═══════════════════════════════════════════════════════════════════
*/

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      // Slow playback rate for cinematic effect
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative h-screen min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(168, 169, 173, 0.1) 100px, rgba(168, 169, 173, 0.1) 102px)'
        }} />
      </div>
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Static image fallback (before video loads) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/hero-bg.jpg')`,
            filter: 'brightness(0.35) contrast(1.1)',
          }}
        />

        {/* Dark gradient overlays for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0B]/60 via-[#0A0A0B]/40 to-[#0A0A0B]/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B] via-transparent to-transparent" />
        
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 shadow-[inset_0_0_200px_rgba(10,10,11,0.8)]" />
      </div>

      {/* Content Container */}
      <div className="container-custom relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center mb-12 lg:mb-16"
          >
            <img 
              src="/images/logo.png"
              alt="Linart Realty LLC"
              className="w-[200px] lg:w-[240px] h-auto opacity-95 hover:opacity-100 transition-opacity duration-500"
            />
          </motion.div>

          {/* Company Name with platinum shimmer effect */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-12 lg:mb-16"
          >
            <span className="platinum-shimmer block font-['Cormorant_Garamond']">
              Linart Realty LLC
            </span>
          </motion.h1>

          {/* Divider Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-24 h-px mx-auto mb-10 lg:mb-12 platinum-gradient"
          />

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-['Montserrat'] uppercase text-[#E5E4E2]/80 mb-20 lg:mb-24 leading-relaxed whitespace-nowrap"
            style={{
              fontSize: 'clamp(0.75rem, 1.5vw, 1.35rem)',
              fontWeight: 500,
              letterSpacing: '0.1em',
            }}
          >
            From Properties to Portfolios - Wealth Engineered to Last
          </motion.p>

          {/* Call to Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block"
          >
            <button 
              onClick={() => {
                if ((window as any).navigateTo) {
                  (window as any).navigateTo('/contact');
                }
              }}
              className="group relative inline-flex items-center gap-3 px-10 py-4 border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 bg-transparent overflow-hidden transition-all duration-700"
            >
              {/* Shimmer effect on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
                  backgroundSize: '200% 200%',
                  animation: 'shimmer 3s ease-in-out infinite',
                }}
              />
              <div className="absolute inset-0 bg-[#0F0F0F]/90 group-hover:bg-[#0F0F0F]/80 transition-all duration-700" />
              
              <span className="relative z-10 font-['Montserrat'] tracking-[0.25em] uppercase text-xs text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500">
                Begin Your Journey
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-['Montserrat'] text-[#E5E4E2]/40 text-xs tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <ArrowDown className="w-5 h-5 text-[#A8A9AD]/60" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Decorative corner accents */}
      <div className="absolute top-0 left-0 w-40 h-40 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-20 h-px bg-gradient-to-r from-[#E5E4E2] to-transparent" />
        <div className="absolute top-0 left-0 w-px h-20 bg-gradient-to-b from-[#E5E4E2] to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-20 h-px bg-gradient-to-l from-[#E5E4E2] to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-20 bg-gradient-to-t from-[#E5E4E2] to-transparent" />
      </div>
    </section>
  );
}