import { Closing } from "./Closing";
import { PageHeader } from "./PageHeader";
import { PracticeCard } from "./PracticeCard";
import { SectionLabel } from "./SectionLabel";
import { practice } from "@/content/practice";

// PAGES.md Examine, on Home at /#examine (#27). The former /practice page, unchanged:
// title and intro, the chat card with its label above it, then the closing question.
export function ExamineBlock() {
  return (
    <section id="examine" aria-label={practice.title} className="border-t border-rule">
      <PageHeader level={2} label={practice.intro.label} heading={practice.intro.heading} body={practice.intro.body} />

      <div className="border-t border-rule">
        <div className="mx-auto max-w-[64rem] px-6 py-20 md:px-12 md:py-28">
          <SectionLabel>{practice.demo.label}</SectionLabel>
          <div className="mt-8">
            <PracticeCard />
          </div>
        </div>
      </div>

      <Closing label={practice.closing.label} question={practice.closing.question} />
    </section>
  );
}
