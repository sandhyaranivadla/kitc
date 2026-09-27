import { createFileRoute } from "@tanstack/react-router";
import { PageHero, Section } from "@/components/site/Section";
import { CentresGrid } from "@/components/site/CentresGrid";

export const Route = createFileRoute("/centres")({
  head: () => ({
    meta: [
      { title: "Centres — Kakatheeya Industrial Training Centre" },
      {
        name: "description",
        content:
          "Explore KITC vocational training centres in Medchal & Alwal (Telangana) and our outreach network across India.",
      },
      { property: "og:title", content: "Centres — Kakatheeya Industrial Training Centre" },
      {
        property: "og:description",
        content: "Active training centres in Medchal & Alwal, Hyderabad, and expansion hubs across India.",
      },
    ],
  }),
  component: CentresPage,
});

function CentresPage() {
  return (
    <div className="bg-[#fcfbf7] dark:bg-background min-h-screen">
      {/* Hero Header exactly matching reference banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#7a1515] via-[#5c0f0f] to-[#3a0808] text-white py-14 sm:py-20 px-4 text-center">
        {/* Subtle patterned background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-[#e8a040] mb-3 border border-white/15">
            Vocational &amp; Industrial Training Hubs
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white drop-shadow-md">
            Centres
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/85 max-w-lg mx-auto">
            Empowering youth with free industrial and vocational skilling across our active centres in Telangana and expansion network.
          </p>
        </div>
      </div>

      <Section className="py-10 sm:py-16">
        <CentresGrid showTitle={false} initialState="telangana" />
      </Section>
    </div>
  );
}
