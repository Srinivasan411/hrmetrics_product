import { useEffect } from "react";
import { useSiteSettings } from "../siteSettings.jsx";

export default function ContactPage() {
  const { siteSettings } = useSiteSettings();

  useEffect(() => {
    document.title = "Best HRM Solution In India, Saas Based HRM Solution, Performance Management in HRMS- HRMetricS";
  }, []);

  return (
    <div>
      <div className="top-bar-area top-bar-style-one text-light">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8">
              <div className="animate-text text-left">
                <h1 className="mb-0 typing-animation" style={{fontSize: 16, fontWeight: 400, position: 'relative', top: 2}}>Most Advanced HRM Software in Indian Market Trusted by Many <img alt="" src="../assets/images/hand.gif" /></h1>
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
          <span className="smllogo"><img alt="" src="../assets/images/logo1.png" width={80} /></span>
        </div>
        <div className="headerfull">
          <div className="container">
            <div className="wsmain clearfix">
              <div className="smllogo">
                <a href="../index.html"><img alt="" src="../assets/images/logo1.png" /></a>
              </div>
              <nav className="wsmenu clearfix">
                <ul className="wsmenu-list">
                  <li aria-haspopup="true"><a className="navtext" href="../index.html"><span /> <span>Home</span></a>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="../about/index.html"><span /> <span>About</span></a>
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
                            <a href="../hrm-soultion-software/index.html">
                              <i className="fas fa-female" />HRMS </a>
                            <div className="wsshoptab-active wstbrandbottom clearfix">
                              <div className="container-fluid">
                                <div className="row">
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="../company-management-software/index.html">
                                          <span className="menu-iconn"><img alt="" src="../assets/images/icon/organization.png" /></span> Company Management </a>
                                      </li>
                                      <li>
                                        <a href="../employees-management-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/employee.png" /></span> Employee Management </a>
                                      </li>
                                      <li>
                                        <a href="../attendance-management-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/attendance.png" /></span> Attendance Management </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="../leave-management-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/leave.png" /></span> Leave Management </a>
                                      </li>
                                      <li>
                                        <a href="../payroll-management-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/payroll.png" /></span> Payroll Management </a>
                                      </li>
                                      <li>
                                        <a href="../talent-management-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/talent-management.png" /></span> Talent Recognition </a>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="col-lg-4 col-md-12">
                                    <ul className="wstliststy02 clearfix">
                                      <li>
                                        <a href="../report-and-analytics-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/analytics.png" /></span>Reports and Analytics </a>
                                      </li>
                                      <li>
                                        <a href="../events-and-meeting-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/meeting.png" /></span> Events and Meetings </a>
                                      </li>
                                      <li>
                                        <a href="../mobile-app-software/index.html"><span className="menu-iconn"><img alt="" src="../assets/images/icon/booking.png" /></span> Mobile App </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <li>
                            <a href="../activity-management-software/index.html">
                              <i className="fas fa-male" /> Activity Management </a>
                          </li>
                          <li>
                            <a href="../task-management-software/index.html">
                              <i className="fas fa-play-circle" /> Task Management </a>
                          </li>
                          <li>
                            <a href="../asset-management-software/index.html">
                              <i className="fas fa-utensils" />
                              Asset Management </a>
                          </li>
                          <li>
                            <a href="../field-force-management-software/index.html">
                              <i className="fas fa-tv" />Field Force Management </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="../blog/index.html" target="_blank"><span /> <span>Blog</span></a>
                  </li>
                  <li aria-haspopup="true"><a className="navtext" href="index.html"><span /> <span>Contact</span></a>
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
      <div className="breadcrumb-area bg-cover shadow theme-hard text-center text-light" style={{backgroundImage: 'url("../assets/images/about1.jpg")'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <h1>Contact Us</h1>
              <ul className="breadcrumb">
                <li><a href="#"><i className="fas fa-home" /> Home</a></li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-style-one-area overflow-hidden default-padding">
        <div className="contact-shape">
          <img alt="Image Not Found" src="assets/img/shape/37.png" />
        </div>
        <div className="container">
          <div className="row">
            <div className="contact-stye-one col-lg-5 mb-md-50 mb-xs-20">
              <div className="contact-style-one-info">
                <h2 className="split-text">Contact Information</h2>
                <ul>
                  <li className="wow fadeInUp">
                    <div className="icon">
                      <i className="fas fa-phone-alt" />
                    </div>
                    <div className="content">
                      <h5 className="title">Call</h5>
                      <a href={siteSettings.whatsapp_direct_url} target="_blank" rel="noopener noreferrer"> {siteSettings.primary_phone}</a><span className="text-white">,</span> <a href={siteSettings.secondary_phone_href}>{siteSettings.secondary_phone}</a>
                    </div>
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="300ms">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div className="info">
                      <h5 className="title">Our Location</h5>
                      <p>
                        <strong><span className="dottt" /> New Delhi:</strong> {siteSettings.new_delhi_address}
                      </p>
                      <p><strong><span className="dottt" /> Noida:</strong> {siteSettings.noida_address}</p>
                    </div>
                  </li>
                  <li className="wow fadeInUp" data-wow-delay="500ms">
                    <div className="icon">
                      <i className="fas fa-envelope-open-text" />
                    </div>
                    <div className="info">
                      <h5 className="title">Email</h5>
                      <a href={siteSettings.primary_email_href}>{siteSettings.primary_email}</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="contact-stye-one col-lg-7 pl-60 pl-md-15 pl-xs-15">
              <div className="contact-form-style-one">
                <h5 className="sub-title">Have Questions?</h5>
                <h2 className="title">Send us a Massage</h2>
                <form action="contactMail.php" className="contact-form1" method="POST">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input className="form-control" id="name" name="name" placeholder="Name*" required type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="email" name="email" placeholder="Official Email*" required type="email" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="phone" maxLength={10} minLength={10} name="phone" placeholder="Mobile*" required type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="company" name="company" placeholder="Organization Name*" required type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="employees" name="employees" placeholder="Number of Employees*" required type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="address" name="address" placeholder="Address" type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input className="form-control" id="city" name="city" placeholder="City" type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <input className="form-control" id="pincode" name="pincode" placeholder="Pincode" type="text" />
                        <span className="alert-error" />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group comments">
                        <textarea className="form-control" id="message" name="message" placeholder="Message*" defaultValue={""} />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <button id="submit" name="submit" type="submit">
                        <i className="fa fa-paper-plane" /> Get in Touch
                      </button>
                    </div>
                    <div className="col-lg-12 alert-notification">
                      <div className="alert-msg" id="message" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="google-map">
        <iframe allowFullScreen frameBorder={0} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={siteSettings.google_maps_embed_url} style={{border: 0, width: '100%', height: 350}} />
      </div>
      <footer className="footer-bg text-light bg-cover">
        <div className="footer-shape">
          <div className="item">
            <img alt="Shape" src="../assets/images/footerbg.png" />
          </div>
        </div>
        <div className="container">
          <div className="f-items relative pt-50 pb-60 pt-xs-0 pb-xs-50">
            <div className="row mb-4 align-items-center">
              <div className="col-md-5">
                <div className="f-item about">
                  <img alt="Logo" className="logo mb-2" src="../assets/images/logo.png" style={{height: 45}} />
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
                  <img alt="" src="../assets/images/certificate1.png" />
                  <img alt="" src="../assets/images/certificate2.png" />
                  <img alt="Shape" src="../assets/images/dmca.webp" />
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">HRMetricS' Modules</h4>
                  <ul className="hr-ul">
                    <li><a href="../hrm-soultion-software/index.html">HRM Solution</a></li>
                    <li><a href="../attendance-management-software/index.html">Attendance Management</a></li>
                    <li><a href="../payroll-management-software/index.html">Payroll Management</a></li>
                    <li><a href="../leave-management-software/index.html">Leave Management</a></li>
                    <li><a href="../task-management-software/index.html">Task Management</a></li>
                    <li><a href="../asset-management-software/index.html">Asset Management</a></li>
                    <li><a href="../activity-management-software/index.html">Activity Management</a></li>
                    <li><a href="../field-force-management-software/index.html">Field Force Management </a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Company</h4>
                  <ul>
                    <li><a href="../about/index.html">About</a></li>
                    <li><a href="../blog/index.html" target="_blank">Blog</a></li>
                    <li><a href="index.html">Contact</a></li>
                    <li><a href="../terms-services/index.html">Terms of service</a></li>
                    <li><a href="../privacy-policy/index.html">Privacy policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 footer-item">
                <div className="f-item link">
                  <h4 className="widget-title">Contact Us</h4>
                  <ul className="mt-3 mb-3">
                    <li>
                      <strong>Location:</strong>
                      <div className="working-day mb-2"><strong>Noida:</strong>  {siteSettings.noida_address}</div>
                      <div className="working-day"><strong>New Delhi:</strong> {siteSettings.new_delhi_address}</div>
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
      <div aria-hidden="true" aria-labelledby="exampleModalLabel" className="modal fade" id="bookdemo-modal" tabIndex={-1}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button" />
            </div>
            <div className="modal-body">
              <div className="form-container">
                <h4 className="mb-4 text-danger fw-bold">Try HRMetricS For Free!</h4>
                <form action="sendMail.php" id="bookdemo" method="POST" onsubmit="return validateOfficialEmail()">
                  <div className="mb-3">
                    <input className="form-control" name="name" placeholder="Name*" required type="text" />
                  </div>
                  <div className="mb-3">
                    <input className="form-control" name="company" pattern="^(?!.*@).*" placeholder="Company*" required title="Please enter a valid company name, not an email address." type="text" />
                  </div>
                  <div className="mb-3">
                    <input className="form-control" id="email" name="email" pattern="^[a-zA-Z0-9._%+-]+@(?!gmail\\.com$|yahoo\\.com$|hotmail\\.com$|outlook\\.com$).+$" placeholder="Official Email ID*" required title="Please enter your official (work) email address" type="email" />
                  </div>
                  <div className="mb-3 input-group">
                    <input className="form-control" maxLength={10} minLength={10} name="phone" placeholder="Phone*" required type="tel" />
                  </div>
                  <div className="mb-3">
                    <select className="form-select" name="employees" required>
                      <option value>No. of Employees*</option>
                      <option value="1-10">1-10</option>
                      <option value="11-50">11-50</option>
                      <option value="51-200">51-200</option>
                      <option value="201-500">201-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <button className="btn btn-orange w-100" type="submit">Submit</button>
                  <div id="loader">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div aria-hidden="true" aria-labelledby="exampleModalLabel" className="modal fade" id="demoshedule-modal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0 text-danger modal-title fw-bold">Hire to Retire Solution Demonstration!</h4>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button" />
            </div>
            <div className="modal-body">
              <div className="form-container shedileform p-3" style={{textAlign: 'left'}}>
                <form action="sheduleMail.php" id="sheduledemo" method="POST" onsubmit="return validateOfficialEmail()">
                  <div className="row g-2">
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="name">Name *</label>
                      <input className="form-control" id="name" name="name" placeholder required type="text" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="email">Official Email *</label>
                      <input className="form-control" id="email12" name="email" pattern="^[a-zA-Z0-9._%+-]+@(?!gmail\\.com$|yahoo\\.com$|hotmail\\.com$|outlook\\.com$).+$" placeholder required title="Please enter your official (work) email address" type="email" />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label" htmlFor="phone">Phone Number *</label>
                      <input className="form-control" id="phone" maxLength={10} minLength={10} name="phone" placeholder required type="tel" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="company">Organization Name *</label>
                      <input className="form-control" id="company" name="company" placeholder required type="text" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label" htmlFor="employees">No. of Employees *</label>
                      <select className="form-select" id="employees" name="employees" required>
                        <option value>Select</option>
                        <option value="1-10">1–10</option>
                        <option value="11-50">11–50</option>
                        <option value="51-200">51–200</option>
                        <option value="201-500">201–500</option>
                        <option value="500+">500+</option>
                      </select>
                    </div>
                    <div className="col-md-5">
                      <div className="mb-3 mt-3" style={{textAlign: 'left'}}>
                        <label className="form-label fw-bold">Interested Application *</label>
                        <div className="form-check">
                          <input className="form-check-input" id="hrmSolution" name="interested_modules[]" type="checkbox" defaultValue="HRM Solution" />
                          <label className="form-check-label" htmlFor="hrmSolution">HRM Solution</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" id="attendancePayroll" name="interested_modules[]" type="checkbox" defaultValue="Attendance & Payroll" />
                          <label className="form-check-label" htmlFor="attendancePayroll">Attendance</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" id="activityManagement" name="interested_modules[]" type="checkbox" defaultValue="Activity Management" />
                          <label className="form-check-label" htmlFor="activityManagement">Activity Management</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" id="taskManagement" name="interested_modules[]" type="checkbox" defaultValue="Task Management" />
                          <label className="form-check-label" htmlFor="taskManagement">Task Management</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" id="assetManagement" name="interested_modules[]" type="checkbox" defaultValue="Asset Management" />
                          <label className="form-check-label" htmlFor="assetManagement">Asset Management</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" id="FieldForceManagement" name="interested_modules[]" type="checkbox" defaultValue="Field Force Management" />
                          <label className="form-check-label" htmlFor="FieldForceManagement">Field Force Management</label>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-7">
                      <label className="form-label" htmlFor="challenges">Current Challenges / Requirements</label>
                      <textarea className="form-control" id="challenges" name="challenges" placeholder rows={8} defaultValue={""} />
                    </div>
                  </div>
                  <button className="btn btn-orange w-100" type="submit">Schedule a Free Demo</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
