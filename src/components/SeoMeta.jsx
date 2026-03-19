import { useEffect } from "react";

function upsertMeta(attrName, attrValue, content) {
  if (typeof document === "undefined") return;

  let element = document.head.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel, href) {
  if (typeof document === "undefined") return;

  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function SeoMeta({
  title,
  description,
  canonicalUrl,
  image,
  robots = "index,follow",
  type = "website",
  keywords = "HRMS software, HR software India, payroll software, attendance management, employee management, HRMetricS",
}) {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      upsertMeta("name", "description", description);
      upsertMeta("property", "og:description", description);
      upsertMeta("name", "twitter:description", description);
    }

    upsertMeta("name", "keywords", keywords);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:site_name", "HRMetricS");
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:image", image);
    upsertLink("canonical", canonicalUrl);
  }, [canonicalUrl, description, image, keywords, robots, title, type]);

  return null;
}
