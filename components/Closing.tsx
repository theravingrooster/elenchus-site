import { SectionLabel } from "./SectionLabel";

// VOICE.md: every section ends on a question. Each page closes on its PAGES.md question.
export function Closing({ label, question }: { label: string; question: string }) {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[88rem] px-6 py-24 md:px-12 md:py-36 lg:px-20">
        <SectionLabel>{label}</SectionLabel>
        <p className="mt-10 max-w-[22ch] font-serif text-4xl italic leading-[1.05] tracking-[-0.015em] md:text-7xl">
          {question}
        </p>
      </div>
    </section>
  );
}
