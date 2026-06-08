import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Calendar, Globe, Check, Package, Clock, Languages, Banknote, Shield } from "lucide-react";
import { PackageCard } from "@/components/sections/package-card";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getDestinationBySlug, getDestinations, getPackages } from "@/lib/db";
import { formatCurrency } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const destinations = await getDestinations();
  return destinations.map((d: any) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) return { title: "Destination Not Found" };
  return {
    title: dest.name,
    description: `Explore ${dest.name} tour packages. ${dest.short_description}.`,
  };
}

export default async function DestinationDetailPage({ params }: Props) {
  const { slug } = await params;
  const dest = await getDestinationBySlug(slug);
  if (!dest) notFound();

  const packages = await getPackages({ destination_id: dest.id });

  // Use DB highlights if available, otherwise fallback defaults
  const highlights: string[] =
    dest.highlights && dest.highlights.length > 0
      ? dest.highlights
      : [
          "Iconic landmarks & sights",
          "Handpicked accommodations",
          "Expert local guides",
          "Authentic local cuisine",
          "Seamless transportation",
          "Cultural experiences",
        ];

  // Travel info items (only show if data exists)
  const travelInfo = [
    dest.best_time_to_visit && { icon: Calendar, label: "Best Time", value: dest.best_time_to_visit },
    dest.climate && { icon: Globe, label: "Climate", value: dest.climate },
    dest.language && { icon: Languages, label: "Language", value: dest.language },
    dest.currency && { icon: Banknote, label: "Currency", value: dest.currency },
    dest.timezone && { icon: Clock, label: "Timezone", value: dest.timezone },
    dest.visa_required !== undefined && {
      icon: Shield,
      label: "Visa",
      value: dest.visa_required ? "Visa Required" : "No Visa Required",
    },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  return (
    <>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        {dest.cover_image ? (
          <img src={dest.cover_image} alt={dest.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-brand-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
              <Link href="/destinations" className="hover:text-white transition-colors">Destinations</Link>
              <span>/</span>
              <span className="text-white">{dest.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">{dest.name}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2 text-gold-400 text-lg font-medium">
                <MapPin className="h-5 w-5" />{dest.short_description}
              </div>
              {(dest as any).starting_price > 0 && (
                <div className="text-white text-lg font-semibold">
                  From {formatCurrency((dest as any).starting_price)}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Description */}
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">About {dest.name}</h2>
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>{dest.description || `${dest.name} is a stunning destination. Explore our curated packages for an unforgettable experience.`}</p>
                </div>
              </div>

              {/* Travel Info */}
              {travelInfo.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Travel Information</h3>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {travelInfo.map((info, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                          <info.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{info.label}</p>
                          <p className="text-gray-800 text-sm font-medium mt-0.5">{info.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Visit {dest.name}?</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                      <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <span className="text-gray-700 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {dest.gallery_images && dest.gallery_images.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {dest.gallery_images.map((url: string, i: number) => (
                      <img
                        key={i}
                        src={url}
                        alt={`${dest.name} ${i + 1}`}
                        className="w-full h-40 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Packages */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Available Packages in {dest.name}</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {packages.length > 0 ? (
                    packages.map((pkg: any, i: number) => (
                      <PackageCard key={pkg.id} {...pkg} index={i} />
                    ))
                  ) : (
                    <div className="col-span-full py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-500">No packages currently available for this destination.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Plan Your Trip</h3>
                  <p className="text-gray-500 text-sm mb-6">Tell us your travel dreams and we'll handle the rest</p>
                  <InquiryForm destination={dest.name} />
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
