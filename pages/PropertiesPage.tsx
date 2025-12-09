import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Bed, Bath, Square, TrendingUp, Building2, Home, Filter } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { PremiumButton } from '../components/PremiumButton';
import { SEO } from '../components/SEO';
import { fetchProperties } from '../utils/api/client';

/*
═══════════════════════════════════════════════════════════════════
  PROPERTIES PAGE - Full Property Listings
  - Data loaded directly from KV store
═══════════════════════════════════════════════════════════════════
*/

export function PropertiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPropertiesData();
  }, []);

  const fetchPropertiesData = async () => {
    try {
      setLoading(true);
      const data = await fetchProperties();
      
      // Show only published properties
      const publishedProperties = data.filter((p: any) => p.published !== false);
      setProperties(publishedProperties);
    } catch (error) {
      console.error('Error fetching properties:', error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    { id: 'all', label: 'All Properties' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'residential', label: 'Residential' },
    { id: 'luxury', label: 'Luxury Estates' },
    { id: 'investment', label: 'Investment' }
  ];

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(p => {
        const type = p.propertyType?.toLowerCase();
        if (activeFilter === 'luxury') return type === 'luxury estates';
        if (activeFilter === 'commercial') return type === 'commercial';
        if (activeFilter === 'residential') return type === 'residential';
        if (activeFilter === 'investment') return type === 'investment';
        return false;
      });

  return (
    <>
      <SEO
        title="Luxury Properties for Sale | Linart Realty LLC"
        description="Browse our exclusive collection of luxury residential estates and commercial properties in prime Florida locations. Experience royal-class real estate with investment-grade opportunities."
        image="/images/og-properties.jpg"
        keywords="luxury properties, real estate for sale, premium estates, commercial properties, Florida luxury homes, investment properties, waterfront estates, luxury real estate Florida"
      />
      
      <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
        
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
            className="text-center mb-16"
          >
            <div className="inline-block mb-6">
              <div 
                className="font-['Montserrat'] uppercase text-[#A8A9AD] tracking-[0.3em] mb-2"
                style={{ fontSize: '0.75rem', fontWeight: 600 }}
              >
                Premium Portfolio
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
              Exclusive Properties
            </h1>

            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-2xl mx-auto"
              style={{
                fontSize: '1.1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              Curated collection of Florida's most prestigious commercial and residential real estate
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-16"
          >
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-8 py-3 border transition-all duration-500 group ${
                  activeFilter === filter.id
                    ? 'border-[#A8A9AD] bg-[#A8A9AD]/10'
                    : 'border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60'
                }`}
              >
                <span 
                  className={`font-['Montserrat'] uppercase transition-colors duration-500 ${
                    activeFilter === filter.id
                      ? 'text-[#E5E4E2]'
                      : 'text-[#E5E4E2]/60 group-hover:text-[#E5E4E2]'
                  }`}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.15em'
                  }}
                >
                  {filter.label}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Properties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group relative bg-[#0F0F0F] overflow-hidden"
              >
                
                {/* Border */}
                <div 
                  className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                  style={{
                    border: '1px solid',
                    borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                  }}
                />

                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0A0A0B]">
                  <ImageWithFallback
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="px-4 py-1.5 bg-[#0A0A0B]/90 backdrop-blur-sm border border-[#E5E4E2]/30">
                      <span 
                        className="font-['Montserrat'] uppercase text-[#E5E4E2]"
                        style={{
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          letterSpacing: '0.15em'
                        }}
                      >
                        {property.status}
                      </span>
                    </div>
                  </div>

                  {/* ROI Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1.5 bg-[#A8A9AD]/20 backdrop-blur-sm border border-[#E5E4E2]/30">
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3 h-3 text-[#E5E4E2]" strokeWidth={2} />
                        <span 
                          className="font-['Montserrat'] text-[#E5E4E2]"
                          style={{
                            fontSize: '0.7rem',
                            fontWeight: 600,
                            letterSpacing: '0.05em'
                          }}
                        >
                          {property.roi}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  
                  {/* Location */}
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-[#A8A9AD]" strokeWidth={1.5} />
                    <span 
                      className="font-['Montserrat'] text-[#A8A9AD]"
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 500,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {property.location}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    className="font-['Cinzel'] text-[#F2EEE7] mb-4 group-hover:text-[#E5E4E2] transition-colors duration-500"
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      letterSpacing: '0.01em',
                      lineHeight: 1.3
                    }}
                  >
                    {property.title}
                  </h3>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-5 pb-5 border-b border-[#E5E4E2]/10">
                    {property.beds && (
                      <div className="flex items-center gap-1.5">
                        <Bed className="w-4 h-4 text-[#A8A9AD]" strokeWidth={1.5} />
                        <span 
                          className="font-['Montserrat'] text-[#E5E4E2]/70"
                          style={{ fontSize: '0.85rem', fontWeight: 500 }}
                        >
                          {property.beds}
                        </span>
                      </div>
                    )}
                    {property.baths && (
                      <div className="flex items-center gap-1.5">
                        <Bath className="w-4 h-4 text-[#A8A9AD]" strokeWidth={1.5} />
                        <span 
                          className="font-['Montserrat'] text-[#E5E4E2]/70"
                          style={{ fontSize: '0.85rem', fontWeight: 500 }}
                        >
                          {property.baths}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-[#A8A9AD]" strokeWidth={1.5} />
                      <span 
                        className="font-['Montserrat'] text-[#E5E4E2]/70"
                        style={{ fontSize: '0.85rem', fontWeight: 500 }}
                      >
                        {property.sqft} sqft
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div 
                    className="font-['Cinzel'] text-[#E5E4E2]"
                    style={{
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em'
                    }}
                  >
                    {property.price}
                  </div>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,169,173,0.1)]" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
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
              Looking for Something Specific?
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
              Our team specializes in finding off-market opportunities and creating custom property solutions for discerning clients.
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
    </>
  );
}