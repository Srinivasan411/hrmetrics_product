import React from "react";

function resolveBackgroundImageValue(backgroundImage) {
  const value = String(backgroundImage ?? "").trim();
  if (!value) return undefined;
  if (value.startsWith("url(") || value.includes("gradient(")) return value;
  return `url('${value}')`;
}

export function BannerStyleFourHero({
  backgroundImage = "radial-gradient(1200px circle at 18% 12%, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 55%), linear-gradient(90deg, #14334f 0%, #0e72e4 55%, #26c6c6 100%)",
  children,
  left,
  right,
  leftColClassName = "col-lg-7",
  rightColClassName = "col-lg-5",
  rowClassName = "row align-items-center gy-5",
  className = "",
}) {
  const content = children ? (
    children
  ) : (
    <div className={rowClassName}>
      <div className={leftColClassName}>{left}</div>
      <div className={rightColClassName}>{right}</div>
    </div>
  );

  return (
    <div
      className={`banner-style-four-area bg-cover hrmetrics-hero ${className}`.trim()}
      // style={{ backgroundImage: resolveBackgroundImageValue(backgroundImage) }}
    >
      <div className="hrmetrics-hero__overlay" aria-hidden="true" />

      <span className="it-up-ft-shape2 position-absolute">
        <img alt="" src="/assets/images/b-shape3.png" />
      </span>
      <div className="hrms-banner-shape">
        <img alt="image" src="/assets/images/triangle-shape.png" />
      </div>
      <div className="banner-shape-1">
        <img alt="Shape" src="/assets/images/bg22.png" />
      </div>
      <div className="bg-animation">
        <img alt="" className="zoom-fade" src="/assets/images/patten1.png" />
      </div>

      <div className="container">
        {content}
      </div>
    </div>
  );
}
