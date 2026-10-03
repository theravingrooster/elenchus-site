import { SectionLabel } from "./SectionLabel";
import { method } from "@/content/method";

export function MethodBlock() {
  return (
    <section id="method" aria-label={method.title} className="border-t border-rule">
      <div className="mx-auto grid max-w-[92rem] gap-8 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[17rem_1fr] lg:gap-12 lg:px-16">
        <div>
          <SectionLabel>{method.header.label}</SectionLabel>
          <h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
            {method.header.heading}
          </h2>
          <p className="mt-5 max-w-[32ch]">{method.header.body}</p>
        </div>
        <div className="grid min-w-0 gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] xl:gap-12">
          <div>
            <h3 className="font-serif text-2xl leading-[1.15]">{method.steps.heading}</h3>
            <ol className="mt-6 border-t border-rule">
              {method.steps.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2.5rem_1fr] items-baseline border-b border-rule py-4">
                  <span aria-hidden="true" className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-xl">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside className="max-w-[38ch]">
            <p className="mono-label">{method.piercing.label}</p>
            <h3 className="mt-5 font-serif text-2xl leading-[1.15]">{method.piercing.lead}</h3>
            {method.piercing.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5">{paragraph}</p>)}
            <p className="mt-6 border-t border-rule pt-6 font-serif text-2xl italic leading-[1.2]">{method.piercing.question}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
