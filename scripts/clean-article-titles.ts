/**
 * One-time cleanup script: find news_articles rows where the title contains
 * HTML entities (e.g. &#039; &amp; &lt;) and decode them in-place.
 *
 * Usage (staging):
 *   npx tsx --env-file=.env.local scripts/clean-article-titles.ts
 *
 * Usage (production):
 *   npx tsx --env-file=.env.production scripts/clean-article-titles.ts
 *
 * Safe to re-run — rows that are already clean produce no diff and are skipped.
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

async function confirm(question: string): Promise<boolean> {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    return new Promise(resolve => {
        rl.question(question, answer => {
            rl.close();
            resolve(answer.trim().toLowerCase() === 'y');
        });
    });
}

async function main() {
    console.log(`Database: ${supabaseUrl}\n`);

    const ok = await confirm('Clean HTML entities from article titles in this database? (y/N) ');
    if (!ok) {
        console.log('Aborted.');
        process.exit(0);
    }

    const { data: articles, error } = await supabase
        .from('news_articles')
        .select('id, title')
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Failed to fetch articles:', error.message);
        process.exit(1);
    }

    if (!articles || articles.length === 0) {
        console.log('\nNo articles found.');
        return;
    }

    const dirty = articles.filter(a => {
        const decoded = decodeHtmlEntities(a.title);
        return decoded !== a.title;
    });

    if (dirty.length === 0) {
        console.log('\nNothing to clean — all titles look good.');
        return;
    }

    console.log(`\nFound ${dirty.length} article(s) with HTML entities:\n`);
    for (const article of dirty) {
        console.log(`  Before: ${article.title}`);
        console.log(`  After:  ${decodeHtmlEntities(article.title)}\n`);
    }

    const proceed = await confirm(`Update ${dirty.length} row(s)? (y/N) `);
    if (!proceed) {
        console.log('Aborted.');
        process.exit(0);
    }

    let succeeded = 0;
    let failed = 0;

    for (const article of dirty) {
        const cleaned = decodeHtmlEntities(article.title);
        const { error: updateError } = await supabase
            .from('news_articles')
            .update({ title: cleaned })
            .eq('id', article.id);

        if (updateError) {
            console.log(`  ✗ [${article.id}] ${updateError.message}`);
            failed++;
        } else {
            console.log(`  ✓ ${cleaned}`);
            succeeded++;
        }
    }

    console.log(`\nDone. ${succeeded} updated, ${failed} failed.`);
}

main();
