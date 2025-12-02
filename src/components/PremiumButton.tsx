import React from 'react';

/*
═══════════════════════════════════════════════════════════════════
  PREMIUM BUTTON - Unified Button Style for Linart Realty
═══════════════════════════════════════════════════════════════════
  
  Unified premium style for all website buttons:
  - Border-2 with platinum color #E5E4E2
  - Hover effect with platinum fill
  - Text changes from #E5E4E2 to #0A0A0B on hover
  - Scale transform on hover (origin-left)
  - Montserrat uppercase with letter-spacing
  
═══════════════════════════════════════════════════════════════════
*/

interface PremiumButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  href?: string;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export function PremiumButton({ 
  children, 
  onClick, 
  href, 
  className = '',
  variant = 'primary'
}: PremiumButtonProps) {
  
  const baseClasses = "inline-block px-12 py-4 border-2 border-[#E5E4E2] relative overflow-hidden group cursor-pointer no-underline";
  
  const content = (
    <>
      {/* Platinum Shimmer Effect on Hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: 'linear-gradient(135deg, #e0e0e0 0%, #cfcfcf 25%, #9e9e9e 50%, #cfcfcf 75%, #e0e0e0 100%)',
          backgroundSize: '200% 200%',
          animation: 'shimmer 3s ease-in-out infinite',
        }}
      />
      
      <span 
        className="relative z-10 font-['Montserrat'] uppercase text-[#E5E4E2] group-hover:text-[#0A0A0B] transition-colors duration-500"
        style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textDecoration: 'none'
        }}
      >
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`${baseClasses} ${className}`}
        style={{ textDecoration: 'none' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
    >
      {content}
    </button>
  );
}