const path = require("path");
const {
  dbPath,
  listAllTestimonials,
  getAllSiteSettings,
  listAllPricingPlans,
} = require("../server/db.cjs");

function run() {
  const pricing = listAllPricingPlans();
  const testimonials = listAllTestimonials();
  const settings = getAllSiteSettings();

  console.log("DB synced successfully.");
  console.log("dbPath:", path.resolve(dbPath));
  console.log("pricing_plans:", pricing.length);
  console.log("testimonials:", testimonials.length);
  console.log("site_settings keys:", Object.keys(settings).length);
}

run();
