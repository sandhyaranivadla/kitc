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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const workshopImage = "/images/gallery/gallery_17.jpg";

import {
  CENTERS,
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
            className="rounded-xl shadow-card"
          />
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Who we are</h2>
            <p className="mt-4 text-muted-foreground">
              KITC was registered on {ORG.registered} as a {ORG.entityType.toLowerCase()}, working in{" "}
              {ORG.sector.toLowerCase()}. We run two centres in Hyderabad and deliver a free 35-day vocational
              programme plus six-month industrial training for diploma and engineering students.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our approach is simple: teach a skill the market is actually hiring for, build the confidence to use it,
              and stay involved until the candidate is placed.
            </p>
            <dl className="mt-6 grid gap-2 rounded-lg border border-border bg-card p-5 text-sm shadow-card">
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">CIN</dt>
                <dd className="font-medium">{ORG.cin}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Registered on</dt>
                <dd className="font-medium">{ORG.registered}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted-foreground">Entity type</dt>
                <dd className="text-right font-medium">{ORG.entityType}</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* Mission, vision, values */}
      <div className="bg-secondary/60">
        <Section title="Mission, vision and values">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Mission",
                body: "Make quality vocational and industrial training free and accessible to underprivileged youth, and connect them to real jobs.",
              },
              {
                icon: Eye,
                title: "Vision",
                body: "A Telangana where a young person's household income never decides whether they can get skilled work.",
              },
              {
                icon: Compass,
                title: "Values",
                body: "Be focused. Be determined. Be empowered. We hold trainees and ourselves to the same discipline.",
              },
            ].map((item) => (
              <Card key={item.title} className="shadow-card">
                <CardContent className="p-4 sm:p-5">
                  <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <item.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-bold">{item.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      {/* Our Driving Principles (from original site) */}
      <Section
        eyebrow="Core Philosophy"
        title="Our Driving Principles"
        description="KAKATHEEYA was formed with 3 driving principles in mind:"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {DRIVING_PRINCIPLES.map((principle, index) => (
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
          ))}
        </div>
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
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6 md:gap-4">
            {HUB_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
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
                </button>
              );
            })}
          </div>
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
          <Section
            eyebrow="Leadership & Instructors"
            title="Our Team"
            description="Meet the dedicated leaders, trainers, and supervisors driving KITC's mission of empowering youth."
          >
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
              {TEAM_MEMBERS.map((member, index) => (
                <Card
                  key={index}
                  className="group flex flex-col items-center rounded-2xl border border-border/80 bg-card p-6 sm:p-8 text-center shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
                >
                  <div className="relative aspect-square w-44 sm:w-52 overflow-hidden rounded-full bg-muted/40 shadow-sm ring-1 ring-border/50">
                    <img
                      src={member.image}
                      alt={member.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-6 flex flex-col items-center">
                    <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground sm:text-xl">
                      {member.name}
                    </h3>
                    <div className="mt-2.5 inline-flex items-center rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                      {member.role}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Section>
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
                  className="group flex flex-col justify-between border-border/70 bg-card p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-base font-bold text-foreground leading-snug">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Official PDF Certificate
                      </p>
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

      {/* Where we operate (original section maintained) */}
      <Section title="Where we operate">
        <div className="grid gap-6 md:grid-cols-2">
          {CENTERS.map((c) => (
            <Card key={c.id} className="shadow-card">
              <CardContent className="p-6">
                <h3 className="font-display text-lg font-bold">{c.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.address}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Button asChild className="mt-8">
          <Link to="/contact">Visit or contact us</Link>
        </Button>
      </Section>
    </>
  );
}
