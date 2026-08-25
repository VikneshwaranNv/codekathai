import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSync() {
  const testEmail = 'student_' + Date.now() + '@gmail.com';
  console.log('Testing clean student insert for:', testEmail);

  // Safe payload with standard Supabase user_profiles columns
  const payload = {
    id: crypto.randomUUID(),
    full_name: 'New Student Test',
    email: testEmail,
    role: 'student',
    learning_level: 'beginner',
  };

  const { data, error } = await supabase.from('user_profiles').insert([payload]).select();

  if (error) {
    console.error('❌ Insert Error:', error);
  } else {
    console.log('✅ Insert Success! Row added to Supabase user_profiles:', data);
  }

  // Fetch all rows to verify admin view
  const { data: allRows } = await supabase.from('user_profiles').select('*');
  console.log('📊 Total rows now visible in Supabase user_profiles:', allRows?.length);
}

testSync();
