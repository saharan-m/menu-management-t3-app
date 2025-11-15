// src/server/auth.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function sendOTPEmail(email: string, code: string): Promise<void> {
  try {
    console.log("📧 Attempting to send OTP email to:", email);
    console.log("🔑 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);

    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set in environment variables");
    }

    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your Digital Menu System Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Digital Menu System</h2>
          <p>Your verification code is:</p>
          <div style="font-size: 32px; font-weight: bold; color: #4f46e5; text-align: center; padding: 20px; background: #f3f4f6; border-radius: 8px; margin: 20px 0; letter-spacing: 5px;">
            ${code}
          </div>
          <p>This code expires in 15 minutes.</p>
          <p>If you didn't request this code, you can ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ Email sent successfully:", response);
  } catch (error) {
    console.error("❌ Failed to send OTP email:", error);
    throw error;
  }
}
