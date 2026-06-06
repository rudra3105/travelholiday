"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search, ChevronDown, ChevronUp, X, Image as ImageIcon } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, AdminSelect, AdminTagInput, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { getPackages, getDestinations } from "@/lib/db";
import { savePackageAction, deletePackageAction } from "@/actions/admin";
import { formatCurrency, getDurationLabel } from "@/lib/utils";

type Tab = "basic" | "itinerary" | "inclusions" | "gallery";

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface PackageFull {
  id: string;
  title: string;
  slug: string;
  destination_id: string;
  destination_name?: string;
  duration_days: number;
  price_per_person: number;
  original_price: number;
  cover_image: string;
  short_description: string;
  description: string;
  type: string;
  rating: number;
  reviews_count: number;
  best_seller: boolean;
  featured: boolean;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  gallery_images: string[];
  itinerary: ItineraryDay[];
}

const EMPTY_PKG: Omit<PackageFull, "id"> = {
  title: "", slug: "", destination_id: "", duration_days: 5, price_per_person: 0,
  original_price: 0, cover_image: "", short_description: "",
  description: "", type: "domestic", rating: 4.8, reviews_count: 0,
  best_seller: false, featured: false,
  inclusions: ["Hotel accommodation", "Daily breakfast", "AC vehicle transfers", "Sightseeing as per itinerary", "English-speaking guide"],
  exclusions: ["Airfare/Train fare", "Lunch & Dinner (unless specified)", "Personal expenses", "Travel insurance"],
  highlights: [],
  gallery_images: [],
  itinerary: [],
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<PackageFull[]>([]);
  const [destinations, setDestinations] = useState<{id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("basic");
  const [editItem, setEditItem] = useState<PackageFull | null>(null);
  const [form, setForm] = useState<Omit<PackageFull, "id">>(EMPTY_PKG);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  // Load from DB on mount
  useEffect(() => {
    loadInitialData();
  }, []);

  async function loadInitialData() {
    setLoading(true);
    try {
      const [pkgs, dests] = await Promise.all([
        getPackages(),
        getDestinations()
      ]);
      
      const mappedPkgs = (pkgs as any[]).map(p => ({
        ...p,
        destination_id: p.destination_id || "",
        destination_name: p.destinations?.name || ""
      }));

      setPackages(mappedPkgs);
      setDestinations(dests.map(d => ({ id: d.id, name: d.name })));
    } catch (error) {
      show("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }

  async function loadPackages() {
    try {
      const data = await getPackages();
      const mappedPkgs = (data as any[]).map(p => ({
        ...p,
        destination_id: p.destination_id || "",
        destination_name: p.destinations?.name || ""
      }));
      setPackages(mappedPkgs);
    } catch (error) {
      show("Failed to reload packages", "error");
    }
  }

  const filtered = packages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.destination_name?.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditItem(null);
    setForm({ ...EMPTY_PKG, itinerary: Array.from({ length: 5 }, (_, i) => ({ day: i + 1, title: `Day ${i + 1}`, description: "" })) });
    setActiveTab("basic");
    setIsOpen(true);
  }

  function openEdit(pkg: PackageFull) {
    setEditItem(pkg);
    setForm({ ...pkg });
    setActiveTab("basic");
    setIsOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { show("Package title is required", "error"); setActiveTab("basic"); return; }
    if (!form.price_per_person) { show("Price is required", "error"); setActiveTab("basic"); return; }

    setSaving(true);
    try {
      const pkg = {
        ...form,
        id: editItem?.id,
        slug: form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      };

      await savePackageAction(pkg);
      await loadPackages();
      show(editItem ? "Package updated successfully!" : "Package added successfully!");
      setIsOpen(false);
    } catch (error) {
      show("Failed to save package", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      await deletePackageAction(id);
      await loadPackages();
      show("Package deleted");
      setDeleteId(null);
    } catch (error) {
      show("Failed to delete", "error");
    }
  }

  const set = (k: keyof typeof form, v: unknown) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  // ── Itinerary helpers ──────────────────────────────────────
  function updateItinerary(day: number, field: "title" | "description", value: string) {
    setForm((prev) => ({
      ...prev,
      itinerary: prev.itinerary.map((d) =>
        d.day === day ? { ...d, [field]: value } : d
      ),
    }));
  }

  function setDurationDays(n: number) {
    const current = form.itinerary;
    let updated = [...current];
    if (n > current.length) {
      for (let i = current.length + 1; i <= n; i++) {
        updated.push({ day: i, title: `Day ${i}`, description: "" });
      }
    } else {
      updated = updated.slice(0, n);
    }
    setForm((prev) => ({ ...prev, duration_days: n, itinerary: updated }));
  }

  // ── Gallery helpers ────────────────────────────────────────
  function addGalleryImage() {
    setForm((prev) => ({ ...prev, gallery_images: [...prev.gallery_images, ""] }));
  }

  function updateGalleryImage(idx: number, url: string) {
    const arr = [...form.gallery_images];
    arr[idx] = url;
    setForm((prev) => ({ ...prev, gallery_images: arr }));
  }

  function removeGalleryImage(idx: number) {
    setForm((prev) => ({ ...prev, gallery_images: prev.gallery_images.filter((_, i) => i !== idx) }));
  }

  const MODAL_TABS: { key: Tab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "itinerary", label: "Itinerary" },
    { key: "inclusions", label: "Inclusions" },
    { key: "gallery", label: "Gallery" },
  ];

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Packages</h1>
          <p className="text-gray-400 text-sm">{packages.length} packages</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Package
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search packages..."
          className="w-full h-10 pl-9 pr-4 rounded-xl bg-gray-900 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand-500"
        />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Package", "Destination", "Duration", "Price", "Type", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {pkg.cover_image ? (
                        <img src={pkg.cover_image} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />
                      ) : (
                        <div className="w-12 h-10 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                          <ImageIcon className="h-4 w-4 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-white text-sm font-medium line-clamp-1 max-w-[180px]">{pkg.title}</div>
                        <div className="flex gap-1 mt-0.5">
                          {pkg.best_seller && <span className="text-[10px] bg-gold-400/20 text-gold-400 px-1.5 py-0.5 rounded-full">Best Seller</span>}
                          {pkg.featured && <span className="text-[10px] bg-brand-400/20 text-brand-400 px-1.5 py-0.5 rounded-full">Featured</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-300 text-sm">{pkg.destination_name || "No Destination"}</td>
                  <td className="px-5 py-4 text-gray-300 text-sm">{getDurationLabel(pkg.duration_days)}</td>
                  <td className="px-5 py-4 text-white text-sm font-semibold">{formatCurrency(pkg.price_per_person)}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full capitalize">{pkg.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${pkg.itinerary?.length > 0 ? "bg-emerald-400/20 text-emerald-400" : "bg-gray-400/20 text-gray-400"}`}>
                        {pkg.itinerary?.length || 0}D itinerary
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/packages/${pkg.slug}`} target="_blank">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors" title="Preview">
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button onClick={() => openEdit(pkg)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10 transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button onClick={() => setDeleteId(pkg.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-500">No packages found</div>
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ── */}
      <AdminModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={editItem ? `Edit: ${editItem.title.slice(0, 40)}...` : "Add New Package"}
        size="xl"
      >
        {/* Modal tabs */}
        <div className="flex gap-1 mb-6 p-1 bg-gray-800 rounded-xl">
          {MODAL_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-brand-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSave}>
          {/* ── BASIC INFO ── */}
          {activeTab === "basic" && (
            <div className="space-y-4">
              <Field label="Package Title" required>
                <AdminInput
                  value={form.title}
                  onChange={(e) => {
                    set("title", e.target.value);
                    if (!editItem) set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""));
                  }}
                  placeholder="e.g. Kerala Backwaters & Munnar – 6 Days"
                  required
                />
              </Field>

              <FormRow>
                <Field label="Destination" required>
                  <AdminSelect
                    value={form.destination_id}
                    onChange={(e) => set("destination_id", e.target.value)}
                    options={[
                      { value: "", label: "Select Destination" },
                      ...destinations.map(d => ({ value: d.id, label: d.name }))
                    ]}
                    required
                  />
                </Field>
                <Field label="URL Slug" hint="Auto-generated, or enter custom">
                  <AdminInput value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))} placeholder="kerala-backwaters-munnar" />
                </Field>
              </FormRow>

              <FormRow>
                <Field label="Package Type">
                  <AdminSelect
                    value={form.type}
                    onChange={(e) => set("type", e.target.value)}
                    options={[
                      { value: "domestic", label: "🇮🇳 Domestic" },
                      { value: "international", label: "✈️ International" },
                      { value: "honeymoon", label: "💑 Honeymoon" },
                      { value: "adventure", label: "🏔️ Adventure" },
                      { value: "pilgrimage", label: "🛕 Pilgrimage" },
                    ]}
                  />
                </Field>
                <Field label="Duration (Days)" required>
                  <AdminInput
                    type="number"
                    value={form.duration_days}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    min={1}
                    max={30}
                    required
                  />
                </Field>
              </FormRow>

              <FormRow>
                <Field label="Price Per Person (₹)" required>
                  <AdminInput type="number" value={form.price_per_person || ""} onChange={(e) => set("price_per_person", Number(e.target.value))} placeholder="18999" required />
                </Field>
                <Field label="Original Price (₹)" hint="For showing discount">
                  <AdminInput type="number" value={form.original_price || ""} onChange={(e) => set("original_price", Number(e.target.value))} placeholder="24999" />
                </Field>
              </FormRow>

              <Field label="Cover Image URL">
                <AdminInput value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://images.unsplash.com/..." />
                {form.cover_image && (
                  <img src={form.cover_image} alt="preview" className="mt-2 h-28 w-full rounded-xl object-cover" onError={(e) => ((e.target as HTMLImageElement).style.display = "none")} />
                )}
              </Field>

              <Field label="Short Description" hint="Shown on package cards (1-2 lines)">
                <AdminTextarea value={form.short_description} onChange={(e) => set("short_description", e.target.value)} rows={2} placeholder="Brief overview shown on listing cards..." />
              </Field>

              <Field label="Full Description" hint="Shown on the package detail page">
                <AdminTextarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={4} placeholder="Detailed description of the package, what travelers can expect, unique experiences..." />
              </Field>

              <Field label="Tour Highlights" hint="Press Enter after each highlight">
                <AdminTagInput
                  value={form.highlights}
                  onChange={(v) => set("highlights", v)}
                  placeholder="e.g. Houseboat cruise, Tea garden visit..."
                />
              </Field>

              <FormRow>
                <Field label="Rating">
                  <AdminInput type="number" value={form.rating} onChange={(e) => set("rating", Number(e.target.value))} min={1} max={5} step={0.1} />
                </Field>
                <Field label="Review Count">
                  <AdminInput type="number" value={form.reviews_count} onChange={(e) => set("reviews_count", Number(e.target.value))} min={0} />
                </Field>
              </FormRow>

              <div className="flex items-center gap-6 p-4 bg-white/5 rounded-xl">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
                  <span className="text-sm text-gray-300 font-medium">Featured Package</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input type="checkbox" checked={!!form.best_seller} onChange={(e) => set("best_seller", e.target.checked)} className="w-4 h-4 rounded accent-gold-500" />
                  <span className="text-sm text-gray-300 font-medium">⭐ Best Seller</span>
                </label>
              </div>
            </div>
          )}

          {/* ── ITINERARY ── */}
          {activeTab === "itinerary" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-gray-400 text-sm">Edit day-by-day itinerary. Duration is set in Basic Info tab.</p>
                <span className="text-xs text-brand-400 bg-brand-400/10 px-3 py-1 rounded-full">
                  {form.duration_days} days total
                </span>
              </div>

              {form.itinerary.length === 0 && (
                <div className="text-center py-8 text-gray-500 bg-white/5 rounded-xl">
                  Set duration in Basic Info tab to generate itinerary days
                </div>
              )}

              <div className="space-y-4">
                {form.itinerary.map((day) => (
                  <div key={day.day} className="bg-white/5 rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {day.day}
                      </div>
                      <AdminInput
                        value={day.title}
                        onChange={(e) => updateItinerary(day.day, "title", e.target.value)}
                        placeholder={`Day ${day.day} title (e.g. Arrival in Kochi)`}
                        className="flex-1"
                      />
                    </div>
                    <AdminTextarea
                      value={day.description}
                      onChange={(e) => updateItinerary(day.day, "description", e.target.value)}
                      rows={3}
                      placeholder={`Describe activities for Day ${day.day}...`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── INCLUSIONS ── */}
          {activeTab === "inclusions" && (
            <div className="space-y-6">
              <div>
                <Field label="What's Included" hint="Press Enter after each item">
                  <AdminTagInput
                    value={form.inclusions}
                    onChange={(v) => set("inclusions", v)}
                    placeholder="e.g. Hotel accommodation, Daily breakfast..."
                  />
                </Field>
                <p className="text-xs text-gray-500 mt-2">Current items: {form.inclusions.length}</p>
              </div>

              <div>
                <Field label="What's NOT Included" hint="Press Enter after each item">
                  <AdminTagInput
                    value={form.exclusions}
                    onChange={(v) => set("exclusions", v)}
                    placeholder="e.g. Airfare, Travel insurance..."
                  />
                </Field>
                <p className="text-xs text-gray-500 mt-2">Current items: {form.exclusions.length}</p>
              </div>

              {/* Preview */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-xl">
                <div>
                  <p className="text-xs font-semibold text-emerald-400 mb-2 uppercase tracking-wider">✅ Included ({form.inclusions.length})</p>
                  {form.inclusions.map((item, i) => (
                    <p key={i} className="text-xs text-gray-400 py-1 border-b border-white/5">{item}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-400 mb-2 uppercase tracking-wider">❌ Excluded ({form.exclusions.length})</p>
                  {form.exclusions.map((item, i) => (
                    <p key={i} className="text-xs text-gray-400 py-1 border-b border-white/5">{item}</p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── GALLERY ── */}
          {activeTab === "gallery" && (
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">Add image URLs for the package photo gallery (shown on the detail page).</p>

              {form.gallery_images.map((url, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="flex-1 space-y-2">
                    <AdminInput
                      value={url}
                      onChange={(e) => updateGalleryImage(idx, e.target.value)}
                      placeholder="https://images.unsplash.com/photo-...?w=800&q=80"
                    />
                    {url && (
                      <img
                        src={url}
                        alt={`Gallery ${idx + 1}`}
                        className="h-20 w-full rounded-lg object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="mt-2 p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addGalleryImage}
                className="w-full py-3 border-2 border-dashed border-white/10 hover:border-brand-500/50 rounded-xl text-gray-500 hover:text-brand-400 text-sm font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" /> Add Image URL
              </button>

              <p className="text-xs text-gray-500">
                Tip: Use Unsplash URLs like <code className="text-brand-400">https://images.unsplash.com/photo-ID?w=800&q=80</code>
              </p>
            </div>
          )}

          {/* Save / Cancel buttons */}
          <div className="flex gap-3 pt-5 mt-5 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update Package" : "Add Package"} />
            <CancelButton onClick={() => setIsOpen(false)} />
            {activeTab !== "gallery" && (
              <button
                type="button"
                onClick={() => {
                  const tabs: Tab[] = ["basic", "itinerary", "inclusions", "gallery"];
                  const idx = tabs.indexOf(activeTab);
                  if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1]);
                }}
                className="ml-auto px-5 py-2.5 bg-white/5 text-gray-300 hover:bg-white/10 rounded-xl text-sm font-medium transition-colors"
              >
                Next: {activeTab === "basic" ? "Itinerary" : activeTab === "itinerary" ? "Inclusions" : "Gallery"} →
              </button>
            )}
          </div>
        </form>
      </AdminModal>

      {/* Delete confirm */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Package" size="sm">
        <p className="text-gray-300 mb-6">Are you sure you want to delete this package? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => handleDelete(deleteId!)} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors">
            Yes, Delete
          </button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
