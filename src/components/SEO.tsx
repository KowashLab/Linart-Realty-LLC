import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string;
}

export function SEO({
  title = 'Linart Realty LLC | Luxury Real Estate & Investment Advisory',
  description = 'Premier luxury real estate services in elite markets. Residential estates, commercial properties, investment advisory, and design renovation services. Experience royal-class property management.',
  image = '/images/og-default.jpg',
  url = 'https://linartrealty.com',
  type = 'website',
  keywords = 'luxury real estate, premium properties, investment advisory, residential estates, commercial real estate, property management, design renovation, elite real estate'
}: SEOProps) {
  const fullTitle = title.includes('Linart Realty') ? title : `${title} | Linart Realty LLC`;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : url;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Linart Realty LLC" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Linart Realty LLC" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@LinartRealty" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#0A0A0B" />
      <meta name="msapplication-TileColor" content="#0A0A0B" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://mc.yandex.ru" />
    </Helmet>
  );
}