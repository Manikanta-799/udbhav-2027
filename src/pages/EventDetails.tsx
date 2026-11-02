import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Users,
  Calendar,
  MapPin,
  Award,
  Phone,
  FileText,
  HelpCircle,
  Sparkles,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { allEvents } from '@/data/events';
import FAQAccordion from '@/components/FAQAccordion';
import RegistrationForm from '@/components/RegistrationForm';

type TabKey = 'overview' | 'rules' | 'registration' | 'coordinators' | 'faq';

export default function EventDetails() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('overview');

  const event = allEvents.find((e) => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 text-center max-w-xl mx-auto">
        <div className="glass-card p-10 rounded-3xl border border-red-500/30">
          <ShieldAlert size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Event Not Found</h2>
          <p className="text-gray-400 text-sm mb-6">
            The event "{eventId}" does not exist or may have been renamed in the Udbhav 2027 catalogue.
          </p>
          <Link
            to="/"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs"
          >
            Return to Fest Arenas
          </Link>
        </div>
      </div>
    );
  }

  // Theme styling based on category
  const theme = {
    sports: {
      accent: '#ff8c00',
      text: 'text-orange-400',
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      glow: 'shadow-[0_0_30px_rgba(255,140,0,0.2)]',
      btn: 'from-orange-500 to-amber-600',
      backPath: '/sports',
      backLabel: 'Back to Sports',
    },
    cultural: {
      accent: '#ff007f',
      text: 'text-pink-400',
      bg: 'bg-pink-500/10',
      border: 'border-pink-500/30',
      glow: 'shadow-[0_0_30px_rgba(255,0,128,0.2)]',
      btn: 'from-pink-500 to-fuchsia-600',
      backPath: '/cultural',
      backLabel: 'Back to Cultural',
    },
    technical: {
      accent: '#00f0ff',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30',
      glow: 'shadow-[0_0_30px_rgba(0,240,255,0.2)]',
      btn: 'from-cyan-500 to-blue-600',
      backPath: '/technical',
      backLabel: 'Back to Technical',
    },
  }[event.category];

  const tabs: { key: TabKey; label: string; icon: typeof FileText }[] = [
    { key: 'overview', label: 'Overview', icon: FileText },
    { key: 'rules', label: 'Rules & Regulations', icon: Award },
    { key: 'registration', label: 'Registration', icon: Sparkles },
    { key: 'coordinators', label: 'Coordinators', icon: Phone },
    { key: 'faq', label: 'Event FAQ', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back button matching mockup */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          to={theme.backPath}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer"
        >
          <ArrowLeft size={15} />
          <span>{theme.backLabel}</span>
        </Link>

        <span className={`text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full border ${theme.border} ${theme.bg} ${theme.text}`}>
          {event.category} Arena
        </span>
      </div>

      {/* Hero Banner with large Icon & Title matching mockup */}
      <div className={`relative rounded-3xl p-6 sm:p-10 mb-8 overflow-hidden border ${theme.border} bg-midnight/90 backdrop-blur-xl ${theme.glow}`}>
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 10% 50%, ${theme.accent} 0%, transparent 60%)`,
          }}
        />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Custom Icon badge */}
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center text-4xl sm:text-5xl border shadow-inner shrink-0"
              style={{
                backgroundColor: `${theme.accent}15`,
                borderColor: `${theme.accent}50`,
              }}
            >
              <span role="img" aria-label={event.name}>
                {event.icon}
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-gray-400">UDBHAV '27 OFFICIAL EVENT</span>
                {event.subCategory && (
                  <span className="text-[10px] uppercase font-bold text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                    {event.subCategory}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                {event.name}
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
                Organized under the aegis of Vidya Jyothi Institute of Technology.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('registration')}
            className={`px-7 py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r ${theme.btn} shadow-lg hover:brightness-110 transition-all shrink-0 cursor-pointer`}
          >
            Register for {event.name} →
          </button>
        </div>
      </div>

      {/* Main Content Layout with Left Vertical Tabs & Right Content Panel (Matches Mockup!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Vertical Navigation Menu (Mockup matches) */}
        <div className="lg:col-span-3 space-y-2">
          <div className="glass-card p-3 rounded-2xl border border-white/10 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer ${
                    isSelected
                      ? `bg-white/10 ${theme.text} border border-white/20 shadow-sm`
                      : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon size={16} className={isSelected ? theme.text : 'text-gray-500'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Help Card */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 text-xs text-gray-400">
            <span className="font-bold text-white block mb-1">Need Clarification?</span>
            <span>Check the FAQ tab or reach out to the student coordinators desk for {event.name}.</span>
          </div>
        </div>

        {/* Right Content Panel */}
        <div className="lg:col-span-9">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Detailed Description */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  {event.description}
                </p>

                {/* Sub-events highlight if any */}
                {event.subEvents && event.subEvents.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <h4 className="text-xs uppercase font-extrabold tracking-wider text-pink-400 mb-3">
                      Sub-Categories & Formats
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {event.subEvents.map((sub) => (
                        <div key={sub.name} className="p-3.5 rounded-xl bg-white/5 border border-white/10">
                          <span className="font-bold text-white text-xs block mb-1">{sub.name}</span>
                          <span className="text-[11px] text-gray-400 leading-snug block">{sub.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 4 Quick Stat Badges (Matches Mockup!) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* 1. Team / Participation */}
                <div className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="w-10 h-10 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-cyan-400">
                    <Users size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Format</span>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {event.participationType}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">
                    ({event.teamSize})
                  </span>
                </div>

                {/* 2. Eligibility */}
                <div className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="w-10 h-10 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-pink-400">
                    <Award size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Eligibility</span>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    Valid College ID
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block truncate" title={event.eligibility}>
                    {event.eligibility}
                  </span>
                </div>

                {/* 3. Date & Time */}
                <div className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="w-10 h-10 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-amber-400">
                    <Calendar size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Fixture Date</span>
                  <span className="text-xs sm:text-sm font-bold text-white block">
                    {event.eventDate}
                  </span>
                  <span className="text-[11px] text-gray-400 font-mono mt-0.5 block">
                    {event.eventTime}
                  </span>
                </div>

                {/* 4. Venue */}
                <div className="glass-card p-4 rounded-xl border border-white/10 text-center">
                  <div className="w-10 h-10 rounded-lg bg-white/5 mx-auto mb-2 flex items-center justify-center text-emerald-400">
                    <MapPin size={18} />
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block mb-0.5">Campus Venue</span>
                  <span className="text-xs sm:text-sm font-bold text-white block truncate" title={event.venue}>
                    {event.venue}
                  </span>
                  <span className="text-[11px] text-gray-400 mt-0.5 block">VJIT Campus</span>
                </div>
              </div>

              {/* Action Banner (Matches Mockup!) */}
              <div className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-base font-bold text-white">Ready to take the field in {event.name}?</h4>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Register online in advance to confirm your slot in the fixture draws.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('registration')}
                  className={`px-8 py-3 rounded-full text-white font-bold text-xs uppercase tracking-wider bg-gradient-to-r ${theme.btn} shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 transition-all cursor-pointer`}
                >
                  Register for {event.name} →
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: RULES & REGULATIONS */}
          {activeTab === 'rules' && (
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Rules & Regulations</h3>
                <p className="text-xs text-gray-400">
                  Standard university festival guidelines apply to {event.name}.
                </p>
              </div>

              <div className="space-y-3">
                {event.rules.map((rule, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-gray-300">
                    <CheckCircle size={16} className={`${theme.text} shrink-0 mt-0.5`} />
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-gray-300">
                <span className="font-bold text-cyan-300 block mb-1">Official Clarification:</span>
                Referees & Jury decisions are final and binding across all rounds. Detailed fixture rulebooks will be supplied to registered team captains during captains' briefing.
              </div>
            </div>
          )}

          {/* TAB 3: REGISTRATION */}
          {activeTab === 'registration' && (
            <div>
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white">Event Registration Form</h3>
                <p className="text-xs text-gray-400">Lock your entry for {event.name}.</p>
              </div>
              <RegistrationForm initialEventId={event.id} />
            </div>
          )}

          {/* TAB 4: COORDINATORS */}
          {activeTab === 'coordinators' && (
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Student & Faculty Coordinators</h3>
                <p className="text-xs text-gray-400">
                  Direct points of contact for queries regarding {event.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.coordinators.map((c, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-sm font-bold text-white block">{c.name}</span>
                      <span className="text-xs text-gray-400">Event Coordinator</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 bg-cyan-400/10 px-2.5 py-1 rounded-lg border border-cyan-400/20">
                      <Phone size={13} />
                      <span>{c.phone}</span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500">
                Coordinators' official contact numbers will be activated once fixture dates are officially released.
              </p>
            </div>
          )}

          {/* TAB 5: FAQ */}
          {activeTab === 'faq' && (
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <FAQAccordion
                items={
                  event.faqs.length > 0
                    ? event.faqs
                    : [
                        {
                          question: `Can students from other colleges participate in ${event.name}?`,
                          answer: `Yes, Udbhav 2027 is a state-level inter-college fest. Students from any approved university/college are welcome with a valid ID card.`,
                        },
                        {
                          question: `When will the fixtures and timings for ${event.name} be announced?`,
                          answer: `The match/round schedule will be published on this website once registrations close.`,
                        },
                      ]
                }
                title={`${event.name} FAQs`}
                subtitle={`Frequently asked questions specific to ${event.name}.`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

