import { useState } from 'react';
import { Calendar, Clock, MapPin, Sparkles, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScheduleTimeline from '@/components/ScheduleTimeline';
import { scheduleData } from '@/data/schedule';
import { festConfig } from '@/data/config';

export default function Schedule() {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
          <Calendar size={13} />
          <span>Fest Timeline & Rundown</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
          Fest <span className="gradient-text">Schedule</span>
        </h1>
        <p className="text-gray-400 text-sm max-w-lg mx-auto mt-2.5">
          Dates: <strong className="text-white">{festConfig.dates}</strong> • Venue: <strong className="text-white">{festConfig.venue}</strong>
        </p>
      </div>

      {/* Schedule Timeline Component */}
      <ScheduleTimeline entries={scheduleData} />

      {/* Notification subscribe box */}
      <div className="mt-12 glass-card p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/20">
            <Bell size={20} />
          </div>
          <div>
            <span className="text-sm font-bold text-white block">Want fixture alerts on your phone?</span>
            <span className="text-xs text-gray-400">Register early so your team leader receives the official fixtures directly.</span>
          </div>
        </div>

        <Link
          to="/register"
          className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
        >
          Sign Up Early →
        </Link>
      </div>
    </div>
  );
}

