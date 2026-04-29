# PVP AGENT CONTEXT — Parcel Vision Pro
## Master System Documentation & AI Agent Briefing
**Version:** 2.0 | **Date:** April 29, 2026
**Maintained by:** A&Z Projects Ltd / Arkey Ltd Dev Team

---

> **FOR AI AGENTS**: Read this entire file before doing any work on this
> repository. It contains everything you need to understand the system,
> build a new portal, or modify an existing one. No guessing required.

---

## SECTION 1 — WHAT IS PVP?

**Parcel Vision Pro (PVP)** is a single-file real estate parcel portal.
Each portal is a single `index.html` file (~200–350 KB) that renders:
- An interactive Leaflet.js map with estate parcel polygons coloured by sale status
- A password-protected admin panel for updating plot statuses
- A live Google Sheets database sync (every 30 seconds, silent)
- A buyer enquiry form with WhatsApp integration
- A marketer referral + territory management system
- An admin database dashboard with revenue, pipeline, occupancy stats

**Tech stack:** Pure HTML/CSS/JavaScript — no build system, no frameworks, no Node at runtime.
Leaflet 1.9.x from CDN. Deployed on Netlify (free tier) via GitHub.

**Python venv for tooling:** `c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe`
(Python 3.13, has geopandas, pyogrio, shapely — for shapefile processing)

---

## SECTION 2 — REPOSITORY STRUCTURE (This Folder = The Template)

This folder (`The-Place-Estate`) is the **canonical template** for all future portals.
Always build from this folder's `index.html.bak` (the clean unobfuscated source).

```
The-Place-Estate/
├── index.html              ← DEPLOYED (obfuscated) — do NOT edit directly
├── index.html.bak          ← WORKING SOURCE — edit this, then re-obfuscate
├── subdivision_data.json   ← Parcel GeoJSON (replace per portal)
├── estate-config.js        ← Human-readable config reference (not loaded by portal)
├── pvp-config.json         ← Machine-readable config reference
├── netlify.toml            ← Netlify deploy config + iframe CSP headers
├── PVP_AGENT_CONTEXT.md    ← THIS FILE — AI agent briefing
├── PVP_V2_CONFIG.json      ← Feature wishlist for next version
├── CHANGELOG_V1.md         ← Full session history of The Palace Estate v1
├── IFRAME_EMBED.html       ← Client iframe embed snippet
├── FIND_REPLACE_CHECKLIST.md ← Line-by-line config replacement guide
├── CSV_COLUMN_REFERENCE.md ← Google Sheets column schema
├── obfuscate_portal.py     ← (at C:\Users\Admin\) JS obfuscation script
└── Shapefiles/             ← Raw survey shapefiles (source of GeoJSON layers)
    ├── ParcelID.shp        ← Parcel polygons → subdivision_data.json
    ├── Parcels.shp         ← Alternative parcel source
    ├── Primeter.shp        ← Estate boundary
    ├── Major Road.shp      ← Road layer
    ├── Stream.shp          ← Stream/water layer
    └── Labels.shp          ← Landmark point labels
```

---

## SECTION 3 — ALL DEPLOYED PORTALS

| Estate | Local Folder | GitHub Repo | Live URL |
|--------|-------------|-------------|----------|
| The Palace Estate | `C:\Users\Admin\The-Place-Estate` | `Azprojects-tech/The-Place-Estate` | https://the-palace-estate-enugu.netlify.app/ |
| Silverstone Estate | `C:\Users\Admin\Silverstone Estate Ogbeke` | `Azprojects-tech/silverstone-estate-pvp` | https://silverstone-estate-pvp.netlify.app/ |
| Umuniko Amofia | `C:\Users\Admin\ONUO Estate` | `Azprojects-tech/umuniko-amofia-estate-pvp` | https://umuniko-amofia-estate-pvp.netlify.app/ |
| Pineleaf Estate | `C:\Users\Admin\pineleaf-github` | `Azprojects-tech/pineleaf-estate-portal` | https://pineleaf-estate-portal.netlify.app/ |

