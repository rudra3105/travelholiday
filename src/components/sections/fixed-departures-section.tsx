"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { FIXED_DEPARTURES_DATA } from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  available: { label: "Available", color: "bg-emerald-100 text-emerald-700" },
  limited: { label: "Limited Seats", color: "bg-amber-100 text-amber-700" },
  sold_out: { label: "Sold Out", color: "bg-red-100 text-red-700" },
  cancelled: { label: "Cancelled", color: "bg-gray-100 text-gray-600" },
};

interface DepartureData {
  id: string;
  package_title: string;
  destination: string;
  cover_image: string;
  departure_date: string;
  return_date: string;
  duration_days: number;
  price_per_person: number;
  available_seats: number;
  total_seats: number;
  status: string;
  slug: string;
}

interface Props {
  departures?: DepartureData[];
}

export function FixedDeparturesSection({ departures = FIXED_DEPARTURES_DATA }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-gray-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-500/5 blur-3xl" />

      <div className="container mx-auto px-4 relative">
        <SectionHeader
          eyebrow="Fixed Departures"
          title="Upcoming"
          titleHighlight="Group Tours"
          subtitle="Join our scheduled group departures — meet like-minded travelers and enjoy competitive group rates"
          className="[&_h2]:text-white [&_p]:text-gray-400"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departures.map((departure, i) => {
            const status = STATUS_CONFIG[departure.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.available;
            const seatsPercent = (departure.available_seats / departure.total_seats) * 100;

            return (
              <motion.div
                key={departure.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="group glass rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 border border-white/10">
                  <div className="flex gap-0">
                    <div className="w-32 md:w-40 shrink-0 relative overflow-hidden">
                      <img
                        src={departure.cover_image}
                        alt={departure.package_title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-1.5 text-white/60 text-xs mb-1">
                            <MapPin className="h-3 w-3" />{departure.destination}
                          </div>
                          <h3 className="text-base font-bold text-white leading-snug line-clamp-2">
                            {departure.package_title}
                          </h3>
                        </div>
                        <span className={cn("text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0", status.color)}>
                          {status.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-white/60 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-brand-400" />
                          {formatDate(departure.departure_date)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-brand-400" />
                          {getDurationLabel(departure.duration_days)}
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-white/60">
                            <Users className="h-3 w-3 inline mr-1" />
                            {departure.available_seats} seats left
                          </span>
                          <span className="text-white/60">{departure.total_seats} total</span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all",
                              seatsPercent <= 25 ? "bg-red-400" : seatsPercent <= 50 ? "bg-amber-400" : "bg-emerald-400"
                            )}
                            style={{ width: `${100 - seatsPercent}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-bold text-lg">{formatCurrency(departure.price_per_person)}</div>
                          <div className="text-white/50 text-xs">per person</div>
                        </div>
                        <Button variant="gold" size="sm" asChild>
                          <Link href={`/fixed-departures/${departure.slug}`}>Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Button variant="glass" size="lg" asChild>
            <Link href="/fixed-departures">
              View All Departures
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
