// lib/email.ts
interface SendBookingEmailProps {
  name: string;
  email: string;
  date: string;
  time: string;
  meetingLink: string;
}

export async function sendBookingConfirmation(props: SendBookingEmailProps) {
  const response = await fetch('/api/send-booking-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(props),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to send email');
  }

  return response.json();
}