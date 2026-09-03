"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  date: z.string().min(1, "Please select a preferred date"),
  concern: z.string().min(10, "Please briefly describe your primary concern"),
  language: z.enum(["English", "Malayalam", "Kannada", "Other"]),
  consent: z.boolean().refine(val => val === true, "You must agree to the privacy policy"),
});

type FormData = z.infer<typeof formSchema>;

export default function AppointmentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      language: "English",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    
    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-warm mb-6">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-primary text-2xl mb-2">Request Received</h4>
        <p className="font-secondary text-black/70">
          Thank you for reaching out. Our care team will contact you shortly to confirm your consultation.
        </p>
        <button 
          onClick={() => setSubmitStatus("idle")}
          className="mt-8 text-primary hover:underline font-secondary font-medium"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="font-secondary text-sm font-medium text-black/80">Full Name</label>
        <input 
          id="name"
          {...register("name")} 
          className={cn(
            "h-12 px-4 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
            errors.name ? "border-red-500" : "border-black/10"
          )}
        />
        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="font-secondary text-sm font-medium text-black/80">Phone / WhatsApp</label>
        <input 
          id="phone"
          type="tel"
          {...register("phone")} 
          className={cn(
            "h-12 px-4 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
            errors.phone ? "border-red-500" : "border-black/10"
          )}
        />
        {errors.phone && <span className="text-red-500 text-xs">{errors.phone.message}</span>}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="font-secondary text-sm font-medium text-black/80">Email (Optional)</label>
        <input 
          id="email"
          type="email"
          {...register("email")} 
          className={cn(
            "h-12 px-4 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
            errors.email ? "border-red-500" : "border-black/10"
          )}
        />
        {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="date" className="font-secondary text-sm font-medium text-black/80">Preferred Date</label>
          <input 
            id="date"
            type="date"
            {...register("date")} 
            className={cn(
              "h-12 px-4 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow",
              errors.date ? "border-red-500" : "border-black/10"
            )}
          />
          {errors.date && <span className="text-red-500 text-xs">{errors.date.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="language" className="font-secondary text-sm font-medium text-black/80">Preferred Language</label>
          <select 
            id="language"
            {...register("language")} 
            className="h-12 px-4 rounded-lg border border-black/10 bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
          >
            <option value="English">English</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Kannada">Kannada</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="concern" className="font-secondary text-sm font-medium text-black/80">Primary Concern</label>
        <textarea 
          id="concern"
          {...register("concern")} 
          rows={3}
          className={cn(
            "p-4 rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow resize-none",
            errors.concern ? "border-red-500" : "border-black/10"
          )}
          placeholder="Briefly describe what you would like to consult about..."
        />
        {errors.concern && <span className="text-red-500 text-xs">{errors.concern.message}</span>}
        <span className="text-black/40 text-xs mt-1">Please do not share sensitive medical records here.</span>
      </div>

      <div className="flex items-start gap-3 mt-2">
        <input 
          id="consent"
          type="checkbox"
          {...register("consent")}
          className="mt-1 w-5 h-5 rounded border-black/20 text-primary focus:ring-primary"
        />
        <label htmlFor="consent" className="font-secondary text-sm text-black/70 leading-relaxed">
          I consent to being contacted regarding this appointment and acknowledge that this form does not establish a patient-practitioner relationship until a formal consultation.
        </label>
      </div>
      {errors.consent && <span className="text-red-500 text-xs">{errors.consent.message}</span>}

      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm">
          Something went wrong. Please try again or contact us directly.
        </div>
      )}

      <button 
        type="submit"
        disabled={isSubmitting}
        className="mt-4 w-full h-14 rounded-full bg-primary text-warm font-secondary font-medium hover:bg-black transition-colors disabled:opacity-70 flex items-center justify-center"
      >
        {isSubmitting ? "Submitting..." : "Request Appointment"}
      </button>
    </form>
  );
}
