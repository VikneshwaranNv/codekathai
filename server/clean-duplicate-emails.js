import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function removeDuplicateEmails() {
  console.log('🧹 Cleaning duplicate email rows in user_profiles...');

  const { data: allUsers, error } = await supabase
    .from('user_profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    return;
  }

  const seenEmails = new Set();
  const idsToDelete = [];

  for (const user of allUsers) {
    if (!user.email) continue;
    const lowerEmail = user.email.toLowerCase().trim();

    if (seenEmails.has(lowerEmail)) {
      idsToDelete.push(user.id);
    } else {
      seenEmails.add(lowerEmail);
    }
  }

  console.log(`Found ${idsToDelete.length} duplicate rows to delete.`);

  if (idsToDelete.length > 0) {
    const { error: delError } = await supabase
      .from('user_profiles')
      .delete()
      .in('id', idsToDelete);

    if (delError) {
      console.error('Delete error:', delError);
    } else {
      console.log(`✅ Successfully deleted ${idsToDelete.length} duplicate email rows!`);
    }
  }

  // Verify final unique set
  const { data: finalRows } = await supabase
    .from('user_profiles')
    .select('id, full_name, email, role')
    .order('email', { ascending: true });

  console.log(`\n📊 Final Clean Database Table (${finalRows.length} unique accounts):`);
  console.table(finalRows);
}

removeDuplicateEmails();
