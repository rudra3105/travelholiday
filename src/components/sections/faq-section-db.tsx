import { FAQSection } from "./faq-section";
import { getFAQs } from "@/lib/db";

export async function FAQSectionDB() {
  let faqs: Array<{ q: string; a: string }> | undefined;

  try {
    const dbFaqs = await getFAQs();
    if (dbFaqs && dbFaqs.length > 0) {
      faqs = dbFaqs.map((f: any) => ({ q: f.question, a: f.answer }));
    }
  } catch {
    // Use static fallback (FAQSection has its own static data)
  }

  return <FAQSection faqs={faqs} />;
}
