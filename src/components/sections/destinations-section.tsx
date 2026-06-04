"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { DestinationCard } from "./destination-card";
import { Button } from "@/components/ui/button";
import { DESTINATIONS_DOMESTIC, DESTINATIONS_INTERNATIONAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function DestinationsSection() {
  const [activeTab, setActiveTab] = useState<"domestic" | "international">("domestic");

  const destinations = activeTab === "domestic" ? DESTINATIONS_DOMESTIC : DESTINATIONS_INTERNATIONAL;

  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Explore"
          title="Popular"
          titleHighlight="Destinations"
          subtitle="From the majestic Himalayas to tropical paradise — discover your perfect getaway"
        />

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center gap-1 p-1 bg-white rounded-2xl shadow-sm border border-gray-100">
            {[
              { key: "domestic", label: "🇮🇳 Domestic" },
              { key: "international", label: "✈️ International" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "domestic" | "international")}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                  activeTab === tab.key
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {destinations.map((dest, i) => (
            <DestinationCard key={dest.slug} {...dest} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Button variant="outline" size="lg" asChild>
            <Link href={`/destinations?type=${activeTab}`}>
              View All {activeTab === "domestic" ? "Domestic" : "International"} Destinations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
