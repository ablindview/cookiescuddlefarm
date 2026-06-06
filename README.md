# Cookie's Cuddle Farm & Sanctuary

Starter website for **Cookie's Cuddle Farm and Sanctuary** — a safe haven for rescued farm animals.

🌐 [cookiescuddlefarm.com](https://www.cookiescuddlefarm.com)
📧 [Info@cookiescuddlefarm.com](mailto:Info@cookiescuddlefarm.com)
📸 [@cookiescuddlefarm](https://www.instagram.com/cookiescuddlefarm)

---

## Project Structure

```
cookiescuddlefarm/
├── index.html          # Single-page site
├── css/
│   └── styles.css      # All styles (WCAG 2.1 AA)
├── js/
│   └── main.js         # Nav toggle, form validation, scroll spy
├── images/             # ← Add your photos here (see below)
└── README.md
```

## Adding Images

Replace the placeholder image paths in `index.html` and `images/` with real photos. Suggested files:

| File | Used for |
|---|---|
| `images/hero.jpg` | Hero background (recommend ≥1600px wide) |
| `images/about-farm.jpg` | About section |
| `images/visit-farm.jpg` | Visit section |
| `images/animal-1.jpg` | Goats card |
| `images/animal-2.jpg` | Pigs card |
| `images/animal-3.jpg` | Chickens card |
| `images/animal-4.jpg` | Rabbits card |
| `images/logo.png` | Site logo (transparent PNG, ~120×120px) |
| `images/favicon.ico` | Browser tab icon |
| `images/og-image.jpg` | Social share preview (1200×630px) |

Photos can be exported from the [Instagram](https://www.instagram.com/cookiescuddlefarm).

## Contact Form

The form currently shows a success message client-side. To actually receive messages, connect it to a form backend:

- **[Formspree](https://formspree.io)** — free tier, no server needed. Add `action="https://formspree.io/f/YOUR_ID"` to the `<form>` and remove `e.preventDefault()` in `main.js`.
- **[Netlify Forms](https://docs.netlify.com/forms/setup/)** — add `netlify` attribute to `<form>` if hosted on Netlify.

## Accessibility

- Semantic HTML5 landmarks and headings
- WCAG 2.1 AA color contrast throughout
- Skip-to-content link for keyboard users
- ARIA labels, `aria-live` regions, and `aria-invalid` on form fields
- `prefers-reduced-motion` respected in CSS
- All images have descriptive `alt` text

## Next Steps (suggested)

- [ ] Add real photos from Instagram
- [ ] Wire up contact form to Formspree or similar
- [ ] Add individual animal profile pages
- [ ] Set up Google Analytics or privacy-friendly alternative
- [ ] Connect custom domain `cookiescuddlefarm.com`
- [ ] Add donation payment integration (PayPal, Stripe)
