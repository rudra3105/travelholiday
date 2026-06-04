"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ZoomIn } from "lucide-react";
import { SectionHeader } from "./section-header";
import { Button } from "@/components/ui/button";
import { GALLERY_DATA } from "@/lib/data";

interface GalleryImage {
  url: string;
  alt: string;
  destination: string;
  cols?: number;
  rows?: number;
}

interface Props {
  images?: GalleryImage[];
}

export function GallerySection({ images = GALLERY_DATA }: Props) {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Gallery"
          title="Captured"
          titleHighlight="Moments"
          subtitle="A visual journey through the destinations we've explored and the memories we've created"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 ? "1/1" : "4/3" }}
            >
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <ZoomIn className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-sm font-semibold bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                  {img.destination}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href="/gallery">
              View Full Gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
