import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  CheckCircle2,
  Compass,
  Download,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  Newspaper,
  PenSquare,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/Section";
import { StaggerContainer, StaggerItem } from "@/components/ui/stagger";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const workshopImage = "/images/gallery/gallery_17.jpg";

import {
  DRIVING_PRINCIPLES,
  ORG,
  STATUTORY_DOCUMENTS,
  TEAM_MEMBERS,
} from "@/data/kitc";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About KITC — Kakatheeya Industrial Training Centre" },
      {
        name: "description",
        content:
          "Kakatheeya Industrial Training Centre and Association is a Telangana-registered non-profit (CIN U88900TS2023NPL176600) delivering free skilling and employment support.",
      },
      { property: "og:title", content: "About KITC — Kakatheeya Industrial Training Centre" },
      {
        property: "og:description",
        content: "A registered Telangana non-profit delivering free vocational skilling and placement support.",
      },
    ],
  }),
  component: AboutPage,
});

type AboutTab = "team" | "policy" | "statutory" | "newsletters" | "reports" | "awards";

const HUB_ITEMS = [
  { id: "team" as const, label: "Team", icon: Users },
  { id: "policy" as const, label: "Organization Policy", icon: PenSquare },
  { id: "statutory" as const, label: "Statutory Documents", icon: FileText },
  { id: "newsletters" as const, label: "Newsletters", icon: Newspaper },
  { id: "reports" as const, label: "Annual Reports", icon: BarChart3 },
  { id: "awards" as const, label: "Awards", icon: Award },
];

