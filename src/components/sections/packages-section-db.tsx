import { PackagesSectionClient } from "./packages-section-client";
import { getFeaturedPackages } from "@/lib/db";

export async function PackagesSectionDB() {
  let packages: any[] = [];

  try {
    const dbPackages = await getFeaturedPackages(6);
    if (dbPackages && dbPackages.length > 0) {
      packages = dbPackages.map((p: any) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        destination: p.destinations?.name || "India",
        duration_days: p.duration_days,
        price_per_person: p.price_per_person,
        original_price: p.original_price,
        cover_image: p.cover_image || "",
        short_description: p.short_description || "",
        rating: p.rating,
        reviews_count: p.reviews_count,
        best_seller: p.best_seller,
        featured: p.featured,
        type: p.type,
      }));
    }
  } catch {
    // DB not configured yet
  }

  if (packages.length === 0) return null;

  return <PackagesSectionClient packages={packages} />;
}
