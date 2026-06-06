// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { supabase, createAdminClient } from "./supabase";

function isAvailable() {
  return !!supabase;
}

export async function getDestinations(region?: string) {
  if (!isAvailable()) return [];
  let q = supabase.from("destinations").select("*").order("sort_order");
  if (region) q = q.eq("region", region);
  const { data } = await q;
  return data || [];
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
  const { data } = await admin.from("destinations").upsert(dest as any).select().single();
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
  const { data } = await admin.from("packages").upsert(pkg as any).select().single();
  return data;
}

export async function deletePackage(id: string) {
  const admin = createAdminClient();
  if (!admin) return;
  await admin.from("packages").delete().eq("id", id);
}

export async function upsertFixedDeparture(dep: Record<string, unknown>) {
  const admin = createAdminClient();
  if (!admin) return dep;
  const { data } = await admin.from("fixed_departures").upsert(dep as any).select().single();
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
