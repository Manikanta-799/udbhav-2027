export interface ScheduleEntry {
  id: string;
  eventName: string;
  category: 'sports' | 'cultural' | 'technical';
  time: string;
  venue: string;
  day: number;
}

export const scheduleData: ScheduleEntry[] = [];

export const festDays = [
  { day: 1, label: 'Day 1', date: 'To be announced' },
  { day: 2, label: 'Day 2', date: 'To be announced' },
  { day: 3, label: 'Day 3', date: 'To be announced' },
];
