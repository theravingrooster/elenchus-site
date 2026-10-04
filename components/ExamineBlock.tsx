import { PracticeCard } from "./PracticeCard";
import { SectionLabel } from "./SectionLabel";
import { practice } from "@/content/practice";

export function ExamineBlock() {
  return (
    <section id="examine" aria-label={practice.title} className="border-t border-rule">
      <div className="mx-auto grid max-w-[92rem] gap-8 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[17rem_1fr] lg:gap-12 lg:px-16">
        <div>
          <SectionLabel>{practice.intro.label}</SectionLabel>
          <h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">{practice.intro.heading}</h2>
          <p className="mt-5 max-w-[32ch]">{practice.intro.body}</p>
        </div>
        <div className="min-w-0"><PracticeCard /></div>
      </div>
    </section>
  );
}
