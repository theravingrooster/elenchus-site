import { SectionLabel } from "./SectionLabel";
import { forPage } from "@/content/for";

export function WhoBlock() {
  return (
    <section id="who" aria-label={forPage.title} className="border-t border-rule">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[18rem_1fr] lg:gap-16 lg:px-20">
        <div>
          <SectionLabel>{forPage.intro.label}</SectionLabel>
          <h2 className="mt-5 max-w-[18ch] font-serif text-3xl leading-[1.1] tracking-[-0.02em] md:text-4xl">{forPage.intro.heading}</h2>
        </div>
        <div className="max-w-[48ch]">
          {forPage.sections.map((section) => (
            <div key={section.label}>
              <p>{section.lead}</p>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4">{paragraph}</p>)}
              <p className="mt-8 border-t border-rule pt-6 font-serif text-2xl italic leading-[1.2] md:text-3xl">{section.question}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
