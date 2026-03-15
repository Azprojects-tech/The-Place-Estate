# Umuniko Amofia Estate - PVP Portal Setup Guide

**Project Name:** Umuniko Amofia Estate  
**Location:** Eha-Amufu Township  
**Contact:** +2347025005871  
**Admin Password:** Skillnet2026  
**Project Folder:** C:\Users\Admin\ONUO Estate  
**Created:** March 15, 2026

---

## 📋 PROJECT CHECKLIST

### Phase 1: Data Preparation
- [ ] **GeoJSON Verification**
  - [ ] CRS is WGS 84 (EPSG:4326) with coordinates like [7.087, 6.192]
  - [ ] NOT UTM or local coordinates
  - [ ] Polygon format is 2D (remove Z/M values if present)
  - [ ] Has properties: `Text` (ParcelID) and `Shape_Area` (area in sqm)
  - [ ] File location: `C:\Users\Admin\ONUO Estate\Shapefiles\`

- [ ] **CSV Generation**
  - [ ] GeoJSON provided to AI
  - [ ] CSV auto-generated from GeoJSON
  - [ ] CSV has columns: ParcelID, Plot_Name, Area, Price, Phone, Status, Marketer, Display_As
  - [ ] Saved as: `UMUNIKO_AMOFIA_TEMPLATE.csv`

### Phase 2: Google Sheets Setup
- [ ] Create new Google Sheet
- [ ] Name file: `MASTER_TEMPLATE_DATA`
- [ ] Name sheet tab: `UMUNIKO_AMOFIA_PARCELS` (case-sensitive!)
- [ ] Add headers (Row 1):
  - A: ParcelID
  - B: Status
  - C: Purchaser_Name
  - D: Phone_Number
  - E: Email_Address
  - F: Purchase_ID
  - G: Display_Preference
  - H: Area_SqM
  - I: Price_Naira
  - J: Sale_Date
  - K: Service_Fee_Due
  - L: Payment_Status
- [ ] Import CSV data (starting Row 2)
- [ ] Share sheet: File → Share → "Anyone with link" → Viewer
- [ ] Copy Sheet ID from URL: `docs.google.com/spreadsheets/d/[SHEET_ID]/edit`

### Phase 3: Repository Setup
- [ ] Fork Silverstone template repo
- [ ] Name new repo: `umuniko-amofia-estate-pvp`
- [ ] Clone: `git clone https://github.com/Azprojects-tech/umuniko-amofia-estate-pvp.git`

### Phase 4: Code Configuration
- [ ] Edit `index.html` line ~4553:
  ```javascript
  const GOOGLE_SHEETS_CONFIG = {
      spreadsheetId: '[YOUR_SHEET_ID]',
      apiKey: 'AIzaSyCkLewazfYqcQ_llw_Adj_mTNK71T2iRL0',
      sheetName: 'UMUNIKO_AMOFIA_PARCELS',
      sheetUrl: 'https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]/edit'
  };
  ```

### Phase 5: Customization
- [ ] **Estate Name References:**
  - Line ~501: `<title>Umuniko Amofia Estate - Real Estate Mapper</title>`
  - Line ~1169: `<h1>Umuniko Amofia Estate</h1>`

- [ ] **Contact Information:**
  - Line ~4061 & ~4079: Replace with `+2347025005871`
  - Update WhatsApp message template

- [ ] **Admin Password:**
  - Line ~4303: Change to `Skillnet2026`

- [ ] **Branding (Footer):**
  - Update company name if needed
  - Verify email: azprojectslimited@gmail.com

### Phase 6: Google Cloud API Key
- [ ] Go to: https://console.cloud.google.com/apis/credentials
- [ ] Edit: `Parcel-Vision-Pro-API-Key`
- [ ] Add domain restriction:
  - Add: `https://umuniko-amofia-pep.netlify.app/*`
  - (Note: Replace with actual Netlify URL once deployed)
- [ ] Wait 2-5 minutes for changes

### Phase 7: GitHub & Netlify Deployment
- [ ] Commit changes: `git add . && git commit -m "Setup Umuniko Amofia Estate PVP"`
- [ ] Push: `git push -u origin main`
- [ ] Connect to Netlify: https://app.netlify.com
- [ ] Auto-deploy enabled
- [ ] Note final URL for API key update

