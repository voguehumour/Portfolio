import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE } from "@/lib/content";

export const runtime = "nodejs";

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  budget?: string;
  message?: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: Body = {};
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim().slice(0, 200);
  const email = (body.email || "").trim().slice(0, 200);
  const subject = (body.subject || "Enquiry").trim().slice(0, 120);
  const budget = (body.budget || "").trim().slice(0, 60);
  const message = (body.message || "").trim().slice(0, 4000);

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <hello@animeshjaiswal.com>";

  if (!apiKey) {
    // Graceful dev fallback — log and pretend success so the UI flow works
    // eslint-disable-next-line no-console
    console.info("[contact] no RESEND_API_KEY set — message captured in logs only", {
      name,
      email,
      subject,
      budget,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const html = `
      <div style="font-family:Inter,system-ui,sans-serif;background:#050507;color:#f4f3ef;padding:32px 24px;">
        <div style="max-width:560px;margin:0 auto;">
          <div style="font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#8a8b96;">New enquiry · ${subject}</div>
          <h1 style="font-size:28px;margin:16px 0 8px;font-weight:600;">${name}</h1>
          <div style="color:#b4b5c0;margin-bottom:24px;">${email} · Budget ${budget || "—"}</div>
          <pre style="white-space:pre-wrap;font-family:inherit;font-size:15px;line-height:1.6;color:#f4f3ef;background:#0a0a0d;padding:20px;border-radius:12px;border:1px solid rgba(255,255,255,0.06);">${message.replace(/[<>]/g, "")}</pre>
        </div>
      </div>
    `;
    await resend.emails.send({
      from,
      to,
      subject: `[Portfolio] ${subject} · ${name}`,
      replyTo: email,
      html,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("[contact] resend error", e);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 500 });
  }
}
