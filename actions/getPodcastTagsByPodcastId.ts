import { Tag } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";



const getPodcastTagsByPodcastId = async (
  podcast_id: string,
): Promise<Tag[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data, error } = await supabase
    .from("podcast_tags")
    .select("*")
    .eq("podcast_id", podcast_id)

  return (data as Tag[]) || [];
};

export default getPodcastTagsByPodcastId;
