"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminSelect, AdminTextarea, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";
import { formatCurrency, formatDate, getDurationLabel } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getFixedDepartures, getPackages } from "@/lib/db";
import { saveFixedDepartureAction, deleteFixedDepartureAction } from "@/actions/admin";

type Departure = {
  id: string;
  package_id: string;
  departure_date: string;
  return_date: string;
  price_per_person: number;
  available_seats: number;
  total_seats: number;
  status: "available" | "limited" | "sold_out" | "cancelled";
  // joined
  packages?: {
    title: string;
    slug: string;
    cover_image: string;
    destinations?: { name: string };
  };
};

type PackageOption = { id: string; title: string; slug: string; cover_image: string; destination_name: string };

const STATUS_COLORS = {
  available: "bg-emerald-100 text-emerald-700",
  limited: "bg-amber-100 text-amber-700",
  sold_out: "bg-red-100 text-red-700",
  cancelled: "bg-gray-100 text-gray-600",
};

const EMPTY_FORM = {
  package_id: "",
  departure_date: "",
  return_date: "",
  price_per_person: 0,
  available_seats: 16,
  total_seats: 20,
  status: "available" as const,
};

export default function AdminDeparturesPage() {
  const [items, setItems] = useState<Departure[]>([]);
  const [packages, setPackages] = useState<PackageOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<Departure | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  useEffect(() => {
    loadAll();
  }, []);

  async function loadAll() {
    setLoading(true);
    try {
      const [deps, pkgs] = await Promise.all([
        getFixedDepartures(),
        getPackages(),
      ]);
      setItems(deps as any);
      setPackages(
        (pkgs as any[]).map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          cover_image: p.cover_image || "",
          destination_name: p.destinations?.name || "",
        }))
      );
    } catch (error) {
      show("Failed to load data", "error");
    } finally {
      setLoading(false);
    }
  }

  function openAdd() {
    setEditItem(null);
    setForm({ ...EMPTY_FORM, package_id: packages[0]?.id || "" });
    setIsOpen(true);
  }

  function openEdit(d: Departure) {
    setEditItem(d);
    setForm({
      package_id: d.package_id,
      departure_date: d.departure_date,
      return_date: d.return_date,
      price_per_person: d.price_per_person,
      available_seats: d.available_seats,
      total_seats: d.total_seats,
      status: d.status,
    });
    setIsOpen(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.package_id) {
      show("Please select a package", "error");
      return;
    }
    if (!form.departure_date || !form.return_date) {
      show("Departure and return dates are required", "error");
      return;
    }
    if (form.price_per_person <= 0) {
      show("Price per person must be greater than 0", "error");
      return;
    }
    setSaving(true);
    try {
      // Only send columns that exist in the DB table
      const payload: Record<string, unknown> = {
        package_id: form.package_id,
        departure_date: form.departure_date,
        return_date: form.return_date,
        price_per_person: form.price_per_person,
        available_seats: form.available_seats,
        total_seats: form.total_seats,
        status: form.status,
      };
      if (editItem) payload.id = editItem.id;

      await saveFixedDepartureAction(payload);
      show(editItem ? "Departure updated!" : "Departure added!");
      await loadAll();
      setIsOpen(false);
    } catch (error: any) {
      console.error(error);
      show(error?.message || "Failed to save departure", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    try {
      await deleteFixedDepartureAction(deleteId);
      show("Deleted successfully");
      await loadAll();
      setDeleteId(null);
    } catch (error) {
      show("Failed to delete", "error");
    }
  }

  const set = (k: string, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  const selectedPkg = packages.find((p) => p.id === form.package_id);

  return (
    <div className="space-y-6">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Fixed Departures</h1>
          <p className="text-gray-400 text-sm">{items.length} departures</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          <Plus className="h-4 w-4" /> Add Departure
        </button>
      </div>

      {packages.length === 0 && !loading && (
        <div className="p-4 bg-amber-900/30 border border-amber-500/30 rounded-xl text-amber-300 text-sm">
          ⚠️ No packages found. Please add at least one package before creating fixed departures.
        </div>
      )}

      <div className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/5">
                {["Package", "Departure", "Return", "Seats", "Price", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left px-5 py-4 text-xs font-semibold text-gray-400 uppercase whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((dep) => {
                const pkg = dep.packages;
                return (
                  <tr key={dep.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {pkg?.cover_image && (
                          <img src={pkg.cover_image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        )}
                        <div>
                          <div className="text-white text-sm font-medium line-clamp-1 max-w-[180px]">
                            {pkg?.title || "Unknown Package"}
                          </div>
                          <div className="text-gray-400 text-xs">{pkg?.destinations?.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-300 text-sm whitespace-nowrap">{formatDate(dep.departure_date)}</td>
                    <td className="px-5 py-4 text-gray-300 text-sm whitespace-nowrap">{formatDate(dep.return_date)}</td>
                    <td className="px-5 py-4 text-gray-300 text-sm">{dep.available_seats}/{dep.total_seats}</td>
                    <td className="px-5 py-4 text-white text-sm font-semibold">{formatCurrency(dep.price_per_person)}</td>
                    <td className="px-5 py-4">
                      <span className={cn("text-xs font-medium px-2.5 py-1 rounded-full capitalize", STATUS_COLORS[dep.status as keyof typeof STATUS_COLORS])}>
                        {dep.status.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(dep)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleteId(dep.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {loading && (
            <div className="py-12 text-center text-gray-500 animate-pulse">Loading departures...</div>
          )}
          {!loading && items.length === 0 && (
            <div className="text-center py-12 text-gray-500">No departures added yet</div>
          )}
        </div>
      </div>

      {/* Add / Edit Modal */}
      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit Departure" : "Add Fixed Departure"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          {/* Package selector */}
          <Field label="Package" required>
            {packages.length === 0 ? (
              <p className="text-amber-400 text-sm py-2">
                No packages available. Please add packages first.
              </p>
            ) : (
              <select
                value={form.package_id}
                onChange={(e) => set("package_id", e.target.value)}
                required
                className="w-full h-10 px-3 rounded-xl bg-gray-800 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
              >
                <option value="" className="bg-gray-800">— Select a package —</option>
                {packages.map((p) => (
                  <option key={p.id} value={p.id} className="bg-gray-800">
                    {p.title}{p.destination_name ? ` (${p.destination_name})` : ""}
                  </option>
                ))}
              </select>
            )}
            {selectedPkg?.cover_image && (
              <div className="mt-2 flex items-center gap-3 p-2 bg-white/5 rounded-lg">
                <img src={selectedPkg.cover_image} alt="" className="h-10 w-14 rounded object-cover" />
                <span className="text-gray-300 text-xs">{selectedPkg.title}</span>
              </div>
            )}
          </Field>

          <FormRow>
            <Field label="Departure Date" required>
              <AdminInput
                type="date"
                value={form.departure_date}
                onChange={(e) => set("departure_date", e.target.value)}
                required
              />
            </Field>
            <Field label="Return Date" required>
              <AdminInput
                type="date"
                value={form.return_date}
                onChange={(e) => set("return_date", e.target.value)}
                required
              />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Price Per Person (₹)" required>
              <AdminInput
                type="number"
                value={form.price_per_person || ""}
                onChange={(e) => set("price_per_person", Number(e.target.value))}
                placeholder="28999"
                min={1}
                required
              />
            </Field>
            <Field label="Status">
              <AdminSelect
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                options={[
                  { value: "available", label: "Available" },
                  { value: "limited", label: "Limited Seats" },
                  { value: "sold_out", label: "Sold Out" },
                  { value: "cancelled", label: "Cancelled" },
                ]}
              />
            </Field>
          </FormRow>

          <FormRow>
            <Field label="Available Seats">
              <AdminInput
                type="number"
                value={form.available_seats}
                onChange={(e) => set("available_seats", Number(e.target.value))}
                min={0}
              />
            </Field>
            <Field label="Total Seats">
              <AdminInput
                type="number"
                value={form.total_seats}
                onChange={(e) => set("total_seats", Number(e.target.value))}
                min={1}
              />
            </Field>
          </FormRow>

          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update" : "Add Departure"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      {/* Delete confirm */}
      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete Departure" size="sm">
        <p className="text-gray-300 mb-6">Delete this departure? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={handleDelete} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">
            Yes, Delete
          </button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
