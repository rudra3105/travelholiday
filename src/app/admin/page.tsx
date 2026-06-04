import type { Metadata } from "next";
import Link from "next/link";
import { Package, MapPin, MessageSquare, Calendar, TrendingUp, ArrowUpRight } from "lucide-react";
import { getInquiries } from "@/lib/db";
import { FEATURED_PACKAGES } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export const metadata: Metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  let recentInquiries: any[] = [];
  let inquiryCount = 0;
  let dbConnected = false;

  try {
    recentInquiries = await getInquiries({ limit: 6 });
    inquiryCount = recentInquiries.length;
    dbConnected = true;
  } catch {
    // DB not yet connected — use demo data
    recentInquiries = [
      { id: "1", name: "Priya Sharma", destination: "Kerala", created_at: new Date().toISOString(), status: "new" },
      { id: "2", name: "Rajesh Kumar", destination: "Rajasthan", created_at: new Date().toISOString(), status: "contacted" },
      { id: "3", name: "Anita Patel", destination: "Bali", created_at: new Date().toISOString(), status: "new" },
    ];
    inquiryCount = 142; // Demo
  }

  const STATS = [
    { label: "Total Packages", value: 100, icon: Package, color: "text-blue-400", bg: "bg-blue-400/10", change: "+12%" },
    { label: "Destinations", value: 12, icon: MapPin, color: "text-emerald-400", bg: "bg-emerald-400/10", change: "+5%" },
    { label: "Inquiries (Month)", value: inquiryCount, icon: MessageSquare, color: "text-amber-400", bg: "bg-amber-400/10", change: "+28%" },
    { label: "Active Departures", value: 4, icon: Calendar, color: "text-purple-400", bg: "bg-purple-400/10", change: "+2" },
  ];

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-blue-100 text-blue-700",
    contacted: "bg-amber-100 text-amber-700",
    converted: "bg-emerald-100 text-emerald-700",
    closed: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          {dbConnected ? "Live data from Supabase" : "⚠️ Demo mode — run npm run db:migrate to connect Supabase"}
        </p>
      </div>

      {!dbConnected && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-amber-400 text-sm">
          Database not yet set up. Run <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">npm run db:migrate</code> locally to apply migrations and seed data to Supabase.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-2xl border border-white/5 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />{stat.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent inquiries */}
        <div className="lg:col-span-2 bg-gray-900 rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentInquiries.map((inquiry) => (
              <div key={inquiry.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-sm">
                    {inquiry.name[0]}
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">{inquiry.name}</div>
                    <div className="text-gray-400 text-xs">
                      {inquiry.destination} · {new Date(inquiry.created_at).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[inquiry.status] || STATUS_COLORS.new}`}>
                  {inquiry.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top packages */}
        <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-bold">Top Packages</h2>
            <Link href="/admin/packages" className="text-sm text-brand-400 hover:text-brand-300 flex items-center gap-1">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {FEATURED_PACKAGES.filter((p) => p.best_seller || p.featured).slice(0, 5).map((pkg) => (
              <div key={pkg.id} className="flex items-center gap-3">
                <img src={pkg.cover_image} alt={pkg.title} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-white text-sm font-medium truncate">{pkg.title}</div>
                  <div className="text-gray-400 text-xs">{formatCurrency(pkg.price_per_person)}/person</div>
                </div>
                {pkg.best_seller && (
                  <span className="text-xs bg-gold-400/20 text-gold-400 px-2 py-0.5 rounded-full shrink-0">Hot</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
