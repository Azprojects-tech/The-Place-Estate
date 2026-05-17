# Shapefile Update Guide — The Palace Estate
**Last Updated:** May 17, 2026  
**Purpose:** How to replace the estate layout with a new shapefile without changing any portal functionality.

---

## Overview

The portal map is driven by a file called `subdivision_data.json` (GeoJSON). When the estate layout is redesigned, you replace the shapefiles, regenerate the GeoJSON and CSV, re-import to Google Sheets, and push to GitHub. Netlify auto-deploys.

**Files that change:**
- `Shapefiles/Parcels.*` — the raw GIS source files
- `subdivision_data.json` — the map layer (auto-generated)
- `THE_PLACE_ESTATE_TEMPLATE.csv` — the import file for Google Sheets (auto-generated)

**Files that do NOT change:**
- `index.html`
- `estate-config.js`
- `pvp-config.json`
- Anything else in the repo

---

## Shapefile Requirements

The new shapefile's attribute table (DBF) must have exactly these columns:

| Column | Type | DBF Type | Description |
|---|---|---|---|
| `text` | String | `C` (Character) | Parcel label e.g. `1`, `2`, `CR/1`, `Green Area` |
| `Shape_Area` | String | `C` (Character) | Area in sqm — can be empty, script calculates it from geometry |

> **Note:** `Shape_Area` can be left blank. The conversion script calculates the area automatically from the polygon geometry.

**Geometry:** Polygon, WGS84 (EPSG:4326) coordinate system.

**Saleable vs non-saleable parcels:**  
Only plots with purely **numeric** labels (e.g. `1`, `2`, `36`) go into the CSV as purchasable plots. Non-numeric labels (e.g. `CR/1`, `Green Area`, `UT/1`, `Path`, `OS/1`) appear on the map but are excluded from the CSV.

---

## Step-by-Step Process

### Step 1 — Verify the new shapefile
Run this in the terminal to inspect the new shapefile before doing anything:

```powershell
c:/Users/Admin/The-Place-Estate/.venv/Scripts/python.exe -c "
import shapefile
sf = shapefile.Reader('C:/path/to/NewShapefile.shp')
print('Shape type:', sf.shapeTypeName)
print('Total features:', len(sf))
print('Fields:', [(f[0], f[1]) for f in sf.fields[1:]])
fields = [f[0] for f in sf.fields[1:]]
for i, rec in enumerate(sf.records()):
    row = {fields[j]: rec[j] for j in range(len(fields))}
    print(f'  [{i}]', row)
"
```

Check:
- `text` field exists with parcel labels
- Feature count is correct
- Coordinates are in the right location (check bounding box)

---

### Step 2 — Run the conversion script
This single script does everything: copies the shapefile, generates the GeoJSON and CSV.

