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
    <div className="mx-auto max-w-[88rem] px-6 py-14 md:px-12 md:py-20 lg:px-20">
      <SectionLabel>{label}</SectionLabel>
      <Heading className="mt-6 max-w-[20ch] font-serif text-4xl leading-[1.05] tracking-[-0.02em] md:text-7xl">
        {heading}
      </Heading>
      {body && <p className="mt-6 max-w-[48ch]">{body}</p>}
    </div>
  );
}
