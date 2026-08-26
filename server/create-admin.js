import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = 'https://fmemuexlgadamiphfhvr.supabase.co';
const supabaseAnonKey = 'sb_publishable_7T6IiyzPzko2FTJBHBYPnA_1Y4kb5bs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function setupAdminAccount() {
  const adminEmail = 'vikneshwaran@gmail.com';
  const adminPassword = 'Abcdef@07';

  console.log(`Setting up Admin account for ${adminEmail}...`);

  // 1. Try Supabase Auth Sign Up for vikneshwaran@gmail.com with password Abcdef@07
  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: adminEmail,
      password: adminPassword,
      options: {
        data: { full_name: 'Vikneshwaran' },
      },
    });

    if (authError) {
      console.log('Supabase Auth SignUp note:', authError.message);
    } else {
      console.log('✅ Supabase Auth user created successfully:', authData?.user?.id || 'Registered');
    }
  } catch (err) {
    console.warn('Auth signup catch:', err);
  }

  // 2. Try Supabase Auth Sign In to test password Abcdef@07
  try {
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: adminEmail,
      password: adminPassword,
    });

    if (signInError) {
      console.warn('Supabase Auth signIn note:', signInError.message);
    } else {
      console.log('🔑 Verified Supabase Auth login with Abcdef@07 succeeds!');
    }
  } catch (err) {
    console.warn('Auth signin catch:', err);
  }

  // 3. Upsert user_profiles row with role = 'admin'
  const validUuid = crypto.randomUUID();
  const payload = {
    id: validUuid,
    full_name: 'Vikneshwaran',
    email: adminEmail,
    role: 'admin',
    learning_level: 'advanced',
  };

  // Upsert into user_profiles
  const { data: upsertData, error: upsertError } = await supabase
    .from('user_profiles')
    .upsert([payload], { onConflict: 'email' })
    .select();

  if (upsertError) {
    console.warn('Upsert warning (trying update):', upsertError.message);
    const { data: updateData, error: updateError } = await supabase
      .from('user_profiles')
      .update({ role: 'admin', full_name: 'Vikneshwaran' })
      .eq('email', adminEmail)
      .select();

    if (updateError) {
      console.error('❌ Update failed:', updateError.message);
    } else {
      console.log('✅ Updated role = admin for user_profiles:', updateData);
    }
  } else {
    console.log('✅ Successfully created/synced user_profiles with role = admin:', upsertData);
  }

  // 4. Verify current status in database
  const { data: verifyData } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', adminEmail);

  console.log('📊 Current Database Status for vikneshwaran@gmail.com:');
  console.log(JSON.stringify(verifyData, null, 2));
}

setupAdminAccount();
