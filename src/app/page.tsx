import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { Manifesto } from "@/components/sections/Manifesto";
import { ProjectsShowcase } from "@/components/sections/ProjectsShowcase";
import { Capabilities } from "@/components/sections/Capabilities";
import { Pinned } from "@/components/sections/Pinned";
import { Testimonial } from "@/components/sections/Testimonial";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "AI Consulting",
          "Senior Product Design",
          "Creative Direction",
          "ComfyUI Systems",
          "Generative Video",
          "Immersive Web",
        ]}
      />
      <Stats />
      <Manifesto />
      <ProjectsShowcase />
      <Pinned />
      <Capabilities />
      <Testimonial />
    </>
  );
}
