"use client"

import useLoadImage from "@/hooks/useLoadImage";
import { Podcast } from "@/types";
import Image from "next/image";


const ImageWrapper = async ({
    podcast
}:{
    podcast: Podcast
}) => {
    const imageUrl = useLoadImage(podcast);
    return (
        <Image
              src={imageUrl}
              alt="Liked"
              className="object-cover shadow-2xl"
              fill
        />
    )
}
 
export default ImageWrapper;