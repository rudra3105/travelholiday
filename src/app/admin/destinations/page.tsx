"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, ChevronDown, ChevronUp } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, AdminSelect, AdminTagInput, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { formatCurrency } from "@/lib/utils";
import { getDestinations } from "@/lib/db";
import { saveDestinationAction, deleteDestinationAction } from "@/actions/admin";

type Dest = {
  id: string;
  name: string;
  slug: string;
  country: string;
  short_description: string;
  description: string;
  cover_image: string;
  gallery_images: string[];
  region: "domestic" | "international";
  featured: boolean;
  sort_order: number;
  highlights: string[];
  best_time_to_visit: string;
  climate: string;
  language: string;
  currency: string;
  timezone: string;
  visa_required: boolean;
  starting_price: number;
};

const EMPTY: Omit<Dest, "id"> = {
  name: "",
  slug: "",
  country: "India",
  short_description: "",
  description: "",
  cover_image: "",
  gallery_images: [],
  region: "domestic",
  featured: false,
  sort_order: 0,
  highlights: [],
  best_time_to_visit: "",
  climate: "",
  language: "",
  currency: "INR (₹)",
  timezone: "IST (UTC+5:30)",
  visa_required: false,
  starting_price: 0,
};

type Tab = "basic" | "content" | "details";

