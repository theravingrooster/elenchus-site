import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionLabel } from "@/components/SectionLabel";
import { method } from "@/content/method";
import { getPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = getPageMetadata("/method");

export default function MethodPage() {
  return (
    <>
      <PageHeader label={method.header.label} heading={method.header.heading} />

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] gap-12 px-6 py-14 md:px-12 md:py-20 lg:grid-cols-[1fr_22rem] lg:gap-20 lg:px-20">
          <div>
            <SectionLabel>{method.steps.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-2xl leading-[1.15] md:text-3xl">{method.steps.heading}</h2>
            <ol className="mt-6 border-t border-rule">
              {method.steps.steps.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] items-baseline border-b border-rule py-4">
                  <span className="mono-label">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-xl md:text-2xl">{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <aside>
            <SectionLabel>{method.piercing.label}</SectionLabel>
            <h2 className="mt-5 font-serif text-2xl leading-[1.15] md:text-3xl">{method.piercing.lead}</h2>
            {method.piercing.paragraphs.map((paragraph) => <p key={paragraph} className="mt-5">{paragraph}</p>)}
            <p className="mt-8 border-t border-rule pt-6 font-serif text-2xl italic leading-[1.2]">{method.piercing.question}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
