"use client";

import { home } from "@/content/home";

// PAGES.md: one field, one verb. Markup only for v1, so submit is a no-op
// (no reload, nothing in the URL) until a backend is decided.
export function ExamineForm({ label }: { label: string }) {
  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
      <p className="mono-label" aria-hidden="true">
        {label}
      </p>
      <label htmlFor="claim" className="font-serif text-xl leading-snug md:text-2xl">
        {home.examine.fieldLabel}
      </label>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <textarea id="claim" name="claim" rows={1} className="field flex-1 resize-none" />
        <button type="submit" className="btn btn-primary self-start sm:self-auto">
          {home.examine.verb}
        </button>
      </div>
    </form>
  );
}
