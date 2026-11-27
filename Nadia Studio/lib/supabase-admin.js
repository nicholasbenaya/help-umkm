import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!serviceRoleKey && process.env.NODE_ENV === 'production') {
  console.warn('SUPABASE_SERVICE_ROLE_KEY is missing. Admin operations will fail.');
}

// Client khusus server-side dengan akses penuh (Service Role)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
