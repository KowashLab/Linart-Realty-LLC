import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Wrench, Palette, Ruler, Lightbulb, CheckCircle, Award, Target, Zap } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  DESIGN & RENOVATION PAGE - Full Service Page
═══════════════════════════════════════════════════════════════════
*/

export function DesignRenovationPage() {
  const services = [
    {
      title: 'Architectural Design',
      description: 'Custom architectural design services creating extraordinary spaces that blend form, function, and timeless elegance for discerning clients.'
    },
    {
      title: 'Interior Design',
      description: 'Sophisticated interior design transforming spaces into luxurious environments reflecting your personal style and enhancing property value.'
    },
    {
      title: 'Full Renovations',
      description: 'Comprehensive renovation services from concept to completion, managing every detail to deliver exceptional results on time and on budget.'
    },
    {
      title: 'Historic Restoration',
      description: 'Meticulous restoration of historic properties preserving architectural heritage while incorporating modern amenities and systems.'
    },
    {
      title: 'Smart Home Integration',
      description: 'Cutting-edge technology integration creating intelligent homes with automated systems for security, climate, lighting, and entertainment.'
    },
    {
      title: 'Sustainable Building',
      description: 'Eco-conscious design and construction utilizing sustainable materials and energy-efficient systems without compromising luxury or style.'
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Award-Winning Team',
      description: 'Collaboration with internationally recognized architects and designers bringing decades of experience to your project.'
    },
    {
      icon: Target,
      title: 'Value Enhancement',
      description: 'Strategic design decisions and premium materials significantly increasing property value and market appeal.'
    },
    {
      icon: Lightbulb,
      title: 'Innovative Solutions',
      description: 'Creative problem-solving and innovative design approaches transforming challenges into unique architectural features.'
    },
    {
      icon: Zap,
      title: 'Turnkey Delivery',
      description: 'Complete project management from initial concept through final walkthrough ensuring seamless execution and exceptional results.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Vision & Discovery',
      description: 'In-depth consultation to understand your aesthetic preferences, functional requirements, and lifestyle to create a comprehensive design brief.'
    },
    {
      step: '02',
      title: 'Concept Development',
      description: 'Creation of detailed design concepts including architectural plans, material selections, and 3D visualizations for your review and approval.'
    },
    {
      step: '03',
      title: 'Design Refinement',
      description: 'Collaborative refinement process ensuring every detail aligns with your vision while maintaining structural integrity and budget parameters.'
    },
    {
      step: '04',
      title: 'Construction & Build',
      description: 'Expert project management coordinating premium contractors, artisans, and suppliers to bring your design to life with precision.'
    },
    {
      step: '05',
      title: 'Final Delivery',
      description: 'Meticulous quality control, final installations, and comprehensive walkthrough ensuring every element exceeds expectations.'
    }
  ];

  const stats = [
    { value: '300+', label: 'Projects Completed' },
    { value: '25+', label: 'Design Awards' },
    { value: '15+', label: 'Years Experience' },
    { value: '100%', label: 'Client Satisfaction' }
  ];

  const specialties = [
    'Contemporary Modern',
    'Classical Revival',
    'Mediterranean Style',
    'Coastal Elegance',
    'Urban Industrial',
    'Transitional Design',
    'Minimalist Luxury',
    'Traditional Estate'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Luxury Property Design & Renovation Services Florida - Architectural Excellence | Linart Realty"
        description="Premium architectural design, interior design, and full-scale renovation services in Florida. 300+ projects completed, 25+ design awards. Award-winning team, turnkey solutions."
        canonical="https://www.linartrealty.com/design-renovation"
        ogType="website"
        keywords="luxury property design Florida, architectural renovation, interior design services, historic restoration Florida, smart home integration, sustainable building Florida"
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
                <Wrench className="w-8 h-8 text-[#A8A9AD]" strokeWidth={1.5} />
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
                Design & Renovation
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
                Premium architectural design and full-scale renovation services transforming properties into extraordinary 
                spaces that command maximum value and reflect exceptional taste.
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
                Start Your Project
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
                src="/images/design-interior.jpg"
                alt="Design & Renovation"
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

        {/* Design Specialties */}
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
              Design Specialties
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
              Expertise across diverse architectural styles and design aesthetics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20 text-center group hover:border-[#A8A9AD]/60 transition-all duration-500"
              >
                <Palette className="w-6 h-6 text-[#A8A9AD] mx-auto mb-3" strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2] group-hover:text-[#A8A9AD] transition-colors duration-500"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em'
                  }}
                >
                  {specialty}
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
            Excellence in Execution
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
              Our Creative Process
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
              From initial concept to final reveal, a meticulously planned journey
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
              <img 
                src="/images/design-futuristic.jpg"
                alt="Design Process"
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
            Transform Your Space
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
            Schedule a consultation to discuss your vision and discover how we can create 
            an extraordinary space that exceeds your expectations.
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
            Start Your Project
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}