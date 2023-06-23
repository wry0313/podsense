"use client"

// the reason why this exist is becaause this uses a hook useLoadImage and it cannot be used directly in a server component since its a hook
import useLoadImage from "@/hooks/useLoadImage";
import { Episode, Podcast } from "@/types";
import Image from "next/image";

const ImageWrapper = ({
    data
}:{
    data: Podcast | Episode
}) => {
    const imageUrl = useLoadImage(data);
    return (
        <Image
              src={imageUrl}
              alt="Liked"
              className="object-cover rounded-md"
              fill
        />
    )
}
 
export default ImageWrapper;