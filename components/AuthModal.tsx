"use client";

import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import Modal from "./Modal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useTheme } from "next-themes";

const AuthModal = () => {
  const supabaseClient = createClientComponentClient();
  const { onClose, isOpen } = useAuthModal();
  const {user} = useUser()
  const {theme} = useTheme()

  useEffect(() => {
    if (user && isOpen) {
      toast.success("Logged in successfully");
      onClose();
    }
  }, [user, isOpen, onClose]);

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
        theme={theme}
        providers={["google", "github"]}
      />
    </Modal>
  );
};

export default AuthModal;
