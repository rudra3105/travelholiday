import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { DestinationCard } from "./destination-card";
import { Button } from "@/components/ui/button";
import { getDestinations } from "@/lib/db";
import { cn } from "@/lib/utils";

export async function DestinationsSectionDB() {
  const domestic = await getDestinations("domestic");
  const international = await getDestinations("international");

  // If no destinations in DB, don't show section or show message
  if (domestic.length === 0 && international.length === 0) return null;

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Explore"
          title="Popular"
          titleHighlight="Destinations"
          subtitle="From the majestic Himalayas to tropical paradise — discover your perfect getaway"
        />

        {domestic.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">🇮🇳 Domestic Destinations</h3>
              <Link href="/destinations?type=domestic" className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1 text-sm">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {domestic.slice(0, 6).map((dest: any, i: number) => (
                <DestinationCard 
                  key={dest.slug} 
                  name={dest.name}
                  slug={dest.slug}
                  image={dest.cover_image}
                  tagline={dest.short_description}
                  packages={dest.packages_count}
                  starting_from={dest.starting_from}
                  index={i} 
                />
              ))}
            </div>
          </div>
        )}

        {international.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900">✈️ International Destinations</h3>
              <Link href="/destinations?type=international" className="text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1 text-sm">
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {international.slice(0, 6).map((dest: any, i: number) => (
                <DestinationCard 
                  key={dest.slug} 
                  name={dest.name}
                  slug={dest.slug}
                  image={dest.cover_image}
                  tagline={dest.short_description}
                  packages={dest.packages_count}
                  starting_from={dest.starting_from}
                  index={i} 
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
