import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'motion/react';
import { Database, CheckCircle, AlertCircle, Loader, Crown } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

/*
═══════════════════════════════════════════════════════════════════
  SEED PAGE - Initialize Database with Sample Data
═══════════════════════════════════════════════════════════════════
  
  One-click database initialization for demo content:
  - Blog Posts
  - Properties
  - Testimonials
  - Global Recognition
  - Strategic Partnerships
  
═══════════════════════════════════════════════════════════════════
*/

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleSeedAll = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');
    setResults(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/seed-all`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setResults(data);
      } else {
        setError(data.error || 'Failed to seed data');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSeedBlog = async () => {
    setLoading(true);
    setSuccess(false);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/blog/seed`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setResults({ message: 'Blog posts seeded successfully' });
      } else {
        setError(data.error || 'Failed to seed blog posts');
      }
    } catch (err: any) {
      setError(err.message || 'Network error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Database Seed - Linart Realty LLC"
        description="Initialize database with sample data"
        keywords="database, seed, initialization"
      />

      <div className="min-h-screen bg-gradient-to-b from-[#0A0A0B] via-[#0F0F0F] to-[#0A0A0B] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 mb-6 border border-[#E5E4E2]/30 bg-gradient-to-br from-[#E5E4E2]/5 to-transparent"
            >
              <Crown size={40} strokeWidth={1.5} className="text-[#E5E4E2]" />
            </motion.div>
            <h1 className="font-['Cinzel'] text-[#F2EEE7] mb-4">Database Initialization</h1>
            <p className="font-['Montserrat'] text-[#E5E4E2]/70">
              Fill your database with luxury Florida real estate sample data
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-[#0F0F0F] border border-[#E5E4E2]/20 p-8">
            <div className="space-y-6">
              {/* Status Messages */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-3 p-4 bg-blue-500/10 border border-blue-500/30"
                >
                  <Loader size={20} className="text-blue-400 animate-spin" />
                  <span className="font-['Montserrat'] text-blue-400">Initializing database...</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/30"
                >
                  <CheckCircle size={20} className="text-green-400" />
                  <div>
                    <p className="font-['Montserrat'] text-green-400">Success!</p>
                    <p className="font-['Montserrat'] text-green-400/70 text-sm">
                      {results?.message || 'Database initialized successfully'}
                    </p>
                  </div>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30"
                >
                  <AlertCircle size={20} className="text-red-400" />
                  <div>
                    <p className="font-['Montserrat'] text-red-400">Error</p>
                    <p className="font-['Montserrat'] text-red-400/70 text-sm break-all">{error}</p>
                  </div>
                </motion.div>
              )}

              {/* Info Box */}
              <div className="p-6 bg-[#0A0A0B] border border-[#E5E4E2]/10">
                <h3 className="font-['Cinzel'] text-[#F2EEE7] mb-4">What will be created:</h3>
                <ul className="space-y-2 font-['Montserrat'] text-[#E5E4E2]/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#E5E4E2]/50" />
                    6 Luxury Blog Posts
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#E5E4E2]/50" />
                    Premium Florida Properties
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#E5E4E2]/50" />
                    Client Testimonials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#E5E4E2]/50" />
                    Global Recognition Awards
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#E5E4E2]/50" />
                    Strategic Partnerships
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 pt-4">
                <motion.button
                  onClick={handleSeedAll}
                  disabled={loading || success}
                  whileHover={{ scale: loading || success ? 1 : 1.02 }}
                  whileTap={{ scale: loading || success ? 1 : 0.98 }}
                  className="w-full group relative overflow-hidden px-8 py-4 border border-[#E5E4E2]/30 bg-[#E5E4E2] hover:bg-[#F2EEE7] disabled:bg-[#E5E4E2]/50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <Database size={20} strokeWidth={1.5} className="text-[#0A0A0B]" />
                    <span className="font-['Montserrat'] uppercase text-[#0A0A0B] tracking-wider">
                      {loading ? 'Initializing...' : success ? 'Completed' : 'Initialize All Data'}
                    </span>
                  </div>
                </motion.button>

                <motion.button
                  onClick={handleSeedBlog}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full px-8 py-3 border border-[#E5E4E2]/20 text-[#E5E4E2] hover:border-[#E5E4E2]/40 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                >
                  <span className="font-['Montserrat'] uppercase text-sm tracking-wider">
                    Initialize Blog Only
                  </span>
                </motion.button>

                <motion.button
                  onClick={() => (window as any).navigateTo?.('/')}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full px-8 py-3 border border-[#E5E4E2]/20 text-[#E5E4E2]/70 hover:text-[#E5E4E2] hover:border-[#E5E4E2]/40 transition-all duration-300"
                >
                  <span className="font-['Montserrat'] uppercase text-sm tracking-wider">
                    Back to Home
                  </span>
                </motion.button>
              </div>

              {/* Warning */}
              <div className="pt-4 border-t border-[#E5E4E2]/10">
                <p className="font-['Montserrat'] text-[#E5E4E2]/50 text-xs text-center">
                  Note: This will create sample data. Run only once to avoid duplicates.
                </p>
              </div>

              {/* Debug Info */}
              <details className="pt-4">
                <summary className="cursor-pointer font-['Montserrat'] text-[#E5E4E2]/50 text-xs hover:text-[#E5E4E2]/70 transition-colors">
                  🔧 Debug Information
                </summary>
                <div className="mt-3 p-3 bg-[#0A0A0B] border border-[#E5E4E2]/10 font-mono text-xs text-[#E5E4E2]/50 break-all space-y-1">
                  <div>Project ID: <span className="text-[#E5E4E2]/70">{projectId}</span></div>
                  <div>Endpoint: <span className="text-[#E5E4E2]/70">https://{projectId}.supabase.co/functions/v1/server/seed-all</span></div>
                </div>
              </details>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}