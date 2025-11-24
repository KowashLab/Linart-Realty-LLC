import React from 'react';
import { SEO } from '../components/SEO';
import { About } from '../components/About';
import { TrustSection } from '../components/TrustSection';
import { motion } from 'motion/react';
import { Target, Award, Users, TrendingUp, Globe, Shield } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  ABOUT PAGE - Company Story & Team
═══════════════════════════════════════════════════════════════════
*/

export function AboutPage() {
  const stats = [
    { number: '$2.8B+', label: 'Total Transaction Volume', icon: TrendingUp },
    { number: '500+', label: 'Properties Sold', icon: Award },
    { number: '15+', label: 'Years of Excellence', icon: Target },
    { number: '98%', label: 'Client Satisfaction', icon: Users }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Integrity First',
      description: 'Unwavering commitment to ethical practices and transparent communication in every transaction.'
    },
    {
      icon: Award,
      title: 'Excellence Always',
      description: 'Relentless pursuit of perfection in service delivery and property selection for our clients.'
    },
    {
      icon: Globe,
      title: 'Global Vision',
      description: 'International perspective combined with deep local expertise across Florida markets.'
    },
    {
      icon: Users,
      title: 'Client Partnership',
      description: 'Building lasting relationships through personalized service and dedicated support.'
    }
  ];

  const timeline = [
    {
      year: '2009',
      title: 'Foundation',
      description: 'Linart Realty established with a vision to redefine luxury real estate in Florida.'
    },
    {
      year: '2012',
      title: 'Expansion',
      description: 'Opened commercial division, expanding into high-value corporate properties and developments.'
    },
    {
      year: '2015',
      title: 'International Recognition',
      description: 'Achieved partnership with leading global luxury real estate networks.'
    },
    {
      year: '2018',
      title: 'Design Division',
      description: 'Launched architectural and renovation services, offering complete property transformation.'
    },
    {
      year: '2021',
      title: 'Digital Innovation',
      description: 'Pioneered advanced market analytics and virtual property experiences for premium clients.'
    },
    {
      year: '2024',
      title: 'Market Leadership',
      description: 'Recognized as Florida\'s premier boutique real estate firm for ultra-luxury properties.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="About Linart Realty - 15+ Years of Luxury Real Estate Excellence in Florida"
        description="Discover Linart Realty's journey: $2.8B+ in transactions, 500+ properties sold, and 98% client satisfaction. Florida's premier boutique luxury real estate firm since 2009."
        canonical="https://www.linartrealty.com/about"
        ogType="website"
        keywords="luxury real estate Florida, premium property services, Linart Realty history, boutique real estate firm, Florida luxury properties"
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
              Our Story
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
            About Linart Realty
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
            Defining luxury real estate through architectural excellence, strategic vision, 
            and unwavering commitment to our clients' success
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-8 bg-[#0F0F0F] border border-[#E5E4E2]/10 group hover:border-[#A8A9AD]/40 transition-all duration-500"
              >
                <Icon className="w-8 h-8 text-[#A8A9AD] mx-auto mb-4 group-hover:text-[#E5E4E2] transition-colors duration-500" strokeWidth={1.5} />
                <div 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {stat.number}
                </div>
                <div 
                  className="font-['Montserrat'] text-[#E5E4E2]/60"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Main About Section */}
      <About />

      <div className="container-custom px-6 lg:px-12 relative z-10">

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Our Core Values
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-2xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              The principles that guide every decision and every relationship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 group hover:border-[#A8A9AD]/60 transition-all duration-500 relative overflow-hidden"
                >
                  <Icon className="w-10 h-10 text-[#E5E4E2] mb-6 group-hover:text-[#A8A9AD] transition-colors duration-500" strokeWidth={1.5} />
                  
                  <h3 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-4"
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {value.title}
                  </h3>
                  
                  <p 
                    className="font-['Montserrat'] text-[#E5E4E2]/70"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 1.6
                    }}
                  >
                    {value.description}
                  </p>

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,169,173,0.1)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-6"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Our Journey
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-2xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              Fifteen years of excellence, innovation, and unwavering commitment to our clients
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="flex gap-8 items-start group"
              >
                
                {/* Year */}
                <div className="flex-shrink-0">
                  <div 
                    className="font-['Cinzel'] text-[#E5E4E2] group-hover:text-[#A8A9AD] transition-colors duration-500"
                    style={{
                      fontSize: '1.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Line */}
                <div className="flex-shrink-0 mt-3">
                  <div className="w-px h-full bg-[#E5E4E2]/20 group-hover:bg-[#A8A9AD]/60 transition-colors duration-500" style={{ minHeight: '80px' }} />
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <h3 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {item.title}
                  </h3>
                  <p 
                    className="font-['Montserrat'] text-[#E5E4E2]/70"
                    style={{
                      fontSize: '1rem',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 1.6
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Trust Section */}
      <TrustSection />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center py-20 mb-20"
        >
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Partner With Excellence
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
            Experience the Linart Realty difference. Schedule a consultation 
            to discuss your real estate objectives.
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
            Get In Touch
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}