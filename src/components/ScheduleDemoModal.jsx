import { useState } from 'react';

export default function ScheduleDemoModal() {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(event.target);
    formData.append("access_key", "30467f29-d9f7-4264-8adf-537588e8c702");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      setResult(data.success ? "Thank you! Your demo request has been submitted successfully." : (data.message || "Error submitting form. Please try again."));
      
      if (data.success) {
        event.target.reset();
        setTimeout(() => {
          // Close the modal after success
          const modal = document.querySelector('#demoshedule-modal');
          if (modal) {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            if (modalInstance) modalInstance.hide();
          }
        }, 2000);
      }
    } catch (error) {
      setResult("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="demoshedule-modal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="demoshedule-modal-label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="demoshedule-modal-label">
              Schedule a Demo
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  name="company"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="employees" className="form-label">
                  Number of Employees
                </label>
                <select className="form-select" id="employees" name="employees">
                  <option value="">Select range</option>
                  <option value="1-50">1-50</option>
                  <option value="51-200">51-200</option>
                  <option value="201-500">201-500</option>
                  <option value="501-1000">501-1000</option>
                  <option value="1000+">1000+</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  name="message"
                  rows="3"
                  placeholder="Tell us about your requirements..."
                />
              </div>
              <button
                type="submit"
                className="btn btn-hrms-primary w-100"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Schedule Demo"}
              </button>
              {result && (
                <p
                  className={`mt-3 ${
                    result.includes("Success") || result.includes("Thank you")
                      ? "text-success"
                      : "text-danger"
                  }`}
                >
                  {result}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}