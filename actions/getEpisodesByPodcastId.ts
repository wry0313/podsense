import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Episode } from "@/types";

const getEpisodeByPodcastId = async (
  podcast_id: string
): Promise<Episode[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("podcast_id", podcast_id);

  if (error) {
    console.log(error);
  }

  return (data as Episode[]) || [];
};

export default getEpisodeByPodcastId;
