export interface Message {
  isUser: boolean
  text: string
}

export interface TextMetadata {
  episode_id: string
  podcast_id: string
  title: string
  timestamp: number
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
  created_at: string
  description: string
  host: string
  id: string
  image_url: string
  title: string
}

export interface Tag {
  created_at: string 
  id: number
  podcast_id: string 
  tag: string
}

export interface Episode {
  audio_url: string
  created_at: string
  description: string | null
  duration: number
  host: string
  id: string
  image_url: string
  podcast_id: string
  processed: boolean
  released_date: string
  title: string
  transcript: Json | null
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