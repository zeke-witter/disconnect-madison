import Hero from "./components/Hero";
import KidsCallout from "./components/KidsCallout";
import PledgeCounter from "./components/PledgeCounter";
import NewsCarousel from "@/app/components/NewsCarousel";
import Doodle from "./components/Doodle";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-6 text-center justify-center w-full sm:items-start sm:text-left">
      <PledgeCounter />
      <Hero />

      {/*
        Full-width doodle strip anchored at the hero's bottom edge.
        h-0 + -mt-6 cancels the flex gap so the strip takes no layout space.
        Negative horizontal margins escape the main padding so doodles reach
        the true left/right edges of the content area (sidebar boundary).
        overflow-visible lets elements extend upward into the hero's margins.

        Cluster shape: 4-wide base row → 2-wide middle → 1 lone doodle at top.
        All elements stay within the ~220px side margins of the max-w-2xl CTA row.
      */}
      <div className="relative h-0 -mt-6 -mx-4 sm:-mx-8 lg:-mx-16 w-[calc(100%+2rem)] sm:w-[calc(100%+4rem)] lg:w-[calc(100%+8rem)]">

        {/* ── Bottom-left cluster ── */}

        {/* Base row — 4 doodles at hero bottom, spreading right from the left edge */}
        <Doodle src="path_04.png" className="bottom-0  left-4          w-14  rotate-[5deg]" />
        <Doodle src="wave_03.png" className="bottom-0  left-20         w-14 -rotate-[14deg]" />
        <Doodle src="blob_02.png" className="bottom-0  left-[10rem]   w-12  rotate-[8deg]" />
        <Doodle src="arch_01.png" className="bottom-0  left-[14.5rem]    w-14 -rotate-[-10deg]" />

        {/* Middle-low — 3 doodles, drifting inward and upward */}
        <Doodle src="rainbow_02.png" className="bottom-18 left-8     w-12  rotate-[-16deg]" />
        <Doodle src="leaf_04.png" className="bottom-16 left-[6rem]          w-14  rotate-[20deg]" />
        <Doodle src="misc_04.png" className="bottom-18 left-[11rem]          w-14  rotate-[40deg]" />


        {/* Middle-high — 3 doodles, left-shifted */}
        <Doodle src="stones_04.png" className="bottom-32 left-2          w-11 -rotate-[10deg]" />
        <Doodle src="misc_02.png" className="bottom-36 left-18          w-14 -rotate-[10deg]" />
        <Doodle src="grass_03.png" className="bottom-34 left-[8.5rem]          w-12 -rotate-[20deg]" />

        {/* Top - lone doodle, larger */}
        <Doodle src="sun_02.png" className="bottom-48 left-[1rem]          w-20 -rotate-[10deg]" />

        {/* ── Bottom-right cluster ── */}

        {/* Base row */}
        <Doodle src="seaweed_03.png" className="bottom-2  right-1        w-22 -rotate-[8deg]" />
        <Doodle src="grass_02.png" className="bottom-0  right-[5rem]       w-14  rotate-[10deg]" />
        <Doodle src="sun_01.png" className="bottom-4  right-[9rem] w-14  rotate-[14deg]" />
        <Doodle src="landscape_04.png" className="bottom-1  right-[13rem]  w-16 -rotate-[6deg]" />

        {/* Middle low */}
        <Doodle src="rainbow_01.png" className="bottom-26 right-4        w-12  rotate-[8deg]" />
        <Doodle src="blob_04.png" className="bottom-18 right-[5rem]   w-14 -rotate-[14deg]" />
        <Doodle src="misc_03.png" className="bottom-22 right-[10rem]   w-14 -rotate-[14deg]" />

        {/* Top */}
        <Doodle src="misc_06.png" className="bottom-40 right-4        w-20  rotate-[-18deg]" />
        <Doodle src="arch_black.png" className="bottom-36 right-[6rem]        w-13  rotate-[6deg]" />

      </div>

      <KidsCallout />
      <NewsCarousel />
    </div>
  );
}
