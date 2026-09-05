// assets/js/supabaseClient.js

// ✅ Initialize Supabase client
const SUPABASE_URL = "https://hfhvbvddffbezjecqusy.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmaHZidmRkZmZiZXpqZWNxdXN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTUyNjMsImV4cCI6MjA3NDUzMTI2M30.6_n4KVqrK6KlivcrD5CQeAcp1Wr8Ng_8Jqp2e_uiviA";

// Make sure Supabase is available globally
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

console.log("✅ Supabase client initialized");
