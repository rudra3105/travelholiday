import { z } from "zod";

export const generalInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number").max(15),
  destination: z.string().optional(),
  travel_date: z.string().optional(),
  num_travelers: z.number().min(1).max(50).optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  type: z.enum(["general", "package", "destination", "contact"]),
  package_id: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number").max(15),
  subject: z.string().min(3, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export const paymentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  amount: z.string().min(1, "Amount is required"),
  payment_method: z.enum(["upi", "bank_transfer", "card", "other"]),
  account_number: z.string().optional(),
  ifsc_code: z.string().optional(),
  bank_name: z.string().optional(),
  branch_name: z.string().optional(),
  transaction_id: z.string().min(5, "Transaction ID is required"),
  receipt_url: z.string().url("Please upload a payment receipt"),
  notes: z.string().optional(),
});

export type GeneralInquiryInput = z.infer<typeof generalInquirySchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type PaymentInput = z.infer<typeof paymentSchema>;
