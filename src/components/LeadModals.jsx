import { useState } from "react";

const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "yopmail.com",
]);

function isOfficialEmail(email) {
  const normalized = String(email ?? "").trim().toLowerCase();
  const domain = normalized.split("@")[1] ?? "";
  if (!domain) return false;
  return !FREE_EMAIL_DOMAINS.has(domain);
}

async function postUrlEncoded({ endpoint, formEl, signal }) {
  const formData = new FormData(formEl);
  const body = new URLSearchParams();
  for (const [key, value] of formData.entries()) {
    body.append(key, String(value));
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: body.toString(),
    signal,
  });

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.message || "Unable to submit right now. Please try again.");
  }

  return payload;
}

function SubmitAlert({ variant, message }) {
  if (!message) return null;
  const klass = variant === "success" ? "alert alert-success" : "alert alert-danger";
  const role = variant === "success" ? "status" : "alert";
  return (
    <div className={`${klass} mt-3 mb-0 py-2`} role={role}>
      {message}
    </div>
  );
}

export function BookDemoForm({ formId = "bookdemo-inline" }) {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setSubmitError("");

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = String(formData.get("email") ?? "").trim();

    if (!isOfficialEmail(email)) {
      setSubmitError("Please enter your official (work) email address.");
      setSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const payload = await postUrlEncoded({ endpoint: "/sendMail.php", formEl, signal: controller.signal });
      setMessage(payload.message || "Submitted successfully.");
      formEl.reset();
    } catch (err) {
      const errorMessage = err?.name === "AbortError" ? "Request timed out. Please try again." : err?.message || "Request failed.";
      setSubmitError(errorMessage);
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <form action="sendMail.php" id={formId} method="POST" onSubmit={handleSubmit}>
      <input className="d-none" name="website" tabIndex={-1} autoComplete="off" />

      <div className="mb-3">
        <input className="form-control" name="name" placeholder="Name*" required type="text" />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="company"
          pattern="^(?!.*@).*"
          placeholder="Company*"
          required
          title="Please enter a valid company name, not an email address."
          type="text"
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          name="email"
          pattern="^[a-zA-Z0-9._%+-]+@(?!gmail\\.com$|yahoo\\.com$|hotmail\\.com$|outlook\\.com$).+$"
          placeholder="Official Email ID*"
          required
          title="Please enter your official (work) email address"
          type="email"
        />
      </div>
      <div className="mb-3 input-group">
        <input className="form-control" maxLength={10} minLength={10} name="phone" placeholder="Phone*" required type="tel" inputMode="numeric" />
      </div>
      <div className="mb-3">
        <select className="form-select" name="employees" required defaultValue="">
          <option value="">No. of Employees*</option>
          <option value="1-10">1-10</option>
          <option value="11-50">11-50</option>
          <option value="51-200">51-200</option>
          <option value="201-500">201-500</option>
          <option value="500+">500+</option>
        </select>
      </div>
      <button className="btn btn-orange w-100" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Submit"
        )}
      </button>

      <SubmitAlert variant="success" message={message} />
      <SubmitAlert variant="error" message={submitError} />
    </form>
  );
}

