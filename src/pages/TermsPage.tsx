import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  TERMS OF SERVICE PAGE
═══════════════════════════════════════════════════════════════════
*/

export function TermsPage() {
  const sections = [
    {
      icon: FileText,
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Linart Realty LLC\'s website and services, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you should not use our services or access our website.',
        'We reserve the right to update these terms at any time. Continued use of our services constitutes acceptance of modified terms.'
      ]
    },
    {
      icon: Scale,
      title: 'Professional Services',
      content: [
        'Linart Realty LLC is a licensed real estate brokerage operating in the State of Florida (License #BK1234567).',
        'All real estate transactions are subject to Florida real estate laws and regulations.',
        'Property information is deemed reliable but not guaranteed. Buyers should conduct independent verification.',
        'Commission structures and service fees will be clearly disclosed in writing before any engagement.'
      ]
    },
    {
      icon: AlertCircle,
      title: 'Limitations of Liability',
      content: [
        'Information on our website is for general informational purposes only and should not be relied upon as professional advice.',
        'Property valuations and market analyses are estimates based on available data and professional judgment.',
        'We are not liable for decisions made based on information provided on our website or in consultations.',
        'Our liability is limited to the amount of fees paid for our services, as permitted by law.'
      ]
    },
    {
      icon: CheckCircle,
      title: 'Intellectual Property',
      content: [
        'All content on our website, including text, graphics, logos, and images, is the property of Linart Realty LLC or its licensors.',
        'You may not reproduce, distribute, modify, or create derivative works without our express written permission.',
        'Property listings and photographs are licensed for display and may not be used for any other purpose.',
        'Trademarks and service marks displayed are registered marks of Linart Realty LLC.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Terms of Service - Linart Realty LLC | Professional Real Estate Services"
        description="Linart Realty terms of service: professional services, user conduct, limitations of liability. Licensed Florida real estate brokerage. Last updated November 2024."
        canonical="https://www.linartrealty.com/terms"
        ogType="website"
        keywords="terms of service, real estate terms, professional services, Linart Realty legal terms"
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
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div 
              className="font-['Montserrat'] uppercase text-[#A8A9AD] tracking-[0.3em] mb-2"
              style={{ fontSize: '0.75rem', fontWeight: 600 }}
            >
              Legal
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
            Terms of Service
          </h1>

          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/70"
            style={{
              fontSize: '0.95rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.7
            }}
          >
            Last updated: November 20, 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/80"
            style={{
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.8
            }}
          >
            These Terms of Service govern your use of Linart Realty LLC's website and services. 
            Please read these terms carefully before using our services. By using our website or engaging our services, 
            you acknowledge that you have read, understood, and agree to be bound by these terms.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="max-w-4xl mx-auto space-y-12 mb-20">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <Icon className="w-8 h-8 text-[#A8A9AD] flex-shrink-0 mt-1" strokeWidth={1.5} />
                  <h2 
                    className="font-['Cinzel'] text-[#F2EEE7]"
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {section.title}
                  </h2>
                </div>
                
                <div className="space-y-4 ml-12">
                  {section.content.map((paragraph, pIndex) => (
                    <p 
                      key={pIndex}
                      className="font-['Montserrat'] text-[#E5E4E2]/70"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.8
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Terms */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12 mb-20"
        >
          
          {/* User Conduct */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              User Conduct
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 mb-4"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.8
              }}
            >
              When using our services, you agree not to:
            </p>
            <ul className="space-y-2 ml-6">
              {[
                'Violate any applicable laws or regulations',
                'Infringe on intellectual property rights',
                'Submit false or misleading information',
                'Engage in any fraudulent or deceptive practices',
                'Interfere with the proper functioning of our website',
                'Attempt to gain unauthorized access to our systems'
              ].map((item, index) => (
                <li 
                  key={index}
                  className="font-['Montserrat'] text-[#E5E4E2]/70 flex items-start gap-3"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.8
                  }}
                >
                  <span className="text-[#A8A9AD] mt-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Governing Law */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Governing Law
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.8
              }}
            >
              These Terms of Service are governed by and construed in accordance with the laws of the State of Florida, 
              without regard to its conflict of law provisions. Any disputes arising from these terms or your use of our 
              services shall be resolved in the courts of Miami-Dade County, Florida.
            </p>
          </div>

          {/* Contact */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Contact Information
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 mb-4"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.8
              }}
            >
              For questions about these Terms of Service, please contact us:
            </p>
            <div 
              className="font-['Montserrat'] text-[#E5E4E2]/80 space-y-2"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.8
              }}
            >
              <p>Email: <a href="mailto:legal@linartrealty.com" className="text-[#A8A9AD] hover:text-[#E5E4E2] transition-colors">legal@linartrealty.com</a></p>
              <p>Phone: +1 (305) 555-0123</p>
              <p>Address: 1000 Brickell Avenue, Suite 500, Miami, FL 33131</p>
            </div>
          </div>

        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center py-16 mb-20 border-t border-[#E5E4E2]/10"
        >
          <PremiumButton
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if ((window as any).navigateTo) {
                (window as any).navigateTo('/');
              }
            }}
          >
            Back to Home
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}