**GitHub Org:** `Azprojects-tech`
**Shared Google Sheets API Key:** `AIzaSyCkLewazfYqcQ_llw_Adj_mTNK71T2iRL0`
(Restricted in Google Cloud Console to Netlify domains only — do NOT change the key)

---

## SECTION 4 — THE PALACE ESTATE (This Portal) — FULL CONFIG

| Setting | Value |
|---------|-------|
| Estate Name | The Palace Estate |
| Location | Enugu, Enugu State, Nigeria |
| Client | Arkey Ltd |
| Client Website | https://www.arkeyltd.com/ |
| WhatsApp | +2349060646900 |
| Google Sheet ID | `17D1CEVdFHPXAz8w3h_cteSr0rQ-LsuKL3M9c00FOWxE` |
| Sheet Tab | `THE_PLACE_ESTATE_PARCELS` |
| Client Password | `Val2026` |
| Admin Password | `MADOX2024ADMIN` |
| Total Parcels | 36 |
| Default Price | ₦15,000,000 |
| Map Center | `[6.512298, 7.580954]` (auto-calculated, no manual entry needed) |
| Default Zoom | 17 |

### Exact locations of these values in index.html.bak:

| Variable | Approx Line | Code |
|----------|-------------|------|
| `<title>` | ~546 | `The Palace Estate - Real Estate Mapper` |
| H2 heading | ~1204 | `WELCOME TO THE PALACE ESTATE` |
| H1 heading | ~1235 | `The Palace Estate` |
| `spreadsheetId` | ~2947 | `'17D1CEVdFHPXAz8w3h_cteSr0rQ-LsuKL3M9c00FOWxE'` |
| `sheetName` | ~2949 | `'THE_PLACE_ESTATE_PARCELS'` |
| `sheetUrl` | ~2951 | `'https://docs.google.com/spreadsheets/d/...'` |
| `CLIENT_PASSWORD` | ~2688 | `'Val2026'` |
| Admin password | ~3244 | `'MADOX2024ADMIN'` |
| `defaultPrice` | ~4798 | `15000000` |
| WhatsApp number | ~2439 | `wa.me/2349060646900` |
| WhatsApp number | ~2450 | `+2349060646900` |
| Inquiry panel heading | ~2071 | `The Palace Estate - Enugu` |

---

## SECTION 5 — GOOGLE SHEETS SCHEMA

The sheet must have **exactly these column headers** in row 1 (columns A–O):

```
A: ParcelID          ← Must match Text property in GeoJSON (e.g. "1", "2A", "10B")
B: Status            ← "available", "reserved", or "sold" (lowercase)
C: PurchaserName     ← Buyer full name
D: PhoneNumber       ← Buyer phone
E: EmailAddress      ← Buyer email
F: PurchaseID        ← Internal transaction ID
G: SaleDate          ← YYYY-MM-DD format
H: PriceNaira        ← Number only, no commas (e.g. 15000000)
I: AreaSqm           ← Plot area in sqm
J: DisplayPreference ← "public" or "private" (controls info visibility)
K: AdminNote         ← Internal note
L: ChangedBy         ← "Admin" or marketer name
M: MarketerID        ← Referral/marketer code
N: CommissionRate    ← Decimal (e.g. 0.05 for 5%)
O: TerritoryZone     ← Territory assignment code
```

**Critical rules:**
- Sheet must be shared: "Anyone with the link" → Viewer
- `sheetNameEncoded` = same as `sheetName` unless it contains spaces (URL-encode spaces as `%20`)
- The API fetches range `A2:O` (skips header row)
- Parcel IDs are matched via `cleanParcelNumber()` which strips leading zeros and trims whitespace
- The sheet tab name is **CASE-SENSITIVE** in the API call

---

## SECTION 6 — GeoJSON / SHAPEFILE PIPELINE

### Input: Shapefiles from surveyor
### Output: `subdivision_data.json` + embedded layer coordinates

