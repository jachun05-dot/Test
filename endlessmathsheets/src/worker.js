// Cloudflare Worker in front of the static files:
// 1. sends www.endlessmathsheets.com to the bare domain (301), so search
//    engines see one copy of every page;
// 2. adds the security headers built by scripts/build.js to every response;
// 3. accepts CSP violation reports at /csp-report and logs them.
import HEADERS from './generated-headers.js';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.endlessmathsheets.com') {
      url.hostname = 'endlessmathsheets.com';
      return Response.redirect(url.toString(), 301);
    }
    if (url.pathname === '/csp-report') return cspReport(request);
    const upstream = await env.ASSETS.fetch(request);
    const response = new Response(upstream.body, upstream);
    for (const [name, value] of Object.entries(HEADERS)) response.headers.set(name, value);
    return response;
  },
};

async function cspReport(request) {
  if (request.method !== 'POST') return new Response('POST only', { status: 405 });
  const body = await request.text();
  if (body.length > 32768) return new Response('Too large', { status: 413 });
  try {
    const data = JSON.parse(body);
    for (const item of Array.isArray(data) ? data : [data]) {
      const r = item['csp-report'] || item.body || {};
      const blocked = r['blocked-uri'] || r.blockedURL || '';
      if (/^(chrome|moz|safari|safari-web)-extension:/.test(blocked)) continue;
      console.log(JSON.stringify({ csp: r['effective-directive'] || r.effectiveDirective || r['violated-directive'], blocked, page: r['document-uri'] || r.documentURL }));
    }
  } catch {
    // not JSON: ignore
  }
  return new Response(null, { status: 204 });
}
