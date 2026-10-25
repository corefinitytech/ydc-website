# YDC Coffee Showcase

Next.js showcase site for YDC Coffee.

## What's included
- mascot-first animated loader
- responsive editorial homepage hero
- signature drinks showcase with custom generated imagery
- full menu page at `/menu`
- clean cream + cobalt design system

## Run locally
```bash
npm install
npm run dev
```

## V4 refinements
- Pinned horizontal Signature drink rail on desktop powered by GSAP ScrollTrigger.
- Native horizontal swipe rail on mobile, with reduced-motion fallback.
- Transparent mascot illustration in the cream intro, replacing the rectangular photographed background.
- Cleaned cup PNG and `object-fit: contain` to avoid distortion.
- Menu and all existing sections preserved.

The signature drink images are AI-generated visual concepts, not verified photographs of served menu items. Copy and prices should be checked against the café menu before publishing.

Run `npm install` and `npm run build` to verify the production bundle in your environment.