**Python environment:** `c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe`

### Step 1 — Validate and convert parcels shapefile to GeoJSON

```python
import geopandas as gpd, json

shp = gpd.read_file(r'Shapefiles/ParcelID.shp')
print(f"CRS: {shp.crs}")          # Must be EPSG:4326 (WGS84) or reproject
print(f"Columns: {list(shp.columns)}")  # Must include 'Text' and 'Shape_Area'
print(f"Geometry types: {shp.geometry.geom_type.unique()}")  # Must be Polygon (not Polygon Z)

# Reproject if needed
if shp.crs.to_epsg() != 4326:
    shp = shp.to_crs('EPSG:4326')

# Drop Z dimension if present
from shapely.ops import transform as shp_transform
import pyproj
# Or: shp.geometry = shp.geometry.apply(lambda g: g if not g.has_z else ...)

# Export to GeoJSON
shp.to_file('subdivision_data.json', driver='GeoJSON')
```

### Step 2 — Validate the output
- Open at https://geojson.io — parcels should appear at correct location in Nigeria
- Coordinates must be in range: lat ~6.4–6.7, lng ~7.4–7.7 (Enugu region)
- Each feature must have `"Text"` property (parcel ID) and `"Shape_Area"`

### Step 3 — Embed in portal
The portal loads `subdivision_data.json` via `fetch('./subdivision_data.json')`.
Just drop the file in the same folder as `index.html`.

---

## SECTION 7 — MAP LAYERS ARCHITECTURE

All layer functions live in `index.html.bak` and are called from `initMap()` in this order:

```javascript
addNearbyLocations();     // locationsData — Label.shp derived point markers
addAdditionalLocations(); // locations2Data — secondary label points
addRoads();              // roadsData — main named roads (GeoJSON, golden yellow)
addMajorRoad();          // majorRoadLine0/1 — new road layer (grey, 40% transparent)
addStream();             // streamLine — water layer (blue)
addEstates();            // estatesData — nearby estate boundaries (white dashed)
```

### Layer Data Format

**Point labels** (`locationsData`, `locations2Data`):
- Format: GeoJSON FeatureCollection of Point features
- Property field: `"Labels"` for locationsData, `"Label_2"` for locations2Data
- Coordinates: GeoJSON order = `[longitude, latitude]` — note: opposite to Leaflet!
- Rendered as: 6×6px white square marker + text label above it (font-size: 10px)

```javascript
// GeoJSON coordinate order (lng, lat):
{"type":"Feature","properties":{"Labels":"My Label"},"geometry":{"type":"Point","coordinates":[7.574686, 6.503312]}}

// Leaflet marker order (lat, lng):
L.marker([6.503312, 7.574686])
```

**Road / stream layers** (`majorRoadLine0`, `majorRoadLine1`, `streamLine`):
- Format: JavaScript arrays of `[lat, lng]` pairs (Leaflet order — opposite to GeoJSON!)
- Rendered as `L.polyline(coordsArray, styleOptions)`
- The road label uses a rotated `L.divIcon` — rotation calculated from mid-segment bearing

### Adding Roads from a Shapefile

```python
import geopandas as gpd, json, math

road = gpd.read_file(r'Shapefiles/Major Road.shp').to_crs('EPSG:4326')

for i, row in road.iterrows():
    geom = row.geometry
    coords = list(geom.coords) if geom.geom_type == 'LineString' else list(geom.geoms[0].coords)
    # Convert to Leaflet [lat, lng] format:
    leaflet_coords = [[round(c[1], 8), round(c[0], 8)] for c in coords]
    print(json.dumps(leaflet_coords))

    # Calculate mid-segment bearing for label rotation:
    mid = len(coords) // 2
    p1, p2 = coords[mid-1], coords[mid]
    angle = math.atan2(p2[1]-p1[1], p2[0]-p1[0]) * 180 / math.pi
    print(f"Bearing (deg): {angle:.1f}")
```

