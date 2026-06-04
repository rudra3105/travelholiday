"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generalInquirySchema, type GeneralInquiryInput } from "@/lib/validations";
import { submitInquiry } from "@/actions/inquiry";
import { cn } from "@/lib/utils";
import { SITE_CONFIG } from "@/lib/constants";

interface InquiryFormProps {
  packageId?: string;
  destination?: string;
  compact?: boolean;
  title?: string;
}

export function InquiryForm({ packageId, destination, compact = false, title }: InquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const inquiryType: "package" | "destination" | "general" = packageId
    ? "package"
    : destination
    ? "destination"
    : "general";

  const { register, handleSubmit, reset, formState: { errors } } = useForm<GeneralInquiryInput>({
    resolver: zodResolver(generalInquirySchema),
    defaultValues: {
      destination: destination || "",
      package_id: packageId,
      num_travelers: 2,
      type: inquiryType,
    },
  });

  const onSubmit = async (data: GeneralInquiryInput) => {
    setIsSubmitting(true);
    const result = await submitInquiry(data);
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      reset();
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-10 px-6"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Inquiry Submitted!</h3>
        <p className="text-gray-600 mb-6">Our travel expert will contact you within 24 hours.</p>
        <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
          <a href={`tel:${SITE_CONFIG.phone}`} className="flex items-center gap-1.5 text-brand-600 hover:underline">
            <Phone className="h-4 w-4" />Call us now
          </a>
          <span>or</span>
          <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1.5 text-brand-600 hover:underline">
            <Mail className="h-4 w-4" />Email us
          </a>
        </div>
        <Button variant="outline" size="sm" className="mt-6" onClick={() => setIsSuccess(false)}>
          Submit Another Inquiry
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("space-y-4", compact ? "space-y-3" : "space-y-4")}>
      {title && <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>}

      <input type="hidden" {...register("type")} />
      {packageId && <input type="hidden" {...register("package_id")} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="Your full name" className={cn("mt-1.5", errors.name && "border-red-400")} {...register("name")} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" placeholder="+91 98765 43210" className={cn("mt-1.5", errors.phone && "border-red-400")} {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input id="email" type="email" placeholder="your@email.com" className={cn("mt-1.5", errors.email && "border-red-400")} {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      {!destination && (
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input id="destination" placeholder="Where do you want to go?" className="mt-1.5" {...register("destination")} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="travel_date">Travel Date</Label>
          <Input id="travel_date" type="month" className="mt-1.5" {...register("travel_date")} />
        </div>
        <div>
          <Label htmlFor="num_travelers">No. of Travelers</Label>
          <Input
            id="num_travelers"
            type="number"
            min={1}
            max={50}
            placeholder="2"
            className="mt-1.5"
            {...register("num_travelers", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="budget">Budget (per person)</Label>
        <select
          id="budget"
          className="flex h-11 w-full rounded-xl border border-input bg-background px-4 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring mt-1.5"
          {...register("budget")}
        >
          <option value="">Select budget range</option>
          <option value="under-10k">Under ₹10,000</option>
          <option value="10k-25k">₹10,000 – ₹25,000</option>
          <option value="25k-50k">₹25,000 – ₹50,000</option>
          <option value="50k-1l">₹50,000 – ₹1,00,000</option>
          <option value="above-1l">Above ₹1,00,000</option>
        </select>
      </div>

      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          placeholder="Tell us about your dream trip..."
          className={cn("mt-1.5", errors.message && "border-red-400")}
          rows={compact ? 3 : 4}
          {...register("message")}
        />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <><Loader2 className="h-4 w-4 animate-spin" />Submitting...</>
        ) : (
          <><Send className="h-4 w-4" />Send Inquiry</>
        )}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        By submitting, you agree to our Privacy Policy. We'll never spam you.
      </p>
    </form>
  );
}
