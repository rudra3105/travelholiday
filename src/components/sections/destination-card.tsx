"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Package, ArrowRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface DestinationCardProps {
  name: string;
  slug: string;
  tagline: string;
  image: string;
  packages: number;
  starting_from: number;
  index?: number;
}

export function DestinationCard({ name, slug, tagline, image, packages, starting_from, index = 0 }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link href={`/destinations/${slug}`} className="group block">
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-gray-200 premium-card">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
              <Package className="h-3 w-3" />
              {packages} Packages
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-1 text-white/70 text-xs mb-1">
              <MapPin className="h-3 w-3" />
              {tagline}
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-white/60 text-xs">Starting from</span>
                <div className="text-gold-400 font-bold text-lg">{formatCurrency(starting_from)}</div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-500 transition-colors">
                <ArrowRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
