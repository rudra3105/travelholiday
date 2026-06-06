import type { Metadata } from "next";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getGalleryImages } from "@/lib/db";

export const metadata: Metadata = {
  title: "Travel Gallery",
  description: "Explore our travel photography gallery — breathtaking destinations, memorable moments, and inspiring journeys.",
};

export default async function GalleryPage() {
  const images = await getGalleryImages();

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
          {images.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400">Our gallery is currently empty. Check back soon for amazing travel photos!</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {images.map((img: any, i: number) => (
                <div
                  key={img.id || i}
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
          )}
        </div>
      </section>

      <ContactCTASection />
    </>
  );
}
