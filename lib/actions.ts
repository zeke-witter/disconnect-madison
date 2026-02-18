'use server';

import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';
import { createServerAuthClient } from '@/lib/supabase-auth';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { error } = await supabase
        .from('pledges')
        .insert({ pledge_action: pledgeAction, email, confirmed: false, verification_token: verificationToken });

    if (error) {
        console.error('Supabase insert error:', error);
        if (error.code === '23505') {
            return { success: false, message: 'You have already confirmed this pledge.' };
        }
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const verifyUrl = `${baseUrl}/verify?token=${verificationToken}`;

    const { error: emailError } = await resend.emails.send({
        from: 'Disconnect Society <noreply@disconnectsociety.org>',
        to: email,
        subject: 'Confirm your pledge — Disconnect Society',
        text: `Thanks for pledging to disconnect!\n\nPlease confirm your pledge by clicking the link below:\n\n${verifyUrl}\n\nIf you didn't make this pledge, you can safely ignore this email.`,
    });

    if (emailError) {
        console.error('Resend error:', emailError);
    }

    return { success: true, message: 'Please check your email to confirm your pledge.' };
}

export async function addNewsArticleAction(initialState: any, formData: FormData) {
    const authClient = await createServerAuthClient();
    const { data: { user } } = await authClient.auth.getUser();
    if (!user) {
        return { success: false, message: 'Unauthorized.' };
    }

    const url = formData.get('url') as string;

    if (!url) {
        return { success: false, message: 'Please enter a URL.' };
    }

    let title = url;
    let imageUrl: string | null = null;

    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'bot' },
            redirect: 'follow',
        });
        const html = await res.text();

        const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)
            ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:title["']/i);
        if (ogTitle) title = ogTitle[1];
        else {
            const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            if (titleTag) title = titleTag[1].trim();
        }

        const ogImage = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
            ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
        if (ogImage) imageUrl = ogImage[1];
    } catch {
        // If fetch fails, we still insert with the URL as the title
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

    revalidatePath('/');

    return { success: true, message: `Added: ${title}` };
}

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

export async function submitContactAction(initialState: any, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { success: false, message: 'Please fill out all fields.' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address.' };
    }

    const { error } = await resend.emails.send({
        from: 'Disconnect Society <noreply@disconnectsociety.org>',
        to: process.env.CONTACT_EMAIL!,
        replyTo: email,
        subject: `Contact form: ${name}`,
        text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) {
        console.error('Resend error:', error);
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    return { success: true, message: 'Message sent. Thank you for reaching out.' };
}

export async function verifyPledgeAction(token: string) {
    if (!token) {
        return { success: false, message: 'Invalid verification link.' };
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

    return { success: true, message: 'Your pledge has been confirmed. Thank you for disconnecting!' };
}

export async function getPledgesAction() {
    const { data, error } = await supabase
        .from('pledges')
        .select('pledge_action')
        .eq('confirmed', true);

    if (error) {
        return { reduce_screen_time: 0, take_a_break: 0, quit_for_good: 0 };
    }

    const counts = { reduce_screen_time: 0, take_a_break: 0, quit_for_good: 0 };
    for (const row of data) {
        if (row.pledge_action === 'reduce_screen_time') counts.reduce_screen_time++;
        if (row.pledge_action === 'take_a_break') counts.take_a_break++;
        if (row.pledge_action === 'quit_for_good') counts.quit_for_good++;
    }

    return counts;
}
