// The smart download link, https://mizan-app-site.pages.dev/download.
//
// iPhones, iPads and Android devices (phones, tablets, foldables) get a temporary 302 straight to
// their store, so a destination can change later without browsers having cached it. Everyone else
// gets the landing page (download.html): desktops, unknown devices, and every link-preview or
// search crawler, which needs the page's Open Graph tags rather than a redirect. Crawlers are
// matched first because some of them (iMessage's preview fetcher, Google's smartphone crawler)
// also carry iPhone or Android tokens. iPads that present themselves as desktop Safari send no
// iPad token at all; the page's own script catches those.
//
// Nothing about the visitor is logged, stored or forwarded; the query string is ignored.
// Keep the patterns and store URLs in sync with the inline script in download.html.

const APP_STORE_URL = 'https://apps.apple.com/us/app/id6815504183';
const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=com.faisal.Mizan';

const CRAWLER = /bot\/\d|crawler|spider|facebookexternalhit|facebookcatalog|Facebot|meta-externalagent|WhatsApp\/|TelegramBot|Twitterbot|Slackbot|Discordbot|LinkedInBot|SkypeUriPreview|Snap URL Preview|kakaotalk-scrap|Embedly|Iframely|vkShare|redditbot|Pinterest\/0\.|Bluesky|Mastodon\/|BingPreview|AdsBot-Google|Storebot-Google|Mediapartners-Google|Google-InspectionTool|GoogleOther|Applebot/i;

function storeFor(userAgent) {
  if (CRAWLER.test(userAgent) || /Windows Phone/i.test(userAgent)) return null;
  if (/iPhone|iPad|iPod/.test(userAgent)) return APP_STORE_URL;
  if (/Android/i.test(userAgent)) return GOOGLE_PLAY_URL;
  return null;
}

export async function onRequest(context) {
  const store = storeFor(context.request.headers.get('User-Agent') || '');
  if (store) {
    return new Response(null, {
      status: 302,
      headers: { Location: store, 'Cache-Control': 'no-store', Vary: 'User-Agent' },
    });
  }
  // The landing page itself, served by Pages from download.html. The answer depends on the
  // User-Agent, so nothing along the way may cache it for someone else.
  const page = await context.next();
  const response = new Response(page.body, page);
  response.headers.set('Cache-Control', 'no-store');
  response.headers.append('Vary', 'User-Agent');
  return response;
}
