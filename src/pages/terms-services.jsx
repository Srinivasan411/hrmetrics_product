import { useSiteSettings } from "../siteSettings.jsx";

function preventDefault(event) {
  event.preventDefault();
}

export default function TermsServicesPage() {
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
                <h2 className="title">Terms of Service</h2>
                <div className="devider" />
              </div>

              <div className="p-4 p-md-5" style={{ background: "#fff", borderRadius: 12, border: "1px solid #e6ecf5" }}>
                <div className="acceptance">
                  <h4>Terms and Conditions for HRMetricS</h4>
                  <p>Welcome to HRMetricS! Before you proceed to use our HR management platform, we kindly request you to carefully read and understand the following Terms and Conditions, which govern your access and usage of our services. By using HRMetricS, you acknowledge and agree to comply with these terms.</p>
                </div>
                <h4>1. User Agreement</h4>
                <p>By registering for and using HRMetricS, you confirm that you are at least 16 years old and have the legal capacity to enter into a binding agreement.</p>
                <h4>2. Account Security</h4>
                <p>You are responsible for maintaining the confidentiality of your account credentials. All activities conducted under your account are your responsibility. Please notify us immediately of any unauthorized access or suspected security breach.</p>
                <h4>3. Prohibited Activities</h4>
                <p>You agree not to use HRMetricS for any unlawful, harmful, or abusive purposes. This includes but is not limited to unauthorized access to data, attempts to disrupt or interfere with our services, or violations of applicable laws and regulations.</p>
                <h4>4. Data Ownership and Privacy</h4>
                <p>You retain ownership of any data you provide. We are committed to protecting your privacy in accordance with our <a href="/privacy-policy">Privacy Policy</a>, which outlines how we collect, use, and safeguard your personal information.</p>
                <h4>5. Intellectual Property</h4>
                <p>All content on HRMetricS, including software, logos, trademarks, and related materials, is the intellectual property of HRMetricS. You may not copy, modify, distribute, or reproduce any part of the platform without prior written consent from HRMetricS.</p>
                <h4>6. Third-Party Content</h4>
                <p>HRMetricS may include links to third-party websites or services. We are not responsible for the accuracy, content, or practices of third-party sites. Any use or interaction with such content is at your own risk.</p>
                <h4>7. Service Modifications</h4>
                <p>We reserve the right to modify, suspend, or discontinue any aspect of HRMetricS at any time. Reasonable notice will be provided for material changes that may affect your use of the service.</p>
                <h4>8. Limitation of Liability</h4>
                <p>HRMetricS is provided on an "as-is" and "as-available" basis, without warranties of any kind. We are not liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the service.</p>
                <h4>9. Indemnification</h4>
                <p>You agree to indemnify and hold harmless HRMetricS, its affiliates, and personnel from any claims, damages, losses, or liabilities resulting from your breach of these Terms and Conditions.</p>
                <h4>10. Governing Law</h4>
                <p>These Terms and Conditions are governed by the laws of the jurisdiction in which HRMetricS is registered. Any legal disputes shall be subject to the exclusive jurisdiction of the competent courts in that region.</p>
                <h4>11. Termination</h4>
                <p>We reserve the right to suspend or terminate your access to HRMetricS at our discretion, particularly in cases of violations of these Terms and Conditions or any other misuse of the platform.</p>
                <h4>12. Contact Information</h4>
                <p>If you have any questions or concerns regarding these Terms and Conditions, please contact us at <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a></p>
                <address>
                  HRMetricS<br />
                  Maldives: {siteSettings.new_delhi_address}<br />
                  Madurai: {siteSettings.noida_address}<br />
                  Phone: {siteSettings.secondary_phone}<br />
                  Email: {siteSettings.primary_email}<br />
                  Website: <a href={siteSettings.company_url} target="_blank" rel="noopener noreferrer">hrmetrics.in</a>
                </address>
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
