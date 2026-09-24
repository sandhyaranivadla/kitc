import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { PageHero, Section } from "@/components/site/Section";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Life at KITC Training Centres" },
      {
        name: "description",
        content:
          "Photos from KITC classrooms, engineering workshops, community outreach and placement drives in Medchal and Alwal, Hyderabad.",
      },
      { property: "og:title", content: "Gallery — Life at KITC Training Centres" },
      { property: "og:description", content: "Classrooms, workshops, outreach and placement drives at KITC." },
    ],
  }),
  component: GalleryPage,
});

export type PhotoCategory = "all" | "classrooms" | "workshops" | "outreach" | "placements";

interface PhotoItem {
  id: number;
  src: string;
  alt: string;
  category: PhotoCategory;
  categoryLabel: string;
}

const PHOTOS: PhotoItem[] = [
  { id: 1, src: "/images/gallery/gallery_01.jpg", alt: "KITC placement drives & career sessions", category: "placements", categoryLabel: "Placements" },
  { id: 2, src: "/images/gallery/gallery_02.jpg", alt: "Students during vocational training batch", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 3, src: "/images/gallery/gallery_03.jpg", alt: "Interactive student group discussion", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 4, src: "/images/gallery/gallery_04.jpg", alt: "Hands-on classroom computer learning", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 5, src: "/images/gallery/gallery_05.jpg", alt: "Industrial & practical training laboratory", category: "workshops", categoryLabel: "Workshops" },
  { id: 6, src: "/images/gallery/gallery_06.jpg", alt: "Community outreach and awareness session", category: "outreach", categoryLabel: "Events" },
  { id: 7, src: "/images/gallery/gallery_07.jpg", alt: "Active classroom learning session", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 8, src: "/images/gallery/gallery_08.jpg", alt: "Trainees at KITC Medchal center", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 9, src: "/images/gallery/gallery_09.jpg", alt: "Faculty mentoring and classroom interaction", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 10, src: "/images/gallery/gallery_10.jpg", alt: "Skill development workshop in progress", category: "workshops", categoryLabel: "Workshops" },
  { id: 11, src: "/images/gallery/gallery_11.jpg", alt: "Youth empowerment and mindset session", category: "outreach", categoryLabel: "Events" },
  { id: 12, src: "/images/gallery/gallery_12.jpg", alt: "KITC training centre event and celebrations", category: "outreach", categoryLabel: "Events" },
  { id: 13, src: "/images/gallery/gallery_13.jpg", alt: "Community engagement & life skills program", category: "outreach", categoryLabel: "Events" },
  { id: 14, src: "/images/gallery/gallery_14.jpg", alt: "Technical skills training workshop", category: "workshops", categoryLabel: "Workshops" },
  { id: 17, src: "/images/gallery/gallery_17.jpg", alt: "Student activities & team collaboration", category: "workshops", categoryLabel: "Workshops" },
  { id: 18, src: "/images/gallery/gallery_18.jpg", alt: "Vocational course practical demonstration", category: "workshops", categoryLabel: "Workshops" },
  { id: 19, src: "/images/gallery/gallery_19.jpg", alt: "Youth empowerment gathering & activities", category: "outreach", categoryLabel: "Events" },
  { id: 20, src: "/images/gallery/gallery_20.jpg", alt: "Classroom lecture and interactive training", category: "classrooms", categoryLabel: "Classrooms" },
  { id: 21, src: "/images/gallery/gallery_21.jpg", alt: "Campus interview and recruitment drive", category: "placements", categoryLabel: "Placements" },
];

const CATEGORIES: { id: PhotoCategory; label: string }[] = [
  { id: "all", label: "All Photos" },
  { id: "classrooms", label: "Classrooms & Labs" },
  { id: "workshops", label: "Workshops & Skilling" },
  { id: "outreach", label: "Events & Community" },
  { id: "placements", label: "Placement Drives" },
];

