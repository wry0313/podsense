import supabase from "./getSupabaseClient";
import { Tag } from "@/types";


const getPodcastTagsByPodcastId = async (
  podcast_id: string,
): Promise<Tag[]> => {

  const { data, error } = await supabase
    .from("podcast_tags")
    .select("*")
    .eq("podcast_id", podcast_id)

  return (data as Tag[]) || [];
};

export default getPodcastTagsByPodcastId;
