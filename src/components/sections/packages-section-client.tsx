"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "./section-header";
import { PackageCard } from "./package-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "all", label: "All Packages" },
  { key: "domestic", label: "Domestic" },
  { key: "international", label: "International" },
  { key: "adventure", label: "Adventure" },
  { key: "honeymoon", label: "Honeymoon" },
];

interface Package {
  id: string;
  title: string;
  slug: string;
  destination: string;
  duration_days: number;
  price_per_person: number;
  original_price?: number | null;
  cover_image: string;
  short_description: string;
  rating?: number;
  reviews_count?: number;
  best_seller?: boolean;
  featured?: boolean;
  type?: string;
}

export function PackagesSectionClient({ packages }: { packages: Package[] }) {
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all"
    ? packages
    : packages.filter((p) => p.type === activeTab);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Our Packages"
          title="Handcrafted"
          titleHighlight="Tour Packages"
          subtitle="Carefully designed itineraries that blend iconic landmarks with hidden gems"
        />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((pkg, i) => (
            <PackageCard
              key={pkg.id}
              {...pkg}
              original_price={pkg.original_price ?? undefined}
              index={i}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p>No packages found in this category.</p>
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
