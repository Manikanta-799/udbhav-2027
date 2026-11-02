import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, Loader2, Sparkles, UserPlus, Users, ShieldCheck, Copy, Check } from 'lucide-react';
import { allEvents } from '@/data/events';
import { submitRegistration } from '@/services/registration';
import type { RegistrationData } from '@/services/registration';

interface RegistrationFormProps {
  initialEventId?: string;
}

export default function RegistrationForm({ initialEventId }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationData>({
    fullName: '',
    email: '',
    mobile: '',
    collegeName: '',
    department: '',
    yearOfStudy: '',
    selectedEvent: initialEventId || '',
    teamName: '',
    teamMembers: [],
    consent: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{ id: string; message: string } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [copiedId, setCopiedId] = useState(false);

  const fullNameId = useId();
  const emailId = useId();
  const mobileId = useId();
  const collegeId = useId();
  const deptId = useId();
  const yearId = useId();
  const eventId = useId();
  const teamNameId = useId();
  const consentId = useId();

  const selectedEvent = allEvents.find((e) => e.id === formData.selectedEvent);
  const isTeamRequired = selectedEvent?.participationType === 'Team';
  const isTeamAllowed = selectedEvent?.participationType === 'Team' || selectedEvent?.participationType === 'Individual or Team';

  const validate = (): boolean => {
    const errs: Partial<Record<keyof RegistrationData, string>> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    if (!formData.mobile.trim()) {
      errs.mobile = 'Mobile number is required.';
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      errs.mobile = 'Provide a valid 10-digit Indian mobile number (e.g. 9876543210).';
    }

    if (!formData.collegeName.trim()) errs.collegeName = 'College / University name is required.';
    if (!formData.department.trim()) errs.department = 'Department / Branch is required (e.g., CSE, ECE, Mech).';
    if (!formData.yearOfStudy) errs.yearOfStudy = 'Please choose your current year of study.';
    if (!formData.selectedEvent) errs.selectedEvent = 'Please select an event to register for.';

    if (isTeamRequired && !formData.teamName?.trim()) {
      errs.teamName = 'Team name is mandatory for this team event.';
    }

    if (!formData.consent) {
      errs.consent = 'You must confirm that your details are accurate and agree to event guidelines.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (field: keyof RegistrationData, val: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const addTeamMember = () => {
    if (!newMemberName.trim()) return;
    const members = formData.teamMembers || [];
    if (members.length >= 12) {
      alert('Maximum 12 additional members reached.');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      teamMembers: [...(prev.teamMembers || []), newMemberName.trim()],
    }));
    setNewMemberName('');
  };

  const removeTeamMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      teamMembers: (prev.teamMembers || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) {
      const firstError = document.querySelector('[aria-invalid="true"]');
      if (firstError instanceof HTMLElement) {
        firstError.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitRegistration(formData);
      if (result.success && result.registrationId) {
        setSuccessInfo({
          id: result.registrationId,
          message: result.message,
        });
      } else {
        setErrorMessage(result.message || 'Registration failed. Please try again.');
      }
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Server error during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefId = () => {
    if (successInfo?.id) {
      navigator.clipboard.writeText(successInfo.id);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const resetForm = () => {
    setSuccessInfo(null);
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
      collegeName: '',
      department: '',
      yearOfStudy: '',
      selectedEvent: initialEventId || '',
      teamName: '',
      teamMembers: [],
      consent: false,
    });
  };

  return (
    <div className="w-full">
      {/* Demo Mode Notice Badge */}
      <div className="mb-6 p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3 backdrop-blur-md">
        <ShieldCheck size={20} className="text-cyan-400 mt-0.5 shrink-0" />
        <div className="text-xs text-gray-300">
          <span className="font-bold text-cyan-300 block mb-0.5 uppercase tracking-wide">
            Secure Demo Registration Mode
          </span>
          This form executes realistic client & server-side validation and generates a cryptographic registration receipt. Data is simulated safely without sending secrets to unsecured third parties.
        </div>
      </div>

      <AnimatePresence mode="wait">
        {successInfo ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="glass-card p-8 md:p-10 rounded-2xl border border-green-500/40 shadow-[0_0_40px_rgba(34,197,94,0.15)] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 text-green-400 flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              <CheckCircle2 size={36} />
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Registration Confirmed!</h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto mb-6">
              Thank you, <span className="text-cyan-400 font-semibold">{formData.fullName}</span>! Your registration request for{' '}
              <span className="text-white font-semibold">{selectedEvent?.name || formData.selectedEvent}</span> has been processed.
            </p>

            {/* Reference ID card */}
            <div className="bg-black/50 border border-white/10 rounded-xl p-4 max-w-xs mx-auto mb-6 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Reference Pass ID</span>
                <span className="font-mono font-bold text-green-400 text-sm tracking-wider">{successInfo.id}</span>
              </div>
              <button
                onClick={copyRefId}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
                title="Copy Reference ID"
                aria-label="Copy Reference ID"
              >
                {copiedId ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="text-xs text-gray-400 mb-6 max-w-sm mx-auto">
              Please preserve this reference pass. You will receive an official confirmation SMS/email prior to the event commencement at VJIT.
            </div>

            <button
              onClick={resetForm}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold tracking-wider transition-colors border border-white/20 cursor-pointer"
            >
              Register Another Event or Candidate
            </button>
          </motion.div>
        ) : (
          <form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            className="glass-card p-6 md:p-8 rounded-2xl border border-white/10 space-y-6"
          >
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-3 text-red-300 text-xs">
                <AlertTriangle size={16} className="mt-0.5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section 1: Event Selection */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-cyan-400" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">Select Event Arena</h4>
              </div>
              
              <div>
                <label htmlFor={eventId} className="block text-xs font-medium text-gray-300 mb-1.5">
                  Choose Event <span className="text-red-400">*</span>
                </label>
                <select
                  id={eventId}
                  value={formData.selectedEvent}
                  onChange={(e) => handleInputChange('selectedEvent', e.target.value)}
                  aria-invalid={!!errors.selectedEvent}
                  aria-describedby={errors.selectedEvent ? `${eventId}-err` : undefined}
                  className="w-full px-4 py-3 rounded-xl bg-midnight border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/40 cursor-pointer"
                >
                  <option value="">-- Click to select an event ({allEvents.length} available) --</option>
                  <optgroup label="🏆 Sports Events (9)">
                    {allEvents.filter((e) => e.category === 'sports').map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.name} ({ev.participationType} • {ev.teamSize})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="🎭 Cultural Events (13)">
                    {allEvents.filter((e) => e.category === 'cultural').map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.name} ({ev.participationType} • {ev.teamSize})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="⚡ Technical Events (4)">
                    {allEvents.filter((e) => e.category === 'technical').map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.name} ({ev.participationType} • {ev.teamSize})
                      </option>
                    ))}
                  </optgroup>
                </select>
                {errors.selectedEvent && (
                  <p id={`${eventId}-err`} className="text-xs text-red-400 mt-1.5">
                    {errors.selectedEvent}
                  </p>
                )}
              </div>

              {selectedEvent && (
                <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{selectedEvent.icon}</span>
                    <div>
                      <span className="font-bold text-white block">{selectedEvent.name}</span>
                      <span className="text-gray-400">{selectedEvent.participationType} ({selectedEvent.teamSize})</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 text-[11px] uppercase">
                    {selectedEvent.category}
                  </span>
                </div>
              )}
            </div>

            {/* Section 2: Participant Details */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <UserPlus size={16} className="text-cyan-400" />
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Participant / Team Leader Details
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor={fullNameId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={fullNameId}
                    type="text"
                    placeholder="e.g. Manikanta Sharma"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    aria-invalid={!!errors.fullName}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.fullName && <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor={emailId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    placeholder="student@vjit.ac.in"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    aria-invalid={!!errors.email}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>

                {/* Mobile */}
                <div>
                  <label htmlFor={mobileId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    10-Digit Mobile Number <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={mobileId}
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    aria-invalid={!!errors.mobile}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400 font-mono"
                  />
                  {errors.mobile && <p className="text-xs text-red-400 mt-1">{errors.mobile}</p>}
                </div>

                {/* College Name */}
                <div>
                  <label htmlFor={collegeId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    College / Institution <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={collegeId}
                    type="text"
                    placeholder="Vidya Jyothi Institute of Technology / Other"
                    value={formData.collegeName}
                    onChange={(e) => handleInputChange('collegeName', e.target.value)}
                    aria-invalid={!!errors.collegeName}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.collegeName && <p className="text-xs text-red-400 mt-1">{errors.collegeName}</p>}
                </div>

                {/* Department / Branch */}
                <div>
                  <label htmlFor={deptId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    Department / Branch <span className="text-red-400">*</span>
                  </label>
                  <input
                    id={deptId}
                    type="text"
                    placeholder="CSE / ECE / IT / AI-DS / ME / CE"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    aria-invalid={!!errors.department}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
                  />
                  {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
                </div>

                {/* Year of Study */}
                <div>
                  <label htmlFor={yearId} className="block text-xs font-medium text-gray-300 mb-1.5">
                    Year of Study <span className="text-red-400">*</span>
                  </label>
                  <select
                    id={yearId}
                    value={formData.yearOfStudy}
                    onChange={(e) => handleInputChange('yearOfStudy', e.target.value)}
                    aria-invalid={!!errors.yearOfStudy}
                    className="w-full px-4 py-2.5 rounded-xl bg-midnight border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="">Select current year</option>
                    <option value="1st Year">1st Year (B.Tech / Degree)</option>
                    <option value="2nd Year">2nd Year (B.Tech / Degree)</option>
                    <option value="3rd Year">3rd Year (B.Tech / Degree)</option>
                    <option value="4th Year">4th Year (B.Tech / Final Year)</option>
                    <option value="Postgraduate">Postgraduate (M.Tech / MBA / MCA)</option>
                  </select>
                  {errors.yearOfStudy && <p className="text-xs text-red-400 mt-1">{errors.yearOfStudy}</p>}
                </div>
              </div>
            </div>

            {/* Section 3: Team Details (Dynamic when Team or Individual/Team) */}
            {isTeamAllowed && (
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Users size={16} className="text-cyan-400" />
                  <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                    Team Information {isTeamRequired ? '(Mandatory)' : '(Optional)'}
                  </h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor={teamNameId} className="block text-xs font-medium text-gray-300 mb-1.5">
                      Team / Band / Crew Name {isTeamRequired && <span className="text-red-400">*</span>}
                    </label>
                    <input
                      id={teamNameId}
                      type="text"
                      placeholder="e.g. VJIT Cyber Warriors"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      aria-invalid={!!errors.teamName}
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-cyan-400"
                    />
                    {errors.teamName && <p className="text-xs text-red-400 mt-1">{errors.teamName}</p>}
                  </div>

                  {/* Add Members list */}
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1.5">
                      Roster Members (Add names of squad/crew teammates)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Teammate name & branch"
                        value={newMemberName}
                        onChange={(e) => setNewMemberName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addTeamMember();
                          }
                        }}
                        className="flex-1 px-4 py-2 rounded-xl bg-white/5 border border-white/15 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={addTeamMember}
                        className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 text-xs font-semibold hover:bg-cyan-500/30 transition-colors cursor-pointer"
                      >
                        + Add Member
                      </button>
                    </div>

                    {formData.teamMembers && formData.teamMembers.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formData.teamMembers.map((member, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white text-xs border border-white/10"
                          >
                            <span>#{idx + 2} {member}</span>
                            <button
                              type="button"
                              onClick={() => removeTeamMember(idx)}
                              className="text-gray-400 hover:text-red-400 ml-1 text-sm font-bold"
                              title="Remove"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Consent Checkbox */}
            <div className="pt-4 border-t border-white/10">
              <label htmlFor={consentId} className="flex items-start gap-3 cursor-pointer">
                <input
                  id={consentId}
                  type="checkbox"
                  checked={formData.consent}
                  onChange={(e) => handleInputChange('consent', e.target.checked)}
                  aria-invalid={!!errors.consent}
                  className="mt-0.5 w-4 h-4 rounded bg-white/5 border-white/20 text-cyan-400 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-gray-300 leading-relaxed">
                  I agree that the details provided are true and I will follow all rules and regulations of{' '}
                  <strong className="text-white">Udbhav 2027</strong> at Vidya Jyothi Institute of Technology. I will carry my valid college ID card to the campus. <span className="text-red-400">*</span>
                </span>
              </label>
              {errors.consent && <p className="text-xs text-red-400 mt-1.5">{errors.consent}</p>}
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(0,240,255,0.3)] hover:shadow-[0_0_35px_rgba(0,240,255,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin text-white" />
                  <span>Processing Registration Pass...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Submit Udbhav 2027 Registration</span>
                </>
              )}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

