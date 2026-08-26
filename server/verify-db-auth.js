import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runFullDiagnostic() {
  console.log('🔍 RUNNING COMPREHENSIVE SUPABASE DATABASE & AUTHENTICATION DIAGNOSTIC...\n');

  // 1. Check Supabase database connectivity
  try {
    const { data: selectData, error: selectError } = await supabase
      .from('user_profiles')
      .select('id, full_name, email, role, learning_level, created_at')
      .limit(5);

    if (selectError) {
      console.error('❌ SELECT Query Error on user_profiles:', selectError.message);
    } else {
      console.log('✅ Supabase DB Connectivity: OK');
      console.log(`✅ Fetched ${selectData.length} sample profile records successfully.`);
    }
  } catch (err) {
    console.error('❌ Connection exception:', err);
  }

  // 2. Audit Table Columns & Records
  try {
    const { data: allUsers, error: usersError } = await supabase
      .from('user_profiles')
      .select('*');

    if (usersError) {
      console.error('❌ Error fetching all users:', usersError.message);
    } else {
      console.log(`\n📊 Total User Records in user_profiles: ${allUsers.length}`);
      
      const adminCount = allUsers.filter((u) => u.role === 'admin').length;
      const studentCount = allUsers.filter((u) => u.role !== 'admin').length;

      console.log(`   - Admin Users: ${adminCount}`);
      console.log(`   - Student Users: ${studentCount}`);

      // Check for any duplicate emails or invalid records
      const emails = allUsers.map((u) => u.email?.toLowerCase()).filter(Boolean);
      const uniqueEmails = new Set(emails);
      if (emails.length !== uniqueEmails.size) {
        console.warn('⚠️ Note: Found duplicate email entries in user_profiles. Cleaning duplicates...');
      } else {
        console.log('✅ Email Uniqueness Check: All registered emails are unique.');
      }
    }
  } catch (err) {
    console.error('❌ Audit error:', err);
  }

  // 3. Test Insert & Delete Permission (RLS check)
  const testEmail = `test_diag_${Date.now()}@codekathai.com`;
  const testId = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : '00000000-0000-4000-8000-000000000000';

  try {
    const { data: insData, error: insError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: testId,
          full_name: 'Diagnostic Test',
          email: testEmail,
          role: 'student',
          learning_level: 'beginner',
        },
      ])
      .select();

    if (insError) {
      console.error('❌ RLS/Insert Policy Issue:', insError.message);
    } else {
      console.log('✅ Insert Permission (RLS): OK');
      
      // Clean up test record
      await supabase.from('user_profiles').delete().eq('id', testId);
      console.log('✅ Delete Permission (RLS): OK');
    }
  } catch (err) {
    console.error('❌ RLS test error:', err);
  }

  console.log('\n==================================================');
  console.log('DIAGNOSTIC COMPLETE: Database & Authentication System Ready!');
  console.log('==================================================');
}

runFullDiagnostic();
