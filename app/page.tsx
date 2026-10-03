import Image from "next/image";
import { ExamineBlock } from "@/components/ExamineBlock";
import { MethodBlock } from "@/components/MethodBlock";
import { home } from "@/content/home";

// The whole site reads in order: introduction, method, and example conversation.
export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="relative mx-auto flex max-w-[88rem] items-center justify-between gap-10 px-6 pt-12 pb-16 md:px-12 md:pt-16 md:pb-20 lg:gap-16 lg:px-20">
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

      <MethodBlock />
      <ExamineBlock />
    </>
  );
}
