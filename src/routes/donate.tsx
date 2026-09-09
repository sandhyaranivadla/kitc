import { createFileRoute } from "@tanstack/react-router";

import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate & CSR — Fund Free Skilling at KITC" },
      {
        name: "description",
        content:
          "Support KITC through CSR or individual giving. Scan the PhonePe QR code to donate instantly.",
      },
      { property: "og:title", content: "Donate & CSR — Fund Free Skilling at KITC" },
      { property: "og:description", content: "Scan the PhonePe QR code to donate instantly." },
    ],
  }),
  component: DonatePage,
});

function DonatePage() {
  return (
    <>
      <PageHero
        eyebrow="Donate & CSR"
        title="Keep the course free for the next batch"
        description="Every rupee goes into training, equipment and placement support for young people who cannot pay fees."
      />

      <Section>
        <div className="flex flex-col items-center justify-center py-8 gap-8">
          {/* PhonePe Logo */}
          <img
            src="/phonepe-logo.png"
            alt="PhonePe"
            className="h-14 w-auto object-contain"
          />

          {/* QR Code Card */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-8 shadow-lg">
            <p className="text-sm font-medium text-muted-foreground tracking-wide uppercase">
              Scan &amp; Pay Using PhonePe App
            </p>
            <img
              src="/phonepe-qr.png"
              alt="PhonePe QR Code — KITC Training Center"
              className="w-64 h-64 object-contain rounded-xl"
            />
            <p className="text-base font-semibold text-foreground">KITC Training Center</p>
          </div>

          <p className="max-w-sm text-center text-sm text-muted-foreground">
            Open the PhonePe app, tap <strong>Scan & Pay</strong>, and point your camera at the QR
            code above to donate securely.
          </p>
        </div>
      </Section>
    </>
  );
}
