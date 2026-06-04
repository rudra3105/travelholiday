"use server";

import { z } from "zod";
import { generalInquirySchema, contactSchema } from "@/lib/validations";
import { SITE_CONFIG } from "@/lib/constants";

const ADMIN_EMAIL = "travelholiday@gmail.com";

// ── Send email via Resend ─────────────────────────────────────
async function sendEmail({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "your_resend_api_key") {
    // Dev fallback — log to console
    console.log("📧 [EMAIL - no API key set]");
    console.log("  To:", to);
    console.log("  Subject:", subject);
    return { success: true };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    const result = await resend.emails.send({
      from: `${SITE_CONFIG.name} <onboarding@resend.dev>`,
      to: Array.isArray(to) ? to : [to],
      subject,
      html,
      replyTo: replyTo,
    });

    if (result.error) {
      console.error("Resend error:", result.error);
      return { success: false };
    }
    return { success: true };
  } catch (e) {
    console.error("Email failed:", e);
    return { success: false };
  }
}

// ── Admin notification email template ────────────────────────
function adminEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  destination?: string;
  travel_date?: string;
  num_travelers?: number;
  budget?: string;
  message: string;
}) {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#0284c7,#0369a1);padding:28px 32px">
          <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700">🌍 New Travel Inquiry</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.8);font-size:14px">${SITE_CONFIG.name} — ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
              ["👤 Name", data.name],
              ["📧 Email", `<a href="mailto:${data.email}" style="color:#0284c7">${data.email}</a>`],
              ["📞 Phone", `<a href="tel:${data.phone}" style="color:#0284c7">${data.phone}</a>`],
              data.destination ? ["🗺️ Destination", data.destination] : null,
              data.travel_date ? ["📅 Travel Date", data.travel_date] : null,
              data.num_travelers ? ["👥 Travelers", String(data.num_travelers)] : null,
              data.budget ? ["💰 Budget", data.budget] : null,
            ]
              .filter(Boolean)
              .map(
                (row) => `
              <tr>
                <td style="padding:10px 0;color:#6b7280;font-size:14px;width:140px;vertical-align:top">${row![0]}</td>
                <td style="padding:10px 0;color:#111827;font-size:14px;font-weight:600">${row![1]}</td>
              </tr>`
              )
              .join("")}
          </table>
          <div style="background:#f0f9ff;border-left:4px solid #0284c7;border-radius:8px;padding:16px;margin-top:20px">
            <p style="margin:0;color:#374151;font-size:14px;line-height:1.6"><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>
          </div>
          <div style="margin-top:24px;text-align:center">
            <a href="https://wa.me/${SITE_CONFIG.whatsapp}?text=Hi ${encodeURIComponent(data.name)}, thanks for your inquiry!" style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;margin-right:8px">💬 Reply on WhatsApp</a>
            <a href="mailto:${data.email}" style="display:inline-block;background:#0284c7;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">📧 Reply by Email</a>
          </div>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;text-align:center;color:#9ca3af;font-size:12px">
          ${SITE_CONFIG.name} · ${SITE_CONFIG.address} · ${SITE_CONFIG.phone}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Customer confirmation email template ──────────────────────