export default function AdminDestinationsPage() {
  const [dests, setDests] = useState<Dest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Dest | null>(null);
  const [form, setForm] = useState<Omit<Dest, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const { toasts, show } = useAdminToast();

  useEffect(() => {
    loadDests();
  }, []);

  async function loadDests() {
    setLoading(true);
    try {
      const data = await getDestinations();
      setDests(data as Dest[]);
    } catch (error) {
      show("Failed to load destinations", "error");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditItem(null);
    setForm({ ...EMPTY, sort_order: dests.length });
    setActiveTab("basic");
    setIsOpen(true);
  }

  function openEdit(d: Dest) {
    setEditItem(d);
    setForm({
      name: d.name,
      slug: d.slug,
      country: d.country || "India",
      short_description: d.short_description || "",
      description: d.description || "",
      cover_image: d.cover_image || "",
      gallery_images: d.gallery_images || [],
      region: d.region,
      featured: d.featured || false,
      sort_order: d.sort_order || 0,
      highlights: d.highlights || [],
      best_time_to_visit: d.best_time_to_visit || "",
      climate: d.climate || "",
      language: d.language || "",
      currency: d.currency || "INR (₹)",
      timezone: d.timezone || "IST (UTC+5:30)",
      visa_required: d.visa_required || false,
      starting_price: d.starting_price || 0,
    });
    setActiveTab("basic");
    setIsOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name) {
      show("Name is required", "error");
      return;
    }
    setSaving(true);
    try {
      const payload = editItem ? { ...form, id: editItem.id } : form;
      await saveDestinationAction(payload);
      show(editItem ? "Destination updated!" : "Destination added!");
      await loadDests();
      setIsOpen(false);
    } catch (error) {
      show("Failed to save", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await deleteDestinationAction(deleteId);
      show("Deleted successfully");
      await loadDests();
      setDeleteId(null);
    } catch (error) {
      show("Failed to delete", "error");
    }
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  const TABS: { id: Tab; label: string }[] = [
    { id: "basic", label: "Basic Info" },
    { id: "content", label: "Page Content" },
    { id: "details", label: "Travel Details" },
  ];

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations</h1>
          <p className="text-gray-400 text-sm">{dests.length} destinations</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Destination
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-900 rounded-2xl border border-white/5" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dests.map((dest) => (
            <div key={dest.id} className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden group">
              <div className="relative h-36 overflow-hidden">
                {dest.cover_image ? (
                  <img
                    src={dest.cover_image}
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600 text-sm">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40" />
                <span
                  className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium ${
                    dest.region === "domestic" ? "bg-brand-500 text-white" : "bg-gold-500 text-white"
                  }`}
                >
                  {dest.region === "domestic" ? "🇮🇳 Domestic" : "✈️ International"}
                </span>
                {dest.featured && (
                  <span className="absolute top-3 right-3 text-[10px] bg-gold-400 text-black px-2 py-0.5 rounded-full font-bold">
                    FEATURED
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">{dest.name || "Unnamed"}</h3>
                <p className="text-gray-400 text-xs mb-1 line-clamp-1">{dest.short_description}</p>
                {(dest as any).starting_from > 0 && (
                  <p className="text-brand-400 text-xs font-semibold mb-2">
                    From {formatCurrency((dest as any).starting_from)}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 text-[10px] uppercase tracking-wider font-semibold">
                    Order: {dest.sort_order}
                  </span>
                  <div className="flex gap-1">
                    <Link href={`/destinations/${dest.slug}`} target="_blank">
                      <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10">
                        <Eye className="h-4 w-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => openEdit(dest)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(dest.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {dests.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-gray-900 rounded-2xl border border-dashed border-white/10">
              No destinations found in database.
            </div>
          )}
        </div>
      )}

      <AdminModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editItem ? "Edit Destination" : "Add Destination"}
        size="lg"
      >
        {/* Tab bar */}
        <div className="flex gap-1 mb-5 bg-white/5 p-1 rounded-xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-brand-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* ── BASIC INFO TAB ── */}
          {activeTab === "basic" && (
            <>
              <FormRow>
                <Field label="Name" required>
                  <AdminInput
                    value={form.name}
                    onChange={(e) => {
                      set("name", e.target.value);
                      if (!editItem) set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"));
                    }}
                    placeholder="e.g. Kerala"
                    required
                  />
                </Field>
                <Field label="Region">
                  <AdminSelect
                    value={form.region}
                    onChange={(e) => set("region", e.target.value)}
                    options={[
                      { value: "domestic", label: "🇮🇳 Domestic" },
                      { value: "international", label: "✈️ International" },
                    ]}
                  />
                </Field>
              </FormRow>
              <FormRow>
                <Field label="URL Slug">
                  <AdminInput
                    value={form.slug}
                    onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))}
                    placeholder="kerala"
                  />
                </Field>
                <Field label="Country">
                  <AdminInput
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    placeholder="India"
                  />
                </Field>
              </FormRow>
              <Field label="Short Description (Tagline)" hint="Short line shown under destination name">
                <AdminInput
                  value={form.short_description}
                  onChange={(e) => set("short_description", e.target.value)}
                  placeholder="God's Own Country"
                />
              </Field>
              <Field label="Cover Image URL">
                <AdminInput
                  value={form.cover_image}
                  onChange={(e) => set("cover_image", e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                {form.cover_image && (
                  <img src={form.cover_image} alt="" className="mt-2 h-20 rounded-lg object-cover" />
                )}
              </Field>
              <FormRow>
                <Field label="Starting Price (₹)" hint="Override display price (0 = auto from packages)">
                  <AdminInput
                    type="number"
                    value={form.starting_price || ""}
                    onChange={(e) => set("starting_price", Number(e.target.value))}
                    placeholder="0"
                    min={0}
                  />
                </Field>
                <Field label="Sort Order">
                  <AdminInput
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => set("sort_order", Number(e.target.value))}
                  />
                </Field>
              </FormRow>
              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => set("featured", e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-500"
                  />
                  <span className="text-sm text-gray-300">Featured Destination</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.visa_required}
                    onChange={(e) => set("visa_required", e.target.checked)}
                    className="w-4 h-4 rounded accent-brand-500"
                  />
                  <span className="text-sm text-gray-300">Visa Required</span>
                </label>
              </div>
            </>
          )}

          {/* ── PAGE CONTENT TAB ── */}
          {activeTab === "content" && (
            <>
              <Field label="Full Description" hint="Detailed description shown on the destination page">
                <AdminTextarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Write a detailed description of this destination..."
                  rows={6}
                />
              </Field>
              <Field label="Highlights" hint="Key highlights — press Enter to add each one">
                <AdminTagInput
                  value={form.highlights}
                  onChange={(v) => set("highlights", v)}
                  placeholder="e.g. Backwater cruises"
                />
              </Field>
              <Field label="Gallery Image URLs" hint="Additional images for the destination — press Enter to add each URL">
                <AdminTagInput
                  value={form.gallery_images}
                  onChange={(v) => set("gallery_images", v)}
                  placeholder="https://images.unsplash.com/..."
                />
              </Field>
              {form.gallery_images.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.gallery_images.map((url, i) => (
                    <img key={i} src={url} alt="" className="h-16 w-24 rounded-lg object-cover" />
                  ))}
                </div>
              )}
            </>
          )}

          {/* ── TRAVEL DETAILS TAB ── */}
          {activeTab === "details" && (
            <>
              <FormRow>
                <Field label="Best Time to Visit">
                  <AdminInput
                    value={form.best_time_to_visit}
                    onChange={(e) => set("best_time_to_visit", e.target.value)}
                    placeholder="e.g. October – March"
                  />
                </Field>
                <Field label="Climate">
                  <AdminInput
                    value={form.climate}
                    onChange={(e) => set("climate", e.target.value)}
                    placeholder="e.g. Tropical, moderate humidity"
                  />
                </Field>
              </FormRow>
              <FormRow>
                <Field label="Language">
                  <AdminInput
                    value={form.language}
                    onChange={(e) => set("language", e.target.value)}
                    placeholder="e.g. Malayalam, English"
                  />
                </Field>
                <Field label="Currency">
                  <AdminInput
                    value={form.currency}
                    onChange={(e) => set("currency", e.target.value)}
                    placeholder="e.g. INR (₹)"
                  />
                </Field>
              </FormRow>
              <Field label="Timezone">
                <AdminInput
                  value={form.timezone}
                  onChange={(e) => set("timezone", e.target.value)}
                  placeholder="e.g. IST (UTC+5:30)"
                />
              </Field>
            </>
          )}

          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Destination"} />
            <CancelButton onClick={() => setIsOpen(false)} />
            {activeTab !== "details" && (
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === "basic" ? "content" : "details")}
                className="ml-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white text-sm rounded-xl transition-colors"
              >
                Next →
              </button>
            )}
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Destination" size="sm">
        <p className="text-gray-300 mb-6">Delete this destination? This cannot be undone.</p>
        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold"
          >
            Yes, Delete
          </button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
