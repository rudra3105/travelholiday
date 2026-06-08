// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { supabase, createAdminClient } from "./supabase";

function isAvailable() {
  return !!supabase;
}

export async function getDestinations(region?: string) {
  if (!isAvailable()) return [];
  // Fetch destinations with package counts and minimum prices
  let q = supabase.from("destinations").select(`
    *,
    packages(count),
    min_price:packages(price_per_person)
  `).order("sort_order");
  
  if (region) q = q.eq("region", region);
  const { data } = await q;

  // Process data to calculate count and min_price manually if needed or from nested objects
  return (data || []).map(dest => {
    const packages = dest.packages || [];
    const prices = dest.min_price || [];
    const minPrice = prices.length > 0 
      ? Math.min(...prices.map((p: any) => parseFloat(p.price_per_person))) 
      : 0;
    
    return {
      ...dest,
      packages_count: Array.isArray(packages) ? packages.length : (dest.packages?.[0]?.count || 0),
      starting_from: minPrice
    };
  });
}

export async function getDestinationBySlug(slug: string) {
  if (!isAvailable()) return null;
  const { data } = await supabase.from("destinations").select("*").eq("slug", slug).single();
  return data;
}

export async function getFeaturedDestinations() {
  if (!isAvailable()) return [];
  const { data } = await supabase.from("destinations").select("*").eq("featured", true).order("sort_order").limit(12);
  return data || [];
}

export async function getPackages(filters?: any) {
  if (!isAvailable()) return [];
  let q = supabase.from("packages").select("*, destinations(name, slug), itineraries(*)").order("sort_order");
  if (filters?.type && filters.type !== "all") q = q.eq("type", filters.type);
  if (filters?.destination_id) q = q.eq("destination_id", filters.destination_id);
  if (filters?.featured !== undefined) q = q.eq("featured", filters.featured);
  if (filters?.best_seller !== undefined) q = q.eq("best_seller", filters.best_seller);
  if (filters?.limit) q = q.limit(filters.limit);
  const { data } = await q;
  return data || [];
}

export async function getPackageBySlug(slug: string) {
  if (!isAvailable()) return null;
  const { data } = await supabase.from("packages").select("*, destinations(name, slug), itineraries(*), package_images(*)").eq("slug", slug).single();
  return data;
}

export async function getFeaturedPackages(limit = 6) {
  if (!isAvailable()) return [];
  const { data } = await supabase.from("packages").select("*, destinations(name, slug)").eq("featured", true).order("sort_order").limit(limit);
  return data || [];
}

export async function getFixedDepartures(status?: string) {
  if (!isAvailable()) return [];
  let q = supabase.from("fixed_departures").select("*, packages(title, slug, cover_image, destinations(name))").gte("departure_date", new Date().toISOString().split("T")[0]).order("departure_date");
  if (status) q = q.eq("status", status);
  const { data } = await q;
  return data || [];
}

export async function getTestimonials(featured?: boolean) {
  if (!isAvailable()) return [];
  let q = supabase.from("testimonials").select("*").order("sort_order");
  if (featured) q = q.eq("featured", true);
  const { data } = await q;
  return data || [];
}

export async function getGalleryImages(featured?: boolean, limit?: number) {
  if (!isAvailable()) return [];
  let q = supabase.from("gallery").select("*").order("sort_order");
  if (featured) q = q.eq("featured", true);
  if (limit) q = q.limit(limit);
  const { data } = await q;
  return data || [];
}

export async function getFAQs(category?: string) {
  if (!isAvailable()) return [];
  let q = supabase.from("faq").select("*").order("sort_order");
  if (category) q = q.eq("category", category);
  const { data } = await q;
  return data || [];
}

export async function getSiteSettings() {
  if (!isAvailable()) return {};
  const { data } = await supabase.from("settings").select("*");
  return Object.fromEntries((data || []).map((s: any) => [s.key, s.value]));
}

export async function createInquiry(inquiry: Record<string, unknown>) {
  if (!isAvailable()) { console.log("INQUIRY:", JSON.stringify(inquiry)); return inquiry; }
  const { data, error } = await supabase.from("inquiries").insert(inquiry as any).select().single();
  if (error) throw error;
  return data;
}

export async function getInquiries(filters?: any) {
  if (!isAvailable()) return [];
  const admin = createAdminClient();
  if (!admin) return [];
  let q = admin.from("inquiries").select("*").order("created_at", { ascending: false });
  if (filters?.status) q = q.eq("status", filters.status);
  if (filters?.limit) q = q.limit(filters.limit);
  const { data } = await q;
  return data || [];
}

