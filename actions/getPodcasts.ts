import { Podcast } from "@/types";

import supabase from "./getSupabaseClient";
// import { cache } from "react";

const getPodcasts = (async (): Promise<Podcast[]> => {
    const { data } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: true });

    return (data as Podcast[]) || [];
})

export default getPodcasts;