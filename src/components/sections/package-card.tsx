"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, Clock, Users, MapPin, Tag, ArrowRight, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency, getDurationLabel } from "@/lib/utils";

interface PackageCardProps {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  original_price?: number;
  cover_image: string;
  short_description: string;
  rating?: number;
  reviews_count?: number;
  best_seller?: boolean;
  featured?: boolean;
  type?: string;
  index?: number;
}

export function PackageCard({
  id, title, slug, destination, duration_days, price_per_person,
  original_price, cover_image, short_description, rating = 4.8,
  reviews_count = 0, best_seller, featured, type, index = 0
}: PackageCardProps) {
  const discount = original_price
    ? Math.round(((original_price - price_per_person) / original_price) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-400 border border-gray-100 premium-card h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/10]">
          <img
            src={cover_image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {best_seller && (
              <Badge variant="gold" className="text-xs">
                <Zap className="h-3 w-3 mr-1" />
                Best Seller
              </Badge>
            )}
            {featured && !best_seller && (
              <Badge variant="premium" className="text-xs">Featured</Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-emerald-500 text-white text-xs border-0">
                {discount}% OFF
              </Badge>
            )}
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
              <Clock className="h-3 w-3" />
              {getDurationLabel(duration_days)}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-1 text-gray-500 text-xs mb-2">
            <MapPin className="h-3 w-3 text-brand-400" />
            {destination}
          </div>

          <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-brand-600 transition-colors leading-snug">
            {title}
          </h3>

          <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-1">
            {short_description}
          </p>

          {/* Rating */}
          {reviews_count > 0 && (
            <div className="flex items-center gap-1.5 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < Math.floor(rating) ? "fill-gold-400 text-gold-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{rating}</span>
              <span className="text-xs text-gray-400">({reviews_count} reviews)</span>
            </div>
          )}

          {/* Price & CTA */}
          <div className="flex items-end justify-between pt-4 border-t border-gray-100">
            <div>
              {original_price && original_price > price_per_person && (
                <div className="text-xs text-gray-400 line-through">{formatCurrency(original_price)}</div>
              )}
              <div className="text-xl font-bold text-brand-600">{formatCurrency(price_per_person)}</div>
              <div className="text-xs text-gray-400">per person</div>
            </div>
            <Button variant="premium" size="sm" asChild>
              <Link href={`/packages/${slug}`}>
                View Details
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