```powershell
c:/Users/Admin/The-Place-Estate/.venv/Scripts/python.exe -c "
import shapefile, json, csv, math, shutil, os

SHP_SRC = 'C:/path/to/NewShapefile'        # no extension
SHP_DST = 'C:/Users/Admin/The-Place-Estate/Shapefiles'
GEOJSON_OUT = 'C:/Users/Admin/The-Place-Estate/subdivision_data.json'
CSV_OUT = 'C:/Users/Admin/The-Place-Estate/THE_PLACE_ESTATE_TEMPLATE.csv'
PRICE = 15000000   # default price in Naira

# Copy shapefile files
copied = []
for ext in ['.shp', '.dbf', '.prj', '.shx', '.cpg', '.sbn', '.sbx']:
    src = SHP_SRC + ext
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(SHP_DST, 'Parcels' + ext))
        copied.append('Parcels' + ext)
print('Copied:', copied)

# Area calculation from WGS84 polygon coordinates
def calc_area_sqm(ring):
    lat_c = sum(c[1] for c in ring) / len(ring)
    lat_scale = 111320.0
    lon_scale = 111320.0 * math.cos(math.radians(lat_c))
    pts = [(c[0] * lon_scale, c[1] * lat_scale) for c in ring]
    n = len(pts)
    area = 0.0
    for i in range(n):
        j = (i + 1) % n
        area += pts[i][0] * pts[j][1]
        area -= pts[j][0] * pts[i][1]
    return round(abs(area) / 2.0, 2)

sf = shapefile.Reader(SHP_SRC + '.shp')
fields = [f[0] for f in sf.fields[1:]]
NON_SALEABLE = {'cr/1', 'green area', 'ut/1', 'path', 'os/1'}

features = []
csv_rows = []

for rec, shape in zip(sf.records(), sf.shapes()):
    row = {fields[j]: rec[j] for j in range(len(fields))}
    text_val = str(row.get('text', '') or '').strip()
    parts = list(shape.parts) + [len(shape.points)]
    rings = [[[p[0], p[1]] for p in shape.points[parts[i]:parts[i+1]]] for i in range(len(parts)-1)]
    area_str = str(row.get('Shape_Area', '') or '').strip()
    area = float(area_str) if area_str else calc_area_sqm(shape.points[shape.parts[0]:shape.parts[1] if len(shape.parts) > 1 else len(shape.points)])
    area = round(area, 2)
    features.append({'type': 'Feature', 'properties': {'Text': text_val, 'Shape_Area': area}, 'geometry': {'type': 'Polygon', 'coordinates': rings}})
    try:
        int(text_val)
        if text_val.lower() not in NON_SALEABLE:
            csv_rows.append([text_val, 'Available', '', '', '', '', '', area, PRICE, '', '', ''])
    except ValueError:
        pass

geojson = {'type': 'FeatureCollection', 'name': 'subdivision_data', 'crs': {'type': 'name', 'properties': {'name': 'urn:ogc:def:crs:OGC:1.3:CRS84'}}, 'features': features}
with open(GEOJSON_OUT, 'w') as f:
    json.dump(geojson, f, separators=(',', ':'))

csv_rows.sort(key=lambda r: int(r[0]))
with open(CSV_OUT, 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['ParcelID','Status','Purchaser_Name','Phone_Number','Email_Address','Purchase_ID','Display_Preference','Area_SqM','Price_Naira','Sale_Date','Service_Fee_Due','Payment_Status'])
    writer.writerows(csv_rows)

print(f'GeoJSON: {len(features)} features | CSV: {len(csv_rows)} saleable plots')
"
```

**Expected output:**
```
Copied: ['Parcels.shp', 'Parcels.dbf', 'Parcels.prj', 'Parcels.shx', 'Parcels.cpg']
GeoJSON: 39 features | CSV: 36 saleable plots
```

---

### Step 3 — Import CSV to Google Sheets

1. Open `THE_PLACE_ESTATE_TEMPLATE.csv` from the workspace
2. Go to the Google Sheet: `https://docs.google.com/spreadsheets/d/17D1CEVdFHPXAz8w3h_cteSr0rQ-LsuKL3M9c00FOWxE`
3. Click the tab **`THE_PLACE_ESTATE_TEMPLATE`** at the bottom
4. Select all existing data → Delete
5. Paste the contents of the CSV (or use **File → Import → Replace current sheet**)

> ⚠️ **Do not rename the sheet tab.** The portal is configured to read exactly `THE_PLACE_ESTATE_TEMPLATE`. If the tab name ever changes, see the Troubleshooting section below.

---

### Step 4 — Push to GitHub

```powershell
cd "C:/Users/Admin/The-Place-Estate"
git add Shapefiles/Parcels.dbf Shapefiles/Parcels.shp Shapefiles/Parcels.shx Shapefiles/Parcels.cpg Shapefiles/Parcels.prj subdivision_data.json THE_PLACE_ESTATE_TEMPLATE.csv
git commit -m "Update estate layout: new shapefile ([X] features, [Y] plots)"
git push origin main
```

Netlify will auto-deploy within 1–2 minutes. The new map layout will be live.

---

## Troubleshooting

### Map shows new parcels but status changes don't reflect on portal
**Cause:** The Google Sheet tab name does not match what the portal is configured to read.

**Fix:**
1. Check what the tab is actually called in Google Sheets (bottom of the screen)
2. Update the tab name in `estate-config.js`:
   ```js
   sheet_tab: "YOUR_ACTUAL_TAB_NAME",
   ```
3. Update the same in `pvp-config.json`:
   ```json
   "google_sheet_tab": "YOUR_ACTUAL_TAB_NAME"
   ```
4. Find and replace the hardcoded value in `index.html`:
   - Search for `sheetNameEncoded`
   - Change the string value next to it to match your tab name
5. Commit and push all three files

---

### `pyshp` not installed
```powershell
c:/Users/Admin/The-Place-Estate/.venv/Scripts/python.exe -m pip install pyshp
```

---

---

## Partial Shapefile Updates — Adjusting a Section or Block

