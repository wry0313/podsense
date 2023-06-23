"use client"

import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface LikeButtonProps {
    podcast_id: string;
}

const LikeButton = ({
    podcast_id
}:LikeButtonProps) => {
    const router = useRouter();
    const { supabaseClient} = useSessionContext();

    const authModal = useAuthModal();
    const { user } = useUser();

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            const { data, error } = await supabaseClient
                .from('liked_podcasts')
                .select('*')
                .eq('user_id', user.id)
                .eq('podcast_id', podcast_id)
                .single();
                
            if (!error && data) {
                setIsLiked(true);
            }
        }

        fetchData()
    }, [podcast_id, supabaseClient, user?.id])

    const Icon = isLiked ? AiFillHeart : AiOutlineHeart

    const handleLike = async () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (isLiked) {
            const { error } = await supabaseClient
            .from('liked_podcasts')
            .delete()
            .eq('user_id', user.id)
            .eq('podcast_id', podcast_id)

            if (error) {
                toast.error("Something went wrong.");
            } else {
                setIsLiked(false);

            }
        } else {
            const { error } = await supabaseClient
            .from('liked_podcasts')
            .insert({
                podcast_id: podcast_id,
                user_id: user.id
            });

            if (error) {
                toast.error("Something went wrong.");
            } else {
                setIsLiked(true);
                toast.success('Saved to your Library');

            }
        }        
        
        router.refresh();
    }

    return ( 
        <button
        onClick={handleLike}
        className="hover:opacity-75 transition"
        >
            <Icon color={isLiked ? '#22c55e' : 'gray'}
            size={25  }
            />
        </button>
     );
}
 
export default LikeButton;
