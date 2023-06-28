import { UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser as useSupaUser } from "@supabase/auth-helpers-react";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
    accessToken: string | null;
    user: User | null;
    userDetails: UserDetails | null;
    isLoadingUser: boolean;
    isLoadingData: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(
    undefined
);

export interface Props{
    [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
    const {
        session,
        isLoading: isLoadingUser,
        supabaseClient: supabase
    } = useSessionContext();
    const user = useSupaUser();
    const accessToken = session?.access_token ?? null;
    const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    const getUserDetails = () => supabase.from('users').select('*').single();
    
    useEffect(()=> {
        if (user && !isLoadingData && !userDetails ) {
            setIsLoadingData(true);
            Promise.allSettled([getUserDetails()]).then(
                (results) => {
                    const userDetailsPromise = results[0];

                    if (userDetailsPromise.status === "fulfilled") {
                        setUserDetails(userDetailsPromise.value.data as UserDetails);
                    }

                    setIsLoadingData(false);
                }
            )
        } else if (!user && !isLoadingUser && !isLoadingData) {
            setUserDetails(null);
        }
    }, [user, isLoadingUser]);

    const value = {
        accessToken,
        user,
        userDetails,
        isLoadingUser: isLoadingUser,
        isLoadingData: isLoadingData
    };

    return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () =>{ 
    const context = useContext(UserContext);
    if (context === undefined) {
        console.error("useUser must be used within a MyUserContextProvider")
    }

    return context!;
}