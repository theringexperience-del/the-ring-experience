const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const GOOGLE_SHEETS_SCOPE = 'https://www.googleapis.com/auth/spreadsheets';
const RESEND_API_URL = 'https://api.resend.com/emails';

const textResponse = (payload, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json; charset=UTF-8' },
  });

const toBase64Url = (input) =>
  btoa(input).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');

const utf8ToBase64Url = (obj) => toBase64Url(JSON.stringify(obj));

const pemToArrayBuffer = (pem) => {
  const clean = pem.replace(/-----BEGIN PRIVATE KEY-----|-----END PRIVATE KEY-----|\s+/g, '');
  const binary = atob(clean);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
};

async function createGoogleAccessToken(clientEmail, privateKeyRaw) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'RS256', typ: 'JWT' };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_TOKEN_URL,
    iat: now,
    exp: now + 3600,
  };

  const unsignedToken = `${utf8ToBase64Url(header)}.${utf8ToBase64Url(payload)}`;
  const privateKey = privateKeyRaw.replace(/\\n/g, '\n');

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    pemToArrayBuffer(privateKey),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(unsignedToken)
  );
  const signatureBinary = String.fromCharCode(...new Uint8Array(signatureBuffer));
  const signedJwt = `${unsignedToken}.${toBase64Url(signatureBinary)}`;

  const tokenResponse = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt,
    }),
  });

  if (!tokenResponse.ok) {
    const detail = await tokenResponse.text();
    throw new Error(`google_token_failed:${detail}`);
  }

  const tokenPayload = await tokenResponse.json();
  return tokenPayload.access_token;
}

async function appendLeadToSheet(env, leadData) {
  const clientEmail = env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = env.GOOGLE_SHEETS_PRIVATE_KEY;
  const spreadsheetId = env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const range = env.GOOGLE_SHEETS_RANGE || 'Sheet1!A:I';

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return { skipped: true };
  }

  const accessToken = await createGoogleAccessToken(clientEmail, privateKey);
  const emailValue = leadData.email || '';
  const phoneValue = leadData.phone || '';

  const row = [
    leadData.submittedAt || new Date().toISOString(),
    leadData.source || '',
    leadData.packageName || '',
    leadData.name || '',
    emailValue,
    phoneValue,
    leadData.preferredDate || '',
    leadData.message || '',
    String(Boolean(leadData.newsletterConsent)),
  ];

  const appendUrl = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(
    spreadsheetId
  )}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const appendResponse = await fetch(appendUrl, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${accessToken}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!appendResponse.ok) {
    const detail = await appendResponse.text();
    throw new Error(`google_sheets_append_failed:${detail}`);
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getLeadSummaryHtml(leadData) {
  const fields = [
    ['Submitted at', leadData.submittedAt || new Date().toISOString()],
    ['Source', leadData.source || 'website'],
    ['Package', leadData.packageName || '-'],
    ['Name', leadData.name || '-'],
    ['Email', leadData.email || '-'],
    ['Phone', leadData.phone || '-'],
    ['Preferred date', leadData.preferredDate || '-'],
    ['Newsletter consent', leadData.newsletterConsent ? 'Yes' : 'No'],
    ['Message', leadData.message || '-'],
  ];

  const rows = fields
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e7dccd;font-weight:600;">${escapeHtml(
          label
        )}</td><td style="padding:8px 12px;border:1px solid #e7dccd;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<div style="font-family:Georgia,serif;color:#4c3926;">
    <h2 style="margin:0 0 16px;">New website inquiry</h2>
    <table style="border-collapse:collapse;width:100%;max-width:720px;background:#fffdf9;">${rows}</table>
  </div>`;
}

function buildLeadSubject(leadData) {
  const customerName = (leadData.name || '').trim() || 'A client';
  const packageName = (leadData.packageName || '').trim();

  if (packageName) {
    return `${customerName} wants to book ${packageName}`;
  }

  return `${customerName} sent an inquiry`;
}

async function sendLeadEmail(env, leadData) {
  const resendApiKey = env.RESEND_API_KEY;
  const recipientEmail = env.RESEND_TO_EMAIL || env.LEAD_NOTIFICATION_EMAIL || leadData.recipientEmail || '';
  const fromEmail = env.RESEND_FROM_EMAIL;
  const replyToEmail = leadData.email || undefined;
  const subject = buildLeadSubject(leadData);

  if (!resendApiKey || !recipientEmail || !fromEmail) {
    return { skipped: true };
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${resendApiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [recipientEmail],
      reply_to: replyToEmail ? [replyToEmail] : undefined,
      subject,
      html: getLeadSummaryHtml(leadData),
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`resend_send_failed:${detail}`);
  }

  return response.json();
}

export async function onRequestPost(context) {
  try {
    const leadData = await context.request.json();

    if (!leadData?.name || !leadData?.email) {
      return textResponse({ ok: false, error: 'missing_required_fields' }, 400);
    }

    const deliveryResults = await Promise.allSettled([
      appendLeadToSheet(context.env, leadData),
      sendLeadEmail(context.env, leadData),
    ]);

    const hasSuccess = deliveryResults.some((result) => result.status === 'fulfilled' && result.value?.skipped !== true);
    const allSkipped = deliveryResults.every((result) => result.status === 'fulfilled' && result.value?.skipped === true);

    if (allSkipped) {
      return textResponse({ ok: false, error: 'no_delivery_channel_configured' }, 500);
    }

    if (!hasSuccess) {
      const firstFailure = deliveryResults.find((result) => result.status === 'rejected');
      throw firstFailure?.reason || new Error('lead_delivery_failed');
    }

    return textResponse({ ok: true });
  } catch (error) {
    return textResponse(
      { ok: false, error: error instanceof Error ? error.message : 'unknown_error' },
      500
    );
  }
}
