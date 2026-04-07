# lagnasetu - Marathi Wedding Biodata Maker

## Current State
- 13 templates with religion/language-aware headers, footers, labels
- Form with photo upload/crop, sibling cards, extended family fields
- Languages: Marathi, Hindi, English, Kannada (Urdu/Muslim hidden)
- Religions: Hindu, Jain, Buddhist, Lingayat, Christian
- PDF download with watermark preview, Razorpay payment (₹49)
- Admin dashboard, coupon codes, QR code in PDF, auto-save, progress bar

## Requested Changes (Diff)

### Add
- **Background color / theme picker**: Panel in preview step with 12 preset color themes (saffron, rose, teal, purple, blue, green, maroon, gold, orange, indigo, brown, slate). Each theme changes the template header background color and accent colors.
- **Border style selector**: 4 options - single (default), double, dotted, floral (decorative unicode border). Applied to the biodata card outer border in preview and PDF.
- **Photo frame style**: 4 options - square (default), rounded, circle, decorative (double border frame). Applied to the photo in preview and PDF.
- **Photo position**: 3 options - right (default), left, top-center. Controls where the photo appears in the biodata layout.

### Modify
- BiodataForm.tsx: Add a new "Design Customize" panel at Step 0 (template selection step) below the template grid, with color theme picker, border style, photo frame style, photo position selectors.
- BiodataPreview.tsx: Apply the selected design customizations to the preview rendering and PDF generation.

### Remove
- Nothing removed

## Implementation Plan
1. Add `designOptions` state to BiodataForm: `{ colorTheme, borderStyle, photoFrame, photoPosition }`
2. Add Design Customize panel UI in Step 0 below template mini previews
3. Pass `designOptions` to BiodataPreview via existing data flow
4. In BiodataPreview, apply:
   - `colorTheme` to template header background and accent colors
   - `borderStyle` to the outer card border (CSS classes)
   - `photoFrame` to the photo element (border-radius, border style)
   - `photoPosition` to control flex layout of photo vs info columns
5. Apply same customizations in PDF generation (jsPDF/html2canvas)
