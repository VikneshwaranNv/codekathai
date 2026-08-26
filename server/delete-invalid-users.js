import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanInvalidUsers() {
  console.log('Cleaning up invalid test users starting with numbers (e.g. 123@gmail.com)...');

  // Delete records where email or full_name starts with digits or equals 123@gmail.com
  const { data, error } = await supabase
    .from('user_profiles')
    .delete()
    .or('email.ilike.123%,full_name.eq.123,email.ilike.student_%')
    .select();

  if (error) {
    console.error('Delete error:', error);
  } else {
    console.log('✅ Cleaned up test user profiles:', data);
  }

  const { data: allRows } = await supabase.from('user_profiles').select('id, full_name, email, role');
  console.log('📊 Current Clean User Profiles in Supabase:');
  console.log(JSON.stringify(allRows, null, 2));
}

cleanInvalidUsers();
