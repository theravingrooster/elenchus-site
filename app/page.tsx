import Image from "next/image";
import { ExamineBlock } from "@/components/ExamineBlock";
import { QuestionBlock } from "@/components/Section";
import { WhoBlock } from "@/components/WhoBlock";
import { home } from "@/content/home";

// PAGES.md home. First screen: the display line and one sentence under it, nothing else
// (#25). The grid is site-wide and fixed (components/SiteGrid.tsx), so it stays visible
// here on scroll and on the way back up.
// The second block sits below the first screen and ends on its own question (#17).
// Then the full Examine block (#examine) and the full Who block (#who), one long scroll (#27).
export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="relative mx-auto flex max-w-[88rem] items-start justify-between gap-10 px-6 pt-10 pb-16 md:px-12 md:pt-16 md:pb-20 lg:gap-16 lg:px-20">
          <div className="min-w-0">
            <h1 className="settle max-w-[16ch] font-serif text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.95] tracking-[-0.025em]">
              {home.display}
            </h1>
            <p className="mt-6 max-w-[48ch] md:mt-8">{home.sentence}</p>
          </div>
          {/* DESIGN.md: one mark, Ryan's Socrates line drawing (#21). Decorative, no caption.
              Its own column beside the type, never under it; hidden on phones. */}
          <div aria-hidden="true" className="socrates-mark">
            <Image
              src="/socrates.png"
              alt=""
              width={454}
              height={1168}
              priority
              className="h-full w-full object-contain object-top"
            />
          </div>
        </div>
      </section>

      <QuestionBlock {...home.second} />

      <ExamineBlock />

      <WhoBlock />
    </>
  );
}
