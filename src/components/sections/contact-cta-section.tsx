"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants";

export function ContactCTASection() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/90 to-brand-700/85" />
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Free expert consultation available
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready for Your
            <span className="block text-gold-400">Dream Holiday?</span>
          </h2>

          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
            Talk to our travel experts today. We'll craft a personalized itinerary that matches your dreams and budget — completely free.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gold" size="xl" asChild>
              <Link href="/contact">
                <MessageSquare className="h-5 w-5" />
                Get Free Quote
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href={`tel:${SITE_CONFIG.phone}`}>
                <Phone className="h-5 w-5" />
                {SITE_CONFIG.phone}
              </a>
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
            {[
              "No booking fee",
              "Best price guarantee",
              "24/7 support",
              "Instant confirmation",
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-2 text-white/70 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-gold-400" />
                {feature}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
