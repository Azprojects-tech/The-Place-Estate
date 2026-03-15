# PVP PRODUCTIZATION - Technical Roadmap & Known Issues

**Version 1.0** | Created: March 15, 2026  
**Project:** Parcel Vision Pro (PVP) - Automation & Scaling  
**Status:** Design Phase - Ready for Development

---

## 🚨 KNOWN ISSUES (Active Development)

### Issue 1: Ephemeral Error Message on Portal Load
**Severity:** Low (Cosmetic)  
**Frequency:** Every page load  
**Duration:** <1 second (hidden by welcome modal)  
**Location:** `index.html` lines 1310-1330 (GeoJSON loading)  
**Description:** Brief error message flashes before welcome screen appears

**Root Cause:**
```javascript
// Lines 1310-1330: Async loading issue
async function loadGeoJSON() {
    try {
        const response = await fetch('./subdivision_data.json');
        if (!response.ok) {
            throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
        }
        subdivisionData = await response.json();
        console.log('✅ GeoJSON loaded successfully...');
        initMap();
    } catch (error) {
        console.error('❌ Error loading GeoJSON:', error);  // ← This may display briefly
        subdivisionData = {"type": "FeatureCollection", "features": []};
        initMap();  // ← May run before data ready
    }
}
```

**Next Steps:**
- [ ] Suppress error display until complete initialization
- [ ] Add retry logic for file loading
- [ ] Ensure welcome modal only shows AFTER data is fully loaded
- [ ] Test on slow network connections

---

## 🏭 PVP PRODUCTIZATION INITIATIVE

### Vision
Transform PVP from **manual development** (requires AI/developer) to **automated deployment** (secretary/non-technical user can handle).

### Current State
```
Client provides GeoJSON
         ↓
AI does: Validate, Extract CSV, Configure code, Deploy
         ↓
Portal Live (30-45 minutes, requires developer)
```

### Target State
```
Secretary fills GUI form
         ↓
CAD tech uploads GeoJSON
         ↓
GUI validates, extracts, configures, generates all files
         ↓
Secretary imports to Google Sheets (step-by-step guide)
         ↓
Admin (you) grants API access (one-time per service account)
         ↓
Secretary clicks "BUILD & DEPLOY"
         ↓
Portal Live (5-10 minutes, zero coding required)
```

---

## 📋 WORKFLOW: PVP CREATOR GUI

### Role: CAD Technician
1. **Input:** Client location (GIS coordinates)
2. **Output:** GeoJSON file (validated, WGS 84, 2D polygons)
3. **Delivery:** Email to secretary

### Role: Secretary (Non-Technical)
1. **Step 1:** Open PVP Creator GUI
2. **Step 2:** Fill form:
   - Estate name
   - Location (township, state)
   - Contact phone number
   - Admin password
   - CAD technician name (for audit log)
3. **Step 3:** Upload GeoJSON file
4. **Step 4:** GUI shows validation results
   - If errors: Secretary contacts CAD tech to fix
   - If passed: Proceed to Step 5
5. **Step 5:** Review auto-generated CSV
   - Verify 12 columns present
   - Verify no data type errors
   - Approve or request changes
6. **Step 6:** Follow step-by-step Google Sheets instructions (provided by GUI)
   - Create sheet: `MASTER_TEMPLATE_DATA`
   - Create tab: `[ESTATE]_PARCELS`
   - Import CSV
   - Copy Sheet ID → paste into Creator GUI
7. **Step 7:** Give Sheet ID to Admin (you)
8. **Step 8:** Wait for Admin to grant API access
9. **Step 9:** Click "BUILD" button
   - GUI clones template repo
   - Replaces all estate references
   - Updates Google Sheet ID
   - Updates phone number
   - Commits to GitHub
   - Returns Git URL
10. **Step 10:** Provide Git URL + Netlify authorization
11. **Step 11:** Click "DEPLOY" button
    - GUI connects to GitHub
    - Creates Netlify site
    - Deploys code
    - Returns live portal URL

### Role: Admin (You)
1. **API Key Management:**
   - Secretary provides Sheet ID
   - You verify sheet ownership & sharing
   - You grant API access to Google Sheets in Google Cloud
   - You add Netlify domain to API key restrictions
   - You notify secretary "API ready"
2. **Quality Control:**
   - Test portal at live URL before delivery to client
   - Verify 100+ parcels load
   - Test WhatsApp sharing
   - Approve for client delivery

---

## 🛠️ TECHNICAL ARCHITECTURE

### Frontend Component: PVP Creator GUI
**Purpose:** Web-based interface for non-technical portal creation  
**Users:** Secretary, CAD tech (read-only audit log)  
**Technology:** React/Vue + Bootstrap  
**Hosting:** Your server or Netlify

