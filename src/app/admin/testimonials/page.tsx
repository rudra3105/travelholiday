"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Star } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { TESTIMONIALS_DATA } from "@/lib/data";

type Testimonial = typeof TESTIMONIALS_DATA[number] & { id: string };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>(TESTIMONIALS_DATA as Testimonial[]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ name: "", location: "", avatar: "", rating: 5, review: "", destination: "", travel_date: "" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  function openAdd() { setEditItem(null); setForm({ name: "", location: "", avatar: "", rating: 5, review: "", destination: "", travel_date: "" }); setIsOpen(true); }
  function openEdit(t: Testimonial) { setEditItem(t); setForm({ name: t.name, location: t.location, avatar: t.avatar || "", rating: t.rating, review: t.review, destination: t.destination, travel_date: t.travel_date }); setIsOpen(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.review) { show("Name and review are required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    if (editItem) {
      setItems((prev) => prev.map((t) => (t.id === editItem.id ? { ...editItem, ...form } : t)));
      show("Testimonial updated!");
    } else {
      setItems((prev) => [{ ...form, id: Date.now().toString(), verified: true, featured: false, sort_order: 0, created_at: new Date().toISOString() }, ...prev]);
      show("Testimonial added!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Testimonials</h1><p className="text-gray-400 text-sm">{items.length} reviews</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add Review
        </button>
      </div>

      <div className="grid gap-4">
        {items.map((t) => (
          <div key={t.id} className="bg-gray-900 rounded-2xl border border-white/5 p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4 flex-1">
                {t.avatar && <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover shrink-0" />}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-semibold">{t.name}</span>
                    <span className="text-gray-400 text-sm">{t.location}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`h-3.5 w-3.5 ${j < t.rating ? "fill-gold-400 text-gold-400" : "text-gray-600"}`} />
                    ))}
                    <span className="text-gray-400 text-xs">{t.destination} · {t.travel_date}</span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2">{t.review}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10 transition-colors"><Edit className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(t.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Review" : "Add Review"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <FormRow>
            <Field label="Customer Name" required><AdminInput value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Priya Sharma" required /></Field>
            <Field label="Location"><AdminInput value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Mumbai" /></Field>
          </FormRow>
          <FormRow>
            <Field label="Destination"><AdminInput value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="Kerala" /></Field>
            <Field label="Travel Date"><AdminInput value={form.travel_date} onChange={(e) => set("travel_date", e.target.value)} placeholder="December 2024" /></Field>
          </FormRow>
          <Field label="Rating">
            <div className="flex gap-2">
              {[1,2,3,4,5].map((n) => (
                <button key={n} type="button" onClick={() => set("rating", n)}
                  className={`w-10 h-10 rounded-xl text-sm font-bold transition-colors ${form.rating >= n ? "bg-gold-500 text-white" : "bg-white/5 text-gray-400"}`}>
                  {n}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Avatar URL" hint="Paste a photo URL (optional)">
            <AdminInput value={form.avatar} onChange={(e) => set("avatar", e.target.value)} placeholder="https://..." />
          </Field>
          <Field label="Review" required>
            <AdminTextarea value={form.review} onChange={(e) => set("review", e.target.value)} rows={4} placeholder="Write the customer review..." required />
          </Field>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Review"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Review" size="sm">
        <p className="text-gray-300 mb-6">Delete this review? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => { setItems((p) => p.filter((t) => t.id !== deleteId)); show("Deleted"); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
