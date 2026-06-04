import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancellation Policy",
  description: "VoyageIndia cancellation and refund policy for tour packages.",
};

export default function CancellationPolicyPage() {
  const policy = [
    { timeline: "30+ days before departure", refund: "90% refund (10% admin charges)" },
    { timeline: "15–29 days before departure", refund: "50% refund" },
    { timeline: "7–14 days before departure", refund: "25% refund" },
    { timeline: "Less than 7 days", refund: "No refund" },
    { timeline: "No-show", refund: "No refund" },
  ];

  return (
    <>
      <section className="py-16 bg-gradient-to-br from-brand-900 to-brand-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Cancellation Policy</h1>
          <p className="text-white/70">Last updated: January 2024</p>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation & Refund Schedule</h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 mb-10">
            <table className="w-full">
              <thead className="bg-brand-500 text-white">
                <tr>
                  <th className="text-left px-6 py-4 font-semibold">Cancellation Timeline</th>
                  <th className="text-left px-6 py-4 font-semibold">Refund Amount</th>
                </tr>
              </thead>
              <tbody>
                {policy.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 text-gray-700">{row.timeline}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{row.refund}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="prose prose-gray max-w-none">
            <h3>How to Cancel</h3>
            <p>To cancel your booking, send a written cancellation request to our email or visit our office. Verbal cancellations are not accepted. Cancellation is processed from the date we receive your written request.</p>

            <h3>Refund Processing</h3>
            <p>Approved refunds are processed within 10–14 working days via the original payment method. Bank transfer refunds may take additional 3–5 working days to reflect.</p>

            <h3>Special Circumstances</h3>
            <p>In case of cancellation due to natural disasters, pandemics, or government travel restrictions, we offer a full credit note valid for 12 months or a partial refund after deducting non-recoverable costs.</p>

            <h3>Non-Refundable Items</h3>
            <p>Visa fees, insurance premiums, special permits, and certain hotel bookings marked as non-refundable are not eligible for refund regardless of cancellation date.</p>
          </div>
        </div>
      </section>
    </>
  );
}