### Backend Component: PVP Creator API
**Purpose:** Automate GeoJSON validation, CSV generation, code template customization  
**Functions:**
1. `validateGeoJSON(file)` - Check CRS, geometry type, properties
2. `extractCSV(geojson)` - Generate 12-column CSV
3. `customizeTemplate(config)` - Find & replace all estate references
4. `commitToGitHub(repo, files)` - Automatic git push
5. `deployToNetlify(repo)` - Automatic portal deployment

**Technology:** Node.js/Python Flask  
**Hosting:** Your server or AWS Lambda

### Storage
**GeoJSON files:** Temporary (deleted after processing)  
**CSVs:** Stored 30 days for audit log  
**Configurations:** Database (PostgreSQL/MongoDB)  
**Audit Log:** All actions logged with timestamp

---

## 📝 GUI FORM FIELDS (Secretary Input)

### Basic Information
```
□ Estate Name (required)          "Umuniko Amofia Estate"
□ Location (required)              "Eha-Amufu Township, Enugu State"
□ Contact Phone (required)         "+2347025005871"
□ Admin Password (required)        "Skillnet2026"
□ Number of Parcels (auto-fill)    "100" ← Detected from GeoJSON
□ Notes                            "Free text for audit trail"
```

### File Upload
```
□ GeoJSON File (drag & drop)  [Upload geojson file]
  ├─ Validation Results:
  │  ✅ CRS: WGS 84 (EPSG:4326)
  │  ✅ Geometry: 2D Polygon
  │  ✅ Features: 100
  │  ✅ Properties: Text, Shape_Area
  │  ❌ Issue: Shape_Area is string (auto-fix: converting to number)
```

### Google Sheets Configuration
```
□ Sheet ID  [Paste from URL docs.google.com/spreadsheets/d/[THIS]/edit]
□ Sheet Tab Name (auto-fill) "UMUNIKO_AMOFIA_PARCELS"
```

### Deployment
```
□ GitHub Token (one-time setup)
□ Netlify Token (one-time setup)
□ [BUILD PORTAL] button
│  ├─ Validating configuration...
│  ├─ Creating GitHub repo...
│  ├─ Pushing code...
│  ├─ Deploying to Netlify...
│  └─ ✅ Portal live at: https://umuniko-amofia-estate.netlify.app
```

---

## 🔄 AUTOMATED CUSTOMIZATION ENGINE

### Find & Replace Matrix (Automated)

The GUI will programmatically replace:

| Template | Find | Replace With | Examples |
|----------|------|--------------|----------|
| Estate Name | `Silverstone Estate` | `[INPUT: Estate Name]` | Umuniko Amofia Estate |
| Location | `Oranwezueaku` | `[INPUT: Location]` | Eha-Amufu Township |
| Phone | `+2347042282585` | `[INPUT: Phone]` | +2347025005871 |
| Password | `'pineleaf2026'` | `[INPUT: Password]` | 'Skillnet2026' |
| Sheet ID | `'1kkYjO9...'` | `[Sheet ID from GS]` | '1fDTPcYI...' |
| Sheet Tab | `'SILVERSTONE_PARCELS'` | `'[ESTATE]_PARCELS'` | 'UMUNIKO_AMOFIA_PARCELS' |
| GeoJSON ref | `'./Oranwezu.geojson'` | `'./subdivision_data.json'` | Fixed path |
| Map Center | `[6.46, 7.42]` | `[Auto-detect from GeoJSON]` | [7.77, 6.65] |
| Welcome Modal | `WELCOME TO PINELEAF` | `WELCOME TO [ESTATE]` | WELCOME TO UMUNIKO AMOFIA |
| Zoom Message | `Viewing Silverstone...` | `Viewing [ESTATE]...` | Viewing Umuniko Amofia... |

**Implementation:** Regex-based find & replace + manual validation

---

## 🔐 SECURITY & CONTROL

### What Secretary CANNOT Do
- ❌ Change API key (centralized, only admin)
- ❌ Deploy to production without approval
- ❌ Access other portals' Google Sheets
- ❌ Modify code beyond GUI fields

### What Secretary CAN Do
- ✅ Upload GeoJSON
- ✅ Fill out estate information
- ✅ See validation results
- ✅ Import CSV to Google Sheets
- ✅ Build portal (when approved)
- ✅ View deployment status

### What ADMIN (You) CONTROLS
- ✅ API key management
- ✅ Google Sheets API access grants
- ✅ Final approval before deployment
- ✅ Production domain restrictions
- ✅ Audit log access
- ✅ User role management

---

## 📊 AUTOMATED DATA VALIDATION

### CSV Generation Engine

