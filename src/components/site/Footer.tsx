import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

import { CENTERS, ORG } from "@/data/kitc";
import { KitcLogo } from "@/components/site/KitcLogo";

export function Footer({ onOpenFeedback }: { onOpenFeedback?: () => void } = {}) {
  return (
    <footer className="mt-10 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-6 py-6 md:grid-cols-4 md:py-7">
        {/* Column 1: Logo & Info */}
        <div className="flex flex-col items-start">
          <div className="inline-block rounded-xl bg-white p-2 shadow-sm mb-3">
            <KitcLogo variant="footer" imgClassName="h-8 w-auto" />
          </div>
          <p className="text-[12px] font-bold text-[#e8a040] leading-tight">{ORG.legalName}</p>
          <p className="mt-1 text-[11px] opacity-75 leading-normal max-w-[220px]">{ORG.tagline}</p>
          <dl className="mt-2.5 space-y-0.5 text-[10px]">
            <div className="flex gap-2">
              <dt className="text-white/70">CIN</dt>
              <dd className="font-mono text-[#e8a040] font-bold">{ORG.cin}</dd>
            </div>
            <div className="flex gap-2 text-white/70">
              <dt>Registered</dt>
              <dd>{ORG.registered}</dd>
            </div>
          </dl>
        </div>

        {/* Column 2: Explore */}
        <div>
          <h3 className="font-display text-[11px] font-bold uppercase tracking-wider opacity-85">Explore</h3>
          <ul className="mt-2 space-y-1 text-[11px]">
            <li><Link to="/centres" className="opacity-80 hover:opacity-100 hover:underline font-semibold text-[#e8a040]">★ Centres</Link></li>
            <li><Link to="/programs" className="opacity-80 hover:opacity-100 hover:underline">Programmes</Link></li>
            <li><Link to="/youth-empowerment" className="opacity-80 hover:opacity-100 hover:underline">Youth Empowerment</Link></li>
            <li><Link to="/gallery" className="opacity-80 hover:opacity-100 hover:underline">Gallery</Link></li>
            <li><Link to="/register" className="opacity-80 hover:opacity-100 hover:underline">Candidate Registration</Link></li>
            <li><Link to="/donate" className="opacity-80 hover:opacity-100 hover:underline">Donate / CSR</Link></li>
            <li><Link to="/hire" className="opacity-80 hover:opacity-100 hover:underline">Hire From Us</Link></li>
            {onOpenFeedback && (
              <li>
                <button
                  type="button"
                  onClick={onOpenFeedback}
                  className="opacity-80 hover:opacity-100 hover:underline text-left cursor-pointer text-[#fbc531] font-semibold"
                >
                  ★ Student Feedback
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Column 3: Our Centres */}
        <div>
          <h3 className="font-display text-[11px] font-bold uppercase tracking-wider opacity-85 flex items-center justify-between">
            <span>Our centres</span>
            <Link to="/centres" className="text-[10px] text-[#e8a040] hover:underline font-semibold">View All &rarr;</Link>
          </h3>
          <ul className="mt-2 space-y-2 text-[11px]">
            {CENTERS.map((c) => (
              <li key={c.id} className="flex gap-2 opacity-80">
                <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-accent" />
                <span>
                  <strong className="block font-semibold text-white">{c.name}</strong>
                  <span className="text-[10px] leading-tight block mt-0.5">{c.address}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact & Socials */}
        <div>
          <h3 className="font-display text-[11px] font-bold uppercase tracking-wider opacity-85">Contact us</h3>
          <div className="mt-2 space-y-2 text-[11px]">
            <a href={`tel:${ORG.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 opacity-85 hover:opacity-100 hover:underline">
              <Phone className="h-3 w-3 text-accent shrink-0" /> {ORG.phone}
            </a>
            <a href={`tel:${ORG.secondaryPhone.replace(/\s/g, "")}`} className="flex items-center gap-2 opacity-85 hover:opacity-100 hover:underline">
              <Phone className="h-3 w-3 text-accent shrink-0" /> {ORG.secondaryPhone}
            </a>
            <a href={`mailto:${ORG.email}`} className="flex items-center gap-2 opacity-85 hover:opacity-100 hover:underline break-all">
              <Mail className="h-3 w-3 text-accent shrink-0" /> {ORG.email}
            </a>
            <a href={ORG.instagram} target="_blank" rel="noreferrer" className="flex items-center gap-2 opacity-85 hover:opacity-100 hover:underline">
              <Instagram className="h-3 w-3 text-accent shrink-0" /> Instagram
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-primary-foreground/10 bg-primary/40">
        <div className="container-page flex flex-col gap-1.5 py-2.5 text-[10px] opacity-75 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © {new Date().getFullYear()} {ORG.legalName}. All rights reserved.</p>
          <div className="flex flex-col sm:items-end gap-0.5">
            <p>{ORG.entityType}</p>
            <p>Designed and maintained by <strong className="font-semibold text-white opacity-90">Forge Digital Technologies</strong></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
