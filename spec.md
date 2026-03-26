# lagnasetu - Marathi Wedding Biodata Maker

## Current State
- 6 templates available for ₹49 via Razorpay
- Multi-step form (5 steps): template selection, personal info, family info, horoscope, contact
- Religion field exists as a plain text input in personal info (step 1)
- Language is always Marathi; no language selection UI
- No font selection option
- No QR code in PDF output
- No coupon/discount code system
- PDF is single-page A4, watermarked preview before payment

## Requested Changes (Diff)

### Add
1. **Religion selection dropdown** in Step 0 (template selection step) or at the top of Step 1 with 6 options: हिंदू, जैन, बौद्ध, लिंगायत, ख्रिश्चन, मुस्लीम
2. **Religion-based conditional fields**: 
   - हिंदू/जैन/लिंगायत: show गोत्र, राशी, नक्षत्र, मांगलिक fields
   - बौद्ध: hide गोत्र, hide कुंडली (horoscope) step or show minimal fields, show पंथ field
   - ख्रिश्चन: hide गोत्र, hide कुंडली, show denomination field
   - मुस्लीम: hide गोत्र, hide कुंडली, show पंथ (सुन्नी/शिया) field
3. **Language selection**: UI option (Marathi/Hindi/English) that switches form labels and PDF output language. Store selected language in state and pass to preview/PDF.
4. **Font selection**: Dropdown in Step 0 to choose from 3-4 Devanagari-friendly fonts (e.g., Laila, Hind, Noto Sans Devanagari, Mukta). Apply selected font to PDF output.
5. **QR Code in PDF**: In BiodataPreview, when generating PDF, include a small QR code (using a CDN-loaded QR library or canvas-based approach) that encodes the contact phone number or a short vCard string. Position it in a corner of the biodata.
6. **Coupon code system**: In PaymentModal, add a coupon code input field. Hardcode a few valid coupon codes (e.g., LAGNA10 = 10% off, WELCOME20 = 20% off, FIRST50 = ₹50 off). On applying a valid code, reduce the displayed amount and pass discounted amount to Razorpay order amount.

### Modify
- Step 0 (template selection): Add religion dropdown, language toggle (मराठी/हिंदी/English), and font selector above or alongside template grid
- BiodataForm: Religion field in personal info should be a Select (not text input) matching the 6 religions. Conditionally show/hide horoscope-related fields based on selected religion.
- BiodataPreview: Accept language and font props from sessionStorage; render PDF labels in selected language; apply selected font; add QR code.
- PaymentModal: Add coupon input + Apply button, show discount, update final amount.

### Remove
- Religion as free-text input (replace with dropdown)

## Implementation Plan
1. Add `religion`, `language`, `selectedFont` to form state (defaulting to हिंदू, मराठी, default font)
2. In Step 0, add religion dropdown, language toggle buttons, font selector
3. In Step 1, change religion field from Input to Select, conditionally hide गोत्र/मांगलिक based on religion
4. In Step 3 (horoscope), hide entire step or show minimal fields if religion is बौद्ध/ख्रिश्चन/मुस्लीम
5. Pass language + font to sessionStorage, read in BiodataPreview
6. In BiodataPreview, create a translation map for field labels (Marathi/Hindi/English), apply font via inline style
7. Add QR code generation (use `qrcode` npm package or a simple canvas QR) in PDF output
8. In PaymentModal, add coupon code input with hardcoded valid codes, compute discount, update Razorpay amount
