import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, NextRequest } from "next/server";

import { Database  } from "./types_db";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const subpabase = createMiddlewareClient<Database>({
    req,
    res,
  });

  await subpabase.auth.getSession(); // The getSession function must be called for any Server Component routes that use a Supabase client.
  
  return res;
}

// this code allows us to load podcast even with restrictions podcast for authenticated users

// In Next.js Server Components, you can read a cookie, but you can't write back to it. Middleware on the other hand, allow you to both read a write to cookies.
