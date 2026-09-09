import { createFileRoute, Link } from "@tanstack/react-router";
import { HandHeart, Sparkles, Trophy, Users2 } from "lucide-react";

const youthImage = "/images/gallery/gallery_19.jpg";
import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/youth-empowerment")({
  head: () => ({
    meta: [
      { title: "Youth Empowerment — Community Programmes | KITC" },
      {
        name: "description",
        content:
          "KITC's youth empowerment work: social transformation training, community drives, mentoring and confidence building for underprivileged young people in Hyderabad.",
      },
      { property: "og:title", content: "Youth Empowerment — Community Programmes | KITC" },
      {
        property: "og:description",
        content: "Social transformation training, mentoring and community activities alongside vocational skilling.",
      },
    ],
  }),
  component: YouthPage,
});

const PILLARS = [
  {
    icon: Sparkles,
    title: "Social transformation training",
    body: "Values, discipline, hygiene, financial awareness and civic responsibility taught alongside technical skills.",
  },
  {
    icon: Users2,
    title: "Mentoring circles",
    body: "Small mentoring groups where trainees set goals, review progress and get help with personal barriers.",
  },
  {
    icon: HandHeart,
    title: "Community activities",
    body: "Awareness drives, cleanliness campaigns and volunteering that build ownership and leadership.",
  },
  {
    icon: Trophy,
    title: "Confidence & communication",
    body: "Public speaking, group discussion and interview practice so candidates present themselves well.",
  },
];

function YouthPage() {
  return (
    <>
      <PageHero
        eyebrow="Youth Empowerment"
        title="Skills alone don't change a life. Confidence does."
        description="Alongside training, we work on mindset, communication and community participation so young people can hold on to the opportunities they earn."
      />

      <Section>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <img
            src={youthImage}
            alt="Young people gathered outdoors during a KITC community outreach session"
            width={1200}
            height={900}
            className="rounded-xl shadow-card"
          />
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Who we work with</h2>
            <p className="mt-4 text-muted-foreground">
              Most of our trainees come from economically weaker households in and around Medchal and Alwal. Many are
              first-generation learners who have never used a computer, and many are young women returning to study
              after a break.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our programmes are free for these candidates, and we stay in touch after placement to make sure the
              transition into work actually holds.
            </p>
            <Button asChild className="mt-6">
              <Link to="/register">Join a batch</Link>
            </Button>
          </div>
        </div>
      </Section>

      <div className="bg-secondary/60">
        <Section title="What the programme covers">
          <div className="grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <Card key={p.title} className="shadow-card">
                <CardContent className="p-4 sm:p-5">
                  <span className="mb-3 grid h-9 w-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                    <p.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-base font-bold">{p.title}</h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground">{p.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </div>

      <Section>
        <div className="rounded-xl bg-primary p-6 text-primary-foreground md:p-8">
          <h2 className="font-display text-xl font-bold sm:text-2xl md:text-3xl">Partner with us on youth empowerment</h2>
          <p className="mt-2.5 max-w-2xl text-xs sm:text-sm opacity-90 leading-relaxed">
            Companies and individuals fund batches, sponsor equipment and mentor trainees. Every contribution keeps the
            short course free for the students who need it most.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md">
              <Link to="/donate">Support a batch</Link>
            </Button>
            <Button asChild size="lg" className="border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary font-semibold shadow-sm">
              <Link to="/hire">Hire our graduates</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
