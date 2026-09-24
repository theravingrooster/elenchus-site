import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { practice } from "@/content/practice";

export const metadata: Metadata = { title: practice.title };

// PAGES.md: static walkthrough. A claim, four drill lines, then stop.
// No scoring, no badges, no "right" answer.
export default function PracticePage() {
  const { walkthrough } = practice;
  return (
    <>
      <PageHeader label={practice.intro.label} heading={practice.intro.heading} body={practice.intro.body} />

      <Section label={walkthrough.label}>
        <figure className="border border-ink">
          <figcaption className="flex justify-between gap-4 border-b border-rule px-5 py-3">
            <span className="mono-label">{walkthrough.claim.id}</span>
            <span className="mono-label normal-case">claim://{walkthrough.claim.source}</span>
          </figcaption>
          <blockquote className="px-5 py-8 font-serif text-2xl italic leading-snug md:text-4xl">
            {walkthrough.claim.text}
          </blockquote>
        </figure>

        <ol className="mt-10 border-t border-rule">
          {walkthrough.lines.map((line, i) => (
            <li key={i} className="grid grid-cols-[6rem_1fr] items-baseline border-b border-rule py-5">
              <span className="mono-label">{`${walkthrough.claim.id}.${i + 1}`}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>

        <p className="mono-label mt-10">{walkthrough.stop}</p>
      </Section>

      <Closing label={practice.closing.label} question={practice.closing.question} />
    </>
  );
}
