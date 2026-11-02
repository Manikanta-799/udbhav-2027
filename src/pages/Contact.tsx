import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import { festConfig } from '@/data/config';
import FAQAccordion from '@/components/FAQAccordion';
import { faqs } from '@/data/announcements';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', college: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-16">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 text-xs font-semibold mb-3">
          <MessageSquare size={13} />
          <span>Help Desk & Organizing Committee</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-3">
          Contact & <span className="gradient-text">FAQ</span>
        </h1>
        <p className="text-gray-400 text-sm">
          Have queries regarding event eligibility, rules, college bus routes, or sponsorship? We're here to help.
        </p>
      </div>

      {/* Contact Grid: Info Cards + Message Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Campus & Desk Info */}
        <div className="lg:col-span-5 space-y-4">
          {/* Card 1: Venue */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-400/20 shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block mb-0.5">
                Campus Location
              </span>
              <h3 className="text-base font-bold text-white mb-1">{festConfig.institution}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-2">
                Aziz Nagar Gate, C.B. Post, Himayatnagar, Hyderabad, Telangana 500075.
              </p>
              <a
                href="https://maps.google.com/?q=Vidya+Jyothi+Institute+of+Technology+Hyderabad"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-4"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>

          {/* Card 2: Official Correspondence */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-400/20 shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-400 block mb-0.5">
                Official Email
              </span>
              <h3 className="text-base font-bold text-white mb-1">Central Fest Secretariat</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-mono">
                udbhav@vjit.ac.in (To be officially activated)
              </p>
            </div>
          </div>

          {/* Card 3: Help Desk Hours */}
          <div className="glass-card p-6 rounded-2xl border border-white/10 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-400/20 shrink-0">
              <Clock size={22} />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                Student Help Desk
              </span>
              <h3 className="text-base font-bold text-white mb-1">Operational Hours</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                9:30 AM to 5:00 PM (Monday through Saturday during fest season)
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Enquiry / Message Box */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
            <h3 className="text-xl font-bold text-white mb-1">Send an Organizer Inquiry</h3>
            <p className="text-xs text-gray-400 mb-6">
              Fill in your inquiry and our student council coordinator will get in touch.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/30 text-center space-y-2">
                <CheckCircle size={32} className="text-green-400 mx-auto" />
                <h4 className="text-base font-bold text-white">Message Received!</h4>
                <p className="text-xs text-gray-300">
                  Thank you! Your query has been forwarded to the Udbhav 2027 desk.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Your Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sravan Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Email Address <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sravan@college.edu"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      College / Institution
                    </label>
                    <input
                      type="text"
                      placeholder="Your college name"
                      value={formData.college}
                      onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Event inquiry / Sponsorship / Other"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs uppercase tracking-wider hover:from-cyan-400 hover:to-blue-500 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send size={14} />
                  <span>Send Message to Secretariat</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Comprehensive FAQ Accordion */}
      <div className="pt-8 border-t border-white/10">
        <FAQAccordion
          items={faqs}
          title="Frequently Asked Questions (FAQ)"
          subtitle="All essential rules regarding inter-college participation, eligibility IDs, accommodation, and event schedules."
        />
      </div>
    </div>
  );
}

