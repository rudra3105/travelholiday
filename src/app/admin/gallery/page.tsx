"use client";

import { useState, useRef } from "react";
import { Plus, Trash2, Edit, Upload, X } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminSelect, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { GALLERY_DATA } from "@/lib/data";

type GalleryItem = { id: string; url: string; alt: string; destination: string; category: string };

const INITIAL: GalleryItem[] = GALLERY_DATA.map((g, i) => ({ ...g, id: String(i), destination: g.destination || "", category: "general" }));

const CATEGORIES = ["landscape", "heritage", "beach", "adventure", "city", "culture", "wildlife", "general"];

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>(INITIAL);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ url: "", alt: "", destination: "", category: "general" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  function openAdd() { setEditItem(null); setForm({ url: "", alt: "", destination: "", category: "general" }); setIsOpen(true); }
  function openEdit(g: GalleryItem) { setEditItem(g); setForm({ url: g.url, alt: g.alt, destination: g.destination, category: g.category }); setIsOpen(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.url) { show("Image URL is required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editItem) {
      setItems((prev) => prev.map((g) => (g.id === editItem.id ? { ...editItem, ...form } : g)));
      show("Image updated!");
    } else {
      setItems((prev) => [...prev, { ...form, id: Date.now().toString() }]);
      show("Image added!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Gallery</h1><p className="text-gray-400 text-sm">{items.length} images</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add Image
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((img) => (
          <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-gray-900 border border-white/5">
            <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
              <button onClick={() => openEdit(img)} className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white"><Edit className="h-4 w-4" /></button>
              <button onClick={() => setDeleteId(img.id)} className="p-2 rounded-full bg-red-500/30 hover:bg-red-500/60 text-red-300"><Trash2 className="h-4 w-4" /></button>
            </div>
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium bg-black/60 px-2 py-0.5 rounded-full">{img.destination || img.category}</span>
            </div>
          </div>
        ))}

        {/* Upload placeholder */}
        <div onClick={openAdd} className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-500/50 hover:bg-white/2 transition-all">
          <Upload className="h-6 w-6 text-gray-600" />
          <span className="text-gray-600 text-xs text-center px-2">Add Image URL</span>
        </div>
      </div>

      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Image" : "Add Gallery Image"} size="md">
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Image URL" required hint="Paste a direct image URL (Unsplash, your CDN, etc.)">
            <AdminInput value={form.url} onChange={(e) => set("url", e.target.value)} placeholder="https://images.unsplash.com/..." required />
            {form.url && <img src={form.url} alt="preview" className="mt-2 h-32 w-full rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />}
          </Field>
          <FormRow>
            <Field label="Destination">
              <AdminInput value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="Kerala" />
            </Field>
            <Field label="Category">
              <AdminSelect value={form.category} onChange={(e) => set("category", e.target.value)} options={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))} />
            </Field>
          </FormRow>
          <Field label="Alt Text" hint="Describe the image for accessibility">
            <AdminInput value={form.alt} onChange={(e) => set("alt", e.target.value)} placeholder="Kerala backwaters at sunset" />
          </Field>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Image"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Image" size="sm">
        <p className="text-gray-300 mb-6">Delete this image from gallery?</p>
        <div className="flex gap-3">
          <button onClick={() => { setItems((p) => p.filter((g) => g.id !== deleteId)); show("Deleted"); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
