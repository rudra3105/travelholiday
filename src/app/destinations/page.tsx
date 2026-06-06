import type { Metadata } from "next";
import { SectionHeader } from "@/components/sections/section-header";
import { DestinationCard } from "@/components/sections/destination-card";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getDestinations } from "@/lib/db";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Explore 100+ handpicked destinations across India and the world.",
};

type Props = { searchParams: Promise<{ type?: string }> };

export default async function DestinationsPage({ searchParams }: Props) {
  const { type } = await searchParams;

  const domestic = await getDestinations("domestic");
  const international = await getDestinations("international");

  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80" alt="Destinations" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-800/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore <span className="text-gold-400">Destinations</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            From the peaks of the Himalayas to the beaches of Bali — discover 100+ breathtaking destinations
          </p>
        </div>
      </section>

      {(!type || type === "domestic") && domestic.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <SectionHeader eyebrow="India" title="Domestic" titleHighlight="Destinations" subtitle="Explore the incredible diversity of India" centered={false} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {domestic.map((dest: any, i: number) => (
                <DestinationCard 
                  key={dest.slug} 
                  name={dest.name}
                  slug={dest.slug}
                  image={dest.cover_image}
                  tagline={dest.short_description}
                  packages={0}
                  starting_from={0}
                  index={i} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {(!type || type === "international") && international.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <SectionHeader eyebrow="World" title="International" titleHighlight="Destinations" subtitle="Iconic cities, hidden gems, and paradise islands" centered={false} />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {international.map((dest: any, i: number) => (
                <DestinationCard 
                  key={dest.slug} 
                  name={dest.name}
                  slug={dest.slug}
                  image={dest.cover_image}
                  tagline={dest.short_description}
                  packages={0}
                  starting_from={0}
                  index={i} 
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContactCTASection />
    </>
  );
}
