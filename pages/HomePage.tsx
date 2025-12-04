import React from 'react';
import { SEO } from '../components/SEO';
import { Hero } from '../components/Hero';
import { ServiceModules } from '../components/ServiceModules';
import { FeaturedProperties } from '../components/FeaturedProperties';
import { TrustSection } from '../components/TrustSection';
import { Testimonials } from '../components/Testimonials';
import { About } from '../components/About';
import { Contact } from '../components/Contact';

/*
═══════════════════════════════════════════════════════════════════
  HOME PAGE - Main Landing Page
═══════════════════════════════════════════════════════════════════
*/

export function HomePage() {
  return (
    <>
      <SEO
        title="Linart Realty LLC | Luxury Real Estate & Investment Advisory"
        description="Premier luxury real estate services in elite markets. Residential estates, commercial properties, investment advisory, and design renovation services. Experience royal-class property management."
        image="/images/og-default.jpg"
        url="https://linartrealty.com"
        type="website"
        keywords="luxury real estate, premium properties, investment advisory, residential estates, commercial real estate, property management, design renovation, elite real estate"
      />
      
      <Hero />
      <ServiceModules />
      <FeaturedProperties />
      <TrustSection />
      <Testimonials />
      <About />
      <Contact />
    </>
  );
}