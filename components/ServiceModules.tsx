import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Building2, Home, Paintbrush, TrendingUp, ArrowRight, Crown } from 'lucide-react';

/*
═══════════════════════════════════════════════════════════════════
  SERVICE CARD STRUCTURE (ServiceCard)
═══════════════════════════════════════════════════════════════════

  ┌─────────────────────────────────────────────────┐
  │                                                 │
  │              IMAGE SECTION                      │  ← Image Section
  │              (top part)                         │     h-[420px] - height
  │                                                 │
  │  [Icon]                                         │  ← Icon (service icon, bottom left)
  ├─────────────────────────────────────────────────┤
  │  Subtitle (italic, platinum)                    │  ← Subtitle
  │                                                 │
  │  TITLE (with shimmer effect)                    │  ← Title (main heading)
  │                                                 │
  │  Description text here...                       │  ← Description
  │                                                 │
  │  ◆ Feature 1                                    │
  │  ◆ Feature 2                                    │  ← Features list
  │  ◆ Feature 3                                    │
  │  ◆ Feature 4                                    │
  │                                                 │
  │  ┌─────────────────────────────────────────┐   │
  │  │       EXPLORE  →                        │   │  ← CTA Button
  │  └─────────────────────────────────────────┘   │
  └─────────────────────────────────────────────────┘

  TOTAL HEIGHT: h-[1050px]
  - Image: h-[420px]
  - Content: h-[630px]

═══════════════════════════════════════════════════════════════════
*/

interface ServiceModule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  icon: any;
}

const services: ServiceModule[] = [
  {
    id: 'commercial',
    title: 'Commercial Property',
    subtitle: 'Empire Building',
    description: 'Command premium commercial real estate that defines skylines and establishes corporate dominance in prime metropolitan districts.',
    features: [
      'Class A Office Towers',
      'Flagship Retail Spaces',
      'Industrial Facilities',
      'Investment Properties'
    ],
    imageUrl: '/images/service-commercial.jpg',
    icon: Building2
  },
  {
    id: 'residential',
    title: 'Residential Property',
    subtitle: 'Private Estates',
    description: 'Acquire architectural masterpieces where legacy resides. Curated residences embodying status, privacy, and timeless elegance.',
    features: [
      'Ultra-Luxury Penthouses',
      'Historic Mansions',
      'Gated Communities',
      'Off-Market Opportunities'
    ],
    imageUrl: '/images/service-residential.jpg',
    icon: Home
  },
  {
    id: 'design',
    title: 'Design & Renovation',
    subtitle: 'Architectural Transformation',
    description: 'Transform properties into palatial masterworks through visionary design and meticulous craftsmanship by world-renowned artisans.',
    features: [
      'Custom Architecture',
      'Historic Restoration',
      'Luxury Interior Design',
      'Smart Integration'
    ],
    imageUrl: '/images/service-design.jpg',
    icon: Paintbrush
  },
  {
    id: 'investment',
    title: 'Investment Advisory',
    subtitle: 'Strategic Wealth',
    description: 'Navigate global real estate markets with institutional-grade advisory for wealth preservation and exponential growth across generations.',
    features: [
      'Portfolio Strategy',
      'Market Intelligence',
      'Tax Optimization',
      'Legacy Planning'
    ],
    imageUrl: '/images/service-investment.jpg',
    icon: TrendingUp
  }
];

