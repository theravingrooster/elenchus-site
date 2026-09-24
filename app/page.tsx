import Link from "next/link";
import { Closing } from "@/components/Closing";
import { ExamineForm } from "@/components/ExamineForm";
import { HeroGrid } from "@/components/HeroGrid";
import { home } from "@/content/home";

export default function Home() {
  return (
    <>
      {/* The Examine field sits inside the first screen at desktop and mobile widths,
          so the first thing a reader meets is a question (DESIGN.md "Test"). */}
      <section className="relative overflow-hidden">
        <HeroGrid />
        <div className="relative mx-auto max-w-[88rem] px-6 pt-12 pb-20 md:px-12 md:pt-16 md:pb-28 lg:px-20">
          {/* DESIGN.md: hero type too large, pulled back one step. Tight tracking. */}
          <h1 className="settle max-w-[16ch] font-serif text-[clamp(3rem,7.5vw,7rem)] leading-[0.95] tracking-[-0.025em]">
            {home.display}
          </h1>
          <p className="mt-8 max-w-[52ch]">{home.body}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#examine" className="btn btn-primary">
              {home.primaryAction}
            </a>
            <Link href="/method" className="btn">
              {home.secondaryAction}
            </Link>
          </div>

          {/* PAGES.md: primary action anchors to a single field. One field, one verb. */}
          <div id="examine" className="mt-8 max-w-[68ch] scroll-mt-8">
            <ExamineForm label={home.examine.label} />
          </div>
        </div>
      </section>

      <Closing label={home.closing.label} question={home.closing.question} />
    </>
  );
}
