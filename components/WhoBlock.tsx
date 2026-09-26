import { PageHeader } from "./PageHeader";
import { QuestionBlock } from "./Section";
import { forPage } from "@/content/for";

// PAGES.md Who, on Home at /#who (#27). The former /for page, unchanged: the heading,
// then two stacked full-width sections, each ending on its question. Their headings are
// h3 under the Who h2, same size (#29).
export function WhoBlock() {
  return (
    <section id="who" aria-label={forPage.title} className="border-t border-rule">
      <PageHeader level={2} label={forPage.intro.label} heading={forPage.intro.heading} />
      {forPage.sections.map((s) => (
        <QuestionBlock key={s.label} {...s} level={3} />
      ))}
    </section>
  );
}
