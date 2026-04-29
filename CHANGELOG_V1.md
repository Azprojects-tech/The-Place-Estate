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
