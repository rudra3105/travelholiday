"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, Globe, Home } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, AdminSelect, AdminTagInput, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { DESTINATIONS_DOMESTIC, DESTINATIONS_INTERNATIONAL } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

type Dest = { name: string; slug: string; tagline: string; image: string; packages: number; starting_from: number; type: "domestic" | "international"; id: string };

const seed: Dest[] = [
  ...DESTINATIONS_DOMESTIC.map((d, i) => ({ ...d, type: "domestic" as const, id: `d${i}` })),
  ...DESTINATIONS_INTERNATIONAL.map((d, i) => ({ ...d, type: "international" as const, id: `i${i}` })),
];

const EMPTY: Omit<Dest, "id"> = { name: "", slug: "", tagline: "", image: "", packages: 0, starting_from: 0, type: "domestic" };

export default function AdminDestinationsPage() {
  const [dests, setDests] = useState<Dest[]>(seed);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Dest | null>(null);
  const [form, setForm] = useState<Omit<Dest, "id">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  function openAdd() { setEditItem(null); setForm(EMPTY); setIsOpen(true); }
  function openEdit(d: Dest) { setEditItem(d); setForm({ ...d }); setIsOpen(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name) { show("Name is required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    if (editItem) {
      setDests((prev) => prev.map((d) => (d.id === editItem.id ? { ...editItem, ...form } : d)));
      show("Destination updated!");
    } else {
      setDests((prev) => [{ ...form, id: Date.now().toString() }, ...prev]);
      show("Destination added!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Destinations</h1>
          <p className="text-gray-400 text-sm">{dests.length} destinations</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add Destination
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dests.map((dest) => (
          <div key={dest.id} className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden group">
            <div className="relative h-36 overflow-hidden">
              {dest.image ? (
                <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-600 text-sm">No Image</div>
              )}
              <div className="absolute inset-0 bg-black/40" />
              <span className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full font-medium ${dest.type === "domestic" ? "bg-brand-500 text-white" : "bg-gold-500 text-white"}`}>
                {dest.type === "domestic" ? "🇮🇳 Domestic" : "✈️ International"}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-white font-semibold">{dest.name || "Unnamed"}</h3>
              <p className="text-gray-400 text-xs mb-3">{dest.tagline}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 text-xs">{dest.packages} packages · From {formatCurrency(dest.starting_from)}</span>
                <div className="flex gap-1">
                  <Link href={`/destinations/${dest.slug}`} target="_blank">
                    <button className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"><Eye className="h-4 w-4" /></button>
                  </Link>
                  <button onClick={() => openEdit(dest)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10"><Edit className="h-4 w-4" /></button>
                  <button onClick={() => setDeleteId(dest.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Destination" : "Add Destination"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <FormRow>
            <Field label="Name" required>
              <AdminInput value={form.name} onChange={(e) => { set("name", e.target.value); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")); }} placeholder="e.g. Kerala" required />
            </Field>
            <Field label="Type">
              <AdminSelect value={form.type} onChange={(e) => set("type", e.target.value)} options={[{ value: "domestic", label: "🇮🇳 Domestic" }, { value: "international", label: "✈️ International" }]} />
            </Field>
          </FormRow>
          <Field label="Tagline" hint="Short line shown under destination name">
            <AdminInput value={form.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="God's Own Country" />
          </Field>
          <Field label="URL Slug">
            <AdminInput value={form.slug} onChange={(e) => set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))} placeholder="kerala" />
          </Field>
          <Field label="Cover Image URL">
            <AdminInput value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="https://images.unsplash.com/..." />
            {form.image && <img src={form.image} alt="" className="mt-2 h-20 rounded-lg object-cover" />}
          </Field>
          <FormRow>
            <Field label="Number of Packages">
              <AdminInput type="number" value={form.packages} onChange={(e) => set("packages", Number(e.target.value))} min={0} />
            </Field>
            <Field label="Starting From (₹)">
              <AdminInput type="number" value={form.starting_from} onChange={(e) => set("starting_from", Number(e.target.value))} />
            </Field>
          </FormRow>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Destination"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Destination" size="sm">
        <p className="text-gray-300 mb-6">Delete this destination? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => { setDests((p) => p.filter((d) => d.id !== deleteId)); show("Deleted"); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
