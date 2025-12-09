import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Cookie, Settings, BarChart, Shield } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  COOKIE POLICY PAGE
═══════════════════════════════════════════════════════════════════
*/

export function CookiesPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential Cookies',
      description: 'Required for the website to function properly. These cannot be disabled.',
      examples: [
        'Session management and authentication',
        'Security and fraud prevention',
        'Load balancing and performance',
        'Accessibility features'
      ]
    },
    {
      icon: Settings,
      title: 'Functional Cookies',
      description: 'Enable enhanced functionality and personalization of your experience.',
      examples: [
        'User preferences and settings',
        'Language selection',
        'Property search filters',
        'Saved property listings'
      ]
    },
    {
      icon: BarChart,
      title: 'Analytics Cookies',
      description: 'Help us understand how visitors interact with our website.',
      examples: [
        'Page views and navigation patterns',
        'Time spent on pages',
        'Search queries and results',
        'Device and browser information'
      ]
    },
    {
      icon: Cookie,
      title: 'Marketing Cookies',
      description: 'Used to track visitors across websites to display relevant advertisements.',
      examples: [
        'Property recommendation tracking',
        'Ad campaign performance',
        'Social media integration',
        'Remarketing and retargeting'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Cookie Policy - Linart Realty LLC | How We Use Cookies"
        description="Linart Realty cookie policy: learn about essential, functional, analytics, and marketing cookies. Manage your preferences and control your privacy. Last updated November 2024."
        canonical="https://www.linartrealty.com/cookies"
        ogType="website"
        keywords="cookie policy, website cookies, privacy preferences, cookie management, Linart Realty cookies"
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
            Cookie Policy
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
            This Cookie Policy explains how Linart Realty LLC uses cookies and similar technologies on our website. 
            By using our website, you consent to the use of cookies in accordance with this policy.
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
            Cookies are small text files that are stored on your device when you visit a website. 
            They help us provide you with a better experience and allow certain features to function properly.
          </p>
        </motion.div>

        {/* Cookie Types */}
        <div className="max-w-4xl mx-auto space-y-8 mb-20">
          {cookieTypes.map((type, index) => {
            const Icon = type.icon;
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
                  <div>
                    <h2 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {type.title}
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
                      {type.description}
                    </p>
                  </div>
                </div>
                
                <div className="ml-12">
                  <h3 
                    className="font-['Cinzel'] text-[#E5E4E2] mb-3"
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    Examples:
                  </h3>
                  <ul className="space-y-2">
                    {type.examples.map((example, eIndex) => (
                      <li 
                        key={eIndex}
                        className="font-['Montserrat'] text-[#E5E4E2]/70 flex items-start gap-3"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                          lineHeight: 1.7
                        }}
                      >
                        <span className="text-[#A8A9AD] mt-1.5">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto space-y-12 mb-20"
        >
          
          {/* Managing Cookies */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Managing Your Cookie Preferences
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
              You have the right to decide whether to accept or reject cookies. You can control cookies through:
            </p>
            <ul className="space-y-3 ml-6 mb-6">
              {[
                'Browser settings - Most browsers allow you to refuse or accept cookies',
                'Cookie consent banner - Manage your preferences when you first visit our site',
                'Third-party tools - Use browser extensions or privacy tools to manage cookies',
                'Do Not Track signals - We honor Do Not Track browser settings'
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
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/60"
              style={{
                fontSize: '0.9rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7,
                fontStyle: 'italic'
              }}
            >
              Note: Blocking certain cookies may impact your experience and limit access to some features.
            </p>
          </div>

          {/* Third-Party Cookies */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Third-Party Cookies
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
              We may use third-party services such as Google Analytics, social media platforms, and advertising networks 
              that may set their own cookies. These third parties have their own privacy policies and cookie policies. 
              We recommend reviewing their policies to understand how they use cookies.
            </p>
          </div>

          {/* Updates */}
          <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: '1.8rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Policy Updates
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
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, 
              or our business practices. The "Last updated" date at the top of this page indicates when this policy 
              was last revised. Please check back periodically for updates.
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
              Questions About Cookies?
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
              If you have questions about our use of cookies, please contact us:
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