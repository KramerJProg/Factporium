
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rxlgojnmxfechnupltaz.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bGdvam5teGZlY2hudXBsdGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMzgyOTUsImV4cCI6MjAxNjYxNDI5NX0.-4PG7ztIBZTboV37ZSwlfOmLGkhKv89ZxlUTNZvoZu4"
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;