import type { Metadata } from "next";
import { Star, Quote } from "lucide-react";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { getTestimonials } from "@/lib/db";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our happy travelers say about Travel Holiday. 50,000+ satisfied customers and counting.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-brand-900 to-brand-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Traveler <span className="text-gold-400">Stories</span>
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Real experiences from 50,000+ happy travelers who chose Travel Holiday
          </p>

          <div className="flex items-center justify-center gap-8 mt-10">
            {[
              { value: "50,000+", label: "Happy Travelers" },
              { value: "4.9/5", label: "Average Rating" },
              { value: "98%", label: "Recommend Us" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gold-400">{stat.value}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {testimonials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400">No testimonials yet. Be the first one to share your experience!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: any, i: number) => (
                <div key={t.id || i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
                  <Quote className="h-8 w-8 text-brand-100 mb-4 shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1">"{t.review}"</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-gold-400 text-gold-400" : "text-gray-200"}`} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    {t.avatar && <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                      <div className="text-xs text-gray-500">{t.location} · {t.travel_date}</div>
                    </div>
                    {t.destination && (
                      <div className="ml-auto">
                        <span className="text-xs text-brand-500 font-medium bg-brand-50 px-2 py-1 rounded-full">{t.destination}</span>
                      </div>
                    )}
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
