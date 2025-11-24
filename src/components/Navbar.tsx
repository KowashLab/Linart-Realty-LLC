import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogIn, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/*
═══════════════════════════════════════════════════════════════════
  NAVBAR - Ultra-Premium Royal Navigation
═══════════════════════════════════════════════════════════════════

  Premium features:
  - Linart Realty logo + Cormorant Garamond branding
  - Glass effect on scroll with platinum border
  - Shimmer effects on hover
  - Montserrat navigation with wide letter-spacing
  - Premium button with border and glow
  - Smooth motion animations
  - Auth buttons (Login/Profile)
  
═══════════════════════════════════════════════════════════════════
*/

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Properties', href: '/properties' },
    { name: 'Services', href: '/services' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if ((window as any).navigateTo) {
      (window as any).navigateTo(href);
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled 
            ? 'bg-[#0F0F0F]/95 backdrop-blur-2xl border-b border-[#E5E4E2]/20 shadow-[0_4px_24px_rgba(0,0,0,0.4)]' 
            : 'bg-gradient-to-b from-[#0A0A0B]/80 via-[#0A0A0B]/40 to-transparent'
        }`}
      >
        {/* Decorative Top Line - Platinum Accent */}
        <div 
          className={`absolute top-0 left-0 right-0 h-px transition-opacity duration-700 ${
            isScrolled ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 20%, #A8A9AD 50%, #E5E4E2 80%, transparent 100%)',
          }}
        />

        <div className="container-custom">
          <div className="relative flex items-center justify-between h-16 lg:h-24 xl:h-32 px-4 lg:px-6 xl:px-12">
            
            {/* Logo - Left */}
            <motion.a 
              href="/"
              onClick={(e) => handleNavClick(e, '/')}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group flex-shrink-0 relative z-10"
            >
              {/* Logo Image */}
              <div className="relative w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 overflow-hidden">
                <img 
                  src="/images/logo.png"
                  alt="Linart Realty Logo"
                  className="w-full h-full object-contain opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </motion.a>

            {/* Desktop Navigation Links - Absolute Center relative to viewport */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden 2xl:flex items-center gap-1.5 fixed left-1/2 -translate-x-1/2 pointer-events-none"
              style={{ top: 'inherit' }}
            >
              {links.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative font-['Montserrat'] uppercase text-[#E5E4E2]/70 hover:text-[#F2EEE7] transition-all duration-500 whitespace-nowrap px-1.5 py-2.5 pointer-events-auto"
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em'
                  }}
                >
                  {link.name}
                  
                  {/* Shimmer underline on hover */}
                  <span 
                    className="absolute -bottom-1.5 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                    style={{
                      background: 'linear-gradient(90deg, #E5E4E2, #A8A9AD, #E5E4E2)',
                    }}
                  />
                </a>
              ))}
            </motion.div>

            {/* CTA Button & Auth Buttons - Right (Compact) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="hidden 2xl:flex items-center gap-2 flex-shrink-0 relative z-10"
            >
              {/* Auth Buttons - First */}
              {!loading && (
                <>
                  {user ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if ((window as any).navigateTo) {
                          (window as any).navigateTo('/profile');
                        }
                      }}
                      className="group relative px-3.5 py-2 overflow-hidden bg-transparent border border-[#E5E4E2]/25 hover:border-[#A8A9AD]/70 transition-all duration-700"
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
                      <div className="absolute inset-0 bg-[#0F0F0F]/90 group-hover:bg-[#0F0F0F]/60 transition-all duration-700" />

                      {/* Button Text */}
                      <span 
                        className="relative z-10 font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500 whitespace-nowrap flex items-center justify-center gap-1.5"
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.2em'
                        }}
                      >
                        <User size={11} strokeWidth={1.5} />
                        Profile
                      </span>

                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if ((window as any).navigateTo) {
                          (window as any).navigateTo('/auth');
                        }
                      }}
                      className="group relative px-3.5 py-2 overflow-hidden bg-transparent border border-[#E5E4E2]/25 hover:border-[#A8A9AD]/70 transition-all duration-700"
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
                      <div className="absolute inset-0 bg-[#0F0F0F]/90 group-hover:bg-[#0F0F0F]/60 transition-all duration-700" />

                      {/* Button Text */}
                      <span 
                        className="relative z-10 font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500 whitespace-nowrap flex items-center justify-center gap-1.5"
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.2em'
                        }}
                      >
                        <LogIn size={11} strokeWidth={1.5} />
                        Login
                      </span>

                      {/* Corner accents */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  )}
                </>
              )}

              {/* Consultation Button - Second */}
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  if ((window as any).navigateTo) {
                    (window as any).navigateTo('/contact');
                  }
                }}
                className="group relative px-3.5 py-2 overflow-hidden bg-transparent border border-[#E5E4E2]/25 hover:border-[#A8A9AD]/70 transition-all duration-700"
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
                <div className="absolute inset-0 bg-[#0F0F0F]/90 group-hover:bg-[#0F0F0F]/60 transition-all duration-700" />

                {/* Button Text */}
                <span 
                  className="relative z-10 font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500 whitespace-nowrap flex items-center justify-center"
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em'
                  }}
                >
                  Consultation
                </span>

                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="2xl:hidden relative z-50 text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors duration-300"
            >
              {isMobileMenuOpen ? <X size={30} strokeWidth={1.5} /> : <Menu size={30} strokeWidth={1.5} />}
            </motion.button>
          </div>
        </div>

        {/* Decorative Bottom Pattern - Only when scrolled */}
        <div 
          className={`absolute bottom-0 left-0 right-0 h-8 opacity-5 pointer-events-none transition-opacity duration-700 ${
            isScrolled ? 'opacity-5' : 'opacity-0'
          }`}
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(168, 169, 173, 0.1) 40px, rgba(168, 169, 173, 0.1) 42px)'
          }}
        />
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-[#0A0A0B]/95 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Content */}
            <motion.div
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative top-20 container-custom px-6 py-12"
            >
              {/* Decorative top line */}
              <div 
                className="h-px mb-12"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
                }}
              />

              {/* Navigation Links */}
              <nav className="space-y-8 mb-12">
                {links.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="block font-['Montserrat'] uppercase text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors duration-300"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      letterSpacing: '0.15em'
                    }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </nav>

              {/* CTA Button Mobile */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                onClick={() => {
                  if ((window as any).navigateTo) {
                    (window as any).navigateTo('/contact');
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-4 px-6 border border-[#E5E4E2]/40 bg-[#0F0F0F]/80 hover:bg-[#0F0F0F] transition-all duration-500"
              >
                <span 
                  className="font-['Montserrat'] uppercase text-[#E5E4E2]"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em'
                  }}
                >
                  Schedule Consultation
                </span>
              </motion.button>

              {/* Decorative bottom line */}
              <div 
                className="h-px mt-12"
                style={{
                  background: 'linear-gradient(90deg, transparent, #E5E4E2, transparent)',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}