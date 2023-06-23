import { Podcast, Episode } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadImage = (data: Podcast | Episode) => {
    if (!data.cover_image_path) {
        return "";
    }

    const supabaseClient = useSupabaseClient();

    const { data: imageData } = supabaseClient
    .storage.from('images').getPublicUrl(data.cover_image_path);

    return imageData.publicUrl;
}

export default useLoadImage;