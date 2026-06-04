// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { supabase, createAdminClient } from "./supabase";

// ─── DESTINATIONS ─────────────────────────────────────────────────────────────

export async function getDestinations(region?: "domestic" | "international") {
  let query = supabase.from("destinations").select("*").order("sort_order", { ascending: true });
  if (region) query = query.eq("region", region);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getDestinationBySlug(slug: string) {
  const { data, error } = await supabase.from("destinations").select("*").eq("slug", slug).single();
  if (error) return null;
  return data;
}

export async function getFeaturedDestinations() {
  const { data, error } = await supabase.from("destinations").select("*").eq("featured", true).order("sort_order").limit(12);
  if (error) throw error;
  return data || [];
}

// ─── PACKAGES ─────────────────────────────────────────────────────────────────

export async function getPackages(filters?: { type?: string; destination_id?: string; featured?: boolean; best_seller?: boolean; limit?: number }) {
  let query = supabase.from("packages").select("*, destinations(name, slug)").order("sort_order");
  if (filters?.type && filters.type !== "all") query = query.eq("type", filters.type);
  if (filters?.destination_id) query = query.eq("destination_id", filters.destination_id);
  if (filters?.featured !== undefined) query = query.eq("featured", filters.featured);
  if (filters?.best_seller !== undefined) query = query.eq("best_seller", filters.best_seller);
  if (filters?.limit) query = query.limit(filters.limit);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function getPackageBySlug(slug: string) {
  const { data, error } = await supabase.from("packages").select("*, destinations(name, slug), itineraries(*), package_images(*)").eq("slug", slug).single();
  if (error) return null;
  return data;
}

export async function getFeaturedPackages(limit = 6) {
  const { data, error } = await supabase.from("packages").select("*, destinations(name, slug)").eq("featured", true).order("sort_order").limit(limit);
  if (error) throw error;
  return data || [];
}

// ─── FIXED DEPARTURES ─────────────────────────────────────────────────────────

export async function getFixedDepartures(status?: string) {
  let query = supabase.from("fixed_departures").select("*, packages(title, slug, cover_image, destinations(name))").gte("departure_date", new Date().toISOString().split("T")[0]).order("departure_date");
  if (status) query = query.eq("status", status);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export async function getTestimonials(featured?: boolean) {
  let query = supabase.from("testimonials").select("*").order("sort_order");
  if (featured) query = query.eq("featured", true);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────

export async function getGalleryImages(featured?: boolean, limit?: number) {
  let query = supabase.from("gallery").select("*").order("sort_order");
  if (featured) query = query.eq("featured", true);
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────

export async function getFAQs(category?: string) {
  let query = supabase.from("faq").select("*").order("sort_order");
  if (category) query = query.eq("category", category);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

export async function getSiteSettings() {
  const { data, error } = await supabase.from("settings").select("*");
  if (error) return {};
  return Object.fromEntries((data || []).map((s: any) => [s.key, s.value]));
}

// ─── INQUIRIES ────────────────────────────────────────────────────────────────

export async function createInquiry(inquiry: Record<string, unknown>) {
  const { data, error } = await supabase.from("inquiries").insert(inquiry as any).select().single();
  if (error) throw error;
  return data;
}

export async function getInquiries(filters?: { status?: string; limit?: number; offset?: number }) {
  const admin = createAdminClient();
  let query = admin.from("inquiries").select("*").order("created_at", { ascending: false });
  if (filters?.status) query = query.eq("status", filters.status);
  if (filters?.limit) query = query.limit(filters.limit);
  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

export async function updateInquiryStatus(id: string, status: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("inquiries").update({ status } as any).eq("id", id);
  if (error) throw error;
}

// ─── ADMIN CRUD ───────────────────────────────────────────────────────────────

export async function upsertDestination(dest: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("destinations").upsert(dest as any).select().single();
  if (error) throw error;
  return data;
}

export async function deleteDestination(id: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("destinations").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertPackage(pkg: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("packages").upsert(pkg as any).select().single();
  if (error) throw error;
  return data;
}

export async function deletePackage(id: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("packages").delete().eq("id", id);
  if (error) throw error;
}

export async function upsertTestimonial(t: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("testimonials").upsert(t as any).select().single();
  if (error) throw error;
  return data;
}

export async function upsertGalleryImage(img: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("gallery").upsert(img as any).select().single();
  if (error) throw error;
  return data;
}

export async function upsertFAQ(faq: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data, error } = await admin.from("faq").upsert(faq as any).select().single();
  if (error) throw error;
  return data;
}

export async function updateSetting(key: string, value: string) {
  const admin = createAdminClient();
  const { error } = await admin.from("settings").upsert({ key, value } as any, { onConflict: "key" });
  if (error) throw error;
}
