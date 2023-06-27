import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
import { Episode } from "@/types";


const getEpisodeByPodcastId = async (
  podcast_id: string,
  limitCount: number,
): Promise<Episode[]> => {

  const { data, error } = await supabase
    .from("episodes")
    .select("*")
    .eq("podcast_id", podcast_id)
    .order('created_at', { ascending: false })
    .limit(limitCount)

    if (error) {
      throw new Error(error.message)
    }

  return (data as Episode[]) || [];
};

export default getEpisodeByPodcastId;
