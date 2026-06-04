"use client";

import { useState, useCallback } from "react";

type Toast = { id: number; message: string; type: "success" | "error" };

export function useAdminToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);

  return { toasts, show };
}

export function AdminToasts({ toasts }: { toasts: { id: number; message: string; type: "success" | "error" }[] }) {
  return (
    <div className="fixed top-4 right-4 z-[200] space-y-2 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-4 py-3 rounded-xl text-white text-sm font-medium shadow-lg animate-slide-up ${
            t.type === "success" ? "bg-emerald-600" : "bg-red-600"
          }`}
        >
          {t.type === "success" ? "✅ " : "❌ "}{t.message}
        </div>
      ))}
    </div>
  );
}
