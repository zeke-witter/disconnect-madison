function formatDate(dateStr: string): string {
    const [datePart, timePart = ''] = dateStr.split('T');
    const [year, month, day] = datePart.split('-').map(Number);
    const [hour = 0, minute = 0] = timePart.split(':').map(Number);
    const MONTHS = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December'];
    const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    const weekday = DAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
    const h = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM';
    const mm = String(minute).padStart(2, '0');
    return `${weekday}, ${MONTHS[month - 1]} ${day}, ${year} at ${h}:${mm} ${ampm} CT`;
}

export function buildEventAnnouncementEmail(event: {
    id: string;
    title: string;
    date: string;
    location_name: string;
    location_address?: string | null;
    description?: string | null;
}, baseUrl: string): { subject: string; html: string; text: string } {
    const subject = `New event: ${event.title}`;
    const dateStr = formatDate(event.date);
    const locationStr = event.location_address
        ? `${event.location_name} — ${event.location_address}`
        : event.location_name;
    const eventUrl = `${baseUrl}/events/${event.id}`;

    const descExcerpt = event.description
        ? event.description.replace(/[#*_`[\]()]/g, '').replace(/\n+/g, ' ').substring(0, 280).trim()
        : '';
    const descTruncated = descExcerpt && event.description && event.description.length > 280
        ? `${descExcerpt}...`
        : descExcerpt;

    const text = [
        'Disconnect Madison',
        '',
        subject,
        '',
        dateStr,
        locationStr,
        ...(descTruncated ? ['', descTruncated] : []),
        '',
        `View event details: ${eventUrl}`,
        '',
        '---',
        "You're receiving this because you signed the Disconnect Madison pledge and opted in to updates.",
        'Unsubscribe: {{{unsubscribe}}}',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece3;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;max-width:600px;">
        <tr><td>
          <p style="font-size:20px;font-weight:bold;color:#1A7268;margin:0 0 28px 0;">Disconnect Madison</p>
          <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#91b0b6;margin:0 0 8px 0;">Upcoming event</p>
          <h1 style="font-size:28px;color:#1A1A1A;margin:0 0 12px 0;line-height:1.3;">${event.title}</h1>
          <p style="font-size:15px;color:#445D61;margin:0 0 4px 0;">${dateStr}</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 28px 0;">${locationStr}</p>
          ${descTruncated ? `<p style="font-size:15px;color:#1A1A1A;line-height:1.65;margin:0 0 32px 0;">${descTruncated}</p>` : ''}
          <table cellpadding="0" cellspacing="0" style="margin:0 0 36px 0;">
            <tr><td align="center" bgcolor="#8C3A2B" style="border-radius:6px;">
              <a href="${eventUrl}" style="display:inline-block;padding:14px 32px;font-size:16px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;background:#8C3A2B;">
                View event details
              </a>
            </td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px 0;">
          <p style="font-size:12px;color:#bbb;margin:0;line-height:1.6;">
            You&rsquo;re receiving this because you signed the Disconnect Madison pledge and opted in to updates.
            <br><a href="{{{unsubscribe}}}" style="color:#bbb;">Unsubscribe</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return { subject, html, text };
}

type RegistrationEmailParams = {
    name: string;
    eventTitle: string;
    eventDate: string;
    locationName: string;
    locationAddress: string | null;
    guestCount: number;
    waitlisted: boolean;
    cancelUrl: string;
};

export function buildRegistrationEmail(p: RegistrationEmailParams): { subject: string; html: string; text: string } {
    const dateStr = formatDate(p.eventDate);
    const locationStr = p.locationAddress ? `${p.locationName} — ${p.locationAddress}` : p.locationName;
    const attendeeStr = p.guestCount > 0 ? `you + ${p.guestCount} guest${p.guestCount > 1 ? 's' : ''}` : 'just you';
    const subject = p.waitlisted ? `Waitlist confirmation: ${p.eventTitle}` : `You're registered: ${p.eventTitle}`;

    const statusBlock = p.waitlisted
        ? `<p style="font-size:14px;font-weight:600;color:#8C3A2B;margin:0 0 20px 0;">You're on the waitlist. We'll email you right away if a spot opens up.</p>`
        : `<p style="font-size:14px;font-weight:600;color:#386641;margin:0 0 20px 0;">You're confirmed! See you there.</p>`;

    const text = [
        p.waitlisted ? `Waitlist confirmation: ${p.eventTitle}` : `You're registered: ${p.eventTitle}`,
        '',
        `Hi ${p.name},`,
        '',
        p.waitlisted
            ? `You're on the waitlist for ${p.eventTitle}. We'll email you if a spot opens up.`
            : `You're confirmed for ${p.eventTitle}!`,
        '',
        dateStr,
        locationStr,
        `Attendees: ${attendeeStr}`,
        '',
        `Need to cancel? ${p.cancelUrl}`,
        '',
        '---',
        'Disconnect Madison — disconnectmadison.org',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece3;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;max-width:600px;">
        <tr><td>
          <p style="font-size:20px;font-weight:bold;color:#1A7268;margin:0 0 28px 0;">Disconnect Madison</p>
          <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#91b0b6;margin:0 0 8px 0;">${p.waitlisted ? 'Waitlist confirmation' : 'Registration confirmed'}</p>
          <h1 style="font-size:28px;color:#1A1A1A;margin:0 0 12px 0;line-height:1.3;">${p.eventTitle}</h1>
          ${statusBlock}
          <p style="font-size:15px;color:#445D61;margin:0 0 4px 0;">${dateStr}</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 4px 0;">${locationStr}</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 28px 0;">Attendees: ${attendeeStr}</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 36px 0;">
            <tr><td align="center" bgcolor="#6A994E" style="border-radius:6px;">
              <a href="${p.cancelUrl}" style="display:inline-block;padding:12px 28px;font-size:14px;color:#ffffff;text-decoration:none;border-radius:6px;background:#6A994E;">
                Cancel my registration
              </a>
            </td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px 0;">
          <p style="font-size:12px;color:#bbb;margin:0;line-height:1.6;">
            Disconnect Madison &mdash; <a href="https://disconnectmadison.org" style="color:#bbb;">disconnectmadison.org</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return { subject, html, text };
}

type PromotionEmailParams = Omit<RegistrationEmailParams, 'waitlisted'>;

export function buildWaitlistPromotionEmail(p: PromotionEmailParams): { subject: string; html: string; text: string } {
    const dateStr = formatDate(p.eventDate);
    const locationStr = p.locationAddress ? `${p.locationName} — ${p.locationAddress}` : p.locationName;
    const attendeeStr = p.guestCount > 0 ? `you + ${p.guestCount} guest${p.guestCount > 1 ? 's' : ''}` : 'just you';
    const subject = `Good news! A spot opened up: ${p.eventTitle}`;

    const text = [
        subject,
        '',
        `Hi ${p.name},`,
        '',
        `A spot opened up for ${p.eventTitle} and you've been moved off the waitlist. You're confirmed!`,
        '',
        dateStr,
        locationStr,
        `Attendees: ${attendeeStr}`,
        '',
        `Need to cancel? ${p.cancelUrl}`,
        '',
        '---',
        'Disconnect Madison — disconnectmadison.org',
    ].join('\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece3;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;max-width:600px;">
        <tr><td>
          <p style="font-size:20px;font-weight:bold;color:#1A7268;margin:0 0 28px 0;">Disconnect Madison</p>
          <p style="font-size:13px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#91b0b6;margin:0 0 8px 0;">You're off the waitlist</p>
          <h1 style="font-size:28px;color:#1A1A1A;margin:0 0 12px 0;line-height:1.3;">${p.eventTitle}</h1>
          <p style="font-size:14px;font-weight:600;color:#386641;margin:0 0 20px 0;">A spot opened up and you're now confirmed!</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 4px 0;">${dateStr}</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 4px 0;">${locationStr}</p>
          <p style="font-size:15px;color:#445D61;margin:0 0 28px 0;">Attendees: ${attendeeStr}</p>
          <table cellpadding="0" cellspacing="0" style="margin:0 0 36px 0;">
            <tr><td align="center" bgcolor="#6A994E" style="border-radius:6px;">
              <a href="${p.cancelUrl}" style="display:inline-block;padding:12px 28px;font-size:14px;color:#ffffff;text-decoration:none;border-radius:6px;background:#6A994E;">
                Cancel my registration
              </a>
            </td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #eee;margin:0 0 20px 0;">
          <p style="font-size:12px;color:#bbb;margin:0;line-height:1.6;">
            Disconnect Madison &mdash; <a href="https://disconnectmadison.org" style="color:#bbb;">disconnectmadison.org</a>
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    return { subject, html, text };
}
