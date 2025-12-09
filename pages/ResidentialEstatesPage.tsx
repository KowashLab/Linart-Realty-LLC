import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Home, Heart, Key, Shield, CheckCircle, Sparkles, Globe, Award } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  RESIDENTIAL ESTATES PAGE - Full Service Page
═══════════════════════════════════════════════════════════════════
*/

export function ResidentialEstatesPage() {
  const services = [
    {
      title: 'Beachfront Estates',
      description: 'Exclusive oceanfront properties offering unparalleled privacy, stunning views, and direct beach access in Florida\'s most coveted coastal locations.'
    },
    {
      title: 'Gated Communities',
      description: 'Premier residences within Florida\'s most prestigious gated communities, offering world-class amenities, security, and lifestyle services.'
    },
    {
      title: 'Waterfront Properties',
      description: 'Spectacular waterfront estates featuring private docks, deep-water access, and breathtaking bay, river, or intracoastal views.'
    },
    {
      title: 'Architectural Homes',
      description: 'One-of-a-kind architectural masterpieces designed by renowned architects, showcasing innovative design and premium craftsmanship.'
    },
    {
      title: 'Private Islands',
      description: 'Ultra-exclusive private island properties offering the ultimate in luxury, privacy, and natural beauty for discerning buyers.'
    },
    {
      title: 'Historic Mansions',
      description: 'Meticulously restored historic estates combining timeless elegance with modern amenities in Florida\'s most distinguished neighborhoods.'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Discretion & Privacy',
      description: 'Confidential transactions with the utmost discretion, protecting your privacy throughout the entire buying or selling process.'
    },
    {
      icon: Key,
      title: 'Off-Market Access',
      description: 'Exclusive access to off-market properties and pocket listings unavailable to the general public through our extensive network.'
    },
    {
      icon: Sparkles,
      title: 'White-Glove Service',
      description: 'Personalized, concierge-level service attending to every detail from initial consultation through closing and beyond.'
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'International buyer and seller network connecting you with qualified parties worldwide for seamless transactions.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Personal Consultation',
      description: 'In-depth consultation to understand your lifestyle, preferences, and requirements for your ideal luxury residence.'
    },
    {
      step: '02',
      title: 'Curated Selection',
      description: 'Handpicked properties matching your criteria, including exclusive off-market opportunities and private listings.'
    },
    {
      step: '03',
      title: 'Private Viewings',
      description: 'Personalized property tours scheduled at your convenience with detailed insights into each estate\'s unique features.'
    },
    {
      step: '04',
      title: 'Negotiation & Offer',
      description: 'Strategic negotiation leveraging market knowledge and expertise to secure the best terms for your purchase.'
    },
    {
      step: '05',
      title: 'Seamless Closing',
      description: 'Coordinated closing process with premium service providers ensuring a smooth transition to your new home.'
    }
  ];

  const stats = [
    { value: '$850M+', label: 'Luxury Sales Volume' },
    { value: '500+', label: 'Estates Sold' },
    { value: '100%', label: 'Client Satisfaction' },
    { value: '20+', label: 'Years Experience' }
  ];

  const features = [
    'Beachfront & Oceanfront',
    'Private Islands',
    'Gated Communities',
    'Historic Mansions',
    'Architectural Masterpieces',
    'Waterfront Estates',
    'Golf Course Properties',
    'Equestrian Estates'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Luxury Residential Estates Florida - Beachfront, Waterfront & Private Islands | Linart Realty"
        description="Ultra-premium residential estates in Florida: beachfront properties, waterfront mansions, private islands, gated communities. $250M+ in luxury sales. White-glove service."
        canonical="https://www.linartrealty.com/residential-estates"
        ogType="website"
        keywords="luxury residential estates Florida, beachfront properties, waterfront mansions, private island Florida, gated community homes, architectural masterpieces Florida, luxury home sales"
      />

      {/* Decorative Background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <Home className="w-8 h-8 text-[#A8A9AD]" strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] uppercase text-[#A8A9AD] tracking-[0.3em]"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Premium Service
                </span>
              </div>
              
              <h1 
                className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  lineHeight: 1.1
                }}
              >
                Luxury Residential Estates
              </h1>

              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 mb-8"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.7
                }}
              >
                Exclusive representation for ultra-premium estates, waterfront properties, and architectural masterpieces 
                across Florida's most prestigious locations. Unparalleled service for discerning clientele.
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
                Schedule Private Viewing
              </PremiumButton>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  border: '1px solid',
                  borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                }}
              />
              <img 
                src="/images/residential-mansion.jpg"
                alt="Luxury Residential Estates"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20"
              >
                <div 
                  className="font-['Cinzel'] text-[#E5E4E2] mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="font-['Montserrat'] text-[#E5E4E2]/60 uppercase tracking-wider"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Property Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Exceptional Properties
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-3xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              Curated selection of Florida's most prestigious residential estates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.05 }}
                className="flex items-center gap-4 p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20"
              >
                <Heart className="w-6 h-6 text-[#A8A9AD] flex-shrink-0" strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em'
                  }}
                >
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E5E4E2] to-[#A8A9AD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CheckCircle className="w-8 h-8 text-[#A8A9AD] mb-4" strokeWidth={1.5} />
                
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {service.title}
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
                  {service.description}
                </p>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,169,173,0.1)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] text-center mb-16"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            The Linart Advantage
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex gap-6 p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20"
                >
                  <div className="flex-shrink-0">
                    <div className="p-4 border border-[#E5E4E2]/20 bg-[#0A0A0B]">
                      <Icon className="w-8 h-8 text-[#E5E4E2]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p 
                      className="font-['Montserrat'] text-[#E5E4E2]/70"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.7
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Your Journey to Luxury
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-3xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              A seamless, personalized experience from first consultation to keys in hand
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] overflow-hidden group order-2 lg:order-1">
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  border: '1px solid',
                  borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                }}
              />
              <img 
                src="/images/residential-entrance.jpg"
                alt="Luxury Entrance"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div 
                    className="font-['Cinzel'] text-[#A8A9AD] flex-shrink-0"
                    style={{
                      fontSize: '3rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      lineHeight: 1
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="font-['Montserrat'] text-[#E5E4E2]/70"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.7
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
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
            Discover Your Dream Estate
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
            Begin your journey to luxury living with a private consultation. 
            Explore exclusive properties tailored to your vision of the perfect home.
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
            Schedule Private Viewing
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}