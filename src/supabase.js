
import { createClient } from '@supabase/supabase-js'


const supabaseUrl = 'https://************.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "8**************"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;