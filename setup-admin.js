import { createClient } from '@supabase/supabase-js';

// One-time admin bootstrap. NO secrets in this file — everything comes from env.
//
// Usage (PowerShell):
//   $env:VITE_SUPABASE_URL="https://your-ref.supabase.co"
//   $env:VITE_SUPABASE_ANON_KEY="your-anon-key"
//   $env:ADMIN_EMAIL="you@example.com"
//   $env:ADMIN_PASSWORD="a-strong-unique-password"
//   node setup-admin.js
//
// After the admin exists, DISABLE public sign-ups in Supabase:
//   Authentication → Providers → Email → turn OFF "Enable sign ups".
// Otherwise anyone could register and gain the `authenticated` role.

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

if (!SUPABASE_URL || !SUPABASE_KEY || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  console.error(
    'Missing env vars. Set VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, ADMIN_EMAIL, ADMIN_PASSWORD.'
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupAdmin() {
  try {
    console.log('🔧 Creating admin user for', ADMIN_EMAIL, '...');
    const { data, error } = await supabase.auth.signUp({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('⚠️  Admin user already exists — nothing to do.');
      } else {
        console.error('❌ Error creating admin user:', error.message);
      }
    } else {
      console.log('✅ Admin user created. User ID:', data.user?.id);
    }

    // Sanity-check the services table is reachable
    const { error: tableError } = await supabase.from('services').select('id').limit(1);
    if (tableError) {
      console.log('⚠️  services table not reachable:', tableError.message);
      console.log('   Run supabase_setup.sql in the Supabase SQL Editor first.');
    } else {
      console.log('✅ services table reachable.');
    }

    console.log('\n✨ Done. Remember to DISABLE public sign-ups in Supabase Auth.');
  } catch (err) {
    console.error('❌ Setup failed:', err.message);
  }
}

setupAdmin();
