import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  Calendar,
  CheckCircle2,
  Clock,
  IndianRupee,
  Laptop,
  Phone,
  Sparkles,
} from "lucide-react";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ORG, PROGRAMS, type Program } from "@/data/kitc";

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
        eyebrow={program.category ?? (program.track === "short-term" ? "Vocational programme" : "Industrial training")}
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
            <a href={`tel:${ORG.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-1.5 h-4 w-4" /> Call {ORG.phone}
            </a>
          </Button>
          <Button asChild size="lg" className="border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary font-semibold shadow-sm">
            <a href={`tel:${ORG.secondaryPhone.replace(/\s/g, "")}`}>
              <Phone className="mr-1.5 h-4 w-4" /> Call {ORG.secondaryPhone}
            </a>
          </Button>
        </div>
      </PageHero>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Syllabus / What We Provide */}
          <div className="space-y-8 lg:col-span-2">
            {/* Pricing Options Section if available */}
            {program.pricingOptions && program.pricingOptions.length > 0 && (
              <div>
                <h2 className="text-xl font-bold md:text-2xl flex items-center gap-2">
                  <IndianRupee className="h-5 w-5 text-primary" /> Course Options &amp; Fee Structure
                </h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {program.pricingOptions.map((opt) => (
                    <Card key={opt.label} className="border-2 border-border/80 bg-card/60 transition-all hover:border-primary/50 shadow-sm">
                      <CardContent className="p-5">
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Option
                        </span>
                        <h3 className="mt-1 font-display text-base font-bold text-foreground">{opt.label}</h3>
                        <p className="mt-2 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                          {opt.amount}
                        </p>
                        {opt.note && (
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground border-t border-border/60 pt-2">
                            {opt.note}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-xl font-bold md:text-2xl">Course Curriculum &amp; What We Provide</h2>
              <div className="mt-4 grid gap-3.5">
                {program.modules.map((m) => (
                  <Card key={m.title} className="shadow-card">
                    <CardContent className="p-4 sm:p-5">
                      <h3 className="font-display text-sm sm:text-base font-bold text-foreground">{m.title}</h3>
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
          </div>

          {/* Right Sidebar: Key Highlights & Outcomes */}
          <aside>
            <Card className="sticky top-24 shadow-card">
              <CardContent className="p-5 sm:p-6">
                <h2 className="font-display text-base font-bold text-foreground">Programme Details</h2>
                
                <dl className="mt-4 space-y-3 text-xs sm:text-sm divide-y divide-border/60">
                  <div className="pt-2 first:pt-0">
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Duration</dt>
                    <dd className="font-semibold mt-0.5 text-foreground flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-primary" /> {program.duration}
                    </dd>
                  </div>

                  {program.hours && (
                    <div className="pt-2">
                      <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Daily Hours</dt>
                      <dd className="font-semibold mt-0.5 text-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-primary" /> {program.hours}
                      </dd>
                    </div>
                  )}

                  {program.timings && (
                    <div className="pt-2">
                      <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Batch Timings</dt>
                      <dd className="font-medium mt-0.5 text-foreground leading-relaxed">
                        {program.timings}
                      </dd>
                    </div>
                  )}

                  <div className="pt-2">
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Fee</dt>
                    <dd className="font-bold text-base mt-0.5 text-emerald-600 dark:text-emerald-400">
                      {program.fee}
                    </dd>
                  </div>

                  {program.modes && program.modes.length > 0 && (
                    <div className="pt-2">
                      <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Learning Modes</dt>
                      <dd className="mt-1 flex flex-wrap gap-1.5">
                        {program.modes.map((mode) => (
                          <span
                            key={mode}
                            className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[11px] font-medium"
                          >
                            {mode}
                          </span>
                        ))}
                      </dd>
                    </div>
                  )}

                  <div className="pt-2">
                    <dt className="text-muted-foreground text-[11px] uppercase tracking-wider font-semibold">Eligibility</dt>
                    <dd className="font-medium mt-0.5 text-muted-foreground leading-relaxed">
                      {program.eligibility}
                    </dd>
                  </div>
                </dl>

                <h3 className="mt-6 pt-4 border-t border-border font-display text-sm font-bold text-foreground">
                  Key Career Outcomes
                </h3>
                <ul className="mt-2.5 space-y-2 text-xs sm:text-sm text-muted-foreground">
                  {program.outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 pt-4 border-t border-border">
                  <Button asChild className="w-full font-semibold">
                    <Link to="/register" search={{ program: program.slug }}>
                      Apply For This Batch
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full">
                    <a href={`tel:${ORG.phone.replace(/\s/g, "")}`}>
                      <Phone className="mr-1.5 h-3.5 w-3.5" /> Call {ORG.phone}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
