import React from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { TrendingUp, BarChart3, PieChart, DollarSign, CheckCircle, Shield, Target, LineChart } from 'lucide-react';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  INVESTMENT ADVISORY PAGE - Full Service Page
═══════════════════════════════════════════════════════════════════
*/

export function InvestmentAdvisoryPage() {
  const services = [
    {
      title: 'Market Analysis',
      description: 'Comprehensive analysis of Florida real estate markets utilizing institutional-grade research, data analytics, and proprietary market intelligence.'
    },
    {
      title: 'Investment Strategy',
      description: 'Customized investment strategies aligned with your financial objectives, risk tolerance, and timeline for optimal portfolio performance.'
    },
    {
      title: 'Portfolio Optimization',
      description: 'Strategic portfolio analysis and rebalancing to maximize returns, minimize risk, and enhance long-term wealth accumulation.'
    },
    {
      title: 'Risk Assessment',
      description: 'Thorough evaluation of investment risks including market volatility, property-specific factors, and macroeconomic conditions.'
    },
    {
      title: 'Tax Strategy',
      description: 'Tax-efficient investment structures and strategies leveraging opportunities for depreciation, capital gains optimization, and deductions.'
    },
    {
      title: '1031 Exchanges',
      description: 'Expert guidance on tax-deferred exchanges enabling strategic portfolio transitions while deferring capital gains taxation.'
    }
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Proven Track Record',
      description: 'Consistently delivering superior returns through disciplined analysis, strategic positioning, and active portfolio management.'
    },
    {
      icon: BarChart3,
      title: 'Institutional Research',
      description: 'Access to institutional-grade market research, analytics, and proprietary data unavailable to retail investors.'
    },
    {
      icon: Shield,
      title: 'Tax Efficiency',
      description: 'Sophisticated tax planning strategies minimizing tax liability while maximizing after-tax returns on investment.'
    },
    {
      icon: Target,
      title: 'Ongoing Support',
      description: 'Continuous portfolio monitoring, market updates, and strategic guidance ensuring optimal performance over time.'
    }
  ];

  const process = [
    {
      step: '01',
      title: 'Financial Assessment',
      description: 'Comprehensive review of your current financial position, investment objectives, liquidity needs, and risk parameters.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Creation of customized investment strategy incorporating market analysis, property selection criteria, and allocation targets.'
    },
    {
      step: '03',
      title: 'Market Research',
      description: 'In-depth market research identifying optimal investment opportunities aligned with your strategic objectives.'
    },
    {
      step: '04',
      title: 'Investment Execution',
      description: 'Strategic acquisition of properties meeting investment criteria with expert negotiation ensuring optimal terms.'
    },
    {
      step: '05',
      title: 'Portfolio Management',
      description: 'Ongoing portfolio monitoring, performance analysis, and strategic adjustments maximizing long-term returns.'
    }
  ];

  const stats = [
    { value: '$1.8B+', label: 'Investment Volume' },
    { value: '18.5%', label: 'Average Annual ROI' },
    { value: '500+', label: 'Successful Transactions' },
    { value: '25+', label: 'Years Experience' }
  ];

  const investmentTypes = [
    'Commercial Office',
    'Multifamily Residential',
    'Retail Centers',
    'Industrial Properties',
    'Mixed-Use Developments',
    'Luxury Estates',
    'Land Development',
    'Value-Add Opportunities'
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40">
      
      <SEO 
        title="Real Estate Investment Advisory Florida - Strategic Portfolio Management | Linart Realty"
        description="Expert investment advisory services: market analysis, portfolio optimization, tax strategy, 1031 exchanges. $1.8B+ investment volume, 18.5% average annual ROI. Institutional-grade research."
        canonical="https://www.linartrealty.com/investment-advisory"
        ogType="website"
        keywords="real estate investment advisory Florida, property portfolio management, market analysis Florida, tax-efficient real estate investment, 1031 exchange services, Florida property investment strategy"
      />

      {/* Decorative Background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-[#A8A9AD]" strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] uppercase text-[#A8A9AD] tracking-[0.3em]"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  Premium Service
                </span>
              </div>
              
              <h1 
                className="font-['Cinzel'] text-[#F2EEE7] mb-6"
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  lineHeight: 1.1
                }}
              >
                Investment Advisory
              </h1>

              <p 
                className="font-['Montserrat'] text-[#E5E4E2]/70 mb-8"
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                  lineHeight: 1.7
                }}
              >
                Data-driven investment strategies and comprehensive market analysis maximizing returns in Florida's 
                dynamic real estate market through institutional-grade research and strategic positioning.
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
                Schedule Strategy Session
              </PremiumButton>
            </div>

            {/* Hero Image */}
            <div className="relative aspect-[4/3] overflow-hidden group">
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  border: '1px solid',
                  borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                }}
              />
              <img 
                src="/images/investment-skyline.jpg"
                alt="Investment Advisory"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20"
              >
                <div 
                  className="font-['Cinzel'] text-[#E5E4E2] mb-2"
                  style={{
                    fontSize: 'clamp(2rem, 3vw, 3rem)',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {stat.value}
                </div>
                <div 
                  className="font-['Montserrat'] text-[#E5E4E2]/60 uppercase tracking-wider"
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Investment Types */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Investment Opportunities
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-3xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              Diverse property types and investment strategies tailored to your objectives
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {investmentTypes.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20 text-center group hover:border-[#A8A9AD]/60 transition-all duration-500"
              >
                <LineChart className="w-6 h-6 text-[#A8A9AD] mx-auto mb-3" strokeWidth={1.5} />
                <span 
                  className="font-['Montserrat'] text-[#E5E4E2] group-hover:text-[#A8A9AD] transition-colors duration-500"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    letterSpacing: '0.01em'
                  }}
                >
                  {type}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#E5E4E2] to-[#A8A9AD] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <CheckCircle className="w-8 h-8 text-[#A8A9AD] mb-4" strokeWidth={1.5} />
                
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  {service.title}
                </h3>

                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/70"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    letterSpacing: '0.01em',
                    lineHeight: 1.6
                  }}
                >
                  {service.description}
                </p>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(168,169,173,0.1)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] text-center mb-16"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Competitive Advantages
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex gap-6 p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20"
                >
                  <div className="flex-shrink-0">
                    <div className="p-4 border border-[#E5E4E2]/20 bg-[#0A0A0B]">
                      <Icon className="w-8 h-8 text-[#E5E4E2]" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-3"
                      style={{
                        fontSize: '1.4rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {benefit.title}
                    </h3>
                    <p 
                      className="font-['Montserrat'] text-[#E5E4E2]/70"
                      style={{
                        fontSize: '1rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.7
                      }}
                    >
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 
              className="font-['Cinzel'] text-[#F2EEE7] mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              Strategic Approach
            </h2>
            <p 
              className="font-['Montserrat'] text-[#E5E4E2]/70 max-w-3xl mx-auto"
              style={{
                fontSize: '1rem',
                fontWeight: 400,
                letterSpacing: '0.01em',
                lineHeight: 1.7
              }}
            >
              Disciplined methodology delivering consistent, superior investment results
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-[3/4] overflow-hidden group order-2 lg:order-1">
              <div 
                className="absolute inset-0 opacity-40 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  border: '1px solid',
                  borderImage: 'linear-gradient(135deg, #E5E4E2 0%, #A8A9AD 50%, #E5E4E2 100%) 1'
                }}
              />
              <img 
                src="/images/investment-building.jpg"
                alt="Investment Meeting"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
            </div>

            <div className="space-y-8 order-1 lg:order-2">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  className="flex gap-6"
                >
                  <div 
                    className="font-['Cinzel'] text-[#A8A9AD] flex-shrink-0"
                    style={{
                      fontSize: '3rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      lineHeight: 1
                    }}
                  >
                    {item.step}
                  </div>
                  <div>
                    <h3 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {item.title}
                    </h3>
                    <p 
                      className="font-['Montserrat'] text-[#E5E4E2]/70"
                      style={{
                        fontSize: '0.95rem',
                        fontWeight: 400,
                        letterSpacing: '0.01em',
                        lineHeight: 1.7
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center py-20 mb-20 border-t border-[#E5E4E2]/10"
        >
          <h2 
            className="font-['Cinzel'] text-[#F2EEE7] mb-6"
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            Build Your Real Estate Portfolio
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
            Schedule a confidential strategy session to discuss your investment objectives and 
            discover opportunities for superior returns in Florida's premier markets.
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
            Schedule Strategy Session
          </PremiumButton>
        </motion.div>

      </div>
    </div>
  );
}