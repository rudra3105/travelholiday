import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Globe, ArrowRight, Check, Package } from "lucide-react";
import { PackageCard } from "@/components/sections/package-card";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { DESTINATIONS_DOMESTIC, DESTINATIONS_INTERNATIONAL } from "@/lib/constants";
import { FEATURED_PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const ALL_DESTINATIONS = [...DESTINATIONS_DOMESTIC, ...DESTINATIONS_INTERNATIONAL];

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return ALL_DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = ALL_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: dest.name,
    description: `Explore ${dest.name} tour packages. ${dest.tagline}. Starting from ${formatCurrency(dest.starting_from)}.`,
  };
}

const DESTINATION_DETAILS: Record<string, { description: string; highlights: string[]; best_time: string; gallery: string[] }> = {
  kerala: {
    description: "Kerala, often called 'God's Own Country', is a tropical paradise on India's southwestern coast. Famous for its serene backwaters, lush tea plantations, pristine beaches, wildlife sanctuaries, and rich Ayurvedic heritage.",
    highlights: ["Alleppey Backwaters Houseboat", "Munnar Tea Gardens", "Periyar Wildlife Sanctuary", "Kovalam Beach", "Thekkady Spice Plantations", "Athirapally Waterfalls"],
    best_time: "October to March",
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
      "https://images.unsplash.com/photo-1580753552462-38b78a34b2f0?w=600&q=80",
    ],
  },
  rajasthan: {
    description: "Rajasthan, the 'Land of Kings', is India's largest state and a treasure trove of history, culture, and color. Marvel at magnificent forts and palaces, wander through vibrant bazaars, and experience the magic of golden sand dunes.",
    highlights: ["Amber Fort, Jaipur", "Mehrangarh Fort, Jodhpur", "Jaisalmer Desert Safari", "City Palace, Udaipur", "Pushkar Fair", "Ranthambore Tiger Reserve"],
    best_time: "October to March",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80",
      "https://images.unsplash.com/photo-1477587458883-47145ed68560?w=600&q=80",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80",
    ],
  },
  bali: {
    description: "Bali, the 'Island of Gods', is Indonesia's most iconic destination. From ancient Hindu temples and emerald rice terraces to world-class surf breaks and luxury resorts, Bali offers an unmatched blend of culture, nature, and adventure.",
    highlights: ["Tanah Lot Temple", "Ubud Monkey Forest", "Tegalalang Rice Terraces", "Mount Batur Sunrise Trek", "Seminyak Beach Clubs", "Nusa Penida Island"],
    best_time: "April to October",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
      "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=80",
    ],
  },
};

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = ALL_DESTINATIONS.find((d) => d.slug === slug);
  if (!dest) notFound();

  const details = DESTINATION_DETAILS[slug] || {
    description: `${dest.name} is a stunning destination. Explore our curated packages for an unforgettable experience.`,
    highlights: ["Iconic landmarks", "Local cuisine", "Cultural experiences", "Nature & wildlife", "Adventure activities", "Photography spots"],
    best_time: "October to April",
    gallery: [dest.image],
  };

  const relatedPackages = FEATURED_PACKAGES.filter((p) =>
    p.destination.toLowerCase().includes(dest.name.toLowerCase().split(" ")[0])
  ).slice(0, 3);

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={dest.image} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{dest.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{dest.name}</h1>
            <div className="flex items-center gap-2 text-gold-400 text-lg font-medium">
              <MapPin className="h-5 w-5" />{dest.tagline}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="bg-brand-50 rounded-2xl p-4 text-center">
                  <Package className="h-6 w-6 text-brand-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-brand-700">{dest.packages}+</div>
                  <div className="text-xs text-gray-500">Packages</div>
                </div>
                <div className="bg-gold-50 rounded-2xl p-4 text-center">
                  <Globe className="h-6 w-6 text-gold-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gold-700">{formatCurrency(dest.starting_from)}</div>
                  <div className="text-xs text-gray-500">Starting From</div>
                </div>
                <div className="bg-emerald-50 rounded-2xl p-4 text-center">
                  <Calendar className="h-6 w-6 text-emerald-500 mx-auto mb-2" />
                  <div className="text-sm font-bold text-emerald-700">{details.best_time}</div>
                  <div className="text-xs text-gray-500">Best Time</div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {dest.name}</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{details.description}</p>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {details.highlights.map((h) => (
                  <div key={h} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
                    <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center shrink-0">
                      <Check className="h-4 w-4 text-brand-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{h}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {details.gallery.map((img, i) => (
                  <div key={i} className="aspect-square rounded-2xl overflow-hidden">
                    <img src={img} alt={`${dest.name} ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>

              {relatedPackages.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{dest.name} Packages</h2>
                  <div className="grid gap-6">
                    {relatedPackages.map((pkg, i) => (
                      <PackageCard key={pkg.id} {...pkg} index={i} />
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link href={`/packages?destination=${encodeURIComponent(dest.name)}`} className="inline-flex items-center gap-2 text-brand-600 font-semibold hover:underline">
                      View all {dest.name} packages <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Plan Your {dest.name} Trip</h3>
                <p className="text-gray-500 text-sm mb-6">Get a free customized itinerary from our experts</p>
                <InquiryForm destination={dest.name} compact />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ContactCTASection />
    </>
  );
}
