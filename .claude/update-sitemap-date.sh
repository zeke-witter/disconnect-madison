#!/usr/bin/env bash
# Updates the lastModified date in sitemap.ts when a page.tsx is edited.
# Reads Claude Code PostToolUse JSON from stdin.

FILE=$(jq -r '.tool_input.file_path // empty' 2>/dev/null)
[ -z "$FILE" ] && exit 0

# Only process page.tsx files under app/
[[ "$FILE" =~ .*/app(.*/)?page\.tsx$ ]] || exit 0

SITEMAP_PATH="/Users/zekey/git/disconnect-madison/app/sitemap.ts"
[ -f "$SITEMAP_PATH" ] || exit 0

# Extract route, e.g. app/learn/kids/page.tsx -> /learn/kids (empty for root)
ROUTE=$(echo "$FILE" | sed 's|.*/app||' | sed 's|/page\.tsx$||')
TODAY=$(date +%Y-%m-%d)

SITEMAP_PATH="$SITEMAP_PATH" ROUTE="$ROUTE" TODAY="$TODAY" \
  python3 /Users/zekey/git/disconnect-madison/.claude/update-sitemap-date.py
