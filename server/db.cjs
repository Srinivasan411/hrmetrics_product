const fs = require("fs");
const path = require("path");
const Database = require("better-sqlite3");

const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "hrmetrics.sqlite");

const seedTestimonials = [
  {
    client_name: "Tapasya",
    client_role: "HR Head",
    company_name: "IndiaIT360",
    image_url: "assets/images/testhr.png",
    testimonial:
      "It's easy to manage HR processes than what we where doing it manually. After adopting HRMetricS, we are able to same time by automating all the manual processes from attendance tracking to leave approvals and payslip generation, everything is now automated and accessible in just a few clicks. Our employees love the self-service portal, and our HR team has finally moved from firefighting to strategic planning. Kudos to the HRMetricS intuitive HRMS platform for such a comprehensive solution!",
    rating: 5,
    is_active: 1,
    sort_order: 1,
  },
  {
    client_name: "Vivek Arora",
    client_role: "HR Head",
    company_name: "Simsona",
    image_url: "assets/images/test4.jpg",
    testimonial:
      "At Simsona, we have completely transformed the way we handle recruitment and performance reviews. The platform is intuitive, fast, and incredibly powerful. We've reduced our employee onboarding to exit process by nearly 40% and gained real-time visibility into employee performance metrics. It's like having an extra HR manager onboard, only smarter!",
    rating: 5,
    is_active: 1,
    sort_order: 2,
  },
  {
    client_name: "Anita Mishra",
    client_role: "VP of Employee Relations",
    company_name: "",
    image_url: "assets/images/test3.jpg",
    testimonial:
      "HRMetricS has made our payroll processing seamless and efficient. What used to take several days now takes less than two days with error-free calculations and payslip generation at the click of a button.",
    rating: 5,
    is_active: 1,
    sort_order: 3,
  },
  {
    client_name: "Kritika Sharma",
    client_role: "Employee Relation Manager",
    company_name: "",
    image_url: "assets/images/test5.avif",
    testimonial:
      "HRMetricS is built for every kind of workforce. Our field employees can now mark their attendance and submit expenses on the go, right from their mobile devices.",
    rating: 5,
    is_active: 1,
    sort_order: 4,
  },
  {
    client_name: "Beena Rathi",
    client_role: "Talent Acquisition Coordinator",
    company_name: "",
    image_url: "assets/images/test6.jpg",
    testimonial:
      "Our employees appreciate the transparency and convenience HRMetricS offers, easy access to personal data, a clear and timely payroll process, and smooth leave and attendance management. The platform's secure data handling also builds trust. It's more than just an HR tool, it's an asset to employee satisfaction.",
    rating: 5,
    is_active: 1,
    sort_order: 5,
  },
  {
    client_name: "Carmen Bety",
    client_role: "Talent Acquisition Specialist",
    company_name: "",
    image_url: "assets/images/test7.jpeg",
    testimonial:
      "I've always liked the software we were using for years, but after exploring other platforms like HRMetricS, it turned out to be the best fit for our needs. HRMetricS stood out with its powerful customization options. We're able to create tailored workflows that fit our unique processes, something I haven't seen with other HR solutions. It offers outstanding value.",
    rating: 5,
    is_active: 1,
    sort_order: 6,
  },
  {
    client_name: "Ruby Nair",
    client_role: "Chief Human Resources Officer",
    company_name: "",
    image_url: "assets/images/test8.jpg",
    testimonial:
      "One of the standout features of HRMetricS is its versatility. It's not just limited to the HR team, our Assets, Office Management, Training, and Finance departments all use it effectively to streamline their operations.",
    rating: 5,
    is_active: 1,
    sort_order: 7,
  },
];

const defaultSiteSettings = {
  company_name: "HRMetricS",
  company_legal_name: "Unistal Systems Pvt. Ltd",
  company_url: "https://unistal.com/",
  demo_login_url: "https://demo.hrmmitra.in/",
  whatsapp_number: "919910224881",
  whatsapp_message: "I'm interested in HRMMitra",
  primary_phone: "+91 99102 24881",
  secondary_phone: "+91 8800 1148 22",
  primary_email: "marketing@unistal.com",
  new_delhi_address: "408 Siddharth Building, 96 Nehru Place, New Delhi 110019, India",
  noida_address: "C-20, Sector - 65, Noida - 201301, India",
  google_maps_embed_url:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.7084052583864!2d77.25087587508038!3d28.548483087893292!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c5622de301%3A0xf45228a6f3859bfa!2sUnistal%20Systems%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1690783449740!5m2!1sen!2sin",
  linkedin_url: "https://www.linkedin.com/showcase/hrmmitra",
  facebook_url: "https://www.facebook.com/hrmmitra",
  x_url: "https://x.com/hrmmitra",
  instagram_url: "https://www.instagram.com/hrmmitra",
};

function ensureDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function mapRow(row) {
  return {
    id: row.id,
    clientName: row.client_name,
    clientRole: row.client_role,
    companyName: row.company_name,
    imageUrl: row.image_url,
    testimonial: row.testimonial,
    rating: row.rating,
    isActive: Boolean(row.is_active),
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

ensureDirectory(dataDir);

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_name TEXT NOT NULL,
    client_role TEXT NOT NULL DEFAULT '',
    company_name TEXT NOT NULL DEFAULT '',
    image_url TEXT NOT NULL DEFAULT '',
    testimonial TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    is_active INTEGER NOT NULL DEFAULT 1,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`);

const existingCount = db.prepare("SELECT COUNT(*) AS count FROM testimonials").get().count;
if (existingCount === 0) {
  const insert = db.prepare(`
    INSERT INTO testimonials (
      client_name, client_role, company_name, image_url, testimonial, rating, is_active, sort_order
    ) VALUES (
      @client_name, @client_role, @company_name, @image_url, @testimonial, @rating, @is_active, @sort_order
    )
  `);
  const transaction = db.transaction((rows) => {
    for (const row of rows) insert.run(row);
  });
  transaction(seedTestimonials);
}

const existingSettingKeys = new Set(db.prepare("SELECT key FROM site_settings").all().map((row) => row.key));
const insertSetting = db.prepare(`
  INSERT INTO site_settings (key, value, updated_at)
  VALUES (?, ?, CURRENT_TIMESTAMP)
`);
for (const [key, value] of Object.entries(defaultSiteSettings)) {
  if (!existingSettingKeys.has(key)) {
    insertSetting.run(key, String(value));
  }
}

const selectPublicTestimonials = db.prepare(`
  SELECT * FROM testimonials
  WHERE is_active = 1
  ORDER BY sort_order ASC, id DESC
`);

const selectAllTestimonials = db.prepare(`
  SELECT * FROM testimonials
  ORDER BY sort_order ASC, id DESC
`);

const selectTestimonialById = db.prepare(`
  SELECT * FROM testimonials
  WHERE id = ?
`);

const insertTestimonial = db.prepare(`
  INSERT INTO testimonials (
    client_name, client_role, company_name, image_url, testimonial, rating, is_active, sort_order, created_at, updated_at
  ) VALUES (
    @client_name, @client_role, @company_name, @image_url, @testimonial, @rating, @is_active, @sort_order, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
  )
`);

const updateTestimonial = db.prepare(`
  UPDATE testimonials
  SET
    client_name = @client_name,
    client_role = @client_role,
    company_name = @company_name,
    image_url = @image_url,
    testimonial = @testimonial,
    rating = @rating,
    is_active = @is_active,
    sort_order = @sort_order,
    updated_at = CURRENT_TIMESTAMP
  WHERE id = @id
`);

const deleteTestimonial = db.prepare(`
  DELETE FROM testimonials
  WHERE id = ?
`);

const selectAllSiteSettings = db.prepare(`
  SELECT key, value
  FROM site_settings
  ORDER BY key ASC
`);

const upsertSiteSetting = db.prepare(`
  INSERT INTO site_settings (key, value, updated_at)
  VALUES (@key, @value, CURRENT_TIMESTAMP)
  ON CONFLICT(key) DO UPDATE SET
    value = excluded.value,
    updated_at = CURRENT_TIMESTAMP
`);

function listPublicTestimonials() {
  return selectPublicTestimonials.all().map(mapRow);
}

function listAllTestimonials() {
  return selectAllTestimonials.all().map(mapRow);
}

function getTestimonial(id) {
  const row = selectTestimonialById.get(id);
  return row ? mapRow(row) : null;
}

function createTestimonial(input) {
  const result = insertTestimonial.run(input);
  return getTestimonial(result.lastInsertRowid);
}

function saveTestimonial(id, input) {
  updateTestimonial.run({ ...input, id });
  return getTestimonial(id);
}

function removeTestimonial(id) {
  return deleteTestimonial.run(id);
}

function getAllSiteSettings() {
  const settings = { ...defaultSiteSettings };
  for (const row of selectAllSiteSettings.all()) {
    const nextValue = String(row.value ?? "").trim();
    settings[row.key] = nextValue || defaultSiteSettings[row.key] || "";
  }
  return settings;
}

function saveSiteSettings(input) {
  const transaction = db.transaction((entries) => {
    for (const [key, value] of entries) {
      upsertSiteSetting.run({ key, value: String(value ?? "") });
    }
  });

  transaction(Object.entries(input));
  return getAllSiteSettings();
}

module.exports = {
  db,
  dbPath,
  defaultSiteSettings,
  listPublicTestimonials,
  listAllTestimonials,
  getTestimonial,
  createTestimonial,
  saveTestimonial,
  removeTestimonial,
  getAllSiteSettings,
  saveSiteSettings,
};
