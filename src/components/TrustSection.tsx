import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, Trophy, Star, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  TRUST SECTION - Premium Partners & Awards
  - Data loaded from API (Recognition & Partnerships)
═══════════════════════════════════════════════════════════════════
*/

interface Partner {
  id: string;
  name: string;
  category: string;
  logo?: string;
  website?: string;
  published?: boolean;
}

interface AwardItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  description?: string;
  image?: string;
  published?: boolean;
}

// Fallback demo data when API is unavailable
const FALLBACK_AWARDS: AwardItem[] = [
  {
    id: '1',
    title: 'Luxury Real Estate Agency of the Year',
    organization: 'International Property Awards',
    year: '2024',
    description: 'Recognized for excellence in luxury real estate services',
    published: true
  },
  {
    id: '2',
    title: 'Best Investment Advisory Services',
    organization: 'Global Finance Magazine',
    year: '2023',
    description: 'Outstanding performance in real estate investment consulting',
    published: true
  },
  {
    id: '3',
    title: 'Elite Client Service Excellence',
    organization: 'Luxury Lifestyle Awards',
    year: '2024',
    description: 'Premium customer experience and service quality',
    published: true
  },
  {
    id: '4',
    title: 'Top Commercial Real Estate Firm',
    organization: 'Commercial Property Executive',
    year: '2023',
    description: 'Leadership in commercial property transactions',
    published: true
  }
];

const FALLBACK_PARTNERS: Partner[] = [
  {
    id: '1',
    name: 'Sotheby\'s International Realty',
    category: 'Global Network',
    published: true
  },
  {
    id: '2',
    name: 'Christie\'s Real Estate',
    category: 'Luxury Partner',
    published: true
  },
  {
    id: '3',
    name: 'Leading Real Estate Companies of the World',
    category: 'Professional Network',
    published: true
  },
  {
    id: '4',
    name: 'Luxury Portfolio International',
    category: 'Marketing Partner',
    published: true
  }
];

export function TrustSection() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [awards, setAwards] = useState<AwardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch Recognition (Awards)
      const recognitionResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/recognition`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Fetch Partnerships
      const partnershipsResponse = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/partnerships`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (recognitionResponse.ok) {
        const data = await recognitionResponse.json();
        // Check if data.items exists and is an array
        if (data.items && Array.isArray(data.items)) {
          const publishedAwards = data.items.filter((item: AwardItem) => item.published !== false);
          setAwards(publishedAwards);
        } else {
          console.log('Recognition data format:', data);
          setAwards(FALLBACK_AWARDS);
        }
      } else {
        console.log('Recognition API error, using fallback');
        setAwards(FALLBACK_AWARDS);
      }

      if (partnershipsResponse.ok) {
        const data = await partnershipsResponse.json();
        // Check if data.items exists and is an array
        if (data.items && Array.isArray(data.items)) {
          const publishedPartners = data.items.filter((item: Partner) => item.published !== false);
          setPartners(publishedPartners);
        } else {
          console.log('Partnerships data format:', data);
          setPartners(FALLBACK_PARTNERS);
        }
      } else {
        console.log('Partnerships API error, using fallback');
        setPartners(FALLBACK_PARTNERS);
      }
    } catch (error) {
      console.error('Error fetching trust data:', error);
      // Use fallback data on network error
      console.log('Network error, using fallback data');
      setAwards(FALLBACK_AWARDS);
      setPartners(FALLBACK_PARTNERS);
    } finally {
      setLoading(false);
    }
  };

  // Default icon mapping
  const getIconForAward = (index: number) => {
    const icons = [Trophy, Award, Star, Shield];
    return icons[index % icons.length];
  };

  return (
    <section className="relative bg-[#0F0F0F] py-28 lg:py-36 overflow-hidden">
      
      {/* Decorative Background Pattern */}
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
          className="text-center mb-20"
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
              Trust & Excellence
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-[#A8A9AD]" />
          </div>

          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '0.02em',
              lineHeight: 1.1
            }}
          >
            Global Recognition
          </h2>

          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/60 max-w-2xl mx-auto"
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.03em',
              lineHeight: 1.8
            }}
          >
            Trusted by the world's most prestigious real estate networks
          </p>
        </motion.div>

        {/* Awards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24"
        >
          {awards.map((award, index) => {
            const Icon = getIconForAward(index);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-[#0A0A0B] p-8 border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-700"
              >
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#E5E4E2]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#E5E4E2]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon */}
                <div className="mb-6">
                  <Icon className="w-12 h-12 text-[#A8A9AD] group-hover:text-[#E5E4E2] transition-colors duration-500" strokeWidth={1.5} />
                </div>

                {/* Year */}
                <p 
                  className="font-['Montserrat'] text-[#A8A9AD] mb-2"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    letterSpacing: '0.1em'
                  }}
                >
                  {award.year}
                </p>

                {/* Title */}
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                  style={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    lineHeight: 1.3
                  }}
                >
                  {award.title}
                </h3>

                {/* Organization */}
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/60"
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 400,
                    letterSpacing: '0.02em'
                  }}
                >
                  {award.organization}
                </p>

                {/* Shimmer Effect on Hover */}
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
        </motion.div>

        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 
              className="font-['Cinzel'] text-[#E5E4E2] mb-3"
              style={{
                fontSize: '1.75rem',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Strategic Partnerships
            </h3>
            <p 
              className="font-['Montserrat'] text-[#A8A9AD]"
              style={{
                fontSize: '0.9rem',
                fontWeight: 400,
                letterSpacing: '0.03em'
              }}
            >
              Aligned with the world's most exclusive networks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group relative bg-[#0A0A0B] p-8 border border-[#E5E4E2]/15 hover:border-[#A8A9AD]/50 transition-all duration-700 text-center"
              >
                {/* Partner Name */}
                <h4 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-2 group-hover:text-[#E5E4E2] transition-colors duration-500"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.01em',
                    lineHeight: 1.4
                  }}
                >
                  {partner.name}
                </h4>

                {/* Category */}
                <p 
                  className="font-['Montserrat'] text-[#A8A9AD]"
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 400,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase'
                  }}
                >
                  {partner.category}
                </p>

                {/* Subtle Glow on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{
                    boxShadow: 'inset 0 0 60px rgba(168, 169, 173, 0.03)'
                  }}
                />
              </motion.div>
            ))}
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