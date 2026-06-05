"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Mail, ChevronDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveSubmenu(null);
  }, [pathname]);

  // On homepage: slightly transparent until scrolled. On other pages: always solid white.
  // Nav text: always DARK (gray-800/gray-900) for visibility as requested
  const isTransparent = isHomePage && !scrolled && mounted;
  const navBg = isTransparent
    ? "bg-white/90 backdrop-blur-md border-b border-gray-100"
    : "bg-white/95 backdrop-blur-md shadow-md border-b border-gray-100";

  // Text colors are now consistent regardless of transparency state
  const textColor = "text-gray-800";
  const hoverColor = "hover:text-brand-600 hover:bg-brand-50";
  const activeColor = "text-brand-600 bg-brand-50";

  return (
    <>
      {/* Top bar */}
      <div className="hidden lg:block bg-brand-900 text-white text-xs py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Phone className="h-3 w-3" />{SITE_CONFIG.phone}
            </a>
            <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 hover:text-gold-300 transition-colors">
              <Mail className="h-3 w-3" />{SITE_CONFIG.email}
            </a>
          </div>
          <div className="flex items-center gap-1 text-white/70">
            <MapPin className="h-3 w-3" />{SITE_CONFIG.address}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header className={cn("sticky top-0 z-50 w-full transition-all duration-500", navBg)}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/logo.png"
                  alt="Travel Holiday Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-gray-900 transition-colors">
                  {SITE_CONFIG.name}
                </div>
                <div className="text-[10px] font-medium tracking-wider uppercase text-brand-500 transition-colors">
                  {SITE_CONFIG.tagline}
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => link.submenu && setActiveSubmenu(link.label)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200",
                      textColor,
                      hoverColor,
                      pathname === link.href && activeColor
                    )}
                  >
                    {link.label}
                    {link.submenu && <ChevronDown className="h-3.5 w-3.5 opacity-70" />}
                  </Link>

                  {link.submenu && (
                    <AnimatePresence>
                      {activeSubmenu === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 pt-2 min-w-[200px]"
                        >
                          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                            {link.submenu.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Button variant="premium" size="sm" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <nav className="container mx-auto px-4 py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                        pathname === link.href ? "bg-brand-50 text-brand-600" : "text-gray-700 hover:bg-gray-50"
                      )}
                      onClick={() => !link.submenu && setIsOpen(false)}
                    >
                      {link.label}
                      {link.submenu && <ChevronDown className="h-4 w-4" />}
                    </Link>
                    {link.submenu && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.submenu.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-2 text-sm text-gray-600 hover:text-brand-600 rounded-lg hover:bg-brand-50 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 border-t border-gray-100">
                  <Button variant="premium" className="w-full" asChild>
                    <Link href="/contact">Get a Free Quote</Link>
                  </Button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
