"use client";

import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle, Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { paymentSchema, type PaymentInput } from "@/lib/validations";
import { submitPaymentDetails } from "@/actions/inquiry";
import { cn } from "@/lib/utils";

// Cloudinary configuration from environment variables
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "unsigned_upload";

export function PaymentForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PaymentInput>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      payment_method: "upi",
    }
  });

  const paymentMethod = watch("payment_method");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File is too large. Maximum size is 5MB.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setReceiptUrl(data.secure_url);
        setValue("receipt_url", data.secure_url, { shouldValidate: true });
      } else {
        console.error("Upload failed:", data);
        alert("Upload failed. Please check your Cloudinary configuration.");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: PaymentInput) => {
    setIsSubmitting(true);
    const result = await submitPaymentDetails(data);
    setIsSubmitting(false);
    if (result.success) {
      setIsSuccess(true);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-10 w-10 text-emerald-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Details Submitted!</h3>
        <p className="text-gray-600 mb-8">Thank you for sharing the details. Our accounts team will verify the payment and update you shortly.</p>
        <Button variant="outline" onClick={() => setIsSuccess(false)}>Submit Another Payment</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pay_name">Payer Name *</Label>
          <Input id="pay_name" placeholder="Name on account" {...register("name")} className={cn(errors.name && "border-red-400")} />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pay_phone">Phone *</Label>
          <Input id="pay_phone" placeholder="Contact number" {...register("phone")} className={cn(errors.phone && "border-red-400")} />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pay_email">Email *</Label>
          <Input id="pay_email" type="email" placeholder="Your email" {...register("email")} className={cn(errors.email && "border-red-400")} />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="pay_amount">Amount Paid (₹) *</Label>
          <Input id="pay_amount" placeholder="e.g. 15000" {...register("amount")} className={cn(errors.amount && "border-red-400")} />
          {errors.amount && <p className="text-red-500 text-xs">{errors.amount.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="payment_method">Payment Method *</Label>
        <select 
          id="payment_method" 
          {...register("payment_method")} 
          className="w-full h-10 px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white text-sm"
        >
          <option value="upi">UPI (GPay, PhonePe, etc.)</option>
          <option value="bank_transfer">Bank Transfer (NEFT/IMPS)</option>
          <option value="card">Credit/Debit Card</option>
          <option value="other">Other</option>
        </select>
      </div>

      {paymentMethod === "bank_transfer" && (
        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-4">
          <h4 className="text-sm font-bold text-gray-900">Bank Account Details (Optional)</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="acc_no" className="text-xs">Account Number</Label>
              <Input id="acc_no" placeholder="Your A/C number" {...register("account_number")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ifsc" className="text-xs">IFSC Code</Label>
              <Input id="ifsc" placeholder="Bank IFSC" {...register("ifsc_code")} />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bank" className="text-xs">Bank Name</Label>
              <Input id="bank" placeholder="e.g. HDFC Bank" {...register("bank_name")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch" className="text-xs">Branch Name</Label>
              <Input id="branch" placeholder="Branch location" {...register("branch_name")} />
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="tx_id">Transaction ID / Reference No. *</Label>
        <Input id="tx_id" placeholder="Enter UTR or Txn ID" {...register("transaction_id")} className={cn(errors.transaction_id && "border-red-400")} />
        {errors.transaction_id && <p className="text-red-500 text-xs">{errors.transaction_id.message}</p>}
      </div>

      <div className="space-y-2">
        <Label>Payment Receipt *</Label>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*,.pdf"
          className="hidden"
        />
        <div 
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer hover:bg-gray-50",
            receiptUrl ? "border-emerald-500 bg-emerald-50/30" : "border-gray-200 hover:border-brand-300",
            errors.receipt_url && "border-red-400 bg-red-50/30"
          )}
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
              <span className="text-sm text-gray-500 font-medium">Uploading receipt...</span>
            </div>
          ) : receiptUrl ? (
            <div className="flex flex-col items-center gap-2">
              <div className="relative w-16 h-16 bg-white rounded-lg border border-emerald-200 flex items-center justify-center overflow-hidden">
                {receiptUrl.endsWith('.pdf') ? (
                  <FileText className="h-8 w-8 text-red-500" />
                ) : (
                  <img src={receiptUrl} alt="Receipt" className="w-full h-full object-cover" />
                )}
                <button 
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setReceiptUrl(null); setValue("receipt_url", ""); }}
                  className="absolute top-0.5 right-0.5 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
              <span className="text-xs text-emerald-600 font-medium">Receipt uploaded! Click to change.</span>
            </div>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center">
                <Upload className="h-6 w-6 text-brand-600" />
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-gray-900">Choose receipt from files</p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG or PDF (Max 5MB)</p>
              </div>
            </>
          )}
          <input type="hidden" {...register("receipt_url")} />
        </div>
        {errors.receipt_url && <p className="text-red-500 text-xs">{errors.receipt_url.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pay_notes">Additional Notes</Label>
        <Textarea id="pay_notes" placeholder="Any specific details about your payment" {...register("notes")} rows={3} />
      </div>

      <Button type="submit" variant="premium" className="w-full py-6 text-lg font-bold shadow-lg" disabled={isSubmitting || uploading}>
        {isSubmitting ? (
          <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Submitting Details...</>
        ) : (
          <>Submit Payment Details</>
        )}
      </Button>
    </form>
  );
}

