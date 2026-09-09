import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, BadgeCheck, Building2, GraduationCap, HeartHandshake, MapPin, Instagram } from "lucide-react";

const heroImage = "/images/gallery/gallery_18.jpg";
const workshopImage = "/images/gallery/gallery_20.jpg";
const placementImage = "/images/gallery/gallery_02.jpg";
const programVocationalImage = "/images/gallery/gallery_19.jpg";
const programIndustrialImage = "/images/gallery/gallery_21.jpg";
import { Section } from "@/components/site/Section";
import { TestimonialCarousel } from "@/components/site/TestimonialCarousel";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CENTERS, IMPACT, ORG, PARTNER_NOTE, PROGRAMS, STORIES } from "@/data/kitc";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KITC — Free Skill Training & Jobs for Youth in Hyderabad" },
      {
        name: "description",
        content:
          "Free 35-day vocational training in Tally, GST, computers and spoken English, plus 6-month industrial training for diploma and B.Tech students in Medchal and Alwal.",
      },
      { property: "og:title", content: "KITC — Free Skill Training & Jobs for Youth in Hyderabad" },
      {
        property: "og:description",
        content:
          "Free vocational courses with placement assistance and 6-month industrial training across CSE, ECE, EEE, Mechanical and Civil.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const shortTerm = PROGRAMS.filter((p) => p.track === "short-term");
  const industrial = PROGRAMS.filter((p) => p.track === "industrial");

  return (
    <>
      <section className="relative overflow-hidden bg-[#f7f8f9] pt-4 pb-10 md:pt-6 md:pb-16">
        {/* Background Decorative Elements */}
        <div className="absolute -left-12 top-4 md:-left-4 md:-top-4 text-[#0eb39e] opacity-50 animate-float z-0 pointer-events-none">
          <svg width="120" height="160" viewBox="0 0 120 160">
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="3" cy="3" r="3" fill="currentColor" />
            </pattern>
            <rect x="0" y="0" width="120" height="160" fill="url(#dots)" />
          </svg>
        </div>
        
        <div className="absolute top-10 right-[35%] md:right-[45%] text-[#0eb39e] opacity-70 hidden md:block animate-float-horizontal z-0 pointer-events-none">
          <svg width="100" height="50" viewBox="0 0 100 50">
            <path d="M0,15 L20,35 L40,15 L60,35 L80,15 L100,35" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <path d="M0,25 L20,45 L40,25 L60,45 L80,25 L100,45" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <path d="M0,5 L20,25 L40,5 L60,25 L80,5 L100,25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
          </svg>
        </div>
        
        {/* Curved Background Shape overlay */}
        <div className="absolute -right-20 top-0 h-full w-[60%] rounded-l-full bg-white opacity-40"></div>

        <div className="container-page relative z-10 grid items-center gap-8 md:grid-cols-2">
          {/* Left Content */}
          <div className="max-w-xl xl:pr-10">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-[#0eb39e]">Welcome to KITC</p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-[#1a1a1a] md:text-5xl lg:text-[3.5rem]">
              <span className="block">Be Focused.</span>
              <span className="block">Be Determined.</span>
              <span className="block">Be Empowered.</span>
            </h1>
            <p className="mt-6 text-lg text-slate-700 font-medium">
              Free vocational training, industrial training for diploma and engineering students, and real job
              placement support for young people across Hyderabad.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="group rounded bg-[#f97316] px-8 py-6 text-base font-medium text-white shadow-md transition-all hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl">
                <Link to="/register">
                  Apply for a course <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded bg-white px-8 py-6 text-base font-medium text-slate-800 shadow-sm border-2 border-slate-200 transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md hover:bg-slate-50">
                <Link to="/donate">Support us (CSR)</Link>
              </Button>
            </div>
            <p className="mt-6 text-xs font-medium opacity-60 text-slate-600">
              {ORG.legalName} · CIN {ORG.cin}
            </p>
          </div>

          {/* Right Content / Image with Floating Card */}
          <div className="relative mx-auto w-full max-w-[420px] group/hero">
            {/* Red Dashed Circle Decorative */}
            <div className="absolute -right-12 top-20 h-48 w-48 rounded-full border-[8px] border-dashed border-[#ff4757] opacity-80 z-0 transition-transform duration-700 group-hover/hero:rotate-45"></div>
            
            {/* Pink Dots Decorative */}
            <div className="absolute -left-20 top-1/3 text-[#ff7979] opacity-70 hidden md:block z-0 transition-transform duration-700 group-hover/hero:-translate-y-4 group-hover/hero:-translate-x-2">
              <svg width="140" height="140" viewBox="0 0 140 140" className="animate-[pulse_4s_ease-in-out_infinite]">
                <pattern id="pink-dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="3" cy="3" r="3" fill="currentColor" />
                </pattern>
                <circle cx="70" cy="70" r="70" fill="url(#pink-dots)" />
              </svg>
            </div>

            {/* Main Image Container */}
            <div className="relative z-10 pt-4">
              {/* Yellow Dot Background Accent */}
              <div className="absolute -left-12 bottom-32 h-12 w-12 rounded-full bg-[#fbc531] z-0 transition-all duration-700 group-hover/hero:-translate-y-6 group-hover/hero:scale-110"></div>

              <img
                src={heroImage}
                alt="Smiling student holding books"
                className="relative z-10 w-full object-cover rounded-xl shadow-lg transition-transform duration-700 group-hover/hero:scale-[1.02]"
                style={{ height: '420px', objectPosition: 'top' }}
              />
              
              {/* Floating Placement Card */}
              <div className="absolute -bottom-6 -left-16 z-20 w-[300px] rounded-xl bg-white p-5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.15)] hidden sm:block transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.2)]">
                <h4 className="font-bold text-[#1a1a1a] text-[15px]">Placement Record</h4>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow-sm transition-transform hover:scale-110 hover:z-10 cursor-pointer">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 20}`} alt="Placed student" className="h-full w-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="leading-tight text-right pr-2">
                    <span className="block font-bold text-[#f97316] text-[15px]">250+</span>
                    <span className="text-xs text-slate-600 font-medium">Students Placed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-card">
        <div className="container-page flex flex-wrap justify-evenly items-center gap-8 py-8 text-center">
          {IMPACT.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <p className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                <AnimatedCounter value={stat.value} />
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <Section
        title="Three ways to work with us"
        description="Whether you want to learn, hire or give, there is a clear next step."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Youth Enrolment",
              body: "Free computer training and job placement assistance. Course duration 35 days.",
              to: "/register" as const,
              cta: "Enrol now",
              bg: "bg-[#e9e3ff]",
              textDark: "text-[#3b2c85]",
            },
            {
              icon: Building2,
              title: "Hire From Us",
              body: "Job-ready candidates with good communication skills, screened to your requirements.",
              to: "/hire" as const,
              cta: "Request candidates",
              bg: "bg-[#cbfb6e]",
              textDark: "text-[#3f570e]",
            },
            {
              icon: HeartHandshake,
              title: "CSR Engagement",
              body: "Fund free education and social activity programmes for underprivileged youth.",
              to: "/donate" as const,
              cta: "Donate",
              bg: "bg-[#9ce3fd]",
              textDark: "text-[#0d5675]",
            },
          ].map((item) => (
            <div key={item.title} className={`relative flex flex-col justify-between overflow-hidden rounded-[2rem] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group ${item.bg}`}>
              
              <div className="relative z-10">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                  <item.icon className="h-6 w-6" />
                </span>
                <h3 className={`mt-8 font-display text-2xl font-bold leading-tight ${item.textDark}`}>{item.title}</h3>
                <p className={`mt-4 text-[15px] leading-relaxed font-medium opacity-90 ${item.textDark}`}>
                  {item.body}
                </p>
              </div>

              <div className="relative z-10 mt-12 flex items-center">
                <Link to={item.to} className={`inline-flex items-center text-sm font-bold transition-opacity hover:opacity-75 ${item.textDark}`}>
                  {item.cta} <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Decorative large icon in background */}
              <item.icon className={`absolute -bottom-8 -right-8 h-48 w-48 opacity-[0.07] transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-12 ${item.textDark}`} />
            </div>
          ))}
        </div>
      </Section>

      <div className="bg-secondary/60">
        <Section title="Our programmes" description="Two tracks, both built around getting a real job at the end." className="max-w-6xl mx-auto px-4 md:px-8 !py-4 md:!py-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Card className="flex h-full flex-col overflow-hidden shadow-card">
              <img
                src={programVocationalImage}
                alt="Students working on computers at the KITC computer lab"
                loading="lazy"
                width={1600}
                height={1008}
                className="h-52 w-full object-cover sm:h-60"
              />
              <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-red">35 days · Free</p>
                  <h3 className="mt-1 font-display text-base font-bold">{shortTerm[0]?.title}</h3>
                  <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                    {["Tally", "GST", "Spoken English", "Computer basics", "Life skills", "Confidence building"].map(
                      (c) => (
                        <li key={c} className="flex items-center gap-1.5">
                          <BadgeCheck className="h-3 w-3 text-primary" /> {c}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="mt-auto pt-3">
                  <Button asChild size="sm">
                    <Link to="/programs/$slug" params={{ slug: shortTerm[0]?.slug ?? "" }}>
                      View syllabus
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="flex h-full flex-col overflow-hidden shadow-card">
              <img
                src={programIndustrialImage}
                alt="Trainer conducting a lesson at a KITC centre"
                loading="lazy"
                width={1200}
                height={900}
                className="h-52 w-full object-cover sm:h-60"
              />
              <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-brand-red">6 months · Diploma / B.Tech</p>
                  <h3 className="mt-1 font-display text-base font-bold">Industrial &amp; practical training</h3>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {industrial.map((p) => (
                      <li key={p.slug}>
                        <Link
                          to="/programs/$slug"
                          params={{ slug: p.slug }}
                          className="inline-flex rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-medium hover:bg-secondary"
                        >
                          {p.title.split("— ")[1]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-auto pt-3">
                  <Button asChild size="sm">
                    <Link to="/programs">Compare all programmes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </div>

      <Section title="Social impact" description="Training that changes a household, not just a résumé." className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={placementImage}
            alt="A KITC candidate being interviewed at a placement drive"
            loading="lazy"
            width={1200}
            height={900}
            className="rounded-xl shadow-card"
          />
          <div>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We work with students from underprivileged backgrounds, combining vocational training with social
              transformation training so that they are equipped to get the right job and uplift their families.
            </p>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">{PARTNER_NOTE}</p>
          </div>
        </div>
        
        <div className="mt-20">
          <TestimonialCarousel />
        </div>
      </Section>

      <div className="bg-secondary/60">
        <Section title="Our offices in Hyderabad" description="Walk in to either centre, or message us before you visit.">
          <div className="grid gap-6 md:grid-cols-2">
            {CENTERS.map((c) => (
              <Link to="/contact" key={c.id} className="block group">
                <Card className="h-full shadow-card transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary/20">
                  <CardContent className="flex gap-3 p-6">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary transition-colors group-hover:text-blue-600" />
                    <div>
                      <h3 className="font-display text-lg font-bold transition-colors group-hover:text-blue-600">{c.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{c.address}</p>
                      <span className="mt-4 inline-block text-sm font-medium text-primary underline-offset-4 group-hover:underline">
                        Get directions
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* Floating Social Icons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Instagram */}
        <a 
          href="https://instagram.com" 
          target="_blank" 
          rel="noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white shadow-lg transition-transform hover:scale-110"
        >
          <Instagram className="h-7 w-7" />
        </a>
        {/* WhatsApp */}
        <a 
          href="https://wa.me/919999999999" 
          target="_blank" 
          rel="noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_0_rgba(0,0,0,0.1)] transition-transform hover:scale-110"
        >
          <svg viewBox="0 0 448 512" width="34" height="34" fill="#25D366">
            <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.7c-32.5 0-64.2-8.7-92.1-25.2l-6.6-3.9-68.5 18 18.3-66.8-4.3-6.8c-18.1-28.7-27.7-61.9-27.7-96.1 0-103.5 84.3-187.8 187.9-187.8 50.1 0 97.2 19.5 132.7 55 35.4 35.4 54.9 82.5 54.9 132.7 0 103.5-84.3 187.8-187.9 187.8zm102.9-140.4c-5.6-2.8-33.4-16.5-38.6-18.4-5.2-1.9-9-2.8-12.8 2.8-3.8 5.6-14.6 18.4-17.9 22.2-3.3 3.8-6.6 4.2-12.2 1.4-5.6-2.8-23.8-8.8-45.3-27.9-16.7-14.8-28-33.1-31.3-38.8-3.3-5.6-.3-8.6 2.5-11.4 2.5-2.5 5.6-6.6 8.4-9.9 2.8-3.3 3.8-5.6 5.6-9.4 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.9-17.5-42.3-4.6-11.1-9.3-9.6-12.8-9.8-3.3-.2-7.1-.2-10.9-.2-3.8 0-9.9 1.4-15.1 7.1-5.2 5.6-19.9 19.5-19.9 47.5s20.4 55.1 23.2 58.9c2.8 3.8 40.2 61.4 97.3 86 13.6 5.9 24.2 9.4 32.5 12 13.6 4.3 26 3.7 35.8 2.2 10.9-1.6 33.4-13.7 38.1-26.9 4.7-13.2 4.7-24.5 3.3-26.9-1.4-2.5-5.2-3.9-10.8-6.7z"/>
          </svg>
        </a>
      </div>
    </>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = match && match[1] ? parseInt(match[1], 10) : 0;
  const suffix = match && match[2] ? match[2] : "";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isNumeric || !isVisible) return;
    
    let startTimestamp: number | null = null;
    const duration = 2000; // 2 seconds animation
    
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // easeOutQuart for smooth deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeProgress * target));
      
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    
    requestAnimationFrame(step);
  }, [target, isNumeric, isVisible]);

  if (!isNumeric) {
    return <span>{value}</span>;
  }

  return <span ref={elementRef}>{count}{suffix}</span>;
}
