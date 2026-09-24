import type { Metadata } from "next";
import { Closing } from "@/components/Closing";
import { PageHeader } from "@/components/PageHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { ask } from "@/content/ask";

export const metadata: Metadata = { title: ask.title };

export default function AskPage() {
  return (
    <>
      <PageHeader label={ask.intro.label} heading={ask.intro.heading} body={ask.intro.body} />

      <section className="border-t border-rule">
        <div className="mx-auto max-w-[88rem] px-6 py-20 md:px-12 md:py-28 lg:px-20">
          <WaitlistForm />
        </div>
      </section>

      <Closing label={ask.closing.label} question={ask.closing.question} />
    </>
  );
}