export function ScheduleDemoForm({ formId = "sheduledemo-modal" }) {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setMessage("");
    setSubmitError("");

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    const email = String(formData.get("email") ?? "").trim();

    if (!isOfficialEmail(email)) {
      setSubmitError("Please enter your official (work) email address.");
      setSubmitting(false);
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      const payload = await postUrlEncoded({ endpoint: "/api/schedule-mail", formEl, signal: controller.signal });
      setMessage(payload.message || "Submitted successfully.");
      formEl.reset();
    } catch (err) {
      const errorMessage = err?.name === "AbortError" ? "Request timed out. Please try again." : err?.message || "Request failed.";
      setSubmitError(errorMessage);
    } finally {
      clearTimeout(timeout);
      setSubmitting(false);
    }
  }

  return (
    <form action="sheduleMail.php" id={formId} method="POST" onSubmit={handleSubmit}>
      <input className="d-none" name="website" tabIndex={-1} autoComplete="off" />

      <div className="row g-2">
        <div className="col-md-4">
          <label className="form-label" htmlFor={`${formId}-name`}>
            Name *
          </label>
          <input className="form-control" id={`${formId}-name`} name="name" required type="text" />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor={`${formId}-email`}>
            Official Email *
          </label>
          <input
            className="form-control"
            id={`${formId}-email`}
            name="email"
            pattern="^[a-zA-Z0-9._%+-]+@(?!gmail\\.com$|yahoo\\.com$|hotmail\\.com$|outlook\\.com$).+$"
            required
            title="Please enter your official (work) email address"
            type="email"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label" htmlFor={`${formId}-phone`}>
            Phone Number *
          </label>
          <input className="form-control" id={`${formId}-phone`} maxLength={10} minLength={10} name="phone" required type="tel" inputMode="numeric" />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor={`${formId}-company`}>
            Organization Name *
          </label>
          <input className="form-control" id={`${formId}-company`} name="company" required type="text" />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor={`${formId}-employees`}>
            No. of Employees *
          </label>
          <select className="form-select" id={`${formId}-employees`} name="employees" required defaultValue="">
            <option value="">Select</option>
            <option value="1-10">1-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="500+">500+</option>
          </select>
        </div>

        <div className="col-md-5">
          <div className="mb-3 mt-3">
            <label className="form-label fw-bold">Interested Application *</label>
            {[
              ["HRM Solution", "hrmSolution", "HRM Solution"],
              ["Attendance & Payroll", "attendancePayroll", "Attendance & Payroll"],
              ["Activity Management", "activityManagement", "Activity Management"],
              ["Task Management", "taskManagement", "Task Management"],
              ["Asset Management", "assetManagement", "Asset Management"],
              ["Field Force Management", "fieldForceManagement", "Field Force Management"],
            ].map(([label, id, value]) => (
              <div key={id} className="form-check">
                <input className="form-check-input" id={`${formId}-${id}`} name="interested_modules[]" type="checkbox" defaultValue={value} />
                <label className="form-check-label" htmlFor={`${formId}-${id}`}>
                  {label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-7">
          <label className="form-label" htmlFor={`${formId}-challenges`}>
            Current Challenges / Requirements
          </label>
          <textarea className="form-control" id={`${formId}-challenges`} name="challenges" rows={8} />
        </div>
      </div>

      <button className="btn btn-orange w-100 mt-3" type="submit" disabled={submitting}>
        {submitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            Submitting...
          </>
        ) : (
          "Schedule a Free Demo"
        )}
      </button>

      <SubmitAlert variant="success" message={message} />
      <SubmitAlert variant="error" message={submitError} />
    </form>
  );
}

export function TryForFreeCard({ formId = "bookdemo-inline", title = "Try HRMetricS For Free!" }) {
  return (
    <div className="form-container">
      <h4 className="mb-4 text-danger fw-bold">{title}</h4>
      <BookDemoForm formId={formId} />
    </div>
  );
}

export function LeadModals() {
  return (
    <>
      <div aria-hidden="true" aria-labelledby="bookdemo-modal-title" className="modal fade" id="bookdemo-modal" tabIndex={-1}>
        <div className="modal-dialog modal-md">
          <div className="modal-content">
            <div className="modal-header">
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button" />
            </div>
            <div className="modal-body">
              <div className="form-container">
                <h4 className="mb-4 text-danger fw-bold" id="bookdemo-modal-title">
                  Try HRMetricS For Free!
                </h4>
                <BookDemoForm formId="bookdemo-modal-form" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div aria-hidden="true" aria-labelledby="demoshedule-modal-title" className="modal fade" id="demoshedule-modal" tabIndex={-1}>
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="mb-0 text-danger modal-title fw-bold" id="demoshedule-modal-title">
                Hire to Retire Solution Demonstration!
              </h4>
              <button aria-label="Close" className="btn-close" data-bs-dismiss="modal" type="button" />
            </div>
            <div className="modal-body">
              <div className="form-container shedileform p-3" style={{ textAlign: "left" }}>
                <ScheduleDemoForm formId="sheduledemo-modal-form" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
