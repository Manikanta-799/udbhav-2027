export interface RegistrationData {
  fullName: string;
  email: string;
  mobile: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  selectedEvent: string;
  teamName?: string;
  teamMembers?: string[];
  consent: boolean;
}

export interface RegistrationResult {
  success: boolean;
  message: string;
  registrationId?: string;
}

/**
 * Demo registration handler.
 * 
 * In production, replace this with a real Firebase/Supabase integration.
 * This function simulates a successful registration for demonstration purposes.
 * 
 * IMPORTANT: This does NOT actually save any data. It is a demo only.
 */
export async function submitRegistration(data: RegistrationData): Promise<RegistrationResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Basic validation
  if (!data.fullName || !data.email || !data.mobile || !data.collegeName || !data.department || !data.yearOfStudy || !data.selectedEvent) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
    };
  }

  if (!data.consent) {
    return {
      success: false,
      message: 'Please agree to the terms and conditions to proceed.',
    };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return {
      success: false,
      message: 'Please enter a valid email address.',
    };
  }

  // Phone validation
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(data.mobile)) {
    return {
      success: false,
      message: 'Please enter a valid 10-digit Indian mobile number.',
    };
  }

  // Generate a demo registration ID
  const registrationId = `UDB-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  return {
    success: true,
    message: `Demo registration successful! Your reference ID is ${registrationId}. Note: This is a demo — no data has been saved to any server.`,
    registrationId,
  };
}

/**
 * Integration guide for Firebase/Supabase:
 * 
 * Firebase:
 * 1. Create a Firebase project at https://console.firebase.google.com
 * 2. Enable Firestore Database
 * 3. Add your Firebase config to .env (see .env.example)
 * 4. Install firebase: npm install firebase
 * 5. Initialize Firebase in src/services/firebase.ts
 * 6. Replace submitRegistration with Firestore addDoc call
 * 7. Add Firestore security rules to protect data
 * 
 * Supabase:
 * 1. Create a Supabase project at https://supabase.com
 * 2. Create a "registrations" table with appropriate columns
 * 3. Add your Supabase URL and anon key to .env (see .env.example)
 * 4. Install @supabase/supabase-js
 * 5. Initialize Supabase client in src/services/supabase.ts
 * 6. Replace submitRegistration with supabase.from('registrations').insert() call
 * 7. Configure Row Level Security policies
 */
