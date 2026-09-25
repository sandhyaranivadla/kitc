import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CENTERS, ORG } from "@/data/kitc";
import { contactSchema, submitContactMessage, type ContactInput } from "@/lib/leads";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact KITC — Medchal & Alwal Training Centres" },
      {
        name: "description",
        content:
          "Call, WhatsApp or visit KITC in Medchal or Alwal, Hyderabad. Send us a message and our team will respond within two working days.",
      },
      { property: "og:title", content: "Contact KITC — Medchal & Alwal Training Centres" },
      { property: "og:description", content: "Reach KITC by phone, WhatsApp, email or at either Hyderabad centre." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [done, setDone] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<"telangana" | "medchal" | "alwal" | "all">("telangana");
  
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { full_name: "", phone: "", email: "", center: "", message: "" },
  });

  async function onSubmit(values: ContactInput) {
    try {
      await submitContactMessage(values);
      setDone(true);
      form.reset();
      toast.success("Message sent");
    } catch (error) {
      console.error(error);
      toast.error("We couldn't send your message. Please call or WhatsApp us instead.");
    }
  }

  const displayedCenters = CENTERS.filter((c) => {
    if (selectedRegion === "all" || selectedRegion === "telangana") return true;
    if (selectedRegion === "medchal") return c.id === "medchal";
    if (selectedRegion === "alwal") return c.id === "alwal";
    return true;
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="Walk in to either centre, or send a message and we'll call you back."
      />

      <Section>
        <div className="mx-auto max-w-4xl flex flex-col gap-8">
          {/* Direct Calling & Helpline Quick Card */}
          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="border-2 border-border/80 bg-card p-4 transition-all hover:border-primary/50 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Direct Call</p>
                  <div className="flex flex-col gap-0.5 mt-0.5">
                    <a href="tel:+919908291309" className="font-display text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors">
                      +91 99082 91309
                    </a>
                    <a href="tel:+919490440021" className="font-display text-xs sm:text-sm font-bold text-foreground hover:text-primary transition-colors">
                      +91 94904 40021
                    </a>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-2 border-border/80 bg-card p-4 transition-all hover:border-primary/50 shadow-sm">
              <a href={ORG.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 shrink-0">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">WhatsApp Chat</p>
                  <p className="font-display text-sm font-bold text-foreground">Instant Support</p>
                  <p className="text-[11px] text-muted-foreground">Online 7 Days a Week</p>
                </div>
              </a>
            </Card>

            <Card className="border-2 border-border/80 bg-card p-4 transition-all hover:border-primary/50 shadow-sm">
              <a href={`mailto:${ORG.email}`} className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Email Desk</p>
                  <p className="font-display text-xs font-bold text-foreground truncate max-w-[170px]">{ORG.email}</p>
                  <p className="text-[11px] text-muted-foreground">Student &amp; Partner Inquiries</p>
                </div>
              </a>
            </Card>
          </div>

          {/* Main Credentials Card */}
          {done ? (
            <Card className="shadow-card w-full">
              <CardContent className="p-8 text-center md:p-12">
                <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 font-display text-xl font-bold">Message sent</h2>
                <p className="mt-2 text-sm text-muted-foreground">We usually reply within two working days.</p>
                <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
                  Send another message
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-card w-full">
              <CardContent className="p-6 md:p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="full_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mobile number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="10-digit mobile" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email (optional)</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="you@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="center"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Centre</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value ?? ""}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a centre" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Telangana (Both Medchal & Alwal Centres)">
                                ★ Telangana (Both Medchal &amp; Alwal Centres)
                              </SelectItem>
                              {CENTERS.map((c) => (
                                <SelectItem key={c.id} value={c.name}>
                                  {c.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea rows={5} placeholder="How can we help?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? "Sending…" : "Send message"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}

          {/* Unified Centers Maps Card with Telangana Option */}
          <Card className="overflow-hidden rounded-2xl border-2 border-border/80 shadow-card w-full">
            <CardContent className="p-6 md:p-8">
              <div className="text-center max-w-xl mx-auto mb-6">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <h2 className="font-display text-2xl font-bold text-foreground">
                    Our Training Centres
                  </h2>
                  <Button asChild variant="outline" size="sm" className="rounded-full text-xs h-7 px-3 border-primary/40 text-primary hover:bg-primary hover:text-white">
                    <Link to="/centres">View All State Centres &rarr;</Link>
                  </Button>
                </div>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
                  Select an option below to view center locations and directions.
                </p>

                {/* Interactive State & Center Filter Tabs */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedRegion("telangana")}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                      selectedRegion === "telangana"
                        ? "bg-[#8b1a1a] text-white shadow-md ring-2 ring-[#8b1a1a]/30 scale-105"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    <MapPin className="h-3.5 w-3.5 text-[#e8a040]" /> Telangana (Both Medchal &amp; Alwal)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRegion("medchal")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      selectedRegion === "medchal"
                        ? "bg-[#8b1a1a] text-white shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    Medchal Centre
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRegion("alwal")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      selectedRegion === "alwal"
                        ? "bg-[#8b1a1a] text-white shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    Alwal Centre
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRegion("all")}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                      selectedRegion === "all"
                        ? "bg-[#8b1a1a] text-white shadow-sm"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border"
                    }`}
                  >
                    All Centres
                  </button>
                </div>

                {selectedRegion === "telangana" && (
                  <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Telangana: Showing both centres (Medchal &amp; Alwal)
                  </div>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {displayedCenters.map((c) => (
                  <div key={c.id} className="flex flex-col justify-between gap-4 border-2 border-border/80 rounded-2xl p-5 bg-background shadow-sm hover:border-primary/50 transition-all">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                          <MapPin className="h-4 w-4 text-primary shrink-0" /> {c.name}
                        </h3>
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                          Telangana
                        </span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-slate-700 dark:text-slate-300 font-medium min-h-[44px]">
                        {c.address}
                      </p>
                    </div>
                    <iframe
                      title={`Map of ${c.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
                      loading="lazy"
                      className="h-48 w-full border-0 rounded-xl shadow-inner"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>
    </>
  );
}
