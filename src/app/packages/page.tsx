import type { Metadata } from "next";
import { PackageCard } from "@/components/sections/package-card";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getPackages } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tour Packages",
  description: "Browse 100+ handcrafted tour packages — domestic, international, honeymoon, adventure, and pilgrimage tours.",
};

const PACKAGE_TYPES = [
  { key: "all", label: "All Packages" },
  { key: "domestic", label: "Domestic" },
  { key: "international", label: "International" },
  { key: "honeymoon", label: "Honeymoon" },
  { key: "adventure", label: "Adventure" },
  { key: "pilgrimage", label: "Pilgrimage" },
];

type Props = { searchParams: Promise<{ type?: string; destination?: string }> };

export default async function PackagesPage({ searchParams }: Props) {
  const { type = "all", destination } = await searchParams;

  const dbPackages = await getPackages({ type, destination_id: destination });
  
  // Map DB packages to match the UI structure
  const packages = dbPackages.map((p: any) => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    destination: p.destinations?.name || p.destination || "India",
    duration_days: p.duration_days,
    price_per_person: p.price_per_person,
    original_price: p.original_price,
    cover_image: p.cover_image,
    short_description: p.short_description || "",
    rating: p.rating,
    reviews_count: p.reviews_count,
    best_seller: p.best_seller,
    featured: p.featured,
    type: p.type,
  }));

  return (
    <>
      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-brand-900 via-brand-800 to-brand-700">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Our <span className="text-gold-400">Tour Packages</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Handcrafted itineraries for every type of traveler — from budget to luxury
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 flex-wrap mb-10">
            {PACKAGE_TYPES.map((t) => (
              <a
                key={t.key}
                href={`/packages${t.key === "all" ? "" : `?type=${t.key}`}`}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  type === t.key
                    ? "bg-brand-500 text-white shadow-md"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                )}
              >
                {t.label}
              </a>
            ))}
          </div>

          {destination && (
            <div className="mb-6 flex items-center gap-3">
              <span className="text-gray-600">Showing packages for: <strong>{destination}</strong></span>
              <a href="/packages" className="text-sm text-brand-600 hover:underline">Clear filter</a>
            </div>
          )}

          {packages.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No packages found. <a href="/packages" className="text-brand-600 hover:underline">View all packages</a></p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg: any, i: number) => (
                <PackageCard key={pkg.id} {...pkg} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
      <ContactCTASection />
    </>
  );
}
