# UDBHAV 2027 — Official College Fest Website
### Vidya Jyothi Institute of Technology (Autonomous), Hyderabad

> **"One Campus. Infinite Possibilities."**

A college fest web platform designed and built for **Udbhav 2027** at Vidya Jyothi Institute of Technology (VJIT), Hyderabad, Telangana.

Featuring a neon aesthetic with deep midnight backgrounds, glassmorphism cards, interactive event arena drawers, comprehensive fixture pages for all 26 events, schedule timelines, an accessible registration workflow with demo mode receipt generator, and an enterprise-grade backend integration architecture.

---

## 🌟 Visual Preview & Features

- **Cinematic Hero**: Giant animated "UDBHAV 2027" neon title, VJIT institutional crest, ambient laser beams and crowd silhouettes, dynamic canvas particle animation with reduced-motion support.
- **Interactive Event Arenas**: High-five celebration themed interactive cards for **Sports** (amber/orange), **Cultural** (pink/magenta), and **Technical** (cyan/electric-blue). Clicking expands fixture shelves directly on the homepage without page reload.
- **All 26 Official Events**:
  - **Sports (9 Events)**: Basketball, Football, Volleyball, Table Tennis, Cricket, Badminton, Chess, Carroms, Kabaddi.
  - **Cultural (13 Events)**: Battle of Bands, Classical Dance, Singing Competition, Dancing Competition (Freestyle, Techno, Mass subcategories), Treasure Hunt, Squid Game, Photography Competition, Videography Competition, Short Film Competition, BGMI Tournament, Free Fire Tournament, Valorant Tournament, IPL Auction.
  - **Technical (4 Events)**: Codeathon, Ideathon, Branchwise Hackathons (CSE/ECE/EEE/ME/CE), Project Expo.
- **Event Detail Layout**: Structured split layout featuring quick status cards (Format, Eligibility, Date, Venue), vertical tabs (Overview, Rules, Registration, Coordinators, FAQs), and 1-click registration jump.
- **Search & Filter Suite**: Instant client-side filtering by query, category, and participation format with zero reload.
- **Registration Engine**: Full participant and roster validation, Indian phone number format checking, dynamic team roster management, duplicate protection, and cryptographic receipt generation.
- **VJIT Identity**: Reusable `<VJITLogo />` component supporting direct image asset override (`src/assets/vjit-logo.png` or `public/images/vjit-logo.svg`).

---

## 🚀 Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 + Custom Glassmorphism & Neon Glow Tokens
- **Animations**: Framer Motion (respects `prefers-reduced-motion`) + HTML5 2D Canvas Engine
- **Icons**: Lucide React
- **Routing**: React Router DOM v7 (with automatic `ScrollToTop`)
- **Backend Architecture**: Pluggable provider for Firebase Firestore or Supabase PostgreSQL

---

## 📁 Project Structure

```
udbhav-2027/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── vjit-logo.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnnouncementSection.tsx
│   │   ├── CategoryCard.tsx
│   │   ├── CategorySection.tsx
│   │   ├── EventCard.tsx
│   │   ├── EventGrid.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── RegistrationForm.tsx
│   │   ├── ScheduleTimeline.tsx
│   │   ├── ScrollIndicator.tsx
│   │   ├── SearchFilters.tsx
│   │   └── VJITLogo.tsx
│   ├── data/
│   │   ├── announcements.ts
│   │   ├── config.ts
│   │   ├── events.ts          # Structured data for all 26 events
│   │   └── schedule.ts
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Cultural.tsx       # 13 Cultural events & E-Sports
│   │   ├── EventDetails.tsx   # Detailed event view
│   │   ├── Home.tsx
│   │   ├── Register.tsx       # Registration portal & backend doc
│   │   ├── Schedule.tsx       # Timeline & day-wise schedule
│   │   ├── Sports.tsx         # 9 Sports tournaments
│   │   └── Technical.tsx      # 4 Engineering & Hackathon tracks
│   ├── services/
│   │   └── registration.ts    # Validation, receipt gen, backend adapter
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env.example
├── package.json
├── tsconfig.json
├── tsconfig.app.json
└── vite.config.ts
```

---

## 💻 Local Development Setup

### 1. Prerequisites
- Node.js (version 18+ or 20+ recommended)
- npm or pnpm

### 2. Installation
```bash
# Clone or navigate to the repository
cd udbhav-2027

# Install dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The website will launch at `http://localhost:5173`.

### 4. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Backend Integration Guide (Firebase / Supabase)

The registration system includes a safe demo mode that validates inputs and issues a demo reference pass without requiring external API keys.

To connect live cloud databases in production:

### Option A: Firebase Firestore Setup
1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com).
2. Create a Firestore database in test or production mode.
3. Copy `.env.example` to `.env`:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. Install Firebase SDK: `npm install firebase`
5. Connect Firestore in `src/services/registration.ts`.

### Option B: Supabase Setup
1. Create a project at [https://supabase.com](https://supabase.com).
2. Create a `registrations` table with schema:
   ```sql
   create table registrations (
     id uuid default gen_random_uuid() primary key,
     full_name text not null,
     email text not null,
     mobile text not null,
     college_name text not null,
     department text not null,
     year_of_study text not null,
     selected_event text not null,
     team_name text,
     team_members jsonb default '[]'::jsonb,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );
   ```
3. Copy `.env.example` to `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_public_key
   ```
4. Enable Row Level Security (RLS) with an `INSERT` policy for `anon` users.

---

## 🛡️ License & Institutional Rights
Designed for **Vidya Jyothi Institute of Technology (Autonomous)**, Hyderabad, Telangana. All institutional names and branding belong to VJIT.
