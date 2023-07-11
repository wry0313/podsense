export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      customers: {
        Row: {
          id: string
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          stripe_customer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      episodes: {
        Row: {
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
        Insert: {
          audio_url: string
          created_at?: string
          description?: string | null
          duration: number
          host: string
          id: string
          image_url: string
          podcast_id: string
          processed: boolean
          released_date: string
          title: string
          transcript?: Json | null
        }
        Update: {
          audio_url?: string
          created_at?: string
          description?: string | null
          duration?: number
          host?: string
          id?: string
          image_url?: string
          podcast_id?: string
          processed?: boolean
          released_date?: string
          title?: string
          transcript?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "episodes_podcast_id_fkey"
            columns: ["podcast_id"]
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          }
        ]
      }
      liked_podcasts: {
        Row: {
          created_at: string | null
          podcast_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          podcast_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          podcast_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "liked_podcasts_podcast_id_fkey"
            columns: ["podcast_id"]
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "liked_podcasts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      podcast_tags: {
        Row: {
          created_at: string | null
          podcast_id: string
          tag: string
        }
        Insert: {
          created_at?: string | null
          podcast_id: string
          tag: string
        }
        Update: {
          created_at?: string | null
          podcast_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "podcast_tags_podcast_id_fkey"
            columns: ["podcast_id"]
            referencedRelation: "podcasts"
            referencedColumns: ["id"]
          }
        ]
      }
      podcasts: {
        Row: {
          created_at: string
          description: string
          host: string
          id: string
          image_url: string
          title: string
        }
        Insert: {
          created_at?: string
          description: string
          host: string
          id: string
          image_url: string
          title: string
        }
        Update: {
          created_at?: string
          description?: string
          host?: string
          id?: string
          image_url?: string
          title?: string
        }
        Relationships: []
      }
      prices: {
        Row: {
          active: boolean | null
          currency: string | null
          description: string | null
          id: string
          interval: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count: number | null
          metadata: Json | null
          product_id: string | null
          trial_period_days: number | null
          type: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount: number | null
        }
        Insert: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Update: {
          active?: boolean | null
          currency?: string | null
          description?: string | null
          id?: string
          interval?: Database["public"]["Enums"]["pricing_plan_interval"] | null
          interval_count?: number | null
          metadata?: Json | null
          product_id?: string | null
          trial_period_days?: number | null
          type?: Database["public"]["Enums"]["pricing_type"] | null
          unit_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "prices_product_id_fkey"
            columns: ["product_id"]
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      products: {
        Row: {
          active: boolean | null
          description: string | null
          id: string
          image: string | null
          metadata: Json | null
          name: string | null
        }
        Insert: {
          active?: boolean | null
          description?: string | null
          id: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Update: {
          active?: boolean | null
          description?: string | null
          id?: string
          image?: string | null
          metadata?: Json | null
          name?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          cancel_at: string | null
          cancel_at_period_end: boolean | null
          canceled_at: string | null
          created: string
          current_period_end: string
          current_period_start: string
          ended_at: string | null
          id: string
          metadata: Json | null
          price_id: string | null
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"] | null
          trial_end: string | null
          trial_start: string | null
          user_id: string
        }
        Insert: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id: string
        }
        Update: {
          cancel_at?: string | null
          cancel_at_period_end?: boolean | null
          canceled_at?: string | null
          created?: string
          current_period_end?: string
          current_period_start?: string
          ended_at?: string | null
          id?: string
          metadata?: Json | null
          price_id?: string | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"] | null
          trial_end?: string | null
          trial_start?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_price_id_fkey"
            columns: ["price_id"]
            referencedRelation: "prices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          avatar_color: Json | null
          avatar_url: string | null
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_color?: Json | null
          avatar_url?: string | null
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_color?: Json | null
          avatar_url?: string | null
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
