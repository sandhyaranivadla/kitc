import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { STORIES } from "@/data/kitc";
import { Button } from "@/components/ui/button";

const COLORS = [
  "bg-blue-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-pink-50",
  "bg-purple-50",
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % STORIES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12">
      <div className="relative flex justify-center items-center h-[340px] overflow-visible">
        {STORIES.map((story, i) => {
          let offset = i - currentIndex;
          if (offset < -1) offset += STORIES.length;
          if (offset > 1) offset -= STORIES.length;
          
          const isActive = offset === 0;
          const isLeft = offset === -1;
          const isRight = offset === 1;

          if (Math.abs(offset) > 1 && STORIES.length > 3) return null;

          let transformClass = "scale-75 opacity-0 z-0";
          if (isActive) {
            transformClass = "scale-100 opacity-100 z-20 translate-x-0 rotate-0 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)]";
          } else if (isLeft) {
            transformClass = "scale-[0.85] opacity-60 z-10 -translate-x-[40%] md:-translate-x-[70%] -rotate-3 shadow-lg cursor-pointer hover:opacity-80";
          } else if (isRight) {
            transformClass = "scale-[0.85] opacity-60 z-10 translate-x-[40%] md:translate-x-[70%] rotate-3 shadow-lg cursor-pointer hover:opacity-80";
          }

          return (
            <div
              key={story.name}
              onClick={() => {
                if (isLeft) prev();
                if (isRight) next();
              }}
              className={`absolute transition-all duration-500 ease-out w-[280px] md:w-[360px] h-[300px] p-8 flex flex-col justify-between ${COLORS[i % COLORS.length]} ${transformClass}`}
              style={{
                clipPath: "polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)",
              }}
            >
              <div>
                <div className="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm mb-6 border border-slate-100 p-0.5">
                  <img src={`https://i.pravatar.cc/150?u=${story.name}`} alt={story.name} className="w-full h-full object-cover rounded-[10px] bg-slate-100" />
                </div>
                <p className="font-bold text-slate-900 text-[16px] leading-relaxed">"{story.quote}"</p>
              </div>
              <p className="text-xs text-slate-500 italic mt-6">- {story.name}, {story.role}</p>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center items-center gap-3 mt-10 relative z-30">
        <Button variant="outline" size="icon" onClick={prev} className="rounded-sm w-10 h-10 bg-white shadow-sm border-slate-200 text-slate-600 hover:text-slate-900">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button variant="outline" size="icon" onClick={next} className="rounded-sm w-10 h-10 bg-white shadow-sm border-slate-200 text-slate-600 hover:text-slate-900">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