export async function updateInquiryStatus(id: string, status: string) {
  if (!isAvailable()) return;
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("inquiries").update({ status } as any).eq("id", id);
}

export async function upsertDestination(dest: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return dest;

  const validColumns = [
    "id", "name", "slug", "country", "region", "description",
    "short_description", "cover_image", "gallery_images", "highlights",
    "best_time_to_visit", "climate", "language", "currency", "timezone",
    "visa_required", "featured", "sort_order", "starting_price", "updated_at"
  ];

  const destData = Object.fromEntries(
    Object.entries(dest).filter(([key]) => validColumns.includes(key))
  );

  if (destData.id) {
    destData.updated_at = new Date().toISOString();
  }

  const { data, error } = await admin
    .from("destinations")
    .upsert(destData as any)
    .select()
    .single();

  if (error) {
    console.error("UPSERT DESTINATION ERROR:", error);
    throw error;
  }
  return data;
}

export async function deleteDestination(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("destinations").delete().eq("id", id);
}

export async function upsertPackage(pkg: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return pkg;

  // Extract itinerary and other relations
  const { itinerary, destinations, package_images, destination_name, ...rawData } = pkg;

  // List of valid columns in 'packages' table to avoid PostgREST errors
  const validColumns = [
    "id", "title", "slug", "destination_id", "type", "duration_days",
    "price_per_person", "original_price", "max_people", "min_people",
    "cover_image", "short_description", "description", "inclusions",
    "exclusions", "highlights", "featured", "best_seller", "rating",
    "reviews_count", "sort_order", "updated_at"
  ];

  const packageData = Object.fromEntries(
    Object.entries(rawData).filter(([key]) => validColumns.includes(key))
  );
  
  if (packageData.id) {
    packageData.updated_at = new Date().toISOString();
  }

  // 1. Save main package data
  const { data: savedPackage, error: pkgError } = await admin
    .from("packages")
    .upsert(packageData as any)
    .select()
    .single();

  if (pkgError) {
    console.error("UPSERT PACKAGE ERROR:", pkgError);
    throw pkgError;
  }

  // 2. Save itinerary if provided
  if (itinerary && Array.isArray(itinerary)) {
    // Delete old itinerary first to keep it clean
    await admin.from("itineraries").delete().eq("package_id", savedPackage.id);

    // Insert new itinerary
    const itineraryData = itinerary.map((day: any) => ({
      ...day,
      package_id: savedPackage.id,
    }));
    
    if (itineraryData.length > 0) {
      const { error: itinError } = await admin.from("itineraries").insert(itineraryData as any);
      if (itinError) console.error("Error saving itinerary:", itinError);
    }
  }

  return savedPackage;
}

export async function deletePackage(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("packages").delete().eq("id", id);
}

export async function upsertFixedDeparture(dep: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return dep;

  // Only pass columns that exist in the fixed_departures table
  const validColumns = [
    "id", "package_id", "departure_date", "return_date",
    "price_per_person", "available_seats", "total_seats", "status"
  ];
  const depData = Object.fromEntries(
    Object.entries(dep).filter(([key]) => validColumns.includes(key))
  );

  if (!depData.package_id) {
    throw new Error("package_id is required for fixed departures");
  }

  const { data, error } = await admin.from("fixed_departures").upsert(depData as any).select().single();
  if (error) {
    console.error("UPSERT FIXED DEPARTURE ERROR:", error);
    throw error;
  }
  return data;
}

export async function deleteFixedDeparture(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("fixed_departures").delete().eq("id", id);
}

export async function upsertTestimonial(t: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return t;
  const { data } = await admin.from("testimonials").upsert(t as any).select().single();
  return data;
}

export async function deleteTestimonial(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("testimonials").delete().eq("id", id);
}

export async function upsertGalleryImage(img: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return img;
  const { data } = await admin.from("gallery").upsert(img as any).select().single();
  return data;
}

export async function deleteGalleryImage(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("gallery").delete().eq("id", id);
}

export async function upsertFAQ(faq: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return faq;
  const { data } = await admin.from("faq").upsert(faq as any).select().single();
  return data;
}

export async function deleteFAQ(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("faq").delete().eq("id", id);
}

export async function updateSetting(key: string, value: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("settings").upsert({ key, value } as any, { onConflict: "key" });
}
