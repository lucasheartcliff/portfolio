# Plan: Add Spanish, Italian, French, German, Chinese, Russian, and Japanese

Goal: extend the site from `en`/`pt` to nine locales — `en`, `pt`, `es`, `it`, `fr`, `de`, `zh`, `ru`, `ja` — using the existing next-i18next + locale-prefixed-route architecture, with no new i18n framework or routing model.

> **Update:** the plumbing (config, translation scaffolding, switcher redesign, Meta locale fix) has since shipped for all nine locales, including a follow-up extending the original `es`/`it`/`fr`/`de` batch with `zh` (Simplified Chinese), `ru` (Russian), and `ja` (Japanese). The sections below are kept as originally written for the first four locales; the additions applied the same pattern one-for-one — see the "Chinese, Russian, Japanese" callouts inline.

## 1. Locale codes

Use plain ISO 639-1 codes to match the existing `en`/`pt` convention (no region suffixes): `es`, `it`, `fr`, `de`, and later `zh` (Simplified Chinese — no region suffix; a `zh-Hant` variant for Traditional Chinese would be a separate future locale, not addressed here), `ru`, `ja`. This also matches the locale map already present (and unused beyond moment.js) in `src/utils/index.ts:61-77`, which already had `es`, `it`, `fr`, `de`, `ja`, `zh` entries before this work started — a sign most of these codes were anticipated; `ru` was the one gap, added alongside the new locale.

## 2. Config

- `next-i18next.config.js`: add `'es'`, `'it'`, `'fr'`, `'de'` to `i18n.locales`. `defaultLocale` stays `'en'`.
- No other config changes needed — `getStaticPaths`/`getI18nPaths` (`src/utils/getStatic.ts:5-15`) and `languageDetector` (`src/utils/languageDetector.ts`) both derive `supportedLngs`/paths from this array, so `/es`, `/it`, `/fr`, `/de` routes and browser-language auto-redirect (`src/utils/redirect.tsx`) work automatically once the array is updated.

## 3. Translation files

- Create `public/locales/{es,it,fr,de}/common.json`, each mirroring the full key structure of `public/locales/en/common.json` (257 lines / all `nav.*`, `cta.*`, `a11y.*`, `article.*`, section copy, etc.).
- Recommended process: machine-translate from `en` as a first pass, then a native-speaker (or professional translation) review pass before merging — this is user-facing marketing/portfolio copy, not technical strings, so tone matters.
- Keep interpolation placeholders (e.g. `{{count}}`) and `defaultValue` fallbacks used inline (e.g. `t('a11y.skipToContent', { defaultValue: 'Skip to content' })`) untouched — only translate the target-language JSON files, not the fallback strings in code.
- Add a CI or pre-commit check (simple Node script) that fails if any locale's `common.json` is missing a key present in `en/common.json`, to prevent silent drift as new keys get added.

## 4. Language switcher UI

`Nav.tsx`'s `LangToggle` (`src/components/portfolio/Nav.tsx:8-41`) hardcodes `['en', 'pt']` and renders a pill row. With 6 codes this needs two changes:
- Derive the code list from `next-i18next.config.js` (`i18nextConfig.i18n.locales`) instead of hardcoding, so the switcher and config can't drift.
- The pill-row layout won't scale to 6 items, especially in the mobile drawer's constrained footer row (`Nav.tsx:243-262`) where it sits next to the "get in touch" CTA. Replace with a compact dropdown/popover (click to expand a list of codes) reusing the existing glass/toggle styling. Same component is duplicated as `LangToggle` usage at `Nav.tsx:107` (desktop) and `:248` (mobile drawer) — refactor to one shared control if the redesign makes that cleaner.

## 5. Article pages — pre-existing gap to address

