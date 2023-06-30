import { Podcast } from "@/types";

import supabase from "./getSupabaseClient";


const getPodcastById = async (id: string): Promise<Podcast> => {

  const { data } = await supabase
    .from('podcasts')
    .select('*')
    .eq('id', id)
    .single();


  return (data as any) || null;
};

export default getPodcastById;