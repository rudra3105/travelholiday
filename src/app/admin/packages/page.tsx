"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, AdminSelect, AdminTagInput, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { FEATURED_PACKAGES } from "@/lib/data";
import { formatCurrency, getDurationLabel } from "@/lib/utils";

type Package = typeof FEATURED_PACKAGES[number] & { id: string };

const EMPTY: Omit<Package, "id"> = {
  title: "", slug: "", destination: "", duration_days: 5, price_per_person: 0,
  original_price: 0, cover_image: "", short_description: "",
  rating: 4.8, reviews_count: 0, best_seller: false, featured: false, type: "domestic",
};

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<Package[]>(FEATURED_PACKAGES as Package[]);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Package | null>(null);
  const [form, setForm] = useState<Omit<Package, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  const filtered = packages.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.destination.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditItem(null);
    setForm(EMPTY);
    setIsOpen(true);
  }

  function openEdit(pkg: Package) {
    setEditItem(pkg);
    setForm({ ...pkg });
    setIsOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.price_per_person) { show("Title and price are required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 600));
    if (editItem) {
      setPackages((prev) => prev.map((p) => (p.id === editItem.id ? { ...editItem, ...form } : p)));
      show("Package updated successfully!");
    } else {
      const newPkg = { ...form, id: Date.now().toString() } as Package;
      setPackages((prev) => [newPkg, ...prev]);
      show("Package added successfully!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  function handleDelete(id: string) {
    setPackages((prev) => prev.filter((p) => p.id !== id));
    show("Package deleted");
    setDeleteId(null);
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Packages</h1>
          <p className="text-gray-400 text-sm">{packages.length} packages</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add Package
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search packages..." className="w-full h-10 pl-9 pr-4 rounded-xl bg-gray-900 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-brand-500" />
      </div>

      {/* Table */}
      <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Package", "Destination", "Duration", "Price", "Type", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((pkg) => (
                <tr key={pkg.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {pkg.cover_image && <img src={pkg.cover_image} alt="" className="w-12 h-10 rounded-lg object-cover shrink-0" />}
                      <div>
                        <div className="text-white text-sm font-medium line-clamp-1 max-w-[200px]">{pkg.title}</div>
                        <div className="flex gap-1 mt-0.5">
                          {pkg.best_seller && <span className="text-[10px] bg-gold-400/20 text-gold-400 px-1.5 py-0.5 rounded-full">Best Seller</span>}
                          {pkg.featured && <span className="text-[10px] bg-brand-400/20 text-brand-400 px-1.5 py-0.5 rounded-full">Featured</span>}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-300 text-sm">{pkg.destination}</td>
                  <td className="px-5 py-4 text-gray-300 text-sm">{getDurationLabel(pkg.duration_days)}</td>
                  <td className="px-5 py-4 text-white text-sm font-semibold">{formatCurrency(pkg.price_per_person)}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-full capitalize">{pkg.type}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link href={`/packages/${pkg.slug}`} target="_blank">
                        <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"><Eye className="h-4 w-4" /></button>
                      </Link>
                      <button onClick={() => openEdit(pkg)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10 transition-colors"><Edit className="h-4 w-4" /></button>
                      <button onClick={() => setDeleteId(pkg.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No packages found</div>}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Package" : "Add New Package"} size="xl">
        <form onSubmit={handleSave} className="space-y-5">
          <Field label="Package Title" required>
            <AdminInput value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Kerala Backwaters & Munnar 6D/5N" required />
          </Field>
          <FormRow>
            <Field label="Destination" required>
              <AdminInput value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="e.g. Kerala" required />
            </Field>
            <Field label="URL Slug" required hint="Used in the URL: /packages/your-slug">
              <AdminInput value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="kerala-backwaters-munnar" required />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Type">
              <AdminSelect value={form.type || "domestic"} onChange={(e) => set("type", e.target.value)} options={[
                { value: "domestic", label: "Domestic" },
                { value: "international", label: "International" },
                { value: "honeymoon", label: "Honeymoon" },
                { value: "adventure", label: "Adventure" },
                { value: "pilgrimage", label: "Pilgrimage" },
              ]} />
            </Field>
            <Field label="Duration (Days)" required>
              <AdminInput type="number" value={form.duration_days} onChange={(e) => set("duration_days", Number(e.target.value))} min={1} max={30} required />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Price Per Person (₹)" required>
              <AdminInput type="number" value={form.price_per_person || ""} onChange={(e) => set("price_per_person", Number(e.target.value))} placeholder="18999" required />
            </Field>
            <Field label="Original Price (₹)" hint="Leave blank if no discount">
              <AdminInput type="number" value={form.original_price || ""} onChange={(e) => set("original_price", e.target.value ? Number(e.target.value) : undefined)} placeholder="24999" />
            </Field>
          </FormRow>
          <Field label="Cover Image URL">
            <AdminInput value={form.cover_image || ""} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://images.unsplash.com/..." />
            {form.cover_image && <img src={form.cover_image} alt="preview" className="mt-2 h-24 rounded-lg object-cover" />}
          </Field>
          <Field label="Short Description">
            <AdminTextarea value={form.short_description || ""} onChange={(e) => set("short_description", e.target.value)} rows={2} placeholder="Brief description shown on package cards..." />
          </Field>
          <FormRow>
            <Field label="Rating">
              <AdminInput type="number" value={form.rating || 4.8} onChange={(e) => set("rating", Number(e.target.value))} min={1} max={5} step={0.1} />
            </Field>
            <Field label="Review Count">
              <AdminInput type="number" value={form.reviews_count || 0} onChange={(e) => set("reviews_count", Number(e.target.value))} min={0} />
            </Field>
          </FormRow>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
              <span className="text-sm text-gray-300">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!form.best_seller} onChange={(e) => set("best_seller", e.target.checked)} className="w-4 h-4 rounded accent-brand-500" />
              <span className="text-sm text-gray-300">Best Seller</span>
            </label>
          </div>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update Package" : "Add Package"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      {/* Delete confirm */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Package" size="sm">
        <p className="text-gray-300 mb-6">Are you sure you want to delete this package? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => handleDelete(deleteId!)} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold transition-colors">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
