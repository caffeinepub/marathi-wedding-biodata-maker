# Marathi Wedding Biodata Maker

## Current State
- 4-step biodata form (personal, family, horoscope, contact)
- Template selection in last step
- Payment via Razorpay at download time
- BiodataPreview with print/download
- Fake placeholder phone number '+91 98765 43210'
- Browser print headers showing Caffeine URL on each page

## Requested Changes (Diff)

### Add
- Plan selection as Step 0 (before form filling) showing ₹20/₹50/₹90 plans
- Field toggle panel in each form step (add/remove optional fields)
- @page print CSS to suppress browser header/footer URL

### Modify
- BiodataForm: add plan selection step, field visibility toggles
- BiodataPreview: remove fake phone number from DEFAULT data, fix print styles
- index.css: add @media print with @page { margin: 0 } to suppress browser URL header/footer
- Phone placeholder: change to neutral 'उदा. 9876543210'

### Remove
- Fake phone number '+91 98765 43210' from DEFAULT and placeholder
- Caffeine URL appearing in PDF via browser print headers

## Implementation Plan
1. Update index.css with @media print styles to suppress browser URL header/footer
2. Update BiodataForm.tsx: add plan selection as step 0, add optional field toggles per section
3. Update BiodataPreview.tsx: remove fake phone, add print-clean class, pass hidden fields to PDF render
4. Plan selection saves to sessionStorage, gates template access
