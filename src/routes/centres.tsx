import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Building2,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Navigation,
  Phone,
  Sparkles,
  X,
  GraduationCap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ORG } from "@/data/kitc";

export const Route = createFileRoute("/centres")({
  head: () => ({
    meta: [
      { title: "Centres — Kakatheeya Industrial Training Centre" },
      {
        name: "description",
        content:
          "KITC training centres and state-wide skilling locations across Telangana (Medchal & Alwal) and expansion networks across India.",
      },
      { property: "og:title", content: "Centres — Kakatheeya Industrial Training Centre" },
      {
        property: "og:description",
        content:
          "Explore KITC vocational and industrial training centres, addresses, batch details and regional presence.",
      },
    ],
  }),
  component: CentresPage,
});

interface CentreLocation {
  name: string;
  address: string;
  phone: string;
  timings: string;
  mapQuery: string;
  courses: string[];
}

interface StateCard {
  id: string;
  name: string;
  image: string;
  status: "active" | "expansion" | "outreach";
  badge: string;
  subtitle: string;
  centres?: CentreLocation[];
}

const STATE_CENTRES: StateCard[] = [
  {
    id: "gujarat",
    name: "GUJARAT",
    image: "/images/centres/gujarat.jpg",
    status: "expansion",
    badge: "Expansion Network",
    subtitle: "Vocational Placement & CSR Outreach Hub",
  },
  {
    id: "nagaland",
    name: "NAGALAND",
    image: "/images/centres/nagaland.jpg",
    status: "outreach",
    badge: "Outreach & Community",
    subtitle: "Youth Skill Exchange & Community Drive",
  },
  {
    id: "andhra-pradesh",
    name: "ANDHRA PRADESH",
    image: "/images/centres/andhra-pradesh.jpg",
    status: "expansion",
    badge: "Expansion Network",
    subtitle: "Skill Partner Hub & Industrial Placements",
  },
  {
    id: "maharashtra",
    name: "MAHARASHTRA",
    image: "/images/centres/maharashtra.jpg",
    status: "expansion",
    badge: "Recruitment Network",
    subtitle: "Corporate Hiring & Industrial Placement Hub",
  },
  {
    id: "telangana",
    name: "TELANGANA",
    image: "/images/centres/telangana.jpg",
    status: "active",
    badge: "2 Active Centres",
    subtitle: "Operational Headquarters & Flagship Training Centers",
    centres: [
      {
        name: "Medchal Centre (HQ)",
        address:
          "House No. 2-23, MIGH-23, APHB Colony, Medchal Village, Medchal, K.V. Rangareddy, Telangana 501401",
        phone: "+91 99082 91309",
        timings: "Monday – Saturday: 9:00 AM – 6:00 PM",
        mapQuery: "APHB Colony, Medchal Village, Medchal, Rangareddy, Telangana 501401",
        courses: [
          "Free 35-Day Vocational Course",
          "Tally & GST Certified Training",
          "Basic & Advanced Computer Operations",
          "Spoken English & Communication Skills",
          "Diploma & B.Tech 6-Month Industrial Training",
        ],
      },
      {
        name: "Alwal Centre",
        address:
          "Plot No. 12 & 13, Near Old Alwal Cross Road / IGNOU Center, Lothukunta, Alwal, Secunderabad, Medchal-Malkajgiri District, Telangana 500010",
        phone: "+91 94904 40021",
        timings: "Monday – Saturday: 9:30 AM – 6:30 PM",
        mapQuery:
          "Plot No. 12 and 13, Near Old Alwal Cross Road, Lothukunta, Alwal, Secunderabad, Telangana 500010",
        courses: [
          "Free 35-Day Vocational Course",
          "Computer Lab & Digital Skills",
          "Banking, Accounts & Office Automation",
          "Life Skills & Career Personality Coaching",
          "Interview Prep & Placement Drives",
        ],
      },
    ],
  },
  {
    id: "delhi",
    name: "DELHI",
    image: "/images/centres/delhi.jpg",
    status: "expansion",
    badge: "Liaison & Policy",
    subtitle: "Government Skills Alliance & Policy Outreach",
  },
  {
    id: "karnataka",
    name: "KARNATAKA",
    image: "/images/centres/karnataka.jpg",
    status: "expansion",
    badge: "Employment Partner",
    subtitle: "IT & Tech Industry Placement Network",
  },
  {
    id: "tamil-nadu",
    name: "TAMIL NADU",
    image: "/images/centres/tamil-nadu.jpg",
    status: "expansion",
    badge: "Industrial Outreach",
    subtitle: "Manufacturing & Engineering Training Network",
  },
];

