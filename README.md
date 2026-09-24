# Mizan app website

Static website for the Mizan iOS app. It includes:

- Arabic/English landing page
- Privacy policy
- Support and account deletion instructions
- AdMob `app-ads.txt`

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Cloudflare Pages

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: `/`

After deployment, verify these public URLs:

- `/`
- `/privacy.html`
- `/support.html`
- `/app-ads.txt`

Use the deployed homepage as the App Store marketing/developer website, `/privacy.html` as the privacy policy URL, and `/support.html` as the support URL. Set the same homepage as the developer website in App Store Connect so AdMob can find `app-ads.txt` at the domain root.
