"use client";

import { ask } from "@/content/ask";

// PAGES.md: one contact field, one optional claim field, one verb.
// Markup only for v1. No backend, no database; submit is a no-op until one is decided.
export function WaitlistForm() {
  return (
    <form className="flex max-w-[48ch] flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
      <div className="flex flex-col gap-3">
        <label htmlFor="contact" className="mono-label">
          {ask.form.contactLabel}
        </label>
        <input id="contact" name="contact" type="text" autoComplete="email" required className="field" />
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="claim" className="mono-label">
          {ask.form.claimLabel} <span className="normal-case">({ask.form.optional})</span>
        </label>
        <textarea id="claim" name="claim" rows={3} className="field resize-none" />
      </div>
      <div>
        <button type="submit" className="btn btn-primary">
          {ask.form.verb}
        </button>
      </div>
    </form>
  );
}
