import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, ArrowRight } from 'lucide-react';

/*
═══════════════════════════════════════════════════════════════════
  CONTACT SECTION - Consultation Form & Office Details
═══════════════════════════════════════════════════════════════════
*/

interface Office {
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
}

const offices: Office[] = [
  {
    city: 'Boca Raton',
    address: '2255 Glades Road, Suite 324A\nBoca Raton, FL 33431',
    phone: '+1 (561) 750-9800',
    email: 'boca@linartrealty.com',
    hours: 'Mon-Fri: 9AM-6PM EST'
  },
  {
    city: 'Miami',
    address: '1450 Brickell Avenue, Suite 1900\nMiami, FL 33131',
    phone: '+1 (305) 555-0100',
    email: 'miami@linartrealty.com',
    hours: 'Mon-Fri: 9AM-6PM EST'
  }
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    budget: '',
    message: ''
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="relative bg-[#0A0A0B] py-32 lg:py-40 overflow-hidden">
      
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
              Begin Your Journey
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
            Contact Us
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
            Schedule a private consultation with our luxury real estate specialists
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <div className="relative bg-[#0F0F0F] p-10 border-2 border-[#E5E4E2]/20">
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#E5E4E2]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#E5E4E2]" />

              <h3 
                className="font-['Cinzel'] text-[#F2EEE7] mb-8"
                style={{
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                Request Consultation
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Name */}
                <div>
                  <label 
                    htmlFor="name" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  />
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="email" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label 
                    htmlFor="phone" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label 
                    htmlFor="propertyType" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Interest Area
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="residential">Residential Property</option>
                    <option value="commercial">Commercial Property</option>
                    <option value="design">Design & Renovation</option>
                    <option value="investment">Investment Advisory</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label 
                    htmlFor="budget" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Investment Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  >
                    <option value="">Select a range</option>
                    <option value="5-10m">$5M - $10M</option>
                    <option value="10-25m">$10M - $25M</option>
                    <option value="25-50m">$25M - $50M</option>
                    <option value="50m+">$50M+</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label 
                    htmlFor="message" 
                    className="block font-['Montserrat'] text-[#E5E4E2]/80 mb-2"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-[#0A0A0B] border border-[#E5E4E2]/20 px-4 py-3 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-colors duration-300 resize-none"
                    style={{
                      fontSize: '0.95rem',
                      letterSpacing: '0.01em'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="relative w-full py-5 border border-[#E5E4E2]/30 hover:border-[#A8A9AD]/80 overflow-hidden transition-all duration-700 group"
                >
                  {/* Shimmer Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 3s ease-in-out infinite',
                    }}
                  />
                  
                  {/* Dark Overlay */}
                  <div className="absolute inset-0 bg-[#0F0F0F]/90 group-hover:bg-[#0F0F0F]/60 transition-all duration-700" />

                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span 
                      className="font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#F2EEE7] transition-colors duration-500"
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.22em'
                      }}
                    >
                      Submit Request
                    </span>
                    <Send 
                      size={18} 
                      className="text-[#E5E4E2] group-hover:text-[#F2EEE7] group-hover:translate-x-1 transition-all duration-500" 
                    />
                  </div>

                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#E5E4E2] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>

              </form>
            </div>
          </motion.div>

          {/* Right: Office Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="space-y-8"
          >
            
            {/* Offices */}
            {offices.map((office, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                className="relative bg-[#0F0F0F] p-8 border border-[#E5E4E2]/20 group hover:border-[#A8A9AD]/50 transition-all duration-700"
              >
                {/* City */}
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-6 pb-4 border-b border-[#E5E4E2]/10"
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {office.city}
                </h3>

                <div className="space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#A8A9AD] mt-1 flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p 
                        className="font-['Montserrat'] text-[#E5E4E2]/80 whitespace-pre-line"
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 400,
                          letterSpacing: '0.01em',
                          lineHeight: 1.7
                        }}
                      >
                        {office.address}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-[#A8A9AD] flex-shrink-0" strokeWidth={1.5} />
                    <a 
                      href={`tel:${office.phone.replace(/\s/g, '')}`}
                      className="font-['Montserrat'] text-[#E5E4E2]/80 hover:text-[#F2EEE7] transition-colors duration-300"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                      }}
                    >
                      {office.phone}
                    </a>
                  </div>

                  {/* Email */}
                  <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-[#A8A9AD] flex-shrink-0" strokeWidth={1.5} />
                    <a 
                      href={`mailto:${office.email}`}
                      className="font-['Montserrat'] text-[#E5E4E2]/80 hover:text-[#F2EEE7] transition-colors duration-300"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                      }}
                    >
                      {office.email}
                    </a>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-4">
                    <Clock className="w-5 h-5 text-[#A8A9AD] flex-shrink-0" strokeWidth={1.5} />
                    <p 
                      className="font-['Montserrat'] text-[#E5E4E2]/80"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                      }}
                    >
                      {office.hours}
                    </p>
                  </div>
                </div>

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
            ))}

            {/* Additional Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="relative bg-[#0A0A0B] p-8 border border-[#E5E4E2]/15"
            >
              <h4 
                className="font-['Cinzel'] text-[#F2EEE7] mb-4"
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em'
                }}
              >
                Corporate Headquarters
              </h4>
              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 leading-relaxed"
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.7
                }}
              >
                Linart Realty LLC operates throughout Florida with additional representation 
                in major luxury real estate markets globally. Our network extends across North America, 
                Europe, and select international destinations.
              </p>
            </motion.div>

          </motion.div>
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