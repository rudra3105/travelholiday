export interface Destination {
  id: string;
  name: string;
  slug: string;
  country: string;
  region: "domestic" | "international";
  description: string;
  short_description: string;
  cover_image: string;
  gallery_images: string[];
  highlights: string[];
  best_time_to_visit: string;
  climate: string;
  language: string;
  currency: string;
  timezone: string;
  visa_required: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Package {
  id: string;
  title: string;
  slug: string;
  destination_id: string;
  destination?: Destination;
  type: "domestic" | "international" | "honeymoon" | "adventure" | "pilgrimage";
  duration_days: number;
  price_per_person: number;
  original_price: number;
  max_people: number;
  min_people: number;
  cover_image: string;
  short_description: string;
  description: string;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  itinerary?: Itinerary[];
  images?: PackageImage[];
  featured: boolean;
  best_seller: boolean;
  rating: number;
  reviews_count: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PackageImage {
  id: string;
  package_id: string;
  url: string;
  alt: string;
  sort_order: number;
}

export interface Itinerary {
  id: string;
  package_id: string;
  day_number: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface FixedDeparture {
  id: string;
  package_id: string;
  package?: Package;
  departure_date: string;
  return_date: string;
  price_per_person: number;
  available_seats: number;
  total_seats: number;
  status: "available" | "limited" | "sold_out" | "cancelled";
  created_at: string;
}

export interface Inquiry {
  id: string;
  type: "general" | "package" | "destination" | "contact";
  name: string;
  email: string;
  phone: string;
  destination?: string;
  package_id?: string;
  travel_date?: string;
  num_travelers?: number;
  budget?: string;
  message: string;
  status: "new" | "contacted" | "converted" | "closed";
  admin_notes?: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  review: string;
  destination: string;
  travel_date: string;
  verified: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  destination?: string;
  category: string;
  featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  created_at: string;
}

export interface SiteSettings {
  id: string;
  key: string;
  value: string;
  type: "text" | "number" | "boolean" | "json" | "image";
  label: string;
  group: string;
}
