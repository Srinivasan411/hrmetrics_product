import { useSiteSettings } from "../siteSettings.jsx";

function preventDefault(event) {
  event.preventDefault();
}

export default function PrivacyPolicyPage() {
  const { siteSettings } = useSiteSettings();

  return (
    <div>
      <div className="top-bar-area top-bar-style-one text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="animate-text text-left">
                <h1 className="mb-0 typing-animation" style={{ fontSize: 16, fontWeight: 400, position: "relative", top: 2 }}>
                  Most Advanced HRM Software in Indian Market Trusted by Many <img alt="" src="assets/images/hand.gif" />
                </h1>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="social">
                <ul>
                  <li><a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in" /></a></li>
                  <li><a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a></li>
                  <li><a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer"><i>X</i></a></li>
                  <li><a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" /></a></li>
                  <li><a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp" /></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header-new">
        <div className="wsmobileheader clearfix">
          <a className="wsanimated-arrow" href="#" onClick={preventDefault} id="wsnavtoggle"><span /></a>
          <span className="smllogo"><img alt="" src="assets/images/logo1.png" width={80} /></span>
        </div>
        <div className="headerfull">
          <div className="container">
            <div className="wsmain clearfix">
              <div className="smllogo">
                <a href="/"><img alt="" src="assets/images/logo1.png" /></a>
              </div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list">
                  <li aria-haspopup="true"><a className="navtext" href="/"><span /> <span>Home</span></a></li>
                  <li aria-haspopup="true"><a className="navtext" href="/#about"><span /> <span>About</span></a></li>
                  <li aria-haspopup="true"><a className="navtext" href="/#pricing"><span /> <span>Pricing</span></a></li>
                  <li aria-haspopup="true"><a className="navtext" href="/#faq"><span /> <span>FAQ</span></a></li>
                  <li className="wscarticon clearfix">
                    <a className="btn btn-theme text-white btn-md radius" href={siteSettings.demo_login_url} target="_blank" rel="noopener noreferrer">Login</a>
                    <a className="btn btn-theme text-white btn-md radius" data-bs-target="#demoshedule-modal" data-bs-toggle="modal" href="#" onClick={preventDefault}>Schedule a demo</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <section className="default-padding bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <div className="site-heading text-center mb-4">
                <h4 className="sub-title">Legal</h4>
                <h2 className="title">Privacy Policy</h2>
                <div className="devider" />
              </div>

              <div className="p-4 p-md-5" style={{ background: "#fff", borderRadius: 12, border: "1px solid #e6ecf5" }}>
                <div className="acceptance">
                  <h4>Privacy Policy</h4>
                  <p>At HRMetricS, we are committed to safeguarding the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, and protect your data when you interact with our HR management platform.</p>
                </div>
                <h4>1. Information We Collect</h4>
                <p>We may collect personal information such as name, contact details, and job-related data when you sign up or use our services. We also gather usage information to enhance user experience and improve our platform.</p>
                <h4>2. How We Use Your Information</h4>
                <p>Your data is used to provide and improve our HRM services, personalize your experience, and communicate important updates. We do not share your information with third parties for marketing purposes without your explicit consent.</p>
                <h4>3. Data Security</h4>
                <p>We employ industry-standard security measures to protect your data from unauthorized access, alteration, or disclosure. Our systems undergo regular security assessments to ensure the safety of your information.</p>
                <h4>4. Cookies and Tracking</h4>
                <p>HRMetricS uses cookies and similar technologies to analyze website traffic and improve our services. You have the option to manage cookie preferences through your browser settings.</p>
                <h4>5. Third-Party Services</h4>
                <p>Our platform may contain links to third-party websites or services. We are not responsible for their privacy practices, and we recommend reviewing their respective privacy policies.</p>
                <h4>6. Data Retention</h4>
                <p>We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, or as required by law.</p>
                <h4>7. Children's Privacy</h4>
                <p>HRMetricS is not intended for use by individuals under the age of 16. We do not knowingly collect personal information from minors without parental consent.</p>
                <h4>8. Updates to the Privacy Policy</h4>
                <p>We may update this Privacy Policy from time to time. Any significant changes will be communicated through our website or by email.</p>
                <h4>9. Contact Us</h4>
                <p>If you have any questions or concerns regarding your privacy or our data practices, please reach out to our support team at <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a>.</p>
                <p>By using HRMetricS services, you consent to the terms outlined in this Privacy Policy. Your trust is essential to us, and we are committed to protecting your privacy and ensuring a secure HR management experience.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-bg text-light bg-cover footer-clean">
        <div className="container">
          <div className="f-items relative pt-50 pb-40 pt-xs-0 pb-xs-30">
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="f-item about">
                  <img alt="Logo" className="logo mb-2" src="assets/images/Logo.png" style={{ height: 44 }} />
                  <h5 className="mb-2">HRMetricS</h5>
                  <p className="mb-0">AI-powered document and HR automation for enterprises.</p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="f-item link">
                  <h4 className="widget-title">Company</h4>
                  <ul>
                    <li><a href="/#about">About</a></li>
                    <li><a href="/#contact">Contact</a></li>
                    <li><a href="/terms-services">Terms of service</a></li>
                    <li><a href="/privacy-policy">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="f-item link">
                  <h4 className="widget-title">Contact</h4>
                  <ul>
                    <li><a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer">{siteSettings.primary_phone}</a></li>
                    <li><a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a></li>
                    <li><a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
