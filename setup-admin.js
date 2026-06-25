import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wjgmxhdgndpjkrafzaob.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqZ214aGRnbmRwamtyYWZ6YW9iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NzIzMzgsImV4cCI6MjA5NzM0ODMzOH0.hKFBu5zKqkD8e2rgsD7F7y039EKwjasLGnBLbti52W4';

console.log('Starting setup...');
console.log('SUPABASE_URL:', SUPABASE_URL);

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function setupAdmin() {
  try {
    console.log('🔧 Setting up admin user and database...\n');

    // 1. Create admin user
    console.log('📝 Creating admin user...');
    const { data, error } = await supabase.auth.signUp({
      email: 'csc.garhi2@gmail.com',
      password: 'admin@5588',
    });

    if (error) {
      if (error.message.includes('already registered')) {
        console.log('⚠️  Admin user already exists');
        console.log('   Email: csc.garhi2@gmail.com');
        console.log('   Password: admin@5588');
      } else {
        console.error('❌ Error creating admin user:', error.message);
      }
    } else {
      console.log('✅ Admin user created!');
      console.log('   Email: csc.garhi2@gmail.com');
      console.log('   Password: admin@5588');
      console.log('   User ID:', data.user?.id);
    }

    // 2. Verify services table exists by trying to query it
    console.log('\n📊 Checking services table...');
    const { data: services, error: tableError } = await supabase
      .from('services')
      .select('*')
      .limit(1);

    if (tableError) {
      console.log('⚠️  Services table does not exist.');
      console.log('   Error: ' + tableError.message);
      console.log('   \n   SQL to run in Supabase SQL Editor:');
      console.log(`
CREATE TABLE public.services (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users"
  ON public.services FOR SELECT
  USING (true);

CREATE POLICY "Enable insert for authenticated users"
  ON public.services FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users"
  ON public.services FOR DELETE
  USING (true);

CREATE POLICY "Enable update for authenticated users"
  ON public.services FOR UPDATE
  WITH CHECK (true);
      `);
    } else {
      console.log('✅ Services table exists!');
      console.log(`   Records found: ${services.length}`);
    }

    console.log('\n✨ Setup complete!');
    console.log('\n📱 Admin Login Details:');
    console.log('   URL: http://localhost:5173/supabaseproject/login');
    console.log('   Email: csc.garhi2@gmail.com');
    console.log('   Password: admin@5588');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error(error);
  }
}

setupAdmin();
