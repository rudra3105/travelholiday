"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminSelect, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { FIXED_DEPARTURES_DATA } from "@/lib/data";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Departure = typeof FIXED_DEPARTURES_DATA[number] & { id: string };

const STATUS_COLORS = {
  available: "bg-emerald-100 text-emerald-700",
  limited: "bg-amber-100 text-amber-700",
  sold_out: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

export default function AdminDeparturesPage() {
  const [items, setItems] = useState<Departure[]>(FIXED_DEPARTURES_DATA as Departure[]);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Departure | null>(null);
  const [form, setForm] = useState({
    package_title: "", destination: "", cover_image: "",
    departure_date: "", return_date: "", duration_days: 7,
    price_per_person: 0, available_seats: 16, total_seats: 20,
    status: "available", slug: "",
  });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  function openAdd() {
    setEditItem(null);
    setForm({ package_title: "", destination: "", cover_image: "", departure_date: "", return_date: "", duration_days: 7, price_per_person: 0, available_seats: 16, total_seats: 20, status: "available", slug: "" });
    setIsOpen(true);
  }
  function openEdit(d: Departure) {
    setEditItem(d);
    setForm({ package_title: d.package_title, destination: d.destination, cover_image: d.cover_image, departure_date: d.departure_date, return_date: d.return_date, duration_days: d.duration_days, price_per_person: d.price_per_person, available_seats: d.available_seats, total_seats: d.total_seats, status: d.status, slug: d.slug });
    setIsOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.package_title || !form.departure_date) { show("Package name and departure date are required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 500));
    if (editItem) {
      setItems((prev) => prev.map((d) => (d.id === editItem.id ? { ...editItem, ...form } : d)));
      show("Departure updated!");
    } else {
      setItems((prev) => [{ ...form, id: Date.now().toString() }, ...prev]);
      show("Departure added!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">Fixed Departures</h1><p className="text-gray-400 text-sm">{items.length} departures</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add Departure
        </button>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              {["Package", "Departure", "Duration", "Seats", "Price", "Status", "Actions"].map((h) => (
                <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((dep) => (
              <tr key={dep.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    {dep.cover_image && <img src={dep.cover_image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                    <div>
                      <div className="text-white text-sm font-medium line-clamp-1 max-w-[180px]">{dep.package_title}</div>
                      <div className="text-gray-400 text-xs">{dep.destination}</div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-gray-300 text-sm">{formatDate(dep.departure_date)}</td>
                <td className="px-5 py-4 text-gray-300 text-sm">{getDurationLabel(dep.duration_days)}</td>
                <td className="px-5 py-4 text-gray-300 text-sm">{dep.available_seats}/{dep.total_seats}</td>
                <td className="px-5 py-4 text-white text-sm font-semibold">{formatCurrency(dep.price_per_person)}</td>
                <td className="px-5 py-4">
                  <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full capitalize", STATUS_COLORS[dep.status as keyof typeof STATUS_COLORS])}>
                    {dep.status.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(dep)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10"><Edit className="h-4 w-4" /></button>
                    <button onClick={() => setDeleteId(dep.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <div className="text-center py-12 text-gray-500">No departures added yet</div>}
      </div>

      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Departure" : "Add Fixed Departure"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Package Title" required>
            <AdminInput value={form.package_title} onChange={(e) => { set("package_title", e.target.value); set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-")); }} placeholder="Kashmir Great Lakes Trek" required />
          </Field>
          <FormRow>
            <Field label="Destination">
              <AdminInput value={form.destination} onChange={(e) => set("destination", e.target.value)} placeholder="Kashmir" />
            </Field>
            <Field label="Status">
              <AdminSelect value={form.status} onChange={(e) => set("status", e.target.value)} options={[
                { value: "available", label: "Available" },
                { value: "limited", label: "Limited Seats" },
                { value: "sold_out", label: "Sold Out" },
                { value: "cancelled", label: "Cancelled" },
              ]} />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Departure Date" required>
              <AdminInput type="date" value={form.departure_date} onChange={(e) => set("departure_date", e.target.value)} required />
            </Field>
            <Field label="Return Date" required>
              <AdminInput type="date" value={form.return_date} onChange={(e) => set("return_date", e.target.value)} required />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Price Per Person (₹)" required>
              <AdminInput type="number" value={form.price_per_person || ""} onChange={(e) => set("price_per_person", Number(e.target.value))} placeholder="28999" required />
            </Field>
            <Field label="Duration (Days)">
              <AdminInput type="number" value={form.duration_days} onChange={(e) => set("duration_days", Number(e.target.value))} min={1} />
            </Field>
          </FormRow>
          <FormRow>
            <Field label="Available Seats">
              <AdminInput type="number" value={form.available_seats} onChange={(e) => set("available_seats", Number(e.target.value))} min={0} />
            </Field>
            <Field label="Total Seats">
              <AdminInput type="number" value={form.total_seats} onChange={(e) => set("total_seats", Number(e.target.value))} min={1} />
            </Field>
          </FormRow>
          <Field label="Cover Image URL">
            <AdminInput value={form.cover_image} onChange={(e) => set("cover_image", e.target.value)} placeholder="https://images.unsplash.com/..." />
          </Field>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Departure"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Departure" size="sm">
        <p className="text-gray-300 mb-6">Delete this departure?</p>
        <div className="flex gap-3">
          <button onClick={() => { setItems((p) => p.filter((d) => d.id !== deleteId)); show("Deleted"); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