Then in `index.html.bak`, add the array as a constant before the `// Global variables` comment:

```javascript
const myRoadCoords = [[6.51681034, 7.57455687], ...]; // [lat, lng] pairs
```

And add the function after `addRoads()`:

```javascript
function addMyRoad() {
    L.polyline(myRoadCoords, {
        color: '#555555',   // dark grey
        weight: 4,
        opacity: 0.6,       // 40% transparent
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(map);

    // Label (zoom-dynamic, road-aligned)
    const midIdx = Math.floor(myRoadCoords.length / 2);
    const p1 = myRoadCoords[midIdx - 1];
    const p2 = myRoadCoords[midIdx];
    const dlng = p2[1] - p1[1];
    const dlat = p2[0] - p1[0];
    let rotation = -(Math.atan2(dlat, dlng) * 180 / Math.PI);
    if (rotation > 90) rotation -= 180;
    if (rotation < -90) rotation += 180;

    const labelLatLng = L.latLng(myRoadCoords[midIdx][0], myRoadCoords[midIdx][1]);
    const roadLabel = L.marker(labelLatLng, {
        icon: L.divIcon({
            className: 'road-label',
            html: `<div style="color:#2C3E50;font-weight:bold;font-size:9px;
                text-shadow:1px 1px 2px rgba(255,255,255,0.9);
                text-transform:uppercase;white-space:nowrap;font-family:Arial,sans-serif;
                transform:rotate(${rotation}deg);transform-origin:center center;
                pointer-events:none;">MY ROAD NAME</div>`,
            iconAnchor: [0, 0],
            iconSize: [0, 0]
        }),
        interactive: false,
        zIndexOffset: 200
    });

    // Zoom-dynamic: show only at zoom >= 13
    if (map.getZoom() >= 13) roadLabel.addTo(map);
    map.on('zoomend', function() {
        if (map.getZoom() >= 13) {
            if (!map.hasLayer(roadLabel)) roadLabel.addTo(map);
        } else {
            if (map.hasLayer(roadLabel)) map.removeLayer(roadLabel);
        }
    });
}
```

### Adding Stream / Water from a Shapefile

```python
stream = gpd.read_file(r'Shapefiles/Stream.shp').to_crs('EPSG:4326')
for i, row in stream.iterrows():
    geom = row.geometry
    if geom.geom_type == 'MultiLineString':
        for line in geom.geoms:
            coords = [[round(c[1],8), round(c[0],8)] for c in line.coords]
            print(json.dumps(coords))
    elif geom.geom_type == 'LineString':
        coords = [[round(c[1],8), round(c[0],8)] for c in geom.coords]
        print(json.dumps(coords))
```

In `index.html.bak`:

```javascript
const streamLine = [[6.513, 7.580], ...]; // [lat, lng] pairs

