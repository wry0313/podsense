import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Podcast } from "@/types";
import toast from "react-hot-toast";

const getPodcasts = async (): Promise<Podcast[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false });
        
        if (error) {
            toast.error("Something went wrong.");
        }

        return (data as Podcast[]) || [];
}

export default getPodcasts;