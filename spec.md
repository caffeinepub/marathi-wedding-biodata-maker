# lagnasetu

## Current State
- Marathi Wedding Biodata Maker with 6 templates, multi-religion, multi-language support
- Languages: Marathi, Hindi, English, Kannada, Urdu
- Religions: Hindu, Jain, Lingayat, Buddhist, Christian, Muslim
- BiodataForm.tsx handles multi-step form
- BiodataPreview.tsx handles preview and PDF
- siteTranslations.ts has all i18n strings

## Requested Changes (Diff)

### Add
- Photo crop/adjust UI after photo upload in form (step 1)
- Mini template preview thumbnails in step 0 when selecting templates
- काका/मामा/आत्या/पाहुणे field labels should be religion-aware (e.g., Muslim: चाचा/मामू/फुफी/मेहमान, Christian: Uncle/Maternal Uncle/Aunt/Guest)

### Modify
- Default language on first load must always be Marathi (not system/browser language)
- Template caste label: Muslim → "बिरादरी", Christian → "Denomination", Buddhist → "समाज", Hindu/Jain/Lingayat → "जात" — this must appear correctly in TEMPLATES (BiodataPreview) not just form
- मांगलिक preview: show "होय" when true, "नाही" when false (not true/false)
- Gotra field: show only for Hindu/Jain/Lingayat, hide for Muslim/Christian/Buddhist (both in form AND in template preview)

### Remove
- Nothing removed

## Implementation Plan
1. Fix default language to Marathi on first load (localStorage fallback to 'mr')
2. Fix caste label in ALL 6 template renderers in BiodataPreview.tsx to use religion-aware label (same logic as form)
3. Fix मांगलिक display: replace true/false with होय/नाही (language-aware: yes/no in English, हाँ/नहीं in Hindi etc.)
4. Fix Gotra field visibility in templates — hide for Muslim/Christian/Buddhist
5. Add religion-aware labels for काका/मामा/आत्या/पाहुणे fields in form and templates
6. Add photo crop UI (canvas-based simple crop tool after upload)
7. Add mini template preview thumbnails in step 0
