import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function makeAdmin() {
  console.log('Granting admin role to viknesh@gmail.com, sriniramesh26@gmail.com, and hgvicky37@gmail.com...');

  const { data, error } = await supabase
    .from('user_profiles')
    .update({ role: 'admin' })
    .in('email', ['viknesh@gmail.com', 'sriniramesh26@gmail.com', 'hgvicky37@gmail.com'])
    .select();

  if (error) {
    console.error('Update error:', error);
  } else {
    console.log('✅ Granted Admin role to:', data?.map(d => d.email));
  }
}

makeAdmin();