function customerEmailHtml(name: string, destination?: string) {
  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:32px 0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr><td style="background:linear-gradient(135deg,#0284c7,#0369a1);padding:32px;text-align:center">
          <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700">${SITE_CONFIG.name}</h1>
          <p style="margin:8px 0 0;color:rgba(255,255,255,0.8)">${SITE_CONFIG.tagline}</p>
        </td></tr>
        <tr><td style="padding:36px">
          <h2 style="margin:0 0 16px;color:#111827">Thank you, ${name}! 🎉</h2>
          <p style="color:#6b7280;line-height:1.7;margin:0 0 16px">We've received your travel inquiry${destination ? ` for <strong>${destination}</strong>` : ""}. Our travel expert will get back to you within <strong style="color:#0284c7">24 hours</strong> with a personalized itinerary and pricing.</p>
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin:24px 0">
            <p style="margin:0;color:#166534;font-weight:600">✅ Your inquiry has been received</p>
            <p style="margin:8px 0 0;color:#166534;font-size:14px">We'll call you soon to discuss your dream holiday!</p>
          </div>
          <p style="color:#6b7280;font-size:14px">For urgent queries, reach us directly:</p>
          <p style="margin:8px 0"><a href="tel:${SITE_CONFIG.phone}" style="color:#0284c7;font-weight:600;text-decoration:none">📞 ${SITE_CONFIG.phone}</a></p>
          <p style="margin:8px 0"><a href="https://wa.me/${SITE_CONFIG.whatsapp}" style="color:#25D366;font-weight:600;text-decoration:none">💬 WhatsApp: +91 7383751218</a></p>
        </td></tr>
        <tr><td style="background:#f9fafb;padding:16px 32px;text-align:center;color:#9ca3af;font-size:12px">
          ${SITE_CONFIG.name} · ${SITE_CONFIG.address}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ── Also save to simple JSON store (no Supabase needed) ───────
async function saveInquiryLocally(data: Record<string, unknown>) {
  // Try Supabase first
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey && supabaseUrl !== "your_supabase_url") {
      const res = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
        method: "POST",
        headers: {
          "apikey": supabaseKey,
          "Authorization": `Bearer ${supabaseKey}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify(data),
      });
      if (res.ok) return;
    }
  } catch {}
  // If Supabase fails, log to console (Vercel logs)
  console.log("INQUIRY_DATA:", JSON.stringify(data));
}

// ── Main: submit inquiry ──────────────────────────────────────
export async function submitInquiry(formData: z.infer<typeof generalInquirySchema>) {
  try {
    const validated = generalInquirySchema.parse(formData);

    // Save to DB (Supabase if configured, else logs)
    await saveInquiryLocally({
      type: validated.type,
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      destination: validated.destination ?? null,
      package_id: validated.package_id ?? null,
      travel_date: validated.travel_date ?? null,
      num_travelers: validated.num_travelers ?? null,
      budget: validated.budget ?? null,
      message: validated.message,
      status: "new",
      admin_notes: null,
    });

    // Email to admin
    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `🌍 New Inquiry: ${validated.name} → ${validated.destination || "General"}`,
      html: adminEmailHtml(validated),
      replyTo: validated.email,
    });

    // Confirmation to customer
    await sendEmail({
      to: validated.email,
      subject: `Thank you for your inquiry — ${SITE_CONFIG.name}`,
      html: customerEmailHtml(validated.name, validated.destination),
    });

    return { success: true, message: "Inquiry submitted! We'll contact you within 24 hours." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message || "Please check your details." };
    }
    console.error("Inquiry error:", error);
    return { success: false, message: "Something went wrong. Please call us directly." };
  }
}

// ── Contact form submit ───────────────────────────────────────
export async function submitContact(formData: z.infer<typeof contactSchema>) {
  try {
    const validated = contactSchema.parse(formData);

    await saveInquiryLocally({
      type: "contact",
      name: validated.name,
      email: validated.email,
      phone: validated.phone,
      destination: null,
      message: `Subject: ${validated.subject}\n\n${validated.message}`,
      status: "new",
      admin_notes: null,
    });

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `📩 Contact Form: ${validated.subject} — ${validated.name}`,
      html: adminEmailHtml({
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        message: `Subject: ${validated.subject}\n\n${validated.message}`,
      }),
      replyTo: validated.email,
    });

    await sendEmail({
      to: validated.email,
      subject: `We got your message — ${SITE_CONFIG.name}`,
      html: customerEmailHtml(validated.name),
    });

    return { success: true, message: "Message sent! We'll reply within 24 hours." };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.issues[0]?.message || "Please check your details." };
    }
    return { success: false, message: "Something went wrong. Please call us directly." };
  }
}
