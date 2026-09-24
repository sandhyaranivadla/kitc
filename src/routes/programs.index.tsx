import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  Clock,
  IndianRupee,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAMS, type Program } from "@/data/kitc";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programmes — Vocational, IT, Teaching & Industrial Training | KITC" },
      {
        name: "description",
        content:
          "Explore KITC programmes: Business Associate (BA), Java/Python Development, Teacher's Training, Home Tutors (1st–10th), Free Vocational Course, and 6-Month Engineering Industrial Training.",
      },
      { property: "og:title", content: "Programmes — Vocational, IT, Teaching & Industrial Training | KITC" },
      {
        property: "og:description",
        content: "Explore certified training, flexible timings, placement assistance, and practical skilling at KITC Hyderabad.",
      },
    ],
  }),
  component: ProgramsPage,
});

const CATEGORIES = [
  { id: "all", label: "All Programmes" },
  { id: "vocational", label: "Vocational & Business" },
  { id: "it", label: "IT & Software" },
  { id: "teaching", label: "Teaching & Tutoring" },
  { id: "industrial", label: "Engineering Tracks" },
] as const;

function ProgramsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "vocational") {
      return p.slug === "business-associate" || p.slug === "vocational-soft-skills";
    }
    if (activeCategory === "it") {
      return p.slug === "java-python";
    }
    if (activeCategory === "teaching") {
      return p.slug === "teachers-training" || p.slug === "home-tutors";
    }
    if (activeCategory === "industrial") {
      return p.track === "industrial";
    }
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="Programmes & Courses"
        title="Job-Ready Training & Academic Excellence"
        description="Choose from our new vocational & professional courses, IT software batches, teacher certification, home tutoring, or 6-month engineering practical tracks."
      />

      {/* Category Navigation Bar */}
      <div className="sticky top-16 z-30 border-b border-border/80 bg-background/95 backdrop-blur py-3.5">
        <div className="container-page flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Filtered Course Catalog */}
      <Section
        title={
          activeCategory === "all"
            ? "Featured & Professional Programmes"
            : CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "Programmes"
        }
        description={`Showing ${filteredPrograms.length} programmes available across our Medchal & Alwal centres.`}
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPrograms.map((p) => (
            <ProgramCard key={p.slug} program={p} />
          ))}
        </div>
      </Section>

      {/* Quick Support Banner */}
      <div className="bg-secondary/40 py-12 border-t border-border">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" /> Direct Support
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight md:text-3xl">
              Have questions about batch timings or fees?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Speak directly with our academic counsellors at Medchal or Alwal. We assist students with batch timings, fee details, and enrollment.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-[#8b1a1a] hover:bg-[#6b1010] text-white shadow-md">
                <a href="tel:9908291309">Call 99082 91309</a>
              </Button>
              <Button asChild size="lg" className="bg-[#8b1a1a] hover:bg-[#6b1010] text-white shadow-md">
                <a href="tel:9490440021">Call 94904 40021</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="shadow-sm">
                <Link to="/register">Apply Online Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ProgramCard({ program }: { program: Program }) {
  const isNew =
    program.slug === "business-associate" ||
    program.slug === "java-python" ||
    program.slug === "teachers-training" ||
    program.slug === "home-tutors";

  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 bg-card shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#8b1a1a] hover:shadow-2xl hover:shadow-[#8b1a1a]/15 ring-1 ring-black/5">
      {/* Top Accent Gradient Border Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#8b1a1a] via-[#e8a040] to-[#0eb39e] group-hover:from-[#0eb39e] group-hover:via-[#e8a040] group-hover:to-[#8b1a1a] transition-all duration-500" />

      {isNew && (
        <div className="absolute right-3.5 top-4 z-10">
          <span className="inline-flex items-center rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 backdrop-blur-sm shadow-sm">
            Featured
          </span>
        </div>
      )}

      <CardContent className="flex flex-1 flex-col p-5 sm:p-6">
        {program.category && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
            {program.category}
          </span>
        )}

        <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
          {program.title}
        </h3>

        <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {program.summary}
        </p>

        {/* Metadata Details */}
        <div className="mt-4 space-y-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary shrink-0" /> Duration
            </span>
            <span className="font-semibold text-foreground text-right">{program.duration}</span>
          </div>

          {program.hours && (
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calendar className="h-3.5 w-3.5 text-primary shrink-0" /> Daily Hours
              </span>
              <span className="font-semibold text-foreground text-right">{program.hours}</span>
            </div>
          )}

          {program.timings && (
            <div className="flex items-start justify-between gap-2">
              <span className="flex items-center gap-1.5 text-muted-foreground shrink-0">
                <Clock className="h-3.5 w-3.5 text-primary shrink-0" /> Timings
              </span>
              <span className="font-medium text-[11px] text-foreground text-right max-w-[170px] leading-tight">
                {program.timings}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-border/50 pt-1.5">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <IndianRupee className="h-3.5 w-3.5 text-primary shrink-0" /> Fee
            </span>
            <span className="font-bold text-foreground text-right text-emerald-600 dark:text-emerald-400">
              {program.fee}
            </span>
          </div>
        </div>

        {/* Modes (Online/Offline) */}
        {program.modes && program.modes.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {program.modes.map((mode) => (
              <span
                key={mode}
                className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                {mode}
              </span>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2 pt-2 border-t border-border/50">
          <Button asChild size="sm" className="flex-1 font-semibold">
            <Link to="/programs/$slug" params={{ slug: program.slug }}>
              Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="flex-1 font-medium">
            <Link to="/register" search={{ program: program.slug }}>
              Apply Now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
