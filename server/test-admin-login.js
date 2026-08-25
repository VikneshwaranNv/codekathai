import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testAdminLogin(email) {
  const cleanEmail = email.trim().toLowerCase();
  console.log('Testing admin login check for:', cleanEmail);

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', cleanEmail)
    .order('created_at', { ascending: false })
    .limit(1);

  if (error) {
    console.error('❌ Database error:', error);
    return;
  }

  const row = data && data.length > 0 ? data[0] : null;
  console.log('Row found:', row);

  if (!row || row.role !== 'admin') {
    console.log('❌ Result: ACCESS DENIED (role is not admin)');
  } else {
    console.log('✅ Result: ACCESS GRANTED (role is admin)!');
  }
}

testAdminLogin('viknesh@gmail.com');
testAdminLogin('sriniramesh26@gmail.com');
