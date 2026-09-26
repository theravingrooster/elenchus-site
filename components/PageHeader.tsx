import { SectionLabel } from "./SectionLabel";

// Top block for inner pages: mono label and a large serif heading.
// On Home the Examine and Who blocks reuse it below the hero, so they pass `level={2}`
// to keep one h1 per page (#27).
export function PageHeader({
  label,
  heading,
  body,
  level = 1,
}: {
  label: string;
  heading: string;
  body?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className="mx-auto max-w-[88rem] px-6 pt-20 pb-20 md:px-12 md:pt-32 md:pb-28 lg:px-20">
      <SectionLabel>{label}</SectionLabel>
      <Heading className="mt-8 max-w-[18ch] font-serif text-5xl leading-[1] tracking-[-0.02em] md:text-8xl">
        {heading}
      </Heading>
      {body && <p className="mt-10 max-w-[60ch]">{body}</p>}
    </div>
  );
}
