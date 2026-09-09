import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, MapPin } from "lucide-react";
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
import { CENTERS } from "@/data/kitc";
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

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to our team"
        description="Walk in to either centre, or send a message and we'll call you back."
      />

      <Section>
        <div className="mx-auto max-w-4xl flex flex-col gap-8">
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

          {/* Unified Centers Maps Card */}
          <Card className="overflow-hidden shadow-card w-full">
            <CardContent className="p-6 md:p-8">
              <h2 className="font-display text-lg font-bold mb-6 text-foreground text-center">
                Our Training Centres
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {CENTERS.map((c) => (
                  <div key={c.id} className="flex flex-col gap-4 border border-border rounded-xl p-4 bg-background/50">
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-base font-bold text-foreground">
                        <MapPin className="h-4 w-4 text-primary shrink-0" /> {c.name}
                      </h3>
                      <p className="mt-1.5 text-xs text-muted-foreground min-h-[40px]">{c.address}</p>
                    </div>
                    <iframe
                      title={`Map of ${c.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
                      loading="lazy"
                      className="h-48 w-full border-0 rounded-lg"
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
