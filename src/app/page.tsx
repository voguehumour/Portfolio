import { HeroParticles } from "@/components/sections/HeroParticles";
import { MarqueeStrip } from "@/components/sections/MarqueeStrip";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { TechCloud } from "@/components/sections/TechCloud";
import { ProcessHorizontal } from "@/components/sections/ProcessHorizontal";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { Lab } from "@/components/sections/Lab";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function HomePage() {
  return (
    <>
      <HeroParticles />
      <MarqueeStrip />
      <About />
      <Services />
      <SelectedWork />
      <TechCloud />
      <ProcessHorizontal />
      <TestimonialsCarousel />
      <Lab />
      <ContactCTA />
    </>
  );
}
