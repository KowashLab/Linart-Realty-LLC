import React from 'react';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { motion } from 'motion/react';

/*
═══════════════════════════════════════════════════════════════════
  CONTACT PAGE - Get in Touch
═══════════════════════════════════════════════════════════════════
*/

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Contact Linart Realty - Schedule Your Luxury Property Consultation | Florida"
        description="Get in touch with Linart Realty for exclusive luxury real estate opportunities in Florida. Schedule a private consultation with our expert team today."
        canonical="https://www.linartrealty.com/contact"
        ogType="website"
        keywords="contact Linart Realty, luxury real estate consultation Florida, schedule property viewing, premium real estate services Florida"
      />

      {/* Decorative Background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-center mb-20"
        >
          <div className="inline-block mb-6">
            <div 
              className="font-['Montserrat'] uppercase text-[#A8A9AD] tracking-[0.3em] mb-2"
              style={{ fontSize: '0.75rem', fontWeight: 600 }}
            >
              Get In Touch
            </div>
            <div 
              className="h-px w-24 mx-auto"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 50%, transparent 100%)'
              }}
            />
          </div>
          
          <h1 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              lineHeight: 1.2
            }}
          >
            Contact Us
          </h1>

          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-3xl mx-auto"
            style={{
              fontSize: '1.1rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.7
            }}
          >
            Schedule a private consultation to discuss your real estate objectives. 
            Our team is ready to bring your vision to life.
          </p>
        </motion.div>

      </div>

      {/* Main Contact Component */}
      <Contact />

    </div>
  );
}