import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zwufnnegemjoofkfgriz.supabase.co';
const supabaseKey = 'sb_publishable_4UJS1zOwufJQU1tUiJdjIg_ts7o3U3G';

export const supabase = createClient(supabaseUrl, supabaseKey);