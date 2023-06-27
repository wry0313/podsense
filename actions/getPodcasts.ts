import { Podcast } from "@/types";

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

const getPodcasts = async (): Promise<Podcast[]> => {

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: true });
        
        if (error) {
           
        }

        return (data as Podcast[]) || [];
}

export default getPodcasts;