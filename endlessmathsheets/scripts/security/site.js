// Security headers for endlessmathsheets.com, built from the pages themselves.
// The CSP starts in report-only mode: it logs what it would block but never
// blocks, so ads and analytics keep working while we watch the reports.
import { buildHeaders } from './policy.js';
import { inlineHashes } from './hash.js';

export function siteHeaders(htmlPages, { enforce = false } = {}) {
  const scripts = new Set();
  for (const html of htmlPages) for (const h of inlineHashes(html).scripts) scripts.add(h);
  return buildHeaders({
    preset: 'balanced', // our images (pins, og.png) may be shown by other sites
    services: ['google-adsense', 'cloudflare-web-analytics'],
    scriptHashes: [...scripts].sort(),
    // Inline style attributes are used throughout the worksheets; style injection is low risk.
    unsafeInlineStyles: true,
    extra: {
      // Google's consent message (GDPR) and ad-quality checks, used once AdSense is live.
      'script-src': ['https://fundingchoicesmessages.google.com'],
      'frame-src': ['https://fundingchoicesmessages.google.com'],
      'connect-src': ['https://fundingchoicesmessages.google.com'],
    },
    reportOnly: !enforce,
    reportUri: 'https://endlessmathsheets.com/csp-report',
  });
}

// RFC 9116. Regenerated on every build, so Expires never runs out while the site is deployed.
export function securityTxt(site) {
  const expires = new Date(Date.now() + 300 * 86400000).toISOString().replace(/\.\d{3}Z$/, 'Z');
  return `Contact: mailto:${site.contactEmail}\nExpires: ${expires}\nPreferred-Languages: en, ko\nCanonical: ${site.url}/.well-known/security.txt\n`;
}
