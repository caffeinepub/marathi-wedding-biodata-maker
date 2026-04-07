# lagnasetu - Step 2 Features

## Current State
- Font selector has 4 fonts: Laila, Hind, Noto Sans Devanagari, Mukta
- No font size option exists; all font sizes are hardcoded in templates
- No auto-complete on any form fields
- Design customize panel has color, border, photo frame, photo position

## Requested Changes (Diff)

### Add
- Font size selector: Small / Medium / Large (3 options) in Step 0 font panel
  - Applied to both form preview and PDF output
  - Small = 0.85x, Medium = 1.0x (default), Large = 1.15x scaling
- 2 new Marathi fonts: Baloo 2 (Devanagari), Tiro Devanagari
- Auto-complete for 3 fields in the form:
  - City/town field (Maharashtra major cities)
  - Education field (common degrees)
  - Occupation field (common professions)
- Font size state in FormState + DesignOptions
- `fontSize` prop passed to BiodataPreview and templates

### Modify
- Font selector in Step 0: expand from 4 to 6 fonts, add Baloo 2 and Tiro Devanagari
- Google Fonts useEffect: add new fonts to load list
- BiodataPreview: read fontSize from sessionStorage, apply CSS scale multiplier
- All 13 templates: apply fontSize multiplier at root div level
- Form contact/personal fields: add datalist/autocomplete suggestions

### Remove
- Nothing removed

## Implementation Plan
1. Add `fontSize: 'medium'` to DesignOptions interface and defaultState
2. Add Font Size selector UI in Step 0 (Small/Medium/Large buttons)
3. Add Baloo 2 and Tiro Devanagari to font list + Google Fonts loader
4. Save fontSize to sessionStorage when navigating to preview
5. In BiodataPreview, read fontSize and apply CSS `zoom` or `scale` multiplier to template root
6. Add auto-complete datalists for city, education, occupation fields in BiodataForm
7. Add font size labels to FORM_LABELS for all 4 languages
