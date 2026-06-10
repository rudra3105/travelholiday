import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, ArrowRight, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

interface FooterProps {
  config: any;
  domestic: any[];
  international: any[];
}

export function Footer({ config, domestic, international }: FooterProps) {
  const displayDomestic = domestic?.length > 0 ? domestic.slice(0, 6) : [];
  const displayInternational = international?.length > 0 ? international.slice(0, 6) : [];

  return (
    <footer className="bg-gray-950 text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Subscribe for Travel Deals</h3>
              <p className="text-gray-400">Get exclusive offers, travel tips and destination guides</p>
            </div>
            <form className="flex gap-3 w-full md:w-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-brand-400 transition-colors" />
              <button type="submit" className="px-6 py-3 bg-brand-500 hover:bg-brand-400 text-white font-semibold rounded-xl transition-colors whitespace-nowrap">Subscribe</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(250px, 1fr))`
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 shrink-0">
                <Image src="/logo.png" alt="Travel Holiday Logo" fill className="object-contain" />
              </div>
              <div>
                <div className="text-xl font-bold">{config.site_name || config.name}</div>
                <div className="text-xs text-white/50 uppercase tracking-wider">{config.tagline}</div>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {config.description || "India's most trusted travel partner. Crafting extraordinary journeys across 100+ destinations worldwide."}
            </p>
            <div className="space-y-3">
              {config.phone && (
                <a href={`tel:${String(config.phone).replace(/\s+/g, '')}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 text-brand-400 shrink-0" />{config.phone}
                </a>
              )}
              {config.email && (
                 <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                   <Mail className="h-4 w-4 text-brand-400 shrink-0" />{config.email}
                 </a>
               )}
               {config.whatsapp && (
                 <a href={`https://wa.me/${String(config.whatsapp).replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-gray-400 hover:text-white transition-colors">
                   <MessageSquare className="h-4 w-4 text-brand-400 shrink-0" />{config.whatsapp}
                 </a>
               )}
               {config.address && (
                <div className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />{config.address}
                </div>
              )}
            </div>
          </div>

          {/* Domestic */}
          {displayDomestic.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-5">Domestic Destinations</h4>
              <ul className="space-y-2.5">
                {displayDomestic.map((dest: any) => (
                  <li key={dest.slug}>
                    <Link href={`/destinations/${dest.slug}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors group">
                      <ArrowRight className="h-3 w-3 text-brand-400 group-hover:translate-x-1 transition-transform" />{dest.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* International */}
          {displayInternational.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-5">International Destinations</h4>
              <ul className="space-y-2.5">
                {displayInternational.map((dest: any) => (
                  <li key={dest.slug}>
                    <Link href={`/destinations/${dest.slug}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors group">
                      <ArrowRight className="h-3 w-3 text-brand-400 group-hover:translate-x-1 transition-transform" />{dest.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: "About Us", href: "/about" },
                { label: "Tour Packages", href: "/packages" },
                { label: "Fixed Departures", href: "/fixed-departures" },
                { label: "Gallery", href: "/gallery" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Contact Us", href: "/contact" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms & Conditions", href: "/terms-conditions" },
                { label: "Cancellation Policy", href: "/cancellation-policy" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white flex items-center gap-2 transition-colors group">
                    <ArrowRight className="h-3 w-3 text-brand-400 group-hover:translate-x-1 transition-transform" />{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved. Developed by{" "}
            <a 
              href="https://www.webriseglobal.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-brand-400 hover:text-brand-300 transition-colors font-medium"
            >
              Webrise Global
            </a>
          </p>
          <div className="flex items-center gap-3">
            {[
              { href: config.facebook || SITE_CONFIG.social.facebook, label: "FB" },
              { href: config.instagram || SITE_CONFIG.social.instagram, label: "IG" },
              { href: config.twitter || SITE_CONFIG.social.twitter, label: "TW" },
              { href: config.youtube || SITE_CONFIG.social.youtube, label: "YT" },
            ].map(({ href, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-xl bg-white/10 hover:bg-brand-500 flex items-center justify-center transition-colors text-xs font-bold text-white/70 hover:text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
