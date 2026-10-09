# Mizan app website

Static website for the Mizan iOS app. It includes:

- Arabic/English landing page
- Privacy policy
- Support and account deletion instructions
- AdMob `app-ads.txt`
- `/download`, the smart download link (see below)

## Smart download link

`https://mizan-app-site.pages.dev/download` is the one link to share. `functions/download.js` (a Cloudflare Pages Function, the only one, so no other route runs code) sends iPhones and iPads to the App Store and Android devices to Google Play with a temporary `302`, and serves `download.html` to everyone else: desktops, unknown devices and link-preview crawlers, which read its Open Graph tags. An inline script in `download.html` covers iPads that present themselves as desktop Safari. Keep the crawler pattern and store URLs in the two files identical. Nothing is logged or stored.

- Social preview image: `assets/mizan-og.jpg` (1200×630, the original app icon on navy)
- QR code for the link: `assets/download-qr.svg` (page) and `assets/download-qr.png` (print/share)

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Cloudflare Pages

- Framework preset: `None`
- Build command: `exit 0`
- Build output directory: `.`
- Root directory: `/`

After deployment, verify these public URLs:

- `/`
- `/privacy.html`
- `/support.html`
- `/app-ads.txt`
- `/download` (desktop: the landing page; iPhone/Android User-Agent: `302` to the store)

Use the deployed homepage as the App Store marketing/developer website, `/privacy.html` as the privacy policy URL, and `/support.html` as the support URL. Set the same homepage as the developer website in App Store Connect so AdMob can find `app-ads.txt` at the domain root.
