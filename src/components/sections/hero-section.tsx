"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ChevronDown, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85",
    destination: "Himachal Pradesh",
    subtext: "Explore breathtaking valleys, ancient temples and pristine snow-capped peaks",
  },
  {
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=85",
    destination: "Kerala",
    subtext: "Drift through emerald backwaters and lush spice plantations",
  },
  {
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=85",
    destination: "Bali, Indonesia",
    subtext: "Ancient temples, terraced rice fields, and pristine beaches await",
  },
];

// Fixed particle positions — no Math.random() to avoid hydration mismatch
const PARTICLES = [
  { left: "15%", top: "20%", delay: 0, duration: 4 },
  { left: "80%", top: "15%", delay: 1, duration: 5 },
  { left: "45%", top: "70%", delay: 0.5, duration: 6 },
  { left: "70%", top: "55%", delay: 2, duration: 4.5 },
  { left: "25%", top: "80%", delay: 1.5, duration: 5.5 },
  { left: "90%", top: "40%", delay: 0.8, duration: 4 },
];

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const currentSlide = 0;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(titleRef.current, { y: 80, opacity: 0, duration: 1.2, ease: "power4.out" })
        .from(subtitleRef.current, { y: 40, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        .from(ctaRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4");
      if (badgesRef.current) {
        tl.from(Array.from(badgesRef.current.children), {
          y: 20, opacity: 0, duration: 0.6, stagger: 0.15, ease: "power2.out",
        }, "-=0.3");
      }
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[100svh] min-h-[600px] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={HERO_SLIDES[currentSlide].image}
          alt={HERO_SLIDES[currentSlide].destination}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      {/* Fixed-position particles — no random, no hydration mismatch */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{ left: p.left, top: p.top }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.7, 0.3], scale: [1, 1.5, 1] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-white/90 text-sm font-medium">
                <MapPin className="h-4 w-4 text-gold-400" />
                Featured: {HERO_SLIDES[currentSlide].destination}
              </div>
            </motion.div>

            <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Discover the
              <span className="block gradient-text">World's Wonders</span>
            </h1>

            <p ref={subtitleRef} className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-xl">
              {HERO_SLIDES[currentSlide].subtext}. Crafted itineraries for 50,000+ happy travelers.
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4 mb-12">
              <Button variant="gold" size="xl" asChild>
                <Link href="/packages">Explore Packages</Link>
              </Button>
              <Button variant="glass" size="xl" asChild>
                <a href={`tel:+918108101218`}>
                  <Phone className="h-5 w-5" />
                  Free Consultation
                </a>
              </Button>
            </div>

            <div ref={badgesRef} className="flex flex-wrap gap-4">
              {[
                { value: "50,000+", label: "Happy Travelers" },
                { value: "18+ Years", label: "Experience" },
                { value: "100+", label: "Destinations" },
                { value: "4.9★", label: "Rating" },
              ].map((badge) => (
                <div key={badge.label} className="glass rounded-xl px-4 py-3 text-center">
                  <div className="text-white font-bold text-lg leading-none">{badge.value}</div>
                  <div className="text-white/60 text-xs mt-1">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  );
}
