# Marathi Wedding Biodata Maker

## Current State
The app has 8 template design functions in BiodataPreview.tsx (TemplateTraditional, TemplateModern, TemplateRoyal, TemplateFloral, TemplateElegant, TemplateDivine, TemplateVibrant, TemplateShubh). BiodataForm.tsx has a template selection UI (grid of 8 template thumbnails) and TEMPLATES_LIST array. PLANS have template arrays linked to plan tiers.

## Requested Changes (Diff)

### Add
- Single clean professional biodata layout (TemplateSingle) that replaces all 8
- Layout: white background, elegant maroon/gold color accents, clear sections with Devanagari headings, photo area, all biodata fields displayed neatly in 2-column grid rows

### Modify
- BiodataPreview.tsx: Replace all 8 template functions + renderTemplate switch with one single TemplateSingle component
- BiodataForm.tsx: Remove TEMPLATES_LIST, remove template selection UI from Contact & Photo step, remove template field from FormState (set template to "single" always), remove Lock import if unused, update PLANS to remove templates arrays and template-related features text

### Remove
- All 8 template design functions
- Template selection grid UI in form
- Template-related plan features text

## Implementation Plan
1. Rewrite BiodataPreview.tsx: keep all data handling, PDF/JPG download, replace all template functions with one TemplateSingle
2. Update BiodataForm.tsx: remove TEMPLATES_LIST, remove template selection section, simplify PLANS features
