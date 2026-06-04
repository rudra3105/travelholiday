import type { Metadata } from "next";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { GALLERY_DATA } from "@/lib/data";

export const metadata: Metadata = {
  title: "Travel Gallery",
  description: "Explore our travel photography gallery — breathtaking destinations, memorable moments, and inspiring journeys.",
};

const ALL_GALLERY = [
  ...GALLERY_DATA,
  { url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", alt: "Maldives", destination: "Maldives", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=600&q=80", alt: "Switzerland", destination: "Switzerland", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1566402441996-3e6a33b77b1f?w=600&q=80", alt: "Kashmir", destination: "Kashmir", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1587135941948-670b381f08ce?w=600&q=80", alt: "Goa", destination: "Goa", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1543832923-44667a44c804?w=600&q=80", alt: "Uttarakhand", destination: "Uttarakhand", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=600&q=80", alt: "Thailand", destination: "Thailand", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", alt: "Dubai", destination: "Dubai", cols: 1, rows: 1 },
  { url: "https://images.unsplash.com/photo-1514825926543-b59b60b60059?w=600&q=80", alt: "Nepal", destination: "Nepal", cols: 1, rows: 1 },
];

const CATEGORIES = ["All", "Domestic", "International", "Beach", "Mountains", "Heritage"];

export default function GalleryPage() {
  return (
    <>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80" alt="Gallery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-900/90 to-brand-700/70" />
        </div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Travel <span className="text-gold-400">Gallery</span>
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            A visual journey through the world's most breathtaking destinations
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {ALL_GALLERY.map((img, i) => (
              <div
                key={i}
                className="break-inside-avoid group relative overflow-hidden rounded-2xl cursor-pointer"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading={i > 8 ? "lazy" : undefined}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-semibold bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    {img.destination}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