function CentresPage() {
  const [selectedState, setSelectedState] = useState<StateCard | null>(null);

  const openModal = (state: StateCard) => {
    setSelectedState(state);
  };

  const closeModal = () => {
    setSelectedState(null);
  };

  return (
    <div className="min-h-screen bg-[#faf6f0] dark:bg-background">
      {/* Hero Header matching reference design */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#7a1515] via-[#651010] to-[#500c0c] text-white py-14 sm:py-20 text-center shadow-lg">
        {/* Subtle background texture pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.15),_transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="container-page relative z-10 max-w-3xl mx-auto px-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-[#e8a040] uppercase border border-white/10 mb-3 shadow-sm">
            <Building2 className="h-3.5 w-3.5" /> KITC Network
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-md text-white">
            Centres
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/80 max-w-xl mx-auto font-medium">
            Explore our state-of-the-art training centres, operational headquarters in Telangana,
            and vocational placement networks.
          </p>
        </div>
      </section>

      {/* Main Centres Grid Section */}
      <section className="py-12 sm:py-16">
        <div className="container-page max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {STATE_CENTRES.map((state) => {
              const isActive = state.status === "active";

              return (
                <div
                  key={state.id}
                  onClick={() => openModal(state)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(state);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative cursor-pointer overflow-hidden rounded-[26px] bg-[#3e0707] dark:bg-[#250404] p-3.5 sm:p-4 shadow-xl border-2 border-[#5a0c0c]/80 transition-all duration-300 hover:shadow-2xl hover:border-[#8b1a1a] hover:-translate-y-1 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#8b1a1a]"
                >
                  {/* Outer Frame with inner image box */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-black">
                    <img
                      src={state.image}
                      alt={`${state.name} Centre`}
                      width={1000}
                      height={625}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />

                    {/* Dark gradient overlay for high contrast text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30 transition-colors duration-300 group-hover:from-black/75" />

                    {/* Top status tag */}
                    <div className="absolute top-3 right-3 z-10">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md border ${
                          isActive
                            ? "bg-emerald-600/90 text-white border-emerald-400/50"
                            : "bg-black/60 text-white/90 border-white/20"
                        }`}
                      >
                        {isActive && <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />}
                        {state.badge}
                      </span>
                    </div>

                    {/* Center Text with iconic vertical side lines exactly like reference image */}
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-4 py-2">
                        {/* Left Vertical Line */}
                        <span className="h-9 sm:h-12 w-[3px] sm:w-[3.5px] rounded-full bg-white/90 shadow-sm" />

                        {/* State Title */}
                        <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-widest text-white drop-shadow-md text-center">
                          {state.name}
                        </h2>

                        {/* Right Vertical Line */}
                        <span className="h-9 sm:h-12 w-[3px] sm:w-[3.5px] rounded-full bg-white/90 shadow-sm" />
                      </div>
                    </div>

                    {/* Bottom Subtitle / Click Hint */}
                    <div className="absolute bottom-3 inset-x-3 text-center">
                      <span className="text-[11px] font-medium text-white/80 group-hover:text-white transition-colors drop-shadow-sm">
                        {state.subtitle} • Click to view details
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Modal for Center Details */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedState.name} Details`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm select-none"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl overflow-hidden rounded-3xl bg-card border-2 border-border/80 shadow-2xl max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="relative overflow-hidden bg-gradient-to-r from-[#7a1515] to-[#500c0c] text-white p-6 sm:p-7">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#e8a040] border border-white/10 mb-1">
                      {selectedState.badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase tracking-wide text-white">
                      {selectedState.name}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-white/80 max-w-xl">
                  {selectedState.subtitle}
                </p>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
                {selectedState.centres && selectedState.centres.length > 0 ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-2 border-b border-border/70 pb-3">
                      <h4 className="font-display text-lg font-bold text-foreground flex items-center gap-2">
                        <Building2 className="h-5 w-5 text-primary" /> Active Training Centres in {selectedState.name}
                      </h4>
                      <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                        Admissions Open
                      </span>
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      {selectedState.centres.map((c, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col justify-between rounded-2xl border-2 border-border/80 p-5 bg-background shadow-sm hover:border-primary/50 transition-all"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h5 className="font-display text-base font-bold text-foreground flex items-center gap-1.5">
                                <MapPin className="h-4 w-4 text-primary shrink-0" /> {c.name}
                              </h5>
                            </div>

                            <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                              {c.address}
                            </p>

                            <div className="space-y-1.5 text-xs text-foreground mb-4">
                              <div className="flex items-center gap-1.5 font-semibold text-primary">
                                <Phone className="h-3.5 w-3.5 shrink-0" />
                                <a href={`tel:${c.phone}`} className="hover:underline">
                                  {c.phone}
                                </a>
                              </div>
                              <p className="text-muted-foreground text-[11px]">{c.timings}</p>
                            </div>

                            <div className="border-t border-border/60 pt-3">
                              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1">
                                <GraduationCap className="h-3.5 w-3.5 text-accent" /> Available Programmes
                              </p>
                              <ul className="space-y-1 text-xs text-muted-foreground">
                                {c.courses.map((course, cIdx) => (
                                  <li key={cIdx} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> {course}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                            <Button asChild size="sm" variant="outline" className="text-xs">
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <Navigation className="h-3 w-3 mr-1" /> Get Directions
                              </a>
                            </Button>
                            <Button asChild size="sm" className="text-xs">
                              <Link to="/register">Apply Now</Link>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6 sm:py-8 space-y-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm">
                      <Sparkles className="h-7 w-7" />
                    </div>
                    <div className="max-w-md mx-auto space-y-2">
                      <h4 className="font-display text-lg font-bold text-foreground">
                        {selectedState.name} Regional Presence
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        KITC conducts collaborative placement drives, CSR initiatives, and youth
                        empowerment activities in {selectedState.name}. Dedicated training center
                        facilities are under phased expansion.
                      </p>
                    </div>

                    <div className="pt-2 flex flex-wrap justify-center gap-3">
                      <Button asChild variant="outline" size="sm">
                        <Link to="/contact">Inquire for this State</Link>
                      </Button>
                      <Button asChild size="sm">
                        <Link to="/register">Register Online</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
