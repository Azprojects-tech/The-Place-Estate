# QUICK REFERENCE: Umuniko Amofia Estate PVP

**Estate Name:** Umuniko Amofia Estate  
**Location:** Eha-Amufu Township, Enugu State  
**Contact:** +2347025005871  
**Admin Password:** Skillnet2026  
**Project Folder:** C:\Users\Admin\ONUO Estate  

---

## ⚡ QUICK SETUP (Copy-Paste Reference)

### GeoJSON Validation
```bash
✅ Coordinates are [7.XX, 6.XX] (not [800000, 850000])
✅ Polygon (2D, not Polygon ZM)
✅ Properties include: Text, Shape_Area
✅ File validates at geojson.io
```

### Google Sheets
```
File Name: MASTER_TEMPLATE_DATA
Sheet Tab: UMUNIKO_AMOFIA_PARCELS  ← CASE-SENSITIVE!
Sharing: Anyone with link → Viewer
Sheet ID: [Copy from URL between /d/ and /edit]
```

### Code Configuration (index.html line ~4553)
```javascript
const GOOGLE_SHEETS_CONFIG = {
    spreadsheetId: '[YOUR_SHEET_ID]',
    apiKey: 'AIzaSyCkLewazfYqcQ_llw_Adj_mTNK71T2iRL0',
    sheetName: 'UMUNIKO_AMOFIA_PARCELS',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]/edit'
};
```

### Customizations to Replace
| Line | Find | Replace |
|------|------|---------|
| ~501 | Page title | Umuniko Amofia Estate - Real Estate Mapper |
| ~1169 | H1 heading | Umuniko Amofia Estate |
| ~4061 | WhatsApp msg | +2347025005871 |
| ~4079 | Contact info | +2347025005871 |
| ~4303 | Password | Skillnet2026 |

### Google Cloud API Key
```
Console: https://console.cloud.google.com/apis/credentials
Key: Parcel-Vision-Pro-API-Key
Add Domain: https://umuniko-amofia-pep.netlify.app/*
Wait: 2-5 minutes
```

### GitHub & Netlify
```bash
# Clone template
git clone https://github.com/Azprojects-tech/silverstone-estate-pvp.git umuniko-amofia-estate-pvp
cd umuniko-amofia-estate-pvp
git remote set-url origin https://github.com/Azprojects-tech/umuniko-amofia-estate-pvp.git

# Update code, then:
git add .
git commit -m "Setup Umuniko Amofia Estate"
git push -u origin main

# Deploy: https://app.netlify.com → New from Git → Select repo
```

### Testing Commands
```bash
# In browser console (F12):
# Should see ✅ Public parcel statuses updated

# Check for errors:
# Should be 0 errors (red messages)
```

---

## ❌ Common Mistakes

1. **Wrong CRS** - Data in UTM not WGS 84 → Map won't work
2. **Polygon ZM** - 3D geometry → Web errors → Use 2D only
3. **Sheet name** - `umuniko_amofia` not `UMUNIKO_AMOFIA_PARCELS` → 404 error
4. **Forgot domain** - Portal URL not in API key restrictions → 403 error
5. **File name vs Tab name** - Using `MASTER_TEMPLATE_DATA` in code → Wrong (use tab name)

---

## ✅ Expected Results

| Step | Result |
|------|--------|
| Portal loads | Blue/green map with parcels colored by status |
| Click parcel | Highlight + info popup |
| Admin button | Password prompt appears |
| Correct password | Admin panel shows (green checkmark) |
| Admin Sync | Console shows: ✅ Public parcel statuses updated |

---

## 📞 Support

- Full Guide: [PVP_MASTER_GUIDE_v2.md](PVP_MASTER_GUIDE_v2.md)
- Project Guide: [UMUNIKO_AMOFIA_SETUP.md](../ONUO%20Estate/UMUNIKO_AMOFIA_SETUP.md)
- Email: azprojectslimited@gmail.com
- WhatsApp: +2347031643793
