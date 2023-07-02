import { Episode } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getEpisodesByRange = async (podcast_id: string, pageCount: number, sortAscending: boolean): Promise<Episode[]> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const from = 0 * pageCount;
  const to = from + pageCount - 1;

  const { data, error } = await supabase
  .from("episodes")
  .select(
    "id, title, released_date, description, duration, audio_url, image_url, processed"
  )
  .eq("podcast_id", podcast_id)
  .range(from, to)
  .order("released_date", { ascending: sortAscending });

  if (error) {
    return [];
  }

  return data as Episode[];
};

export default getEpisodesByRange;
