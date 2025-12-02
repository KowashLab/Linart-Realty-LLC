import React from 'react';
import { SEO } from '../components/SEO';
import { Testimonials } from '../components/Testimonials';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS PAGE - Client Success Stories
═══════════════════════════════════════════════════════════════════
*/

export function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Client Testimonials & Reviews - Luxury Real Estate Success Stories | Linart Realty"
        description="Read authentic reviews from our distinguished clients. 4.9/5 rating, 98% satisfaction rate, 92% repeat & referral rate. Discover why Florida's elite trust Linart Realty."
        canonical="https://www.linartrealty.com/testimonials"
        ogType="website"
        keywords="Linart Realty reviews, luxury real estate testimonials Florida, client success stories, premium property services reviews, Florida real estate client satisfaction"
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
              Client Reviews
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
            Client Testimonials
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
            Hear from our distinguished clients who have experienced the Linart Realty difference in their real estate journey
          </p>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10"
          >
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-[#A8A9AD] fill-[#A8A9AD]" />
              ))}
            </div>
            <div 
              className="font-['Cinzel'] text-[#F2EEE7] mb-2"
              style={{
                fontSize: '2.5rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              4.9/5
            </div>
            <div 
              className="font-['Montserrat'] text-[#E5E4E2]/60"
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.05em'
              }}
            >
              Average Client Rating
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-center p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10"
          >
            <Quote className="w-10 h-10 text-[#A8A9AD] mx-auto mb-4" strokeWidth={1.5} />
            <div 
              className="font-['Cinzel'] text-[#F2EEE7] mb-2"
              style={{
                fontSize: '2.5rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              98%
            </div>
            <div 
              className="font-['Montserrat'] text-[#E5E4E2]/60"
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.05em'
              }}
            >
              Client Satisfaction Rate
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10"
          >
            <Quote className="w-10 h-10 text-[#A8A9AD] mx-auto mb-4" strokeWidth={1.5} />
            <div 
              className="font-['Cinzel'] text-[#F2EEE7] mb-2"
              style={{
                fontSize: '2.5rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              92%
            </div>
            <div 
              className="font-['Montserrat'] text-[#E5E4E2]/60"
              style={{
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '0.05em'
              }}
            >
              Repeat & Referral Rate
            </div>
          </motion.div>
        </div>

      </div>

      {/* Main Testimonials Component */}
      <Testimonials />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center py-20 mb-20 border-t border-[#E5E4E2]/10"
        >
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Join Our Satisfied Clients
          </h2>
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/70 mb-8 max-w-2xl mx-auto"
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.7
            }}
          >
            Experience the same exceptional service and results. Schedule your 
            private consultation today.
          </p>
          <PremiumButton 
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              if ((window as any).navigateTo) {
                (window as any).navigateTo('/contact');
              }
            }}
          >
            Start Your Journey
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}