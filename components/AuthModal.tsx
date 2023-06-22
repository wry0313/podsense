"use client"

import { useSessionContext, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import Modal from "./Modal";
import useAuthModal from "@/hooks/useAuthModal";
import { useEffect } from "react";
import { toast } from "react-hot-toast";



const AuthModal = () => {
    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const session = useSessionContext();
    const { onClose, isOpen } = useAuthModal();
    const user = useUser();

    useEffect(() => {

        if (session) {

            router.refresh()
            onClose();
            if (user && isOpen) {
                toast.success('Logged in successfully')
            }
        }
    }, [session, router, onClose])

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }
    return (
        <Modal
            title="Welcome back"
            description="Login to your account"
            isOpen={isOpen}
            onChange={onChange}
        >
            <Auth
                supabaseClient={supabaseClient}
                magicLink
                appearance={{
                    theme: ThemeSupa, 
                    variables: {
                        default: {
                            colors: {
                                brand: "#00A36C",
                            }
                        }
                    }
                }}
                theme="light"
                providers={["google", "github"]}
            />
        </Modal>
    )

}

export default AuthModal;