"use strict";

function escapeHtml(value) {
  const element = document.createElement("div");
  element.textContent = value == null ? "" : String(value);
  return element.innerHTML;
}

function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function isArray(value) {
  return Array.isArray(value);
}

function formatCount(count, singular, plural) {
  const numericCount = Number.isFinite(Number(count)) ? Number(count) : 0;
  const label = numericCount === 1 ? singular : (plural || `${singular}s`);
  return `${numericCount} ${label}`;
}
