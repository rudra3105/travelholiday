"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Clock, Users, Star, Check, X, Phone, ArrowRight, ChevronDown, Camera, List, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getPackageBySlug, type PackageFull } from "@/lib/package-store";
import { formatCurrency, getDurationLabel } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface Props {
  slug: string;
  defaultPkg: PackageFull;
}

export function PackageDetailClient({ slug, defaultPkg }: Props) {
  // Start with server-side default, then override with any admin edits from localStorage
  const [pkg, setPkg] = useState<PackageFull>(defaultPkg);
  const [activeTab, setActiveTab] = useState<"overview" | "itinerary" | "inclusions" | "gallery">("overview");

  useEffect(() => {
    // Load latest data from localStorage (admin may have edited it)
    const stored = getPackageBySlug(slug);
    if (stored) setPkg(stored);
  }, [slug]);

  const discount =
    pkg.original_price && pkg.original_price > pkg.price_per_person
      ? Math.round(((pkg.original_price - pkg.price_per_person) / pkg.original_price) * 100)
      : 0;

  const TABS = [
    { key: "overview", label: "Overview", icon: Award },
    { key: "itinerary", label: `Itinerary (${pkg.duration_days} Days)`, icon: List },
    { key: "inclusions", label: "Inclusions", icon: Check },
    { key: "gallery", label: "Gallery", icon: Camera },
  ] as const;

  return (
    <>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={pkg.cover_image} alt={pkg.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
          <div className="container mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
              <Link href="/packages" className="hover:text-white transition-colors">Packages</Link>
              <span>/</span>
              <span className="text-white/80 line-clamp-1">{pkg.destination}</span>
              <span>/</span>
              <span className="text-white line-clamp-1 hidden sm:inline">{pkg.title}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {pkg.best_seller && (
                <span className="bg-gold-500 text-white text-xs font-bold px-3 py-1 rounded-full">⭐ Best Seller</span>
              )}
              {discount > 0 && (
                <span className="bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full">{discount}% OFF</span>
              )}
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full capitalize">{pkg.type}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
              {pkg.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-gold-400" />{pkg.destination}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold-400" />{getDurationLabel(pkg.duration_days)}
              </span>
              {pkg.reviews_count > 0 && (
                <span className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-gold-400 text-gold-400" />
                  {pkg.rating} ({pkg.reviews_count} reviews)
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <div className="sticky top-[64px] md:top-[80px] z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-brand-500 text-brand-600"
                    : "border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left content */}
            <div className="lg:col-span-2">

              {/* ── OVERVIEW TAB ── */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Package</h2>
                    <p className="text-gray-600 leading-relaxed text-base">{pkg.description || pkg.short_description}</p>
                  </div>

                  {/* Highlights */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-5">Tour Highlights</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {pkg.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-3 p-4 bg-brand-50 rounded-2xl">
                            <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {i + 1}
                            </div>
                            <span className="text-sm font-medium text-gray-800 leading-snug">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quick stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-2xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-600">{pkg.duration_days}</div>
                      <div className="text-xs text-gray-500 mt-1">Days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-600">{pkg.duration_days - 1}</div>
                      <div className="text-xs text-gray-500 mt-1">Nights</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-600">{pkg.rating}★</div>
                      <div className="text-xs text-gray-500 mt-1">Rating</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-brand-600">{pkg.reviews_count}+</div>
                      <div className="text-xs text-gray-500 mt-1">Reviews</div>
                    </div>
                  </div>

                  {/* Preview of itinerary */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-gray-900">Day-by-Day Itinerary</h2>
                      <button onClick={() => setActiveTab("itinerary")} className="text-sm text-brand-600 hover:underline flex items-center gap-1">
                        View all <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {pkg.itinerary.slice(0, 3).map((day) => (
                        <div key={day.day} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                          <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0">{day.day}</div>
                          <div>
                            <div className="text-xs text-brand-500 font-semibold mb-0.5">Day {day.day}</div>
                            <div className="font-semibold text-gray-900 text-sm">{day.title}</div>
                            <div className="text-gray-500 text-xs mt-1 line-clamp-2">{day.description}</div>
                          </div>
                        </div>
                      ))}
                      {pkg.itinerary.length > 3 && (
                        <button onClick={() => setActiveTab("itinerary")} className="w-full p-3 border-2 border-dashed border-brand-200 rounded-xl text-brand-500 text-sm font-medium hover:bg-brand-50 transition-colors">
                          + {pkg.itinerary.length - 3} more days — View full itinerary
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ── ITINERARY TAB ── */}
              {activeTab === "itinerary" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Day-by-Day Itinerary
                    <span className="ml-2 text-base font-normal text-gray-400">({getDurationLabel(pkg.duration_days)})</span>
                  </h2>

                  {/* Timeline */}
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />

                    <div className="space-y-4">
                      {pkg.itinerary.map((day) => (
                        <details key={day.day} className="group relative" open={day.day === 1}>
                          <summary className="flex items-center gap-4 cursor-pointer list-none p-4 bg-white rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all shadow-sm">
                            {/* Day circle */}
                            <div className="relative z-10 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
                              {day.day}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-xs text-brand-500 font-semibold">Day {day.day}</div>
                              <div className="font-bold text-gray-900">{day.title}</div>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400 shrink-0 group-open:rotate-180 transition-transform" />
                          </summary>
                          <div className="mt-2 ml-14 mr-2 p-4 bg-gray-50 rounded-xl text-gray-600 text-sm leading-relaxed border-l-2 border-brand-200">
                            {day.description}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── INCLUSIONS TAB ── */}
              {activeTab === "inclusions" && (
                <div className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    {/* Inclusions */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
                          <Check className="h-4 w-4 text-emerald-600" />
                        </div>
                        What's Included
                      </h2>
                      <ul className="space-y-3">
                        {pkg.inclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl">
                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                              <Check className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclusions */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center">
                          <X className="h-4 w-4 text-red-500" />
                        </div>
                        Not Included
                      </h2>
                      <ul className="space-y-3">
                        {pkg.exclusions.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 p-3 bg-red-50 rounded-xl">
                            <div className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center shrink-0 mt-0.5">
                              <X className="h-3 w-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Important notes */}
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <h3 className="font-bold text-amber-800 mb-2">📋 Important Notes</h3>
                    <ul className="text-sm text-amber-700 space-y-1.5">
                      <li>• Prices are per person on double/twin sharing basis</li>
                      <li>• Hotel check-in is subject to availability; standard check-in is 2PM</li>
                      <li>• Itinerary is subject to change due to weather or operational reasons</li>
                      <li>• We strongly recommend purchasing travel insurance</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* ── GALLERY TAB ── */}
              {activeTab === "gallery" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-5">Photo Gallery</h2>
                  {pkg.gallery_images && pkg.gallery_images.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {pkg.gallery_images.map((img, i) => (
                        <div
                          key={i}
                          className={`rounded-2xl overflow-hidden group cursor-pointer ${
                            i === 0 ? "col-span-2 aspect-video" : "aspect-square"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`${pkg.title} - Photo ${i + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-2xl">
                      No gallery images added yet
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-[130px] space-y-4">
                {/* Price & booking card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      {pkg.original_price > pkg.price_per_person && (
                        <div className="text-sm text-gray-400 line-through mb-0.5">
                          {formatCurrency(pkg.original_price)}
                        </div>
                      )}
                      <div className="text-3xl font-black text-brand-600">{formatCurrency(pkg.price_per_person)}</div>
                      <div className="text-gray-400 text-sm">per person</div>
                    </div>
                    {discount > 0 && (
                      <span className="bg-emerald-100 text-emerald-700 text-sm font-bold px-3 py-1 rounded-full">
                        Save {discount}%
                      </span>
                    )}
                  </div>

                  {/* Quick info pills */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Clock className="h-4 w-4 text-brand-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Duration</div>
                      <div className="text-sm font-bold">{getDurationLabel(pkg.duration_days)}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <MapPin className="h-4 w-4 text-brand-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Destination</div>
                      <div className="text-sm font-bold truncate">{pkg.destination}</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Users className="h-4 w-4 text-brand-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Min. Persons</div>
                      <div className="text-sm font-bold">2 Persons</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-3 text-center">
                      <Star className="h-4 w-4 fill-gold-400 text-gold-400 mx-auto mb-1" />
                      <div className="text-xs text-gray-500">Rating</div>
                      <div className="text-sm font-bold">{pkg.rating} / 5</div>
                    </div>
                  </div>

                  {/* CTA buttons */}
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I'm interested in the "${pkg.title}" package. Please share details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#25D366] hover:bg-[#20b95b] text-white font-bold rounded-xl transition-colors mb-3"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Book on WhatsApp
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phone}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 border-2 border-brand-500 text-brand-600 font-bold rounded-xl hover:bg-brand-50 transition-colors"
                  >
                    <Phone className="h-4 w-4" />
                    Call to Book
                  </a>
                </div>

                {/* Inquiry form */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Send Inquiry</h3>
                  <p className="text-gray-400 text-sm mb-4">Get a personalised quote & itinerary</p>
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
