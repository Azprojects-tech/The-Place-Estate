// THE PLACE ESTATE CONFIGURATION
// Generated: April 21, 2026

const ESTATE_CONFIG = {
  name: "The Place Estate",
  location: "Enugu",
  state: "Enugu",
  country: "Nigeria",
  
  contact: {
    whatsapp: "+2349060646900",
    email: "info@arkeyltd.com",
    phone: "+2349060646900"
  },
  
  coordinates: {
    // Auto-calculated from parcel bounding box - no manual entry needed
    center: [6.512298, 7.580954],   // [lat, lng] for Leaflet
    zoom: 17
  },
  
  plots: {
    total: 36,
    status: {
      available: "Available",
      reserved: "Reserved",
      sold: "Sold"
    }
  },
  
  google_sheets: {
    sheet_id: "PASTE_SHEET_ID_HERE",
    sheet_tab: "THE_PLACE_ESTATE_PARCELS",
    enabled: true
  },
  
  admin: {
    password: "Val2026",
    features: {
      edit_status: true,
      change_prices: true,
      manage_marketers: true,
      export_data: true
    }
  },
  
  branding: {
    company: "A&Z Projects Ltd",
    logo_url: "https://azprojects-tech.github.io/assets/logo.png",
    footer_contact: "info@arkeyltd.com"
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ESTATE_CONFIG;
}
