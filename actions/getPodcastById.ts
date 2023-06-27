import { Podcast } from "@/types";

import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


const getPodcastById = async (id: string): Promise<Podcast> => {

  const { data, error } = await supabase
    .from('podcasts')
    .select('*')
    .eq('id', id)
    .single();


  return (data as any) || null;
};

export default getPodcastById;