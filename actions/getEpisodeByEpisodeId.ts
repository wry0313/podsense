import { Episode } from "@/types";

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)


const getEpisodeByEpisodeId = async (
  episode_id: string
): Promise<Episode> => {

  const { data , error } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", episode_id)
    .single();

  if (error) {
    
  }

  return (data as Episode);
};

export default getEpisodeByEpisodeId;
