import { Podcast, Episode } from "@/types";

import { createClient } from "@supabase/supabase-js";

const useLoadImage = (data: Podcast | Episode) => {
  if (!data.image_url) {
    return "";
  }

  if (data.image_url.startsWith("http")) {
    return data.image_url;
  } else {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: imageData } = supabase.storage
      .from("images")
      .getPublicUrl(data.image_url);

    return imageData.publicUrl;
  }
};

export default useLoadImage;
