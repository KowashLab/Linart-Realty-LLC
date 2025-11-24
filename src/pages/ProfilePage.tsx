import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Heart, LogOut, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PremiumButton } from '../components/PremiumButton';

/*
═══════════════════════════════════════════════════════════════════
  PROFILE PAGE - User Dashboard & Favorites
═══════════════════════════════════════════════════════════════════
*/

export function ProfilePage() {
  const { user, signOut, updateProfile, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to auth page if not logged in
      if ((window as any).navigateTo) {
        (window as any).navigateTo('/auth');
      }
    }
  }, [user, authLoading]);

  useEffect(() => {
    if (user) {
      setNewName(user.name || '');
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    if (!newName.trim()) {
      setError('Name cannot be empty');
      return;
    }

    setError('');
    setSuccess('');
    setUpdating(true);

    try {
      await updateProfile(newName);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      if ((window as any).navigateTo) {
        (window as any).navigateTo('/');
      }
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0B] pt-32 flex items-center justify-center">
        <div className="text-[#E5E4E2] font-['Montserrat']">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40 pb-20">
      
      <SEO 
        title="My Profile - Account Dashboard | Linart Realty"
        description="Manage your Linart Realty account: saved properties, preferences, and personalized real estate services. Access your luxury property portfolio."
        canonical="https://www.linartrealty.com/profile"
        ogType="website"
        keywords="user profile, account dashboard, saved properties, real estate account, Linart Realty profile"
      />

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
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 
            className="font-['Cinzel'] text-[#F2EEE7] mb-4"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 600,
              letterSpacing: '0.02em'
            }}
          >
            My Profile
          </h1>
          <p 
            className="font-['Montserrat'] text-[#E5E4E2]/70"
            style={{
              fontSize: '1rem',
              fontWeight: 400,
              letterSpacing: '0.01em',
              lineHeight: 1.7
            }}
          >
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 sticky top-40">
              
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <div className="w-32 h-32 border-2 border-[#E5E4E2]/30 bg-[#0A0A0B] flex items-center justify-center">
                  <User className="w-16 h-16 text-[#A8A9AD]" strokeWidth={1.5} />
                </div>
              </div>

              {/* User Info */}
              <div className="text-center mb-8">
                {isEditing ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full px-4 py-2 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] focus:border-[#A8A9AD] focus:outline-none"
                      style={{
                        fontSize: '1rem',
                        fontFamily: 'Montserrat'
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateProfile}
                        disabled={updating}
                        className="flex-1 py-2 border border-[#E5E4E2] text-[#E5E4E2] hover:bg-[#E5E4E2] hover:text-[#0A0A0B] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <Save className="w-4 h-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEditing(false);
                          setNewName(user.name || '');
                          setError('');
                        }}
                        className="flex-1 py-2 border border-[#E5E4E2]/30 text-[#E5E4E2]/70 hover:border-[#E5E4E2] hover:text-[#E5E4E2] transition-all duration-300 flex items-center justify-center gap-2"
                        style={{ fontSize: '0.75rem', fontWeight: 600 }}
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h2 
                      className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                      style={{
                        fontSize: '1.8rem',
                        fontWeight: 600,
                        letterSpacing: '0.02em'
                      }}
                    >
                      {user.name}
                    </h2>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="inline-flex items-center gap-2 text-[#A8A9AD] hover:text-[#E5E4E2] transition-colors font-['Montserrat']"
                      style={{ fontSize: '0.85rem', fontWeight: 500 }}
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Name
                    </button>
                  </>
                )}
              </div>

              {/* Messages */}
              {error && (
                <div 
                  className="mb-4 p-3 border border-red-500/30 bg-red-500/10 text-center"
                  style={{
                    color: '#ff6b6b',
                    fontSize: '0.85rem'
                  }}
                >
                  {error}
                </div>
              )}

              {success && (
                <div 
                  className="mb-4 p-3 border border-green-500/30 bg-green-500/10 text-center"
                  style={{
                    color: '#51cf66',
                    fontSize: '0.85rem'
                  }}
                >
                  {success}
                </div>
              )}

              {/* Details */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 pb-4 border-b border-[#E5E4E2]/10">
                  <Mail className="w-5 h-5 text-[#A8A9AD]" strokeWidth={1.5} />
                  <div>
                    <div 
                      className="font-['Montserrat'] text-[#E5E4E2]/50 uppercase tracking-wider"
                      style={{ fontSize: '0.7rem', fontWeight: 600 }}
                    >
                      Email
                    </div>
                    <div 
                      className="font-['Montserrat'] text-[#E5E4E2]"
                      style={{ fontSize: '0.9rem', fontWeight: 400 }}
                    >
                      {user.email}
                    </div>
                  </div>
                </div>

                {user.created_at && (
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#A8A9AD]" strokeWidth={1.5} />
                    <div>
                      <div 
                        className="font-['Montserrat'] text-[#E5E4E2]/50 uppercase tracking-wider"
                        style={{ fontSize: '0.7rem', fontWeight: 600 }}
                      >
                        Member Since
                      </div>
                      <div 
                        className="font-['Montserrat'] text-[#E5E4E2]"
                        style={{ fontSize: '0.9rem', fontWeight: 400 }}
                      >
                        {new Date(user.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="w-full py-3 border-2 border-[#E5E4E2]/30 text-[#E5E4E2] font-['Montserrat'] uppercase tracking-wider hover:border-red-500 hover:text-red-500 hover:bg-red-500/5 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ fontSize: '0.875rem', fontWeight: 600 }}
              >
                <LogOut className="w-5 h-5" strokeWidth={1.5} />
                Sign Out
              </button>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            
            {/* Favorites Section */}
            <div className="p-8 bg-[#0F0F0F] border border-[#E5E4E2]/20 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-[#A8A9AD]" strokeWidth={1.5} />
                <h2 
                  className="font-['Cinzel'] text-[#F2EEE7]"
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Saved Properties
                </h2>
              </div>

              <div 
                className="text-center py-16 border border-[#E5E4E2]/10"
              >
                <Heart className="w-12 h-12 text-[#A8A9AD]/30 mx-auto mb-4" strokeWidth={1.5} />
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/50 mb-6"
                  style={{
                    fontSize: '1rem',
                    fontWeight: 400
                  }}
                >
                  You haven't saved any properties yet
                </p>
                <PremiumButton 
                  href="/properties"
                  onClick={(e) => {
                    e.preventDefault();
                    if ((window as any).navigateTo) {
                      (window as any).navigateTo('/properties');
                    }
                  }}
                >
                  Browse Properties
                </PremiumButton>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  if ((window as any).navigateTo) {
                    (window as any).navigateTo('/contact');
                  }
                }}
              >
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Schedule Viewing
                </h3>
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/70"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  Book a private property tour
                </p>
              </div>

              <div 
                className="p-6 bg-[#0F0F0F] border border-[#E5E4E2]/20 hover:border-[#A8A9AD]/60 transition-all duration-300 cursor-pointer"
                onClick={() => {
                  if ((window as any).navigateTo) {
                    (window as any).navigateTo('/services');
                  }
                }}
              >
                <h3 
                  className="font-['Cinzel'] text-[#F2EEE7] mb-2"
                  style={{
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  Our Services
                </h3>
                <p 
                  className="font-['Montserrat'] text-[#E5E4E2]/70"
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 400,
                    lineHeight: 1.6
                  }}
                >
                  Explore our premium offerings
                </p>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}