`src/pages/articles/[slug].tsx` is **not** nested under `[locale]` — it's a flat `/articles/[slug]` route. Its `getStaticProps` always loads the `en` bundle (`:802-808`), and `ArticleNav`'s links point to `/#...` (root, i.e. English). Adding 4 more locales makes this gap more visible: a Spanish-reading visitor who switches the homepage to `es` and clicks into an article lands back in English chrome.
- In scope for this change: make `ArticleNav` and the reading-progress/TOC labels honor the visitor's chosen locale (read from `localStorage`/cookie the same way the homepage switcher persists choice, or accept `?locale=` / referrer) rather than being hardcoded to `en`.
- Out of scope: translating actual article bodies (they're pulled live from Dev.to via `/api/articles`, `services/devto`) — that's a content problem, not an i18n plumbing one. Flag this as a known limitation in the PR description.

## 6. Metadata / SEO

- `Meta.tsx` (`src/layouts/Meta.tsx`) takes a `locale` prop for `NextSeo`'s `openGraph.locale`, but both call sites hardcode `locale="en"` (`src/pages/[locale]/index.tsx:108`, `src/pages/articles/[slug].tsx:631,639,791`). Fix: pass the actual router locale (`router.query.locale`) through.
- Add `hreflang` alternates (`next-seo`'s `languageAlternates` on `NextSeo`) listing all 6 locale URLs per page, so search engines don't treat translated pages as duplicate content.
- `next-sitemap.config.js` needs no changes — it crawls the build output, and `getStaticPaths` will already emit `/es`, `/it`, `/fr`, `/de` once step 2 lands.

## 7. Date formatting

Already locale-aware and needs no change: `toLocaleDateString(locale, ...)` calls in `articles/[slug].tsx` (`:526`, `:706`) take whatever locale string is passed in — once step 5's locale threading lands, dates will format correctly in all locales automatically via `Intl`.

Verified directly against Node's `Intl` (same engine Next.js runs on) for all nine locale codes, including the CJK/Cyrillic batch where format conventions differ most from `en`:

| locale | `{ year: 'numeric', month: 'long', day: 'numeric' }` |
| --- | --- |
| `en` | August 7, 2026 |
| `pt` | 7 de agosto de 2026 |
| `es` | 7 de agosto de 2026 |
| `it` | 7 agosto 2026 |
| `fr` | 7 août 2026 |
| `de` | 7. August 2026 |
| `zh` | 2026年8月7日 |
| `ru` | 7 августа 2026 г. |
| `ja` | 2026年8月7日 |

No date-formatting code changes were needed for `zh`/`ru`/`ja` — `Intl` produces the correct native convention (Chinese/Japanese year-month-day with no separators, Russian genitive month form) purely from passing the plain locale string through.

## 8. Legacy `moment` locale mapping

`mapLocaleToMoment` (`src/utils/index.ts:61-77`) and `setLocale` are dead code from an earlier version (only referenced by tests, not by any live component per `CLAUDE.md`'s note on orphaned legacy components). No action needed unless `Timeline.tsx` or similar gets revived — the mapping already covered `es`/`it`/`fr`/`de`/`ja`/`zh`; `ru` was added to close the one gap for parity.

## 9. Tests

- `src/__tests__/portfolio/Nav.test.tsx` mocks `useRouter` to `{ query: { locale: 'en' } }` and checks nav link keys — should still pass unchanged, but add cases for the new `LangToggle` behavior (renders all 6 codes, dropdown open/close if redesigned).
- `src/__tests__/utils/index.test.ts` already asserts `mapLocaleToMoment('fr')`/`'de'` etc. — no change needed, already covers the new codes.
- Add a small test/script (see step 3) asserting all locale JSON files have matching key sets.
- Cypress E2E: add/extend a locale-switch flow test (currently none reference `/pt` or `/en` per repo scan) covering switching to at least one new locale and asserting URL + a translated string changes.

## 10. Rollout

1. Land config + empty/machine-translated JSON files behind the existing branch, verify build (`npm run build`) generates all `/en /pt /es /it /fr /de` static paths.
2. Native-review pass on the 4 new `common.json` files (can happen in parallel via a follow-up PR without blocking the plumbing).
3. Ship switcher redesign + Meta/locale-threading fixes.
4. Follow-up (optional): article-chrome localization (step 5) and hreflang tags (step 6) can be separate PRs since they're additive, not required for the core "site is browsable in 6 languages" goal.

## Effort estimate

- Plumbing (config, JSON scaffolding, switcher redesign, Meta fix): ~1 day.
- Translation content (4 languages × ~257 keys): translation-vendor/native-reviewer dependent, not engineering time.
- Article-chrome locale threading + hreflang: ~half day, separable.
