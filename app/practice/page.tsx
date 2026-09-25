import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { PracticeCard } from "@/components/PracticeCard";
import { SectionLabel } from "@/components/SectionLabel";
import { practice } from "@/content/practice";

export const metadata: Metadata = { title: practice.title };

// PAGES.md /practice: the card sits below the existing heading, full width with its
// label above it (no label column beside it). No scoring, no "right" answer.
// The page ends on the closing question.
export default function PracticePage() {
  return (
    <>
      <PageHeader label={practice.intro.label} heading={practice.intro.heading} body={practice.intro.body} />

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[64rem] px-6 py-20 md:px-12 md:py-28">
          <SectionLabel>{practice.demo.label}</SectionLabel>
          <div className="mt-8">
            <PracticeCard />
          </div>
        </div>
      </section>

      <Closing label={practice.closing.label} question={practice.closing.question} />
    </>
  );
}
