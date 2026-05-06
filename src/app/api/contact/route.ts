// src/app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend lazily — avoids build crashes when the env var isn't set
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, phone, employees, message } = body;

    // 1. Validate the data
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required fields.' },
        { status: 400 }
      );
    }

    // 2. Check Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service is not configured. Please set the RESEND_API_KEY environment variable.' },
        { status: 500 }
      );
    }

    // 3. Send the email using Resend
    const data = await resend.emails.send({
      // The 'from' email MUST use the domain you verified in Resend (e.g., precision-pay.co.uk)
      from: 'Precision Pay Website <info@precision-pay.co.uk>', 
      
      // Where you want to receive the lead notifications
      to: ['info@precision-pay.co.uk'], 
      
      // FIX: Use camelCase 'replyTo' for the Resend Node SDK
      replyTo: email, 
      
      subject: `New Website Enquiry from ${name}`,
      
      // Formatted HTML output for your inbox
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #333;">New Enquiry from Precision Pay Website</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 10px 0;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Email:</td>
              <td style="padding: 10px 0;">
                <a href="mailto:${email}" style="color: #0066cc;">${email}</a>
              </td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Phone:</td>
              <td style="padding: 10px 0;">${phone || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Company:</td>
              <td style="padding: 10px 0;">${company || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #eee;">
              <td style="padding: 10px 0; font-weight: bold;">Employees:</td>
              <td style="padding: 10px 0;">${employees || 'Not specified'}</td>
            </tr>
          </table>
          
          <h3 style="margin-top: 30px; color: #333;">Message:</h3>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap;">
            ${message}
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}