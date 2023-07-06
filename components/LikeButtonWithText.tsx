"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface LikeButtonWithTextProps {
  podcast_id: string;
}

const LikeButtonWithText = ({ podcast_id }: LikeButtonWithTextProps) => {

  const supabase = createClientComponentClient();

  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      setIsLiked(false);
      return;
  }

    const fetchData = async () => {
      const { data, error } = await supabase
        .from("liked_podcasts")
        .select("*")
        .eq("user_id", user.id)
        .eq("podcast_id", podcast_id)
        .single();

      if (!error && data) {
        setIsLiked(true);
      }
    };

    fetchData();
  }, [podcast_id, supabase, user]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (isLiked) {
      const { error } = await supabase
        .from("liked_podcasts")
        .delete()
        .eq("user_id", user.id)
        .eq("podcast_id", podcast_id);

      if (error) {
        toast.error("Something went wrong.");
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabase.from("liked_podcasts").insert({
        podcast_id: podcast_id,
        user_id: user.id,
      });

      if (error) {
        toast.error("Something went wrong.");
      } else {
        setIsLiked(true);
        toast.success("Saved to your Library");
      }
    }


  };

  return (
    <button
    aria-label='like button'
      onClick={handleLike}
      className="flex flex-row gap-x-2 bg-neutral-100 dark:bg-dark-100 rounded-md p-1 px-2 w-fit cursor-pointer"
    >
      <div className="hover:opacity-75 transition">
        <Icon color={isLiked ? "#22c55e" : "gray"} size={25} />
      </div>
      <p className="font-semibold text-md"> {isLiked ? "Following" : "Follow"} </p>
    </button>
  );
};

export default LikeButtonWithText;
