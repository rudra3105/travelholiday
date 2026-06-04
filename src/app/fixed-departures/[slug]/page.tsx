import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Users, Calendar, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InquiryForm } from "@/components/sections/inquiry-form";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { FIXED_DEPARTURES_DATA } from "@/lib/data";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  return FIXED_DEPARTURES_DATA.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const dep = FIXED_DEPARTURES_DATA.find((d) => d.slug === params.slug);
  if (!dep) return { title: "Departure Not Found" };
  return {
    title: dep.package_title,
    description: `Join our group departure to ${dep.destination} on ${formatDate(dep.departure_date)}. ${getDurationLabel(dep.duration_days)} from ${formatCurrency(dep.price_per_person)}/person.`,
  };
}

const STATUS_CONFIG = {
  available: { label: "Seats Available", color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  limited: { label: "Limited Seats", color: "text-amber-600 bg-amber-50 border-amber-200" },
  sold_out: { label: "Sold Out", color: "text-red-600 bg-red-50 border-red-200" },
  cancelled: { label: "Cancelled", color: "text-gray-600 bg-gray-50 border-gray-200" },
};

export default function FixedDepartureDetailPage({ params }: { params: { slug: string } }) {
  const dep = FIXED_DEPARTURES_DATA.find((d) => d.slug === params.slug);
  if (!dep) notFound();

  const status = STATUS_CONFIG[dep.status as keyof typeof STATUS_CONFIG];
  const seatsPercent = (dep.available_seats / dep.total_seats) * 100;
  const isSoldOut = dep.status === "sold_out" || dep.status === "cancelled";

  const inclusions = [
    "Hotel accommodation (twin sharing)",
    "Daily breakfast & dinner",
    "All transfers in AC vehicle",
    "English-speaking tour escort",
    "All entry fees & sightseeing",
    "Welcome & farewell dinner",
  ];

  const tripHighlights = [
    "Expert-led group with fellow travellers",
    "Guaranteed departure — no cancellation risk",
    "Competitive group pricing",
    "Pre-vetted & reviewed accommodations",
    "24/7 on-ground support",
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative h-[55vh] min-h-[400px] overflow-hidden">
        <img src={dep.cover_image} alt={dep.package_title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-2 text-white/60 text-sm mb-3">
              <Link href="/fixed-departures" className="hover:text-white transition-colors">Fixed Departures</Link>
              <span>/</span>
              <span className="text-white">{dep.package_title}</span>
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className={cn("text-sm font-semibold px-3 py-1.5 rounded-full border", status.color)}>
                {status.label}
              </span>
              <span className="text-white/80 text-sm bg-white/10 px-3 py-1.5 rounded-full">
                {getDurationLabel(dep.duration_days)}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3 max-w-3xl">{dep.package_title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-gold-400" />{dep.destination}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold-400" />Departs {formatDate(dep.departure_date)}</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-gold-400" />Returns {formatDate(dep.return_date)}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left */}
            <div className="lg:col-span-2 space-y-10">
              {/* Trip details grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: Calendar, label: "Departure", value: formatDate(dep.departure_date) },
                  { icon: Calendar, label: "Return", value: formatDate(dep.return_date) },
                  { icon: Clock, label: "Duration", value: getDurationLabel(dep.duration_days) },
                  { icon: Users, label: "Seats Left", value: `${dep.available_seats}/${dep.total_seats}` },
                ].map((item) => (
                  <div key={item.label} className="bg-gray-50 rounded-2xl p-4 text-center">
                    <item.icon className="h-5 w-5 text-brand-500 mx-auto mb-2" />
                    <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                    <div className="text-sm font-bold text-gray-900">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Seats progress */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span className="text-gray-700">{dep.available_seats} seats remaining</span>
                  <span className="text-gray-500">{dep.total_seats} total</span>
                </div>
                <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      seatsPercent <= 25 ? "bg-red-400" : seatsPercent <= 50 ? "bg-amber-400" : "bg-emerald-400"
                    )}
                    style={{ width: `${100 - seatsPercent}%` }}
                  />
                </div>
                {dep.status === "limited" && (
                  <p className="text-amber-600 text-sm mt-2 font-medium">⚡ Only {dep.available_seats} seats left — book soon!</p>
                )}
              </div>

              {/* Why join this group tour */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Why Join This Group Tour?</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {tripHighlights.map((h) => (
                    <div key={h} className="flex items-start gap-3 p-4 bg-brand-50 rounded-xl">
                      <CheckCircle className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700 font-medium">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">What's Included</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {inclusions.map((item) => (
                    <div key={item} className="flex items-center gap-3 text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary teaser */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-5">Trip Itinerary</h2>
                <div className="space-y-3">
                  {Array.from({ length: dep.duration_days }, (_, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {i + 1}
                      </div>
                      <div>
                        <div className="text-xs text-brand-500 font-semibold">Day {i + 1}</div>
                        <div className="font-semibold text-gray-900 text-sm">
                          {i === 0 ? "Arrival & Welcome" : i === dep.duration_days - 1 ? "Departure Day" : `Sightseeing Day ${i}`}
                        </div>
                        <div className="text-gray-500 text-xs mt-0.5">
                          {i === 0 ? "Airport/station pickup, check-in, group briefing & welcome dinner" :
                           i === dep.duration_days - 1 ? "Breakfast, checkout, transfer to airport/station" :
                           "Guided sightseeing, local experiences & cultural activities"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price card */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <div className="text-3xl font-bold text-brand-600 mb-1">{formatCurrency(dep.price_per_person)}</div>
                  <div className="text-gray-400 text-sm mb-5">per person (twin sharing)</div>

                  <div className="space-y-3 mb-5 text-sm text-gray-600">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Departure Date</span>
                      <span className="font-medium text-gray-900">{formatDate(dep.departure_date)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Return Date</span>
                      <span className="font-medium text-gray-900">{formatDate(dep.return_date)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span>Seats Available</span>
                      <span className={cn("font-semibold", dep.available_seats <= 4 ? "text-red-500" : "text-emerald-600")}>
                        {dep.available_seats} left
                      </span>
                    </div>
                  </div>

                  {!isSoldOut ? (
                    <>
                      <Button variant="gold" size="lg" className="w-full mb-3" asChild>
                        <a
                          href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I want to book the ${dep.package_title} group departure on ${formatDate(dep.departure_date)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Book This Departure
                        </a>
                      </Button>
                      <Button variant="outline" size="lg" className="w-full" asChild>
                        <a href={`tel:${SITE_CONFIG.phone}`}>
                          <Phone className="h-4 w-4" />
                          Call to Book
                        </a>
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-3 bg-gray-50 rounded-xl text-gray-500 text-sm">
                      This departure is sold out.{" "}
                      <Link href="/fixed-departures" className="text-brand-600 hover:underline">
                        View other dates
                      </Link>
                    </div>
                  )}
                </div>

                {/* Inquiry form */}
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Have Questions?</h3>
                  <p className="text-gray-400 text-sm mb-4">Our experts will call you back within 2 hours</p>
                  <InquiryForm
                    destination={dep.destination}
                    compact
                  />
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
