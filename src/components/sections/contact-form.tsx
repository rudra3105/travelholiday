"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { submitContact } from "@/actions/inquiry";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    const result = await submitContact(data);
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
      reset();
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-emerald-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-600 mb-6">We'll get back to you within 24 hours.</p>
        <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Full Name *</Label>
          <Input id="name" placeholder="Your name" className={cn("mt-1.5", errors.name && "border-red-400")} {...register("name")} />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" placeholder="+91 98765 43210" className={cn("mt-1.5", errors.phone && "border-red-400")} {...register("phone")} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" placeholder="your@email.com" className={cn("mt-1.5", errors.email && "border-red-400")} {...register("email")} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Label htmlFor="subject">Subject *</Label>
        <Input id="subject" placeholder="How can we help?" className={cn("mt-1.5", errors.subject && "border-red-400")} {...register("subject")} />
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <Label htmlFor="message">Message *</Label>
        <Textarea id="message" placeholder="Tell us more..." rows={5} className={cn("mt-1.5", errors.message && "border-red-400")} {...register("message")} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <Button type="submit" variant="premium" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="h-4 w-4 animate-spin" />Sending...</> : <><Send className="h-4 w-4" />Send Message</>}
      </Button>
    </form>
  );
}
