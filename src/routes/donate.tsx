import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Armchair,
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Gift,
  HeartHandshake,
  Mail,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  School,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero, Section } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CENTERS, DONATION_ITEMS, type DonationItem, ORG } from "@/data/kitc";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Support Us & CSR — In-Kind Donations & Giving | KITC" },
      {
        name: "description",
        content:
          "Support KITC through CSR and in-kind donations: Notebooks, Benches, Bags, Chairs, or Monetary donations via PhonePe UPI. Help empower underprivileged youth in Hyderabad.",
      },
      { property: "og:title", content: "Support Us & CSR — In-Kind Donations & Giving | KITC" },
      {
        property: "og:description",
        content:
          "We accept all types of donations: Notebooks, Classroom Benches, School Bags, Study Chairs, and educational equipment. Tax-exempted under 80G.",
      },
    ],
  }),
  component: DonatePage,
});

export function DonatePage() {
  const [selectedItem, setSelectedItem] = useState<DonationItem | null>(null);
  const [pledgeSubmitted, setPledgeSubmitted] = useState(false);
  const [pledgeForm, setPledgeForm] = useState({
    donorName: "",
    phone: "",
    email: "",
    org: "",
    quantity: "",
    preferredCenter: "Medchal Centre",
    notes: "",
  });

  const handleOpenPledge = (item: DonationItem) => {
    setSelectedItem(item);
    setPledgeSubmitted(false);
  };

  const handlePledgeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pledgeForm.donorName || !pledgeForm.phone) {
      toast.error("Please enter your name and phone number.");
      return;
    }
    setPledgeSubmitted(true);
    toast.success("Thank you for your generous pledge!");
  };

  return (
    <>
      <PageHero
        eyebrow="Support Us &amp; CSR"
        title="We Welcome Any Type of Donations"
        description="Every donation directly uplifts aspiring students. Whether you contribute study materials, classroom benches, school bags, computer chairs, or monetary funds, your support creates tangible impact."
      >
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold shadow-md">
            <a href="#in-kind-donations">
              <Gift className="mr-2 h-4 w-4" /> Explore In-Kind Donations
            </a>
          </Button>
          <Button asChild size="lg" className="border-2 border-white/80 bg-transparent text-white hover:bg-white hover:text-primary font-semibold shadow-sm">
            <a href="#monetary-donation">
              <Sparkles className="mr-2 h-4 w-4" /> Scan &amp; Donate Online
            </a>
          </Button>
        </div>
      </PageHero>

      {/* IN-KIND DONATIONS SHOWCASE */}
      <section id="in-kind-donations" className="scroll-mt-20 py-12 md:py-16">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
              <Package className="h-3.5 w-3.5" /> Direct Classroom Impact
            </div>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              Accepting Any Type of Donations
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              You can support our training centres in Medchal and Alwal with essential materials.
              Choose an item category below to pledge supplies or coordinate delivery with our CSR team.
            </p>
          </div>

          {/* 4 Cards Grid with Animations */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DONATION_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="flex flex-col"
              >
                <Card className="flex h-full flex-col overflow-hidden border border-border/80 bg-card shadow-sm transition-shadow duration-300 hover:shadow-xl">
                  {/* Item Image with Overlay Badge */}
                  <div className="relative h-48 w-full overflow-hidden bg-muted">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge variant="secondary" className="bg-background/90 text-foreground backdrop-blur text-[10px] font-bold">
                        {item.badge}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-primary">
                      {item.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                      {item.description}
                    </p>

                    <div className="mt-4 rounded-lg bg-secondary/50 p-3 text-xs border border-border/50">
                      <p className="font-semibold text-foreground flex items-center gap-1.5">
                        <Sparkles className="h-3.5 w-3.5 text-primary shrink-0" />
                        Impact:
                      </p>
                      <p className="mt-1 text-muted-foreground text-[11px] leading-normal">
                        {item.impact}
                      </p>
                      <p className="mt-2 pt-2 border-t border-border/60 text-[11px] font-medium text-foreground">
                        Suggested: <span className="text-primary font-semibold">{item.suggestedQty}</span>
                      </p>
                    </div>

                    <Button
                      onClick={() => handleOpenPledge(item)}
                      className="mt-5 w-full font-semibold shadow-sm"
                      size="sm"
                    >
                      <Gift className="mr-1.5 h-3.5 w-3.5" /> Pledge {item.title.split(" ")[0]}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* More Ways to Donate In-Kind Notice */}
          <div className="mt-10 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <School className="h-5 w-5 text-primary" />
                  <h3 className="font-display text-base font-bold text-foreground sm:text-lg">
                    Have other equipment or materials to donate?
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground sm:text-sm max-w-2xl">
                  We eagerly welcome <strong>desktop computers, laptops, projectors, whiteboards, water dispensers, library books, and electronics kits</strong> for our student training labs.
                </p>
              </div>
              <Button asChild className="shrink-0 font-semibold" size="default">
                <a href={`tel:${ORG.phone.replace(/\s/g, "")}`}>
                  <Phone className="mr-2 h-4 w-4" /> Call {ORG.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MONETARY DONATION / PHONEPE SCAN & CSR SECTION */}
      <div id="monetary-donation" className="bg-secondary/40 border-t border-border py-12 md:py-16 scroll-mt-20">
        <Section
          eyebrow="Monetary Support"
          title="Direct Contribution via UPI / PhonePe"
          description="Every rupee received is applied towards training kits, faculty stipends, computer lab hardware, and free education for candidates from economically disadvantaged backgrounds."
        >
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            {/* PhonePe QR Code Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-xl text-center"
            >
              <img
                src="/phonepe-logo.png"
                alt="PhonePe"
                className="h-12 w-auto object-contain"
              />

              <p className="mt-4 text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                Scan &amp; Pay Instant Donation
              </p>

              <div className="relative mt-4 overflow-hidden rounded-2xl border-4 border-primary/20 bg-white p-3 shadow-inner">
                <img
                  src="/phonepe-qr.png"
                  alt="PhonePe QR Code — KITC Training Center"
                  className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl"
                />
              </div>

              <h4 className="mt-4 text-lg font-bold text-foreground">KITC Training Center</h4>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs">
                Open PhonePe, Google Pay, or any UPI app, tap <strong>Scan &amp; Pay</strong>, and scan the QR code to contribute.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" /> 80G Tax Exemption Eligible
              </div>
            </motion.div>

            {/* CSR & Corporate Giving Details */}
            <div className="space-y-6">
              <Card className="border border-border shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        Corporate CSR Partnerships
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        CIN: {ORG.cin} · Section 8 Registered NGO
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    KITC collaborates with corporate CSR wings, foundations, and industry associations to run sponsored training batches, computer lab upgrades, and hiring drives.
                  </p>

                  <ul className="mt-4 space-y-2 text-xs text-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      Audited financials &amp; CSR Form 1 compliance
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      Official 80G and 12A tax exemption certificates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      Periodic student progress &amp; placement reporting
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Direct CSR Helpdesk */}
              <Card className="border border-border/80 bg-muted/20">
                <CardContent className="p-6">
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
                    Dedicated Donation &amp; CSR Helpline
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Connect directly with our leadership team for CSR documentation, receipt dispatch, or bulk material logistics:
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Button asChild size="default" className="font-semibold">
                      <a href={`tel:${ORG.phone.replace(/\s/g, "")}`}>
                        <Phone className="mr-2 h-4 w-4" /> Call {ORG.phone}
                      </a>
                    </Button>
                    <Button asChild size="default" variant="outline">
                      <a href={ORG.whatsapp} target="_blank" rel="noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4 text-emerald-600" /> WhatsApp CSR Desk
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Section>
      </div>

      {/* PLEDGE DIALOG MODAL */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-lg">
              <Gift className="h-5 w-5 text-primary" /> Pledge Donation: {selectedItem?.title}
            </DialogTitle>
            <DialogDescription className="text-xs">
              Thank you for contributing! Fill in your details and our team will coordinate the drop-off or pickup.
            </DialogDescription>
          </DialogHeader>

          {pledgeSubmitted ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Pledge Received!
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Thank you, <strong>{pledgeForm.donorName}</strong>. Our coordinator will call you at{" "}
                <strong>{pledgeForm.phone}</strong> to confirm the delivery or pickup details for {selectedItem?.title}.
              </p>
              <div className="pt-3 flex justify-center gap-3">
                <Button onClick={() => setSelectedItem(null)} variant="outline" size="sm">
                  Close
                </Button>
                <Button asChild size="sm">
                  <a href={`tel:${ORG.phone.replace(/\s/g, "")}`}>
                    <Phone className="mr-1.5 h-3.5 w-3.5" /> Call {ORG.phone}
                  </a>
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePledgeSubmit} className="space-y-4 mt-2">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="donorName" className="text-xs">Full Name *</Label>
                  <Input
                    id="donorName"
                    required
                    placeholder="Your name"
                    value={pledgeForm.donorName}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, donorName: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-xs">Mobile Number *</Label>
                  <Input
                    id="phone"
                    required
                    type="tel"
                    placeholder="10-digit mobile"
                    value={pledgeForm.phone}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="quantity" className="text-xs">Pledged Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder={`e.g. ${selectedItem?.suggestedQty.split(",")[0] || "10 units"}`}
                    value={pledgeForm.quantity}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, quantity: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="org" className="text-xs">Organisation (Optional)</Label>
                  <Input
                    id="org"
                    placeholder="Company / Trust"
                    value={pledgeForm.org}
                    onChange={(e) => setPledgeForm({ ...pledgeForm, org: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="center" className="text-xs">Preferred Delivery / Centre</Label>
                <Select
                  value={pledgeForm.preferredCenter}
                  onValueChange={(val) => setPledgeForm({ ...pledgeForm, preferredCenter: val })}
                >
                  <SelectTrigger id="center">
                    <SelectValue placeholder="Select drop-off mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Medchal Centre">Drop-off at Medchal Centre</SelectItem>
                    <SelectItem value="Alwal Centre">Drop-off at Alwal Centre</SelectItem>
                    <SelectItem value="Pickup Required">Request Doorstep Pickup in Hyderabad</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="notes" className="text-xs">Additional Notes</Label>
                <Textarea
                  id="notes"
                  rows={2}
                  placeholder="Item specifications, preferred date/time..."
                  value={pledgeForm.notes}
                  onChange={(e) => setPledgeForm({ ...pledgeForm, notes: e.target.value })}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" size="sm" onClick={() => setSelectedItem(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="font-semibold">
                  Confirm Pledge
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
