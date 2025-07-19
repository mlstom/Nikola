// app/api/send-email/route.js
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  const { to, subject, text, html } = await request.json();

  const transporter = nodemailer.createTransport({
    host: process.env.ZOHO_HOST,
    port:   Number(process.env.ZOHO_PORT),
    secure: process.env.ZOHO_SECURE === 'true',
    auth: {
      user: process.env.ZOHO_USER,
      pass: process.env.ZOHO_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.EMAIL_FROM_NAME}" <info@alatinidza.rs>`,
      to:`${to}, porudzbine@alatinidza.rs`,
      subject,
      text,
      html,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Mail error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
