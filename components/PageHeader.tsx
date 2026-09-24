import { SectionLabel } from "./SectionLabel";

// Top block for inner pages: mono label and a large serif heading.
export function PageHeader({ label, heading, body }: { label: string; heading: string; body?: string }) {
  return (
    <div className="mx-auto max-w-[88rem] px-6 pt-20 pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
      <SectionLabel>{label}</SectionLabel>
      <h1 className="mt-8 max-w-[18ch] font-serif text-5xl leading-[1] tracking-[-0.02em] md:text-8xl">
        {heading}
      </h1>
      {body && <p className="mt-10 max-w-[60ch]">{body}</p>}
    </div>
  );
}
