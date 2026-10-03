import Image from "next/image";
import { SectionLabel } from "./SectionLabel";
import { why } from "@/content/why";

export function WhyBlock() {
  return (
    // Preserve the existing fragment so earlier section links still work.
    <section id="method" aria-label={why.title} className="border-t border-rule">
      <div className="mx-auto grid max-w-[92rem] gap-8 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[17rem_1fr] lg:gap-12 lg:px-16">
        <div>
          <SectionLabel>{why.header.label}</SectionLabel>
          <h2 className="mt-5 max-w-[14ch] font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
            {why.header.heading}
          </h2>
          <div aria-hidden="true" className="thinker-mark mt-8">
            <Image
              src="/thinker-method.webp"
              alt=""
              width={768}
              height={1152}
              sizes="(min-width: 1024px) 272px, 224px"
              className="h-auto w-full"
            />
          </div>
        </div>
        <div className="min-w-0 max-w-[48rem]">
          <div className="space-y-7 md:space-y-9">
            {why.contexts.map((context) => (
              <div key={context.heading}>
                <h3 className="mono-label text-ink/65">{context.heading}</h3>
                <p className="mt-3 max-w-[40ch] font-serif text-2xl leading-[1.3] md:text-[1.75rem]">
                  {context.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 max-w-[48ch] border-t border-rule pt-7 md:mt-10">
            <p>{why.closing.reflection}</p>
            <p className="mt-4 font-serif text-2xl italic leading-[1.2]">{why.closing.invitation}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
