import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import BookingConfirmationEmail from '@/emails/BookingConfirmation';

export async function POST(request: Request) {
  try {
    console.log('📧 Email API called');
    
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await request.json();
    console.log('📦 Request body:', body);

    const { name, email, date, time, meetingLink } = body;

    if (!name || !email || !date || !time || !meetingLink) {
      console.error('❌ Missing required fields');
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    console.log('📤 Sending email to:', email);

    const { data, error } = await resend.emails.send({
      from: 'Deon Jose <onboarding@resend.dev>',
      to: [email],
      subject: 'Your Call with Deon Jose is Confirmed! 🎉',
      react: BookingConfirmationEmail({
        name,
        email,
        date,
        time,
        meetingLink,
      }),
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.log('✅ Email sent successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('❌ Internal server error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}