**What it checks:**
```javascript
✅ All 12 columns present and correct order
✅ ParcelID column matches GeoJSON Text property
✅ Area_SqM converted to number (not string)
✅ Area_SqM rounded to 2 decimals
✅ Price_Naira formatted as numbers (if present)
✅ Phone numbers have country code
✅ Dates in YYYY-MM-DD format
✅ No null values in critical columns
✅ Row count matches GeoJSON feature count
```

**What it fixes automatically:**
```javascript
✅ text → Text (capital T)
✅ "450.57" → 450.57 (string to number)
✅ 450.573 → 450.57 (round to 2 decimals)
✅ Missing columns → Add with blank values
✅ Wrong order → Reorder to standard
```

**What it reports:**
```
GeoJSON Validation Report
─────────────────────────────────
✅ Format: Valid GeoJSON
✅ CRS: WGS 84 (EPSG:4326)
✅ Geometry: 2D Polygon (100 features)
✅ Properties: Text, Shape_Area present
⚠️  Issue: Shape_Area is string type
   Solution: Auto-converted to number
✅ Result: READY FOR CSV GENERATION
```

---

## 📈 SCALABILITY BENEFITS

### Before (Current - Manual)
```
Time per portal: 40 minutes
Cost per portal: Developer time (expensive)
Bottleneck: AI/developer availability
Max portals/month: 5-10
Expertise needed: High (coding, GIS, API config)
```

### After (Automated - GUI)
```
Time per portal: 5-10 minutes (secretary can do it)
Cost per portal: ~$0 (no developer time)
Bottleneck: GeoJSON quality from CAD tech
Max portals/month: 50-100+ (parallel processing)
Expertise needed: Low (follow GUI steps)
```

**ROI:** After 10 portals built, you've saved 300+ developer hours

---

## 🚀 PHASE 1 IMPLEMENTATION (MVP)

### Minimum Viable Product
```
☐ GeoJSON validator (WGS 84, 2D, properties check)
☐ CSV extractor (12 columns, proper types)
☐ Find & Replace engine (estate name, phone, password, etc.)
☐ Step-by-step Google Sheets guide (inline in GUI)
☐ GitHub integration (create repo, push code)
☐ Netlify integration (deploy site)
☐ Error reporting & validation messages
☐ Audit log (all actions timestamped)
```

### Timeline Estimate
```
Design & Planning:      1 week
Backend Development:    2-3 weeks
Frontend Development:   2-3 weeks
Testing & QA:          1 week
Deployment:            1 week
─────────────────────────────
Total:                  7-9 weeks
```

---

## 📌 CRITICAL SUCCESS FACTORS

1. **GeoJSON Quality Control**
   - CAD technician must deliver valid files
   - GUI validates and rejects bad files early
   - Secretary knows exactly what to ask for

2. **Google Sheets Consistency**
   - All portals use same sheet structure
   - Tab naming is standardized
   - API access is centrally controlled

3. **Template Maintenance**
   - Update template once → all new portals benefit
   - Version control for template changes
   - Backward compatibility for existing portals

4. **Secretary Training**
   - Clear step-by-step documentation
   - Video walkthrough for each role
   - Support channel for questions

5. **Admin Oversight**
   - Final quality check before deployment
   - API key security (only you control)
   - Audit trail for compliance

---

## 🎯 SUCCESS METRICS

**Measure After MVP Launch:**

| Metric | Target | Current |
|--------|--------|---------|
| Time to deploy | <10 min | 40 min |
| User (secretary) success rate | 95% | N/A |
| Portals per month | 20+ | 3-5 |
| Re-work/bugs | <5% | 0% |
| Secretary satisfaction | 4.5/5 | N/A |
| Admin time per portal | <5 min | 40 min |

---

## 📎 APPENDIX: Related Issues to Track

| Issue | Status | Location |
|-------|--------|----------|
| Ephemeral error on page load | Open | index.html:1310-1330 |
| CSV column requirements doc | Complete | CSV_COLUMN_REFERENCE.md |
| Find & Replace checklist | Complete | FIND_REPLACE_CHECKLIST.md |
| New portal quickstart | Complete | PVP_NEW_PORTAL_QUICKSTART.md |
| GUI creation | Not started | TBD |
| Validation engine | Not started | TBD |
| Automation scripts | Not started | TBD |

---

**Next Steps:**
1. Review this productization roadmap with your team
2. Prioritize GUI features based on secretary feedback
3. Allocate development resources
4. Create detailed technical specifications for each module
5. Begin MVP development after 2-3 more portals (refine workflow)

**Contact:** Your development team or outsourced contractor for GUI/automation build

---

**Document Version:** 1.0  
**Last Updated:** March 15, 2026  
**Next Review:** After next 3 portal completions
