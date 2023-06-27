import supabase from "./getSupabaseClient";
import { Episode } from "@/types";


const getEpisodeByPodcastId = async (
  podcast_id: string,
  limitCount: number,
  ascending: boolean,
): Promise<Episode[]> => {

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("podcast_id", podcast_id)
    .order('created_at', { ascending: ascending })
    .limit(limitCount)

    if (error) {
      throw new Error(error.message)
    }

  return (data as Episode[]) || [];
};

export default getEpisodeByPodcastId;
