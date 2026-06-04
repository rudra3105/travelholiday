export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      destinations: {
        Row: {
          id: string;
          name: string;
          slug: string;
          country: string;
          region: "domestic" | "international";
          description: string | null;
          short_description: string | null;
          cover_image: string | null;
          gallery_images: string[];
          highlights: string[];
          best_time_to_visit: string | null;
          climate: string | null;
          language: string | null;
          currency: string | null;
          timezone: string | null;
          visa_required: boolean;
          featured: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["destinations"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["destinations"]["Insert"]>;
      };
      packages: {
        Row: {
          id: string;
          title: string;
          slug: string;
          destination_id: string | null;
          type: "domestic" | "international" | "honeymoon" | "adventure" | "pilgrimage";
          duration_days: number;
          price_per_person: number;
          original_price: number | null;
          max_people: number;
          min_people: number;
          cover_image: string | null;
          short_description: string | null;
          description: string | null;
          inclusions: string[];
          exclusions: string[];
          highlights: string[];
          featured: boolean;
          best_seller: boolean;
          rating: number;
          reviews_count: number;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["packages"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["packages"]["Insert"]>;
      };
      itineraries: {
        Row: {
          id: string;
          package_id: string;
          day_number: number;
          title: string;
          description: string | null;
          activities: string[];
          meals: string[];
          accommodation: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["itineraries"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["itineraries"]["Insert"]>;
      };
      fixed_departures: {
        Row: {
          id: string;
          package_id: string;
          departure_date: string;
          return_date: string;
          price_per_person: number;
          available_seats: number;
          total_seats: number;
          status: "available" | "limited" | "sold_out" | "cancelled";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["fixed_departures"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["fixed_departures"]["Insert"]>;
      };
      inquiries: {
        Row: {
          id: string;
          type: "general" | "package" | "destination" | "contact";
          name: string;
          email: string;
          phone: string;
          destination: string | null;
          package_id: string | null;
          travel_date: string | null;
          num_travelers: number | null;
          budget: string | null;
          message: string;
          status: "new" | "contacted" | "converted" | "closed";
          admin_notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["inquiries"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
      };
      testimonials: {
        Row: {
          id: string;
          name: string;
          location: string | null;
          avatar: string | null;
          rating: number;
          review: string;
          destination: string | null;
          travel_date: string | null;
          verified: boolean;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["testimonials"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["testimonials"]["Insert"]>;
      };
      gallery: {
        Row: {
          id: string;
          url: string;
          alt: string;
          destination: string | null;
          category: string;
          featured: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["gallery"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["gallery"]["Insert"]>;
      };
      faq: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          sort_order: number;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["faq"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["faq"]["Insert"]>;
      };
      settings: {
        Row: {
          id: string;
          key: string;
          value: string | null;
          type: "text" | "number" | "boolean" | "json" | "image";
          label: string | null;
          group_name: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["settings"]["Row"], "id" | "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["settings"]["Insert"]>;
      };
    };
  };
}
