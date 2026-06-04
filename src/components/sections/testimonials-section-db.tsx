import { TestimonialsSection } from "./testimonials-section";
import { getTestimonials } from "@/lib/db";
import { TESTIMONIALS_DATA } from "@/lib/data";

export async function TestimonialsSectionDB() {
  let testimonials = TESTIMONIALS_DATA;

  try {
    const dbData = await getTestimonials();
    if (dbData && dbData.length > 0) {
      testimonials = dbData.map((t: any) => ({
        id: t.id,
        name: t.name,
        location: t.location || "",
        avatar: t.avatar || undefined,
        rating: t.rating,
        review: t.review,
        destination: t.destination || "",
        travel_date: t.travel_date || "",
        verified: t.verified,
        featured: t.featured,
        sort_order: t.sort_order,
        created_at: t.created_at,
      }));
    }
  } catch {
    // Use static fallback
  }

  return <TestimonialsSection testimonials={testimonials} />;
}
