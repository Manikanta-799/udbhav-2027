import { motion } from 'framer-motion';
import { Bell, AlertTriangle, Calendar, UserPlus, Sparkles } from 'lucide-react';
import { announcements } from '@/data/announcements';

const typeIcons = {
  general: Bell,
  important: AlertTriangle,
  schedule: Calendar,
  registration: UserPlus,
};

const typeColors = {
  general: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  important: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  schedule: 'text-violet-400 bg-violet-400/10 border-violet-400/30',
  registration: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
};

export default function AnnouncementSection() {
  if (!announcements || announcements.length === 0) return null;

  return (
    <section className="py-14 md:py-20 relative" aria-label="Official Fest Announcements">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
            <Sparkles size={13} />
            <span>Stay In The Loop</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            Official <span className="gradient-text">Announcements</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-xl mx-auto mt-2">
            Verified updates from the Udbhav 2027 Central Organizing Committee & Student Council.
          </p>
        </div>

        <div className="space-y-4">
          {announcements.map((item, index) => {
            const Icon = typeIcons[item.type] || Bell;
            const style = typeColors[item.type] || typeColors.general;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="glass-card p-5 md:p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl border ${style} shrink-0`}>
                    <Icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {item.isNew && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40 animate-pulse">
                            Active
                          </span>
                        )}
                        <span className="text-xs text-gray-500 font-mono">{item.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

