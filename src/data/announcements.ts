export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'general' | 'registration' | 'schedule' | 'important';
  isNew: boolean;
}

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Udbhav 2027 — Coming Soon!',
    content: 'Get ready for the biggest inter-college fest at VJIT. Registrations, schedule, and event details will be announced soon. Stay tuned!',
    date: 'November 2026',
    type: 'general',
    isNew: true,
  },
  {
    id: '2',
    title: 'Registration Opens Soon',
    content: 'Online registration for all events will open shortly. Make sure to gather your team and be ready to sign up.',
    date: 'To be announced',
    type: 'registration',
    isNew: true,
  },
];

export interface Sponsor {
  id: string;
  name: string;
  tier: 'title' | 'gold' | 'silver' | 'bronze';
  logoPlaceholder: string;
}

export const sponsors: Sponsor[] = [
  { id: '1', name: 'Title Sponsor', tier: 'title', logoPlaceholder: 'title-sponsor' },
  { id: '2', name: 'Gold Sponsor', tier: 'gold', logoPlaceholder: 'gold-sponsor' },
  { id: '3', name: 'Silver Sponsor', tier: 'silver', logoPlaceholder: 'silver-sponsor' },
  { id: '4', name: 'Bronze Sponsor', tier: 'bronze', logoPlaceholder: 'bronze-sponsor' },
];

export const faqs = [
  {
    question: 'What is Udbhav?',
    answer: 'Udbhav is the annual inter-college fest organized by Vidya Jyothi Institute of Technology (VJIT), Hyderabad. It features a wide range of sports, cultural, and technical events.',
  },
  {
    question: 'Who can participate?',
    answer: 'Students from any recognized college or university can participate. A valid college ID is required at the time of registration and event participation.',
  },
  {
    question: 'Is there a registration fee?',
    answer: 'Registration fee details will be announced along with the event registrations. Stay tuned for updates.',
  },
  {
    question: 'How do I register for events?',
    answer: 'You can register through the website once registrations open. Select your events, fill in the required details, and submit the form.',
  },
  {
    question: 'Can I participate in multiple events?',
    answer: 'Yes, you can register for multiple events as long as there are no schedule conflicts. Check the fest schedule once it is announced.',
  },
  {
    question: 'Where is VJIT located?',
    answer: 'Vidya Jyothi Institute of Technology is located in Aziz Nagar, Hyderabad, Telangana, India.',
  },
  {
    question: 'Will accommodation be provided?',
    answer: 'Accommodation details for outstation participants will be announced closer to the event.',
  },
  {
    question: 'How can I contact the organizers?',
    answer: 'You can reach us through the Contact page on this website or email us at the official fest email (to be announced).',
  },
];
