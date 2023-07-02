import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type UserContextType = {
    user: User | null;
    isLoadingUser: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props{
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const supabase  = createClientComponentClient();
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
      async function getActiveSession() {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
        setIsLoadingUser(false);
      }

      getActiveSession();
    }, []);

    useEffect(() => {
        const {
            data: { subscription },
          } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            router.refresh();
          });
      
          return () => {
            subscription.unsubscribe();
          };
    }, [supabase, router]);
  
    const value = useMemo(() => {
      return {
        isLoadingUser,
        user,
      };
    }, [isLoadingUser, user]);

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () =>{ 
    const context = useContext(UserContext);
    if (context === undefined) {
        console.error("useUser must be used within a MyUserContextProvider")
    }

    return context!;
}