function addStream() {
    L.polyline(streamLine, {
        color: '#4488FF',
        weight: 2,
        opacity: 0.7,
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(map);
    // No label for streams
}
```

### Adding Landmark Labels from a Shapefile

```python
labels = gpd.read_file(r'Shapefiles/Labels.shp').to_crs('EPSG:4326')
for i, row in labels.iterrows():
    coords = list(row.geometry.coords)[0]  # (lng, lat)
    print(f"Label: {row['Label']} | Leaflet: [{coords[1]}, {coords[0]}]")
```

Add new points to `locationsData` in `index.html.bak`:

```javascript
const locationsData = {"type":"FeatureCollection","features":[
    // existing points...
    {"type":"Feature","properties":{"id":null,"Labels":"New Landmark"},
     "geometry":{"type":"Point","coordinates":[7.605371, 6.557023]}}
    // Note: GeoJSON uses [longitude, latitude] order!
]};
```

---

## SECTION 8 — BUILDING A NEW PORTAL (STEP BY STEP)

### Prerequisites
- Shapefiles from surveyor (parcel polygons + any road/stream/label layers)
- Google Sheet ID and tab name
- Estate name, location, client contact details
- Admin password chosen by client
- GitHub repo created under `Azprojects-tech` org
- Netlify site connected to that repo

### Step 1 — Set up the folder

```powershell
# Copy The-Place-Estate folder as starting point
Copy-Item "C:\Users\Admin\The-Place-Estate" "C:\Users\Admin\NEW-ESTATE-NAME" -Recurse
cd "C:\Users\Admin\NEW-ESTATE-NAME"
# Delete the backup, start from clean source
Copy-Item index.html.bak index.html
# Delete the old subdivision_data.json (will be replaced)
```

### Step 2 — Process shapefiles

```python
# Run in: c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe
import geopandas as gpd

# Load and validate parcels
shp = gpd.read_file(r'Shapefiles/ParcelID.shp')
if shp.crs.to_epsg() != 4326:
    shp = shp.to_crs('EPSG:4326')
shp.to_file('subdivision_data.json', driver='GeoJSON')

# Check result
import json
with open('subdivision_data.json') as f:
    data = json.load(f)
print(f"Parcels: {len(data['features'])}")
print(f"Sample properties: {data['features'][0]['properties']}")
# Verify 'Text' and 'Shape_Area' columns exist
```

### Step 3 — Update config values in index.html

Edit `index.html` (or `index.html.bak` before obfuscating). Make ALL of these changes:

```
FIND → REPLACE
──────────────────────────────────────────────────────────────────
"The Palace Estate"          → "NEW ESTATE NAME"
"THE PALACE ESTATE"          → "NEW ESTATE NAME" (uppercase)
"the-palace-estate-enugu"    → "new-estate-netlify-slug"
"17D1CEVdFHPXAz8w3h_..."    → "NEW_GOOGLE_SHEET_ID"
"THE_PLACE_ESTATE_PARCELS"   → "NEW_SHEET_TAB_NAME"
"2349060646900"              → "NEW_WHATSAPP_NUMBER" (no + prefix in wa.me URL)
"+2349060646900"             → "+NEW_PHONE" (with + in display text)
"Val2026"                    → "NEW_CLIENT_PASSWORD"
"MADOX2024ADMIN"             → "NEW_ADMIN_PASSWORD"
15000000                     → NEW_DEFAULT_PRICE (number, no quotes)
"Enugu"                      → "NEW_LOCATION"
──────────────────────────────────────────────────────────────────
```

**Also update `GOOGLE_SHEETS_CONFIG` block (~L2947):**

```javascript
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: 'NEW_SHEET_ID',
    apiKey: 'AIzaSyCkLewazfYqcQ_llw_Adj_mTNK71T2iRL0', // KEEP — shared key
    sheetName: 'NEW_SHEET_TAB_NAME',
    sheetNameEncoded: 'NEW_SHEET_TAB_NAME', // URL-encode spaces if any
    sheetUrl: 'https://docs.google.com/spreadsheets/d/NEW_SHEET_ID/edit',
    useEmbeddedDataOnly: false
};
```

**Also update `GOOGLE_SHEETS_CONFIG` for public refresh (~L4050 area):**
Search for `spreadsheetId:` — there are TWO instances (admin sync + public refresh).
Update both with the new sheet ID.

### Step 4 — Replace map layers

Replace `locationsData`, `locations2Data`, `roadsData`, `majorRoadLine0/1`,
`streamLine`, and `estatesData` with data from the new shapefiles.
Run the Python extraction scripts in Section 7 to get coordinates.

For existing road (golden yellow, named road):
- Update `roadsData` GeoJSON with new road shapefile coordinates
- Update `feature.properties.Name_2` to the new road name

### Step 5 — Register the API key domain

In Google Cloud Console:
- URL: https://console.cloud.google.com/apis/credentials
- Key: `Parcel-Vision-Pro-API-Key`
- Add: `https://YOUR-NETLIFY-SLUG.netlify.app/*`
- Wait 2–5 minutes for propagation

### Step 6 — Obfuscate and deploy

```powershell
# Obfuscate (always do this before deploying)
c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe "C:\Users\Admin\obfuscate_portal.py" index.html

# Deploy
git add .
git commit -m "Initial deployment: NEW ESTATE NAME"
git push
```

Netlify auto-deploys on push. Site is live within ~60 seconds.

---

## SECTION 9 — OBFUSCATION SYSTEM

The script `C:\Users\Admin\obfuscate_portal.py` protects the portal from cloning.

**How it works:**
- Finds the largest `<script>` block in index.html (the main portal JS)
- Runs `javascript-obfuscator` on it (installed globally via npm)
- All variable/function names → hex identifiers (`_0x4a2c1f`)
- All strings → base64-encoded, loaded via a decoder array
- Saves backup as `index.html.bak` before overwriting

**CLI tool:** `C:\Users\Admin\AppData\Roaming\npm\javascript-obfuscator.cmd`

**Usage:**
```powershell
# From the portal folder:
c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe "C:\Users\Admin\obfuscate_portal.py" index.html
```

**IMPORTANT WORKFLOW RULE:**
- `index.html.bak` = your clean working source — **always edit this**
- `index.html` = obfuscated deployed file — **never edit directly**
- When making changes: edit `.bak`, then run the obfuscation script, then commit `index.html`

**What obfuscation does NOT protect:**
- The Google Sheets API key is still readable in the Network tab (but key is domain-restricted)
- The portal is still publicly accessible at the Netlify URL
- Netlify paid plan + password gate = full protection (planned for V2)

---

## SECTION 10 — BUGS FIXED IN V1 (The Palace Estate)

These bugs existed in the original template and are now FIXED in this folder.
Any future portal cloned from here will NOT have these bugs.

### Bug 1 — Emoji Corruption (97 instances)
**Root cause:** File encoding issues during initial portal creation.
Emojis stored as corrupted byte sequences (`??`, `???`, `\xef\xbf\xbd`).
**Fix:** Binary byte-replacement script. All 97 instances corrected.
**How to check:** `Select-String -Path index.html.bak -SimpleMatch "??" | Measure-Object` should return 0.
**Fix script if needed:** See `C:\Users\Admin\ONUO Estate\fix_template_emojis.py`

### Bug 2 — Hardcoded Dashboard Values
**Root cause:** Template had hardcoded literal numbers `'3,000,000'`, `50`, `99`
instead of dynamic variables `defaultPrice.toLocaleString()`, `totalParcels`.
**Fix:** Three substitutions already applied in this template.
**Lines:** ~4797–4798 area in index.html.bak.

### Bug 3 — Visible "Updating..." Auto-Refresh Banner
**Root cause:** The 30-second auto-refresh interval called
`loadPublicParcelStatuses(true)` which shows a banner in top-right.
**Fix:** Changed to `loadPublicParcelStatuses(false)` at the setInterval call (~L1596).
**Result:** Background refreshes are now fully silent.

---

## SECTION 11 — CLIENT IFRAME EMBED

Each deployed portal can be embedded on the client's website.
The file `IFRAME_EMBED.html` contains the ready-to-paste HTML block.

**Bare minimum embed code:**
```html
<iframe
  src="https://the-palace-estate-enugu.netlify.app/"
  title="The Palace Estate — Interactive Parcel Map"
  width="100%"
  style="height:600px;border:none;"
  allow="geolocation"
  loading="lazy"
></iframe>
```

**`netlify.toml` must include CSP header to allow iframing from client's domain:**
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "ALLOW-FROM https://www.clientwebsite.com"
    Content-Security-Policy = "frame-ancestors 'self' https://www.clientwebsite.com https://*.clientwebsite.com"
```

---

## SECTION 12 — KEY KNOWN ISSUES / TECH DEBT (For V2)

1. **Road label rotation**: The existing `addRoads()` function (golden road) has +61° of
   accumulated manual offset added in multiple increments. For V2, calculate bearing
   cleanly: `rotation = Math.atan2(dy, dx) * 180 / Math.PI` and adjust ±180 for readability.
   The new `addMajorRoad()` function does this correctly — use that pattern.

2. **Mixed layer formats**: `locationsData` uses GeoJSON; `majorRoadLine0/1` and `streamLine`
   use raw Leaflet coord arrays. Unify to GeoJSON for V2.

3. **Plain-text passwords**: `CLIENT_PASSWORD` and admin password are hardcoded strings
   in the JS. For V2: hash with bcrypt or move to environment variable via Netlify.

4. **Two GOOGLE_SHEETS_CONFIG blocks**: There are two separate config objects — one for
   admin sync, one for public read. Deduplicate into a single source of truth in V2.

5. **`locations2Data` property mismatch**: Uses `"Label_2"` not `"Labels"` — must remember
   to use the correct property name when adding points to each layer.

---

## SECTION 13 — COMMON COMMANDS REFERENCE

```powershell
# Run Python (geopandas)
c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe script.py

# Obfuscate a portal
c:/Users/Admin/pineleaf-github/.venv/Scripts/python.exe "C:\Users\Admin\obfuscate_portal.py" index.html

# Check for emoji corruption
Select-String -Path index.html.bak -SimpleMatch "??" | Measure-Object

# Search for a value across the portal
Select-String -Path index.html.bak -SimpleMatch "VALUE_TO_FIND" | Select-Object LineNumber, Line

# Git: stage, commit, push
git add index.html ; git commit -m "Your message" ; git push

# Git: check status
git log --oneline -5

# Check file size
(Get-Item index.html).Length / 1KB
```

---

## SECTION 14 — SESSION HISTORY (The Palace Estate V1)

All changes made during the April 2026 build session, in order:

| # | Change | Commit |
|---|--------|--------|
| 1 | Fixed all 97 emoji corruptions in portal | `ae8c7a6` |
| 2 | Fixed hardcoded dashboard values (price, parcel counts) | `ae8c7a6` |
| 3 | Made 30s auto-refresh silent (no popup banner) | `ae8c7a6` |
| 4 | Added Major Road layer (grey, 40% opacity, road-aligned label) | `b55ae0b` |
| 5 | Added Stream layer (blue, no label) | `b55ae0b` |
| 6 | Added 3 new landmarks (Godfrey Okoye University, Poultry Farm, Hotel) | `b55ae0b` |
| 7 | Renamed "Hotel" → "Crystal Luxury Hotel" | `25f6c50` |
| 8 | Increased point label font 8px → 10px (+20%) | `25f6c50` |
| 9 | Created IFRAME_EMBED.html for client website integration | `58c3795` |
| 10 | Added Netlify CSP headers restricting iframe to arkeyltd.com | `58c3795` |
| 11 | Created CHANGELOG_V1.md (full session documentary) | `58c3795` |
| 12 | Created PVP_V2_CONFIG.json (next version planning config) | `58c3795` |
| 13 | Obfuscated all 4 deployed portals (JS source protection) | `bd4e326` |
| 14 | Created PVP_AGENT_CONTEXT.md (this file) | current |

**All 4 portals also had bugs 1–3 fixed and obfuscation applied this session.**

---

## SECTION 15 — PORTAL INVENTORY

| # | Estate | Client | Sheet Tab | Admin PW | Status |
|---|--------|--------|-----------|----------|--------|
| 1 | Pineleaf Estate | Pineleaf | PINELEAF_PARCELS | (see estate-config.js) | Live |
| 2 | Silverstone Estate | Silverstone | SILVERSTONE_PARCELS | (see estate-config.js) | Live |
| 3 | Umuniko Amofia | ONUO | UMUNIKO_AMOFIA_PARCELS | Skillnet2026 | Live |
| 4 | The Palace Estate | Arkey Ltd | THE_PLACE_ESTATE_PARCELS | MADOX2024ADMIN | Live |

---

*End of PVP Agent Context Document. Version 2.0 — April 29, 2026.*
