import { Link } from "@tanstack/react-router";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-white/10" style={{ background: 'linear-gradient(90deg, #5a0a0a 0%, #8b1a1a 50%, #6b1010 100%)' }}>
      <div className="container-page flex h-16 items-center justify-between gap-4">
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
            <SheetContent side="right" className="w-full sm:max-w-md bg-[#FFF8E7] p-0 border-none [&>button]:hidden flex flex-col">
              <div className="flex items-center justify-between p-4 pb-2 border-b-2 border-[#8b2315]/10">
                <KitcLogo />
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
                      <Phone className="h-4 w-4" /> Call the centre
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
