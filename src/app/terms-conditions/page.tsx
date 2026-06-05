import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Travel Holiday terms and conditions for tour bookings and services.",
};

export default function TermsPage() {
  return (
    <>
      <section className="py-16 bg-gradient-to-br from-brand-900 to-brand-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Terms & Conditions</h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-gray max-w-none">
            <h2>1. Booking & Payment</h2>
            <p>A booking is confirmed upon receipt of the advance deposit (minimum 25% of total tour cost). Full payment is required 30 days before departure. We accept payments via NEFT, RTGS, credit/debit cards, and UPI.</p>

            <h2>2. Pricing</h2>
            <p>All prices are per person based on twin/double sharing unless stated otherwise. Prices are subject to change due to currency fluctuations, fuel surcharges, or government taxes. We will notify you of any price changes before booking confirmation.</p>

            <h2>3. Inclusions & Exclusions</h2>
            <p>Each tour package clearly lists what is included and excluded. Items not mentioned in the inclusions are to be borne by the traveler. This typically includes airfare (unless specified), visa fees, travel insurance, personal expenses, and tips.</p>

            <h2>4. Itinerary Changes</h2>
            <p>We reserve the right to modify itineraries due to weather, road conditions, strikes, or other unforeseen circumstances. We will make every effort to provide equivalent alternatives without additional cost.</p>

            <h2>5. Responsibility</h2>
            <p>Travel Holiday acts as an agent for hotels, airlines, and tour operators. We are not responsible for accidents, illness, theft, or losses during your travel. We strongly recommend purchasing comprehensive travel insurance.</p>

            <h2>6. Travel Documents</h2>
            <p>It is the traveler's responsibility to ensure valid travel documents (passport, visa, ID) are in order. Travel Holiday is not responsible for denied boarding or entry due to invalid documents.</p>

            <h2>7. Disputes</h2>
            <p>Any disputes shall be subject to the jurisdiction of courts in New Delhi, India.</p>
          </div>
        </div>
      </section>
    </>
  );
}
