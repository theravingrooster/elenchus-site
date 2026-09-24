import { HeroGrid } from "@/components/HeroGrid";
import { home } from "@/content/home";

// PAGES.md home, in order and nothing else: display line, 2–3 canonical sentences,
// closing question. One block, all inside the first screen at 1280×800 and 390×844,
// so the reader meets a question before scrolling (DESIGN.md "Test").
export default function Home() {
  return (
    <section className="relative overflow-hidden">
      <HeroGrid />
      <div className="relative mx-auto max-w-[88rem] px-6 pt-10 pb-16 md:px-12 md:pt-16 md:pb-24 lg:px-20">
        <h1 className="settle max-w-[16ch] font-serif text-[clamp(3rem,7.5vw,7rem)] leading-[0.95] tracking-[-0.025em]">
          {home.display}
        </h1>
        <p className="mt-6 max-w-[52ch] md:mt-8">{home.body}</p>
        <p className="mt-8 max-w-[24ch] border-t border-rule pt-8 font-serif text-[clamp(2rem,4.2vw,3.75rem)] italic leading-[1.05] tracking-[-0.015em] md:mt-12 md:pt-10">
          {home.closing.question}
        </p>
      </div>
    </section>
  );
}
