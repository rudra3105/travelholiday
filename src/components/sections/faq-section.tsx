"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeader } from "./section-header";

const STATIC_FAQS = [
  { q: "How do I book a tour package?", a: "You can book a tour package by filling out our inquiry form on the package page, calling our helpline, or visiting our office. Our travel experts will contact you within 2-4 hours to confirm availability and finalize your booking." },
  { q: "What documents are required for international tours?", a: "For international tours, you need a valid passport (6 months validity beyond travel date), valid visa for the destination country, travel insurance, and original ID proof. Our team will guide you through specific requirements for your destination." },
  { q: "What is your cancellation policy?", a: "Cancellations made 30+ days before departure receive 90% refund. 15-30 days: 50% refund. 7-15 days: 25% refund. Less than 7 days: no refund. For full details, visit our Cancellation Policy page." },
  { q: "Are the tour prices per person or for a group?", a: "All our tour prices displayed are per person based on twin/double sharing. Single supplement charges apply for private rooms. Group discounts are available for groups of 8 or more people." },
  { q: "Do you provide travel insurance?", a: "We strongly recommend travel insurance for all tours. We can arrange comprehensive coverage including medical emergencies, trip cancellation, baggage loss, and more at competitive rates." },
  { q: "Can I customize my tour package?", a: "Absolutely! We specialize in customized holidays. You can modify hotel categories, add/remove destinations, change activities, and adjust duration. Contact our team to start planning your personalized itinerary." },
  { q: "What is included in the tour price?", a: "Generally our packages include accommodation, meals as specified, transportation, sightseeing, and a tour guide. Flight charges, visa fees, travel insurance, and personal expenses are usually excluded unless specifically mentioned." },
  { q: "How safe are your tours for solo female travelers?", a: "Safety is our top priority. We have dedicated female tour leaders for women-only groups, vetted accommodations, 24/7 helpline support, and comprehensive safety briefings. Thousands of solo female travelers have enjoyed our tours safely." },
];

interface Props {
  faqs?: Array<{ q: string; a: string }>;
}

export function FAQSection({ faqs = STATIC_FAQS }: Props) {
  const displayFaqs = faqs.length > 0 ? faqs : STATIC_FAQS;

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="FAQ"
            title="Frequently Asked"
            titleHighlight="Questions"
            subtitle="Everything you need to know about planning your perfect holiday with us"
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="space-y-3">
              {displayFaqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-gray-50 rounded-2xl border border-gray-100 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
