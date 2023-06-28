"use client";
import Button from "@/components/Button";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Account() {
  const router = useRouter();
  const { isLoadingUser, user } = useUser();


  useEffect(() => {
    if (!isLoadingUser && !user) {
      router.replace("/");
    }
  }, [isLoadingUser, user, router]);

  const supabaseClient = useSupabaseClient();
  // IMPORTANT: we use useSupabaseClient when everything we read are public to read for everyone (unathenticated users)
  // however if something can only be read with authenticated user, we use useSessionContext instead

  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    // Reset any playing podcast in the future
    router.replace("/");

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Logged out successfully");
    }
  };
  return (
    <div className="mt-2 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-black text-3xl font-semibold">
          Manage your account settings.
        </h1>
      </div>
      <Button onClick={handleLogout} className="px-4 py-1 w-fit mt-4">
        Logout
      </Button>
    </div>
  );
}
