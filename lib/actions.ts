'use server';

import { revalidatePath, unstable_noStore as noStore } from 'next/cache';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { createServerAuthClient } from '@/lib/supabase-auth';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Decode HTML entities in a string (e.g. &#039; → ', &amp; → &).
 * Handles named entities, decimal numeric entities, and hex numeric entities.
 */
function decodeHtmlEntities(str: string): string {
    return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&nbsp;/g, ' ')
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([0-9a-fA-F]+);/g, (_, code) => String.fromCharCode(parseInt(code, 16)));
}

/**
 * Server action: submit a new pledge.
 *
 * Validates the honeypot field, Turnstile token, email, and pledge type, then
 * inserts an unconfirmed pledge row and sends a verification email via Resend.
 * Any existing unconfirmed pledge for the same email + action is deleted first
 * so the user can re-submit without hitting a unique constraint. The optional
 * `newsletter_opt_in` field is stored as-is for future use.
 */
export async function submitPledgeAction(initialState: any, formData: FormData) {
    // Honeypot check — bots fill hidden fields, real users don't
    const honeypot = formData.get('website') as string;
    if (honeypot) {
        return { success: true, message: 'Please check your email to confirm your pledge.' };
    }

    const pledgeAction = formData.get('pledgeAction[id]') as string;
    const email = formData.get('email') as string;

    if (!email || !pledgeAction) {
        return { success: false, message: 'Missing required info.' };
    }

    const validPledgeActions = ['reduce_screen_time', 'take_a_break', 'quit_for_good'] as const;
    if (!(validPledgeActions as readonly string[]).includes(pledgeAction)) {
        return { success: false, message: 'Invalid pledge type.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    // Remove any unconfirmed duplicate so the user can re-submit
    await supabase
        .from('pledges')
        .delete()
        .eq('email', email)
        .eq('pledge_action', pledgeAction)
        .eq('confirmed', false);

    const verificationToken = crypto.randomUUID();
    const newsletterOptIn = formData.get('newsletter_opt_in') === 'true';

    const { error } = await supabase
        .from('pledges')
        .insert({ pledge_action: pledgeAction, email, confirmed: false, verification_token: verificationToken, newsletter_opt_in: newsletterOptIn });

    if (error) {
        console.error('Supabase insert error:', error);
        if (error.code === '23505') {
            return { success: false, message: 'You have already confirmed this pledge.' };
        }
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
        ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
    const verifyUrl = `${baseUrl}/verify?token=${verificationToken}`;

    const { error: emailError } = await resend.emails.send({
        from: 'Disconnect Madison <hello@disconnectmadison.org>',
        to: email,
        subject: 'One step left: confirm your pledge',
        html: buildVerificationEmail(pledgeAction as typeof validPledgeActions[number], verifyUrl),
        text: `Thanks for pledging to disconnect.\n\nPlease confirm your pledge by clicking the link below:\n\n${verifyUrl}\n\nIf you didn't make this pledge, you can safely ignore this email. Your address will not be used for any other purpose.`,
    });

    if (emailError) {
        console.error('Resend error:', emailError);
    }

    return { success: true, message: 'Please check your email to confirm your pledge.', email };
}

const PLEDGE_LABELS: Record<string, string> = {
    reduce_screen_time: 'reduce your screen time',
    take_a_break: 'step away and deactivate one or more accounts',
    quit_for_good: 'permanently delete one or more accounts',
};

function buildVerificationEmail(pledgeAction: string, verifyUrl: string): string {
    const pledgeLabel = PLEDGE_LABELS[pledgeAction] ?? 'disconnect from social media';
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f0ece3;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ece3;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;padding:40px;max-width:600px;">
        <tr><td>
          <p style="font-size:20px;font-weight:bold;color:#1A7268;margin:0 0 24px 0;">Disconnect Madison</p>
          <h1 style="font-size:26px;color:#1A1A1A;margin:0 0 16px 0;">You pledged to ${pledgeLabel}.</h1>
          <p style="font-size:16px;color:#445D61;line-height:1.6;margin:0 0 32px 0;">
            That&rsquo;s a real step. Click the button below to lock in your pledge and make it official.
            It won&rsquo;t count until you confirm.
          </p>
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 32px auto;">
            <tr><td align="center" bgcolor="#8C3A2B" style="border-radius:6px;">
              <a href="${verifyUrl}" style="display:inline-block;padding:16px 36px;font-size:18px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;background:#8C3A2B;">
                Confirm my pledge
              </a>
            </td></tr>
          </table>
          <p style="font-size:13px;color:#888;margin:0 0 6px 0;">Button not working? Paste this link into your browser:</p>
          <p style="font-size:12px;color:#888;word-break:break-all;margin:0 0 32px 0;">${verifyUrl}</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0;">
          <p style="font-size:12px;color:#bbb;margin:0;line-height:1.5;">
            If you didn&rsquo;t make this pledge, you can safely ignore this email.
            Your address will not be used for any other purpose.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

/**
 * Server action: resend the verification email for an unconfirmed pledge.
 *
 * Looks up the most recent unconfirmed pledge row for the given email address
 * and resends the verification email. Returns a generic success message whether
 * or not a matching pledge was found (to avoid leaking whether an address is in
 * the database).
 */
export async function resendVerificationAction(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { success: false, message: 'Missing email address.' };
    }

    const { data } = await supabase
        .from('pledges')
        .select('verification_token, pledge_action')
        .eq('email', email)
        .eq('confirmed', false)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (data?.verification_token) {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
            ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        const verifyUrl = `${baseUrl}/verify?token=${data.verification_token}`;

        await resend.emails.send({
            from: 'Disconnect Madison <hello@disconnectmadison.org>',
            to: email,
            subject: 'One step left: confirm your pledge',
            html: buildVerificationEmail(data.pledge_action, verifyUrl),
            text: `Here is your confirmation link:\n\n${verifyUrl}\n\nIf you didn't make this pledge, you can safely ignore this email.`,
        });
    }

    return { success: true, message: 'Sent. Check your inbox (and spam folder) for a new confirmation link.' };
}

/**
 * Server action: add a news article (admin only).
 *
 * Requires an authenticated Supabase session. Fetches the target URL to extract
 * the og:title and og:image meta tags, then inserts the article into the
 * news_articles table. Fails if the fetch errors or no og:image is found.
 * Revalidates the home page cache after a successful insert.
 */
export async function addNewsArticleAction(initialState: any, formData: FormData) {
    const authClient = await createServerAuthClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
        return { success: false, message: 'Unauthorized.' };
    }

    const url = formData.get('url') as string;
    const manualTitle = formData.get('manualTitle') as string | null;
    const manualImageUrl = formData.get('manualImageUrl') as string | null;

    if (!url) {
        return { success: false, message: 'Please enter a URL.' };
    }

    let title = url;
    let imageUrl: string | null = null;

    if (manualTitle && manualImageUrl) {
        title = manualTitle;
        imageUrl = manualImageUrl;
    } else {
        try {
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Accept': 'text/html,application/xhtml+xml,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language': 'en-US,en;q=0.5',
                },
                redirect: 'follow',
            });
            const html = await res.text();

            const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
                ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
            if (ogTitle) title = decodeHtmlEntities(ogTitle[1]);
            else {
                const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);
                if (titleTag) title = decodeHtmlEntities(titleTag[1].trim());
            }

            const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
                ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
            if (ogImage) imageUrl = ogImage[1];
        } catch (err) {
            console.error('Article fetch error:', err);
            return { success: false, needsManual: true, url, title: '', message: 'Could not fetch the article automatically. Enter the title and image URL manually.' };
        }

        if (!imageUrl) {
            return { success: false, needsManual: true, url, title, message: 'No preview image found. Enter the image URL manually.' };
        }
    }

    const { error } = await supabase
        .from('news_articles')
        .insert({ url, title, image_url: imageUrl });

    if (error) {
        console.error('Supabase insert error:', error);
        if (error.code === '23505') {
            return { success: false, message: 'This article has already been added.' };
        }
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    // Submit to Wayback Machine — non-blocking, failure is acceptable
    let archivedUrl: string | null = null;
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const archiveRes = await fetch(`https://web.archive.org/save/${url}`, {
            method: 'POST',
            headers: { 'User-Agent': 'DisconnectMadison/1.0 (disconnectmadison.org)' },
            signal: controller.signal,
        });
        clearTimeout(timeout);
        const contentLocation = archiveRes.headers.get('Content-Location');
        if (contentLocation) {
            archivedUrl = `https://web.archive.org${contentLocation}`;
            await supabase.from('news_articles').update({ archived_url: archivedUrl }).eq('url', url);
        }
    } catch (err) {
        console.warn('Wayback Machine archive failed (non-fatal):', err);
    }

    revalidatePath('/');
    revalidatePath('/news');

    return { success: true, message: `Added: ${title}${archivedUrl ? ' — archived.' : ' — archive pending or failed.'}` };
}

