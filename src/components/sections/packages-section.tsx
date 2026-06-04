"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PackageCard } from "./package-card";
import { Button } from "@/components/ui/button";
import { FEATURED_PACKAGES } from "@/lib/data";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "all", label: "All Packages" },
  { key: "domestic", label: "Domestic" },
  { key: "international", label: "International" },
  { key: "adventure", label: "Adventure" },
  { key: "honeymoon", label: "Honeymoon" },
];

export function PackagesSection() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? FEATURED_PACKAGES
    : FEATURED_PACKAGES.filter((p) => p.type === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Our Packages"
          title="Handcrafted"
          titleHighlight="Tour Packages"
          subtitle="Carefully designed itineraries that blend iconic landmarks with hidden gems for the perfect travel experience"
        />

        {/* Filter tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === tab.key
                  ? "bg-brand-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Packages grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg, i) => (
            <PackageCard key={pkg.id} {...pkg} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No packages found. Check back soon!</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/packages">
              View All Packages
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
