const buckets = globalThis.__contactRateBuckets ?? new Map();
globalThis.__contactRateBuckets = buckets;

/**
 * Basic in-memory limiter for contact endpoint.
 * Suitable for single-instance / low-volume personal sites.
 */
export function checkContactRateLimit(
  key,
  { max = 5, windowMs = 60_000 } = {}
) {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, resetAt: now + windowMs };
  }

  if (bucket.count >= max) {
    return { allowed: false, remaining: 0, resetAt: bucket.resetAt };
  }

  bucket.count += 1;
  buckets.set(key, bucket);

  return { allowed: true, remaining: max - bucket.count, resetAt: bucket.resetAt };
}

export async function verifyTurnstileToken(token, remoteIp) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: true, skipped: true };
  if (!token) return { ok: false, message: 'Missing Turnstile token.' };

  try {
    const body = new URLSearchParams();
    body.set('secret', secret);
    body.set('response', token);
    if (remoteIp) body.set('remoteip', remoteIp);

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body
      }
    );
    const result = await response.json();
    return { ok: Boolean(result.success), message: 'Turnstile verification failed.' };
  } catch {
    return { ok: false, message: 'Turnstile verification error.' };
  }
}

