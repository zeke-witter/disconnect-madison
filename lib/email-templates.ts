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
}, baseUrl: string): { subject: string; html: string } {
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

    return { subject, html };
}
