

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
  audio_url: string 
  image_url: string 
  created_at: string 
  description: string 
  duration: number 
  host: string 
  id: string
  podcast_id: string 
  podcast_title: string 
  released_date: string | null
  title: string 
  transcript: string | null
  processed: boolean | null
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