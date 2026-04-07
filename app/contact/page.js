'use client';

import React from 'react';
import Script from 'next/script';

import { Box } from '../../components/Box';
import Toast from '../../components/Toast';
import Base from '../../layouts/Base';
import { SITE_NAME } from '../../lib/site';

export default function Contact() {
  const description = `<strong>I read every message</strong> — engineers, founders, students, and collaborators are all welcome. I may not reply instantly, but I do my best to respond when I can.`;
  const [isEmailSent, setIsEmailSent] = React.useState(undefined);
  const [showToast, setShowToast] = React.useState(false);
  const [toastError, setToastError] = React.useState('');
  const [turnstileToken, setTurnstileToken] = React.useState('');
  const turnstileRef = React.useRef(null);
  const widgetIdRef = React.useRef(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  React.useEffect(() => {
    if (!siteKey || !window.turnstile || !turnstileRef.current) return;
    if (widgetIdRef.current) return;

    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      callback: (token) => setTurnstileToken(token),
      'expired-callback': () => setTurnstileToken('')
    });
  }, [siteKey]);

  const onSendEmail = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
          website: e.target.website.value,
          turnstileToken
        })
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.message || 'Failed to send email.');
      }

      setIsEmailSent(true);
      setToastError('');
      setShowToast(true);
      if (window.turnstile && widgetIdRef.current !== null) {
        window.turnstile.reset(widgetIdRef.current);
      }
      setTurnstileToken('');
    } catch (e) {
      console.error(e);
      setIsEmailSent(false);
      setToastError(e.message || 'Something wrong happened. Try again later.');
      setShowToast(true);
    }
  };

  return (
    <Base
      title={`Contact // ${SITE_NAME}`}
      tagline="Say hello."
      primaryColor="cyan"
      secondaryColor="green"
    >
      <Box>
        {siteKey ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
        ) : null}
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Send me an email</h2>
        <form onSubmit={onSendEmail} className="flex max-w-100 flex-col">
          <div className="mb-2.5 flex flex-col">
            <label
              htmlFor="name"
              className="text-secondary text-xs font-medium uppercase"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="James Bond"
              required
              className="border-secondary text-primary focus:border-cyan rounded-lg border bg-transparent p-2.5 focus:outline-none"
            />
          </div>
          <div className="mb-2.5 flex flex-col">
            <label
              htmlFor="email"
              className="text-secondary text-xs font-medium uppercase"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="james@bond.com"
              required
              className="border-secondary text-primary focus:border-cyan rounded-lg border bg-transparent p-2.5 focus:outline-none"
            />
          </div>
          <div className="mb-2.5 flex flex-col">
            <label htmlFor="website" className="sr-only">
              Website
            </label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
            />
            <label
              htmlFor="message"
              className="text-secondary text-xs font-medium uppercase"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="How can I help you?"
              rows="4"
              required
              className="border-secondary text-primary focus:border-cyan rounded-lg border bg-transparent p-2.5 focus:outline-none"
            />
          </div>
          {siteKey ? (
            <div className="mb-2.5">
              <div ref={turnstileRef} />
            </div>
          ) : null}
          <div className="mb-2.5 flex flex-col">
            <button
              type="submit"
              className="text-background hover:border-cyan hover:text-cyan focus:border-cyan focus:text-cyan mt-1.25 cursor-pointer rounded-lg border border-white bg-white p-2.5 transition-all duration-200 ease-in-out hover:bg-transparent focus:bg-transparent focus:outline-none"
            >
              Send
            </button>
          </div>
        </form>
        <Toast
          title={isEmailSent ? 'Email sent :D' : 'Error :('}
          description={
            isEmailSent
              ? 'Thanks for taking the time to write it.'
              : toastError || 'Something wrong happened. Try again later.'
          }
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </Base>
  );
}
