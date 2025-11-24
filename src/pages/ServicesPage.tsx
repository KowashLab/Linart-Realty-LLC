import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Building2, Home, Wrench, TrendingUp, Shield, Users, Award, Globe } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  SERVICES PAGE - Comprehensive Service Offerings
═══════════════════════════════════════════════════════════════════
*/

export function ServicesPage() {
  const mainServices = [
    {
      icon: Building2,
      title: 'Commercial Real Estate',
      description: 'Strategic acquisition and management of high-value commercial properties including office towers, retail centers, and mixed-use developments.',
      link: '/commercial-property',
      features: [
        'Office Building Acquisition',
        'Retail Center Development',
        'Mixed-Use Projects',
        'Portfolio Management',
        'Lease Negotiation',
        'Property Valuation'
      ],
      benefits: [
        'Maximum ROI potential',
        'Long-term value appreciation',
        'Professional tenant management',
        'Strategic location selection'
      ]
    },
    {
      icon: Home,
      title: 'Luxury Residential',
      description: 'Exclusive representation for ultra-premium estates, waterfront properties, and architectural masterpieces across Florida\'s most prestigious locations.',
      link: '/residential-estates',
      features: [
        'Beachfront Estates',
        'Gated Communities',
        'Waterfront Properties',
        'Architectural Homes',
        'Private Islands',
        'Historic Mansions'
      ],
      benefits: [
        'Discreet & private transactions',
        'Off-market opportunities',
        'White-glove service',
        'International buyer network'
      ]
    },
    {
      icon: Wrench,
      title: 'Design & Renovation',
      description: 'Premium architectural design and full-scale renovation services transforming properties into extraordinary spaces that command maximum value.',
      link: '/design-renovation',
      features: [
        'Architectural Design',
        'Interior Design',
        'Full Renovations',
        'Historic Restoration',
        'Smart Home Integration',
        'Sustainable Building'
      ],
      benefits: [
        'Award-winning architects',
        'Increased property value',
        'Premium materials & craftsmanship',
        'Turnkey solutions'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Data-driven investment strategies and comprehensive market analysis to maximize returns in Florida\'s dynamic real estate market.',
      link: '/investment-advisory',
      features: [
        'Market Analysis',
        'Investment Strategy',
        'Portfolio Optimization',
        'Risk Assessment',
        'Tax Strategy',
        '1031 Exchanges'
      ],
      benefits: [
        'Proven track record',
        'Institutional-grade research',
        'Tax-efficient structures',
        'Ongoing portfolio support'
      ]
    }
  ];

  const additionalServices = [
    {
      icon: Shield,
      title: 'Asset Protection',
      description: 'Comprehensive legal structures and strategies to protect your real estate investments.'
    },
    {
      icon: Users,
      title: 'Concierge Service',
      description: 'Full-service property management and lifestyle coordination for discerning clients.'
    },
    {
      icon: Award,
      title: 'Luxury Marketing',
      description: 'Sophisticated marketing campaigns leveraging global networks and premium media.'
    },
    {
      icon: Globe,
      title: 'International Sales',
      description: 'Cross-border transactions with expertise in international buyer representation.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Premium Real Estate Services - Commercial, Residential, Design & Investment | Linart Realty"
        description="Comprehensive luxury real estate solutions: commercial properties, ultra-premium residential estates, architectural design & renovation, and strategic investment advisory in Florida."
        canonical="https://www.linartrealty.com/services"
        ogType="website"
        keywords="luxury real estate services, commercial property Florida, residential estates, property design renovation, real estate investment advisory, Florida luxury properties"
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
              Our Expertise
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
            Premium Services
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
            Comprehensive real estate solutions combining market expertise, architectural vision, 
            and strategic investment advisory for discerning clients
          </p>
        </motion.div>

        {/* Main Services */}
        <div className="space-y-16 mb-32">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  
                  {/* Icon & Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-4 border border-[#E5E4E2]/20 bg-[#0F0F0F]">
                      <Icon className="w-8 h-8 text-[#E5E4E2]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h2 
                        className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                        style={{
                          fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                          fontWeight: 600,
                          letterSpacing: '0.02em'
                        }}
                      >
                        {service.title}
                      </h2>
                      <p 
                        className="font-['Montserrat'] text-[#E5E4E2]/70"
                        style={{
                          fontSize: '1rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                          lineHeight: 1.7
                        }}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h3 
                      className="font-['Cinzel'] text-[#E5E4E2] mb-4"
                      style={{
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      Services Include
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {service.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-[#A8A9AD]" />
                          <span 
                            className="font-['Montserrat'] text-[#E5E4E2]/80"
                            style={{
                              fontSize: '0.9rem',
                              fontWeight: 400,
                              letterSpacing: '0.01em'
                            }}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="p-6 bg-[#0F0F0F] border border-[#E5E4E2]/10 mb-6">
                    <h3 
                      className="font-['Cinzel'] text-[#E5E4E2] mb-4"
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      Key Benefits
                    </h3>
                    <div className="space-y-2">
                      {service.benefits.map((benefit, bIndex) => (
                        <div key={bIndex} className="flex items-start gap-3">
                          <div className="w-1 h-1 bg-[#A8A9AD] mt-2.5" />
                          <span 
                            className="font-['Montserrat'] text-[#E5E4E2]/70"
                            style={{
                              fontSize: '0.95rem',
                              fontWeight: 400,
                              letterSpacing: '0.01em',
                              lineHeight: 1.6
                            }}
                          >
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learn More Button */}
                  <PremiumButton 
                    href={service.link}
                    onClick={(e) => {
                      e.preventDefault();
                      if ((window as any).navigateTo) {
                        (window as any).navigateTo(service.link);
                      }
                    }}
                  >
                    Learn More
                  </PremiumButton>
                </div>

                {/* Visual */}
                <div className={`relative aspect-[4/3] bg-[#0F0F0F] overflow-hidden group ${
                  index % 2 === 1 ? 'lg:order-1' : ''
                }`}>
                  
                  {/* Animated Platinum Border */}
                  <div 
                    className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                    style={{
                      border: '1px solid',
                      borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                    }}
                  />

                  <img 
                    src={
                      index === 0 
                        ? '/images/service-hero-1.jpg'
                        : index === 1 
                        ? '/images/service-hero-2.jpg'
                        : index === 2 
                        ? '/images/service-hero-3.jpg'
                        : '/images/service-hero-4.jpg'
                    }
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  {/* Subtle overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/40 via-transparent to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Services Grid */}
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
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Additional Services
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="group p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-500 relative overflow-hidden"
                >
                  
                  {/* Icon */}
                  <div className="mb-6">
                    <Icon className="w-10 h-10 text-[#E5E4E2] group-hover:text-[#A8A9AD] transition-colors duration-500" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-4"
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
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

                  {/* Hover Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                    <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,169,173,0.1)]" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

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
            Ready to Begin Your Journey?
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
            Schedule a private consultation to discuss your real estate objectives 
            and discover how we can bring your vision to life.
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
            Schedule Consultation
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}