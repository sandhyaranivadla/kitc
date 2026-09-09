import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { PageHero, Section } from "@/components/site/Section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BRANCHES, CENTERS, PROGRAMS } from "@/data/kitc";
import { applicationSchema, submitApplication, type ApplicationInput } from "@/lib/leads";

const searchSchema = z.object({ program: z.string().optional() });

export const Route = createFileRoute("/register")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Candidate Registration — Apply to a KITC Batch" },
      {
        name: "description",
        content:
          "Register for KITC's free 35-day vocational course or a 6-month industrial training track in Medchal or Alwal. Takes two minutes.",
      },
      { property: "og:title", content: "Candidate Registration — Apply to a KITC Batch" },
      { property: "og:description", content: "Apply online for free vocational training or industrial training." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const { program } = Route.useSearch();
  const [reference, setReference] = useState<string | null>(null);

  const form = useForm<ApplicationInput>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      full_name: "",
      phone: "",
      email: "",
      program_track: program ?? "",
      branch: "",
      center: "",
      education: "",
      city: "",
      message: "",
      dob: "",
      school_name: "",
      college_name: "",
      specialization: "",
      year_of_passing: "",
      aadhar_no: "",
      religion_caste: "",
      reference_by: "",
      languages_known: "",
      mother_name: "",
      father_name: "",
      mother_occupation: "",
      father_occupation: "",
      emergency_contact_no: "",
      annual_income: "",
    },
  });

  const selected = PROGRAMS.find((p) => p.slug === form.watch("program_track"));

  async function onSubmit(values: ApplicationInput) {
    try {
      const data = await submitApplication(values);
      setReference((data as { reference_no?: string })?.reference_no ?? "Received");
      form.reset();
      toast.success("Application submitted");
    } catch (error) {
      console.error(error);
      toast.error("We couldn't submit your application. Please try again or WhatsApp us.");
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Registration"
        title="Apply for a batch"
        description="Fill this in and our team will call you to confirm your seat and batch start date."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {reference ? (
              <Card className="shadow-card">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <h2 className="mt-4 font-display text-xl font-bold">Application received</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your reference number is <strong className="text-foreground">{reference}</strong>. Keep it handy —
                    our team will call you within two working days.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <Button onClick={() => setReference(null)} variant="outline">
                      Submit another application
                    </Button>
                    <Button asChild>
                      <Link to="/programs">Browse programmes</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-card">
                <CardContent className="p-6 md:p-8">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      {/* Section: Student Details */}
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-foreground">Student Details</h3>
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full name (As per Aadhar)</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dob"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="aadhar_no"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Aadhar No</FormLabel>
                                <FormControl>
                                  <Input placeholder="12-digit Aadhar" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="religion_caste"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Religion / Caste</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Hindu / BC" {...field} />
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
                        </div>
                      </div>

                      {/* Section: Education Details */}
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-foreground">Education Details</h3>
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Highest Qualification</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. B.Tech, Diploma" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="year_of_passing"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year of Passing</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 2023" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="school_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your high school" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="college_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>College Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your college" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="specialization"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Specialization</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. ECE, CSE, MPC" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="languages_known"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Languages Known</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. English, Telugu" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Section: Course Preferences */}
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-foreground">Course Preferences</h3>
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="program_track"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Programme</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose a programme" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {PROGRAMS.map((p) => (
                                      <SelectItem key={p.slug} value={p.slug}>
                                        {p.title}
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
                            name="center"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Preferred Centre</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Choose a centre" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
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
                          {selected?.track === "industrial" ? (
                            <FormField
                              control={form.control}
                              name="branch"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Branch</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value ?? ""}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Choose your branch" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {BRANCHES.map((b) => (
                                        <SelectItem key={b} value={b}>
                                          {b}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          ) : null}
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Town / Area</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Medchal" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Section: Family Details */}
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-foreground">Family Details</h3>
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="mother_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mother's Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="father_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Father's Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="mother_occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Mother's Occupation</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="father_occupation"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Father's Occupation</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="annual_income"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Annual Income</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. 150000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="emergency_contact_no"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Emergency Contact No</FormLabel>
                                <FormControl>
                                  <Input type="tel" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Section: Additional Information */}
                      <div>
                        <h3 className="mb-4 text-lg font-medium text-foreground">Additional Information</h3>
                        <div className="grid gap-5 md:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="reference_by"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Reference (Who referred you?)</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Anything else we should know?</FormLabel>
                                <FormControl>
                                  <Textarea rows={3} placeholder="Optional notes" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full md:w-auto">
                          {form.formState.isSubmitting ? "Submitting…" : "Submit application"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            )}
          </div>

          <aside className="space-y-4">
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="font-display text-base font-bold">What happens next</h2>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li>1. We call you to verify your details.</li>
                  <li>2. A short counselling session to pick the right course.</li>
                  <li>3. Batch allotment and joining date confirmation.</li>
                </ol>
              </CardContent>
            </Card>
            <Card className="shadow-card">
              <CardContent className="p-6">
                <h2 className="font-display text-base font-bold">Required documents</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                  <li>Xerox of Ration Card/Income Certificate</li>
                  <li>Original SSC</li>
                  <li>Xerox of all documents</li>
                  <li>Xerox of Caste Certificates</li>
                  <li>Aadhar Card / Voter ID</li>
                  <li>Passport size photo</li>
                  <li>Amount deposited</li>
                </ul>
              </CardContent>
            </Card>
          </aside>
        </div>
      </Section>
    </>
  );
}
