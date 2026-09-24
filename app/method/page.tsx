import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { Section, SectionBody, SectionHeading } from "@/components/Section";
import { method } from "@/content/method";

export const metadata: Metadata = { title: method.title };

export default function MethodPage() {
  const [first, ...rest] = method.blocks;
  return (
    <>
      <PageHeader label={first.label} heading={first.heading} body={first.body} />

      {rest.map((block) => (
        <Section key={block.label} label={block.label}>
          <SectionHeading>{block.heading}</SectionHeading>
          <SectionBody>{block.body}</SectionBody>
        </Section>
      ))}

      <Section label={method.drill.label}>
        <SectionHeading>{method.drill.heading}</SectionHeading>
        <ol className="mt-10 border-t border-rule">
          {method.drill.steps.map((step, i) => (
            <li key={step} className="grid grid-cols-[4rem_1fr] items-baseline border-b border-rule py-5">
              <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-2xl md:text-3xl">{step}</span>
            </li>
          ))}
        </ol>
        <p className="mono-label mt-8 normal-case">{method.drill.aside}</p>
      </Section>

      <Section label={method.destination.label}>
        <SectionHeading>{method.destination.heading}</SectionHeading>
        <SectionBody>{method.destination.body}</SectionBody>
      </Section>

      <Closing label={method.closing.label} question={method.closing.question} />
    </>
  );
}
