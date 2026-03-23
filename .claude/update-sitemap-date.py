#!/usr/bin/env python3
"""Updates the lastModified date in sitemap.ts when a page.tsx is edited.
Called from the update-sitemap-date.sh hook with ROUTE, TODAY, SITEMAP_PATH env vars.
"""
import re
import os

route = os.environ["ROUTE"]
today = os.environ["TODAY"]
sitemap = os.environ["SITEMAP_PATH"]

with open(sitemap, "r") as f:
    content = f.read()

bt = "`"

if route == "":
    pattern = r"(url: baseUrl,\s+lastModified: new Date\(')[0-9-]+'(\))"
else:
    escaped = re.escape(route)
    pattern = r"(url: " + bt + r"\$\{baseUrl\}" + escaped + bt + r",\s+lastModified: new Date\(')[0-9-]+'(\))"

new_content, count = re.subn(pattern, r"\g<1>" + today + r"'\2", content)

if count > 0:
    with open(sitemap, "w") as f:
        f.write(new_content)
