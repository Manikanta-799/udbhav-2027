import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Database, CheckCircle, ArrowRight } from 'lucide-react';
import RegistrationForm from '@/components/RegistrationForm';
import { festConfig } from '@/data/config';

export default function Register() {
  const [searchParams] = useSearchParams();
  const preselectedEvent = searchParams.get('event') || undefined;

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
          <Sparkles size={13} />
          <span>Official Registration Portal</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Register for <span className="gradient-text">UDBHAV 2027</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mt-2.5">
          Join hundreds of participants at Vidya Jyothi Institute of Technology. Select your event and submit your details below.
        </p>
      </div>

      {/* Main Registration Form */}
      <RegistrationForm initialEventId={preselectedEvent} />

      {/* Architecture & Backend Integration Documentation Card */}
      <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-midnight/90 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-2 mb-3">
          <Database size={18} className="text-cyan-400" />
          <h3 className="text-base font-bold text-white uppercase tracking-wider">
            Backend Architecture & Production Deployment
          </h3>
        </div>

        <p className="text-xs text-gray-300 leading-relaxed mb-4">
          This portal features an enterprise-ready modular service layer designed for immediate connection to <strong className="text-white">Firebase Firestore</strong> or <strong className="text-white">Supabase PostgreSQL</strong> without leaking API keys:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-bold text-cyan-300 block mb-1">Option A: Firebase Integration</span>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              <li>Configured via <code className="text-cyan-200">.env</code> (see <code className="text-cyan-200">.env.example</code>)</li>
              <li>Stores entries directly in the secured Firestore collection</li>
              <li>Includes client duplicate-submission debounce</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
            <span className="font-bold text-pink-300 block mb-1">Option B: Supabase Integration</span>
            <ul className="space-y-1 text-gray-400 list-disc list-inside">
              <li>Row Level Security (RLS) policies for write-only public anon keys</li>
              <li>Realtime websocket listener for admin dashboard feeds</li>
              <li>Automated email webhook triggers</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Zero third-party telemetry. Privacy-conscious participant processing.</span>
          <Link to="/about" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1">
            <span>Learn About VJIT</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

