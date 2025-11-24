import React from 'react';
import { motion } from 'motion/react';
import { Crown, Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

/*
═══════════════════════════════════════════════════════════════════
  FOOTER - Legal & Contact Info
═══════════════════════════════════════════════════════════════════
*/

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Services', href: '/services' },
      { label: 'Featured Properties', href: '/properties' },
      { label: 'Testimonials', href: '/testimonials' }
    ],
    services: [
      { label: 'Commercial Property', href: '/commercial-property' },
      { label: 'Residential Estates', href: '/residential-estates' },
      { label: 'Design & Renovation', href: '/design-renovation' },
      { label: 'Investment Advisory', href: '/investment-advisory' }
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Contact Us', href: '/contact' }
    ]
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if ((window as any).navigateTo) {
      (window as any).navigateTo(href);
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@linartrealty.com', label: 'Email' }
  ];

  return (
    <footer className="relative bg-[#0A0A0B] border-t border-[#E5E4E2]/10 overflow-hidden">
      
      {/* Decorative Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Brand Section - Spans 4 columns */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Logo */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 flex items-center justify-center p-1">
                    <img 
                      src="/images/logo.png"
                      alt="Linart Realty Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div 
                      className="font-['Cinzel'] text-[#F2EEE7]"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                      }}
                    >
                      LINART
                    </div>
                    <div 
                      className="font-['Montserrat'] text-[#A8A9AD]"
                      style={{
                        fontSize: '0.65rem',
                        fontWeight: 500,
                        letterSpacing: '0.15em'
                      }}
                    >
                      REALTY LLC
                    </div>
                  </div>
                </div>

                {/* Tagline */}
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/60 mb-8 leading-relaxed"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.7
                  }}
                >
                  Defining luxury real estate through architectural excellence, 
                  strategic vision, and royal service.
                </p>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        aria-label={social.label}
                        className="w-10 h-10 border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 flex items-center justify-center transition-all duration-500 group"
                      >
                        <Icon 
                          className="w-4 h-4 text-[#A8A9AD] group-hover:text-[#E5E4E2] transition-colors duration-500" 
                          strokeWidth={1.5} 
                        />
                      </a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Company Links */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Company
                </h3>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-['Montserrat'] text-[#E5E4E2]/60 hover:text-[#E5E4E2] transition-colors duration-300 inline-block"
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em'
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Services
                </h3>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-['Montserrat'] text-[#E5E4E2]/60 hover:text-[#E5E4E2] transition-colors duration-300 inline-block"
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em'
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Legal Links */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Legal
                </h3>
                <ul className="space-y-3">
                  {footerLinks.legal.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="font-['Montserrat'] text-[#E5E4E2]/60 hover:text-[#E5E4E2] transition-colors duration-300 inline-block"
                        style={{
                          fontSize: '0.9rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em'
                        }}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div 
          className="h-px"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 20%, #A8A9AD 50%, #E5E4E2 80%, transparent 100%)',
            opacity: 0.2
          }}
        />

        {/* Bottom Bar */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-['Montserrat'] text-[#E5E4E2]/50 text-center md:text-left"
              style={{
                fontSize: '0.85rem',
                fontWeight: 400,
                letterSpacing: '0.02em'
              }}
            >
              © {currentYear} Linart Realty LLC. All rights reserved.
            </motion.p>

            {/* Legal Notice */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-['Montserrat'] text-[#E5E4E2]/40 text-center md:text-right"
              style={{
                fontSize: '0.75rem',
                fontWeight: 400,
                letterSpacing: '0.02em'
              }}
            >
              Licensed Real Estate Brokerage | Florida License #BK1234567
            </motion.p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="pb-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-['Montserrat'] text-[#E5E4E2]/30 text-center max-w-4xl mx-auto leading-relaxed"
            style={{
              fontSize: '0.7rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.7
            }}
          >
            Linart Realty LLC is committed to protecting your privacy and securing your data. 
            All property listings, valuations, and investment projections are subject to market conditions. 
            Past performance does not guarantee future results. Equal Housing Opportunity.
          </motion.p>
        </div>

      </div>

      {/* Corner Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-16 h-px bg-gradient-to-r from-[#A8A9AD] to-transparent" />
        <div className="absolute bottom-0 left-0 w-px h-16 bg-gradient-to-t from-[#A8A9AD] to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-16 h-px bg-gradient-to-l from-[#A8A9AD] to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-16 bg-gradient-to-t from-[#A8A9AD] to-transparent" />
      </div>
    </footer>
  );
}