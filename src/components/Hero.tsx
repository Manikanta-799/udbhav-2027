import { motion } from 'framer-motion';
import { ArrowRight, UserCheck, Calendar, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleBackground from './ParticleBackground';
import ScrollIndicator from './ScrollIndicator';
import { festConfig } from '@/data/config';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-24 pb-16 px-4" aria-label="Hero">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-[#060714] pointer-events-none" />
      
      {/* Radial Neon Spotlights */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-cyan-500/20 via-purple-600/10 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] bg-orange-500/15 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-pink-500/15 blur-[130px] rounded-full pointer-events-none" />
      
      {/* Dynamic Particle Canvas */}
      <ParticleBackground />

      {/* Visual Silhouettes & Celebration Backdrop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30 sm:opacity-40 select-none">
        {/* VJIT Campus Silhouette at the base */}
        <div className="absolute bottom-0 left-0 right-0 h-44 flex items-end justify-center">
          <svg viewBox="0 0 1200 200" className="w-full h-full text-indigo-950/40 fill-current preserve-3d" preserveAspectRatio="none">
            {/* Campus Building Outline */}
            <rect x="420" y="80" width="360" height="120" rx="4" />
            <rect x="520" y="50" width="160" height="150" rx="4" />
            <rect x="560" y="20" width="80" height="30" rx="2" fill="#00f0ff" opacity="0.3" />
            {/* Windows */}
            <circle cx="600" cy="90" r="16" fill="#00f0ff" opacity="0.6" />
            <rect x="440" y="100" width="20" height="25" fill="#ff00ff" opacity="0.5" />
            <rect x="480" y="100" width="20" height="25" fill="#00f0ff" opacity="0.5" />
            <rect x="700" y="100" width="20" height="25" fill="#00f0ff" opacity="0.5" />
            <rect x="740" y="100" width="20" height="25" fill="#ff00ff" opacity="0.5" />
          </svg>
        </div>

        {/* Laser Beams */}
        <div className="absolute top-0 left-1/4 w-[2px] h-[70vh] bg-gradient-to-b from-orange-500/50 via-orange-500/10 to-transparent rotate-[-25deg] blur-[1px]" />
        <div className="absolute top-0 right-1/4 w-[2px] h-[70vh] bg-gradient-to-b from-pink-500/50 via-pink-500/10 to-transparent rotate-[25deg] blur-[1px]" />
        <div className="absolute top-0 left-1/2 w-[3px] h-[80vh] bg-gradient-to-b from-cyan-400/60 via-cyan-400/10 to-transparent rotate-[10deg] blur-[1px]" />
      </div>

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center px-4">
        {/* Institution Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-cyan-400/30 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(0,240,255,0.15)]"
        >
          <Sparkles size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-xs sm:text-sm font-semibold tracking-wide text-cyan-200">
            {festConfig.institution}
          </span>
        </motion.div>

        {/* Giant Futuristic Fest Title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative my-2 select-none"
        >
          {/* Subtle Ambient Back-Glow */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-none">
            <span
              className="block font-black text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #00f0ff 40%, #ff00ff 85%, #ff8c00 100%)',
                filter: 'drop-shadow(0 0 35px rgba(0, 240, 255, 0.45)) drop-shadow(0 0 70px rgba(255, 0, 128, 0.3))',
                fontFamily: "'Montserrat', 'Impact', 'Segoe UI', system-ui, sans-serif",
                letterSpacing: '-0.02em',
              }}
            >
              UDBHAV
            </span>
            <span
              className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-widest mt-1 text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #ff007f 0%, #a855f7 50%, #00f0ff 100%)',
                filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.5))',
              }}
            >
              2027
            </span>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light tracking-wide mt-4 mb-2 max-w-2xl mx-auto"
        >
          {festConfig.tagline}
        </motion.p>

        {/* Sub-intro text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto mb-6 leading-relaxed"
        >
          Vidya Jyothi Institute of Technology presents the premier inter-college festival of South India. 
          26 electrifying events across Sports, Cultural, and Technical arenas.
        </motion.p>

        {/* Date & Venue Badges */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 font-medium">
            <Calendar size={15} className="text-cyan-400" />
            <span>{festConfig.dates}</span>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 backdrop-blur-md text-xs sm:text-sm text-gray-300 font-medium">
            <MapPin size={15} className="text-pink-400" />
            <span>{festConfig.venue}</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#arenas"
            className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-sm tracking-wide transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(0,240,255,0.35)] hover:shadow-[0_0_40px_rgba(0,240,255,0.6)]"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 50%, #8b5cf6 100%)',
            }}
          >
            <span>Explore Events</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/20 text-white font-bold text-sm tracking-wide transition-all duration-300 backdrop-blur-md cursor-pointer hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(0,240,255,0.2)]"
          >
            <UserCheck size={16} className="text-cyan-400" />
            <span>Register Now</span>
          </Link>
        </motion.div>
      </div>

      {/* Floating Scroll Indicator */}
      <ScrollIndicator />
    </section>
  );
}
