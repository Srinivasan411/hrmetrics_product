import { useEffect, useState } from "react";
import { TryForFreeCard } from "../components/LeadModals.jsx";
import { useSiteSettings } from "../siteSettings.jsx";

const fallbackTestimonials = [
  {
    id: 1,
    clientName: "Tapasya",
    clientRole: "HR Head",
    companyName: "IndiaIT360",
    imageUrl: "assets/images/testhr.png",
    testimonial:
      "It's easy to manage HR processes than what we where doing it manually. After adopting HRMetricS, we are able to same time by automating all the manual processes from attendance tracking to leave approvals and payslip generation, everything is now automated and accessible in just a few clicks. Our employees love the self-service portal, and our HR team has finally moved from firefighting to strategic planning.",
    rating: 5,
  },
  {
    id: 2,
    clientName: "Vivek Arora",
    clientRole: "HR Head",
    companyName: "Simsona",
    imageUrl: "assets/images/test4.jpg",
    testimonial:
      "At Simsona, we have completely transformed the way we handle recruitment and performance reviews. The platform is intuitive, fast, and incredibly powerful. We've reduced our employee onboarding to exit process by nearly 40% and gained real-time visibility into employee performance metrics.",
    rating: 5,
  },
  {
    id: 3,
    clientName: "Anita Mishra",
    clientRole: "VP of Employee Relations",
    companyName: "",
    imageUrl: "assets/images/test3.jpg",
    testimonial:
      "HRMetricS has made our payroll processing seamless and efficient. What used to take several days now takes less than two days with error-free calculations and payslip generation at the click of a button.",
    rating: 5,
  },
  {
    id: 4,
    clientName: "Kritika Sharma",
    clientRole: "Employee Relation Manager",
    companyName: "",
    imageUrl: "assets/images/test5.avif",
    testimonial:
      "HRMetricS is built for every kind of workforce. Our field employees can now mark their attendance and submit expenses on the go, right from their mobile devices.",
    rating: 5,
  },
];

function formatClientMeta(testimonial) {
  const clientRole = String(testimonial.clientRole ?? "").trim();
  const companyName = String(testimonial.companyName ?? "").trim();
  if (clientRole && companyName) return `${clientRole}, ${companyName}`;
  return clientRole || companyName;
}

