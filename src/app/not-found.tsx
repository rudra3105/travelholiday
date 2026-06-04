import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Search, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        {/* Big 404 */}
        <div className="relative inline-block mb-8">
          <div className="text-[160px] md:text-[220px] font-black text-gray-100 leading-none select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-brand-500/10 flex items-center justify-center">
              <MapPin className="h-10 w-10 text-brand-500" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          Oops! This destination doesn't exist
        </h1>
        <p className="text-gray-500 text-lg mb-10 max-w-md mx-auto">
          Looks like you've wandered off the map. Let's get you back on track.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="premium" size="lg" asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/packages">
              <Search className="h-4 w-4" />
              Browse Packages
            </Link>
          </Button>
          <Button variant="ghost" size="lg" asChild>
            <a href={`tel:${SITE_CONFIG.phone}`}>
              <Phone className="h-4 w-4" />
              Call Us
            </a>
          </Button>
        </div>

        {/* Quick links */}
        <div className="mt-12 flex flex-wrap justify-center gap-3 text-sm">
          {[
            { label: "Destinations", href: "/destinations" },
            { label: "Tour Packages", href: "/packages" },
            { label: "Fixed Departures", href: "/fixed-departures" },
            { label: "Contact", href: "/contact" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 hover:bg-brand-50 hover:text-brand-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
