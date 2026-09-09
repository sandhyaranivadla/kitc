import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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

const PHOTOS = [
  { src: "/images/gallery/gallery_01.jpg", alt: "KITC training activities" },
  { src: "/images/gallery/gallery_02.jpg", alt: "Students during vocational training" },
  { src: "/images/gallery/gallery_03.jpg", alt: "Student group session" },
  { src: "/images/gallery/gallery_04.jpg", alt: "KITC classroom activities" },
  { src: "/images/gallery/gallery_05.jpg", alt: "Industrial training lab" },
  { src: "/images/gallery/gallery_06.jpg", alt: "Outreach & community session" },
  { src: "/images/gallery/gallery_07.jpg", alt: "Classroom learning" },
  { src: "/images/gallery/gallery_08.jpg", alt: "Trainees at KITC center" },
  { src: "/images/gallery/gallery_09.jpg", alt: "Classroom interaction" },
  { src: "/images/gallery/gallery_10.jpg", alt: "Training workshop" },
  { src: "/images/gallery/gallery_11.jpg", alt: "Youth empowerment session" },
  { src: "/images/gallery/gallery_12.jpg", alt: "KITC training center event" },
  { src: "/images/gallery/gallery_13.jpg", alt: "KITC community event" },
  { src: "/images/gallery/gallery_14.jpg", alt: "Skills training workshop" },
  { src: "/images/gallery/gallery_15.jpg", alt: "KITC graduation ceremony" },
  { src: "/images/gallery/gallery_16.jpg", alt: "Practical training session" },
  { src: "/images/gallery/gallery_17.jpg", alt: "Student activities at KITC" },
  { src: "/images/gallery/gallery_18.jpg", alt: "KITC training program" },
  { src: "/images/gallery/gallery_19.jpg", alt: "Youth empowerment at KITC" },
  { src: "/images/gallery/gallery_20.jpg", alt: "KITC outreach program" },
  { src: "/images/gallery/gallery_21.jpg", alt: "KITC placement drive" },
];

function GalleryPage() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
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
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Inside our centres"
        description="Classrooms, workshops, outreach days and placement drives across Medchal and Alwal."
      />

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {PHOTOS.map((photo, i) => (
            <button
              key={i}
              type="button"
              id={`gallery-photo-${i + 1}`}
              onClick={() => openLightbox(i)}
              className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`View photo: ${photo.alt}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                width={800}
                height={600}
                className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Hover overlay with zoom hint */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white opacity-0 drop-shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-2.5 3.5 3.5 3.5" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 8v6M8 11h6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && PHOTOS[lightboxIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ animation: "fadeIn 0.2s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            onClick={closeLightbox}
          />

          {/* Close button */}
          <button
            type="button"
            id="lightbox-close"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            id="lightbox-prev"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:left-6"
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Image */}
          <div className="relative z-10 mx-16 flex max-h-[90vh] max-w-5xl items-center justify-center">
            <img
              key={lightboxIndex}
              src={PHOTOS[lightboxIndex].src}
              alt={PHOTOS[lightboxIndex].alt}
              className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
              style={{ animation: "zoomIn 0.2s ease" }}
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            id="lightbox-next"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-3 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white sm:right-6"
            aria-label="Next photo"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-sm font-medium text-white">
            {lightboxIndex + 1} / {PHOTOS.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.93); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
