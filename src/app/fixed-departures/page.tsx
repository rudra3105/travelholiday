import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { FIXED_DEPARTURES_DATA } from "@/lib/data";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fixed Departures",
  description: "Join our scheduled group tours. Fixed departure dates, guaranteed departures, competitive group rates.",
};

const STATUS_CONFIG = {
  available: { label: "Available", color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  limited: { label: "Limited Seats", color: "bg-amber-100 text-amber-700 border-amber-200" },
  sold_out: { label: "Sold Out", color: "bg-red-100 text-red-700 border-red-200" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-600 border-gray-200" },
};

export default function FixedDeparturesPage() {
  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-gray-950 via-brand-950 to-brand-900">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Fixed <span className="text-gold-400">Departures</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Guaranteed group tours at fixed dates — join fellow travelers for an incredible shared adventure
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 max-w-4xl mx-auto">
            {FIXED_DEPARTURES_DATA.map((dep) => {
              const status = STATUS_CONFIG[dep.status as keyof typeof STATUS_CONFIG];
              const seatsLeft = dep.available_seats;
              const seatsPercent = (dep.available_seats / dep.total_seats) * 100;

              return (
                <div key={dep.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    <div className="sm:w-48 h-48 sm:h-auto shrink-0">
                      <img src={dep.cover_image} alt={dep.package_title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-1">
                            <MapPin className="h-3.5 w-3.5 text-brand-400" />
                            {dep.destination}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">{dep.package_title}</h3>
                        </div>
                        <span className={cn("text-xs font-semibold px-3 py-1.5 rounded-full border shrink-0 whitespace-nowrap", status.color)}>
                          {status.label}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-brand-400" />
                          <div>
                            <div className="text-xs text-gray-400">Departure</div>
                            <div className="font-medium">{formatDate(dep.departure_date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="h-4 w-4 text-brand-400" />
                          <div>
                            <div className="text-xs text-gray-400">Return</div>
                            <div className="font-medium">{formatDate(dep.return_date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Clock className="h-4 w-4 text-brand-400" />
                          <div>
                            <div className="text-xs text-gray-400">Duration</div>
                            <div className="font-medium">{getDurationLabel(dep.duration_days)}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{seatsLeft} seats remaining</span>
                          <span>{dep.total_seats} total seats</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full transition-all", seatsPercent <= 25 ? "bg-red-400" : seatsPercent <= 50 ? "bg-amber-400" : "bg-emerald-400")}
                            style={{ width: `${100 - seatsPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-brand-600">{formatCurrency(dep.price_per_person)}</div>
                          <div className="text-xs text-gray-400">per person</div>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/fixed-departures/${dep.slug}`}>View Details</Link>
                          </Button>
                          {dep.status !== "sold_out" && (
                            <Button variant="premium" size="sm" asChild>
                              <Link href={`/contact?package=${dep.package_title}`}>
                                Book Now
                              </Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
