import React from 'react';
import { SEO } from '../components/SEO';
import { Contact } from '../components/Contact';
import { motion } from 'framer-motion';

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

      {/* Main Contact Component */}
      <Contact />

    </div>
  );
}