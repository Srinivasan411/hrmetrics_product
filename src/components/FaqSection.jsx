import React from 'react';

const defaultFaqs = [
  {
    question: "Is HRMetricS suitable for small businesses and large enterprises alike?",
    answer: "Yes, HRMetricS is designed to cater to the needs of businesses of all sizes. It can be easily customized and scaled to fit the requirements of small startups, medium-sized companies, and large enterprises."
  },
  {
    question: "How user-friendly is HRMetricS?",
    answer: "HRMetricS boasts an intuitive user interface that requires minimal training for users to navigate and operate. Its user-friendly design ensures a smooth onboarding process and allows HR professionals and employees to adapt quickly to the system."
  },
  {
    question: "Does HRMetricS comply with data security standards?",
    answer: "Absolutely. HRMetricS prioritizes data security and confidentiality. It adheres to industry best practices and complies with data protection regulations to safeguard sensitive employee information."
  },
  {
    question: "How does HRMetricS help with employee engagement?",
    answer: "HRMetricS includes features like employee self-service portals, performance feedback mechanisms, and recognition programs that promote a positive employee experience and foster higher levels of engagement within the workforce."
  },
  {
    question: "How can I get started with HRMetricS for my organization?",
    answer: "To get started with HRMetricS, you can request a demo or contact our sales team. They will guide you through the process of implementing HRMetricS to transform your HR operations and elevate your organizational efficiency."
  },
  {
    question: "What additional solutions does HRMetricS offer?",
    answer: "In addition to its core services, HRMetricS provides solutions for Activity Management, Task Management, Asset Management, and Field Force Management."
  }
];

export default function FaqSection({ items = defaultFaqs, subHeading = "Faq", heading = "Frequently Asked Questions", className = "", bgCover = false }) {
  return (
    <section className={`faq-area default-padding${bgCover ? " bg-cover" : ""}${className ? ` ${className}` : ""}`}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="site-heading mb-3 text-center">
              <h4 className="sub-title">{subHeading}</h4>
              <h2 className="title split-text">{heading}</h2>
              <div className="devider" />
            </div>
          </div>
        </div>
        <div className="faq-accordion-content">
          <ul className="accordion">
            {items.map((faq, index) => (
              <li className="accordion-item" key={index}>
                <a
                  className={`accordion-title${index === 0 ? " active" : ""}`}
                  href="javascript:void(0)"
                >
                  <i className="fa fa-chevron-down" /> {faq.question}
                </a>
                <p className={`accordion-content${index === 0 ? " show" : ""}`}>{faq.answer}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
