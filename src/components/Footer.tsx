import { Link } from 'react-router-dom';
import { Mail, MapPin, Globe, Sparkles } from 'lucide-react';
import { festConfig } from '@/data/config';
import VJITLogo from './VJITLogo';

export default function Footer() {
  return (
    <footer className="relative bg-[#05060f] border-t border-white/10" role="contentinfo">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Brand & VJIT Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <VJITLogo showText={false} />
              <div>
                <h2 className="text-2xl font-black gradient-text tracking-wider font-mono">
                  {festConfig.name}
                </h2>
                <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest block">
                  Official College Fest Website
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 max-w-sm leading-relaxed">
              {festConfig.tagline} The premier inter-college festival of South India hosted by{' '}
              <strong className="text-white">{festConfig.institution}</strong>.
            </p>

            <div className="pt-2 text-xs text-gray-400 space-y-1.5 font-mono">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-cyan-400 shrink-0" />
                <span>{festConfig.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-pink-400 shrink-0" />
                <span>{festConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Arenas Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Event Arenas
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/sports" className="text-gray-400 hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="text-orange-400">🏆</span>
                  <span>Sports Arena (9 Fixtures)</span>
                </Link>
              </li>
              <li>
                <Link to="/cultural" className="text-gray-400 hover:text-pink-400 transition-colors flex items-center gap-1.5">
                  <span className="text-pink-400">🎭</span>
                  <span>Cultural & Stage (13 Events)</span>
                </Link>
              </li>
              <li>
                <Link to="/technical" className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="text-cyan-400">⚡</span>
                  <span>Technical & Hackathons (4 Tracks)</span>
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1.5">
                  <span>📅</span>
                  <span>Day-wise Schedule & Timeline</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/register" className="text-cyan-300 hover:underline font-semibold">
                  Register Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About VJIT Campus
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Help Desk & FAQ
                </Link>
              </li>
              <li>
                <a
                  href={festConfig.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                >
                  <Globe size={12} />
                  <span>vjit.ac.in</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Connect */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider text-cyan-400">
              Connect
            </h3>
            <p className="text-xs text-gray-400">
              Follow Udbhav for live fixtures, stage announcements, and results.
            </p>

            <div className="flex items-center gap-2 pt-1">
              {/* Instagram SVG */}
              <a
                href={festConfig.socialMedia.instagram}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-pink-500/20 text-gray-400 hover:text-pink-400 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Instagram"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Twitter/X SVG */}
              <a
                href={festConfig.socialMedia.twitter}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-gray-400 hover:text-cyan-400 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="Twitter X"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* YouTube SVG */}
              <a
                href={festConfig.socialMedia.youtube}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 border border-white/10 flex items-center justify-center transition-colors"
                aria-label="YouTube"
                target="_blank"
                rel="noreferrer"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2027 UDBHAV • Vidya Jyothi Institute of Technology (Autonomous). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400">Aziz Nagar, Hyderabad, Telangana</span>
            <span className="text-cyan-400">•</span>
            <span className="text-cyan-400 font-mono">UDBHAV 2027 OFFICIAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
