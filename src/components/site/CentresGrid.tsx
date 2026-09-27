import { useState } from "react";
import { CheckCircle2, Clock, Compass, ExternalLink, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CENTERS, ORG } from "@/data/kitc";

export interface StateInfo {
  id: string;
  name: string;
  image: string;
  hasActiveCentres: boolean;
  activeCount?: number;
  landmark: string;
  description: string;
}

export const STATES_DATA: StateInfo[] = [
  {
    id: "gujarat",
    name: "Gujarat",
    image: "/images/centres/gujarat.jpg",
    hasActiveCentres: false,
    landmark: "Sun Temple, Modhera / Somnath",
    description: "Regional vocational skilling initiative and industry apprenticeship hub.",
  },
  {
    id: "nagaland",
    name: "Nagaland",
    image: "/images/centres/nagaland.jpg",
    hasActiveCentres: false,
    landmark: "Hills of Nagaland Heritage Gate",
    description: "Community empowerment outreach and tribal youth development partnerships.",
  },
  {
    id: "andhra-pradesh",
    name: "Andhra Pradesh",
    image: "/images/centres/andhra-pradesh.jpg",
    hasActiveCentres: false,
    landmark: "Dhyana Buddha Statue, Amaravati",
    description: "Vijayawada & Visakhapatnam regional training and placement network.",
  },
  {
    id: "maharashtra",
    name: "Maharashtra",
    image: "/images/centres/maharashtra.jpg",
    hasActiveCentres: false,
    landmark: "Gateway of India, Mumbai",
    description: "Corporate hiring partners, CSR initiatives, and industrial placement links.",
  },
  {
    id: "telangana",
    name: "Telangana",
    image: "/images/centres/telangana.jpg",
    hasActiveCentres: true,
    activeCount: 2,
    landmark: "Buddha Statue, Hussain Sagar, Hyderabad",
    description: "Our primary operational headquarters with 2 full-fledged training centres in Medchal and Alwal.",
  },
  {
    id: "delhi",
    name: "Delhi",
    image: "/images/centres/delhi.jpg",
    hasActiveCentres: false,
    landmark: "India Gate, New Delhi",
    description: "National policy coordination, donor relations, and corporate CSR connect.",
  },
  {
    id: "karnataka",
    name: "Karnataka",
    image: "/images/centres/karnataka.jpg",
    hasActiveCentres: false,
    landmark: "Stone Chariot, Hampi",
    description: "Technology placement linkages, electronics, and technical skills outreach.",
  },
  {
    id: "tamil-nadu",
    name: "Tamil Nadu",
    image: "/images/centres/tamil-nadu.jpg",
    hasActiveCentres: false,
    landmark: "Adiyogi Shiva, Coimbatore",
    description: "Automobile & manufacturing sector apprentice partnerships.",
  },
];

interface CentresGridProps {
  showTitle?: boolean;
  initialState?: string;
  className?: string;
}

