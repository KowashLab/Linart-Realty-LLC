import React, { useState } from 'react';
import { SEO } from '../components/SEO';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Chrome, LogIn, UserPlus, Crown, Apple, Facebook } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

/*
═══════════════════════════════════════════════════════════════════
  AUTH PAGE - Premium Login & Registration
═══════════════════════════════════════════════════════════════════
*/

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [googleAuthMessage, setGoogleAuthMessage] = useState('');
  const [socialAuthMessage, setSocialAuthMessage] = useState('');

  const { signIn, signUp, signInWithGoogle, signInWithApple, signInWithFacebook } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        // Redirect to home
        if ((window as any).navigateTo) {
          (window as any).navigateTo('/');
        }
      } else {
        if (!name.trim()) {
          setError('Please enter your name');
          setLoading(false);
          return;
        }
        await signUp(email, password, name);
        // Redirect to home after successful signup
        if ((window as any).navigateTo) {
          (window as any).navigateTo('/');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setGoogleAuthMessage('');
    setLoading(true);

    try {
      await signInWithGoogle();
      // Note: After Google OAuth, user will be redirected back
      setGoogleAuthMessage('⚠️ Important: To enable Google Sign-In, please complete the setup at https://supabase.com/docs/guides/auth/social-login/auth-google');
    } catch (err: any) {
      if (err.message.includes('provider is not enabled')) {
        setGoogleAuthMessage('⚠️ Google Sign-In is not enabled yet. Please complete setup at: https://supabase.com/docs/guides/auth/social-login/auth-google');
      } else {
        setError(err.message || 'Google sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setError('');
    setSocialAuthMessage('');
    setLoading(true);

    try {
      await signInWithApple();
      // Note: After Apple OAuth, user will be redirected back
      setSocialAuthMessage('⚠️ Important: To enable Apple Sign-In, please complete the setup at https://supabase.com/docs/guides/auth/social-login/auth-apple');
    } catch (err: any) {
      if (err.message.includes('provider is not enabled')) {
        setSocialAuthMessage('⚠️ Apple Sign-In is not enabled yet. Please complete setup at: https://supabase.com/docs/guides/auth/social-login/auth-apple');
      } else {
        setError(err.message || 'Apple sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignIn = async () => {
    setError('');
    setSocialAuthMessage('');
    setLoading(true);

    try {
      await signInWithFacebook();
      // Note: After Facebook OAuth, user will be redirected back
      setSocialAuthMessage('⚠️ Important: To enable Facebook Sign-In, please complete the setup at https://supabase.com/docs/guides/auth/social-login/auth-facebook');
    } catch (err: any) {
      if (err.message.includes('provider is not enabled')) {
        setSocialAuthMessage('⚠️ Facebook Sign-In is not enabled yet. Please complete setup at: https://supabase.com/docs/guides/auth/social-login/auth-facebook');
      } else {
        setError(err.message || 'Facebook sign-in failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] pt-32 lg:pt-40 pb-20">
      
      <SEO 
        title={isLogin ? 'Sign In - Access Your Linart Realty Account' : 'Create Account - Join Linart Realty'}
        description={isLogin 
          ? 'Sign in to your Linart Realty account to access exclusive luxury property portfolios, saved searches, and personalized real estate services.'
          : 'Create your Linart Realty account for access to exclusive Florida luxury properties, personalized services, and premium real estate opportunities.'}
        canonical="https://www.linartrealty.com/auth"
        ogType="website"
        keywords="Linart Realty login, real estate account, luxury property access, Florida real estate signin, premium property portfolio"
      />

      {/* Decorative Background */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 60px, rgba(168, 169, 173, 0.15) 60px, rgba(168, 169, 173, 0.15) 62px)'
        }}
      />

      <div className="container-custom px-6 lg:px-12 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          
          {/* Logo & Title */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center gap-3 mb-6">
              <Crown className="w-10 h-10 text-[#A8A9AD]" strokeWidth={1.5} />
            </div>
            
            <h1 
              className="font-['Cinzel'] text-[#F2EEE7] mb-3"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: 600,
                letterSpacing: '0.02em'
              }}
            >
              {isLogin ? 'Welcome Back' : 'Join Linart Realty'}
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
              {isLogin 
                ? 'Access your exclusive real estate portfolio' 
                : 'Create your account for personalized services'}
            </p>
          </div>

          {/* Auth Form */}
          <div 
            className="p-8 lg:p-10 bg-[#0F0F0F] border border-[#E5E4E2]/20 relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <div 
              className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(229, 228, 226, 0.05) 0%, rgba(168, 169, 173, 0.1) 50%, rgba(229, 228, 226, 0.05) 100%)'
              }}
            />

            <div className="relative z-10">
              {/* Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                    setGoogleAuthMessage('');
                    setSocialAuthMessage('');
                  }}
                  className={`flex-1 py-3 font-['Montserrat'] uppercase tracking-wider transition-all duration-300 border-2 ${
                    isLogin 
                      ? 'border-[#E5E4E2] text-[#E5E4E2] bg-[#E5E4E2]/5' 
                      : 'border-[#E5E4E2]/20 text-[#E5E4E2]/50 hover:border-[#E5E4E2]/40'
                  }`}
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  <LogIn className="w-4 h-4 inline-block mr-2" />
                  Login
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                    setGoogleAuthMessage('');
                    setSocialAuthMessage('');
                  }}
                  className={`flex-1 py-3 font-['Montserrat'] uppercase tracking-wider transition-all duration-300 border-2 ${
                    !isLogin 
                      ? 'border-[#E5E4E2] text-[#E5E4E2] bg-[#E5E4E2]/5' 
                      : 'border-[#E5E4E2]/20 text-[#E5E4E2]/50 hover:border-[#E5E4E2]/40'
                  }`}
                  style={{ fontSize: '0.75rem', fontWeight: 600 }}
                >
                  <UserPlus className="w-4 h-4 inline-block mr-2" />
                  Register
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div 
                  className="mb-6 p-4 border border-red-500/30 bg-red-500/10"
                  style={{
                    color: '#ff6b6b',
                    fontSize: '0.9rem'
                  }}
                >
                  {error}
                </div>
              )}

              {/* Google Auth Message */}
              {googleAuthMessage && (
                <div 
                  className="mb-6 p-4 border border-[#E5E4E2]/30 bg-[#E5E4E2]/10"
                  style={{
                    color: '#E5E4E2',
                    fontSize: '0.85rem',
                    lineHeight: 1.6
                  }}
                >
                  {googleAuthMessage}
                </div>
              )}

              {/* Social Auth Message */}
              {socialAuthMessage && (
                <div 
                  className="mb-6 p-4 border border-[#E5E4E2]/30 bg-[#E5E4E2]/10"
                  style={{
                    color: '#E5E4E2',
                    fontSize: '0.85rem',
                    lineHeight: 1.6
                  }}
                >
                  {socialAuthMessage}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {!isLogin && (
                  <div>
                    <label
                      htmlFor="name"
                      className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-3"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A9AD]" strokeWidth={1.5} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                        placeholder="John Doe"
                        className="w-full pl-12 pr-4 py-4 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-all duration-300"
                        style={{
                          fontSize: '0.95rem',
                          letterSpacing: '0.01em'
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-3"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A9AD]" strokeWidth={1.5} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-4 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-all duration-300"
                      style={{
                        fontSize: '0.95rem',
                        letterSpacing: '0.01em'
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block font-['Montserrat'] text-[#E5E4E2]/70 text-sm uppercase tracking-wider mb-3"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A9AD]" strokeWidth={1.5} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      required
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-4 bg-[#0A0A0B] border border-[#E5E4E2]/20 text-[#E5E4E2] font-['Montserrat'] focus:border-[#A8A9AD]/60 focus:outline-none transition-all duration-300"
                      style={{
                        fontSize: '0.95rem',
                        letterSpacing: '0.01em'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 border-2 border-[#E5E4E2] text-[#E5E4E2] font-['Montserrat'] uppercase tracking-wider hover:bg-[#E5E4E2] hover:text-[#0A0A0B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E5E4E2]/20"></div>
                </div>
                <div className="relative flex justify-center">
                  <span 
                    className="px-4 bg-[#0F0F0F] font-['Montserrat'] text-[#E5E4E2]/50 uppercase tracking-wider"
                    style={{ fontSize: '0.75rem', fontWeight: 600 }}
                  >
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full py-4 border-2 border-[#E5E4E2]/30 text-[#E5E4E2] font-['Montserrat'] uppercase tracking-wider hover:border-[#E5E4E2] hover:bg-[#E5E4E2]/5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  <Chrome className="w-5 h-5" strokeWidth={1.5} />
                  Google
                </button>

                {/* Apple Sign In */}
                <button
                  type="button"
                  onClick={handleAppleSignIn}
                  disabled={loading}
                  className="w-full py-4 border-2 border-[#E5E4E2]/30 text-[#E5E4E2] font-['Montserrat'] uppercase tracking-wider hover:border-[#E5E4E2] hover:bg-[#E5E4E2]/5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  <Apple className="w-5 h-5" strokeWidth={1.5} />
                  Apple
                </button>

                {/* Facebook Sign In */}
                <button
                  type="button"
                  onClick={handleFacebookSignIn}
                  disabled={loading}
                  className="w-full py-4 border-2 border-[#E5E4E2]/30 text-[#E5E4E2] font-['Montserrat'] uppercase tracking-wider hover:border-[#E5E4E2] hover:bg-[#E5E4E2]/5 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontSize: '0.875rem', fontWeight: 600 }}
                >
                  <Facebook className="w-5 h-5" strokeWidth={1.5} />
                  Facebook
                </button>
              </div>

              {/* Additional Info */}
              <p 
                className="mt-6 text-center font-['Montserrat'] text-[#E5E4E2]/50"
                style={{ fontSize: '0.8rem', lineHeight: 1.6 }}
              >
                By continuing, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
}