import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Users, Star, Check, X, Phone, ArrowRight, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { FEATURED_PACKAGES } from "@/lib/data";
import { formatCurrency, getDurationLabel } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

export async function generateStaticParams() {
  return FEATURED_PACKAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pkg = FEATURED_PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) return { title: "Package Not Found" };
  return {
    title: pkg.title,
    description: pkg.short_description,
  };
}

const PACKAGE_EXTRAS: Record<string, {
  inclusions: string[];
  exclusions: string[];
  itinerary: { day: number; title: string; description: string }[];
  gallery: string[];
}> = {
  "kerala-backwaters-munnar": {
    inclusions: ["5 nights accommodation (3★/4★ hotels)", "Daily breakfast & dinner", "Houseboat stay in Alleppey", "AC vehicle transfers", "Munnar sightseeing", "English-speaking guide", "All toll & parking charges"],
    exclusions: ["Airfare/Train fare", "Lunch", "Personal expenses", "Camera charges at monuments", "Travel insurance", "Anything not mentioned in inclusions"],
    itinerary: [
      { day: 1, title: "Arrival in Kochi", description: "Arrive at Kochi airport/railway station. Transfer to hotel. Evening visit to Fort Kochi, Chinese fishing nets, and Dutch Palace. Overnight in Kochi." },
      { day: 2, title: "Kochi to Munnar (130 km)", description: "Morning drive to Munnar through lush green valleys. Visit Cheeyappara Waterfalls and Valara Waterfalls en route. Afternoon explore tea gardens. Overnight in Munnar." },
      { day: 3, title: "Munnar Sightseeing", description: "Full day excursion — Mattupetty Dam, Echo Point, Kundala Lake, Top Station. Evening visit the Tea Museum. Overnight in Munnar." },
      { day: 4, title: "Munnar to Alleppey (165 km)", description: "Morning drive to Alleppey. Check into houseboat by noon. Cruise through serene backwaters, paddy fields, and fishing villages. Overnight on houseboat." },
      { day: 5, title: "Alleppey to Kovalam (155 km)", description: "Morning disembark from houseboat. Drive to Kovalam beach resort. Evening free at Kovalam beach. Overnight at Kovalam." },
      { day: 6, title: "Kovalam & Departure", description: "Morning at leisure at beach. After lunch, transfer to Trivandrum airport/railway station for onward journey." },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=80",
      "https://images.unsplash.com/photo-1593693411515-c20261bcad6e?w=600&q=80",
      "https://images.unsplash.com/photo-1580753552462-38b78a34b2f0?w=600&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    ],
  },
};

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = FEATURED_PACKAGES.find((p) => p.slug === params.slug);
  if (!pkg) notFound();

  const extras = PACKAGE_EXTRAS[params.slug] || {
    inclusions: ["Hotel accommodation", "Daily breakfast", "AC vehicle transfers", "Sightseeing as per itinerary", "English-speaking guide"],
    exclusions: ["Airfare/Train fare", "Lunch & Dinner (unless specified)", "Personal expenses", "Travel insurance"],
    itinerary: Array.from({ length: pkg.duration_days }, (_, i) => ({
      day: i + 1,
      title: `Day ${i + 1}`,
      description: "Sightseeing and exploration as per itinerary.",
    })),
    gallery: [pkg.cover_image],
  };

  const discount = pkg.original_price
    ? Math.round(((pkg.original_price - pkg.price_per_person) / pkg.original_price) * 100)
    : 0;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={pkg.cover_image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
              <Link href="/packages" className="hover:text-white">Packages</Link>
              <span>/</span>
              <span className="text-white line-clamp-1">{pkg.title}</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-3">
              {pkg.best_seller && <Badge variant="gold">Best Seller</Badge>}
              {discount > 0 && <Badge className="bg-emerald-500 text-white border-0">{discount}% Off</Badge>}
              <Badge variant="secondary">{getDurationLabel(pkg.duration_days)}</Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl">{pkg.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-gold-400" />{pkg.destination}</span>
              <span className="flex items-center gap-1"><Clock className="h-4 w-4 text-gold-400" />{getDurationLabel(pkg.duration_days)}</span>
              {pkg.reviews_count > 0 && (
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-gold-400 text-gold-400" />{pkg.rating} ({pkg.reviews_count} reviews)</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left — details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-3">Overview</h2>
                <p className="text-gray-600 leading-relaxed">{pkg.short_description}</p>
              </div>

              {/* Gallery */}
              {extras.gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {extras.gallery.map((img, i) => (
                      <div key={i} className={`rounded-2xl overflow-hidden ${i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square"}`}>
                        <img src={img} alt={`${pkg.title} ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Day-by-Day Itinerary</h2>
                <div className="space-y-4">
                  {extras.itinerary.map((day) => (
                    <details key={day.day} className="group bg-gray-50 rounded-2xl overflow-hidden">
                      <summary className="flex items-center gap-4 p-5 cursor-pointer list-none">
                        <div className="w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {day.day}
                        </div>
                        <div>
                          <div className="text-xs text-brand-500 font-semibold">Day {day.day}</div>
                          <div className="font-semibold text-gray-900">{day.title}</div>
                        </div>
                        <ArrowRight className="ml-auto h-4 w-4 text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <div className="px-5 pb-5 pl-[76px] text-gray-600 text-sm leading-relaxed">
                        {day.description}
                      </div>
                    </details>
                  ))}
                </div>
              </div>

              {/* Inclusions/Exclusions */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-500" /> Inclusions
                  </h3>
                  <ul className="space-y-2">
                    {extras.inclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <X className="h-5 w-5 text-red-500" /> Exclusions
                  </h3>
                  <ul className="space-y-2">
                    {extras.exclusions.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <X className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right — booking sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {pkg.original_price && pkg.original_price > pkg.price_per_person && (
                        <div className="text-sm text-gray-400 line-through">{formatCurrency(pkg.original_price)}</div>
                      )}
                      <div className="text-3xl font-bold text-brand-600">{formatCurrency(pkg.price_per_person)}</div>
                      <div className="text-gray-400 text-sm">per person</div>
                    </div>
                    {discount > 0 && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-0 text-sm">{discount}% OFF</Badge>
                    )}
                  </div>

                  <div className="flex gap-3 mb-4">
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                      <Clock className="h-4 w-4 text-brand-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-semibold">{getDurationLabel(pkg.duration_days)}</div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                      <Users className="h-4 w-4 text-brand-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Min. People</div>
                      <div className="text-sm font-semibold">2 Persons</div>
                    </div>
                  </div>

                  <Button variant="premium" size="lg" className="w-full mb-3" asChild>
                    <a href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I'm interested in the ${pkg.title} package.`} target="_blank" rel="noopener noreferrer">
                      Book on WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <a href={`tel:${SITE_CONFIG.phone}`}>
                      <Phone className="h-4 w-4" />
                      Call to Book
                    </a>
                  </Button>
                </div>

                {/* Inquiry form */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Send Inquiry</h3>
                  <p className="text-gray-400 text-sm mb-4">Get a customized quote for this package</p>
                  <InquiryForm packageId={pkg.id} destination={pkg.destination} compact />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
