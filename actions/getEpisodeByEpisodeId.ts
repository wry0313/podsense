import { Episode } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getEpisodeByEpisodeId = async (episode_id: string): Promise<Episode> => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", episode_id)
    .single();

  return data as Episode;
};

export default getEpisodeByEpisodeId;