export function CentresGrid({ showTitle = true, initialState = "telangana", className = "" }: CentresGridProps) {
  const [selectedStateId, setSelectedStateId] = useState<string>(initialState);

  const selectedState = STATES_DATA.find((s) => s.id === selectedStateId) || STATES_DATA[4];

  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#8b1a1a]/10 border border-[#8b1a1a]/20 px-3.5 py-1 text-xs font-bold text-[#8b1a1a] mb-3">
            <MapPin className="h-3.5 w-3.5 text-[#e8a040]" />
            <span>Pan-India Presence &amp; Active Hubs</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-foreground">
            Our Centres &amp; Locations
          </h2>
          <p className="mt-2 text-sm sm:text-base text-muted-foreground">
            Click on any state below to view our active training centres, full addresses, contact desks, and directions.
          </p>
        </div>
      )}

      {/* Reference Image Grid: 8 State Cards in 2 Columns on Mobile / 2-4 Columns on Desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
        {STATES_DATA.map((state) => {
          const isSelected = selectedStateId === state.id;

          return (
            <div
              key={state.id}
              onClick={() => setSelectedStateId(state.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedStateId(state.id);
                }
              }}
              role="button"
              tabIndex={0}
              id={`centre-state-${state.id}`}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl bg-[#380b0b] dark:bg-[#270707] p-3 sm:p-4 transition-all duration-300 ${
                isSelected
                  ? "ring-4 ring-[#e8a040] shadow-2xl scale-[1.02] border-2 border-[#e8a040]"
                  : "border-2 border-[#4d1010] hover:border-[#8b1a1a] hover:scale-[1.01] hover:shadow-xl"
              }`}
              aria-label={`View centres in ${state.name}`}
            >
              {/* Inner Landmark Image Box */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden rounded-xl sm:rounded-2xl bg-black">
                <img
                  src={state.image}
                  alt={`${state.name} - ${state.landmark}`}
                  loading="lazy"
                  width={600}
                  height={375}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/50 transition-opacity duration-300 group-hover:opacity-85" />

                {/* Active Centers Badge */}
                {state.hasActiveCentres && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600/90 text-white font-bold text-[10px] sm:text-xs px-2.5 py-1 backdrop-blur-md shadow-md border border-white/20">
                      <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                      {state.activeCount} Active Centres
                    </span>
                  </div>
                )}

                {!state.hasActiveCentres && (
                  <div className="absolute top-2.5 right-2.5 z-10">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/50 text-white/80 text-[10px] px-2 py-0.5 backdrop-blur-md border border-white/10">
                      Expansion Hub
                    </span>
                  </div>
                )}

                {/* Iconic Centered Title with Vertical Accent Lines (Exact Reference Style) */}
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                    <span className="h-5 sm:h-7 w-[2.5px] bg-white rounded-full opacity-90 shadow-sm" />
                    <span className="font-display font-black tracking-widest text-white text-base sm:text-lg md:text-xl uppercase drop-shadow-md text-center">
                      {state.name}
                    </span>
                    <span className="h-5 sm:h-7 w-[2.5px] bg-white rounded-full opacity-90 shadow-sm" />
                  </div>
                </div>

                {/* Landmark Subtitle at Bottom */}
                <div className="absolute bottom-2.5 inset-x-3 text-center">
                  <p className="text-[11px] font-medium text-white/80 line-clamp-1 drop-shadow">
                    {state.landmark}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Detail Drawer for the Selected State */}
      <div className="mt-8 sm:mt-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedState.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {selectedState.hasActiveCentres ? (
              /* TELANGANA ACTIVE CENTRES SECTION */
              <div className="overflow-hidden rounded-3xl border-2 border-[#8b1a1a]/40 bg-card p-6 sm:p-8 shadow-2xl ring-1 ring-black/5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/80 pb-6 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-2">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Active Training Centres
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                      Telangana Centres (Medchal &amp; Alwal)
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Both centres are fully operational with modern computer labs, classrooms, and placement desks.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button asChild size="sm" className="bg-[#8b1a1a] hover:bg-[#6e1313] text-white font-semibold shadow">
                      <Link to="/register">
                        <Sparkles className="h-3.5 w-3.5 mr-1 text-[#e8a040]" /> Apply for a Batch
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Both Centres Side-by-Side */}
                <div className="grid gap-6 md:grid-cols-2">
                  {CENTERS.map((c) => (
                    <Card
                      key={c.id}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-border/90 bg-muted/20 p-5 shadow-sm transition-all duration-300 hover:border-[#8b1a1a] hover:shadow-lg"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between gap-2 border-b border-border/60 pb-3">
                          <h4 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
                            <MapPin className="h-5 w-5 text-[#8b1a1a] shrink-0" />
                            {c.name}
                          </h4>
                          <span className="rounded-full bg-[#8b1a1a]/10 px-2.5 py-0.5 text-[11px] font-bold uppercase text-[#8b1a1a]">
                            Hyderabad, TS
                          </span>
                        </div>

                        {/* Full Address */}
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Full Address:
                          </p>
                          <p className="mt-1 text-xs sm:text-sm leading-relaxed text-foreground font-medium">
                            {c.address}
                          </p>
                        </div>

                        {/* Timings & Helpline */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-xs">
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Clock className="h-3.5 w-3.5 text-[#e8a040]" />
                            <span>Mon - Sat: 9 AM - 6 PM</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                            <span>100% Free Training</span>
                          </div>
                        </div>

                        {/* Quick Contact Buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <a
                            href="tel:+919908291309"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-background border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary hover:text-white transition-colors"
                          >
                            <Phone className="h-3 w-3 text-[#e8a040]" /> +91 99082 91309
                          </a>
                          <a
                            href="tel:+919490440021"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-background border border-border px-3 py-1.5 text-xs font-semibold text-foreground hover:bg-primary hover:text-white transition-colors"
                          >
                            <Phone className="h-3 w-3 text-[#e8a040]" /> +91 94904 40021
                          </a>
                        </div>
                      </div>

                      {/* Interactive Google Map Embed */}
                      <div className="mt-4 pt-3 border-t border-border/60">
                        <iframe
                          title={`Map of ${c.name}`}
                          src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`}
                          loading="lazy"
                          className="h-44 w-full border-0 rounded-xl shadow-inner"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                        <div className="mt-2.5 flex items-center justify-between">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8b1a1a] hover:underline"
                          >
                            <Compass className="h-3.5 w-3.5" /> Open in Google Maps
                            <ExternalLink className="h-3 w-3" />
                          </a>
                          <a
                            href={ORG.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:underline"
                          >
                            <MessageCircle className="h-3.5 w-3.5" /> WhatsApp Directions
                          </a>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              /* OTHER EXPANSION STATES INFO CARD */
              <div className="overflow-hidden rounded-3xl border-2 border-border/80 bg-card p-6 sm:p-8 shadow-xl text-center max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#e8a040]/15 border border-[#e8a040]/30 px-3.5 py-1 text-xs font-bold text-[#b8761e] mb-3">
                  <Compass className="h-3.5 w-3.5" /> Expansion &amp; Outreach Initiative
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {selectedState.name} Hub
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {selectedState.description}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  Landmark reference: <strong className="text-foreground">{selectedState.landmark}</strong>
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <Button asChild className="bg-[#8b1a1a] hover:bg-[#6e1313] text-white">
                    <a href={ORG.whatsapp} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-4 w-4 mr-1.5" /> Inquire About {selectedState.name}
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedStateId("telangana")}
                  >
                    View Active Telangana Centres
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