const ServiceCard: React.FC<{ service: ServiceModule; index: number }> = ({ service, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex-shrink-0 w-full"
    >
      {/* Card Container - Card size: change h-[1050px] to desired height */}
      <div className="relative h-[1050px] bg-[#0F0F0F]">
        
        {/* Animated Premium Border */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-30"
          animate={{
            opacity: isHovered ? 1 : 0.6,
          }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className="absolute inset-0 border-2"
            style={{
              borderImage: isHovered 
                ? 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 25%, #E5E4E2 50%, #A8A9AD 75%, #E5E4E2 100%) 1'
                : 'linear-gradient(135deg, #E5E4E2 0%, #E5E4E2 100%) 1',
              opacity: isHovered ? 1 : 0.3,
              transition: 'all 0.7s ease'
            }}
          />
        </motion.div>

        {/* Platinum Shimmer Border Effect on Hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          animate={{
            opacity: isHovered ? 0.4 : 0,
          }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
            backgroundSize: '200% 200%',
            animation: isHovered ? 'shimmer 3s ease-in-out infinite' : 'none',
            maskImage: 'linear-gradient(to bottom, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to right, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to top, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to left, transparent calc(100% - 4px), black calc(100% - 4px))',
            maskComposite: 'exclude',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to right, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to top, transparent calc(100% - 4px), black calc(100% - 4px)), linear-gradient(to left, transparent calc(100% - 4px), black calc(100% - 4px))',
            WebkitMaskComposite: 'xor'
          }}
        />

        {/* Image Section - Image size: change h-[420px] */}
        <div className="relative h-[420px] overflow-hidden z-10">
          <motion.img
            src={service.imageUrl}
            alt={service.title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0F0F0F]/40 to-[#0F0F0F]" />
          
          {/* Platinum Shimmer Overlay on Hover */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: isHovered ? 0.15 : 0,
            }}
            transition={{ duration: 0.5 }}
            style={{
              background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'shimmer 3s ease-in-out infinite' : 'none'
            }}
          />

          {/* Icon - Icon size: change p-5 and w-10 h-10 */}
          <motion.div
            className="absolute bottom-6 left-6"
            animate={{
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0,
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-5 bg-[#0F0F0F]/90 backdrop-blur-sm border border-[#E5E4E2]/20 group-hover:border-[#A8A9AD]/50 transition-colors duration-500">
              <Icon className="w-10 h-10 text-[#A8A9AD]" strokeWidth={1.5} />
            </div>
          </motion.div>
        </div>

        {/* Content Section - Content size: change h-[630px] and p-10 */}
        <div className="relative p-10 h-[630px] flex flex-col">
          {/* Subtitle - Text size: change text-xl */}
          <p className="font-['Cormorant_Garamond'] italic text-[#A8A9AD] text-xl mb-4 h-[32px] flex items-center">
            {service.subtitle}
          </p>

          {/* Title */}
          <h3 className="mb-6 text-[32px] text-center h-[80px] flex items-center justify-center">
            <motion.span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: isHovered 
                  ? 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)'
                  : 'linear-gradient(135deg, #E5E4E2 0%, #E5E4E2 100%)',
                backgroundSize: '200% 200%',
                animation: isHovered ? 'shimmer 3s ease-in-out infinite' : 'none'
              }}
            >
              {service.title}
            </motion.span>
          </h3>

          {/* Description - Text size: change text-base */}
          <p className="text-[#E5E4E2]/70 leading-relaxed mb-8 text-base h-[96px]">
            {service.description}
          </p>

          {/* Features - Spacing: change space-y-3 and mb-8 */}
          <div className="space-y-3 mb-8 h-[140px]">
            {service.features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 + idx * 0.1 }}
                className="flex items-center gap-3 group/item"
              >
                <div className="w-1 h-1 bg-[#A8A9AD] transform rotate-45 group-hover/item:scale-150 transition-transform duration-300" />
                <span className="text-[#E5E4E2]/60 text-[15px] group-hover/item:text-[#E5E4E2]/90 transition-colors duration-300">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={() => {
              if ((window as any).navigateTo) {
                (window as any).navigateTo('/services');
              }
            }}
            className="relative w-full py-5 border border-[#E5E4E2]/20 group-hover:border-[#A8A9AD]/50 overflow-hidden transition-all duration-500"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shimmer Background */}
            <motion.div 
              className="absolute inset-0"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
                backgroundSize: '200% 200%',
                animation: isHovered ? 'shimmer 3s ease-in-out infinite' : 'none'
              }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#0F0F0F] opacity-90" />
            
            {/* Button text size: change text-sm */}
            <span className="relative z-10 flex items-center justify-center gap-2 font-['Montserrat'] tracking-[0.2em] uppercase text-sm text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-300">
              Explore
              <ArrowRight className="w-5 h-5 text-[#A8A9AD] group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </motion.button>

          {/* Bottom Accent Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#A8A9AD] to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered 
              ? '0 0 80px rgba(168, 169, 173, 0.15), inset 0 0 80px rgba(168, 169, 173, 0.05)' 
              : '0 0 0px rgba(168, 169, 173, 0)',
          }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export const ServiceModules: React.FC = () => {
  return (
    <section className="relative section-padding bg-[#0A0A0B] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 50px,
            #E5E4E2 50px,
            #E5E4E2 51px
          )`
        }} />
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-[#A8A9AD]" />
            <Crown className="w-6 h-6 text-[#A8A9AD]" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-[#A8A9AD]" />
          </div>
          
          <h2 className="mb-6">
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
                backgroundSize: '200% 200%',
              }}
            >
              Royal Services
            </span>
          </h2>
          
          <p className="font-['Cormorant_Garamond'] italic text-[#E5E4E2]/70 text-xl max-w-2xl mx-auto">
            Four pillars of excellence defining the future of luxury real estate
          </p>
        </motion.div>

        {/* Cards Grid */}
        {/* Card spacing: change gap-6 lg:gap-8 */}
        {/* Column count: md:grid-cols-2 (tablet) lg:grid-cols-4 (desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Decorative Bottom Element */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 h-px bg-gradient-to-r from-transparent via-[#E5E4E2]/30 to-transparent"
        />
      </div>

      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-[#A8A9AD] to-transparent" />
        <div className="absolute top-0 left-0 w-px h-32 bg-gradient-to-b from-[#A8A9AD] to-transparent" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-10 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-32 h-px bg-gradient-to-l from-[#A8A9AD] to-transparent" />
        <div className="absolute bottom-0 right-0 w-px h-32 bg-gradient-to-t from-[#A8A9AD] to-transparent" />
      </div>
    </section>
  );
};