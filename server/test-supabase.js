import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testInsert() {
  console.log('Testing Supabase insert into user_profiles...');
  const testPayload = {
    id: crypto.randomUUID(),
    full_name: 'Kavi (Test Student)',
    email: 'kavi.student@codekathai.com',
    learning_level: 'beginner',
  };

  const { data, error } = await supabase.from('user_profiles').insert([testPayload]).select();
  if (error) {
    console.error('❌ Supabase Insert Error:', error);
  } else {
    console.log('✅ Supabase Insert Success! Inserted Row:', data);
  }

  const { data: allRows, error: readError } = await supabase.from('user_profiles').select('*');
  if (readError) {
    console.error('❌ Supabase Read Error:', readError);
  } else {
    console.log('📊 Current rows in user_profiles table:', allRows);
  }
}

testInsert();
