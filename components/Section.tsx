import type { ReactNode } from "react";
import { SectionLabel } from "./SectionLabel";

type Props = {
  label: string;
  id?: string;
  // Wide sections drop the 68ch reading column (used by the /practice demo).
  wide?: boolean;
  children: ReactNode;
};

// Hairline rules instead of cards. Reading column ~68ch.
export function Section({ label, id, wide, children }: Props) {
  return (
    <section id={id} className="border-t border-rule">
      <div className="mx-auto grid max-w-[88rem] gap-8 px-6 py-20 md:grid-cols-[12rem_1fr] md:px-12 md:py-28 lg:px-20">
        <SectionLabel>{label}</SectionLabel>
        <div className={wide ? "min-w-0" : "max-w-[68ch]"}>{children}</div>
      </div>
    </section>
  );
}

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="font-serif text-3xl leading-[1.1] tracking-[-0.01em] md:text-5xl">{children}</h2>;
}

export function SectionBody({ children }: { children: ReactNode }) {
  return <p className="mt-6">{children}</p>;
}
