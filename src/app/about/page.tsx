import type { Metadata } from "next";
import { AboutHero } from "@/components/sections/about-hero";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { TestimonialsSectionDB } from "@/components/sections/testimonials-section-db";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us",
  description: `Learn about ${SITE_CONFIG.name} — India's trusted travel partner since 2005. Meet our team and discover our story.`,
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <WhyChooseUsSection />
      <TestimonialsSectionDB />
      <ContactCTASection />
    </>
  );
}

function AboutStory() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="h-px w-8 bg-brand-500" />
                <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">Our Story</span>
                <div className="h-px w-8 bg-brand-500" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                18 Years of Crafting{" "}
                <span className="gradient-text">Dream Holidays</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2005 in Jetpur, Travel Holiday began with a simple mission: to make extraordinary travel experiences accessible to every Indian family. What started as a small team of passionate travel enthusiasts has grown into one of India's most trusted travel companies.
                </p>
                <p>
                  Over 18 years, we've sent more than 50,000 travelers on journeys that changed their lives — from honeymooners discovering Bali's hidden temples to families exploring the royal forts of Rajasthan, from adventure seekers trekking Himalayan trails to pilgrims completing the sacred Char Dham Yatra.
                </p>
                <p>
                  Our philosophy is simple: every journey should be personal, seamless, and memorable. We don't just book hotels and flights — we craft experiences tailored to your dreams, budget, and travel style.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/about.png"
                alt="Travel team"
                className="rounded-3xl shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-brand-500 text-white rounded-2xl p-5 shadow-xl">
                <div className="text-4xl font-bold">18+</div>
                <div className="text-sm text-white/80">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