export default function HomePage() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    document.title = "Best HRM Solution In India, Saas Based HRM Solution, Performance Management in HRMS- HRMetricS";
  }, []);

  useEffect(() => {
    let ignore = false;

    async function loadTestimonials() {
      try {
        const response = await fetch("/api/testimonials");
        if (!response.ok) return;
        const payload = await response.json();
        if (!ignore && Array.isArray(payload.data) && payload.data.length > 0) {
          setTestimonials(payload.data);
        }
      } catch {
        // Keep the seeded fallback content on the page if the API is unavailable.
      }
    }

    loadTestimonials();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div>
      <div className="top-bar-area top-bar-style-one text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="animate-text text-left">
                <h1 className="mb-0 typing-animation" style={{fontSize: 16, fontWeight: 400, position: 'relative', top: 2}}>Most Advanced HRM Software in Indian Market Trusted by Many <img alt="" src="assets/images/hand.gif" /></h1>
              </div>
            </div>
            <div className="col-lg-4 text-end">
              <div className="social">
                <ul>
                  <li>
                    <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-facebook-f" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer">
                      <i className="">X</i>
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-instagram" />
                    </a>
                  </li>
                  <li>
                    <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                      <i className="fab fa-whatsapp" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="header-new">
        <div className="wsmobileheader clearfix">
          <a className="wsanimated-arrow" href="javascript:void(0)" id="wsnavtoggle"><span /></a>
          <span className="smllogo"><img alt="" src="assets/images/logo1.png" width={80} /></span>
        </div>
        <div className="headerfull">
          <div className="container">
            <div className="wsmain clearfix">
              <div className="smllogo">
                <a href="index.html"><img alt="" src="assets/images/logo1.png" /></a>
              </div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list">
                  <li aria-haspopup="true"><a className="navtext" href="index.html"><span /> <span>Home</span></a>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="about/index.html"><span /> <span>About</span></a>
                  </li>
                  <li aria-haspopup="true" className="megmeanu">
                    <a className="navtext" href="#">
                      <span />
                      <span>Product</span>
                    </a>
                    <div className="wsshoptabing wtsbrandmenu clearfix">
                      <div className="wsshoptabingwp clearfix">
                        <ul className="wstabitem02 clearfix">
                          <li className="wsshoplink-active">
                            <a href="hrm-soultion-software/index.html">
                              <i className="fas fa-female" />HRMS </a>
                            <div className="wsshoptab-active wstbrandbottom clearfix">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="company-management-software/index.html">
                                          <span className="menu-iconn"><img alt="" src="assets/images/icon/organization.png" /></span> Company Management </a>
                                      </li>
                                      <li>
                                        <a href="employees-management-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/employee.png" /></span> Employee Management </a>
                                      </li>
                                      <li>
                                        <a href="attendance-management-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/attendance.png" /></span> Attendance Management </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="leave-management-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/leave.png" /></span> Leave Management </a>
                                      </li>
                                      <li>
                                        <a href="payroll-management-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/payroll.png" /></span> Payroll Management </a>
                                      </li>
                                      <li>
                                        <a href="talent-management-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/talent-management.png" /></span> Talent Recognition </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="report-and-analytics-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/analytics.png" /></span>Reports and Analytics </a>
                                      </li>
                                      <li>
                                        <a href="events-and-meeting-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/meeting.png" /></span> Events and Meetings </a>
                                      </li>
                                      <li>
                                        <a href="mobile-app-software/index.html"><span className="menu-iconn"><img alt="" src="assets/images/icon/booking.png" /></span> Mobile App </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <a href="activity-management-software/index.html">
                              <i className="fas fa-male" /> Activity Management </a>
                          </li>
                          <li>
                            <a href="task-management-software/index.html">
                              <i className="fas fa-play-circle" /> Task Management </a>
                          </li>
                          <li>
                            <a href="asset-management-software/index.html">
                              <i className="fas fa-utensils" />
                              Asset Management </a>
                          </li>
                          <li>
                            <a href="field-force-management-software/index.html">
                              <i className="fas fa-tv" />Field Force Management </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="blog/index.html" target="_blank"><span /> <span>Blog</span></a>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="contact/index.html"><span /> <span>Contact</span></a>
                  </li>
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
      <div className="banner-style-four-area bg-cover" style={{backgroundImage: 'url(assets/images/banner-top.jpg)'}}>
        <span className="it-up-ft-shape2 position-absolute">
          <img alt="" src="assets/images/b-shape3.png" />
        </span>
        <div className="hrms-banner-shape">
          <img alt="image" src="assets/images/triangle-shape.png" />
        </div>
        <div className="banner-shape-1">
          <img alt="Shape" src="assets/images/bg22.png" />
        </div>
        <div className="bg-animation"> <img alt="" className="zoom-fade" src="assets/images/patten1.png" /> </div>
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="banner-four-bottom-info mt-3">
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <div className="testimonial-carousel swiper">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide wow fadeInUp" data-wow-delay="400ms">
                          <div className="banner-four-top-info">
                            <h1 className="cd-headline clip">
                              A Full-Suite <strong>HRM Software</strong> that Automates all your Complex Business Operations</h1>
                          </div>
                          <div className="info">
                            <p className="text-justify">HRMetricS streamlines everything—from onboarding and attendance to payroll and performance—saving up to 25% on time and cost while delivering a smarter, paperless employee experience.</p>
                          </div>
                        </div>
                        <div className="swiper-slide wow fadeInUp" data-wow-delay="800ms">
                          <div className="banner-four-top-info">
                            <h1 className="cd-headline clip">Everything You Need to <strong>Plan, Assign, and Complete Tasks—On Time,</strong> with Full Clarity and Smart Tracking</h1>
                          </div>
                          <div className="info">
                            <p className="text-justify">Plan, assign, and track tasks effortlessly with automation-driven workflows that improve collaboration, boost productivity, and ensure timely execution across teams and help in accessing each employee’s performance.</p>
                          </div>
                        </div>
                        <div className="swiper-slide wow fadeInUp" data-wow-delay="1200ms">
                          <div className="banner-four-top-info">
                            <h1 className="cd-headline clip"><strong>Activity Management monitors</strong> activities to Enhance Productivity—Whether Working from Home or in the Office</h1>
                          </div>
                          <div className="info">
                            <p className="text-justify">Track employees’ daily productive and non-productive activities across applications and web portals with real-time admin access. Gain actionable insights that encourage productivity and help manage performance effectively from anywhere. </p>
                          </div>
                        </div>
                        <div className="swiper-slide wow fadeInUp" data-wow-delay="1600ms">
                          <div className="banner-four-top-info">
                            <h1 className="cd-headline clip">Unified <strong>Asset Management Software</strong> to Manage and Monitor Your Fixed, Movable, and Consumable Assets and Inventory</h1>
                          </div>
                          <div className="info">
                            <p className="text-justify">Gain complete control over your assets and streamline purchase planning. Monitor the health and usage of laptops, hard drives, and CPUs to ensure efficient operations and prevent data loss.</p>
                          </div>
                        </div>
                        <div className="swiper-slide wow fadeInUp" data-wow-delay="2000ms">
                          <div className="banner-four-top-info">
                            <h1 className="cd-headline clip">Real-Time <strong>Field Force Management Solution</strong> for a Sales and Service Workforce</h1>
                          </div>
                          <div className="info">
                            <p className="text-justify">Empower your on-ground teams with GPS-based tracking for location and route with live updates w.r.t, task allocation, distance travelled and performance insights—ensuring efficiency, transparency, and improved customer response time.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="raitingboxx animation wow fadeInUp">
                      <img alt="" src="assets/images/Play-Store-Logo.webp" />
                      <span className="starricon">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-half-o" />
                      </span>
                      <p>4.7+ ratings across all platforms</p>
                    </div>
                    <div className="row mt-3 align-items-center animation wow fadeInUp">
                      <div className="col-md-5">
                        <div className="app-box">
                          <a href="https://apps.apple.com/in/app/bss-metrics/id1451487941" target="_blank">
                            <img alt="" src="assets/images/Group-1-2.webp" />
                          </a>
                          <a href="https://play.google.com/store/apps/details?id=com.solutions.BSSMetricS&hl=en_IN" target="_blank">
                            <img alt="" src="assets/images/Group-2-1.webp" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <TryForFreeCard formId="bookdemo-hero" />
            </div>
          </div>
        </div>
      </div>
      <div className="trust-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3">
              <div className="site-heading mt-3 mb-0 wow fadeInUp">
                <h2 className="title title1 split-text">Brands That Trust Us</h2>
                <div className="devider" />
              </div>
            </div>
            <div className="col-lg-9">
              <div className="brand-two-carousel swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/indiait360.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/Simsona.jpeg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/Khanna.jpeg" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/oriental.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/igl.png" />
                  </div>
                  <div className="swiper-slide brandbox wow fadeInUp" data-wow-delay="400ms">
                    <img alt="Image Not Found" src="assets/images/beetel.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-style-one-area default-padding">
        <img alt="" className="imageabt-over" src="assets/images/linee.png" />
        <div className="shape-animated-left">
          <img alt="Image Not Found" src="assets/images/3.png" />
          <img alt="Image Not Found" src="assets/images/4.png" />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="about-style-one col-xl-5 col-lg-6">
              <div className="about-thumb">
                <img alt="Image Not Found" className="wow fadeInRight" src="assets/images/about.jpg" />
                <div className="about-card wow fadeInUp" data-wow-delay="500ms">
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="flaticon-license" />
                      </div>
                      <div className="fun-fact">
                        <div className="counter">
                          <div className="timer" data-speed={2000} data-to={30}>30</div>
                          <div className="operator">+</div>
                        </div>
                        <span className="medium">Years of experience</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="about-style-one col-xl-7 col-lg-6 pl-50">
              <h4 className="sub-title">About Us</h4>
              <h2 className="title split-text mb-25">Discover HRMetricS Solutions &amp; Technology</h2>
              <div className="wow fadeInUp" data-wow-delay="200ms">
                <p className="text-justify"> The most trusted All-in-one HRMS suite for your people operations. Run your entire business on HRMetricS with our unified cloud-based HR platform, designed to help you break down silos between departments and increase organizational efficiency. </p>
                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" href="about.php" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Read More</a> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="brand-section default-padding animatedBackground" style={{backgroundImage: 'url(assets/images/patten1.png)'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">One Platform Many Possibilities</h4>
                <h2 className="title split-text">The All-In-One HRM Platform For Your Business</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="tab_section_layout layoet_main_2">
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#hrms" data-bs-toggle="tab" id="hrms-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Capa_1" version="1.1" viewBox="0 0 60 60" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M25,15c-3.9,0-7,3.1-7,7v14h2V22c0-2.8,2.2-5,5-5h4v5h2v-5h4c2.8,0,5,2.2,5,5v14h2V22c0-3.9-3.1-7-7-7H25z" /> <path d="M29,14h2c2.8,0,5-2.2,5-5V6c0-2.8-2.2-5-5-5h-2c-2.8,0-5,2.2-5,5v3C24,11.8,26.2,14,29,14z M26,6c0-1.7,1.3-3,3-3h2 c1.7,0,3,1.3,3,3v3c0,1.7-1.3,3-3,3h-2c-1.7,0-3-1.3-3-3V6z" /> <rect height={2} width={2} x={29} y={32} /> <rect height={2} width={2} x={29} y={28} /> <rect height={2} width={2} x={29} y={24} /> <path d="M48,54c0-1.7-1.3-3-3-3h-2v-5c0-0.6-0.4-1-1-1h-5V23h-2v22h-4v-8h-2v8h-4V23h-2v22h-5c-0.6,0-1,0.4-1,1v5h-2 c-1.7,0-3,1.3-3,3v3H0v2h13h34h13v-2H48V54z M14,57v-3c0-0.6,0.4-1,1-1h3h15v-2H19v-4h22v5c0,0.6,0.4,1,1,1h3c0.6,0,1,0.4,1,1v3 H14z" /> <path d="M3.3,10.7l1.4-1.4L3.4,8H21V6H3.4l1.3-1.3L3.3,3.3l-3,3c-0.4,0.4-0.4,1,0,1.4L3.3,10.7z" /> <path d="M3.3,31.7l1.4-1.4L3.4,29H15v-2H3.4l1.3-1.3l-1.4-1.4l-3,3c-0.4,0.4-0.4,1,0,1.4L3.3,31.7z" /> <path d="M55.3,19.3l1.4,1.4l3-3c0.4-0.4,0.4-1,0-1.4l-3-3l-1.4,1.4l1.3,1.3H45v2h11.6L55.3,19.3z" /> <path d="M56.7,37.3l-1.4,1.4l1.3,1.3H41v2h15.6l-1.3,1.3l1.4,1.4l3-3c0.4-0.4,0.4-1,0-1.4L56.7,37.3z" /> <rect height={2} width={2} x={45} y={27} /> <rect height={2} width={2} x={49} y={27} /> <rect height={2} width={2} x={53} y={27} /> <rect height={2} width={2} x={57} y={27} /> <rect height={2} width={2} x={1} y={37} /> <rect height={2} width={2} x={5} y={37} /> <rect height={2} width={2} x={9} y={37} /> <rect height={2} width={2} x={13} y={37} /> <rect height={2} width={2} x={1} y={15} /> <rect height={2} width={2} x={5} y={15} /> <rect height={2} width={2} x={9} y={15} /> <rect height={2} width={2} x={13} y={15} /> </g> </g> </g></svg>
                      </span>
                      <span>HRMS</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#activityreporter" data-bs-toggle="tab" id="activity-tab" role="tab" type="button">
                      <span className="svg_bg akkbg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M471.04,358.4V51.2H20.48v307.2H0v44.06l25.24,37.86h441.04l25.24-37.86V358.4H471.04z M40.96,71.68h409.6V358.4H40.96 V71.68z M471.04,396.26l-15.72,23.58H36.2l-15.72-23.58v-17.38h450.56V396.26z" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="235.52" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="276.48" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="194.56" y="389.12" /> </g> </g> <g> <g> <path d="M348.16,102.4v235.52h71.68V102.4H348.16z M399.36,317.44h-30.72V122.88h30.72V317.44z" /> </g> </g> <g> <g> <path d="M256,143.36v194.56h71.68V143.36H256z M307.2,317.44h-30.72v-153.6h30.72V317.44z" /> </g> </g> <g> <g> <path d="M163.84,184.32v153.6h71.68v-153.6H163.84z M215.04,317.44h-30.72V204.8h30.72V317.44z" /> </g> </g> <g> <g> <path d="M71.68,235.52v102.4h71.68v-102.4H71.68z M122.88,317.44H92.16V256h30.72V317.44z" /> </g> </g> </g></svg>
                      </span>
                      <span>Activity Reporter</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" data-bs-target="#taskmanagement" data-bs-toggle="tab" id="task-tab" role="tab" type="button">
                      <span className="svg_bg akkbg">
                        <svg fill="currentColor" height="64px" viewBox="0 0 28 28" width="64px" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M4 5.25C4 3.45508 5.45507 2 7.25 2H20.75C22.5449 2 24 3.45507 24 5.25V17.3787C23.8796 17.4592 23.7653 17.5527 23.659 17.659L22.5 18.818V5.25C22.5 4.2835 21.7165 3.5 20.75 3.5H7.25C6.2835 3.5 5.5 4.2835 5.5 5.25V22.7497C5.5 23.7162 6.2835 24.4997 7.25 24.4997H15.3177L16.8177 25.9997H7.25C5.45507 25.9997 4 24.5446 4 22.7497V5.25Z" fill="#212121" /> <path d="M10.5 8.75C10.5 9.44036 9.94036 10 9.25 10C8.55964 10 8 9.44036 8 8.75C8 8.05964 8.55964 7.5 9.25 7.5C9.94036 7.5 10.5 8.05964 10.5 8.75Z" fill="#212121" /> <path d="M9.25 15.2498C9.94036 15.2498 10.5 14.6902 10.5 13.9998C10.5 13.3095 9.94036 12.7498 9.25 12.7498C8.55964 12.7498 8 13.3095 8 13.9998C8 14.6902 8.55964 15.2498 9.25 15.2498Z" fill="#212121" /> <path d="M9.25 20.5C9.94036 20.5 10.5 19.9404 10.5 19.25C10.5 18.5596 9.94036 18 9.25 18C8.55964 18 8 18.5596 8 19.25C8 19.9404 8.55964 20.5 9.25 20.5Z" fill="#212121" /> <path d="M12.75 8C12.3358 8 12 8.33579 12 8.75C12 9.16421 12.3358 9.5 12.75 9.5H19.25C19.6642 9.5 20 9.16421 20 8.75C20 8.33579 19.6642 8 19.25 8H12.75Z" fill="#212121" /> <path d="M12 13.9998C12 13.5856 12.3358 13.2498 12.75 13.2498H19.25C19.6642 13.2498 20 13.5856 20 13.9998C20 14.414 19.6642 14.7498 19.25 14.7498H12.75C12.3358 14.7498 12 14.414 12 13.9998Z" fill="#212121" /> <path d="M12.75 18.5C12.3358 18.5 12 18.8358 12 19.25C12 19.6642 12.3358 20 12.75 20H19.25C19.6642 20 20 19.6642 20 19.25C20 18.8358 19.6642 18.5 19.25 18.5H12.75Z" fill="#212121" /> <path d="M25.7803 19.7803L19.7803 25.7803C19.6397 25.921 19.4489 26 19.25 26C19.0511 26 18.8603 25.921 18.7197 25.7803L15.7216 22.7823C15.4287 22.4894 15.4287 22.0145 15.7216 21.7216C16.0145 21.4287 16.4894 21.4287 16.7823 21.7216L19.25 24.1893L24.7197 18.7197C25.0126 18.4268 25.4874 18.4268 25.7803 18.7197C26.0732 19.0126 26.0732 19.4874 25.7803 19.7803Z" fill="#212121" /> </g></svg>
                      </span>
                      <span>Task Management</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#assetmanagement" data-bs-toggle="tab" id="asset-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <rect height="20.48" width="92.16" x="71.68" y="102.4" /> </g> </g> <g> <g> <rect height="20.48" width="51.2" x="184.32" y="102.4" /> </g> </g> <g> <g> <rect height="20.48" width="92.16" x="71.68" y={256} /> </g> </g> <g> <g> <rect height="20.48" width="51.2" x="184.32" y={256} /> </g> </g> <g> <g> <rect height="20.48" width="61.44" x="71.68" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="30.72" x="296.96" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="122.88" x="153.6" y="204.8" /> </g> </g> <g> <g> <rect height="20.48" width="40.96" x="204.8" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="112.64" x="71.68" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="153.6" x="266.24" y="153.6" /> </g> </g> <g> <g> <rect height="20.48" width="153.6" x="71.68" y="307.2" /> </g> </g> <g> <g> <polygon points="391.24,243.64 376.76,258.12 405.36,286.72 376.76,315.32 391.24,329.8 434.32,286.72 " /> </g> </g> <g> <g> <polygon points="309.32,258.12 294.84,243.64 251.76,286.72 294.84,329.8 309.32,315.32 280.72,286.72 " /> </g> </g> <g> <g> <rect height="20.48" transform="matrix(0.3711 -0.9286 0.9286 0.3711 -50.5861 498.917)" width="110.284" x="287.878" y="276.562" /> </g> </g> <g> <g> <path d="M471.04,358.4V51.2H20.48v307.2H0v44.06l25.24,37.86h441.04l25.24-37.86V358.4H471.04z M40.96,71.68h409.6V358.4H40.96 V71.68z M471.04,396.26l-15.72,23.58H36.2l-15.72-23.58v-17.38h450.56V396.26z" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="276.48" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="235.52" y="389.12" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="194.56" y="389.12" /> </g> </g> </g></svg>
                      </span>
                      <span>Asset Management</span>
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" data-bs-target="#forcemanagement" data-bs-toggle="tab" id="force-tab" role="tab" type="button">
                      <span className="svg_bg">
                        <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M73.237,341.312l-50.539-0.021c3.797-14.379,15.125-25.92,30.101-29.675l42.069-10.517 c3.819-0.939,6.805-3.925,7.765-7.744l4.352-17.408c0.725-2.923,0.192-6.037-1.515-8.555c-1.685-2.496-4.373-4.16-7.381-4.587 c-12.992-1.813-22.933-4.565-29.803-6.955c6.763-11.648,14.251-32.405,14.251-67.115c0-49.941,36.437-60.757,45.461-60.757 c10.389,0,12.181,1.685,16.064,5.312c4.288,4.032,11.029,3.84,15.083-0.448c4.053-4.288,3.84-11.051-0.448-15.083 c-8.853-8.32-16.597-11.136-30.699-11.136c-20.928,0-66.795,20.672-66.795,82.091c0,48.576-16.149,62.891-16.128,62.891 c-2.859,2.133-4.437,5.525-4.245,9.088c0.171,3.541,2.091,6.763,5.141,8.597c0.619,0.363,13.205,7.808,37.525,12.651 l-35.861,8.981C19.584,297.941,0,323.051,0,351.979c0,5.888,4.779,10.667,10.667,10.667h62.571 c5.888,0,10.667-4.779,10.667-10.667S79.125,341.312,73.237,341.312z" /> <path d="M464.363,290.923l-35.861-8.96v-0.043c24.149-4.843,36.864-12.224,37.461-12.587c2.944-1.749,4.757-4.928,5.056-8.384 c0.277-3.435-1.237-6.912-3.861-9.131c-0.171-0.128-16.384-14.421-16.384-63.083c0-47.701-12.16-71.872-36.181-71.872h-0.811 c-7.872-7.168-14.827-10.219-29.781-10.219c-6.293,0-14.656,2.219-22.955,6.123c-5.333,2.496-7.637,8.853-5.141,14.187 c2.517,5.333,8.896,7.595,14.187,5.12c6.933-3.243,12.117-4.096,13.909-4.096c10.88,0,12.245,1.344,17.941,7.083 c2.005,1.984,4.715,3.115,7.552,3.115h5.099c9.152,0,14.848,19.371,14.848,50.539c0,34.688,7.467,55.424,14.229,67.072 c-6.891,2.411-16.875,5.163-29.803,6.976c-3.008,0.405-5.675,2.091-7.36,4.587c-1.707,2.517-2.24,5.611-1.515,8.555l4.352,17.429 c0.96,3.819,3.925,6.827,7.765,7.765l42.069,10.517c14.976,3.755,26.304,15.296,30.101,29.696h-50.496v21.333l62.549-0.021 c5.888,0,10.667-4.779,10.667-10.667C512,323.029,492.416,297.941,464.363,290.923z" /> <path d="M364.608,336.512l-51.136-12.779l-1.557-6.293c34.859-6.421,53.035-16.981,53.845-17.472 c2.987-1.771,4.864-4.971,5.12-8.448c0.256-3.477-1.28-6.933-3.989-9.131c-0.213-0.192-23.723-20.203-23.723-88.981 c0-62.464-15.296-94.144-45.461-94.144h-2.603c-10.027-9.451-18.475-13.909-39.125-13.909c-27.307,0-87.189,27.2-87.189,108.053 c0,68.779-23.488,88.789-23.552,88.853c-2.837,2.112-4.437,5.525-4.245,9.067c0.171,3.541,2.091,6.763,5.141,8.597 c0.832,0.491,18.816,11.115,53.909,17.536l-1.536,6.251l-51.136,12.779c-36.523,9.131-62.037,41.813-62.037,79.488 c0,2.837,1.109,5.568,3.115,7.552s4.715,3.115,7.552,3.115h319.979c5.888,0,10.667-4.779,10.667-10.667 C426.645,378.304,401.131,345.643,364.608,336.512z M107.605,405.291c4.117-23.189,21.44-42.24,44.949-48.107l57.344-14.336 c3.819-0.96,6.805-3.947,7.765-7.765l5.909-23.744c0.725-2.944,0.192-6.059-1.515-8.555c-1.685-2.496-4.373-4.16-7.381-4.587 c-20.992-2.923-36.309-7.659-45.824-11.307c9.365-14.229,21.291-42.389,21.291-93.525c0-71.275,52.8-86.72,65.856-86.72 c15.808,0,18.688,2.24,27.264,10.795c2.005,1.984,4.715,3.115,7.552,3.115h6.933c15.339,0,24.128,26.539,24.128,72.811 c0,51.093,11.883,79.232,21.248,93.483c-9.579,3.669-24.939,8.405-45.824,11.328c-3.008,0.405-5.675,2.091-7.36,4.587 c-1.707,2.517-2.24,5.632-1.515,8.555l5.931,23.765c0.96,3.819,3.925,6.827,7.765,7.765l57.344,14.336 c23.488,5.867,40.832,24.939,44.928,48.128L107.605,405.291z" /> </g> </g> </g> </g></svg>
                      </span>
                      <span>Field Force Management</span>
                    </button>
                  </li>
                </ul>
                <div className="tab-content mt-4" id="myTabContent">
                  <div aria-labelledby="hrms-tab" className="tab-pane fade" id="hrms" role="tabpanel">
                    <div className="tab_section_layout hrmstabs">
                      <ul className="nav nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item" role="presentation"> <button className="nav-link active" data-bs-target="#company" data-bs-toggle="tab" id="company-tab" role="tab" type="button"> <span className="svg_bg"><svg fill="currentColor" height="64px" viewBox="0 0 50 50" width="64px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <path d="M8 2L8 6L4 6L4 48L46 48L46 14L30 14L30 6L26 6L26 2 Z M 10 4L24 4L24 8L28 8L28 46L19 46L19 39L15 39L15 46L6 46L6 8L10 8 Z M 10 10L10 12L12 12L12 10 Z M 14 10L14 12L16 12L16 10 Z M 18 10L18 12L20 12L20 10 Z M 22 10L22 12L24 12L24 10 Z M 10 15L10 19L12 19L12 15 Z M 14 15L14 19L16 19L16 15 Z M 18 15L18 19L20 19L20 15 Z M 22 15L22 19L24 19L24 15 Z M 30 16L44 16L44 46L30 46 Z M 32 18L32 20L34 20L34 18 Z M 36 18L36 20L38 20L38 18 Z M 40 18L40 20L42 20L42 18 Z M 10 21L10 25L12 25L12 21 Z M 14 21L14 25L16 25L16 21 Z M 18 21L18 25L20 25L20 21 Z M 22 21L22 25L24 25L24 21 Z M 32 22L32 24L34 24L34 22 Z M 36 22L36 24L38 24L38 22 Z M 40 22L40 24L42 24L42 22 Z M 32 26L32 28L34 28L34 26 Z M 36 26L36 28L38 28L38 26 Z M 40 26L40 28L42 28L42 26 Z M 10 27L10 31L12 31L12 27 Z M 14 27L14 31L16 31L16 27 Z M 18 27L18 31L20 31L20 27 Z M 22 27L22 31L24 31L24 27 Z M 32 30L32 32L34 32L34 30 Z M 36 30L36 32L38 32L38 30 Z M 40 30L40 32L42 32L42 30 Z M 10 33L10 37L12 37L12 33 Z M 14 33L14 37L16 37L16 33 Z M 18 33L18 37L20 37L20 33 Z M 22 33L22 37L24 37L24 33 Z M 32 34L32 36L34 36L34 34 Z M 36 34L36 36L38 36L38 34 Z M 40 34L40 36L42 36L42 34 Z M 32 38L32 40L34 40L34 38 Z M 36 38L36 40L38 40L38 38 Z M 40 38L40 40L42 40L42 38 Z M 10 39L10 44L12 44L12 39 Z M 22 39L22 44L24 44L24 39 Z M 32 42L32 44L34 44L34 42 Z M 36 42L36 44L38 44L38 42 Z M 40 42L40 44L42 44L42 42Z" />
                                </g>
                              </svg></span><span>Company Management</span></button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#employee" data-bs-toggle="tab" id="employee-tab" role="tab" type="button"> <span className="svg_bg"> <svg enableBackground="new 0 0 511 511" fill="#000000" height="64px" version="1.1" viewBox="0 0 511 511" width="64px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <path d="m503.5,436h-103.705c7.13-9.007 9.992-20.574 7.837-31.891l-21.252-111.577c-2.674-14.037-12.756-25.563-26.312-30.082l-54.196-18.065c-0.954-0.318-1.927-0.43-2.872-0.366v-14.399c10.341-11.62 16-26.396 16-42.12v-17.734c9.29-3.138 16-11.93 16-22.266v-40c0-26.191-21.309-47.5-47.5-47.5h-64c-10.584,0-19.557,7.033-22.489,16.672-14.267,2.999-25.011,15.682-25.011,30.828v40c0,10.335 6.71,19.127 16,22.266v15.387c0,16.529 6.063,31.796 16,43.459v15.407c-0.945-0.063-1.917,0.048-2.872,0.367l-54.196,18.065c-13.556,4.519-23.638,16.045-26.312,30.082l-21.252,111.577c-2.156,11.317 0.707,22.884 7.837,31.891h-103.705c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5 7.5,7.5h134.67 1.33 16 192 16 1.33 134.67c4.142,0 7.5-3.358 7.5-7.5s-3.358-7.501-7.5-7.501zm-288-177c4.142,0 7.5-3.358 7.5-7.5v-9.919c9.01,5.649 19.437,9.056 30.552,9.39 0.659,0.02 1.315,0.029 1.971,0.029 11.614,0 22.742-3.101 32.477-8.927v9.427c0,4.142 3.358,7.5 7.5,7.5 0.105,0 0.207-0.011 0.311-0.016-1.953,18.497-19.284,33.016-40.311,33.016s-38.358-14.519-40.311-33.016c0.104,0.005 0.206,0.016 0.311,0.016zm-24.5-111.5v-40c0-9.098 7.402-16.5 16.5-16.5 4.142,0 7.5-3.358 7.5-7.5 0-4.687 3.813-8.5 8.5-8.5h64c17.92,0 32.5,14.579 32.5,32.5v40c0,1.442-0.364,2.8-1,3.992v-11.992c0-12.958-10.542-23.5-23.5-23.5h-80c-12.958,0-23.5,10.542-23.5,23.5v11.992c-0.636-1.192-1-2.55-1-3.992zm16-8c0-4.687 3.813-8.5 8.5-8.5h80c4.687,0 8.5,3.813 8.5,8.5v48c0,13.23-5.23,25.593-14.727,34.809-9.493,9.212-22.035,14.065-35.271,13.669-25.917-0.778-47.002-23.579-47.002-50.826v-45.652zm-47.5,296.5c-0.276,0-0.5-0.225-0.5-0.5v-104c0-0.275 0.224-0.5 0.5-0.5h192c0.276,0 0.5,0.225 0.5,0.5v104c0,0.275-0.224,0.5-0.5,0.5h-192zm208,0h-0.525c0.005-0.167 0.025-0.331 0.025-0.5v-104c0-8.547-6.953-15.5-15.5-15.5h-192c-8.547,0-15.5,6.953-15.5,15.5v104c0,0.169 0.02,0.333 0.025,0.5h-0.525-1.33c-7.326,0-14.205-3.237-18.875-8.881-4.67-5.644-6.563-13.007-5.191-20.203l21.252-111.577c1.658-8.706 7.912-15.855 16.32-18.658l44.75-14.917c3.342,25.452 26.757,45.236 55.074,45.236s51.732-19.784 55.075-45.236l44.75,14.916c8.408,2.803 14.662,9.953 16.32,18.659l21.252,111.577c1.371,7.196-0.521,14.56-5.191,20.203-4.67,5.644-11.55,8.881-18.875,8.881h-1.331z" />
                                    <path d="m255.5,364c-12.958,0-23.5,10.542-23.5,23.5s10.542,23.5 23.5,23.5 23.5-10.542 23.5-23.5-10.542-23.5-23.5-23.5zm0,32c-4.687,0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5,3.813 8.5,8.5-3.813,8.5-8.5,8.5z" />
                                  </g>
                                </g>
                              </svg></span><span>Employee Management</span></button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#attendance" data-bs-toggle="tab" id="attendance-tab" role="tab" type="button"> <span className="svg_bg akkbg"> <svg fill="#000000" height="64px" mirror-in-rtl="true" viewBox="0 0 24 24" width="64px" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <path d="M7 11c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2s2 .9 2 2v1c0 1.1-.9 2-2 2zm-2 6.993L9 18c.55 0 1-.45 1-1v-2c0-1.65-1.35-3-3-3s-3 1.35-3 3v2c0 .552.448.993 1 .993zM19 18h-6c-.553 0-1-.447-1-1s.447-1 1-1h6c.553 0 1 .447 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1zm0-4h-6c-.553 0-1-.448-1-1s.447-1 1-1h6c.553 0 1 .448 1 1s-.447 1-1 1z" fill="#494c4e" />
                                  <path d="M22 2H2C.9 2 0 2.9 0 4v16c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 17.5c0 .28-.22.5-.5.5h-19c-.28 0-.5-.22-.5-.5v-15c0-.28.22-.5.5-.5h19c.28 0 .5.22.5.5v15z" fill="#494c4e" />
                                </g>
                              </svg></span><span>Attendance Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#leave" data-bs-toggle="tab" id="leave-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Capa_1" version="1.1" viewBox="0 0 60 60" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <g>
                                      <path d="M59,0H1C0.4,0,0,0.4,0,1v46c0,0.6,0.4,1,1,1h4v11c0,0.6,0.4,1,1,1h48c0.6,0,1-0.4,1-1V48h4c0.6,0,1-0.4,1-1V1 C60,0.4,59.6,0,59,0z M58,2v6H2V2H58z M53,24H7v-6h46V24z M7,58V26h46v32H7z M55,46V17c0-0.6-0.4-1-1-1H6c-0.6,0-1,0.4-1,1v29H2 V10h56v36H55z" />
                                      <rect height={2} width={4} x={4} y={4} />
                                      <rect height={2} width={4} x={10} y={4} />
                                      <rect height={2} width={4} x={9} y={20} />
                                      <rect height={2} width={4} x={15} y={20} />
                                      <rect height={2} width={2} x={54} y={4} />
                                      <rect height={2} width={2} x={50} y={4} />
                                      <rect height={2} width={2} x={49} y={20} />
                                      <rect height={2} width={2} x={45} y={20} />
                                      <path d="M11,47h16c0.6,0,1-0.4,1-1V30c0-0.6-0.4-1-1-1H11c-0.6,0-1,0.4-1,1v16C10,46.6,10.4,47,11,47z M12,39h6v6h-6V39z M20,45 v-6h6v6H20z M26,37h-6v-6h6V37z M18,31v6h-6v-6H18z" />
                                      <rect height={2} width={4} x={31} y={29} />
                                      <rect height={2} width={2} x={31} y={33} />
                                      <rect height={2} width={2} x={35} y={33} />
                                      <rect height={2} width={2} x={39} y={33} />
                                      <rect height={2} width={2} x={43} y={33} />
                                      <rect height={2} width={2} x={47} y={33} />
                                      <rect height={2} width={4} x={38} y={29} />
                                      <rect height={2} width={4} x={45} y={29} />
                                      <rect height={2} width={18} x={31} y={37} />
                                      <rect height={2} width={18} x={31} y={41} />
                                      <rect height={2} width={18} x={31} y={45} />
                                      <rect height={2} width={2} x={10} y={51} />
                                      <rect height={2} width={2} x={14} y={51} />
                                      <rect height={2} width={2} x={18} y={51} />
                                      <rect height={2} width={27} x={22} y={51} />
                                    </g>
                                  </g>
                                </g>
                              </svg></span><span>Leave Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#payroll" data-bs-toggle="tab" id="payroll-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Layer_1_1_" version="1.1" viewBox="0 0 64 64" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <path d="M60,3h-9.184C50.402,1.839,49.302,1,48,1H34c-1.302,0-2.402,0.839-2.816,2H22c-1.654,0-3,1.346-3,3v13h-3.406 c-1.217,0-2.418,0.319-3.474,0.923L6.734,23H1v18h6.697l4.236,2.824C13.087,44.594,14.43,45,15.816,45H19v15c0,1.654,1.346,3,3,3 h38c1.654,0,3-1.346,3-3V6C63,4.346,61.654,3,60,3z M25,27h2c2.206,0,4-1.794,4-4s-1.794-4-4-4h-2V9h6.184 c0.414,1.161,1.514,2,2.816,2h14c1.302,0,2.402-0.839,2.816-2H57v48H25V27z M33,4c0-0.552,0.448-1,1-1h14c0.552,0,1,0.448,1,1v4 c0,0.552-0.448,1-1,1H34c-0.552,0-1-0.448-1-1V4z M21,6c0-0.552,0.448-1,1-1h9v2h-8v12h-2V6z M15.816,43 c-0.99,0-1.949-0.29-2.773-0.84L8.303,39H3V25h4.266l5.847-3.341C13.867,21.228,14.725,21,15.594,21H27c1.103,0,2,0.897,2,2 s-0.897,2-2,2H15v1c0,2.757-2.243,5-5,5v2c3.521,0,6.442-2.612,6.929-6H19v16H15.816z M61,60c0,0.552-0.448,1-1,1H22 c-0.552,0-1-0.448-1-1V27h2v32h36V7h-8V5h9c0.552,0,1,0.448,1,1V60z" />
                                    <rect height={2} width={2} x={35} y={5} />
                                    <rect height={2} width={2} x={45} y={5} />
                                    <path d="M48.373,47.209l-3.375-0.964l-0.001-0.507C46.81,44.472,48,42.374,48,40v-2c0-3.859-3.141-7-7-7s-7,3.141-7,7v2 c0,2.372,1.189,4.469,3,5.736v0.51l-3.374,0.963C31.491,47.82,30,49.797,30,52.018V55h22v-2.982 C52,49.797,50.509,47.82,48.373,47.209z M36,40v-2c0-2.757,2.243-5,5-5s5,2.243,5,5v2c0,2.757-2.243,5-5,5S36,42.757,36,40z M42.965,46.714L41,49.333l-1.965-2.619C39.659,46.897,40.318,47,41,47S42.341,46.897,42.965,46.714z M50,53H32v-0.982 c0-1.332,0.895-2.519,2.176-2.885l3.437-0.982L41,52.667l3.387-4.516l3.437,0.982C49.105,49.499,50,50.686,50,52.018V53z" />
                                    <rect height={2} width={2} x={27} y={13} />
                                    <rect height={2} width={24} x={31} y={13} />
                                    <rect height={2} width={22} x={33} y={17} />
                                    <rect height={2} width={22} x={33} y={21} />
                                    <rect height={2} width={2} x={53} y={25} />
                                    <rect height={2} width={18} x={33} y={25} />
                                  </g>
                                </g>
                              </svg></span><span>Payroll Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#talent" data-bs-toggle="tab" id="talent-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <g>
                                    <g>
                                      <rect height="15.77" width={512} y="483.614" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <path d="M487.359,12.616h-80.492v174.522h15.77v-78.85h64.723c4.534,0,8.087,3.463,8.087,7.885s-3.552,7.885-8.087,7.885h-56.313 v15.77h56.313c13.151,0,23.852-10.605,23.857-23.643l0.119-80.064C511.336,23.16,500.58,12.616,487.359,12.616z M495.48,93.928 c-2.535-0.913-5.271-1.411-8.121-1.411h-64.723v-31.54V28.386h64.723c4.602,0,8.207,3.397,8.207,7.722L495.48,93.928z" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <polygon points="399.511,43.846 284.043,43.846 303.169,91.662 284.043,139.477 399.508,139.477 399.508,123.707 307.337,123.707 320.155,91.662 307.337,59.616 399.511,59.616 " />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <rect height="15.77" width="152.444" x="15.77" y="44.156" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <rect height="15.77" width="48.361" x="15.77" y="76.747" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <rect height="15.77" width="39.951" x="79.901" y="76.747" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <rect height="15.77" width="72.542" x="15.77" y="107.236" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <rect height="15.77" width="24.181" x="15.77" y="139.828" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <path d="M207.943,275.447v199.555h15.77v-63.93h64.091V475h15.77V275.447H207.943z M287.805,395.302h-64.091v-16.821h64.091 V395.302z M287.805,362.711h-64.091v-71.494h64.091V362.711z" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <path d="M48.218,363.294V475h15.77v-16.618h64.091V475h15.771V363.294H48.218z M128.08,442.612H63.988v-15.77h64.091V442.612z M128.08,411.072H63.988v-32.008h64.091V411.072z" />
                                    </g>
                                  </g>
                                  <g>
                                    <g>
                                      <path d="M367.668,195.584V475h15.77V275.45h64.093V475h15.77V195.584H367.668z M447.53,259.68h-64.093v-15.77h64.093V259.68z M447.53,228.14h-64.093v-16.786h64.093V228.14z" />
                                    </g>
                                  </g>
                                </g>
                              </svg></span><span>Talent Management</span> </button> </li>
                        <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#reports" data-bs-toggle="tab" id="reports-tab" role="tab" type="button"> <span className="svg_bg"> <svg fill="#000000" height="64px" version="1.1" viewBox="0 0 512 512" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                <g id="SVGRepo_iconCarrier">
                                  <g id="_x30_7_x2C__Analytics_x2C__laptop_x2C__statistics_x2C__web_x2C__computer">
                                    <g id="XMLID_858_">
                                      <g id="XMLID_197_">
                                        <path d="M351,237.458h-70c-1.788,0-3.439-0.955-4.332-2.503l-26.627-46.209 c-0.983-1.706-0.874-3.829,0.279-5.424l20.793-28.791c0.94-1.301,2.448-2.072,4.054-2.072h21.666 c1.605,0,3.113,0.771,4.054,2.073l54.167,75c1.099,1.522,1.253,3.532,0.398,5.204C354.597,236.407,352.878,237.458,351,237.458z M283.89,227.458h57.331l-46.944-65h-16.553l-17.403,24.097L283.89,227.458z" id="XMLID_699_" />
                                      </g>
                                      <g id="XMLID_196_">
                                        <path d="M281,237.458H151c-1.786,0-3.436-0.952-4.329-2.498s-0.895-3.451-0.003-4.999l51.861-90 c0.893-1.549,2.544-2.503,4.332-2.503h26.277c1.788,0,3.439,0.955,4.332,2.503l25.234,43.791l0,0l26.627,46.209 c0.892,1.547,0.891,3.453-0.003,4.999S282.785,237.458,281,237.458z M159.652,227.458h112.697l-46.1-80h-20.498L159.652,227.458z " id="XMLID_696_" />
                                      </g>
                                      <g id="XMLID_195_">
                                        <path d="M371,237.458H131c-2.761,0-5-2.239-5-5s2.239-5,5-5h240c2.762,0,5,2.239,5,5 S373.762,237.458,371,237.458z" id="XMLID_695_" />
                                      </g>
                                      <g id="XMLID_194_">
                                        <path d="M181,312.458h-50c-2.761,0-5-2.238-5-5v-50c0-2.761,2.239-5,5-5h50c2.761,0,5,2.239,5,5v50 C186,310.22,183.761,312.458,181,312.458z M136,302.458h40v-40h-40V302.458z" id="XMLID_692_" />
                                      </g>
                                      <g id="XMLID_193_">
                                        <path d="M241,267.458h-40c-2.761,0-5-2.238-5-5s2.239-5,5-5h40c2.761,0,5,2.238,5,5S243.761,267.458,241,267.458 z" id="XMLID_691_" />
                                      </g>
                                      <g id="XMLID_192_">
                                        <path d="M241,287.458h-40c-2.761,0-5-2.238-5-5s2.239-5,5-5h40c2.761,0,5,2.238,5,5S243.761,287.458,241,287.458 z" id="XMLID_690_" />
                                      </g>
                                      <g id="XMLID_191_">
                                        <path d="M316,312.458h-50c-2.762,0-5-2.238-5-5v-50c0-2.761,2.238-5,5-5h50c2.762,0,5,2.239,5,5v50 C321,310.22,318.762,312.458,316,312.458z M271,302.458h40v-40h-40V302.458z" id="XMLID_687_" />
                                      </g>
                                      <g id="XMLID_190_">
                                        <path d="M376,267.458h-40c-2.762,0-5-2.238-5-5s2.238-5,5-5h40c2.762,0,5,2.238,5,5S378.762,267.458,376,267.458 z" id="XMLID_686_" />
                                      </g>
                                      <g id="XMLID_189_">
                                        <path d="M376,287.458h-40c-2.762,0-5-2.238-5-5s2.238-5,5-5h40c2.762,0,5,2.238,5,5S378.762,287.458,376,287.458 z" id="XMLID_685_" />
                                      </g>
                                      <g id="XMLID_859_">
                                        <g id="XMLID_860_">
                                          <g id="XMLID_188_">
                                            <path d="M450,412.458H62c-17.093,0-31-13.906-31-31v-18c0-17.094,13.907-31,31-31h144c2.761,0,5,2.238,5,5v15 h90v-15c0-2.762,2.238-5,5-5h144c17.094,0,31,13.906,31,31v18C481,398.552,467.094,412.458,450,412.458z M62,342.458 c-11.58,0-21,9.421-21,21v18c0,11.579,9.42,21,21,21h388c11.579,0,21-9.421,21-21v-18c0-11.579-9.421-21-21-21H311v15 c0,2.762-2.238,5-5,5H206c-2.761,0-5-2.238-5-5v-15H62z" id="XMLID_682_" />
                                          </g>
                                          <g id="XMLID_187_">
                                            <path d="M446.477,342.458c-2.762,0-5-2.238-5-5V147.28c0-20.809-16.93-37.738-37.738-37.738H108.262 c-20.809,0-37.738,16.929-37.738,37.738v190.178c0,2.762-2.239,5-5,5s-5-2.238-5-5V147.28 c0-26.323,21.415-47.738,47.738-47.738h295.477c26.323,0,47.738,21.416,47.738,47.738v190.178 C451.477,340.22,449.238,342.458,446.477,342.458z" id="XMLID_681_" />
                                          </g>
                                          <g id="XMLID_186_">
                                            <path d="M445.091,312.458H66.909c-2.761,0-5-2.238-5-5s2.239-5,5-5h378.182c2.762,0,5,2.238,5,5 S447.853,312.458,445.091,312.458z" id="XMLID_676_" />
                                          </g>
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                  <g id="Layer_1" />
                                </g>
                              </svg></span><span>Reports and Analytics</span></button> </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" data-bs-target="#events" data-bs-toggle="tab" id="events-tab" role="tab" type="button">
                            <span className="svg_bg"><svg fill="currentColor" height="64px" viewBox="0 0 50 50" width="64px" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"><path d="M8 2L8 6L4 6L4 48L46 48L46 14L30 14L30 6L26 6L26 2 Z M 10 4L24 4L24 8L28 8L28 46L19 46L19 39L15 39L15 46L6 46L6 8L10 8 Z M 10 10L10 12L12 12L12 10 Z M 14 10L14 12L16 12L16 10 Z M 18 10L18 12L20 12L20 10 Z M 22 10L22 12L24 12L24 10 Z M 10 15L10 19L12 19L12 15 Z M 14 15L14 19L16 19L16 15 Z M 18 15L18 19L20 19L20 15 Z M 22 15L22 19L24 19L24 15 Z M 30 16L44 16L44 46L30 46 Z M 32 18L32 20L34 20L34 18 Z M 36 18L36 20L38 20L38 18 Z M 40 18L40 20L42 20L42 18 Z M 10 21L10 25L12 25L12 21 Z M 14 21L14 25L16 25L16 21 Z M 18 21L18 25L20 25L20 21 Z M 22 21L22 25L24 25L24 21 Z M 32 22L32 24L34 24L34 22 Z M 36 22L36 24L38 24L38 22 Z M 40 22L40 24L42 24L42 22 Z M 32 26L32 28L34 28L34 26 Z M 36 26L36 28L38 28L38 26 Z M 40 26L40 28L42 28L42 26 Z M 10 27L10 31L12 31L12 27 Z M 14 27L14 31L16 31L16 27 Z M 18 27L18 31L20 31L20 27 Z M 22 27L22 31L24 31L24 27 Z M 32 30L32 32L34 32L34 30 Z M 36 30L36 32L38 32L38 30 Z M 40 30L40 32L42 32L42 30 Z M 10 33L10 37L12 37L12 33 Z M 14 33L14 37L16 37L16 33 Z M 18 33L18 37L20 37L20 33 Z M 22 33L22 37L24 37L24 33 Z M 32 34L32 36L34 36L34 34 Z M 36 34L36 36L38 36L38 34 Z M 40 34L40 36L42 36L42 34 Z M 32 38L32 40L34 40L34 38 Z M 36 38L36 40L38 40L38 38 Z M 40 38L40 40L42 40L42 38 Z M 10 39L10 44L12 44L12 39 Z M 22 39L22 44L24 44L24 39 Z M 32 42L32 44L34 44L34 42 Z M 36 42L36 44L38 44L38 42 Z M 40 42L40 44L42 44L42 42Z" /></g></svg></span><span>Events and Meetings</span></button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button className="nav-link" data-bs-target="#mobile" data-bs-toggle="tab" id="mobile-tab" role="tab" type="button"> <span className="svg_bg">
                              <svg fill="currentColor" height="64px" id="Layer_1" version="1.1" viewBox="0 0 491.52 491.52" width="64px" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M368.64,163.84V0H0v491.52h368.64V358.4h122.88V163.84H368.64z M450.846,184.32L348.16,260.79l-102.686-76.47H450.846z M297.588,248.662l-72.308,74.294V194.819L297.588,248.662z M20.48,20.48h327.68v40.96H20.48V20.48z M348.16,471.04H20.48V409.6 h327.68V471.04z M348.16,389.12H20.48V81.92h327.68v81.92H204.8V358.4h143.36V389.12z M239.295,337.92l74.863-76.919 l34.002,25.319l34.003-25.319l74.863,76.919H239.295z M471.04,322.957l-72.308-74.294l72.308-53.844V322.957z" /> </g> </g> <g> <g> <rect height="20.48" width="102.4" x="133.12" y="430.08" /> </g> </g> <g> <g> <rect height="20.48" width="61.44" x="133.12" y="30.72" /> </g> </g> <g> <g> <rect height="20.48" width="20.48" x="215.04" y="30.72" /> </g> </g> </g></svg>
                            </span><span>Mobile App</span></button>
                        </li>
                      </ul>
                      <div className="tab-content mt-3" id="myTabContent">
                        <div className="tab-pane fade show active" id="company" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/Product/HRMS.JPG" /> </div>
                              <div className="content-box-over">
                                <h5>Company Management</h5>
                                <p>Manage your company the way you work best. Our Company Management solution.</p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="employee" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/employees.png" /> </div>
                              <div className="content-box-over">
                                <h5>Employee Management</h5>
                                <p>With HRM MITRA's Employee Management Software, you can give your employees the autonomy they deserve.
                                </p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="attendance" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/attandence.png" /> </div>
                              <div className="content-box-over">
                                <h5>Attendance Management</h5>
                                <p>Automatically calculate employee pay, time off, in-outs, and more with Attendance Management Software. </p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="leave" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/levemanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Leave Management System</h5>
                                <p>HRMetricS' Leave Management System offers a streamlined approach to workforce management.
                                </p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="payroll" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/payroll-management.png" /> </div>
                              <div className="content-box-over">
                                <h5>Payroll Management</h5>
                                <p>HRMetricS' Payroll Management Software is an integral part of its HRM Solution.</p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="talent" role="tabpanel">
                          <div className="tab-content-area newhrtab pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/talentmanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Talent Management</h5>
                                <p>Empower your HR team to focus on what truly matters—your people. Our Talent Management Software.</p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="reports" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/reportanalytics.png" /> </div>
                              <div className="content-box-over">
                                <h5>Reports and Analytics</h5>
                                <p>Give your HR team the insights they need to plan confidently. Our reporting tool makes it easy to analyze workforce.</p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="events" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/eventmanagement.png" /> </div>
                              <div className="content-box-over">
                                <h5>Events and Meetings</h5>
                                <p>With Event Management Software like HRMetricS, you can easily plan, manage, and evaluate events and meetings across your organisation. </p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="tab-pane fade" id="mobile" role="tabpanel">
                          <div className="tab-content-area pt-3 text-center">
                            <div className="imgbox-tab position-relative"> <img alt="" className="over1" src="assets/images/rate.gif" />
                              <div className="shadowww"> <img alt="" className="img22" src="assets/images/mobileapp.png" /> </div>
                              <div className="content-box-over">
                                <h5>Mobile App</h5>
                                <p>The HRMetricS Mobile App revolutionises human resource management, putting power in the palms. </p>
                                <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)">Book a demo</a> </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="activity-tab" className="tab-pane fade" id="activityreporter" role="tabpanel">
                    <div className="imgbox-tab text-center position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Activity-Management.jpg" />
                      </div>
                      <div className="content-box-over">
                        <h5>Activity Management Software </h5>
                        <p>Track, manage, and analyse employee activities in real time to ensure optimal performance. </p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="task-tab" className="tab-pane fade show active text-center" id="taskmanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Task-managment.jpg" />
                      </div>
                      <div className="content-box-over">
                        <h5>Task Management Software</h5>
                        <p>Plan, assign, and track tasks effortlessly with automation-driven workflows that improve collaboration.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="asset-tab" className="tab-pane fade text-center" id="assetmanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Asset-Managment.jpg" />
                      </div>
                      <div className="content-box-over">
                        <h5>Asset Management Software</h5>
                        <p>Gain complete control over your assets—track, monitor, and maintain them in real-time with a platform.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                  <div aria-labelledby="force-tab" className="tab-pane fade text-center" id="forcemanagement" role="tabpanel">
                    <div className="imgbox-tab position-relative">
                      <img alt="" className="over1" src="assets/images/rate.gif" />
                      <div className="shadowww">
                        <img alt="" className="img22" src="assets/images/Product/Field-Force-Managment.jpg" />
                      </div>
                      <div className="content-box-over">
                        <h5>Field Force Management</h5>
                        <p>Empower your on-ground teams with GPS-based tracking, live updates, task allocation.</p>
                        <div className="btn-center text-left mt-3"> <a className="btn btn-theme btn-md radius animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <section className="platform-section py-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h4 className="sub-title">A Single Unified Platform</h4>
                <h2 className="title split-text">Loved By All - From Employer to Employee</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs justify-content-center mb-4" id="roleTabs" role="tablist">
            <li className="nav-item" role="presentation"> <button className="nav-link active" data-bs-target="#chro" data-bs-toggle="tab" id="chro-tab" role="tab" type="button">
                <div className="tab-hold"> <img alt="" src="assets/images/human-resources.png" /> <span className="d-block">CHRO</span> </div>
              </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#manager" data-bs-toggle="tab" id="manager-tab" role="tab" type="button">
                <div className="tab-hold"> <img alt="" src="assets/images/manager.png" /> <span className="d-block">Manager</span> </div>
              </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#management" data-bs-toggle="tab" id="management-tab" role="tab" type="button">
                <div className="tab-hold"> <img alt="" src="assets/images/management.png" /> <span className="d-block">Management</span> </div>
              </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#employee1" data-bs-toggle="tab" id="employee-tab" role="tab" type="button">
                <div className="tab-hold"> <img alt="" src="assets/images/employee.png" /> <span className="d-block">Employee</span> </div>
              </button> </li>
            <li className="nav-item" role="presentation"> <button className="nav-link" data-bs-target="#finance" data-bs-toggle="tab" id="finance-tab" role="tab" type="button">
                <div className="tab-hold"> <img alt="" src="assets/images/business-and-finance.png" /> <span className="d-block">Finance</span> </div>
              </button> </li>
          </ul>
          <div className="tab-content" id="roleTabsContent">
            <div className="tab-pane fade show active" id="chro" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">CHRO - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Use of spreadsheets for People Ops</li>
                      <li className="mb-1"><span className="text-warning" /> Manual data entries leading to frequent errors</li>
                      <li className="mb-1"><span className="text-warning" /> Disengaged employees with low motivation</li>
                      <li><span className="text-warning" /> Valuable time lost in repetitive admin work</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Workforce management becomes effortless. Centralize employee records, leave, and attendance data on a single platform. Monitor People Operations, boost employee engagement, and make HR processes more strategic. Track and evaluate employee performance effectively using the built-in task management module and Daily Progress Reports (DPR).</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Employee with tablet" className="img-fluid" src="assets/images/img2.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="manager" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Manager - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Delays in approval workflows</li>
                      <li className="mb-1"><span className="text-warning" /> Difficulty tracking team performance</li>
                      <li className="mb-1"><span className="text-warning" /> Overloaded with routine admin tasks</li>
                      <li><span className="text-warning" /> No structured system to assign or monitor work</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg2 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p>Managers can track team activities in real time through Attendance Regularization (AR), task assignments, and performance dashboards—bringing structure, speed, and visibility to daily operations.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg2 bg-opacity-25 rad10 img_paltform"> <img alt="Manager with dashboard" className="img-fluid" src="assets/images/img3.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="management" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Management - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Struggle with data security and software compatibility</li>
                      <li className="mb-1"><span className="text-warning" /> Low platform adoption among users</li>
                      <li><span className="text-warning" /> No structured support during implementation</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Experience zero compliance hassles. Our expert team works closely with your IT department to ensure seamless implementation, secure data management, and scalable, future-ready operations. Gain complete visibility with graphical and analytical reports that track project start and end dates, monitor actual vs. planned progress, and maintain comprehensive document records—all in one place.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Management overview" className="img-fluid" src="assets/images/management-img.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="employee1" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Employee - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Complicated systems for basic HR tasks</li>
                      <li className="mb-1"><span className="text-warning" /> Constant dependency on HR for documents</li>
                      <li className="mb-1"><span className="text-warning" /> Disconnected from internal communication</li>
                      <li><span className="text-warning" /> Manual tracking using spreadsheets</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Empower your workforce with a seamless self-service experience! Through our easy-to-use mobile app, employees can apply for leave, view shifts, download payslips, and access training—anytime, anywhere. They can also track their daily tasks, helping them manage their workload and time more efficiently.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Employee overview" className="img-fluid" src="assets/images/employess.png" /> </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="finance" role="tabpanel">
              <div className="row g-4 align-items-center">
                <div className="col-md-6">
                  <div className="p-4 border rad10 bg-white shadow-sm">
                    <h5 className="fw-bold">Finance - Before HRMetricS</h5>
                    <ul className="list-unstyled mt-3">
                      <li className="mb-1"><span className="text-warning" /> Payroll management still done on Excel</li>
                      <li className="mb-1"><span className="text-warning" /> Struggling with complex statutory regulations</li>
                      <li><span className="text-warning" /> Frequent data entry errors and tedious manual processes</li>
                    </ul>
                  </div>
                  <div className="mt-3 p-4 rad10 bg1 bg-opacity-25">
                    <h5 className="fw-bold">With HRMetricS</h5>
                    <p className="text-justify">Run payroll like a pro! HRMetricS' advanced Payroll Management module ensures complete accuracy, statutory compliance, and seamless salary disbursement. It automatically generates Form 16, gives access to detailed reports, and simplifies every aspect of payroll processing. HRMetricS also generates the Bank CMS file, ready for direct download and upload to your bank portal—saving time and reducing manual effort.</p>
                  </div>
                </div>
                <div className="col-md-6 text-center">
                  <div className="p-3 bg1 bg-opacity-25 rad10 img_paltform"> <img alt="Finance overview" className="img-fluid" src="assets/images/finance.png" /> </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn-center text-center mt-5"> <a className="btn btn-theme btn-md radius animation wow scrollToForm fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a> </div>
        </div>
      </section>
      <hr />
      <section className="faq-area default-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading mb-3 text-center">
                <h4 className="sub-title">Faq</h4>
                <h2 className="title split-text">Frequently Asked Questions</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
          <div className="faq-accordion-content">
            <ul className="accordion">
              <li className="accordion-item">
                <a className="accordion-title active" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  Is HRMetricS suitable for small businesses and large enterprises alike?
                </a>
                <p className="accordion-content show">Yes, HRMetricS is designed to cater to the needs of businesses of all sizes. It can be easily customized and scaled to fit the requirements of small startups, medium-sized companies, and large enterprises.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  How user-friendly is HRMetricS?
                </a>
                <p className="accordion-content">HRMetricS boasts an intuitive user interface that requires minimal training for users to navigate and operate. Its user-friendly design ensures a smooth onboarding process and allows HR professionals and employees to adapt quickly to the system.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  Does HRMetricS comply with data security standards?
                </a>
                <p className="accordion-content">Absolutely. HRMetricS prioritizes data security and confidentiality. It adheres to industry best practices and complies with data protection regulations to safeguard sensitive employee information.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  How does HRMetricS help with employee engagement?
                </a>
                <p className="accordion-content">HRMetricS includes features like employee self-service portals, performance feedback mechanisms, and recognition programs that promote a positive employee experience and foster higher levels of engagement within the workforce.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  How can I get started with HRMetricS for my organization?
                </a>
                <p className="accordion-content">To get started with HRMetricS, you can request a demo or contact our sales team. They will guide you through the process of implementing HRMetricS to transform your HR operations and elevate your organizational efficiency.</p>
              </li>
              <li className="accordion-item">
                <a className="accordion-title" href="javascript:void(0)">
                  <i className="fa fa-chevron-down" />
                  What additional solutions does HRMetricS offer?
                </a>
                <p className="accordion-content">In addition to its core services, HRMetricS provides solutions for Activity Management, Task Management, Asset Management, and Field Force Management.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <div className="tesimoinial-style-four-area bg-gray default-padding bg-cover" style={{backgroundImage: 'url(assets/img/shape/38.png)'}}>
        <div className="container">
          <div className="left-heading">
            <div className="row">
              <div className="col-lg-6">
                <h4 className="sub-title">Testimonials</h4>
                <h2 className="title">What Our Clients Say About Us</h2>
              </div>
              <div className="col-lg-5 offset-lg-1 text-end">
                <div className="testimonial-four-swiper-nav">
                  <div className="testimonial-four-prev"><i className="fas fa-angle-left" /></div>
                  <div className="testimonial-four-next"><i className="fas fa-angle-right" /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-112">
              <div className="testimonial-style-four-carousel swiper">
                <div className="swiper-wrapper">
                  {testimonials.map((item) => (
                    <div key={item.id} className="swiper-slide">
                      <div className="testimonial-style-four">
                        <div className="quote">
                          <img alt="Quote" src="assets/images/quote.png" />
                        </div>
                        <div className="provider">
                          <div className="thumb">
                            <img alt={item.clientName} src={item.imageUrl || "assets/images/testhr.png"} />
                          </div>
                          <div className="info">
                            <h4>{item.clientName}</h4>
                            <span>{formatClientMeta(item)}</span>
                          </div>
                        </div>
                        <p className="moretext" data-fulltext={item.testimonial}>{item.testimonial}</p>
                        <div className="bottom-info mt-2">
                          <div className="icon">
                            {Array.from({ length: Math.max(1, Math.min(5, Number(item.rating) || 5)) }).map((_, index) => (
                              <i key={`${item.id}-star-${index}`} className="fas fa-star" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {false && (
                    <>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/testhr.png" />
                        </div>
                        <div className="info">
                          <h4>Tapasya</h4>
                          <span>HR Head, IndiaIT360</span>
                        </div>
                      </div>
                      <div className="more">
                        <p className="moretext" data-fulltext=" It's easy to manage HR processes than what we where doing it manually. After adopting HRMetricS, we are able to same time by automating all the manual processes from attendance tracking to leave approvals and payslip generation, everything is now automated and accessible in just a few clicks. Our employees love the self-service portal, and our HR team has finally moved from firefighting to strategic planning. Kudos to the HRMetricS intuitive HRMS platform for such a comprehensive solution!" />
                      </div>
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test4.jpg" />
                        </div>
                        <div className="info">
                          <h4>Vivek Arora</h4>
                          <span>HR Head, Simsona</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext="At Simsona, we have completely transformed the way we handle recruitment and performance reviews. The platform is intuitive, fast, and incredibly powerful. We’ve reduced our employee onboarding  to exit process by nearly 40% and gained real-time visibility into employee performance metrics. It's like having an extra HR manager onboard—only smarter!" />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test3.jpg" />
                        </div>
                        <div className="info">
                          <h4>Anita Mishra</h4>
                          <span>VP of Employee Relations</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext=" HRMetricS has made our payroll processing seamless and efficient. What used to take several days now takes less than two days —with error-free calculations and payslip generation at the click of a button" />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test5.avif" />
                        </div>
                        <div className="info">
                          <h4>Kritika Sharma</h4>
                          <span>Employee Relation Manager</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext="HRMetricS is built for every kind of workforce. Our field employees can now mark their attendance and submit expenses on the go, right from their mobile devices." />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test6.jpg" />
                        </div>
                        <div className="info">
                          <h4>Beena Rathi</h4>
                          <span>Talent Acquisition Coordinator</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext=" Our employees appreciate the transparency and convenience HRMetricS offers—easy access to personal data, a clear and timely payroll process, and smooth leave and attendance management. The platform’s secure data handling also builds trust. It’s more than just an HR tool—it’s an asset to employee satisfaction." />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test7.jpeg" />
                        </div>
                        <div className="info">
                          <h4>Carmen Bety</h4>
                          <span>Talent Acquisition Specialist</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext="I’ve always liked the software we were using for years, but after exploring other platforms like HRMetricS, it tuned out to be the best fit for our needs. HRMetricS stood out with its powerful customization options. We’re able to create tailored workflows that fit our unique processes—something I haven’t seen with other HR solutions. It offers outstanding value." />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="swiper-slide">
                    <div className="testimonial-style-four">
                      <div className="quote">
                        <img alt="Image Not Found" src="assets/images/quote.png" />
                      </div>
                      <div className="provider">
                        <div className="thumb">
                          <img alt="Image Not Found" src="assets/images/test8.jpg" />
                        </div>
                        <div className="info">
                          <h4>Ruby Nair</h4>
                          <span>Chief Human Resources&nbsp;Officer</span>
                        </div>
                      </div>
                      <p className="moretext" data-fulltext="One of the standout features of HRMetricS is its versatility. It’s not just limited to the HR team—our Assets, Office Management, Training, and Finance departments. All use it effectively to streamline their operations." />
                      <div className="bottom-info mt-2">
                        <div className="icon">
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                          <i className="fas fa-star" />
                        </div>
                      </div>
                    </div>
                  </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="technolgy-index-two-area default-padding bg-dark text-light bg-cover">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="left-heading-two">
                <div className="left-info">
                  <h4 className="sub-title">Recognitions</h4>
                  <h2 className="title">Awards We Won</h2>
                </div>
                <div className="right-info">
                  <p className="text-white">We’re honored to be recognized for our innovation, impact, and commitment to excellence. These awards reflect the hard work of our team and the trust of our partners, clients, and community.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="technology-index-two-items text-center">
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/certificate.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award2.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award3.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award4.png" />
                    </div>
                  </a>
                </div>
                <div className="tech-index-two-item">
                  <a href="#">
                    <div className="icon">
                      <img src="assets/images/award5.png" />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dem-section bg-gradientt position-relative py-5">
        <div className="circle-img" style={{backgroundImage: 'url(assets/images/circlbg.png)'}}>
        </div>
        <div className="container">
          <div className="btn-center text-center myflex">
            <h3>Transform Your HR Process: Take the First Step Towards Automation</h3>
            <a className="btn btn-theme btn-md radius scrollToForm animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" href="javascript:void(0)" id style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</a>
          </div>
        </div>
      </div>
      <div className="home-blog-area default-padding bottom-less bg-gradientt bg-cover" style={{backgroundImage: 'url(assets/images/banner.jpg)'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2 className="title split-text">Our Blog</h2>
                <div className="devider" />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-3">
            <div className="col-xl-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay="300ms">
              <div className="blog-style-one">
                <div className="thumb"> <a href="blog/hrms/how-to-manage-payroll-effectively-a-comprehensive-guide/index.html"><img alt="Thumb" src="assets/images/blog1.jpg" /></a> </div>
                <div className="info">
                  <div className="blog-meta">
                    <ul>
                      <li> <span>By Divya Giri</span> <a href="blog/hrms/how-to-manage-payroll-effectively-a-comprehensive-guide/index.html" target="_blank">HRMS</a> </li>
                      <li> May 7, 2025 </li>
                    </ul>
                  </div>
                  <h4> <a href="blog/hrms/how-to-manage-payroll-effectively-a-comprehensive-guide/index.html" target="_blank">How to Manage Payroll Effectively: A Comprehensive Guide</a> </h4> <a className="btn-animate" href="blog/hrms/how-to-manage-payroll-effectively-a-comprehensive-guide/index.html" target="_blank"> <span className="circle"> <span className="icon arrow" /> </span> <span className="button-text">Read More</span> </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay="500ms">
              <div className="blog-style-one">
                <div className="thumb"> <a href="blog/hrms/from-desk-to-pocket-how-mobile-hr-apps-are-changing-the-way-we-work-in-india/index.html"><img alt="Thumb" src="assets/images/blog2.jpg" /></a> </div>
                <div className="info">
                  <div className="blog-meta">
                    <ul>
                      <li> <span>By Survi Sahay</span> <a href="blog/hrms/from-desk-to-pocket-how-mobile-hr-apps-are-changing-the-way-we-work-in-india/index.html" target="_blank">HRMS</a> </li>
                      <li> November 9, 2024 </li>
                    </ul>
                  </div>
                  <h4> <a href="blog/hrms/from-desk-to-pocket-how-mobile-hr-apps-are-changing-the-way-we-work-in-india/index.html" target="_blank">From Desk to Pocket: How Mobile HR Apps Are Changing the Way We Work in India</a> </h4> <a className="btn-animate" href="blog/hrms/from-desk-to-pocket-how-mobile-hr-apps-are-changing-the-way-we-work-in-india/index.html" target="_blank"> <span className="circle"> <span className="icon arrow" /> </span> <span className="button-text">Read More</span> </a>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6 mb-30 wow fadeInUp" data-wow-delay="700ms">
              <div className="blog-style-one">
                <div className="thumb"> <a href="blog/task-management/revolutionize-your-workflow-the-benefits-of-task-management-software/index.html"><img alt="Thumb" src="assets/images/blog3.jpg" /></a> </div>
                <div className="info">
                  <div className="blog-meta">
                    <ul>
                      <li> <span>By Survi Sahay</span> <a href="blog/task-management/revolutionize-your-workflow-the-benefits-of-task-management-software/index.html" target="_blank">Task Management</a> </li>
                      <li> August 24, 2024 </li>
                    </ul>
                  </div>
                  <h4> <a href="blog/task-management/revolutionize-your-workflow-the-benefits-of-task-management-software/index.html" target="_blank">Revolutionize Your Workflow: The Benefits of Task Management Software</a> </h4> <a className="btn-animate" href="blog/task-management/revolutionize-your-workflow-the-benefits-of-task-management-software/index.html" target="_blank"> <span className="circle"> <span className="icon arrow" /> </span> <span className="button-text">Read More</span> </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footer-bg text-light bg-cover">
        <div className="footer-shape">
          <div className="item">
            <img alt="Shape" src="assets/images/footerbg.png" />
          </div>
        </div>
        <div className="container">
          <div className="f-items relative pt-50 pb-60 pt-xs-0 pb-xs-50">
            <div className="row mb-4 align-items-center">
              <div className="col-md-5">
                <div className="f-item about">
                  <img alt="Logo" className="logo mb-2" src="assets/images/logo.png" style={{height: 45}} />
                  <p className="mb-0">
                    Experience the power of seamless HR management. Our solution empowers your organization by simplifying tasks, automating workflows, and optimizing HR processes for enhancing the productivity.
                  </p>
                  <ul className="footer-social mt-0">
                    <li>
                      <a href={siteSettings.linkedin_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.facebook_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.x_url} target="_blank" rel="noopener noreferrer">
                        <i className="">X</i>
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.instagram_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-instagram" />
                      </a>
                    </li>
                    <li>
                      <a href={siteSettings.whatsapp_url} target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-whatsapp" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-md-7">
                <div className="awrd-box text-end">
                  <img alt="" src="assets/images/certificate1.png" />
                  <img alt="" src="assets/images/certificate2.png" />
                  <img alt="Shape" src="assets/images/dmca.webp" />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">HRMetricS' Modules</h4>
                  <ul className="hr-ul">
                    <li><a href="hrm-soultion-software/index.html">HRM Solution</a></li>
                    <li><a href="attendance-management-software/index.html">Attendance Management</a></li>
                    <li><a href="payroll-management-software/index.html">Payroll Management</a></li>
                    <li><a href="leave-management-software/index.html">Leave Management</a></li>
                    <li><a href="task-management-software/index.html">Task Management</a></li>
                    <li><a href="asset-management-software/index.html">Asset Management</a></li>
                    <li><a href="activity-management-software/index.html">Activity Management</a></li>
                    <li><a href="field-force-management-software/index.html">Field Force Management </a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Company</h4>
                  <ul>
                    <li><a href="about/index.html">About</a></li>
                    <li><a href="blog/index.html" target="_blank">Blog</a></li>
                    <li><a href="contact/index.html">Contact</a></li>
                    <li><a href="terms-services/index.html">Terms of service</a></li>
                    <li><a href="privacy-policy/index.html">Privacy policy</a></li>
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
                      <div className="working-day"><strong>Maldives:</strong> {siteSettings.new_delhi_address}</div>
                      <div className="working-hour mt-2"><strong>Phone:</strong><a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer"> {siteSettings.primary_phone}</a>, <a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a></div>
                      <div className="working-hour"><strong>Email:</strong>
                        <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <p>© Copyright 2026 <a href={siteSettings.company_url} style={{color: '#f03041', fontWeight: 500}} target="_blank" rel="noopener noreferrer">{siteSettings.company_legal_name}</a> All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <button id="scrollTopBtn">↑</button>
      
      
    </div>
  );
}
