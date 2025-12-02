import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, TrendingUp, ArrowRight } from 'lucide-react';
import { PremiumButton } from './PremiumButton';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { fetchProperties } from '../utils/api/client';

/*
═══════════════════════════════════════════════════════════════════
  FEATURED PROPERTIES SECTION - Luxury Property Showcase
  - Data loaded directly from KV store
═══════════════════════════════════════════════════════════════════
*/

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
  sqft: string;
  bedrooms?: number;
  bathrooms?: number;
  status: 'For Sale' | 'Sold' | 'Exclusive';
  type: 'Residential' | 'Commercial';
  yearBuilt: number;
  features: string[];
  published?: boolean;
}

export function FeaturedProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const fetchPropertiesData = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      
      // Show only published properties, limit to 3 for featured section
      const publishedProperties = data.filter((p: any) => p.published !== false).slice(0, 3);
      setProperties(publishedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="properties" className="relative bg-[#0A0A0B] py-32 lg:py-40 overflow-hidden">
      
      {/* Decorative Background Pattern - Diagonal Platinum Lines */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 20%, #A8A9AD 50%, #E5E4E2 80%, transparent 100%)',
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20 lg:mb-28"
        >
          {/* Overline */}
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
              Exclusive Collection
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#A8A9AD]" />
          </div>

          {/* Main Title */}
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              lineHeight: 1.1
            }}
          >
            Featured Properties
          </h2>

          {/* Subtitle */}
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/60 max-w-2xl mx-auto"
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.03em',
              lineHeight: 1.8
            }}
          >
            Curated selection of the world's most prestigious estates, 
            handpicked for discerning clientele
          </p>

          {/* Decorative Line */}
          <div className="mt-10 mx-auto w-32 h-px relative">
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, #E5E4E2, #A8A9AD, #E5E4E2)',
              }}
            />
          </div>
        </motion.div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-20 lg:mt-28"
        >
          <PremiumButton 
            onClick={() => {
              if ((window as any).navigateTo) {
                (window as any).navigateTo('/properties');
              }
            }}
          >
            Explore All Properties
          </PremiumButton>
        </motion.div>
      </div>

      {/* Bottom Accent Line */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #E5E4E2 20%, #A8A9AD 50%, #E5E4E2 80%, transparent 100%)',
        }}
      />
    </section>
  );
}

function PropertyCard({ property, index }: { property: Property; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.9, 
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      {/* Card Container */}
      <div className="relative bg-[#0F0F0F] overflow-hidden">
        
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

        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A] z-10">
          <motion.div
            animate={{
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full"
          >
            <ImageWithFallback
              src={property.image}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />

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

          {/* Type & Status Badges */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <div className="relative px-3 py-1 bg-[#0F0F0F]/90 backdrop-blur-sm border border-[#E5E4E2]/30">
              <span 
                className="font-['Montserrat'] uppercase text-[#E5E4E2]"
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em'
                }}
              >
                {property.type}
              </span>
            </div>
            <div className="relative px-3 py-1 bg-[#0F0F0F]/90 backdrop-blur-sm border border-[#A8A9AD]/40">
              <span 
                className="font-['Montserrat'] uppercase text-[#E5E4E2]"
                style={{
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em'
                }}
              >
                {property.status}
              </span>
            </div>
          </div>

          {/* View Details Button - Appears on hover */}
          <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <button className="w-9 h-9 bg-[#0F0F0F]/90 backdrop-blur-sm border border-[#E5E4E2]/40 hover:border-[#E5E4E2]/80 hover:bg-[#1A1A1A] transition-all duration-300 flex items-center justify-center">
              <ArrowRight size={16} className="text-[#E5E4E2]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 relative z-10">
          
          {/* Title & Location & Year */}
          <div className="mb-4">
            <div className="flex items-start justify-between mb-1.5">
              <motion.h3 
                className="font-['Cinzel'] flex-1"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em',
                  lineHeight: 1.3
                }}
              >
                <motion.span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: isHovered 
                      ? 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)'
                      : 'linear-gradient(135deg, #F2EEE7 0%, #F2EEE7 100%)',
                    backgroundSize: '200% 200%',
                    animation: isHovered ? 'shimmer 3s ease-in-out infinite' : 'none'
                  }}
                >
                  {property.title}
                </motion.span>
              </motion.h3>
              <span 
                className="font-['Montserrat'] text-[#A8A9AD] ml-2"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em'
                }}
              >
                {property.yearBuilt}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[#A8A9AD]">
              <MapPin size={12} strokeWidth={1.5} />
              <span 
                className="font-['Montserrat']"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                {property.location}
              </span>
            </div>
          </div>

          {/* Specs - Compact inline version */}
          {property.type === 'Residential' ? (
            <div className="flex items-center gap-4 mb-4 pb-4 border-b border-[#E5E4E2]/10">
              <div className="flex items-center gap-1.5 text-[#A8A9AD]">
                <Square size={12} strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  {property.sqft}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A8A9AD]">
                <Bed size={12} strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  {property.bedrooms}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#A8A9AD]">
                <Bath size={12} strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  {property.bathrooms}
                </span>
              </div>
            </div>
          ) : (
            <div className="mb-4 pb-4 border-b border-[#E5E4E2]/10">
              <div className="flex items-center gap-1.5 text-[#A8A9AD]">
                <Square size={12} strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    letterSpacing: '0.02em'
                  }}
                >
                  {property.sqft} Sq Ft
                </span>
              </div>
            </div>
          )}

          {/* Features - compact */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1.5">
              {property.features.map((feature, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 bg-[#1A1A1A] border border-[#E5E4E2]/10 font-['Montserrat'] text-[#E5E4E2]"
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 400,
                    letterSpacing: '0.04em'
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-end justify-between">
            <div>
              <p 
                className="font-['Cinzel'] text-[#F2EEE7]"
                style={{
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}
              >
                {property.price}
              </p>
            </div>

            {/* Learn More Link */}
            <button className="group/btn flex items-center gap-1.5 text-[#E5E4E2] hover:text-[#F2EEE7] transition-colors duration-300">
              <span 
                className="font-['Montserrat'] uppercase"
                style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.12em'
                }}
              >
                View
              </span>
              <ArrowRight 
                size={14} 
                className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" 
              />
            </button>
          </div>
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
    </motion.article>
  );
}