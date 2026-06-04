"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, MessageSquare, X } from "lucide-react";
import { InquiryForm } from "@/components/sections/inquiry-form";

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showInquiry, setShowInquiry] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      {/* Floating inquiry button */}
      <div className="fixed bottom-24 right-6 z-40">
        <AnimatePresence>
          {showInquiry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-16 right-0 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="bg-gradient-to-r from-brand-500 to-brand-700 p-4 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">Quick Inquiry</div>
                  <div className="text-white/70 text-xs">We'll call you back in 2 hours</div>
                </div>
                <button
                  onClick={() => setShowInquiry(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto">
                <InquiryForm compact />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInquiry(!showInquiry)}
          className="w-14 h-14 rounded-full bg-brand-500 text-white shadow-lg hover:bg-brand-600 flex items-center justify-center transition-colors"
          aria-label="Quick Inquiry"
        >
          {showInquiry ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </motion.button>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-11 h-11 rounded-full bg-gray-900 text-white shadow-lg hover:bg-gray-700 flex items-center justify-center transition-colors"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