> **This question came up during the Palace Estate session:** What if only part of the estate layout changes — a block is subdivided, a road alignment is adjusted, or a few plots are renumbered — rather than a complete redesign? Do you have to replace everything?

The answer is: it depends on what changed. There are two strategies.

---

### Strategy A — Full Replacement (what we did here)

**Use when:**
- The overall layout has significantly changed (many plots moved, renumbered, or redesigned)
- You have a clean new shapefile that covers the entire estate
- You're willing to clear and re-import Google Sheets (sale status data will need to be manually re-entered if plots already have buyers)

This is the most reliable approach. No room for partial mistakes.

**Downside:** If plots 1–20 already have buyers recorded in Google Sheets and you do a full replacement, those buyer records are cleared when you delete and re-import the sheet. You would need to manually re-enter or copy-paste the buyer data into the new sheet.

---

### Strategy B — Surgical Update (for minor layout changes)

**Use when:**
- Only 1–5 plots have changed shape (boundary adjustment, plot split, etc.)
- Plot labels (parcel IDs) are NOT changing — only geometries are
- You do not want to disrupt existing Google Sheets buyer data

**Steps:**

**1. Run the conversion script on the new shapefile (as normal)**  
This gives you a fresh `subdivision_data.json` with the correct coordinates. Don't push it yet.

**2. Identify which features changed**  
Compare the new GeoJSON with the live one:
```powershell
git diff subdivision_data.json
```
Or open both files and search for the parcel `Text` values you know changed. Each feature in the GeoJSON looks like:
```json
{"type":"Feature","properties":{"Text":"14","Shape_Area":312.5},"geometry":{"type":"Polygon","coordinates":[[[7.583,6.511],...]]}}
```

**3. Copy only the changed features from the new GeoJSON into the live one**  
Open `subdivision_data.json`, find the feature with the matching `Text` value, and replace its `geometry.coordinates` (and `Shape_Area` if it changed). Do this for each affected plot.

**4. Push `subdivision_data.json` only — do NOT touch the CSV or Google Sheets**  
The map will show the updated boundaries. Because the parcel IDs haven't changed, the portal will still match the Google Sheets data correctly.

```powershell
git add subdivision_data.json
git commit -m "Update: adjust boundaries for plots 14, 15 (block B realignment)"
git push origin main
```

**5. If new plots were ADDED (a plot was split into two):**  
- Add the new feature(s) to `subdivision_data.json` manually
- Add the new row(s) to Google Sheets manually — copy format from an existing row, set Status to `Available`
- Do NOT regenerate and re-import the full CSV (that would overwrite all existing buyer data)

---

### Decision Guide

| Situation | Strategy |
|---|---|
| Whole estate redesigned, new shapefile | **A — Full Replacement** |
| A few plot boundaries adjusted, same IDs | **B — Surgical: update GeoJSON only** |
| Plots renumbered (e.g. 14 → 14A, 14B) | **B — Surgical: GeoJSON + add rows to Google Sheets** |
| A road was realigned, no plot IDs changed | **B — Surgical: update GeoJSON only** |
| Existing buyers in Google Sheets + layout change | **B — Surgical** (to preserve buyer data) |
| First-time setup, no buyers yet | **A — Full Replacement** (safest) |

---

### Risk with Strategy B

The main risk is getting the GeoJSON coordinates wrong when editing manually — malformed JSON, wrong coordinate order, or accidentally editing the wrong feature. Always:
- Back up `subdivision_data.json` before editing it (`git stash` or copy to a temp file)
- Validate the JSON after editing (paste into https://jsonlint.com or run `python -c "import json; json.load(open('subdivision_data.json'))"`)
- Test on a local/preview copy before pushing to production

## Reference

| Item | Value |
|---|---|
| Google Sheet ID | `17D1CEVdFHPXAz8w3h_cteSr0rQ-LsuKL3M9c00FOWxE` |
| Google Sheet Tab | `THE_PLACE_ESTATE_TEMPLATE` |
| GitHub Repo | `https://github.com/Azprojects-tech/The-Place-Estate.git` |
| Netlify URL | `https://the-palace-estate-enugu.netlify.app` |
| Python venv | `c:/Users/Admin/The-Place-Estate/.venv/Scripts/python.exe` |
| Map data file | `subdivision_data.json` |
| CSV import file | `THE_PLACE_ESTATE_TEMPLATE.csv` |
| Shapefiles folder | `Shapefiles/Parcels.*` |
