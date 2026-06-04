"use client";

import { cn } from "@/lib/utils";

interface FieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}

export function Field({ label, required, error, children, hint }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-gray-300">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}
export function AdminInput({ className, error, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full h-10 px-3 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors",
        error ? "border-red-500" : "border-white/10",
        className
      )}
      {...props}
    />
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}
export function AdminTextarea({ className, error, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full px-3 py-2.5 rounded-xl bg-white/5 border text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors resize-none",
        error ? "border-red-500" : "border-white/10",
        className
      )}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
  error?: boolean;
}
export function AdminSelect({ options, className, error, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "w-full h-10 px-3 rounded-xl bg-gray-800 border text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors",
        error ? "border-red-500" : "border-white/10",
        className
      )}
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value} className="bg-gray-800">
          {o.label}
        </option>
      ))}
    </select>
  );
}

export function AdminTagInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const input = e.currentTarget;
      const val = input.value.trim();
      if (val && !value.includes(val)) {
        onChange([...value, val]);
        input.value = "";
      }
    }
  };

  const remove = (i: number) => {
    onChange(value.filter((_, idx) => idx !== i));
  };

  return (
    <div className="w-full min-h-[42px] px-3 py-2 rounded-xl bg-white/5 border border-white/10 focus-within:ring-2 focus-within:ring-brand-500 transition-colors">
      <div className="flex flex-wrap gap-1.5 mb-1">
        {value.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 bg-brand-500/20 text-brand-300 text-xs px-2 py-1 rounded-full">
            {tag}
            <button type="button" onClick={() => remove(i)} className="text-brand-400 hover:text-white">×</button>
          </span>
        ))}
      </div>
      <input
        type="text"
        onKeyDown={handleKeyDown}
        placeholder={placeholder || "Type and press Enter to add"}
        className="bg-transparent text-white text-sm w-full outline-none placeholder:text-gray-600"
      />
    </div>
  );
}

export function FormRow({ children, cols = 2 }: { children: React.ReactNode; cols?: number }) {
  return (
    <div className={cn("grid gap-4", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : cols === 3 ? "grid-cols-3" : "grid-cols-1")}>
      {children}
    </div>
  );
}

export function SaveButton({ isLoading, label = "Save" }: { isLoading?: boolean; label?: string }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 disabled:opacity-50 text-white font-semibold rounded-xl transition-colors text-sm flex items-center gap-2"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Saving...
        </>
      ) : label}
    </button>
  );
}

export function CancelButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-semibold rounded-xl transition-colors text-sm"
    >
      Cancel
    </button>
  );
}
