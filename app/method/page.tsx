import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuestionBlock, Section, SectionHeading, SectionQuestion } from "@/components/Section";
import { method } from "@/content/method";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("/method");

// PAGES.md /method: the five steps, piercing vs noise, and the optional machines block.
// Each block ends on its own closing question (#17).
export default function MethodPage() {
  return (
    <>
      <PageHeader label={method.header.label} heading={method.header.heading} />

      <Section label={method.steps.label}>
        <SectionHeading>{method.steps.heading}</SectionHeading>
        <ol className="mt-10 border-t border-rule">
          {method.steps.steps.map((step, i) => (
            <li key={step} className="grid grid-cols-[4rem_1fr] items-baseline border-b border-rule py-5">
              <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-2xl md:text-3xl">{step}</span>
            </li>
          ))}
        </ol>
        <SectionQuestion>{method.steps.question}</SectionQuestion>
      </Section>

      <QuestionBlock {...method.piercing} />

      {method.machines && <QuestionBlock {...method.machines} />}
    </>
  );
}
