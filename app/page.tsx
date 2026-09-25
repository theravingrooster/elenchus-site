import { HeroGrid } from "@/components/HeroGrid";
import { QuestionBlock } from "@/components/Section";
import { home } from "@/content/home";

// PAGES.md home. First screen, in order: display line, three sentences, closing question.
// All of it sits inside the first screen at 1280×800 and 390×844, so the reader meets a
// question before scrolling (DESIGN.md "Test"). The section is at least a full viewport
// tall, so the grid covers the whole first screen and fades on first scroll (#10).
// The second block sits below the first screen and ends on its own question (#17).
export default function Home() {
  return (
    <>
      <section className="relative min-h-svh overflow-hidden">
        <HeroGrid />
        <div className="relative mx-auto max-w-[88rem] px-6 pt-10 pb-16 md:px-12 md:pt-16 md:pb-24 lg:px-20">
          <h1 className="settle max-w-[16ch] font-serif text-[clamp(2.5rem,6.5vw,6rem)] leading-[0.95] tracking-[-0.025em]">
            {home.display}
          </h1>
          <div className="mt-6 max-w-[56ch] space-y-3 md:mt-8">
            {home.sentences.map((s) => (
              <p key={s}>{s}</p>
            ))}
          </div>
          <p className="mt-8 max-w-[24ch] border-t border-rule pt-8 font-serif text-[clamp(1.75rem,3.6vw,3.25rem)] italic leading-[1.05] tracking-[-0.015em] md:mt-12 md:pt-10">
            {home.closing.question}
          </p>
        </div>
      </section>

      <QuestionBlock {...home.second} />
    </>
  );
}
