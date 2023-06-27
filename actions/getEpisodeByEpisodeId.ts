import { Episode } from "@/types";
import supabase from "./getSupabaseClient";


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
