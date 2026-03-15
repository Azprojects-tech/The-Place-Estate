// UMUNIKO AMOFIA ESTATE CONFIGURATION
// Generated: March 15, 2026

const ESTATE_CONFIG = {
  name: "Umuniko Amofia Estate",
  location: "Eha-Amufu Township",
  state: "Enugu",
  country: "Nigeria",
  
  contact: {
    whatsapp: "+2347025005871",
    email: "info@azprojectslimited.com",
    phone: "+2347025005871"
  },
  
  coordinates: {
    center: [7.77, 6.65],
    zoom: 15
  },
  
  plots: {
    total: 100,
    status: {
      available: "Available",
      reserved: "Reserved",
      sold: "Sold"
    }
  },
  
  google_sheets: {
    sheet_id: "1fDTPcYIu6dRfydAiqoKs_pYsKh2xhtbHN7YUNsULEwA",
    enabled: true
  },
  
  admin: {
    password: "Skillnet2026",
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
    footer_contact: "info@azprojectslimited.com"
  }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ESTATE_CONFIG;
}
