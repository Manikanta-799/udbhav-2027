import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items,
  title = 'Frequently Asked Questions',
  subtitle = 'Find answers to common questions about Udbhav 2027 registrations, guidelines, and events.',
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first item open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="w-full">
      {title && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle size={20} className="text-cyan-400" />
            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{title}</h3>
          </div>
          {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
        </div>
      )}

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                isOpen
                  ? 'bg-white/[0.08] border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.08)]'
                  : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]'
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className={`text-sm sm:text-base font-semibold pr-4 transition-colors ${
                  isOpen ? 'text-cyan-300' : 'text-gray-200'
                }`}>
                  {item.question}
                </span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="shrink-0 p-1 rounded-full bg-white/5 text-gray-400"
                >
                  <ChevronDown size={18} className={isOpen ? 'text-cyan-400' : 'text-gray-400'} />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-5 pb-5 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

