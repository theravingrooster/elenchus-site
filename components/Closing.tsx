import { SectionLabel } from "./SectionLabel";

export function Closing({ label, question }: { label: string; question: string }) {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-[88rem] px-6 py-14 md:px-12 md:py-20 lg:px-20">
        <SectionLabel>{label}</SectionLabel>
        <p className="mt-6 max-w-[26ch] font-serif text-3xl italic leading-[1.1] tracking-[-0.015em] md:text-5xl">
          {question}
        </p>
      </div>
    </section>
  );
}
