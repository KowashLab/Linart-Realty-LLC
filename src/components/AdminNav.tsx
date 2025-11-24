import { motion } from 'motion/react';
import { FileText, Home, MessageSquare, Award, Handshake, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function AdminNav() {
  const { user, signOut } = useAuth();
  const currentPath = window.location.pathname;

  const navItems = [
    { href: '/admin/blog', icon: FileText, label: 'Blog Posts' },
    { href: '/admin/properties', icon: Home, label: 'Properties' },
    { href: '/admin/testimonials', icon: MessageSquare, label: 'Testimonials' },
    { href: '/admin/recognition', icon: Award, label: 'Recognition' },
    { href: '/admin/partnerships', icon: Handshake, label: 'Partnerships' },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/login';
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-neutral-950/95 via-neutral-900/95 to-neutral-950/95 backdrop-blur-lg border-b border-neutral-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-neutral-100 to-neutral-300 rounded flex items-center justify-center">
              <span className="font-['Cinzel'] text-neutral-900">L</span>
            </div>
            <div>
              <div className="font-['Cinzel'] text-neutral-100">Admin Panel</div>
              <div className="text-xs text-neutral-500">Linart Realty CMS</div>
            </div>
          </a>

          {/* Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.href;
              
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-neutral-100 to-neutral-300 text-neutral-900'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user && (
              <>
                <div className="hidden md:flex items-center gap-2 text-neutral-400 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden md:inline">Sign Out</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4 flex gap-2 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-neutral-100 to-neutral-300 text-neutral-900'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