/**
 * Server action: fetch the ten most recent news articles, ordered by
 * creation date descending.
 *
 * Returns an empty array on any Supabase error.
 */
export async function getNewsArticlesAction() {
    const { data, error } = await supabase
        .from('news_articles')
        .select('id, url, title, image_url, created_at')
        .order('created_at', { ascending: false })
        .limit(10);

    if (error) {
        console.error('Supabase fetch error:', error);
        return [];
    }

    return data;
}

/**
 * Server action: submit the contact form.
 *
 * Validates the Turnstile token, required fields, and email format, then sends
 * the message to CONTACT_EMAIL via Resend with the sender's address set as
 * reply-to.
 */
export async function submitContactAction(initialState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, message: 'Please fill out all fields.' };
    }

    if (name.length > 100 || email.length > 254 || message.length > 5000) {
        return { success: false, message: 'One or more fields exceed the maximum allowed length.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    // Strip CR/LF from name before it's interpolated into the email subject line
    const safeName = name.replace(/[\r\n]/g, ' ').trim();

    const { error } = await resend.emails.send({
        from: 'Disconnect Madison <hello@disconnectmadison.org>',
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: `Contact form: ${safeName}`,
        text: `From: ${safeName} (${email})\n\n${message}`,
    });

    if (error) {
        console.error('Resend error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    return { success: true, message: 'Message sent. Thank you for reaching out.' };
}

/**
 * Server action: record how a pledger heard about the project.
 *
 * Updates the referral_source column on the pledge row matching the given
 * verification token. Silently no-ops on invalid input — this is optional
 * data and should never surface an error to the user.
 */
export async function submitReferralAction(token: string, source: string, otherText?: string) {
    const validSources = ['word_of_mouth', 'flyer', 'social_media', 'web_search', 'other'];
    if (!token || !validSources.includes(source)) return;

    const value = source === 'other' ? (otherText || 'other') : source;

    await supabase
        .from('pledges')
        .update({ referral_source: value })
        .eq('verification_token', token);
}

/**
 * Server action: confirm a pledge via the emailed verification token.
 *
 * Marks the matching unconfirmed pledge row as confirmed. Returns an error if
 * the token is empty, already used, or not found.
 *
 * In non-production environments the following dummy tokens bypass Supabase so
 * you can preview both UI states without going through the full email flow:
 *   /verify?token=dev-reduce   → success (reduce_screen_time)
 *   /verify?token=dev-break    → success (take_a_break)
 *   /verify?token=dev-quit     → success (quit_for_good)
 *   /verify?token=dev-fail     → failure
 */
export async function verifyPledgeAction(token: string) {
    if (!token) {
        return { success: false, message: 'Invalid verification link.' };
    }

    if (process.env.VERCEL_ENV !== 'production') {
        const devTokens: Record<string, { success: true; message: string; pledgeAction: string } | { success: false; message: string }> = {
            'dev-reduce': { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!', pledgeAction: 'reduce_screen_time' },
            'dev-break': { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!', pledgeAction: 'take_a_break' },
            'dev-quit': { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!', pledgeAction: 'quit_for_good' },
            'dev-fail': { success: false, message: 'This link is invalid or your pledge has already been confirmed.' },
        };
        if (token in devTokens) return devTokens[token];
    }

    const { data, error } = await supabase
        .from('pledges')
        .update({ confirmed: true })
        .eq('verification_token', token)
        .eq('confirmed', false)
        .select();

    if (error) {
        console.error('Supabase update error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    if (!data || data.length === 0) {
        return { success: false, message: 'This link is invalid or your pledge has already been confirmed.' };
    }

    return { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!', pledgeAction: data[0].pledge_action as string };
}

/**
 * Server action: fetch confirmed pledge counts grouped by pledge type.
 *
 * Returns `{ reduce_screen_time, take_a_break, quit_for_good }` with all
 * counts set to zero on any Supabase error.
 */
export async function getPledgesAction() {
    noStore();
    const { data, error } = await supabase
        .from('pledges')
        .select('pledge_action')
        .eq('confirmed', true);

    if (error) {
        console.error('getPledgesAction error:', error);
        return { reduce_screen_time: 0, take_a_break: 0, quit_for_good: 0 };
    }

    console.log('getPledgesAction: confirmed pledge rows returned:', data.length);

    const counts = { reduce_screen_time: 0, take_a_break: 0, quit_for_good: 0 };
    for (const row of data) {
        if (row.pledge_action === 'reduce_screen_time') counts.reduce_screen_time++;
        if (row.pledge_action === 'take_a_break') counts.take_a_break++;
        if (row.pledge_action === 'quit_for_good') counts.quit_for_good++;
    }

    return counts;
}

/**
 * Dev/staging only: fetch all pledge rows for the /dev management page.
 * Returns an empty array in production.
 */
export async function getAllPledgesAction() {

    const { data, error } = await supabase
        .from('pledges')
        .select('id, email, pledge_action, confirmed, created_at')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('getAllPledgesAction error:', error);
        return [];
    }

    return data;
}

/**
 * Dev/staging only: delete a single pledge row by id.
 * No-ops in production.
 */
export async function deletePledgeAction(formData: FormData) {
    if (process.env.VERCEL_ENV) return;
    const id = formData.get('id') as string;
    await supabase.from('pledges').delete().eq('id', id);
    revalidatePath('/dev');
}

/**
 * Dev/staging only: delete all pledge rows.
 * No-ops in production.
 */
export async function deleteAllPledgesAction() {
    if (process.env.VERCEL_ENV) return;
    await supabase.from('pledges').delete().in('confirmed', [true, false]);
    revalidatePath('/dev');
}

/**
 * Public: fetch all news articles for the archive page, ordered newest first.
 */
export async function getAllNewsArticlesAction() {
    const { data, error } = await supabase
        .from('news_articles')
        .select('id, url, title, image_url, created_at, archived_url')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('getAllNewsArticlesAction error:', error);
        return [];
    }

    return data;
}

/**
 * Dev/staging only: delete a single news article row by id.
 * No-ops in production.
 */
export async function deleteNewsArticleAction(formData: FormData) {
    if (process.env.VERCEL_ENV) return;
    const id = formData.get('id') as string;
    await supabase.from('news_articles').delete().eq('id', id);
    revalidatePath('/dev');
    revalidatePath('/');
}

/**
 * Dev/staging only: delete all news article rows.
 * No-ops in production.
 */
export async function deleteAllNewsArticlesAction() {
    if (process.env.VERCEL_ENV) return;
    await supabase.from('news_articles').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    revalidatePath('/dev');
    revalidatePath('/');
}
