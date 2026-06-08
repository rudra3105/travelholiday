import { TestimonialsSection } from "./testimonials-section";
import { getTestimonials } from "@/lib/db";

export async function TestimonialsSectionDB() {
  let testimonials: any[] = [];

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
    // DB not configured yet
  }

  if (testimonials.length === 0) return null;

  return <TestimonialsSection testimonials={testimonials} />;
}
