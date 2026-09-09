import { MessageCircle } from "lucide-react";

import { ORG } from "@/data/kitc";

export function WhatsAppFab() {
  return (
    <a
      href={ORG.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with KITC on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-brand-red px-4 py-3 text-sm font-semibold text-brand-red-foreground shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp us</span>
    </a>
  );
}
