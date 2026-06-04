import { HeroSection } from "@/components/sections/hero-section";
import { SearchSection } from "@/components/sections/search-section";
import { DestinationsSection } from "@/components/sections/destinations-section";
import { PackagesSectionDB } from "@/components/sections/packages-section-db";
import { FixedDeparturesSectionDB } from "@/components/sections/fixed-departures-section-db";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us-section";
import { TestimonialsSectionDB } from "@/components/sections/testimonials-section-db";
import { GallerySectionDB } from "@/components/sections/gallery-section-db";
import { FAQSectionDB } from "@/components/sections/faq-section-db";
import { ContactCTASection } from "@/components/sections/contact-cta-section";
import { OrganizationSchema } from "@/components/seo/structured-data";

export default function HomePage() {
    console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
console.log(process.env.SUPABASE_SERVICE_ROLE_KEY)
  return (
    <>
      <OrganizationSchema />
      <HeroSection />
      <SearchSection />
      <DestinationsSection />
      <PackagesSectionDB />
      <FixedDeparturesSectionDB />
      <WhyChooseUsSection />
      <TestimonialsSectionDB />
      <GallerySectionDB />
      <FAQSectionDB />
      <ContactCTASection />
    </>
  );
}
