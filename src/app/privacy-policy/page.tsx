import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "VoyageIndia privacy policy — how we collect, use and protect your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-brand-900 to-brand-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2>1. Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you submit an inquiry form, book a tour, or contact our customer support. This includes your name, email address, phone number, travel preferences, and payment information.</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process your tour bookings and reservations</li>
              <li>Send you booking confirmations and travel information</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Improve our services and website</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service partners (hotels, airlines, tour operators) solely to fulfill your travel booking.</p>

            <h2>4. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information. All payment transactions are processed through secure encrypted connections (SSL/TLS).</p>

            <h2>5. Cookies</h2>
            <p>We use cookies to enhance your browsing experience, analyze website traffic, and personalize content. You can control cookie settings through your browser preferences.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal information. To exercise these rights, contact us at {SITE_CONFIG.email}.</p>

            <h2>7. Contact Us</h2>
            <p>For privacy-related questions, contact us at: {SITE_CONFIG.email} or {SITE_CONFIG.phone}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
