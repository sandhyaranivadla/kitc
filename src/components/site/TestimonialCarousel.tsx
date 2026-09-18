import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, MessageSquareHeart, Sparkles } from "lucide-react";
import { STORIES } from "@/data/kitc";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { FeedbackModal, type StudentFeedback } from "@/components/site/FeedbackModal";

const COLORS = [
  "bg-blue-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-pink-50",
  "bg-purple-50",
  "bg-orange-50",
];

interface DisplayStory {
  id?: string;
  name: string;
  role: string;
  quote: string;
  avatar?: string;
  rating?: number;
  isStudentFeedback?: boolean;
}

function loadAllStories(): DisplayStory[] {
  const defaultStories: DisplayStory[] = STORIES.map((s, idx) => ({
    id: `default-${idx}`,
    name: s.name,
    role: s.role,
    quote: s.quote,
    rating: 5,
    avatar: `https://i.pravatar.cc/150?u=${encodeURIComponent(s.name)}`,
    isStudentFeedback: false,
  }));

  if (typeof window === "undefined") return defaultStories;

  try {
    const raw = localStorage.getItem("kitc_student_feedbacks");
    if (!raw) return defaultStories;
    const feedbacks: StudentFeedback[] = JSON.parse(raw);
    const converted: DisplayStory[] = feedbacks.map((fb) => ({
      id: fb.id,
      name: fb.fullName,
      role: `${fb.course}${fb.center ? ` · ${fb.center}` : ""}`,
      quote: fb.comments,
      rating: fb.rating || 5,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fb.fullName)}`,
      isStudentFeedback: true,
    }));
    return [...converted, ...defaultStories];
  } catch (err) {
    console.error("Failed to read testimonials from localStorage", err);
    return defaultStories;
  }
}

export function TestimonialCarousel() {
  const [stories, setStories] = useState<DisplayStory[]>(() => loadAllStories());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

  // Sync when student submits feedback anywhere
  const refreshStories = useCallback(() => {
    const updated = loadAllStories();
    setStories(updated);
    setCurrentIndex(0); // Instantly focus the newly uploaded student testimonial!
  }, []);

  useEffect(() => {
    // Initial client-side load
    refreshStories();

    const handleFeedbackAdded = () => {
      refreshStories();
    };

    window.addEventListener("kitc_feedback_added", handleFeedbackAdded);
    window.addEventListener("storage", handleFeedbackAdded);
    return () => {
      window.removeEventListener("kitc_feedback_added", handleFeedbackAdded);
      window.removeEventListener("storage", handleFeedbackAdded);
    };
  }, [refreshStories]);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const handleDragEnd = (_event: any, info: any) => {
    if (info.offset.x < -50) {
      next();
    } else if (info.offset.x > 50) {
      prev();
    }
  };

  if (!stories.length) return null;

  return (
    <div className="relative w-full max-w-5xl mx-auto py-6 md:py-10">
      {/* Testimonial Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#fbc531]/20 text-[#d97706]">
            <Sparkles className="h-4 w-4 fill-[#fbc531]" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Student Reviews ({stories.length})
          </span>
        </div>

        {/* Feedback Button inside the Testimonials Section */}
        <Button
          type="button"
          onClick={() => setFeedbackModalOpen(true)}
          className="group rounded-full bg-[#7a1010] px-5 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#5a0a0a] hover:shadow-lg hover:-translate-y-0.5"
        >
          <MessageSquareHeart className="mr-2 h-4 w-4 text-[#e8a040] transition-transform duration-300 group-hover:scale-110" />
          Add Your Feedback
        </Button>
      </div>

      {/* Carousel */}
      <div className="relative flex justify-center items-center h-[340px] overflow-visible">
        <AnimatePresence initial={false} custom={direction}>
          {stories.map((story, i) => {
            let offset = i - currentIndex;
            if (offset < -1) offset += stories.length;
            if (offset > 1) offset -= stories.length;

            const isActive = offset === 0;
            const isLeft = offset === -1;
            const isRight = offset === 1;

            if (Math.abs(offset) > 1 && stories.length > 3) return null;

            return (
              <motion.div
                key={story.id || story.name + i}
                custom={direction}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                onClick={() => {
                  if (isLeft) prev();
                  if (isRight) next();
                }}
                className={`absolute w-[290px] sm:w-[360px] h-[310px] p-7 flex flex-col justify-between rounded-xl ${COLORS[i % COLORS.length]} ${
                  !isActive ? "cursor-pointer" : "cursor-grab active:cursor-grabbing"
                }`}
                style={{
                  clipPath: "polygon(0 0, calc(100% - 35px) 0, 100% 35px, 100% 100%, 0 100%)",
                }}
                initial={
                  isActive
                    ? { opacity: 0, scale: 0.8, x: direction > 0 ? 100 : -100 }
                    : isLeft
                    ? { opacity: 0, scale: 0.8, x: -100 }
                    : { opacity: 0, scale: 0.8, x: 100 }
                }
                animate={
                  isActive
                    ? {
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        rotate: 0,
                        zIndex: 20,
                        boxShadow: "0 20px 50px -12px rgba(0,0,0,0.18)",
                      }
                    : isLeft
                    ? {
                        opacity: 0.6,
                        scale: 0.85,
                        x: "-70%",
                        rotate: -3,
                        zIndex: 10,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }
                    : {
                        opacity: 0.6,
                        scale: 0.85,
                        x: "70%",
                        rotate: 3,
                        zIndex: 10,
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                      }
                }
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  opacity: { duration: 0.2 },
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-xl overflow-hidden bg-white shadow-sm border border-slate-200 p-0.5">
                      <img
                        src={story.avatar || `https://i.pravatar.cc/150?u=${story.name}`}
                        alt={story.name}
                        className="w-full h-full object-cover rounded-[10px] bg-slate-100"
                      />
                    </div>

                    {/* Star Rating & Verified Badge */}
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-0.5">
                        {[...Array(story.rating || 5)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]"
                          />
                        ))}
                      </div>
                      {story.isStudentFeedback && (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                          Verified Student
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="font-bold text-slate-900 text-[15px] leading-snug line-clamp-4">
                    "{story.quote}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/60">
                  <p className="font-semibold text-slate-900 text-sm">{story.name}</p>
                  <p className="text-[11px] text-slate-600 font-medium truncate">{story.role}</p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-3 mt-8 relative z-30">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            aria-label="Previous testimonial"
            className="rounded-full w-10 h-10 bg-white shadow-sm border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Indicator dots */}
        <div className="flex items-center gap-1.5 px-2">
          {stories.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => {
                setDirection(dotIdx > currentIndex ? 1 : -1);
                setCurrentIndex(dotIdx);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                dotIdx === currentIndex
                  ? "w-6 bg-[#7a1010]"
                  : "w-2 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            aria-label="Next testimonial"
            className="rounded-full w-10 h-10 bg-white shadow-sm border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Modal for adding feedback */}
      <FeedbackModal
        open={feedbackModalOpen}
        onOpenChange={setFeedbackModalOpen}
      />
    </div>
  );
}
