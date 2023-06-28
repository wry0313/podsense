import Stripe from "stripe";

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

export interface Product {
  id: string;
  active?: boolean;
  name?: string;
  description?: string;
  image?: string;
  metadata?: Stripe.Metadata;
}

export interface Price {
  id: string;
  product_id?: string;
  active?: boolean;
  description?: string;
  unit_amount?: number;
  currency?: string;
  type?: Stripe.Price.Type;
  interval?: Stripe.Price.Recurring.Interval;
  interval_count?: number;
  trial_period_days?: number | null;
  metadata?: Stripe.Metadata;
  products?: Product;
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
  billing_address?: Stripe.Address;
  payment_method?: Stripe.PaymentMethod[Stripe.PaymentMethod.Type];
}

export interface ProductWithPrice extends Product {
  prices?: Price[];
}

export interface Subscription {
  id: string;
  user_id: string;
  status?: Stripe.Subscription.Status;
  metadata?: Stripe.Metadata;
  price_id?: string;
  quantity?: number;
  cancel_at_period_end?: boolean;
  created: string;
  current_period_start: string;
  current_period_end: string;
  ended_at?: string;
  cancel_at?: string;
  canceled_at?: string;
  trial_start?: string;
  trial_end?: string;
  prices?: Price;
}
