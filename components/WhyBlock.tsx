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
        <div className="min-w-0 max-w-[46ch] space-y-6 font-serif text-xl leading-[1.5] md:space-y-8 md:text-2xl">
          {why.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div>
    </section>
  );
}
