"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { AdminModal } from "@/components/admin/modal";
import { Field, AdminInput, AdminTextarea, AdminSelect, FormRow, SaveButton, CancelButton } from "@/components/admin/form-fields";
import { AdminToasts, useAdminToast } from "@/components/admin/toast";

type FAQ = { id: string; question: string; answer: string; category: string; sort_order: number };

const INITIAL: FAQ[] = [
  { id: "1", question: "How do I book a tour package?", answer: "You can book by filling our inquiry form, calling us, or visiting our office. Our experts will contact you within 2-4 hours.", category: "Booking", sort_order: 1 },
  { id: "2", question: "What documents are required for international tours?", answer: "Valid passport (6 months validity), visa, travel insurance, and original ID proof.", category: "Documents", sort_order: 2 },
  { id: "3", question: "What is your cancellation policy?", answer: "30+ days: 90% refund. 15-30 days: 50%. 7-15 days: 25%. Less than 7 days: no refund.", category: "Policy", sort_order: 3 },
  { id: "4", question: "Are prices per person or for a group?", answer: "All prices are per person on twin sharing basis. Single supplement charges apply for private room.", category: "Pricing", sort_order: 4 },
  { id: "5", question: "Do you provide travel insurance?", answer: "We strongly recommend and can arrange comprehensive travel insurance at competitive rates.", category: "Services", sort_order: 5 },
  { id: "6", question: "Can I customize my tour package?", answer: "Absolutely! We specialize in customized itineraries. Contact us to start planning.", category: "Customization", sort_order: 6 },
];

const CATEGORIES = ["Booking", "Documents", "Policy", "Pricing", "Services", "Customization", "Safety", "General"];

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(INITIAL);
  const [isOpen, setIsOpen] = useState(false);
  const [editItem, setEditItem] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question: "", answer: "", category: "General" });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toasts, show } = useAdminToast();

  function openAdd() { setEditItem(null); setForm({ question: "", answer: "", category: "General" }); setIsOpen(true); }
  function openEdit(f: FAQ) { setEditItem(f); setForm({ question: f.question, answer: f.answer, category: f.category }); setIsOpen(true); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.question || !form.answer) { show("Question and answer are required", "error"); return; }
    setSaving(true);
    await new Promise((r) => setTimeout(r, 400));
    if (editItem) {
      setFaqs((prev) => prev.map((f) => (f.id === editItem.id ? { ...editItem, ...form } : f)));
      show("FAQ updated!");
    } else {
      setFaqs((prev) => [...prev, { ...form, id: Date.now().toString(), sort_order: prev.length + 1 }]);
      show("FAQ added!");
    }
    setSaving(false);
    setIsOpen(false);
  }

  const set = (k: string, v: string) => setForm((prev) => ({ ...prev, [k]: v }));

  const moveUp = (i: number) => { if (i === 0) return; const arr = [...faqs]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; setFaqs(arr); };
  const moveDown = (i: number) => { if (i === faqs.length - 1) return; const arr = [...faqs]; [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; setFaqs(arr); };

  return (
    <div className="space-y-6 max-w-3xl">
      <AdminToasts toasts={toasts} />
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-white">FAQs</h1><p className="text-gray-400 text-sm">{faqs.length} questions</p></div>
        <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl text-sm font-semibold transition-colors">
          <Plus className="h-4 w-4" /> Add FAQ
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={faq.id} className="bg-gray-900 rounded-2xl border border-white/5 overflow-hidden">
            <div className="flex items-center gap-3 p-5">
              <div className="flex flex-col gap-1 shrink-0">
                <button onClick={() => moveUp(i)} disabled={i === 0} className="p-1 text-gray-600 hover:text-gray-300 disabled:opacity-30"><ChevronUp className="h-3 w-3" /></button>
                <button onClick={() => moveDown(i)} disabled={i === faqs.length - 1} className="p-1 text-gray-600 hover:text-gray-300 disabled:opacity-30"><ChevronDown className="h-3 w-3" /></button>
              </div>
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setExpanded(expanded === faq.id ? null : faq.id)}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs bg-brand-500/20 text-brand-400 px-2 py-0.5 rounded-full">{faq.category}</span>
                </div>
                <h3 className="text-white font-semibold text-sm">{faq.question}</h3>
                {expanded === faq.id && <p className="text-gray-400 text-sm mt-2">{faq.answer}</p>}
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => openEdit(faq)} className="p-1.5 rounded-lg text-gray-400 hover:text-brand-400 hover:bg-brand-400/10 transition-colors"><Edit className="h-4 w-4" /></button>
                <button onClick={() => setDeleteId(faq.id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdminModal isOpen={isOpen} onClose={() => setIsOpen(false)} title={editItem ? "Edit FAQ" : "Add FAQ"} size="lg">
        <form onSubmit={handleSave} className="space-y-4">
          <Field label="Category">
            <AdminSelect value={form.category} onChange={(e) => set("category", e.target.value)} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
          </Field>
          <Field label="Question" required>
            <AdminInput value={form.question} onChange={(e) => set("question", e.target.value)} placeholder="What is your cancellation policy?" required />
          </Field>
          <Field label="Answer" required>
            <AdminTextarea value={form.answer} onChange={(e) => set("answer", e.target.value)} rows={5} placeholder="Write the detailed answer..." required />
          </Field>
          <div className="flex gap-3 pt-2 border-t border-white/10">
            <SaveButton isLoading={saving} label={editItem ? "Update FAQ" : "Add FAQ"} />
            <CancelButton onClick={() => setIsOpen(false)} />
          </div>
        </form>
      </AdminModal>

      <AdminModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} title="Delete FAQ" size="sm">
        <p className="text-gray-300 mb-6">Delete this FAQ? This cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={() => { setFaqs((p) => p.filter((f) => f.id !== deleteId)); show("Deleted"); setDeleteId(null); }} className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-semibold">Yes, Delete</button>
          <CancelButton onClick={() => setDeleteId(null)} />
        </div>
      </AdminModal>
    </div>
  );
}
