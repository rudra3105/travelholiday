"use server";

import { revalidatePath } from "next/cache";
import { 
  upsertDestination, deleteDestination, 
  upsertPackage, deletePackage,
  upsertFixedDeparture, deleteFixedDeparture,
  upsertTestimonial, deleteTestimonial,
  upsertGalleryImage, deleteGalleryImage,
  upsertFAQ, deleteFAQ,
  updateSetting
} from "@/lib/db";

export async function saveDestinationAction(dest: any) {
  const res = await upsertDestination(dest);
  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  if (dest.slug) revalidatePath(`/destinations/${dest.slug}`);
  revalidatePath("/", "layout"); // Force global revalidation to be safe
  return res;
}

export async function deleteDestinationAction(id: string) {
  await deleteDestination(id);
  revalidatePath("/admin/destinations");
  revalidatePath("/destinations");
  revalidatePath("/", "layout");
}

export async function savePackageAction(pkg: any) {
  const res = await upsertPackage(pkg);
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  if (pkg.slug) revalidatePath(`/packages/${pkg.slug}`);
  revalidatePath("/", "layout");
  return res;
}

export async function deletePackageAction(id: string) {
  await deletePackage(id);
  revalidatePath("/admin/packages");
  revalidatePath("/packages");
  revalidatePath("/", "layout");
}

export async function saveFixedDepartureAction(dep: any) {
  const res = await upsertFixedDeparture(dep);
  revalidatePath("/admin/departures");
  revalidatePath("/fixed-departures");
  return res;
}

export async function deleteFixedDepartureAction(id: string) {
  await deleteFixedDeparture(id);
  revalidatePath("/admin/departures");
  revalidatePath("/fixed-departures");
}

export async function saveTestimonialAction(t: any) {
  const res = await upsertTestimonial(t);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
  return res;
}

export async function deleteTestimonialAction(id: string) {
  await deleteTestimonial(id);
  revalidatePath("/admin/testimonials");
  revalidatePath("/testimonials");
}

export async function saveGalleryImageAction(img: any) {
  const res = await upsertGalleryImage(img);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
  return res;
}

export async function deleteGalleryImageAction(id: string) {
  await deleteGalleryImage(id);
  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function saveFAQAction(faq: any) {
  const res = await upsertFAQ(faq);
  revalidatePath("/admin/faqs");
  return res;
}

export async function deleteFAQAction(id: string) {
  await deleteFAQ(id);
  revalidatePath("/admin/faqs");
}

export async function updateSettingAction(key: string, value: string) {
  await updateSetting(key, value);
  revalidatePath("/admin/settings");
}
