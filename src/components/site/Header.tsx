import { Link } from "@tanstack/react-router";
import { Mail, Menu, MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { KitcLogo } from "@/components/site/KitcLogo";
import { ORG } from "@/data/kitc";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/programs", label: "Our Programs" },
  { to: "/youth-empowerment", label: "Youth Empowerment" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About Us" },
  { to: "/hire", label: "Hire From Us" },
  { to: "/contact", label: "Contact us" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 shadow-md">
      {/* Top Utility Taskbar */}
      <div className="bg-[#3e0707] text-white/90 text-xs py-1.5 px-3 border-b border-white/10">
        <div className="container-page flex flex-wrap items-center justify-between gap-2 text-[11px] font-medium">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5 text-white/90">
              <Phone className="h-3 w-3 text-[#e8a040] shrink-0" />
              <a href="tel:+919908291309" className="hover:text-white transition-colors">
                +91 99082 91309
              </a>
              <span className="opacity-40">|</span>
              <a href="tel:+919490440021" className="hover:text-white transition-colors">
                +91 94904 40021
              </a>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 text-white/80">
              <Mail className="h-3 w-3 text-[#e8a040] shrink-0" />
              <a href={`mailto:${ORG.email}`} className="hover:text-white transition-colors">
                {ORG.email}
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="hidden md:inline text-white/75">
              Centres: <strong className="text-white font-semibold">Medchal & Alwal</strong> (Telangana)
            </span>
            <a
              href={ORG.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded bg-[#25D366]/20 px-2 py-0.5 text-[#25D366] hover:bg-[#25D366] hover:text-white transition-all font-semibold"
            >
              <MessageCircle className="h-3 w-3" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="container-page flex h-16 items-center justify-between gap-4" style={{ background: 'linear-gradient(90deg, #5a0a0a 0%, #8b1a1a 50%, #6b1010 100%)' }}>
        <KitcLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-md px-2.5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              activeProps={{ className: "text-[#e8a040] bg-white/10 font-semibold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex border-white/40 text-white bg-white/10 hover:bg-white/20 hover:text-white">
            <Link to="/donate">Donate</Link>
          </Button>
          <Button asChild size="sm" className="bg-[#e8a040] text-[#5a0a0a] font-bold hover:bg-[#d4903a]">
            <Link to="/register">Apply now</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-white hover:bg-white/10" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full bg-[#FFF8E7] p-0 border-b-4 border-[#8b2315] shadow-2xl max-h-[85vh] overflow-y-auto [&>button]:hidden flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2 border-b-2 border-[#8b2315]/10">
                <KitcLogo variant="mobile" />
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" className="bg-[#d32f2f] hover:bg-[#b71c1c] text-white rounded-md h-10 w-10 ml-auto flex-shrink-0">
                    <X className="h-6 w-6" />
                  </Button>
                </SheetClose>
              </div>
              <SheetTitle className="sr-only">Menu</SheetTitle>
              
              <div className="flex-1 overflow-y-auto w-full">
                <nav className="flex flex-col text-center text-[#8b2315] font-medium text-lg">
                  <Link
                    to="/about"
                    onClick={() => setOpen(false)}
                    className="py-4 border-b border-[#8b2315]/20 hover:bg-[#8b2315]/5"
                  >
                    About
                  </Link>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="program" className="border-b border-[#8b2315]/20">
                      <AccordionTrigger className="py-4 text-[#8b2315] hover:no-underline hover:bg-[#8b2315]/5 relative justify-center [&>svg]:absolute [&>svg]:right-6 text-lg">
                        Program
                      </AccordionTrigger>
                      <AccordionContent className="bg-[#fb923c] p-0 flex flex-col text-[#8b2315] text-base font-semibold">
                        <Link to="/programs" onClick={() => setOpen(false)} className="py-4 hover:bg-black/5">All Programs</Link>
                        <Link to="/youth-empowerment" onClick={() => setOpen(false)} className="py-4 hover:bg-black/5">Youth Empowerment</Link>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="hire" className="border-b border-[#8b2315]/20">
                      <AccordionTrigger className="py-4 text-[#8b2315] hover:no-underline hover:bg-[#8b2315]/5 relative justify-center [&>svg]:absolute [&>svg]:right-6 text-lg">
                        Hire Our Youth
                      </AccordionTrigger>
                      <AccordionContent className="bg-[#fb923c] p-0 flex flex-col text-[#8b2315] text-base font-semibold">
                        <Link to="/hire" onClick={() => setOpen(false)} className="py-4 hover:bg-black/5">Partner with Us</Link>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="py-4 border-b border-[#8b2315]/20 hover:bg-[#8b2315]/5"
                  >
                    Get Involved
                  </Link>
                  <Link
                    to="/gallery"
                    onClick={() => setOpen(false)}
                    className="py-4 border-b border-[#8b2315]/20 hover:bg-[#8b2315]/5"
                  >
                    Gallery
                  </Link>
                  <Link
                    to="/donate"
                    onClick={() => setOpen(false)}
                    className="py-4 border-b border-[#8b2315]/20 hover:bg-[#8b2315]/5"
                  >
                    Donate
                  </Link>
                  
                  <div className="p-6 mt-4 flex flex-col gap-3">
                    <a
                      href={`tel:${ORG.phone.replace(/\s/g, "")}`}
                      className="flex justify-center items-center gap-2 rounded-md bg-[#8b2315] text-white px-4 py-3 text-base font-medium transition-colors hover:bg-[#6b1b10]"
                    >
                      <Phone className="h-4 w-4" /> Call: {ORG.phone}
                    </a>
                    <a
                      href={`tel:${ORG.secondaryPhone.replace(/\s/g, "")}`}
                      className="flex justify-center items-center gap-2 rounded-md bg-[#5a0a0a] text-white px-4 py-3 text-base font-medium transition-colors hover:bg-[#420606]"
                    >
                      <Phone className="h-4 w-4" /> Call: {ORG.secondaryPhone}
                    </a>
                    <a
                      href={`mailto:${ORG.email}`}
                      className="flex justify-center items-center gap-2 rounded-md border border-[#8b2315]/40 bg-white text-[#8b2315] px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-[#8b2315]/5"
                    >
                      <Mail className="h-4 w-4" /> {ORG.email}
                    </a>
                    <a
                      href={ORG.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="flex justify-center items-center gap-2 rounded-md bg-[#25D366] text-white px-4 py-3 text-base font-medium transition-colors hover:bg-[#128C7E]"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp us
                    </a>
                  </div>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
