import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, IndianRupee, Users } from "lucide-react";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAMS } from "@/data/kitc";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programmes — Vocational & Industrial Training | KITC" },
      {
        name: "description",
        content:
          "Free 35-day vocational course in Tally, GST, computers and spoken English, plus 6-month industrial training for CSE, ECE, EEE, Mechanical and Civil students.",
      },
      { property: "og:title", content: "Programmes — Vocational & Industrial Training | KITC" },
      {
        property: "og:description",
        content: "Compare KITC's free short-term course and branch-wise 6-month industrial training tracks.",
      },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const shortTerm = PROGRAMS.filter((p) => p.track === "short-term");
  const industrial = PROGRAMS.filter((p) => p.track === "industrial");

  return (
    <>
      <PageHero
        eyebrow="Programmes"
        title="Training built around employment"
        description="Every course ends with placement support. Choose the short-term vocational programme or a branch-wise industrial training track."
      />

      <Section title="Short-term vocational programme">
        <div className="grid gap-6 md:grid-cols-2">
          {shortTerm.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </Section>

      <div className="bg-secondary/60">
        <Section
          title="Industrial & practical training"
          description="Six-month branch-wise training for diploma and B.Tech students, including academic project work support."
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {industrial.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function ProgramCard({ program }: { program: (typeof PROGRAMS)[number] }) {
  return (
    <Card className="flex h-full flex-col shadow-card">
      <CardContent className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-base font-bold sm:text-lg">{program.title}</h3>
        <p className="mt-1.5 flex-1 text-xs sm:text-sm text-muted-foreground">{program.summary}</p>
        <dl className="mt-3 space-y-1.5 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-primary shrink-0" /> {program.duration}
          </div>
          <div className="flex items-center gap-2">
            <IndianRupee className="h-3.5 w-3.5 text-primary shrink-0" /> {program.fee}
          </div>
          <div className="flex items-start gap-2">
            <Users className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> {program.eligibility}
          </div>
        </dl>
        <div className="mt-4 flex gap-2">
          <Button asChild size="sm">
            <Link to="/programs/$slug" params={{ slug: program.slug }}>
              Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/register" search={{ program: program.slug }}>
              Apply
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
