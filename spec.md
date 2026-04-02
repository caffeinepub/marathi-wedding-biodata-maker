# lagnasetu

## Current State
- 6 templates exist: क्लासिक, फुलांचा, राजेशाही, आधुनिक, श्रेष्ठ, दैवी
- Templates defined in BiodataPreview.tsx with a templateMap and _TEMPLATE_LIST
- All templates share BiodataContent component with ThemeConfig
- Template list shown in step 0 mini previews (color swatches) and in preview page tabs

## Requested Changes (Diff)

### Add
- **Template 7: पारंपारिक (Paramparik)** — Traditional saffron/turmeric gold style, thick decorative double-border frame, warm ochre/mustard color scheme (#B8860B dark goldenrod), classic Indian motif feel
- **Template 8: मनोहर (Manohar)** — Elegant teal/green nature-inspired design, two-tone header with name on colored background, clean modern-traditional fusion, (#1B6B5A deep green)
- **Template 9: सौंदर्य (Saundarya)** — Soft rose/blush pink feminine design with subtle floral accents, elegant typography, pastel rose theme (#C2185B deep rose / #FCE4EC blush bg)

### Modify
- `templateMap` — add 3 new entries
- `_TEMPLATE_LIST` — add 3 new entries with colors and names
- `LandingPage.tsx` — add new templates to the preview section (if templates are listed there)

### Remove
- Nothing removed

## Implementation Plan
1. Add ThemeConfig constants for each new template
2. Implement TemplateParmparik, TemplateManohar, TemplateSaundarya as React components (same props interface as existing templates)
3. Update templateMap and _TEMPLATE_LIST to include the 3 new templates
4. Each new template uses the shared BiodataContent component but with distinct header/footer/border styling
5. Check LandingPage.tsx for any hardcoded template list and update if needed
6. Validate and deploy
