"use client";

import { home } from "@/content/home";

// PAGES.md: one field, one verb. Markup only for v1, so submit is a no-op
// (no reload, nothing in the URL) until a backend is decided.
export function ExamineForm() {
  return (
    <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="claim" className="mono-label">
        {home.examine.fieldLabel}
      </label>
      <textarea id="claim" name="claim" rows={3} className="field resize-none" />
      <div>
        <button type="submit" className="btn btn-primary">
          {home.examine.verb}
        </button>
      </div>
    </form>
  );
}
