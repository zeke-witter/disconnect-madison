'use server';

import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function submitPledgeAction(initialState: any, formData: FormData) {
    const pledgeAction = formData.get('pledgeAction[id]') as string;
    const email = formData.get('email') as string;

    if (!email || !pledgeAction) {
        return { success: false, message: 'Missing required info.' };
    }

    const { error } = await supabase
        .from('pledges')
        .insert({ pledge_action: pledgeAction, email });

    if (error) {
        console.error('Supabase insert error:', error);
        if (error.code === '23505') {
            return { success: false, message: 'You have already made this pledge.' };
        }
        return { success: false, message: 'Something went wrong. Please try again.' };
    }

    revalidatePath('/');

    return { success: true, message: 'Thank you for taking the pledge!' };
}

export async function addNewsArticleAction(initialState: any, formData: FormData) {
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
        .limit(12);

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

export async function getPledgesAction() {
    const { data, error } = await supabase
        .from('pledges')
        .select('pledge_action');

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
