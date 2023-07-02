import { Tag } from "@/types";
import supabase from "./getSupabaseClient";

const getPodcastTagsByPodcastId = async (
  podcast_id: string,
): Promise<Tag[]> => {

  const { data } = await supabase
    .from("podcast_tags")
    .select("*")
    .eq("podcast_id", podcast_id)

  return (data as Tag[]) || [];
};

export default getPodcastTagsByPodcastId;
