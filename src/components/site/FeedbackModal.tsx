import { useState } from "react";
import { Star, MessageSquareHeart, CheckCircle2, Send, Loader2, Heart } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitContactMessage } from "@/lib/leads";

const RATING_LABELS = [
  "Select a rating",
  "Poor - Needs improvement",
  "Fair - Could be better",
  "Good - Helpful training",
  "Very Good - Great experience!",
  "Outstanding - Highly recommend! 🌟",
];

const COURSES = [
  "Business Associate (BA)",
  "Java / Python Development",
  "Full Stack Web Development",
  "Tally ERP & GST Accounting",
  "Spoken English & Communication",
  "Vocational & Soft Skills (35-Day)",
  "Industrial Training (B.Tech / Diploma)",
  "Other Course",
];

export interface StudentFeedback {
  id: string;
  fullName: string;
  phone: string;
  course: string;
  center: string;
  rating: number;
  comments: string;
  placementStatus: string;
  createdAt: string;
}

export function FeedbackModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("");
  const [center, setCenter] = useState("Medchal Centre");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comments, setComments] = useState("");
  const [placementStatus, setPlacementStatus] = useState("Currently studying / Completed");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFullName("");
    setPhone("");
    setCourse("");
    setCenter("Medchal Centre");
    setRating(5);
    setComments("");
    setPlacementStatus("Currently studying / Completed");
    setSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, "").length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!course) {
      toast.error("Please select the course you attended");
      return;
    }
    if (!comments.trim()) {
      toast.error("Please write a few words about your experience");
      return;
    }

    setIsSubmitting(true);

    const feedbackItem: StudentFeedback = {
      id: "fb-" + Date.now(),
      fullName: fullName.trim(),
      phone: phone.trim(),
      course,
      center,
      rating,
      comments: comments.trim(),
      placementStatus,
      createdAt: new Date().toISOString(),
    };

    try {
      // 1. Submit through the lead / contact system for backend persistence
      await submitContactMessage({
        full_name: fullName.trim(),
        phone: phone.trim(),
        email: "",
        center,
        message: `[STUDENT FEEDBACK ⭐${rating}/5]\nCourse: ${course}\nCenter: ${center}\nStatus: ${placementStatus}\n\nReview:\n"${comments.trim()}"`,
      });
    } catch (err) {
      console.warn("Could not push to remote backend, saving locally:", err);
    }

    // 2. Also save to local storage for immediate persistence
    try {
      const existingStr = localStorage.getItem("kitc_student_feedbacks");
      const existing: StudentFeedback[] = existingStr ? JSON.parse(existingStr) : [];
      existing.unshift(feedbackItem);
      localStorage.setItem("kitc_student_feedbacks", JSON.stringify(existing.slice(0, 50)));
      window.dispatchEvent(new CustomEvent("kitc_feedback_added", { detail: feedbackItem }));
    } catch (err) {
      console.error("Local storage error", err);
    }

    setIsSubmitting(false);
    setSubmitted(true);
    toast.success("Thank you! Your feedback has been added to testimonials.");
  };

  const handleModalClose = (nextOpen: boolean) => {
    if (!nextOpen && submitted) {
      resetForm();
    }
    onOpenChange(nextOpen);
  };

  const activeStar = hoverRating ?? rating;

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-lg border-border/80 p-6 shadow-2xl">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7a1010]/10 text-[#7a1010]">
              <MessageSquareHeart className="h-5 w-5" />
            </span>
            <div>
              <DialogTitle className="font-display text-xl font-bold text-foreground">
                Student Feedback
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Help us improve! Share your training experience at Kakatheeya Foundation.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-inner">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
              <Heart className="absolute -top-1 -right-1 h-6 w-6 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-foreground">
              Thank You, {fullName}!
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">
              Your feedback means the world to our teachers and trainers. We continue striving to give every youth the best skills and job opportunities!
            </p>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  resetForm();
                }}
              >
                Submit another response
              </Button>
              <Button
                size="sm"
                className="bg-[#7a1010] text-white hover:bg-[#5a0a0a]"
                onClick={() => handleModalClose(false)}
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            {/* Interactive Rating */}
            <div className="rounded-xl border border-border/60 bg-muted/30 p-3.5 text-center">
              <Label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Rate your overall experience
              </Label>
              <div className="mt-2 flex items-center justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                    aria-label={`Rate ${star} star`}
                  >
                    <Star
                      className={`h-7 w-7 transition-colors ${
                        star <= activeStar
                          ? "fill-[#f59e0b] text-[#f59e0b] drop-shadow-sm"
                          : "text-muted-foreground/40 hover:text-[#f59e0b]/60"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs font-medium text-[#ea580c]">
                {RATING_LABELS[activeStar]}
              </p>
            </div>

            {/* Name & Phone */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="fb-name" className="text-xs font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fb-name"
                  placeholder="e.g. Ramesh Kumar"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fb-phone" className="text-xs font-semibold">
                  Phone / WhatsApp <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fb-phone"
                  type="tel"
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Course & Center */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">
                  Course Attended <span className="text-red-500">*</span>
                </Label>
                <Select value={course} onValueChange={setCourse}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    {COURSES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Training Center</Label>
                <Select value={center} onValueChange={setCenter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select center" />
                  </SelectTrigger>
                  <SelectContent className="z-[100]">
                    <SelectItem value="Medchal Centre">Medchal Centre</SelectItem>
                    <SelectItem value="Alwal Centre">Alwal Centre</SelectItem>
                    <SelectItem value="Online / Both">Online / Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Placement / Career Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Current Career Status</Label>
              <Select value={placementStatus} onValueChange={setPlacementStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Your career status" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  <SelectItem value="Placed in a Job (through KITC)">Placed in a Job (through KITC)</SelectItem>
                  <SelectItem value="Placed independently">Placed independently</SelectItem>
                  <SelectItem value="Attending Interviews">Attending Interviews</SelectItem>
                  <SelectItem value="Currently studying in batch">Currently studying in batch</SelectItem>
                  <SelectItem value="Looking for Job Placement">Looking for Job Placement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comments */}
            <div className="space-y-1.5">
              <Label htmlFor="fb-comments" className="text-xs font-semibold">
                Your Feedback & Comments <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="fb-comments"
                placeholder="Tell us what you liked, how the trainers helped you, or what we can improve..."
                rows={4}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7a1010] text-white hover:bg-[#5a0a0a] shadow-md transition-all hover:shadow-lg py-5 text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting Feedback...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Student Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/**
 * Floating feedback trigger button for all pages
 */
export function FloatingFeedbackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Give student feedback"
      className="fixed bottom-6 left-6 z-40 group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#7a1010] via-[#8b1a1a] to-[#6b1010] px-4 py-3 text-sm font-semibold text-white shadow-xl shadow-[#7a1010]/30 border border-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#7a1010]/50 active:scale-95 cursor-pointer"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-[#fbc531] transition-transform duration-300 group-hover:rotate-12">
        <Star className="h-3.5 w-3.5 fill-[#fbc531]" />
      </span>
      <span className="font-medium tracking-wide">Student Feedback</span>
    </button>
  );
}
