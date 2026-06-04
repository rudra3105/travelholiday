"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Award, Headphones, CreditCard, Users, Map } from "lucide-react";
import { SectionHeader } from "./section-header";
import { WHY_CHOOSE_US, STATS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Award, Headphones, CreditCard, Users, Map,
};

export function WhyChooseUsSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          countersRef.current.forEach((el, i) => {
            const target = STATS[i];
            if (!el || !target) return;
            gsap.from({ val: 0 }, {
              val: target.value,
              duration: 2.5,
              ease: "power2.out",
              onUpdate: function() {
                el.textContent = Math.round(this.targets()[0].val).toLocaleString() + target.suffix;
              }
            });
          });
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-brand-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Why Us"
          title="Travel With"
          titleHighlight="Confidence"
          subtitle="18+ years of experience crafting perfect holidays for over 50,000 satisfied travelers across India and worldwide"
        />

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-sm border border-brand-100"
            >
              <div
                ref={(el) => { if (el) countersRef.current[i] = el; }}
                className="text-4xl font-bold text-brand-600 mb-1"
              >
                {stat.value}{stat.suffix}
              </div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon];
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 flex items-center justify-center mb-4 group-hover:bg-brand-500 transition-colors">
                    {Icon && <Icon className="h-7 w-7 text-brand-500 group-hover:text-white transition-colors" />}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
