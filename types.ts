export interface Message {
  isUser: boolean
  text: string
}

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Podcast {
  created_at: string | null
  description: string | null
  host: string | null
  id: string
  image_url: string | null
  title: string | null
}

export interface Tag {
  created_at: string | null
  id: number
  podcast_id: string | null
  tag: string | null
}

export interface Episode {
  audio_url: string | null
  created_at: string | null
  description: string | null
  duration: number | null
  host: string | null
  id: string
  image_url: string | null
  podcast_id: string | null
  processed: boolean | null
  released_date: string | null
  title: string | null
  transcript: object[] | null
}


export interface Customer {
  id: string;
  stripe_customer_id?: string;
}

export interface UserDetails {
  id: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  avatar_url?: string;
}