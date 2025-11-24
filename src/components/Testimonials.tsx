import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  TESTIMONIALS - Premium Client Reviews (4x2 Grid)
  - Data loaded from API
═══════════════════════════════════════════════════════════════════
*/

interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  image: string;
  location: string;
  published?: boolean;
}

// Fallback demo testimonials when API is unavailable
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Victoria Ashford',
    role: 'CEO, Ashford Holdings',
    text: 'Linart Realty exceeded every expectation. Their professionalism, market knowledge, and dedication to finding the perfect property for our portfolio was unmatched. A truly exceptional experience.',
    rating: 5,
    image: 'professional-woman-executive',
    location: 'Beverly Hills, CA',
    published: true
  },
  {
    id: '2',
    name: 'Marcus Wellington',
    role: 'Investment Director',
    text: 'The team at Linart demonstrated exceptional expertise in luxury real estate investment. Their strategic insights and market analysis were instrumental in our successful acquisition.',
    rating: 5,
    image: 'businessman-professional',
    location: 'Manhattan, NY',
    published: true
  },
  {
    id: '3',
    name: 'Sophia Laurent',
    role: 'Fashion Executive',
    text: 'Finding our dream home felt effortless with Linart Realty. Their attention to detail, understanding of our needs, and access to exclusive properties made all the difference.',
    rating: 5,
    image: 'elegant-woman-portrait',
    location: 'Malibu, CA',
    published: true
  },
  {
    id: '4',
    name: 'James Hartford III',
    role: 'Private Equity Partner',
    text: 'Impeccable service from start to finish. Linart Realty\'s market intelligence and negotiation skills secured us an exceptional property at the perfect value.',
    rating: 5,
    image: 'executive-businessman',
    location: 'Newport Beach, CA',
    published: true
  }
];

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-dcec270f/testimonials`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Check if data.testimonials exists and is an array
        if (data.testimonials && Array.isArray(data.testimonials)) {
          // Show only published testimonials
          const publishedTestimonials = data.testimonials.filter((t: Testimonial) => t.published !== false);
          setTestimonials(publishedTestimonials);
        } else {
          console.log('Testimonials data format:', data);
          setTestimonials(FALLBACK_TESTIMONIALS);
        }
      } else {
        console.log('Testimonials API error, using fallback');
        setTestimonials(FALLBACK_TESTIMONIALS);
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      console.log('Network error, using fallback testimonials');
      setTestimonials(FALLBACK_TESTIMONIALS);
    } finally {
      setLoading(false);
    }
  };

  function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.article
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ 
          duration: 0.8, 
          delay: index * 0.1,
          ease: [0.22, 1, 0.36, 1] 
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative h-full"
      >
        {/* Card Container */}
        <div className="relative bg-[#0F0F0F] p-8 overflow-hidden h-full flex flex-col">
          
          {/* Animated Premium Border */}
          <motion.div 
            className="absolute inset-0 pointer-events-none z-20"
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
                opacity: isHovered ? 1 : 0.25,
                transition: 'all 0.7s ease'
              }}
            />
          </motion.div>

          {/* Shimmer Border Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-20"
            animate={{
              opacity: isHovered ? 0.3 : 0,
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

          {/* Quote Icon */}
          <div className="mb-6 flex-shrink-0">
            <Quote className="w-10 h-10 text-[#A8A9AD] opacity-40 group-hover:opacity-70 transition-opacity duration-500" strokeWidth={1.5} />
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-6 flex-shrink-0">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 text-[#A8A9AD] fill-[#A8A9AD]" 
                strokeWidth={1.5} 
              />
            ))}
          </div>

          {/* Review Text */}
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/80 leading-relaxed"
            style={{
              fontSize: '0.95rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.8,
              height: '180px',
              overflow: 'hidden'
            }}
          >
            "{testimonial.text}"
          </p>

          {/* Client Info */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#E5E4E2]/10 flex-shrink-0 mt-6">
            {/* Avatar */}
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#E5E4E2]/20 group-hover:border-[#A8A9AD]/40 transition-colors duration-500 flex-shrink-0">
              <ImageWithFallback
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 
                className="font-['Cinzel'] text-[#F2EEE7] mb-1"
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.01em'
                }}
              >
                {testimonial.name}
              </h4>
              <p 
                className="font-['Montserrat'] text-[#A8A9AD]"
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 400,
                  letterSpacing: '0.02em'
                }}
              >
                {testimonial.role}
              </p>
              <p 
                className="font-['Montserrat'] text-[#A8A9AD]/60 mt-0.5"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 400,
                  letterSpacing: '0.03em'
                }}
              >
                {testimonial.location}
              </p>
            </div>
          </div>

          {/* Hover Glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              boxShadow: isHovered 
                ? '0 0 60px rgba(168, 169, 173, 0.1), inset 0 0 60px rgba(168, 169, 173, 0.03)' 
                : '0 0 0px rgba(168, 169, 173, 0)',
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.article>
    );
  }

  return (
    <section id="testimonials" className="relative bg-[#0A0A0B] py-32 lg:py-40 overflow-hidden">
      
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      {/* Top Accent */}
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
              Client Voices
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
            Testimonials
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
            Trusted by leaders who demand excellence in every transaction
          </p>
        </motion.div>

        {/* Testimonials Grid - 4 columns, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>

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