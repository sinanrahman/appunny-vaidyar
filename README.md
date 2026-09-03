# Appunni Vaidyar Parvathy - Ayurjeeva Panchakarma Chikitsalaya

A production-ready, fully responsive premium Ayurveda website built with Next.js 15+, React 19, strict TypeScript, Tailwind CSS v4, GSAP, and Lenis.

## Installation and Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Copy `.env.example` to `.env.local` and configure your credentials:
   ```env
   GOOGLE_MAPS_API_KEY=your_actual_api_key
   GOOGLE_PLACE_ID=your_actual_place_id
   NEXT_PUBLIC_GOOGLE_MAPS_URL=https://maps.app.goo.gl/...
   APPOINTMENT_RECIPIENT_EMAIL=appointments@appunnivaidyar.com
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Asset Replacement

Currently, the project uses placeholder images referenced directly inside `public/images/`.

To replace these images:
1. Reference the **Asset Production List** inside your master brief.
2. Produce the AVIF/WebP assets according to the specifications.
3. Replace the existing files in `public/images/` without changing the filenames, OR update the image paths in the corresponding React components.
4. Replace `public/images/01_hero_reference.png` with the high-resolution hero asset.

### Image Sequence

The pinned canvas transformation sequence in `components/sections/TransformationSequence.tsx` is currently mocking the animation. Once you have the 90-140 image frames ready:
1. Place the desktop frames inside `public/sequence/desktop/` (e.g. `frame_0001.webp`).
2. Place the mobile frames inside `public/sequence/mobile/`.
3. Update the `render()` logic inside `TransformationSequence.tsx` to actually draw the images onto the canvas context.

## Content Completion

The following placeholder routes need real content before launch:
- `app/about/page.tsx`
- `app/approach/page.tsx`
- `app/contact/page.tsx`
- `app/faq/page.tsx`
- `app/practitioner/page.tsx`
- `app/privacy/page.tsx`
- `app/terms/page.tsx`
- `app/treatments/page.tsx`
- `app/treatments/[slug]/page.tsx` (Dynamic treatment content)
- `app/journal/page.tsx`
- `app/journal/[slug]/page.tsx` (Dynamic journal content)

Also, update the hidden statistics inside `components/sections/Heritage.tsx` when verified data is supplied.

## Build and Deployment

To build the production bundle:
```bash
npm run build
```

The output can be deployed securely to any Next.js compatible hosting platform like Vercel, Netlify, or a custom Node.js server. Ensure your `GOOGLE_MAPS_API_KEY` is set as an environment variable in your production environment securely (never prefix it with `NEXT_PUBLIC_`).
