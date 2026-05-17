# THE PALACE ESTATE — PVP Portal
# Session Changelog · Version 1.0 (Final)
# Date: April 29, 2026
# Prepared by: GitHub Copilot / Pineleaf Dev Session

---

## PORTAL DETAILS

| Field            | Value                                                        |
|------------------|--------------------------------------------------------------|
| Estate Name      | The Palace Estate                                            |
| Location         | Enugu, Enugu State, Nigeria                                  |
| Client Company   | Arkey Ltd (https://www.arkeyltd.com/)                        |
| Portal URL       | https://the-palace-estate-enugu.netlify.app/                 |
| GitHub Repo      | https://github.com/Azprojects-tech/The-Place-Estate.git      |
| Google Sheet     | THE_PLACE_ESTATE_PARCELS (Sheet ID: 17D1CEVdFHPXAz8w3h_cteSr0rQ-LsuKL3M9c00FOWxE) |
| Admin Password   | Val2026                                                      |
| Total Parcels    | 36                                                           |

---

## CHANGES MADE THIS SESSION

### BUG FIX 1 — Emoji Corruption (97 instances)
- **Problem**: All emoji characters in the portal (status icons, admin panel labels, console logs, UI text) were stored as corrupted byte sequences (`??`, `???`) due to file encoding issues when the portal was first created.
- **Scope**: 97 individual instances across the entire `index.html` file.
- **Fix**: Binary byte-level replacement script (`fix_template_emojis.py`). Each corrupted byte pattern was identified and replaced with the correct UTF-8 encoding.
- **Result**: All emojis render correctly — 0 corruptions remaining.
- **Commits**: Multiple — final state at commit `ae8c7a6`.

---

### BUG FIX 2 — Hardcoded Dashboard Values
- **Problem**: The admin database dashboard showed hardcoded values (`₦3,000,000` and `50`, `99` parcels) regardless of actual data loaded from Google Sheets.
- **Affected lines**: Three instances of literal numbers replacing dynamic variables.
- **Fix**:
  - `'3,000,000'` → `defaultPrice.toLocaleString()` (price display)
  - `50 -` → `totalParcels -` (sold count calculation)
  - `99 -` → `totalParcels -` (reserved count calculation)
- **Result**: Dashboard now accurately reflects live data from Google Sheets.

---

### BUG FIX 3 — Silent Background Auto-Refresh
- **Problem**: Every 30-second auto-refresh of parcel statuses displayed a visible `"🔄 Updating..."` banner at the top-right of the screen, creating a distracting popup for end users.
- **Affected line**: L1596 — `setInterval` callback.
- **Fix**: Changed `loadPublicParcelStatuses(true)` → `loadPublicParcelStatuses(false)` on the auto-refresh interval. The initial page load still shows the indicator; background refreshes are now fully silent.
- **Result**: Map refreshes every 30 seconds invisibly.

---

### NEW FEATURE 1 — Major Road Layer
- **Source**: `Shapefiles/Major Road.shp` (EPSG:4326, 2 LineString features)
- **Style**: Dark grey (`#555555`), weight 4, 40% transparent (opacity 0.6), round caps.
- **Feature 0** (13-point short road): Rendered with no label.
- **Feature 1** (61-point long road): Rendered with road-aligned label **"GODFREY OKOYE UNIVERSITY ROAD"**.
  - Label rotation calculated from mid-segment bearing (~-60°).
  - Label is **zoom-dynamic**: visible at map zoom ≥ 13, hidden when zoomed out.
- **Implementation**: `addMajorRoad()` function, called from `initMap()`.

---

### NEW FEATURE 2 — Stream Layer
- **Source**: `Shapefiles/Stream.shp` (EPSG:4326, 1 MultiLineString feature, 144 coordinate points)
- **Style**: Blue (`#4488FF`), weight 2, opacity 0.7, round caps. No label.
- **Implementation**: `addStream()` function, called from `initMap()`.

---

### NEW FEATURE 3 — 3 Additional Landmark Labels
- **Source**: Updated `Shapefiles/Labels.shp` (now 6 features — was 3)
- **New points added** to `locationsData` in `index.html`:

| Label                     | Lat          | Lng          |
|---------------------------|--------------|--------------|
| Godfrey Okoye University  | 6.557023880  | 7.605371025  |
| Poultry Farm              | 6.511473586  | 7.583657837  |
| Crystal Luxury Hotel      | 6.518404223  | 7.581139518  |

- **Existing 3 labels unchanged**: Caritas University, Goodluck Jonathan Market, Enugu Airport.
- **Style**: Same as existing labels — white 6×6px square marker + dark ash text with white shadow.

---

### ENHANCEMENT — Point Label Font Size +20%
- **Change**: All nearby location point labels increased from `font-size: 8px` → `font-size: 10px`.
- **Affected**: Both `addNearbyLocations()` (locationsData) and `addAdditionalLocations()` (locations2Data) label markers.
- **Road labels not changed** — remain at 9px.

---

### ENHANCEMENT — Landmark Rename
- "Hotel" renamed to **"Crystal Luxury Hotel"** in `locationsData`.

---

### DELIVERABLE — Client Iframe Embed
- **File**: `IFRAME_EMBED.html` (in repo root)
- **Purpose**: Ready-to-paste HTML block for embedding the portal on https://www.arkeyltd.com/
- **Features**: Responsive width, 600px desktop height (480px mobile), branded heading, "View Full Portal" CTA button.
- **Netlify header**: `Content-Security-Policy: frame-ancestors` set to allow `arkeyltd.com` only.

---

## COMMIT HISTORY (This Session)

| Commit    | Message                                                                 |
|-----------|-------------------------------------------------------------------------|
| `ae8c7a6` | Fix: Silent background refresh - hide Updating indicator               |
| `b55ae0b` | Add Major Road, Stream, and 3 new landmark labels to map               |
| `25f6c50` | Rename Hotel to Crystal Luxury Hotel; increase point label font 8px→10px |
| `(latest)`| Add IFRAME_EMBED, netlify iframe headers, v1.0 changelog & v2 config   |

---

## FILES CHANGED THIS SESSION

| File               | Changes                                                         |
|--------------------|-----------------------------------------------------------------|
| `index.html`       | All bug fixes + all new features (primary file)                 |
| `netlify.toml`     | Added `Content-Security-Policy` and `X-Frame-Options` headers   |
| `IFRAME_EMBED.html`| New — client embed snippet                                      |
| `CHANGELOG_V1.md`  | New — this file                                                 |
| `PVP_V2_CONFIG.json` | New — next version config template                            |

---

## MASTER TEMPLATE STATUS

All bug fixes (emoji corruption, hardcoded dashboard, silent refresh) have been **mirrored to the ONUO Estate master template** at `C:\Users\Admin\ONUO Estate\index.html`. New features (road/stream/labels) are portal-specific and not in the master template.

---

---

# SESSION 2 — Shapefile Replacement & Flash Fixes
# Date: May 17, 2026
# Prepared by: GitHub Copilot / Pineleaf Dev Session

---

## CONTEXT

The estate underwent a layout redesign. The original parcel map was replaced with a new surveyor-supplied shapefile. This session covered: replacing the shapefile, regenerating all data files, fixing bugs discovered in the process, and two separate UI flash issues.

---

## TASK — Full Shapefile Replacement

**What changed:**  
The estate layout was completely redesigned by the surveyor. The new shapefile had 39 features (36 numbered saleable plots + CR/1 + Green Area + UT/1).

**Steps completed:**
1. New shapefile files copied to `Shapefiles/Parcels.*` (replacing old files)
2. Python conversion script run via `.venv` — calculated plot areas from polygon geometry (Shoelace formula) because `Shape_Area` field was empty in the new shapefile
3. `subdivision_data.json` regenerated — 39 features, WGS84 GeoJSON
4. `THE_PLACE_ESTATE_TEMPLATE.csv` regenerated — 36 saleable plots, 12 columns, default price ₦15,000,000
5. CSV imported into Google Sheets — user cleared the sheet and pasted new data
6. Git push → Netlify auto-deployed → new map layout confirmed live

**Reference:** Full process documented in `SHAPEFILE_UPDATE_GUIDE.md`.

---

## BUG FIX 4 — Google Sheet Tab Name Mismatch

- **Problem:** After the shapefile replacement and CSV import, status changes made in Google Sheets were not reflecting on the portal. The map showed parcel colours but the data never synced.
- **Root Cause:** When the CSV was imported into Google Sheets, it created a tab named `THE_PLACE_ESTATE_TEMPLATE`. The portal was hardcoded to read from `THE_PLACE_ESTATE_PARCELS` (the original tab name from V1 setup).
- **Fix:**
  - `index.html` (obfuscated, deployed): found `sheetNameEncoded` string and changed `THE_PLACE_ESTATE_PARCELS` → `THE_PLACE_ESTATE_TEMPLATE`
  - `estate-config.js`: updated `sheet_tab` field
  - `pvp-config.json`: updated `google_sheet_tab` field
- **Result:** Sync working — status changes in Google Sheets now reflect on the portal within 30 seconds.
- **Lesson:** When a CSV import creates a new sheet tab, the tab name is derived from the CSV filename. Always check that the portal's `sheetNameEncoded` config value matches the actual tab name at the bottom of the Google Sheet.

---

## BUG FIX 5 — Loading Splash Before Welcome Screen

- **Problem:** A white box with a spinning loader and the text "Loading subdivision map data..." appeared in the centre of the screen for several seconds before the welcome modal appeared. The user described this as an "error message" flashing before the welcome screen.
- **Root Cause:** The `#loading` div in the HTML had no `display: none` — not in the CSS, not inline. The browser renders the HTML body immediately and progressively. Because the portal's obfuscated JavaScript is very large (~1,300+ lines), it takes the browser time to parse and execute it before `DOMContentLoaded` fires. During that parse window, the `#loading` div was already rendered and visible. Only once `DOMContentLoaded` fired did JavaScript show the welcome modal (which covers the loading div). On slower connections or devices, this window was long enough for users to clearly see the loading text.
- **Why it got worse after BUG FIX 4:** Before the tab name fix, the Google Sheets API would fail fast (wrong tab name → quick 404). After the fix, the API actually succeeds and fetches real data, so the network round-trip takes longer — keeping the map in the "loading" state slightly longer and making the flash more noticeable.
- **Fix:** Added `style="display:none"` to the `#loading` div in both `index.html` and `index.html.bak`. The welcome modal now acts as the only visible loading state from the moment the page renders. The `#loading` div is still present in the DOM — it just starts hidden. JavaScript would still have called `.style.display = 'none'` on it when the map finished loading anyway; we simply start it in that state.
- **Result:** No flash before welcome screen. Portal loads cleanly to welcome modal.

---

## KNOWN ISSUE — Brief Purple/Dark Screen After Welcome Modal

- **Status:** Not fixed in this portal. To be addressed in the next portal build.
- **Description:** After the welcome modal auto-hides (5 seconds), a brief purple or dark-tinted blank screen flashes for a fraction of a second before the satellite map tiles are fully rendered and visible.
- **Likely Root Cause:** The map container or page body has a dark/purple CSS background colour. When the welcome modal disappears, there is a short moment before all Leaflet satellite tile images are painted on screen. During that gap, the background colour of the `#map` div (or `<body>`) shows through.
- **How to fix in the next portal:**
  1. Find the CSS background colour of `#map` and `body` — change it to a neutral grey or match the satellite tile average colour (dark green/grey for aerial imagery)
  2. OR delay the welcome modal hide slightly longer (e.g., from 5000ms to 6000ms) to give tiles more time to load before the modal disappears
  3. OR add a CSS fade/transition on the welcome modal so it fades out slowly instead of instantly disappearing, making the underlying tile-load less jarring
  4. The most elegant fix: set `#map { background: #2c3e50; }` (dark blue-grey) or `#map { background: #1a1a2e; }` to match the dark colour of satellite tiles so the gap is invisible

---

## COMMIT HISTORY (Session 2)

| Commit    | Message                                                                          |
|-----------|----------------------------------------------------------------------------------|
| `(early)` | Replace shapefile: new estate layout (39 features, 36 plots)                    |
| `(mid)`   | Fix: sheet tab name THE_PLACE_ESTATE_PARCELS → THE_PLACE_ESTATE_TEMPLATE        |
| `fa73f2b` | Fix: remove syncStatus flash - clear default text, inline display:none           |
| `d769393` | Fix: hide loading div by default to prevent flash before welcome modal           |

---

## FILES CHANGED (Session 2)

| File                          | Changes                                                               |
|-------------------------------|-----------------------------------------------------------------------|
| `Shapefiles/Parcels.*`        | Replaced with new redesigned shapefile                                |
| `subdivision_data.json`       | Regenerated — 39 features from new shapefile                          |
| `THE_PLACE_ESTATE_TEMPLATE.csv` | Regenerated — 36 saleable plots with calculated areas               |
| `index.html`                  | Tab name fix; syncStatus cleanup; loading div hidden by default       |
| `index.html.bak`              | Same loading div fix applied to source                                |
| `estate-config.js`            | Updated `sheet_tab` to match actual Google Sheet tab name             |
| `pvp-config.json`             | Updated `google_sheet_tab` to match actual Google Sheet tab name      |
| `SHAPEFILE_UPDATE_GUIDE.md`   | New — full documented process for shapefile replacement               |

---

## PORTAL TEMPLATE STATUS

> **This portal — The Palace Estate — is the confirmed base template for all future PVP portals.**

Every portal we build is the template for the one that follows. The approach is: build on what works, fix what breaks, document both. When building the next portal, start from a copy of this `index.html.bak`, apply the client's shapefile, and note what new problems arise — those become the next changelog.

**Known issues inherited into the next build (to fix there, not here):**
- Purple/dark flash after welcome modal hides (see KNOWN ISSUE above)
- `index.html` is obfuscated and `index.html.bak` is gitignored — direct edits to `index.html` work but break the source/deployed separation. Consider a cleaner build pipeline for future portals.