### Phase 8: Testing
- [ ] [ ] Portal loads without errors (F12 console)
- [ ] Parcels appear on map with colors
- [ ] Click Admin button → password field appears
- [ ] Enter `Skillnet2026` → Admin panel loads
- [ ] Click "Admin Sync" button
- [ ] Console shows: `✅ Public parcel statuses updated`
- [ ] Map colors match Google Sheets status

---

## ⚠️ CRITICAL DETAILS FOR THIS PROJECT

### GeoJSON Requirements
Your data comes from CAD/GIS, so PAY ATTENTION:

| Item | Requirement | Why |
|------|-------------|-----|
| **CRS** | WGS 84 (EPSG:4326) | Web maps use lat/long, not UTM |
| **Format** | 2D Polygon (not Polygon ZM) | Z/M values cause errors in web mapping |
| **Coordinates** | [7.XX, 6.XX] format | Around Enugu region |
| **Properties** | `Text`, `Shape_Area` | Code expects these exact names |

### Column Names (Case-Sensitive!)
```json
{
  "properties": {
    "Text": "1",           // ← ParcelID (Exactly as shown)
    "Shape_Area": 450.5    // ← Area in sqm (Exactly as shown)
  }
}
```
❌ WRONG: `text`, `shape_area`, `ID`, `SqM`  
✅ RIGHT: `Text`, `Shape_Area`

### Google Sheets Configuration
- **File Name:** `MASTER_TEMPLATE_DATA` - This is just the file name, not used in code
- **Sheet Tab Name:** `UMUNIKO_AMOFIA_PARCELS` - **THIS is what code uses (case-sensitive!)**
- **Sheet ID Example:** `1S5DaLtj6ZrZXKfGAuZh2VKjKKDAlHouNYzxn6Sj7UFM`
- **URL Format:** Copy from: `docs.google.com/spreadsheets/d/[COPY_THIS]/edit`

---

## 🔧 CSV GENERATION WORKFLOW

**Step 1: Prepare GeoJSON**
```bash
# Your GeoJSON from CAD/GIS conversion
# File: umuniko_amofia_parcels.geojson
# Must have: Text, Shape_Area properties
# Must be: WGS 84, 2D Polygon
```

**Step 2: Generate CSV**
```bash
# Python script extracts:
# - Text → ParcelID column
# - Shape_Area → Area_SqM column
# Creates template CSV with empty price/status columns
```

**Step 3: Import to Google Sheets**
```bash
# Upload CSV to sheet
# Fill in prices, phone numbers, status
# Done!
```

---

## 📞 CONTACT & REFERENCE

**Project Team:**
- Client Contact: +2347025005871
- AI Assistant: GitHub Copilot
- Support: azprojectslimited@gmail.com

**Deployment Info:**
- GitHub: https://github.com/Azprojects-tech/umuniko-amofia-estate-pvp
- Netlify: [URL after deployment]
- Google Sheet: [URL after creation]

**Shared API Key:**
- Key Name: `Parcel-Vision-Pro-API-Key`
- Status: Active
- Manages: Silverstone, Pineleaf, Umuniko Amofia (+ future portals)

---

## 🚨 COMMON MISTAKES (AVOID!)

| Mistake | Impact | Fix |
|---------|--------|-----|
| Using UTM coordinates instead of WGS 84 | Map won't display correctly | Reproject in QGIS/ArcGIS |
| Polygon ZM instead of 2D | Web errors | Remove Z/M values before export |
| Wrong property names: `ID` instead of `Text` | CSV generation fails | Verify `Text` and `Shape_Area` exactly |
| Sheet tab name: `Master_Data` instead of `UMUNIKO_AMOFIA_PARCELS` | 404 error on portal | Use exact case-sensitive name |
| Using file name in code instead of tab name | Portal won't load data | Use tab name from sheet bottom tabs |
| Forgetting to add Netlify domain to API restrictions | 403 Forbidden error | Add to Google Cloud Console |

---

**Last Updated:** March 15, 2026  
**Status:** In Progress - Awaiting GeoJSON file
