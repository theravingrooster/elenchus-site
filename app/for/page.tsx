import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { forPage } from "@/content/for";

export const metadata: Metadata = { title: forPage.title };

// PAGES.md: three short columns, same weight. No personas, no photos.
export default function ForPage() {
  return (
    <>
      <PageHeader label={forPage.intro.label} heading={forPage.intro.heading} />

      <section className="border-t border-rule">
        <div className="mx-auto grid max-w-[88rem] md:grid-cols-3">
          {forPage.columns.map((col) => (
            <div
              key={col.id}
              className="border-b border-rule px-6 py-16 md:border-b-0 md:border-l md:px-10 md:py-24 md:first:border-l-0 lg:px-14"
            >
              <p className="mono-label">{col.id}</p>
              <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">{col.heading}</h2>
              <p className="mt-6">{col.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Closing label={forPage.closing.label} question={forPage.closing.question} />
    </>
  );
}
