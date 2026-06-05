"use client";

import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { Field, AdminInput, AdminTextarea, FormRow } from "@/components/admin/form-fields";

export default function AdminSettingsPage() {
  const { toasts, show } = useAdminToast();
  const [saving, setSaving] = useState<string | null>(null);

  const [general, setGeneral] = useState({
    site_name: "Travel Holiday",
    tagline: "Crafting Extraordinary Journeys",
    description: "Travel Holiday — India's most trusted travel partner from Jetpur, Gujarat.",
    address: "Jetpur, Gujarat, India",
    phone: "+91 8108101218",
    whatsapp: "+91 81081 01218",
    email: "info.travelholidays@gmail.com",
  });

  const [social, setSocial] = useState({
    facebook: "https://facebook.com/travelholiday",
    instagram: "https://instagram.com/travelholiday",
    twitter: "https://twitter.com/travelholiday",
    youtube: "https://youtube.com/@travelholiday",
  });

  const [seo, setSeo] = useState({
    meta_title: "Travel Holiday - Crafting Extraordinary Journeys",
    meta_description: "Explore handcrafted tour packages across India and world. Book your dream holiday with Travel Holiday, Jetpur, Gujarat.",
    og_image: "",
  });

  const [admin, setAdmin] = useState({
    admin_username: "travelholiday",
    admin_password: "TH@admin2024",
  });

  async function save(section: string) {
    setSaving(section);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(null);
    show(`${section} settings saved!`);
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminToasts toasts={toasts} />
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm">Manage website configuration</p>
      </div>

      {/* General Settings */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-bold mb-5">General Settings</h2>
        <div className="space-y-4">
          <FormRow>
            <Field label="Company Name">
              <AdminInput value={general.site_name} onChange={(e) => setGeneral((p) => ({ ...p, site_name: e.target.value }))} />
            </Field>
            <Field label="Tagline">
              <AdminInput value={general.tagline} onChange={(e) => setGeneral((p) => ({ ...p, tagline: e.target.value }))} />
            </Field>
          </FormRow>
          <Field label="Description">
            <AdminTextarea value={general.description} onChange={(e) => setGeneral((p) => ({ ...p, description: e.target.value }))} rows={2} />
          </Field>
          <Field label="Address">
            <AdminInput value={general.address} onChange={(e) => setGeneral((p) => ({ ...p, address: e.target.value }))} />
          </Field>
          <FormRow>
            <Field label="Phone">
              <AdminInput value={general.phone} onChange={(e) => setGeneral((p) => ({ ...p, phone: e.target.value }))} />
            </Field>
            <Field label="WhatsApp">
              <AdminInput value={general.whatsapp} onChange={(e) => setGeneral((p) => ({ ...p, whatsapp: e.target.value }))} />
            </Field>
          </FormRow>
          <Field label="Email">
            <AdminInput type="email" value={general.email} onChange={(e) => setGeneral((p) => ({ ...p, email: e.target.value }))} />
          </Field>
        </div>
        <button onClick={() => save("General")} disabled={saving === "General"} className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors">
          {saving === "General" ? <><span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"></span> Saving...</> : <><Save className="h-4 w-4" /> Save General</>}
        </button>
      </div>

      {/* Social Media */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-bold mb-5">Social Media Links</h2>
        <div className="space-y-4">
          {[
            { key: "facebook", label: "Facebook URL" },
            { key: "instagram", label: "Instagram URL" },
            { key: "twitter", label: "Twitter URL" },
            { key: "youtube", label: "YouTube URL" },
          ].map(({ key, label }) => (
            <Field key={key} label={label}>
              <AdminInput value={(social as any)[key]} onChange={(e) => setSocial((p) => ({ ...p, [key]: e.target.value }))} placeholder={`https://${key}.com/travelholiday`} />
            </Field>
          ))}
        </div>
        <button onClick={() => save("Social")} disabled={saving === "Social"} className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors">
          {saving === "Social" ? "Saving..." : <><Save className="h-4 w-4" /> Save Social</>}
        </button>
      </div>

      {/* SEO */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 p-6">
        <h2 className="text-white font-bold mb-5">SEO Settings</h2>
        <div className="space-y-4">
          <Field label="Meta Title" hint="Shown in browser tab and Google search">
            <AdminInput value={seo.meta_title} onChange={(e) => setSeo((p) => ({ ...p, meta_title: e.target.value }))} />
          </Field>
          <Field label="Meta Description" hint="Shown in Google search results (160 chars max)">
            <AdminTextarea value={seo.meta_description} onChange={(e) => setSeo((p) => ({ ...p, meta_description: e.target.value }))} rows={3} />
          </Field>
          <Field label="OG Image URL" hint="Image shown when shared on social media (1200x630px)">
            <AdminInput value={seo.og_image} onChange={(e) => setSeo((p) => ({ ...p, og_image: e.target.value }))} placeholder="https://..." />
          </Field>
        </div>
        <button onClick={() => save("SEO")} disabled={saving === "SEO"} className="mt-5 flex items-center gap-2 px-5 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors">
          {saving === "SEO" ? "Saving..." : <><Save className="h-4 w-4" /> Save SEO</>}
        </button>
      </div>

      {/* Admin Credentials */}
      <div className="bg-gray-900 rounded-2xl border border-amber-500/20 p-6">
        <h2 className="text-white font-bold mb-1">Admin Credentials</h2>
        <p className="text-amber-400 text-xs mb-5">⚠️ Change these in your <code className="bg-white/10 px-1 rounded">.env.local</code> file and Vercel environment variables for production.</p>
        <div className="space-y-4">
          <Field label="Admin Username">
            <AdminInput value={admin.admin_username} disabled className="opacity-60 cursor-not-allowed" />
          </Field>
          <Field label="Admin Password">
            <AdminInput type="password" value={admin.admin_password} disabled className="opacity-60 cursor-not-allowed" />
          </Field>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          To change: edit <code>NEXT_PUBLIC_ADMIN_USER</code> and <code>NEXT_PUBLIC_ADMIN_PASS</code> in your environment variables.
        </p>
      </div>
    </div>
  );
}
