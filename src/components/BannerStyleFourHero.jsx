import React from "react";
import "./BannerStyleFourHero.css";

export function BannerStyleFourHero({
  badgeText,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className = "",
}) {
  return (
    <div className={`banner-style-four-area hrmetrics-hero ${className}`.trim()}>
      <div className="hrms-shape-left" />
      <div className="hrms-shape-right" />
      <div className="container">
        <div className="hrms-hero-content">
          {badgeText && (
            <div className="hrms-pill-badge wow fadeInUp">
              <div className="hrms-pill-dot" />
              <span className="hrms-pill-text">{badgeText}</span>
            </div>
          )}
          
          {title && (
            <h1 className="hrms-hero-title wow fadeInUp" data-wow-delay="200ms">
              {title}
            </h1>
          )}
          
          {description && (
            <p className="hrms-hero-description wow fadeInUp" data-wow-delay="400ms">
              {description}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="hrms-hero-actions wow fadeInUp" data-wow-delay="600ms">
              {primaryAction}
              {secondaryAction}
            </div>
          )}

          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    </div>
  );
}