function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<PhotoCategory>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered photos based on active category
  const filteredPhotos = useMemo(() => {
    if (activeCategory === "all") return PHOTOS;
    return PHOTOS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const openLightbox = (photoId: number) => {
    const idx = PHOTOS.findIndex((p) => p.id === photoId);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + PHOTOS.length) % PHOTOS.length));
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % PHOTOS.length));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  // Prevent scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      <PageHero
        eyebrow="KITC Moments"
        title="Inside our training centres"
        description="Classrooms, practical workshops, community drives and hiring events across Medchal and Alwal."
      />

      <Section className="py-6 sm:py-8">
        {/* Animated Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            const count = cat.id === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isActive
                    ? "text-white shadow-lg shadow-[#8b1a1a]/25"
                    : "text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted border border-border/80"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#8b1a1a] via-[#b92b27] to-[#0eb39e]"
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {cat.id === "all" && <Sparkles className="h-3.5 w-3.5" />}
                  {cat.label}
                  <span
                    className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-background text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated Photo Grid with layout transitions */}
        <motion.div layout className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, i) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 16 }}
                transition={{
                  duration: 0.35,
                  delay: (i % 8) * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div
                  onClick={() => openLightbox(photo.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLightbox(photo.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  id={`gallery-photo-${photo.id}`}
                  className="group relative block w-full cursor-pointer overflow-hidden rounded-2xl p-[2px] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#8b1a1a]/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8b1a1a]"
                  aria-label={`View photo: ${photo.alt}`}
                >
                  {/* Animated Gradient Border Aura */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#8b1a1a]/30 via-border to-[#0eb39e]/30 opacity-70 transition-all duration-500 group-hover:from-[#8b1a1a] group-hover:via-[#e8a040] group-hover:to-[#0eb39e] group-hover:opacity-100" />

                  {/* Inner Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-slate-900 gallery-shine-card">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading={i < 4 ? "eager" : "lazy"}
                      decoding="async"
                      width={800}
                      height={600}
                      className="gallery-thumbnail h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    />

                    {/* Category badge floating on top right */}
                    <div className="absolute right-2.5 top-2.5 z-10">
                      <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white/90 backdrop-blur-md border border-white/10 shadow-sm transition-transform duration-300 group-hover:scale-105">
                        {photo.categoryLabel}
                      </span>
                    </div>


                    {/* Bottom Caption Drawer Slide-Up */}
                    <div className="absolute inset-x-0 bottom-0 z-10 translate-y-full bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 text-left transition-transform duration-300 ease-out group-hover:translate-y-0">
                      <p className="line-clamp-2 text-xs font-medium text-white drop-shadow-sm">
                        {photo.alt}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Advanced Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && PHOTOS[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Photo lightbox"
            className="fixed inset-0 z-50 flex flex-col items-center justify-between p-4 sm:p-6 bg-black/95 backdrop-blur-md select-none"
          >
            {/* Top Bar with Title, Category, and Close Button */}
            <div className="relative z-20 flex w-full max-w-6xl items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-2.5">
                <span className="rounded-full bg-gradient-to-r from-[#8b1a1a] to-[#0eb39e] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                  {PHOTOS[lightboxIndex].categoryLabel}
                </span>
                <span className="text-sm font-medium text-white/80 hidden sm:inline truncate max-w-md">
                  {PHOTOS[lightboxIndex].alt}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm border border-white/10">
                  {lightboxIndex + 1} / {PHOTOS.length}
                </span>
                <button
                  type="button"
                  id="lightbox-close"
                  onClick={closeLightbox}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:bg-white/25 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/10"
                  aria-label="Close lightbox"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Center Area with Main Image and Navigation Buttons */}
            <div className="relative z-10 flex w-full max-w-6xl flex-1 items-center justify-center py-2">
              {/* Prev Button */}
              <button
                type="button"
                id="lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                className="absolute left-1 sm:left-4 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-200 hover:bg-[#8b1a1a] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/15 backdrop-blur-md shadow-xl"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>

              {/* Main Image with Animated Spring Transition */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={PHOTOS[lightboxIndex].id}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ type: "spring", damping: 28, stiffness: 350 }}
                  className="relative flex max-h-[72vh] sm:max-h-[75vh] max-w-5xl items-center justify-center overflow-hidden rounded-xl shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={PHOTOS[lightboxIndex].src}
                    alt={PHOTOS[lightboxIndex].alt}
                    decoding="async"
                    className="max-h-[72vh] sm:max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl gallery-modal-img"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Next Button */}
              <button
                type="button"
                id="lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                className="absolute right-1 sm:right-4 z-20 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-black/50 text-white transition-all duration-200 hover:bg-[#8b1a1a] hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white border border-white/15 backdrop-blur-md shadow-xl"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </div>

            {/* Bottom Filmstrip Carousel Navigation */}
            <div className="relative z-20 flex w-full max-w-4xl flex-col items-center gap-2 pt-2">
              <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1.5 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 scrollbar-none">
                {PHOTOS.map((p, idx) => {
                  const isCurrent = idx === lightboxIndex;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setLightboxIndex(idx)}
                      className={`relative h-10 w-14 shrink-0 overflow-hidden rounded-lg transition-all duration-200 ${
                        isCurrent
                          ? "ring-2 ring-[#0eb39e] scale-110 shadow-md shadow-[#0eb39e]/40"
                          : "opacity-40 hover:opacity-100 hover:scale-105"
                      }`}
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>

              <span className="text-[11px] font-medium text-white/50 hidden sm:inline">
                Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">←</kbd> and{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">→</kbd> to navigate •{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">ESC</kbd> to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* High-DPI Sharp Image Rendering */
        .gallery-thumbnail {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .gallery-modal-img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: auto;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        /* Diagonal Shimmer Sheen on Hover */
        .gallery-shine-card::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            110deg,
            transparent 35%,
            rgba(255, 255, 255, 0.28) 50%,
            transparent 65%
          );
          transform: translateX(-100%);
          transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
          z-index: 5;
        }
        .group:hover .gallery-shine-card::after {
          transform: translateX(100%);
        }

        /* Hide scrollbars for the filmstrip */
        .scrollbar-none::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-none {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
