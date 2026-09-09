import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAMS, type Program } from "@/data/kitc";

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const program = PROGRAMS.find((p) => p.slug === params.slug);
    if (!program) throw notFound();
    return { program };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Programme not found — KITC" }, { name: "robots", content: "noindex" }] };
    }
    const { program } = loaderData;
    return {
      meta: [
        { title: `${program.title} — KITC` },
        { name: "description", content: program.summary.slice(0, 155) },
        { property: "og:title", content: `${program.title} — KITC` },
        { property: "og:description", content: program.summary.slice(0, 155) },
      ],
    };
  },
  notFoundComponent: ProgramNotFound,
  component: ProgramDetail,
});

function ProgramNotFound() {
  return (
    <Section title="Programme not found">
      <p className="text-muted-foreground">That programme is not available. Browse all current programmes instead.</p>
      <Button asChild className="mt-6">
        <Link to="/programs">All programmes</Link>
      </Button>
    </Section>
  );
}

function ProgramDetail() {
  const { program } = Route.useLoaderData() as { program: Program };

  return (
    <>
      <PageHero
        eyebrow={program.track === "short-term" ? "Vocational programme" : "Industrial training"}
        title={program.title}
        description={program.summary}
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md">
            <Link to="/register" search={{ program: program.slug }}>
              Apply for this programme
            </Link>
          </Button>
          <Button asChild size="lg" className="border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary font-semibold shadow-sm">
            <Link to="/contact">Ask a question</Link>
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold md:text-2xl">Syllabus</h2>
            <div className="mt-4 grid gap-3.5">
              {program.modules.map((m) => (
                <Card key={m.title} className="shadow-card">
                  <CardContent className="p-4 sm:p-5">
                    <h3 className="font-display text-sm sm:text-base font-bold">{m.title}</h3>
                    <ul className="mt-2.5 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                      {m.points.map((p) => (
                        <li key={p} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <aside>
            <Card className="shadow-card">
              <CardContent className="p-4 sm:p-5">
                <h2 className="font-display text-sm sm:text-base font-bold">At a glance</h2>
                <dl className="mt-3 space-y-2.5 text-xs sm:text-sm">
                  <div>
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Duration</dt>
                    <dd className="font-medium mt-0.5">{program.duration}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Fee</dt>
                    <dd className="font-medium mt-0.5">{program.fee}</dd>
                  </div>
                  <div>
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Eligibility</dt>
                    <dd className="font-medium mt-0.5">{program.eligibility}</dd>
                  </div>
                </dl>
                <h3 className="mt-4.5 pt-3 border-t border-border font-display text-sm font-bold">Outcomes</h3>
                <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                  {program.outcomes.map((o) => (
                    <li key={o} className="flex gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-red" />
                      {o}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
