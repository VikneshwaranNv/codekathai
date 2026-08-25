import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkAndMakeAdmin() {
  console.log('Checking user_profiles in Supabase...');

  const { data: rows, error } = await supabase.from('user_profiles').select('*');
  if (error) {
    console.error('Error fetching user_profiles:', error);
    return;
  }

  console.log('Current user_profiles in database:');
  console.log(JSON.stringify(rows, null, 2));

  // Update all records or viknesh@gmail.com to admin
  const { data: updateData, error: updateError } = await supabase
    .from('user_profiles')
    .update({ role: 'admin' })
    .or('email.ilike.%viknesh%,email.ilike.%admin%')
    .select();

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('Successfully updated Admin role for matching profiles:', updateData);
  }
}

checkAndMakeAdmin();
