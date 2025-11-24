import React from 'react';
import { motion } from 'motion/react';
import { Home, Building2, Hammer, TrendingUp } from 'lucide-react';

export function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential Sales',
      description: 'From luxury estates to urban penthouses, we specialize in connecting discerning clients with exceptional properties that match their vision.',
    },
    {
      icon: Building2,
      title: 'Commercial Properties',
      description: 'Strategic guidance for commercial real estate investments, offering prime locations and opportunities for portfolio growth.',
    },
    {
      icon: Hammer,
      title: 'Design & Build',
      description: 'Transform existing properties into architectural masterpieces with our comprehensive renovation and design services.',
    },
    {
      icon: TrendingUp,
      title: 'Investment Advisory',
      description: 'Expert market insights and investment strategies to help you build and manage a profitable real estate portfolio.',
    }
  ];

  return (
    <section id="services" className="section-padding bg-[#0F0F0F] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(168, 169, 173, 0.1) 100px, rgba(168, 169, 173, 0.1) 102px)'
        }} />
      </div>
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px bg-[#A8A9AD] w-32" />
            <div className="w-3 h-3 bg-[#A8A9AD] rotate-45" />
            <div className="h-px bg-[#A8A9AD] w-32" />
          </div>
          
          <h2 className="mb-8 text-[#F2EEE7]">Our Services</h2>
          <p className="text-xl text-[#F2EEE7]/70 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Comprehensive Real Estate Solutions Tailored to Your Unique Needs and Aspirations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-[#0A0A0B] border-2 border-[#1A1A1A] p-12 lg:p-14 hover:border-[#A8A9AD] transition-all duration-500 relative overflow-hidden"
            >
              {/* Subtle hover overlay */}
              <div className="absolute inset-0 bg-[#A8A9AD]/0 group-hover:bg-[#A8A9AD]/5 transition-all duration-500" />
              
              <div className="relative z-10">
                <div className="mb-8 inline-block">
                  <div className="w-20 h-20 bg-[#A8A9AD] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    <service.icon 
                      size={40} 
                      className="text-[#0A0A0B]" 
                      strokeWidth={2}
                    />
                  </div>
                </div>
                
                <h3 className="text-xl lg:text-2xl mb-5 text-[#F2EEE7] group-hover:text-[#E5E4E2] transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-[#F2EEE7]/70 leading-relaxed text-[15px] lg:text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}