import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Users, Shield, CheckCircle, MapPin, DollarSign, BarChart } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

/*
═══════════════════════════════════════════════════════════════════
  COMMERCIAL PROPERTY PAGE - Full Service Page
═══════════════════════════════════════════════════════════════════
*/

export function CommercialPropertyPage() {
  const services = [
    {
      title: 'Office Building Acquisition',
      description: 'Strategic acquisition of Class A office towers in prime business districts with proven tenant demand and long-term value appreciation potential.'
    },
    {
      title: 'Retail Center Development',
      description: 'Development and management of high-traffic retail centers, shopping plazas, and mixed-use commercial spaces in strategic Florida locations.'
    },
    {
      title: 'Mixed-Use Projects',
      description: 'Comprehensive planning and execution of mixed-use developments combining commercial, residential, and hospitality components.'
    },
    {
      title: 'Portfolio Management',
      description: 'Professional management of commercial property portfolios with focus on maximizing ROI, occupancy rates, and long-term asset value.'
    },
    {
      title: 'Lease Negotiation',
      description: 'Expert negotiation services ensuring optimal lease terms, tenant quality, and protection of investor interests in all commercial transactions.'
    },
    {
      title: 'Property Valuation',
      description: 'Comprehensive market analysis and property valuation using institutional-grade methodologies and real-time market data.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Maximum ROI',
      description: 'Strategic property selection and management delivering superior returns on investment through proven market analysis.'
    },
    {
      icon: Shield,
      title: 'Risk Mitigation',
      description: 'Comprehensive due diligence and risk assessment protecting your capital and ensuring stable long-term performance.'
    },
    {
      icon: Users,
      title: 'Tenant Management',
      description: 'Professional tenant screening, placement, and management ensuring stable occupancy and quality tenant relationships.'
    },
    {
      icon: MapPin,
      title: 'Prime Locations',
      description: 'Access to off-market opportunities in Florida\'s most sought-after commercial districts and emerging markets.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Market Analysis',
      description: 'Comprehensive analysis of target markets, demographics, competition, and growth potential using institutional-grade research tools.'
    },
    {
      step: '02',
      title: 'Property Identification',
      description: 'Strategic identification of properties meeting your investment criteria through extensive market networks and off-market channels.'
    },
    {
      step: '03',
      title: 'Due Diligence',
      description: 'Exhaustive property inspection, financial analysis, legal review, and environmental assessment protecting your investment.'
    },
    {
      step: '04',
      title: 'Acquisition & Closing',
      description: 'Expert negotiation and seamless transaction management ensuring optimal terms and smooth closing process.'
    },
    {
      step: '05',
      title: 'Asset Management',
      description: 'Ongoing property management, tenant relations, and portfolio optimization maximizing returns and property value.'
    }
  ];

  const stats = [
    { value: '$2.5B+', label: 'Assets Under Management' },
    { value: '150+', label: 'Properties Managed' },
    { value: '98%', label: 'Average Occupancy' },
    { value: '15+', label: 'Years Experience' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Commercial Real Estate Services Florida - Office, Retail & Mixed-Use | Linart Realty"
        description="Strategic commercial property acquisition and management in Florida. Office towers, retail centers, mixed-use developments. $2.5B+ assets under management, 98% average occupancy."
        canonical="https://www.linartrealty.com/commercial-property"
        ogType="website"
        keywords="commercial real estate Florida, office building acquisition, retail center development, mixed-use property Florida, commercial property management, Florida commercial investment"
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
                <Building2 className="w-8 h-8 text-[#A8A9AD]" strokeWidth={1.5} />
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
                Commercial Real Estate
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
                Strategic acquisition and management of high-value commercial properties including office towers, 
                retail centers, and mixed-use developments across Florida's most dynamic markets.
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
              <ImageWithFallback 
                src="/images/commercial-tower-lobby.jpg"
                alt="Commercial Property"
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

        {/* Services Section */}
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
              Comprehensive Services
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
              End-to-end commercial real estate solutions tailored to your investment objectives
            </p>
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
            Why Choose Us
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
              Our Process
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
              A proven methodology delivering exceptional results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
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

            <div className="relative aspect-[3/4] overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  border: '1px solid',
                  borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                }}
              />
              <ImageWithFallback 
                src="/images/commercial-tower-lobby.jpg"
                alt="Commercial Real Estate Process"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
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
            Ready to Invest in Commercial Real Estate?
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
            Schedule a private consultation to discuss your commercial property investment objectives 
            and discover exclusive opportunities in Florida's premier markets.
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