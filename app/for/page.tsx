import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { QuestionBlock } from "@/components/Section";
import { forPage } from "@/content/for";

export const metadata: Metadata = { title: forPage.title };

// PAGES.md /for: two stacked full-width sections, no columns, each ending on its question (#17).
export default function ForPage() {
  return (
    <>
      <PageHeader label={forPage.intro.label} heading={forPage.intro.heading} />
      {forPage.sections.map((s) => (
        <QuestionBlock key={s.label} {...s} />
      ))}
    </>
  );
}
