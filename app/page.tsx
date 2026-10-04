import Image from "next/image";
import { ExamineBlock } from "@/components/ExamineBlock";
import { WhyBlock } from "@/components/WhyBlock";
import { home } from "@/content/home";
import { ClaimsProvider } from "@/components/ClaimsProvider";
import { getClaims } from "@/lib/claims";

// The whole site reads in order: introduction, why we question, and example conversation.
export default async function Home() {
  const claims = await getClaims();
  return (
    <>
      <section className="relative">
        <div className="relative mx-auto grid max-w-[88rem] items-center gap-8 px-6 pt-12 pb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-10 md:px-12 md:pt-16 md:pb-20 lg:gap-12 lg:px-20">
          <div className="min-w-0">
            <h1 className="settle max-w-[16ch] font-serif text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.95] tracking-[-0.025em]">
              {home.display}
            </h1>
            <p className="mt-6 max-w-[48ch] md:mt-8">{home.sentence}</p>
          </div>
          {/* Complete reclining figure, kept separate from the text at every width. */}
          <div aria-hidden="true" className="socrates-mark">
            <Image
              src="/socrates-reclining.webp"
              alt=""
              width={1254}
              height={1254}
              sizes="(min-width: 1408px) 560px, (min-width: 768px) 42vw, 88vw"
              preload
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      <WhyBlock />
      <ClaimsProvider claims={claims}>
        <ExamineBlock />
      </ClaimsProvider>
    </>
  );
}
