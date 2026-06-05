import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { ContactForm } from "@/components/sections/contact-form";
import { PaymentButton } from "@/components/sections/payment-button";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Travel Holiday. Free travel consultation, custom quotes, and 24/7 support.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative py-24 bg-gradient-to-br from-brand-900 to-brand-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Get in <span className="text-gold-400">Touch</span>
          </h1>
          <p className="text-xl text-white/80 max-w-xl mx-auto">
            Our travel experts are here to help you plan the perfect holiday
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {/* Contact info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
                {[
                  {
                    icon: Phone,
                    title: "Call Us",
                    lines: [SITE_CONFIG.phone, "Mon–Sat 9AM–8PM"],
                    href: `tel:${SITE_CONFIG.phone}`,
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    lines: [SITE_CONFIG.email, "We reply within 24 hours"],
                    href: `mailto:${SITE_CONFIG.email}`,
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    lines: [SITE_CONFIG.address],
                    href: undefined,
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    lines: ["Mon–Sat: 9AM – 8PM", "Sunday: 10AM – 6PM"],
                    href: undefined,
                  },
                ].map((item) => (
                  <a
                    key={item.title}
                    href={item.href}
                    className={`flex gap-4 p-4 rounded-2xl border border-gray-100 hover:border-brand-200 hover:bg-brand-50 transition-all mb-4 ${item.href ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center shrink-0">
                      <item.icon className="h-5 w-5 text-brand-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                      {item.lines.map((line, i) => (
                        <div key={i} className="text-gray-600 text-sm">{line}</div>
                      ))}
                    </div>
                  </a>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi! I need help planning a trip.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366] text-white rounded-2xl hover:bg-[#20b858] transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="font-semibold">Chat on WhatsApp</span>
              </a>

              {/* Payment Submission CTA */}
              <div className="pt-2">
                <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wider px-1">Already booked?</p>
                <PaymentButton />
              </div>
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-6">Fill out the form and we'll get back to you within 24 hours</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-64 bg-gray-200 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1920&q=80"
          alt="Location map"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
            <MapPin className="h-8 w-8 text-brand-500 mx-auto mb-2" />
            <div className="font-bold text-gray-900">{SITE_CONFIG.name}</div>
            <div className="text-sm text-gray-500">{SITE_CONFIG.address}</div>
          </div>
        </div>
      </section>
    </>
  );
}
