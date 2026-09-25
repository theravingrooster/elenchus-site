import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { PracticeDemo } from "@/components/PracticeDemo";
import { Section } from "@/components/Section";
import { practice } from "@/content/practice";

export const metadata: Metadata = { title: practice.title };

// PAGES.md /practice: the scroll demo sits below the existing heading.
// Three sample claims, five steps, then stop. No scoring, no "right" answer.
// The page ends on the closing question.
export default function PracticePage() {
  return (
    <>
      <PageHeader label={practice.intro.label} heading={practice.intro.heading} body={practice.intro.body} />

      <Section label={practice.demo.label} wide>
        <PracticeDemo />
      </Section>

      <Closing label={practice.closing.label} question={practice.closing.question} />
    </>
  );
}
