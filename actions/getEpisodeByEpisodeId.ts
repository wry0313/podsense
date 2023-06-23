import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Episode } from "@/types";

const getEpisodeByEpisodeId = async (
  episode_id: string
): Promise<Episode> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data , error } = await supabase
    .from("episodes")
    .select("*")
    .eq("id", episode_id)
    .single();

  if (error) {
    console.log(error);
  }

  return (data as Episode);
};

export default getEpisodeByEpisodeId;
