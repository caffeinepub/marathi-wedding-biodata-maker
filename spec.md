# lagnasetu - Marathi Wedding Biodata Maker

## Current State

A fully working Marathi wedding biodata maker web app at lagnasetu.caffeine.xyz. Features:
- 6 biodata templates (क्लासिक, फुलांचा, राजेशाही, आधुनिक, श्रेष्ठ, दैवी)
- Multi-religion support (Hindu, Jain, Buddhist, Lingayat, Christian; Muslim/Urdu hidden)
- Multi-language support (Marathi, Hindi, English, Kannada)
- Religion/language-aware form labels, blessings, footers
- Photo upload with crop/adjust
- Structured sibling fields + मामा/काका/आत्या/पाहुणे fields
- Razorpay payment (₹49) before PDF download
- Coupon codes (LAGNA10, WELCOME20, FIRST49, NEWUSER)
- Watermark on preview (white for dark templates)
- QR code in PDF
- Step navigation (1-5) and edit-after-preview
- Mini template previews in step 0
- Font selection (Laila, Hind, Noto Sans Devanagari, Mukta)
- Single-page A4 PDF output

## Requested Changes (Diff)

### Add
1. **Logo + Favicon** — Professional lagnasetu logo (maroon/gold, Devanagari wedding motif). Use as app logo in Header and as favicon.
2. **Landing page improvements** — More attractive hero with bigger CTA button, trust signals (number of biodatas created badge), and a more polished overall look.
3. **Admin dashboard page** (/admin route) — Shows: total orders count, total revenue (₹), popular templates (bar/count), recent orders list (name, template, amount, date). Data stored in localStorage (no backend needed — for single admin use).
4. **Form auto-save** — As user fills form, save progress to localStorage every few seconds. On page load, if saved data exists, show "आपला अर्धवट भरलेला बायोडाटा सापडला. पुन्हा सुरू करायचे का?" prompt. On PDF download success, clear saved data.
5. **Marathi error messages** — Required field validation in Marathi/language-aware. Show error text below each required field when empty on Next click. Field highlight with red border.
6. **Progress bar** — Visual horizontal progress bar at top of form steps, showing completion % (step 1 = 20%, step 2 = 40%, etc. up to step 5 = 100%). Animate on step change.
7. **About/Contact page** (/about route) — Simple page with: app description, contact email (help@lagnasetu.in), "Made with ❤️ for Maharashtra" message. Link from footer.
8. **Testimonials section improvement** — Landing page testimonials already exist but add star ratings display more prominently, and add a count badge like "५०० हून अधिक बायोडाटा तयार झाले" near the hero section.

### Modify
- Header: Add logo image (once generated) replacing text-only app name
- Footer: Add link to /about page
- App.tsx: Add /admin and /about routes
- LandingPage: Add trust badge ("५०० हून अधिक बायोडाटा") near hero CTA
- BiodataForm: Add auto-save logic + progress bar + Marathi validation errors
- PaymentModal/BiodataPreview: On successful payment+download, record order to localStorage for admin dashboard

### Remove
- Nothing removed

## Implementation Plan

1. Generate logo image asset (maroon/gold, Devanagari style, transparent background, 200x200px)
2. Add /admin route with AdminDashboard component — reads from localStorage key `lagnasetu_orders`
3. Add /about route with AboutPage component
4. Update App.tsx with new routes
5. Add logo to Header component
6. Add favicon reference
7. Update BiodataForm: localStorage auto-save (debounced), resume prompt, progress bar at top, Marathi validation messages
8. Update BiodataPreview/PaymentModal: on download success, push order object to localStorage `lagnasetu_orders`
9. Update LandingPage: trust badge near hero, slightly larger CTA button
10. Update Footer: add About link
11. Validate and fix any TypeScript errors
