import { Resend } from 'resend';

import EmailTemplate from '../../../components/EmailTemplate';
import {
  checkContactRateLimit,
  verifyTurnstileToken
} from '../../../lib/contact-security';

function getResend() {
  const key = process.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export async function POST(request) {
  const resend = getResend();
  if (!resend) {
    return Response.json(
      { message: 'Contact form is not configured (missing RESEND_API_KEY).' },
      { status: 503 }
    );
  }

  let data;
  try {
    data = await request.json();
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }

  const ipHeader = request.headers.get('x-forwarded-for') || '';
  const ip = ipHeader.split(',')[0]?.trim() || 'unknown';

  // Basic anti-spam honey field. Bots often fill hidden fields.
  if (data.website) {
    return Response.json({ message: 'Spam detected.' }, { status: 400 });
  }

  if (!data?.name || !data?.email || !data?.message) {
    return Response.json({ message: 'Missing required fields.' }, { status: 400 });
  }

  if (String(data.message).length > 5000) {
    return Response.json({ message: 'Message is too long.' }, { status: 400 });
  }

  const rate = checkContactRateLimit(`contact:${ip}`, {
    max: 5,
    windowMs: 60_000
  });
  if (!rate.allowed) {
    return Response.json(
      { message: 'Too many requests. Please try again shortly.' },
      { status: 429 }
    );
  }

  const turnstile = await verifyTurnstileToken(data.turnstileToken, ip);
  if (!turnstile.ok) {
    return Response.json({ message: turnstile.message }, { status: 400 });
  }

  const emailTemplate = <EmailTemplate {...data} />;

  try {
    const { error } = await resend.emails.send({
      from: 'nikitadesale.com <website@nikitadesale.com>',
      to: process.env.RESEND_DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `${data.name} - via nikitadesale.com`,
      react: emailTemplate
    });

    if (error) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: 'Email sent' });
  } catch (e) {
    return Response.json({ message: e.message }, { status: 500 });
  }
}
