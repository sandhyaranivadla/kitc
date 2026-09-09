import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const placementImage = "/images/gallery/gallery_04.jpg";
import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PARTNER_NOTE } from "@/data/kitc";
import { employerSchema, submitEmployerRequest, type EmployerInput } from "@/lib/leads";

export const Route = createFileRoute("/hire")({
  head: () => ({
    meta: [
      { title: "Hire From Us — Job-Ready Candidates | KITC" },
      {
        name: "description",
        content:
          "Recruit trained, screened candidates from KITC for accounting, back-office, technical and site roles across Hyderabad. No placement fee.",
      },
      { property: "og:title", content: "Hire From Us — Job-Ready Candidates | KITC" },
      { property: "og:description", content: "Recruit screened, job-ready KITC candidates across Hyderabad." },
    ],
  }),
  component: HirePage,
});

function HirePage() {
  const [done, setDone] = useState(false);
  const form = useForm<EmployerInput>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      company_name: "",
      contact_person: "",
      phone: "",
      email: "",
      roles_needed: "",
      openings: "",
      location: "",
      message: "",
    },
  });

  async function onSubmit(values: EmployerInput) {
    try {
      await submitEmployerRequest(values);
      setDone(true);
      form.reset();
      toast.success("Request sent — our placement team will call you");
    } catch (error) {
      console.error(error);
      toast.error("We couldn't send your request. Please try again.");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="For employers"
        title="Hire job-ready candidates"
        description={PARTNER_NOTE}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {done ? (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h2 className="mt-4 font-display text-xl font-bold">Request received</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Our placement coordinator will contact you with shortlisted profiles.
                  </p>
                  <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>
                    Send another request
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 md:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="company_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company name</FormLabel>
                            <FormControl>
                              <Input placeholder="Company" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contact_person"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Contact person</FormLabel>
                            <FormControl>
                              <Input placeholder="Name" {...field} />
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
                              <Input type="email" placeholder="hr@company.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="roles_needed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Roles needed</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Accounts assistant, site supervisor" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="openings"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of openings</FormLabel>
                            <FormControl>
                              <Input inputMode="numeric" placeholder="e.g. 5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Work location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Kukatpally, Hyderabad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Requirement details</FormLabel>
                            <FormControl>
                              <Textarea rows={4} placeholder="Skills, salary range, shift timings" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <Button type="submit" size="lg" disabled={form.formState.isSubmitting}>
                          {form.formState.isSubmitting ? "Sending…" : "Request candidates"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="space-y-4">
            <img
              src={placementImage}
              alt="A placement interview in progress at KITC"
              loading="lazy"
              width={1200}
              height={900}
              className="rounded-xl shadow-card"
            />
            <Card className="shadow-card">
              <CardContent className="p-6">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="mt-3 font-display text-base font-bold">Why recruit from KITC</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>Candidates screened on attendance and assessments</li>
                  <li>Trained in spoken English and workplace conduct</li>
                  <li>Campus-style drives hosted at our centres</li>
                  <li>No placement fee</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
