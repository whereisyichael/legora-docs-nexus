import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://depsgcxicvdlehhoxgpq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlcHNnY3hpY3ZkbGVoaG94Z3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk4MjQ4MTAsImV4cCI6MjA3NTQwMDgxMH0.vvYSIH6Rb18hfM7v080BcgBq7dUs8UodF98kS7mLUSM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
