// Cloudflare Worker in front of the static files. Its only job: send
// www.endlessmathsheets.com to the bare domain with a permanent redirect, so
// search engines see one copy of every page. Everything else is a static file.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.endlessmathsheets.com') {
      url.hostname = 'endlessmathsheets.com';
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
