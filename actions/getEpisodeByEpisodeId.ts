import { Episode } from "@/types";
import supabase from "./getSupabaseClient";

const getEpisodeByEpisodeId = async (episode_id: string): Promise<Episode> => {

  const { data } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", episode_id)
    .single();

  return data as Episode;
};

export default getEpisodeByEpisodeId;
