import Link from "next/link";
import { Closing } from "@/components/Closing";
import { HeroGrid } from "@/components/HeroGrid";
import { Section } from "@/components/Section";
import { home } from "@/content/home";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <HeroGrid />
        <div className="relative mx-auto max-w-[88rem] px-6 pt-24 pb-24 md:px-12 md:pt-36 md:pb-36 lg:px-20">
          {/* DESIGN.md: hero type too large, pulled back one step. Tight tracking. */}
          <h1 className="settle max-w-[16ch] font-serif text-[clamp(3rem,8.5vw,8rem)] leading-[0.95] tracking-[-0.025em]">
            {home.display}
          </h1>
          <p className="mt-10 max-w-[52ch]">{home.body}</p>
          <div className="mt-12 flex flex-wrap gap-4">
            <a href="#examine" className="btn btn-primary">
              {home.primaryAction}
            </a>
            <Link href="/method" className="btn">
              {home.secondaryAction}
            </Link>
          </div>
        </div>
      </section>

      {/* PAGES.md: primary action anchors to a single field. One field, one verb. */}
      <Section id="examine" label={home.examine.label}>
        <form className="flex flex-col gap-6" action="#examine">
          <label htmlFor="claim" className="mono-label">
            {home.examine.fieldLabel}
          </label>
          <textarea id="claim" name="claim" rows={3} className="field resize-none" />
          <div>
            <button type="submit" className="btn btn-primary">
              {home.examine.verb}
            </button>
          </div>
        </form>
      </Section>

      <Closing label={home.closing.label} question={home.closing.question} />
    </>
  );
}