function AboutPage() {
  const [activeTab, setActiveTab] = useState<AboutTab>("team");

  const handleTabClick = (tabId: AboutTab) => {
    setActiveTab(tabId);
    const targetElement = document.getElementById("about-details");
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="About us"
        title={ORG.legalName}
        description="A registered non-profit working on vocational training, industrial training and youth employment in Hyderabad."
      />

      {/* Who we are */}
      <Section>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <img
            src={workshopImage}
            alt="Trainers guiding students during a practical session"
            width={1200}
            height={900}
            className="rounded-2xl shadow-lg border-2 border-border/60"
          />
          <div>
            <h2 className="font-display text-3xl font-extrabold md:text-4xl text-[#1a1a1a] tracking-tight">
              Who we are
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 font-medium">
              <strong className="text-[#8b1a1a] font-bold">KITC</strong> (Kakatheeya Industrial Training Centre and Association) was registered on{" "}
              <strong className="text-foreground font-semibold">{ORG.registered}</strong> as a{" "}
              <span className="text-[#b45309] font-bold">{ORG.entityType.toLowerCase()}</span>, working in{" "}
              {ORG.sector.toLowerCase()}. We run two centres in Hyderabad and deliver a free 35-day vocational
              programme plus six-month industrial training for diploma and engineering students.
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-700 font-medium">
              Our approach is simple: teach a skill the market is actually hiring for, build the confidence to use it,
              and stay involved until the candidate is placed.
            </p>
            
            {/* Company Credentials Information Box with Brand Font Colors */}
            <dl className="mt-6 grid gap-2.5 rounded-2xl border-2 border-[#8b1a1a]/25 bg-gradient-to-br from-card via-[#8b1a1a]/5 to-card p-5 sm:p-6 text-sm shadow-md">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border/60 pb-2">
                <dt className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Company Name</dt>
                <dd className="font-display font-bold text-[#8b1a1a] text-sm sm:text-base text-left sm:text-right">{ORG.legalName}</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-border/60 pb-2">
                <dt className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">CIN (Corporate ID)</dt>
                <dd className="font-mono font-bold text-[#8b1a1a] tracking-wider text-sm">{ORG.cin}</dd>
              </div>
              <div className="flex justify-between items-center gap-4 border-b border-border/60 pb-2">
                <dt className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Registered on</dt>
                <dd className="font-semibold text-foreground">{ORG.registered}</dd>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1 pt-0.5">
                <dt className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Entity Type</dt>
                <dd className="text-left sm:text-right font-bold text-[#b45309]">{ORG.entityType}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* Mission, vision, values with customized colors and modern typography */}
      <div className="bg-secondary/40 py-4">
        <Section title="Mission, vision and values" description="The core guiding pillars that steer every programme, batch, and placement at KITC.">
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Mission",
                body: "Make quality vocational and industrial training free and accessible to underprivileged youth, and connect them to real jobs.",
                border: "border-2 border-emerald-500/40 hover:border-emerald-600",
                bg: "bg-gradient-to-b from-emerald-50/80 via-card to-card dark:from-emerald-950/20",
                titleColor: "text-emerald-900 dark:text-emerald-300",
                iconBg: "bg-emerald-600 text-white shadow-md shadow-emerald-600/30",
                textColor: "text-emerald-950/80 dark:text-emerald-200/80",
                accentLine: "bg-emerald-500",
              },
              {
                icon: Eye,
                title: "Vision",
                body: "A Telangana where a young person's household income never decides whether they can get skilled work.",
                border: "border-2 border-amber-500/40 hover:border-amber-600",
                bg: "bg-gradient-to-b from-amber-50/80 via-card to-card dark:from-amber-950/20",
                titleColor: "text-amber-900 dark:text-amber-300",
                iconBg: "bg-amber-600 text-white shadow-md shadow-amber-600/30",
                textColor: "text-amber-950/80 dark:text-amber-200/80",
                accentLine: "bg-amber-500",
              },
              {
                icon: Compass,
                title: "Values",
                body: "Be focused. Be determined. Be empowered. We hold trainees and ourselves to the same discipline.",
                border: "border-2 border-[#8b1a1a]/40 hover:border-[#8b1a1a]",
                bg: "bg-gradient-to-b from-rose-50/80 via-card to-card dark:from-rose-950/20",
                titleColor: "text-[#8b1a1a] dark:text-rose-300",
                iconBg: "bg-[#8b1a1a] text-white shadow-md shadow-[#8b1a1a]/30",
                textColor: "text-rose-950/80 dark:text-rose-200/80",
                accentLine: "bg-[#8b1a1a]",
              },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <Card className={`relative overflow-hidden rounded-2xl ${item.border} ${item.bg} shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl h-full`}>
                  <div className={`h-1.5 w-full ${item.accentLine}`} />
                  <CardContent className="p-5 sm:p-6 flex flex-col justify-between h-[calc(100%-6px)]">
                    <div>
                      <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${item.iconBg}`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <h3 className={`font-display text-2xl font-black tracking-tight ${item.titleColor}`}>
                        {item.title}
                      </h3>
                      <p className={`mt-3 text-sm font-medium leading-relaxed ${item.textColor}`}>
                        {item.body}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Section>
      </div>

      {/* Our Driving Principles (from original site) */}
      <Section
        eyebrow="Core Philosophy"
        title="Our Driving Principles"
        description="KAKATHEEYA was formed with 3 driving principles in mind:"
      >
        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {DRIVING_PRINCIPLES.map((principle, index) => (
            <StaggerItem key={index}>
            <Card
              key={index}
              className="group relative overflow-hidden border-border/80 bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <CardContent className="flex items-start gap-4 p-6">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 font-display text-base font-bold text-primary ring-1 ring-primary/25">
                  {index + 1}
                </span>
                <p className="text-base font-medium leading-relaxed text-foreground">
                  {principle}
                </p>
              </CardContent>
            </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Section>

      {/* Iconic Navigation Cards (Website Brand Colors, Unmoved Stationary Layout) */}
      <div
        className="relative my-6 overflow-hidden border-y border-primary/20 bg-cover bg-center py-10 md:py-14"
        style={{
          backgroundImage: `url('/images/about/education-bg.jpg')`,
        }}
      >
        {/* Brand deep indigo-blue overlay matching website theme */}
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.30_0.10_254)] via-[oklch(0.38_0.12_254)] to-[oklch(0.30_0.10_254)] opacity-95 backdrop-blur-[1px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {HUB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <StaggerItem key={item.id}>
                  <motion.button
                    whileHover={{ scale: isActive ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleTabClick(item.id)}
                  className={`group relative flex flex-col items-center justify-between rounded-2xl p-5 sm:p-6 text-center transition-all duration-300 focus:outline-none h-[190px] sm:h-[205px] ${
                    isActive
                      ? "border-2 border-primary bg-card text-card-foreground ring-4 ring-white/30 shadow-2xl scale-105"
                      : "border-2 border-white/20 bg-card/95 text-card-foreground hover:bg-card hover:border-white/50 hover:scale-102 shadow-lg"
                  }`}
                  aria-label={item.label}
                >
                  {/* Primary Circle Icon matching website palette */}
                  <div
                    className={`flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full transition-all duration-300 shadow-md ${
                      isActive
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20 scale-110 shadow-primary/40"
                        : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110"
                    }`}
                  >
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
                  </div>

                  {/* Title Text in website primary & foreground color */}
                  <span
                    className={`font-display text-xs sm:text-sm md:text-base font-bold tracking-wide transition-colors leading-snug px-1 ${
                      isActive
                        ? "text-primary font-extrabold"
                        : "text-foreground group-hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Indicator Underline Bar */}
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      isActive
                        ? "w-10 bg-primary"
                        : "w-6 bg-primary/20 group-hover:w-10 group-hover:bg-primary/60"
                    }`}
                  />
                  </motion.button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>

      {/* Interactive Details Container for Clicked Things */}
      <div id="about-details" className="scroll-mt-24">
        {/* Navigation Pills for quick switching */}
        <div className="border-b border-border bg-muted/40 py-3">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-2 px-4 sm:px-6 lg:px-8">
            <span className="mr-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:inline-block">
              View Section:
            </span>
            {HUB_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-background text-muted-foreground hover:bg-card hover:text-foreground border border-border"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. TEAM CONTENT */}
        {activeTab === "team" && (
          <div className="relative overflow-hidden bg-gradient-to-b from-[#f8f9fa] via-slate-50 to-[#f1f3f5] dark:from-background dark:via-muted/20 dark:to-background py-6 border-b border-border/80">
            {/* Ambient decorative lighting orbs */}
            <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#8b1a1a]/5 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#e8a040]/10 blur-3xl pointer-events-none" />

            <Section
              eyebrow="Leadership & Instructors"
              title="Our Team"
              description="Meet the dedicated leaders, trainers, and supervisors driving KITC's mission of empowering youth."
            >
              <StaggerContainer className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                {TEAM_MEMBERS.map((member, index) => (
                  <StaggerItem key={index}>
                    <Card
                      className="group relative flex h-full flex-col items-center rounded-2xl border-2 border-slate-200/90 dark:border-slate-800 bg-card p-6 sm:p-7 text-center shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-[#8b1a1a] hover:shadow-2xl hover:shadow-[#8b1a1a]/15 ring-1 ring-black/5 overflow-hidden"
                    >
                      {/* Top Accent Strip */}
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#8b1a1a] via-[#e8a040] to-[#0eb39e] group-hover:from-[#0eb39e] group-hover:via-[#e8a040] group-hover:to-[#8b1a1a] transition-all duration-500" />

                      {/* Framed Portrait Box - Rounded Circular Frame */}
                      <div className="mt-2 relative aspect-square w-44 h-44 sm:w-52 sm:h-52 shrink-0 p-1.5 rounded-full bg-gradient-to-tr from-[#8b1a1a]/30 via-[#e8a040]/40 to-[#0eb39e]/30 shadow-md ring-2 ring-border/80 transition-all duration-500 group-hover:ring-4 group-hover:ring-[#8b1a1a]/50 group-hover:shadow-xl">
                        <div className="h-full w-full overflow-hidden rounded-full bg-muted/40">
                          <img
                            src={member.image}
                            alt={member.name}
                            width={500}
                            height={500}
                            className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                          />
                        </div>
                      </div>
                      <div className="mt-6 flex flex-col items-center">
                        <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl transition-colors duration-300 group-hover:text-[#8b1a1a]">
                          {member.name}
                        </h3>
                        <div className="mt-2.5 inline-flex items-center rounded-full border border-[#8b1a1a]/30 bg-[#8b1a1a]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8b1a1a] transition-all duration-300 group-hover:bg-[#8b1a1a] group-hover:text-white group-hover:border-transparent">
                          {member.role}
                        </div>
                      </div>
                    </Card>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </Section>
          </div>
        )}

        {/* 2. STATUTORY DOCUMENTS CONTENT */}
        {activeTab === "statutory" && (
          <Section
            eyebrow="Compliance & Governance"
            title="Statutory Documents"
            description="Official licenses, registrations, and tax certificates of Kakatheeya Industrial Training Centre and Association (CIN: U88900TS2023NPL176600)."
          >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {STATUTORY_DOCUMENTS.map((doc, index) => (
                <Card
                  key={index}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/80 bg-card p-5 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-xl ring-1 ring-black/5"
                >
                  <div className="flex items-start gap-3.5">
                    {/* Small official KITC logo emblem with verified check */}
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white border border-border shadow-sm p-1 overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-md">
                      <img
                        src="/kitc-favicon-512.png"
                        alt="KITC Seal Logo"
                        className="h-full w-full object-contain"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white shadow ring-1 ring-white">
                        <CheckCircle2 className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-bold text-foreground leading-snug">
                        {doc.name}
                      </h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                          Official PDF
                        </span>
                        <span className="text-[11px] text-muted-foreground">Govt / MCA Verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 pt-3 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs gap-1.5"
                      asChild
                    >
                      <a
                        href={doc.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View PDF
                      </a>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="text-xs px-3"
                      asChild
                    >
                      <a
                        href={doc.pdfUrl}
                        download={doc.filename}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </a>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border bg-card/60 p-6 text-center max-w-2xl mx-auto shadow-sm">
              <p className="text-sm text-muted-foreground">
                All statutory filings are up to date and verified under the Ministry of Corporate Affairs (MCA), Government of India and the Government of Telangana.
              </p>
            </div>
          </Section>
        )}

        {/* 3. ORGANIZATION POLICY CONTENT */}
        {activeTab === "policy" && (
          <Section
            eyebrow="Institutional Framework"
            title="Organization Policy"
            description="Our operational guidelines and ethical framework ensuring transparent, inclusive, and accountable community impact."
          >
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "100% Free & Open Access Policy",
                  description:
                    "Vocational and soft skills training programmes are provided completely free of charge. No student is ever charged tuition, lab, or course material fees.",
                  icon: FileCheck,
                },
                {
                  title: "Non-Discrimination & Equal Opportunity",
                  description:
                    "Zero tolerance for discrimination based on caste, religion, gender, socio-economic background, or disability. Equal dignity and opportunity for every applicant.",
                  icon: ShieldCheck,
                },
                {
                  title: "Student Safety & Child Safeguarding",
                  description:
                    "Strict safety protocols across our training centres, labs, and workshop machinery, accompanied by dedicated grievance redressal mechanisms.",
                  icon: Target,
                },
                {
                  title: "Transparent Placement Ethics",
                  description:
                    "We partner only with verified employers who comply with statutory minimum wages, employee safety norms, and fair workplace conditions.",
                  icon: Users,
                },
                {
                  title: "Financial Governance & Section 8 Compliance",
                  description:
                    "All funds, donations, and CSR support are applied strictly towards non-profit training objectives with audited annual financial disclosures.",
                  icon: FileText,
                },
                {
                  title: "Whistleblower & Grievance Redressal",
                  description:
                    "Students, staff, and partners have direct access to our grievance committee to voice concerns safely, confidentially, and without fear of reprisal.",
                  icon: PenSquare,
                },
              ].map((policy, index) => {
                const Icon = policy.icon;
                return (
                  <Card key={index} className="border-border/70 bg-card p-6 shadow-card">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg font-bold text-foreground">
                          {policy.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {policy.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Section>
        )}

        {/* 4. NEWSLETTERS CONTENT */}
        {activeTab === "newsletters" && (
          <Section
            eyebrow="Community Updates"
            title="Newsletters & Bulletins"
            description="Recent happenings, graduation batch reports, partner engagements, and community milestones from KITC."
          >
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  quarter: "Quarter 4",
                  year: "2024",
                  title: "Annual Placement Convocation & Employer Summit",
                  excerpt:
                    "Celebrating over 150+ successful placements in retail, logistics, and accounting. Over 10 hiring partners attended our placement drive.",
                  tag: "Placement Drive",
                },
                {
                  quarter: "Quarter 3",
                  year: "2024",
                  title: "Launch of 6-Month Industrial Engineering Tracks",
                  excerpt:
                    "Introduction of specialized curriculum in CSE, ECE, EEE, Mechanical, and Civil engineering for polytechnic and engineering graduates.",
                  tag: "Academic Expansion",
                },
                {
                  quarter: "Quarter 2",
                  year: "2024",
                  title: "Community Outreach in Medchal & Alwal Centers",
                  excerpt:
                    "Grassroots youth mobilization reaching over 500 households, driving awareness about free technical skilling and livelihood programmes.",
                  tag: "Community Impact",
                },
              ].map((news, index) => (
                <Card key={index} className="flex flex-col justify-between border-border/70 bg-card p-6 shadow-card">
                  <div>
                    <div className="flex items-center justify-between text-xs font-semibold text-primary">
                      <span>{news.quarter}, {news.year}</span>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-primary">
                        {news.tag}
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                      {news.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/50">
                    <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                      <Link to="/contact">Request Issue Copy</Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-border/80 bg-card p-6 text-center max-w-xl mx-auto shadow-sm">
              <h4 className="font-display text-base font-bold">Subscribe to our newsletter</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Get our quarterly impact report and batch highlights directly in your inbox.
              </p>
              <Button asChild size="sm" className="mt-4">
                <Link to="/contact">Subscribe or Get in Touch</Link>
              </Button>
            </div>
          </Section>
        )}

        {/* 5. ANNUAL REPORTS CONTENT */}
        {activeTab === "reports" && (
          <Section
            eyebrow="Transparency & Metrics"
            title="Annual Reports"
            description="Verified performance statistics, financial transparency, and annual impact summaries."
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-border/70 bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Financial Year 2023–2024
                  </span>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Annual Impact & Operations Report
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span><strong>320+</strong> Youth trained in vocational skills</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span><strong>150+</strong> Candidates placed with corporate recruiters</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span><strong>2</strong> Active training centres in Medchal and Alwal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>100% Free course delivery under Section 8 mandate</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                    <Link to="/contact">Request Full Audit Copy</Link>
                  </Button>
                </div>
              </Card>

              <Card className="border-border/70 bg-card p-6 shadow-card">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                    Financial Year 2024–2025
                  </span>
                  <BarChart3 className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="mt-4 font-display text-xl font-bold">
                  Program Expansion & Mid-Year Statement
                </h3>
                <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Rollout of 6-month specialized diploma engineering tracks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Expansion of recruitment partnerships to 10+ companies</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Upgraded computer labs with industry-standard software</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Full statutory compliance (MCA, 80G, 12A, Niti Aayog)</span>
                  </li>
                </ul>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                    <Link to="/contact">Contact Accounts Division</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </Section>
        )}

        {/* 6. AWARDS CONTENT */}
        {activeTab === "awards" && (
          <Section
            eyebrow="Recognition"
            title="Awards & Honors"
            description="Appreciation from government authorities, local bodies, and industry partners for excellence in skilling."
          >
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Excellence in Grassroots Skill Development",
                  awardedBy: "Vocational Training Excellence Forum",
                  year: "2024",
                  description:
                    "Conferred for outstanding dedication to offering free technical training and achieving over 75% placement outcomes for economically disadvantaged candidates.",
                },
                {
                  title: "Community Youth Empowerment Citation",
                  awardedBy: "Telangana Social Impact Consortium",
                  year: "2023",
                  description:
                    "Recognized for impactful mobilization of rural youth into formal sector employment across retail, logistics, and accounts management.",
                },
                {
                  title: "Best Industry-Aligned Vocational Curriculum",
                  awardedBy: "Regional Employment Partners Summit",
                  year: "2024",
                  description:
                    "Awarded in appreciation of practical computer software, Tally, spoken English, and engineering workshop courses built around real industry hiring needs.",
                },
              ].map((award, index) => (
                <Card key={index} className="border-border/70 bg-card p-6 shadow-card flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500">
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                      {award.year} • {award.awardedBy}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                      {award.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {award.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
        )}
      </div>
    </>
  );
}
