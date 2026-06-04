"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({ eyebrow, title, titleHighlight, subtitle, centered = true, className }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={cn(centered ? "text-center" : "", "mb-12", className)}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="h-px w-8 bg-brand-500" />
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-widest">{eyebrow}</span>
          <div className="h-px w-8 bg-brand-500" />
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
        {title}
        {titleHighlight && (
          <>
            {" "}
            <span className="gradient-text">{titleHighlight}</span>
          </>
        )}
      </h2>
      {subtitle && (
        <p className={cn("text-gray-600 text-lg leading-relaxed mt-4", centered ? "max-w-2xl mx-auto" : "max-w-2xl")}>
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
