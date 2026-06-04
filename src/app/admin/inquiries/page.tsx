import type { Metadata } from "next";
import { Phone, Mail, MapPin, Calendar } from "lucide-react";
import { getInquiries } from "@/lib/db";

export const metadata: Metadata = { title: "Inquiries" };
export const dynamic = "force-dynamic";

const STATUS_CONFIG = {
  new: { label: "New", color: "bg-blue-100 text-blue-700" },
  contacted: { label: "Contacted", color: "bg-amber-100 text-amber-700" },
  converted: { label: "Converted", color: "bg-emerald-100 text-emerald-700" },
  closed: { label: "Closed", color: "bg-gray-100 text-gray-600" },
};

export default async function AdminInquiriesPage() {
  let inquiries: any[] = [];
  let error = "";

  try {
    inquiries = await getInquiries({ limit: 50 });
  } catch (e: any) {
    error = e.message;
    // Fallback demo data
    inquiries = [
      { id: "1", name: "Priya Sharma", email: "priya@email.com", phone: "9876543210", destination: "Kerala", travel_date: "2024-03", num_travelers: 2, budget: "25k-50k", message: "Looking for a honeymoon package to Kerala with houseboat experience.", status: "new", created_at: "2024-02-12" },
      { id: "2", name: "Rajesh Kumar", email: "rajesh@email.com", phone: "9876543211", destination: "Rajasthan", travel_date: "2024-04", num_travelers: 4, budget: "10k-25k", message: "Family trip to Rajasthan covering Jaipur, Jodhpur and Udaipur.", status: "contacted", created_at: "2024-02-11" },
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Inquiries</h1>
          <p className="text-gray-400 text-sm">{inquiries.length} total inquiries</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(STATUS_CONFIG).map(([key, val]) => (
            <span key={key} className={`text-xs font-medium px-3 py-1 rounded-full ${val.color}`}>
              {val.label}: {inquiries.filter((i) => i.status === key).length}
            </span>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-400 text-sm">
          ⚠️ Database not yet configured — showing demo data. Run <code className="bg-white/10 px-1 rounded">npm run db:migrate</code> to set up Supabase.
        </div>
      )}

      <div className="space-y-4">
        {inquiries.map((inquiry) => {
          const status = STATUS_CONFIG[inquiry.status as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.new;
          return (
            <div key={inquiry.id} className="bg-gray-900 rounded-2xl border border-white/5 p-5">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-white font-semibold">{inquiry.name}</h3>
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${status.color}`}>{status.label}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1 hover:text-white">
                      <Mail className="h-3.5 w-3.5" />{inquiry.email}
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1 hover:text-white">
                      <Phone className="h-3.5 w-3.5" />{inquiry.phone}
                    </a>
                  </div>
                </div>
                <div className="text-xs text-gray-500 shrink-0">
                  {new Date(inquiry.created_at).toLocaleDateString("en-IN")}
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-400 mb-3 flex-wrap">
                {inquiry.destination && (
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-brand-400" />{inquiry.destination}</span>
                )}
                {inquiry.travel_date && (
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-brand-400" />{inquiry.travel_date}</span>
                )}
                {inquiry.num_travelers && <span>{inquiry.num_travelers} travelers</span>}
                {inquiry.budget && <span>Budget: {inquiry.budget}</span>}
              </div>

              <p className="text-gray-300 text-sm bg-white/5 rounded-xl p-3 mb-4 line-clamp-3">
                {inquiry.message}
              </p>

              <div className="flex gap-2 flex-wrap">
                <select
                  defaultValue={inquiry.status}
                  className="text-xs bg-white/5 border border-white/10 text-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-brand-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                  <option value="closed">Closed</option>
                </select>
                <a href={`tel:${inquiry.phone}`} className="text-xs bg-brand-500/20 text-brand-400 border border-brand-500/30 rounded-lg px-3 py-1.5 hover:bg-brand-500/30 transition-colors flex items-center gap-1">
                  <Phone className="h-3 w-3" />Call
                </a>
                <a href={`mailto:${inquiry.email}`} className="text-xs bg-white/5 text-gray-300 border border-white/10 rounded-lg px-3 py-1.5 hover:bg-white/10 transition-colors flex items-center gap-1">
                  <Mail className="h-3 w-3" />Email
                </a>
                <a href={`https://wa.me/${inquiry.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-[#25D366]/20 text-[#25D366] border border-[#25D366]/30 rounded-lg px-3 py-1.5 hover:bg-[#25D366]/30 transition-colors">
                  WhatsApp
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
