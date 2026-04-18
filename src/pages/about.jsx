import React from 'react';
import { useSiteSettings } from "../siteSettings.jsx";
import FaqSection from "../components/FaqSection.jsx";

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
          <button className="wsanimated-arrow" id="wsnavtoggle"><span></span></button>
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
                  <li aria-haspopup="true"><a className="navtext" href="/contact"><span></span> <span>Contact</span></a></li>
                  <li className="wscarticon clearfix">
                    <a className="btn btn-theme text-white btn-md radius" href={siteSettings.demo_login_url} target="_blank" rel="noopener noreferrer">Login</a>
                    <button className="btn btn-theme text-white btn-md radius" data-bs-target="#demoshedule-modal" data-bs-toggle="modal">Schedule a demo</button>
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
                <img alt="Image Not Found" className="wow fadeInDown" data-wow-delay="100ms" src="../assets/images/hrmetrics-building.jpg"/>
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
                <p>HRMetricS is the brainchild of the HRMetricS team.</p>
                <p>Systems Solutions Pvt Ltd is a tech-leading IT consulting and software development company in the Digital Era! We have provisioned our esteemed clients with the Best-Suite Software Solutions. We mainly focus on <strong>HR-MetricS </strong> and <strong>ERP Development </strong> , Implementation, and integration.</p>
                <p>Our journey began out of the passion for a unique monarch in the industry. To save time and money and to free up the platform owners to concentrate on their main offering, we identified the common denominator. Because of this, we have teamed up to create fresh, prosperous businesspeople all over the world!</p>
              
              <div className="grid grid-cols-3 gap-15 text-center" style={{ display: 'flex', gap: '50px' }}>
                  <div>
                      <div className="text-3xl font-bold text-primary">300+</div>
                      <div className="text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                      <div className="text-3xl font-bold text-primary">50+</div>
                      <div className="text-gray-600">Happy Clients</div>
                  </div>
                  <div>
                      <div className="text-3xl font-bold text-primary">100%</div>
                      <div className="text-gray-600">Client Satisfaction</div>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End About */}
            
      {/* Start FAQ Area */}
      <FaqSection className="pt-2" />
      {/* End FAQ Area */}
      
      <div className="dem-section bg-gradientt position-relative py-5">
        <div className="circle-img" style={{backgroundImage:"url('../assets/images/circlbg.png')"}}>
        </div>
        <div className="container">
          <div className="btn-center text-center myflex">
            <h3>Transform Your HR Process: Take the First Step Towards Automation</h3>
            <button className="btn btn-theme btn-md radius scrollToForm animation wow fadeInUp" data-bs-target="#bookdemo-modal" data-bs-toggle="modal" style={{visibility: 'visible', animationName: 'fadeInUp'}}>Book a demo</button>
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
                <p>© Copyright 2026 <a href={siteSettings.company_url} style={{color:'var(--color-primary)',fontWeight:500}} target="_blank" rel="noopener noreferrer">{siteSettings.company_legal_name}</a> All Rights Reserved</p>
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
