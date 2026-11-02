import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Sparkles, Flame, Shield, Calendar, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import AnnouncementSection from '@/components/AnnouncementSection';
import FAQAccordion from '@/components/FAQAccordion';
import { faqs, sponsors } from '@/data/announcements';
import { festConfig } from '@/data/config';
import { allEvents } from '@/data/events';

export default function Home() {
  const highlights = [
    { icon: Trophy, label: '26 Major Events', desc: 'Sports, Cultural & Technical arenas for all colleges' },
    { icon: Users, label: 'Inter-College Glory', desc: 'Students from across Telangana & India participating' },
    { icon: Award, label: 'Grand Accolades', desc: 'Certificates of excellence, trophies & awards' },
    { icon: Sparkles, label: 'Autonomous VJIT', desc: 'Premier engineering campus with world-class facilities' },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Key Highlights Strip */}
      <section className="relative z-20 py-10 border-y border-white/10 bg-midnight/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => {
              const Icon = h.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white tracking-tight">{h.label}</h3>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{h.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. The Interactive 3 Event Arenas (High-Five theme with expandable shelves) */}
      <CategorySection />

      {/* 4. Quick Action Callout Banner */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="relative rounded-3xl p-8 md:p-12 overflow-hidden border border-cyan-500/30 bg-gradient-to-r from-blue-950/70 via-purple-950/70 to-indigo-950/70 shadow-[0_0_50px_rgba(0,240,255,0.15)]">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full border border-cyan-400/20">
                Registrations Active in Demo Mode
              </span>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-3 mb-2">
                Ready to represent your college?
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                Lock your participation early in sports tourneys, dance battles, e-sports, and hackathons. No registration fees announced yet.
              </p>
            </div>
            <Link
              to="/register"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] transition-all shrink-0 cursor-pointer"
            >
              Sign Up Now →
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Official Fest Announcements */}
      <AnnouncementSection />

      {/* 6. Partner & Sponsor Placeholder Wall */}
      <section className="py-14 border-t border-white/5 bg-navy/20" aria-label="Fest Partners">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs uppercase tracking-widest text-gray-400 font-semibold block mb-2">
            Collaboration & Alliances
          </span>
          <h3 className="text-2xl font-bold text-white mb-8">Fest Partners & Patrons</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {sponsors.map((sp) => (
              <div
                key={sp.id}
                className="glass-card p-6 rounded-xl border border-white/10 flex flex-col items-center justify-center min-h-[110px] group hover:border-cyan-400/40 transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 text-xs font-mono font-bold mb-2 group-hover:text-cyan-400">
                  {sp.tier.toUpperCase()}
                </div>
                <span className="text-xs font-semibold text-gray-300">{sp.name}</span>
                <span className="text-[10px] text-gray-500">Partner slot available</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Interested in partnering with Udbhav 2027? Reach out through our contact desk.
          </p>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="FAQ">
        <FAQAccordion items={faqs.slice(0, 5)} />
        <div className="text-center mt-8">
          <Link
            to="/contact"
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
          >
            Have more questions? Visit our Help & Contact desk →
          </Link>
        </div>
      </section>
    </div>
  );
}

