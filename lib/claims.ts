import "server-only";

import { createClient } from "@supabase/supabase-js";
import { practice, type DemoClaim } from "@/content/practice";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isDemoClaim(value: unknown): value is DemoClaim {
  if (!isRecord(value)) return false;
  return (
    isText(value.bar) && isText(value.claim) &&
    Array.isArray(value.sources) && value.sources.length > 0 && value.sources.every((source) =>
      isRecord(source) && isText(source.label) && isText(source.href)
    ) &&
    Array.isArray(value.thread) && value.thread.length === 4 && value.thread.every((turn) =>
      isRecord(turn) && isText(turn.question) && isText(turn.feedback)
    )
  );
}

export async function getClaims(): Promise<DemoClaim[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const fallback = practice.demo.claims;
  if (!url || !anonKey) return fallback;

  try {
    const client = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        // Refresh authored examples without rebuilding the site.
        fetch: (input, init) => fetch(input, { ...init, next: { revalidate: 60 } }),
      },
    });
    const { data, error } = await client
      .from("claims")
      .select("bar,claim,sources,thread")
      .eq("published", true)
      .order("position", { ascending: true })
      .abortSignal(AbortSignal.timeout(5_000));

    // The chat expects at least one claim with exactly four complete turns.
    if (error || !Array.isArray(data) || data.length === 0 || !data.every(isDemoClaim)) {
      return fallback;
    }
    return data.map(({ bar, claim, sources, thread }) => ({ bar, claim, sources, thread }));
  } catch {
    return fallback;
  }
}
