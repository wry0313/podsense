"use client";

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

import { useEffect } from "react";
import { toast } from "react-hot-toast";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

import Modal from "./Modal";


const AuthModal = () => {
  const supabaseClient = useSupabaseClient();
  const { onClose, isOpen } = useAuthModal();
  const user = useUser();

  useEffect(() => {
    if (user.user && isOpen) {
      toast.success("Logged in successfully");
      onClose();
    }
  }, [user]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#00A36C",
              },
            },
          },
        }}
        theme="light"
        providers={["google", "github"]}
      />
    </Modal>
  );
};

export default AuthModal;
