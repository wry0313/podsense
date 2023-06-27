"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Database } from "@/types_db";

interface SupabaseProviderProps {
  children: React.ReactNode;
};

const SupabaseProvider: React.FC<SupabaseProviderProps> = ({
  children
}) => {
    const [supabaseClient] = useState(() =>
    createClientComponentClient<Database>()
  );

  return ( 
    <SessionContextProvider supabaseClient={supabaseClient}>
      {children}
    </SessionContextProvider>
    // The UserProvider has been replaced by the SessionContextProvider. Make sure to wrap your pages/_app.js componenent with the SessionContextProvider. Then, throughout your application you can use the useSessionContext hook to get the session and the useSupabaseClient hook to get an authenticated supabaseClient.
  );
}
 
export default SupabaseProvider;