# lagnasetu - Wedding Biodata Maker

## Current State
- Multi-step form with religion, language, font selection in Step 0
- 6 templates: classic, floral, rajeshahi, aadhunik, shreshtha, daivi
- All templates have hardcoded '॥ श्री गणेशाय नमः ॥' blessing
- Form labels are all in Marathi regardless of language selection
- QR code generated from phone/email using qrcode library, passed as qrDataUrl to templates
- Payment modal (Dialog) with coupon code support; when coupon makes price 0, modal closes then window.print() called
- PDF is generated via window.print() with @media print CSS

## Requested Changes (Diff)

### Add
- `getReligionBlessing(religion)` function returning religion-specific blessing text:
  - हिंदू: "॥ श्री गणेशाय नमः ॥"
  - जैन: "॥ णमो अरिहंताणं ॥"
  - बौद्ध: "॥ नमो बुद्धाय ॥"
  - लिंगायत: "॥ ओम नमः शिवाय ॥"
  - ख्रिश्चन: "✝ God Bless ✝"
  - मुस्लीम: "॥ बिस्मिल्लाह ॥"
- `FORM_LABELS` translation object in BiodataForm.tsx for marathi/hindi/english for all form field labels
- Print CSS rule: `[role="dialog"] { display: none !important; }` to prevent coupon/payment modal from showing in PDF

### Modify
- BiodataPreview.tsx: All 6 templates receive `religion` prop (from `data.personal.religion`) and show dynamic blessing text
- BiodataForm.tsx: All form field labels use FORM_LABELS based on selected language (form.language). The `FL` component takes a `langKey` and the translation object. OPTIONAL_FIELDS labels also update per language.
- BiodataPreview.tsx: The `qrDataUrl` img should NOT have any class that causes it to be hidden during print. Ensure it renders during window.print(). Also move QR code outside the columns layout so it's always visible.
- PaymentModal.tsx / index.css: Add `@media print { [role="dialog"], .radix-dialog-overlay { display: none !important; } }` to prevent coupon box showing in PDF

### Remove
- Hardcoded "॥ श्री गणेशाय नमः ॥" text from all 6 templates (replaced with dynamic blessing)

## Implementation Plan

1. **BiodataPreview.tsx**:
   - Add `getReligionBlessing(religion: string): string` function at top
   - Add `religion` to template component props (all 6 templates + templateMap types)
   - In each of the 6 template components, replace hardcoded blessing span with `{getReligionBlessing(data.personal.religion || 'हिंदू')}`
   - In BiodataPreview main component, pass `religion` (from `data.personal.religion`) to `TemplateToRender`
   - Ensure QR code renders in print (no class hiding it)

2. **BiodataForm.tsx**:
   - Add `FORM_LABELS` with marathi/hindi/english translations for all field labels
   - Add step title translations for Hindi/English (STEP_TITLES should also translate)
   - Modify `FL` component to accept language prop and render the correct label text
   - Update all `<FL mr="..." en="...">` usages to use `FORM_LABELS[form.language].key` as the primary label
   - When language is 'marathi', show Marathi as primary; when 'hindi', Hindi as primary; when 'english', English only
   - Also translate OPTIONAL_FIELDS labels per language
   - Translate 'पुढे'/'मागे' navigation buttons, add/remove sibling labels, etc.
   - Input placeholders should also update per language

3. **index.css**:
   - In `@media print` block, add rule to hide radix dialog: `[data-radix-dialog-overlay], [data-radix-dialog-content], [role="dialog"] { display: none !important; }`
