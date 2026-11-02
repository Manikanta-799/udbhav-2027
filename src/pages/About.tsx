import { Shield, Sparkles, Trophy, Award, MapPin, Building, Users, BookOpen } from 'lucide-react';
import { festConfig } from '@/data/config';
import VJITLogo from '@/components/VJITLogo';

export default function About() {
  const pillars = [
    {
      icon: Trophy,
      title: 'Athletic Excellence',
      description: 'Full-fledged sports infrastructure hosting state-level cricket, basketball, volleyball, kabaddi, and indoor tourneys.',
      color: 'text-orange-400',
      bg: 'bg-orange-500/10 border-orange-500/20',
    },
    {
      icon: Sparkles,
      title: 'Cultural Spectrum',
      description: 'An open canvas celebrating band face-offs, classical mudras, modern street choreography, short films, and competitive gaming.',
      color: 'text-pink-400',
      bg: 'bg-pink-500/10 border-pink-500/20',
    },
    {
      icon: Award,
      title: 'Technological Innovation',
      description: 'Hackathons and developer arenas solving real challenges with algorithmic benchmarks and industry expert evaluation.',
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/20',
    },
    {
      icon: Users,
      title: 'Inter-College Camaraderie',
      description: 'Connecting thousands of ambitious students, creating lasting networks and unforgettable collegiate memories.',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Top Banner */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-4">
          <BookOpen size={13} />
          <span>Institutional Legacy & Fest Heritage</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
          About <span className="gradient-text">UDBHAV</span>
        </h1>
        <p className="text-gray-300 text-base leading-relaxed">
          Udbhav is the signature annual inter-college festival of <strong className="text-white">Vidya Jyothi Institute of Technology (Autonomous)</strong>. It brings together the brightest sports, creative, and technical minds in Hyderabad under one unified banner.
        </p>
      </div>

      {/* College Overview & VJIT Crest Card */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4">
            <div className="inline-block">
              <VJITLogo showText={true} />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Vidya Jyothi Institute of Technology (Autonomous)
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Established in 1998, VJIT has evolved into one of Hyderabad's most distinguished institutions of higher engineering and technology education. Governed by a commitment to academic rigor and holistic student development, VJIT offers autonomous undergraduate, postgraduate, and research curricula.
            </p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Situated in the serene environs of Aziz Nagar, Hyderabad, the campus spans lush greenery with modern sports grounds, advanced computational laboratories, high-capacity auditoriums, and dedicated student activity zones.
            </p>
          </div>

          <div className="md:col-span-4 space-y-3">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block mb-0.5">Campus Status</span>
              <span className="text-base font-bold text-white block">Autonomous Institution</span>
              <span className="text-xs text-gray-400">Approved by AICTE, Affiliated to JNTUH</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-pink-400 block mb-0.5">Location</span>
              <span className="text-base font-bold text-white block">Hyderabad, Telangana</span>
              <span className="text-xs text-gray-400">Aziz Nagar Gate, Himayatnagar</span>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-[10px] uppercase font-bold text-amber-400 block mb-0.5">Fest Scope</span>
              <span className="text-base font-bold text-white block">Inter-College State-Wide</span>
              <span className="text-xs text-gray-400">26 Multidisciplinary Tournaments</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Pillars of Udbhav */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            The Four Pillars of <span className="gradient-text">Udbhav 2027</span>
          </h2>
          <p className="text-gray-400 text-sm mt-1">What makes Udbhav an unforgettable collegiate experience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className={`p-6 rounded-2xl border ${p.bg} backdrop-blur-md flex flex-col justify-between`}>
                <div>
                  <div className={`p-3 rounded-xl bg-black/40 border border-white/10 w-fit mb-4 ${p.color}`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-gray-300 leading-relaxed">{p.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

