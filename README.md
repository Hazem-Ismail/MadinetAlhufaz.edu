# أكاديمية مدينة الحفاظ — ready for GitHub Pages

Upload every file in this folder directly to the root of your repository. Keep index.html at the root; do not upload a ZIP as the website.

In GitHub: Settings → Pages → Build and deployment → Deploy from a branch → select your branch (usually main) and /(root) → Save. Wait for GitHub to finish deployment, then open the URL shown in Pages settings.

Official instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

No npm, build command, server, or dependencies are needed. All website files are in this one flat folder. The hidden .nojekyll file is included; if your upload interface omits hidden files, create an empty file with that name in the repository.

The four HTML pages include styles and scripts. Shared images and fonts are separate cached assets. Quran narration data and Mushaf layouts are downloaded only when needed; the layout files contain 32 pages each. All files stay in one flat upload folder. Expired course promotions are excluded. The review section displays the eight testimonials supplied by the site owner.

CNAME is included for your supplied domain madinatalhuffaz.com (the filename must be CNAME, without .txt). Set the same custom domain in GitHub Pages settings and configure the domain DNS for GitHub Pages. Enable Enforce HTTPS once the certificate is ready. The domain will work only after DNS and Pages are configured. robots.txt, sitemap.xml, canonical links, social preview metadata, favicon.ico, PNG browser icon, Apple touch icon and correctly sized install icons are included.

Audio, tafsir and the licensed Madani glyph fonts need an internet connection. Font files are loaded from their pinned upstream source and cached by the browser; their license does not permit redistribution here. See LICENSE.txt. Quran data is bundled without editing the verses. The homepage is cached first. Other pages, text data and shared assets are cached as you visit them. Offline reading works only for previously loaded narration data, layouts and Madani fonts. Audio is not downloaded for offline use.

Golden background glows and the geometric hero seal animate normally and stop for reduced-motion preferences. Background effects pause when the page is hidden.

If replacing an older version, upload all these files together, close old site tabs and reopen so the updated offline cache activates. For future edits to cached files, change the CACHE name in sw.js.

Local preview requires an HTTP server; opening Quran HTML directly as file:// cannot load its JSON. This folder is the complete final upload, with no tests, development files or old revisions.
