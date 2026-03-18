import React from 'react';
import { useSiteSettings } from "../siteSettings.jsx";

const AboutPage = () => {
  const { siteSettings } = useSiteSettings();

  return (
    <div>
      {/* Google Tag Manager */}
      <noscript>
        <iframe height="0" src="https://www.googletagmanager.com/ns.html?id=GTM-NLKK4WBM" style={{display:'none',visibility:'hidden'}} width="0"></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      
      {/* Start Header Top */}
      <div className="top-bar-area top-bar-style-one text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="animate-text text-left">
                <h1 className="mb-0 typing-animation" style={{fontSize: '16px', fontWeight: 400, position: 'relative', top: '2px'}}>
                  Most Advanced HRM Software in Indian Market Trusted by Many <img alt="" src="../assets/images/hand.gif"/>
                </h1>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="social">
                <ul>
                  <li>
                    <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer">
                      <i className="">X</i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Header Top */}
      
        <div className="header-new">
        {/* Mobile Header */}
        <div className="wsmobileheader clearfix">
          <a className="wsanimated-arrow" href="javascript:void(0)" id="wsnavtoggle"><span></span></a>
          <span className="smllogo">
            <img alt="HRMetricS" className="brand-logo" src="/assets/images/logo1.png" />
          </span>
        </div>
        {/* Mobile Header */}
        <div className="headerfull">
          <div className="container">
            <div className="wsmain clearfix">
              <div className="smllogo">
                <a href="/">
                  <img alt="HRMetricS" className="brand-logo" src="/assets/images/logo1.png" />
                </a>
              </div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list">
                  <li aria-haspopup="true"><a className="navtext" href="/"><span></span> <span>Home</span></a></li>
                  <li aria-haspopup="true"><a className="navtext" href="/about"><span></span> <span>About</span></a></li>
                  <li aria-haspopup="true" className="megmeanu">
                    <a className="navtext" href="#">
                      <span></span>
                      <span>Product</span>
                    </a>
                    <div className="wsshoptabing wtsbrandmenu clearfix">
                      <div className="wsshoptabingwp clearfix">
                        <ul className="wstabitem02 clearfix">
                          <li className="wsshoplink-active">
                            <a href="/hrm-soultion-software">
                              <i className="fas fa-female"></i>HRMS 
                            </a>
                            <div className="wsshoptab-active wstbrandbottom clearfix">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="/company-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/organization.png"/></span> Company Management 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/employees-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/employee.png"/></span> Employee Management 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/attendance-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/attendance.png"/></span> Attendance Management 
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="/leave-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/leave.png"/></span> Leave Management 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/payroll-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/payroll.png"/></span> Payroll Management 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/talent-management-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/talent-management.png"/></span> Talent Recognition 
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="/report-and-analytics-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/analytics.png"/></span>Reports and Analytics 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/events-and-meeting-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/meeting.png"/></span> Events and Meetings 
                                        </a>
                                      </li>
                                      <li>
                                        <a href="/mobile-app-software">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/booking.png"/></span> Mobile App 
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <a href="/activity-management-software">
                              <i className="fas fa-male"></i> Activity Management 
                            </a>
                          </li>
                          <li>
                            <a href="/task-management-software">
                              <i className="fas fa-play-circle"></i> Task Management 
                            </a>
                          </li>
                          <li>
                            <a href="/asset-management-software">
                              <i className="fas fa-utensils"></i>Asset Management 
                            </a>
                          </li>
                          <li>
                            <a href="/field-force-management-software">
                              <i className="fas fa-tv"></i>Field Force Management 
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="/blog" target="_blank"><span></span> <span>Blog</span></a></li>
                  <li aria-haspopup="true"><a className="navtext" href="/contact"><span></span> <span>Contact</span></a></li>
                  <li className="wscarticon clearfix">
                    <a className="btn btn-theme text-white btn-md radius" href={siteSettings.demo_login_url} target="_blank" rel="noopener noreferrer">Login</a>
                    <a className="btn btn-theme text-white btn-md radius" data-bs-target="#demoshedule-modal" data-bs-toggle="modal" href="javascript:void(0)">Schedule a demo</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div> 
      
      {/* Start Breadcrumb */}
      <div className="breadcrumb-area bg-cover shadow theme-hard text-center text-light" style={{backgroundImage: "url('../assets/images/about1.jpg')"}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>About Us</h1>
              <ul className="breadcrumb">
                <li><a href="#"><i className="fas fa-home"></i> Home</a></li>
                <li>About</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End Breadcrumb */}
      
      {/* Start About */}
      <div className="about-style-two-area default-padding overflow-hidden bg-gray">
        {/* Shape */}
        <div className="shape">
          <img alt="Shape" src="../assets/images/line-side.png"/>
        </div>
        {/* End Shape */}
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-6">
              <div className="about-style-two-thumb">
                <img alt="Image Not Found" className="wow fadeInUp" src="../assets/images/aboutmain.png"/>
                <img alt="Image Not Found" className="wow fadeInDown" data-wow-delay="100ms" src="../assets/images/unistal-building.png"/>
                <div className="certification wow fadeInUp" data-wow-delay="250ms">
                  <img alt="Image Not Found" src="../assets/images/abtcerti.png"/>
                  <h4> Certified Company</h4>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pl-50 pl-md-15 pl-xs-15">
              <div className="about-style-two-info">
                <h4 className="sub-title">About Us</h4>
                <h2 className="title mb-3 split-text">Who We Are</h2>
                <p>HRMetricS is the brainchild of Unistal Systems Pvt. Ltd.</p>
                <p>With an extensive experience in the HRM space, we build automated products that help HR and organizations simplify their processes and meet their goals at a faster rate. Our HRM Software is designed to suit all industry types and sizes with more focus on a user-centric interface. HRMetricS is interwind using products ranging from company, employee, payroll, leave & attendance, <strong>Talent Recognition,</strong> real-time reports & analytics to an easily accessible mobile app. HRMetricS has been designed for quick implementation that enhances productivity using the automated workflow and processes which will reduce work time for HRs by 25%. It also provide great experience to employees with mobile application. Gain more success for your business using the add-on modules for better employee and employer experience. Our Activity management, Task Management, Asset Management, and Field Force Management create a more lucrative work environment, whether your team is working from the office or at home.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End About */}
      
      {/* Start Our Features */}
      <div className="faeture-style-three-area default-padding full-border">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="site-heading text-center">
                <h2 className="title split-text">Our pioneering</h2>
                <p>HRM solution comes with 4 additional modules that help improve the work process - Activity, Task, and Field Force Management.</p>
                <p>Join us on this advanced journey and experience the power of HRMetricS in transforming your organization's HR landscape. We are committed to delivering excellence, continuous innovation, and exceptional customer support to help you unlock your organization's full potential. Let HRMetricS be your trusted partner in navigating the dynamic world of Human Resource management.</p>
                <p>Together, let's simplify, automate, and streamline your HR processes for a brighter and more productive future. Thank you for choosing HRMetricS by Unistal</p>
                <div className="devider"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="feature-style-three-items">
                {/* Single Item */}
                <div className="feature-style-three hover-active-item">
                  <a href="/hrm-soultion-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat1.png"/>
                      </div>
                      <h4>Human Resource Management System</h4>
                      <p>
                        Simplify and streamline your HR processes with a flexible solution built for your unique needs. From onboarding to payroll, our HRM Software helps you manage people, policies, and performance—all in one place
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
                {/* Single Item */}
                <div className="feature-style-three hover-active-item active">
                  <a href="/activity-management-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat2.png"/>
                      </div>
                      <h4>Activity Reporter</h4>
                      <p>
                        Track, manage, and analyse employee activities in real time to ensure optimal performance. Our Activity Management Software helps you identify bottlenecks, streamline workflows, and empower your workforce to work smarter every day.
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
                {/* Single Item */}
                <div className="feature-style-three hover-active-item">
                  <a href="/task-management-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat3.png"/>
                      </div>
                      <h4>Task Management</h4>
                      <p>
                        Juggling multiple tasks and deadlines? Our Task Management Software helps teams stay focused, aligned, and in control. Assign tasks, set priorities, track progress, and collaborate seamlessly—all from one intuitive platform.
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
                {/* Single Item */}
                <div className="feature-style-three hover-active-item">
                  <a href="/asset-management-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat1.png"/>
                      </div>
                      <h4>Asset Management</h4>
                      <p>
                        Keep a close eye on every asset—whether it's IT equipment, machinery, tools, or infrastructure. Our intuitive Asset Management Software helps you tag, monitor, and manage assets in real-time
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
                {/* Single Item */}
                <div className="feature-style-three hover-active-item">
                  <a href="/attendance-management-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat3.png"/>
                      </div>
                      <h4>Attendance Management</h4>
                      <p>
                        The Attendance Management System by HRMetricS involves the systematic tracking, recording, and analysis of employees' work hours, including shift roster, while ensuring accurate and efficient time and attendance management of every employee.
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
                {/* Single Item */}
                <div className="feature-style-three hover-active-item">
                  <a href="/field-force-management-software">
                    <div className="shape">
                      <img alt="Image Not Found" src="../assets/images/feat4.png"/>
                    </div>
                    <div className="item">
                      <div className="icon">
                        <img alt="Image Not Found" src="../assets/images/feat2.png"/>
                      </div>
                      <h4>Field Force Management</h4>
                      <p>
                        Stay connected to your on-ground sales team with real-time tracking, task assignments, and performance insights. Boost productivity, reduce gaps, and make smarter decisions with a complete Field Force Management solution designed for efficiency.
                      </p>
                    </div>
                  </a>
                </div>
                {/* End Single Item */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Our Features */}
      
      {/* Start FAQ Area */}
      <section className="faq-area default-padding pt-2">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading mb-3 text-center">
                <h4 className="sub-title">Faq</h4>
                <h2 className="title split-text">Frequently Asked Questions</h2>
                <div className="devider"></div>
              </div>
            </div>
          </div>
          <div className="faq-accordion-content">
            <ul className="accordion">
              <li className="accordion-item">
                <a className="accordion-title active" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  Is HRMetricS suitable for small businesses and large enterprises alike?
                </a>
                <p className="accordion-content show">Yes, HRMetricS is designed to cater to the needs of businesses of all sizes. It can be easily customized and scaled to fit the requirements of small startups, medium-sized companies, and large enterprises.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  How user-friendly is HRMetricS?
                </a>
                <p className="accordion-content">HRMetricS boasts an intuitive user interface that requires minimal training for users to navigate and operate. Its user-friendly design ensures a smooth onboarding process and allows HR professionals and employees to adapt quickly to the system.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  Does HRMetricS comply with data security standards?
                </a>
                <p className="accordion-content">Absolutely. HRMetricS prioritizes data security and confidentiality. It adheres to industry best practices and complies with data protection regulations to safeguard sensitive employee information.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  How does HRMetricS help with employee engagement?
                </a>
                <p className="accordion-content">HRMetricS includes features like employee self-service portals, performance feedback mechanisms, and recognition programs that promote a positive employee experience and foster higher levels of engagement within the workforce.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  How can I get started with HRMetricS for my organization?
                </a>
                <p className="accordion-content">To get started with HRMetricS, you can request a demo or contact our sales team. They will guide you through the process of implementing HRMetricS to transform your HR operations and elevate your organizational efficiency.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down"></i>
                  What additional solutions does HRMetricS offer?
                </a>
                <p className="accordion-content">In addition to its core services, HRMetricS provides solutions for Activity Management, Task Management, Asset Management, and Field Force Management.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* End FAQ Area */}
      
      <div className="dem-section bg-gradientt position-relative py-5">
        <div className="circle-img" style={{backgroundImage:"url('../assets/images/circlbg.png')"}}>
        </div>
        <div className="container">
          <div className="btn-center text-center myflex">
            <h3>Transform Your HR Process: Take the First Step Towards Automation</h3>
            <a className="btn btn-theme btn-md radius scrollToForm animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" id="" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a>
          </div>
        </div>
      </div>
      
      {/* Start Footer */}
      <footer className="footer-bg text-light bg-cover">
        <div className="footer-shape">
          <div className="item">
            <img alt="Shape" src="../assets/images/footerbg.png"/>
          </div>
        </div>
        <div className="container">
          <div className="f-items relative pt-50 pb-60 pt-xs-0 pb-xs-50">
            <div className="row mb-4 align-items-center">
              <div className="col-md-5">
                <div className="f-item about">
                  <img alt="Logo" className="logo mb-2" src="../assets/images/logo.png" style={{height:'45px'}}/>
                  <p className="mb-0">
                    Experience the power of seamless HR management. Our solution empowers your organization by simplifying tasks, automating workflows, and optimizing HR processes for enhancing the productivity.
                  </p>
                  <ul className="footer-social mt-0">
                    <li>
                      <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer">
                        <i className="">X</i>
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-7">
                <div className="awrd-box text-end">
                  <img alt="" src="../assets/images/certificate1.png"/>
                  <img alt="" src="../assets/images/certificate2.png"/>
                  <img alt="Shape" src="../assets/images/dmca.webp"/>
                </div>
              </div>
            </div>
            <hr/>
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">HRMetricS' Modules</h4>
                  <ul className="hr-ul">
                    <li><a href="/hrm-soultion-software">HRM Solution</a></li>
                    <li><a href="/attendance-management-software">Attendance Management</a></li>
                    <li><a href="/payroll-management-software">Payroll Management</a></li>
                    <li><a href="/leave-management-software">Leave Management</a></li>
                    <li><a href="/task-management-software">Task Management</a></li>
                    <li><a href="/asset-management-software">Asset Management</a></li>
                    <li><a href="/activity-management-software">Activity Management</a></li>
                    <li><a href="/field-force-management-software">Field Force Management </a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Company</h4>
                  <ul>
                    <li><a href="/about">About</a></li>
                    <li><a href="/blog" target="_blank">Blog</a></li>
                    <li><a href="/contact">Contact</a></li>
                    <li><a href="/terms-services">Terms of service</a></li>
                    <li><a href="/privacy-policy">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Contact Us</h4>
                  <ul className="mt-3 mb-3">
                    <li>
                      <strong>Location:</strong>
                      <div className="working-day mb-2"><strong>Madurai:</strong>  {siteSettings.noida_address}</div>
                      <div className="working-day"><strong>Maldvies:</strong> {siteSettings.new_delhi_address}</div>
                      <div className="working-hour mt-2"><strong>Phone:</strong><a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer"> {siteSettings.primary_phone}</a>, <a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a></div>
                      <div className="working-hour"><strong>Email:</strong>
                        <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Start Footer Bottom */}
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>© Copyright 2026 <a href={siteSettings.company_url} style={{color:'#f03041',fontWeight:500}} target="_blank" rel="noopener noreferrer">{siteSettings.company_legal_name}</a> All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Bottom */}
      </footer>
      {/* End Footer */}
      
      {/* Scroll to Top Button */}
      <button id="scrollTopBtn">↑</button>
      
      {/* Modal */}
      
      
      

      {/* jQuery Frameworks */}
      <script src="../assets/js/jquery-3.7.1.min.js"></script>
      <script src="../assets/js/bootstrap.bundle.min.js"></script>
      <script src="../assets/js/jquery.appear.js"></script>
      <script src="../assets/js/jquery.easing.min.js"></script>
      <script src="../assets/js/jquery.magnific-popup.min.js"></script>
      <script src="../assets/js/swiper-bundle.min.js"></script>
      <script src="../assets/js/wow.min.js"></script>
      <script src="../assets/js/progress-bar.min.js"></script>
      <script src="../assets/js/circle-progress.js"></script>
      <script src="../assets/js/isotope.pkgd.min.js"></script>
      <script src="../assets/js/imagesloaded.pkgd.min.js"></script>
      <script src="../assets/js/count-to.js"></script>
      <script src="../assets/js/YTPlayer.min.js"></script>
      <script src="../assets/js/validnavs.js"></script>
      <script src="../assets/js/gsap.js"></script>
      <script src="../assets/js/ScrollTrigger.min.js"></script>
      <script src="../assets/js/SplitText.min.js"></script>
      <script src="../assets/js/main.js"></script>
      <script src="../assets/menu/webslidemenu.js" type="text/javascript"></script>
      <script src="../assets/js/type-word.js"></script>
      <script>
        {`
          function headerStyle() {
            $(window).on('scroll', function () {
              if ($(this).scrollTop() > 120) {
                $('.headerfull').addClass("is-sticky");
              } else {
                $('.headerfull').removeClass("is-sticky");
              }
            });
          }
        
          $(document).ready(function () {
            headerStyle();
          });
        `}
      </script>
      <script>
        {`
          $(document).ready(function() {
            // Show/hide button on scroll
            $(window).scroll(function() {
              if ($(this).scrollTop() > 200) {
                $('#scrollTopBtn').fadeIn();
              } else {
                $('#scrollTopBtn').fadeOut();
              }
            });

            // Scroll to top on click
            $('#scrollTopBtn').click(function() {
              $('html, body').animate({ scrollTop: 0 }, 600);
              return false;
            });
          });
        `}
      </script>
      {/*Start of Tawk.to Script*/}
      <script type="text/javascript">
        {`
          var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
          (function(){
            var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
            s1.async=true;
            s1.src='https://embed.tawk.to/64c75df094cf5d49dc6773f6/1h6lcdt3m';
            s1.charset='UTF-8';
            s1.setAttribute('crossorigin','*');
            s0.parentNode.insertBefore(s1,s0);
          })();
        `}
      </script>
      {/*End of Tawk.to Script*/}
      <style>
        {`
          .footer-social li a:hover {color:#fff !important;}
          .tawk-button {
            background: #000 !important;
          }
        `}
      </style>
      <script>
        {`
          new WOW({
            mobile: true
          }).init();
        `}
      </script>
      <script>
        {`
          $(document).ready(function () {
            $('.scrollToForm').on('click', function (e) {
              e.preventDefault();
              $('html, body').animate({
                scrollTop: $('#book_a_demo').offset().top - 100 // Adjust offset (100px top margin)
              }, 600); // 600ms animation duration
            });
          });
        `}
      </script>
      <script>
        {`
          var swiper = new Swiper(".brand-two-carousel", {
            loop: true,
            autoplay: {
              delay: 3000, // time between slides (in ms)
              disableOnInteraction: false, // keeps autoplay after user interactions
            },
            slidesPerView: 3, // adjust based on design
            spaceBetween: 20, // adjust spacing if needed
            breakpoints: {
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            },
          });
        `}
      </script>
      <script>
        {`
          // FAQ Accordion
          $(function() {
            $('.accordion').find('.accordion-title').on('click', function(){
              // Adds Active Class
              $(this).toggleClass('active');
              // Expand or Collapse This Panel
              $(this).next().slideToggle('fast');
              // Hide The Other Panels
              $('.accordion-content').not($(this).next()).slideUp('fast');
              // Removes Active Class From Other Titles
              $('.accordion-title').not($(this)).removeClass('active');       
            });
          });
        `}
      </script>
      <script>
        {`
          $(document).ready(function () {
            const charLimit = 150;

            $(".moretext").each(function () {
              const $this = $(this);
              const fullText = $this.data("fulltext").trim();

              if (fullText.length > charLimit) {
                const shortText = fullText.substring(0, charLimit) + "...";

                $this.html(\`\${shortText} <a href="#" class="read-more-link">Read More</a>\`);

                $this.on("click", ".read-more-link", function (e) {
                  e.preventDefault();
                  const $link = $(this);
                  const isExpanded = $link.text() === "Read Less";

                  if (isExpanded) {
                    $this.html(\`\${shortText} <a href="#" class="read-more-link">Read More</a>\`);
                  } else {
                    $this.html(\`\${fullText} <a href="#" class="read-more-link">Read Less</a>\`);
                  }
                });
              } else {
                $this.text(fullText);
              }
            });
          });
        `}
      </script>
      <style>
        {`
          .calendly-overlay .calendly-popup {
            max-width: 100% !important;
            min-width: 100% !important;
            width: 100% !important;
          }
        `}
      </style>
    </div>
  );
};

export default AboutPage;
