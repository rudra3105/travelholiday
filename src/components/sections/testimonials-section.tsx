"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeader } from "./section-header";
import { TESTIMONIALS_DATA } from "@/lib/data";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  review: string;
  destination: string;
  travel_date: string;
}

interface Props {
  testimonials?: Testimonial[];
}

export function TestimonialsSection({ testimonials = TESTIMONIALS_DATA }: Props) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Testimonials"
          title="What Our"
          titleHighlight="Travelers Say"
          subtitle="Real stories from real travelers who've experienced the Travel Holiday difference"
        />

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-brand-100 h-full flex flex-col">
                <Quote className="h-8 w-8 text-brand-200 mb-4 shrink-0" />
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
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-50 rounded-2xl p-6"
            >
              <Quote className="h-8 w-8 text-brand-200 mb-4" />
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"{testimonials[current].review}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < testimonials[current].rating ? "fill-gold-400 text-gold-400" : "text-gray-200"}`} />
                ))}
              </div>
              <div className="flex items-center gap-3">
                {testimonials[current].avatar && (
                  <img src={testimonials[current].avatar} alt={testimonials[current].name} className="w-10 h-10 rounded-full object-cover" />
                )}
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{testimonials[current].name}</div>
                  <div className="text-xs text-gray-500">{testimonials[current].location} · {testimonials[current].travel_date}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-50 transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-brand-500 w-6" : "bg-gray-300"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-brand-50 transition-colors">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
