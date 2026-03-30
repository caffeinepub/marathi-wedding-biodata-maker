# लग्नसेतू — Full Website Language Switch

## Current State
Language selection (Marathi/Hindi/English/Kannada/Urdu) is only available in Step 0 of BiodataForm and only changes form labels. The LandingPage, Header, and Footer are all hardcoded in Marathi with no language switching.

## Requested Changes (Diff)

### Add
- A global `LanguageContext` (React context + localStorage persistence) providing `language` and `setLanguage` across all pages
- A language selector in the `Header` component (compact dropdown or pill-toggle showing all 5 languages: मराठी, हिंदी, English, ಕನ್ನಡ, اردو) visible on both landing page and form page
- Full translation strings for LandingPage, Header, Footer in all 5 languages
- `useSiteLanguage()` hook for consuming the global language context

### Modify
- `App.tsx`: Wrap app in `LanguageProvider`
- `Header.tsx`: Add language selector; use translated nav text
- `Footer.tsx`: Translate all text using global language
- `LandingPage.tsx`: Translate hero text, steps, testimonials, templates section, pricing section, CTA section
- `BiodataForm.tsx`: Read language from global context as default instead of local state (keep per-form override capability, but sync with global language on mount)

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/contexts/LanguageContext.tsx` with context, provider, and hook; 5 languages; localStorage persist
2. Create `src/frontend/src/i18n/siteTranslations.ts` with full translation map for all site-level text (LandingPage, Header, Footer) in all 5 languages
3. Update `App.tsx` to wrap with `LanguageProvider`
4. Update `Header.tsx`: import `useSiteLanguage`, show language toggle pills (small, 5 options), translate nav links and CTA button
5. Update `Footer.tsx`: import `useSiteLanguage`, translate all text
6. Update `LandingPage.tsx`: import `useSiteLanguage`, use translated strings for all visible text
7. Update `BiodataForm.tsx`: On Step 0 language change, also update global language context; on mount, initialize form language from global context
