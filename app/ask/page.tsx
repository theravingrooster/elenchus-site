import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { ask } from "@/content/ask";

export const metadata: Metadata = { title: ask.title };

// PAGES.md /ask: copy only. Heading, one short paragraph, closing question. No fields.
export default function AskPage() {
  return (
    <>
      <PageHeader label={ask.intro.label} heading={ask.intro.heading} body={ask.intro.body} />
      <Closing label={ask.closing.label} question={ask.closing.question} />
    </>
  );
}
