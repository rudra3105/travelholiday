"use client";

import { CreditCard } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentForm } from "./payment-form";

export function PaymentButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="w-full flex items-center gap-3 p-4 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors">
          <CreditCard className="h-5 w-5 text-brand-400" />
          <span className="font-semibold">Submit Payment Details</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Payment Confirmation</DialogTitle>
          <DialogDescription>
            Please provide your transaction details and upload the receipt to help us verify your payment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <PaymentForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
