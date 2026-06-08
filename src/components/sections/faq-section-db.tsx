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
    // DB not configured yet
  }

  // FAQSection has built-in static FAQs as a last resort — only pass if we have DB data
  return <FAQSection faqs={faqs} />;
}
