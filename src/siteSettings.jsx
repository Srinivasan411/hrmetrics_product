import { createContext, useContext, useEffect, useMemo, useState } from "react";

export const defaultSiteSettings = {
  company_name: "HRMetricS",
  company_legal_name: "HRMetricS",
  company_url: "https://hrmetrics.in/",
  demo_login_url: "https://demo.hrmetrics.in/",
  whatsapp_number: "919910224881",
  whatsapp_message: "I'm interested in HRMetricS",
  primary_phone: "+91 99102 24881",
  secondary_phone: "+91 8800 1148 22",
  primary_email: "info@hrmetrics.in",
  new_delhi_address: "408 Siddharth Building, 96 Nehru Place, Maldives 110019, India",
  noida_address: "C-20, Sector - 65, Madurai - 201301, India",
  google_maps_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7084052583864!2d77.25087587508038!3d28.548483087893292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c5622de301%3A0xf45228a6f3859bfa!2sHRMetricS%20Systems%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1690783449740!5m2!1sen!2sin",
  linkedin_url: "https://www.linkedin.com/showcase/hrmetrics",
  facebook_url: "https://www.facebook.com/hrmetrics",
  x_url: "https://x.com/hrmetrics",
  instagram_url: "https://www.instagram.com/hrmetrics",
};

const SiteSettingsContext = createContext({
  siteSettings: defaultSiteSettings,
  refreshSiteSettings: async () => {},
});

function normalizePhoneHref(phone) {
  return `tel:${String(phone ?? "").replace(/[^\d+]/g, "")}`;
}

function createWhatsappUrl(number, message = "") {
  const digits = String(number ?? "").replace(/[^\d]/g, "");
  const encodedMessage = encodeURIComponent(String(message ?? "").trim());
  return encodedMessage ? `https://wa.me/${digits}?text=${encodedMessage}` : `https://wa.me/${digits}`;
}

export function SiteSettingsProvider({ children }) {
  const [siteSettings, setSiteSettings] = useState(defaultSiteSettings);

  async function refreshSiteSettings() {
    try {
      const response = await fetch("/api/site-settings");
      if (!response.ok) return;
      const payload = await response.json();
      if (payload?.data) {
        setSiteSettings((current) => ({ ...current, ...payload.data }));
      }
    } catch {
      // Keep defaults when the API is unavailable.
    }
  }

  useEffect(() => {
    refreshSiteSettings();
  }, []);

  const value = useMemo(
    () => ({
      siteSettings: {
        ...siteSettings,
        primary_phone_href: normalizePhoneHref(siteSettings.primary_phone),
        secondary_phone_href: normalizePhoneHref(siteSettings.secondary_phone),
        primary_email_href: `mailto:${siteSettings.primary_email}`,
        whatsapp_url: createWhatsappUrl(siteSettings.whatsapp_number, siteSettings.whatsapp_message),
        whatsapp_direct_url: createWhatsappUrl(siteSettings.whatsapp_number),
      },
      refreshSiteSettings,
    }),
    [siteSettings],
  );

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
