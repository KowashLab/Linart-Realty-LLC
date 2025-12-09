import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  PRIVACY POLICY PAGE
═══════════════════════════════════════════════════════════════════
*/

export function PrivacyPage() {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: [
        'We collect information you provide directly to us when you use our services, including name, email address, phone number, and property preferences.',
        'Automatically collected information includes IP address, browser type, device information, and usage data through cookies and similar technologies.',
        'Property viewing and inquiry data to better serve your real estate needs and provide personalized recommendations.'
      ]
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: [
        'To provide, maintain, and improve our real estate services and client experience.',
        'To communicate with you about properties, market updates, and respond to your inquiries.',
        'To analyze usage patterns and enhance our website functionality and service offerings.',
        'To comply with legal obligations and protect our rights and the rights of our clients.'
      ]
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'Information may be shared with trusted service providers who assist in our operations, under strict confidentiality agreements.',
        'Property sellers and buyers may receive relevant contact information to facilitate transactions.',
        'We may disclose information when required by law or to protect our legal rights.'
      ]
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: [
        'You have the right to access, correct, or delete your personal information at any time.',
        'You may opt-out of marketing communications while continuing to receive transactional messages.',
        'You can request a copy of your data or ask us to transfer it to another service.',
        'Contact us at info@linartrealty.com to exercise these rights.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Privacy Policy - Linart Realty LLC | Data Protection & Security"
        description="Linart Realty privacy policy: how we collect, use, and protect your personal information. Committed to data security and transparency. Last updated November 2024."
        canonical="https://www.linartrealty.com/privacy"
        ogType="website"
        keywords="privacy policy, data protection, personal information security, Linart Realty privacy"
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
            Privacy Policy
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
            className="font-['Montserrat'] text-[#E5E4E2]/80 mb-6"
            style={{
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.8
            }}
          >
            At Linart Realty LLC, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
            or use our services.
          </p>
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/80"
            style={{
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.8
            }}
          >
            By using our services, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
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

        {/* Additional Sections */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12 mb-20"
        >
          
          {/* Data Security */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Data Security
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
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="space-y-2 ml-6">
              {[
                'SSL encryption for data transmission',
                'Secure servers with regular security updates',
                'Limited access to personal information by authorized personnel only',
                'Regular security audits and compliance reviews'
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

          {/* Cookies */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Cookies and Tracking
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
              We use cookies and similar tracking technologies to enhance your experience on our website. 
              You can control cookie settings through your browser preferences. For more information, 
              please see our <a href="/cookies" className="text-[#A8A9AD] hover:text-[#E5E4E2] underline transition-colors">Cookie Policy</a>.
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
              Contact Us
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
              If you have questions or concerns about this Privacy Policy or our data practices, please contact us:
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
              <p>Email: <a href="mailto:info@linartrealty.com" className="text-[#A8A9AD] hover:text-[#E5E4E2] transition-colors">info@linartrealty.com</a></p>
              <p>Phone: +1 (561) 235-6804</p>
              <p>Address: 8318 Crystal Downs Avenue, Boca Raton, FL 33434</p>
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