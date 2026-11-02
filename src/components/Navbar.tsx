import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import VJITLogo from './VJITLogo';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/sports', label: 'Sports' },
  { path: '/cultural', label: 'Cultural' },
  { path: '/technical', label: 'Technical' },
  { path: '/schedule', label: 'Schedule' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-midnight/95 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Brand: VJIT Logo + Fest Title */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg" aria-label="Udbhav 2027 Homepage">
              <VJITLogo showText={false} className="shrink-0" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl sm:text-2xl font-black tracking-wider text-white font-mono group-hover:text-cyan-400 transition-colors">
                    UDBHAV<span className="text-cyan-400">’27</span>
                  </span>
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-400/30">
                    VJIT FEST
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 hidden sm:block leading-tight">
                  Vidya Jyothi Institute of Technology
                </p>
              </div>
            </Link>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-full transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 bg-white/10 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-cyan-400/50 pointer-events-none"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action: VJIT Text Badge & Register Now Button */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center border-r border-white/10 pr-4 mr-1">
              <VJITLogo showText={true} />
            </div>

            <Link
              to="/register"
              className="relative group inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-white overflow-hidden transition-all duration-300 shadow-[0_0_20px_rgba(255,0,128,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #ff007f 0%, #7928ca 50%, #00f0ff 100%)',
              }}
            >
              <Sparkles size={13} className="text-white animate-pulse" />
              <span>Register Now</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-midnight/98 backdrop-blur-2xl border-b border-white/15 overflow-hidden"
          >
            <div className="px-5 py-6 space-y-2">
              <div className="pb-3 border-b border-white/10 mb-2">
                <VJITLogo showText={true} />
              </div>

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              <div className="pt-4">
                <Link
                  to="/register"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-wider text-white shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff007f 0%, #7928ca 50%, #00f0ff 100%)',
                  }}
                >
                  <Sparkles size={16} />
                  <span>Register Now for Udbhav 2027</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
