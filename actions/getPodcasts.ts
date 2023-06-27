import { Podcast } from "@/types";

import supabase from "./getSupabaseClient";

const getPodcasts = async (): Promise<Podcast[]> => {

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: true });
        
        if (error) {
           
        }

        return (data as Podcast[]) || [];
}

export default getPodcasts;