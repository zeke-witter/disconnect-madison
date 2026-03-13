/**
 * One-time backfill script: submit existing news articles (missing archived_url)
 * to the Wayback Machine and store the resulting archive URL in the DB.
 *
 * Usage (staging):
 *   npx tsx --env-file=.env.local scripts/backfill-wayback.ts
 *
 * Usage (production):
 *   npx tsx --env-file=.env.production scripts/backfill-wayback.ts
 *
 * Only processes rows where archived_url IS NULL, so it is safe to re-run —
 * successfully archived rows are skipped automatically.
 * Adds a 3-second pause between requests to be polite to the Wayback Machine.
 */

import { createClient } from '@supabase/supabase-js';
import * as readline from 'readline';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SECRET_KEY in environment.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function confirm(question: string): Promise<boolean> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim().toLowerCase() === 'y');
        });
    });
}

async function archiveUrl(url: string): Promise<string | null> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    try {
        // GET with redirect:follow — the Wayback Machine redirects to the archived copy
        const response = await fetch(`https://web.archive.org/save/${url}`, {
            redirect: 'follow',
            headers: { 'User-Agent': 'DisconnectMadison/1.0 (disconnectmadison.org)' },
            signal: controller.signal,
        });
        clearTimeout(timeout);

        // After following redirects, the response URL is the archive URL
        if (response.url.includes('web.archive.org/web/')) {
            return response.url;
        }

        // Fallback: Content-Location header (some responses include it)
        const contentLocation = response.headers.get('Content-Location');
        if (contentLocation) {
            return contentLocation.startsWith('http')
                ? contentLocation
                : `https://web.archive.org${contentLocation}`;
        }

        return null;
    } catch {
        clearTimeout(timeout);
        return null;
    }
}

async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    console.log(`Database: ${supabaseUrl}\n`);

    const ok = await confirm('Archive unarchived articles in this database? (y/N) ');
    if (!ok) {
        console.log('Aborted.');
        process.exit(0);
    }

    const { data: articles, error } = await supabase
        .from('news_articles')
        .select('id, url, title')
        .is('archived_url', null)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Failed to fetch articles:', error.message);
        process.exit(1);
    }

    if (!articles || articles.length === 0) {
        console.log('\nNothing to backfill — all articles already have archive URLs.');
        return;
    }

    console.log(`\nBackfilling ${articles.length} article(s)...\n`);

    let succeeded = 0;
    let failed = 0;

    for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
        console.log(`[${i + 1}/${articles.length}] ${article.title}`);

        const archivedUrl = await archiveUrl(article.url);

        if (archivedUrl) {
            const { error: updateError } = await supabase
                .from('news_articles')
                .update({ archived_url: archivedUrl })
                .eq('id', article.id);

            if (updateError) {
                console.log(`  ✗ DB update failed: ${updateError.message}`);
                failed++;
            } else {
                console.log(`  ✓ ${archivedUrl}`);
                succeeded++;
            }
        } else {
            console.log(`  ✗ No archive URL returned — skipping`);
            failed++;
        }

        if (i < articles.length - 1) {
            await sleep(3000);
        }
    }

    console.log(`\nDone. ${succeeded} archived, ${failed} failed.`);
    if (failed > 0) {
        console.log('Re-run to retry failed articles — already-archived rows are skipped.');
    }
}

main();
