"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TABS = ["All Tours", "Domestic", "International", "Honeymoon", "Adventure"];

export function SearchSection() {
  const [activeTab, setActiveTab] = useState("All Tours");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    if (travelers) params.set("travelers", travelers);
    if (activeTab !== "All Tours") params.set("type", activeTab.toLowerCase());
    router.push(`/packages?${params.toString()}`);
  };

  return (
    <section className="relative -mt-16 z-10 pb-4">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          {/* Tabs */}
          <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-100 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap",
                  activeTab === tab
                    ? "bg-brand-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-white hover:shadow-sm"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search fields */}
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Destination */}
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Where to?
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
                  <input
                    type="text"
                    placeholder="Search destinations..."
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Travel Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
                  <input
                    type="month"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 focus:border-brand-300 transition-all"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="md:w-40">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                  Travelers
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-400" />
                  <select
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
                    className="w-full h-12 pl-10 pr-4 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300 appearance-none cursor-pointer"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Person" : "People"}</option>
                    ))}
                    <option value="10+">10+ People</option>
                  </select>
                </div>
              </div>

              {/* Search button */}
              <div className="flex items-end">
                <Button
                  variant="premium"
                  size="lg"
                  onClick={handleSearch}
                  className="h-12 px-8 w-full md:w-auto"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Popular searches */}
          <div className="px-4 md:px-6 pb-4 flex items-center gap-3 flex-wrap">
            <span className="text-xs text-gray-400 font-medium">Popular:</span>
            {["Kerala Backwaters", "Bali 7N/8D", "Rajasthan Heritage", "Manali Snow", "Andaman Beach"].map((tag) => (
              <button
                key={tag}
                onClick={() => setDestination(tag)}
                className="px-3 py-1 rounded-full bg-brand-50 text-brand-600 text-xs font-medium hover:bg-brand-100 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
