import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Target, Globe, Award } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

/*
═══════════════════════════════════════════════════════════════════
  ABOUT SECTION - Company Story & Values
═══════════════════════════════════════════════════════════════════
*/

interface Value {
  icon: any;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    icon: Crown,
    title: 'Royal Excellence',
    description: 'Every property, every transaction embodies uncompromising standards of luxury and architectural mastery.'
  },
  {
    icon: Target,
    title: 'Strategic Vision',
    description: 'Institutional-grade market intelligence paired with generational legacy planning for discerning clientele.'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Exclusive access to the world\'s most prestigious real estate through strategic international partnerships.'
  },
  {
    icon: Award,
    title: 'Legacy Building',
    description: 'Crafting timeless estates and commercial empires that define skylines and establish enduring wealth.'
  }
];

const stats = [
  { value: '$2.4B+', label: 'Total Transactions' },
  { value: '450+', label: 'Properties Sold' },
  { value: '15+', label: 'Years Excellence' },
  { value: '98%', label: 'Client Satisfaction' }
];

export function About() {
  return (
    <section id="about" className="relative bg-[#0F0F0F] py-32 lg:py-40 overflow-hidden">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 lg:mb-28"
        >
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#A8A9AD]" />
            <span 
              className="font-['Montserrat'] uppercase text-[#A8A9AD]"
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.25em'
              }}
            >
              Our Story
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#A8A9AD]" />
          </div>

          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              lineHeight: 1.1
            }}
          >
            About Linart Realty
          </h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 mb-28">
          
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="relative group hover-lift"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[#0A0A0B]">
              
              {/* Border Frame */}
              <div className="absolute inset-0 border-2 z-10 pointer-events-none platinum-border" />

              <img
                src="/images/about-image.jpg"
                alt="Linart Realty - Luxury Real Estate Excellence"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
              />

              {/* Corner Accents */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#E5E4E2] opacity-60" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#E5E4E2] opacity-60" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="flex flex-col justify-center animate-slide-in-right"
          >
            <h3 
              className="font-['Cinzel'] text-[#F2EEE7] mb-6"
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                letterSpacing: '0.02em',
                lineHeight: 1.2
              }}
            >
              Defining Luxury Real Estate Excellence
            </h3>

            <div className="space-y-6 mb-10">
              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 leading-relaxed"
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.8
                }}
              >
                Since our founding, Linart Realty LLC has redefined the landscape of luxury real estate through 
                architectural vision, strategic market mastery, and an unwavering commitment to royal excellence.
              </p>

              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 leading-relaxed"
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.8
                }}
              >
                We specialize in ultra-premium residential estates, Class A commercial towers, and transformative 
                design projects that embody timeless elegance and establish generational wealth. Our global network 
                and institutional-grade advisory deliver exclusive opportunities to the world's most discerning clientele.
              </p>

              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 leading-relaxed"
                style={{
                  fontSize: '1rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.8
                }}
              >
                Every property we represent, every transaction we execute, reflects our core philosophy: 
                architecture as legacy, real estate as empire, and service as an art form.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="border-l-2 border-[#A8A9AD]/40 pl-4"
                >
                  <div 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-1"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 600,
                      letterSpacing: '0.01em'
                    }}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className="font-['Montserrat'] text-[#A8A9AD] uppercase"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      letterSpacing: '0.08em'
                    }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <h3 
              className="font-['Cinzel'] text-[#E5E4E2] mb-4"
              style={{
                fontSize: '2.25rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Our Core Values
            </h3>
            <p 
              className="font-['Montserrat'] text-[#A8A9AD]"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.03em'
              }}
            >
              The pillars that define our royal approach to real estate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  className="group relative bg-[#0A0A0B] p-8 border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-700"
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <Icon className="w-12 h-12 text-[#A8A9AD] group-hover:text-[#E5E4E2] transition-colors duration-500" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <h4 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-4"
                    style={{
                      fontSize: '1.15rem',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      lineHeight: 1.3
                    }}
                  >
                    {value.title}
                  </h4>

                  {/* Description */}
                  <p 
                    className="font-['Montserrat'] text-[#E5E4E2]/60 leading-relaxed"
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      lineHeight: 1.7
                    }}
                  >
                    {value.description}
                  </p>

                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E5E4E2]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E5E4E2]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shimmer Effect */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s ease-in-out infinite'
                    }}
                  />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

      </div>

      {/* Bottom Accent */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 20%, #A8A9AD 50%, #E5E4E2 80%, transparent 100%)',
        }}
      />
    </section>
  );
}