/**
 * Ejercicio 04: Patrones de Validación de UI (JavaScript)
 * 
 * Objetivo: Implementar validaciones robustas del estado de la UI
 * 
 * Conceptos: Visibility, Text, Attributes, Count, State
 */

const { expect } = require('@playwright/test');

// Visibility Checks
async function assertVisible(page, selector) {
  await expect(page.locator(selector)).toBeVisible();
}

async function assertHidden(page, selector) {
  await expect(page.locator(selector)).toBeHidden();
}

// Text Validation
async function assertHasText(page, selector, text) {
  await expect(page.locator(selector)).toHaveText(text);
}

async function assertContainsText(page, selector, text) {
  await expect(page.locator(selector)).toContainText(text);
}

// Attribute Assertions
async function assertHasAttribute(page, selector, attribute, value) {
  await expect(page.locator(selector)).toHaveAttribute(attribute, value);
}

async function assertHasClass(page, selector, className) {
  await expect(page.locator(selector)).toHaveClass(new RegExp(className));
}

// Count Verification
async function assertCount(page, selector, count) {
  await expect(page.locator(selector)).toHaveCount(count);
}

// State Assertions
async function assertEnabled(page, selector) {
  await expect(page.locator(selector)).toBeEnabled();
}

async function assertDisabled(page, selector) {
  await expect(page.locator(selector)).toBeDisabled();
}

async function assertChecked(page, selector) {
  await expect(page.locator(selector)).toBeChecked();
}

async function assertNotChecked(page, selector) {
  await expect(page.locator(selector)).not.toBeChecked();
}

// Value Assertions
async function assertValue(page, selector, value) {
  await expect(page.locator(selector)).toHaveValue(value);
}

// URL Assertions
async function assertURL(page, url) {
  await expect(page).toHaveURL(url);
}

async function assertTitle(page, title) {
  await expect(page).toHaveTitle(title);
}

module.exports = {
  assertVisible,
  assertHidden,
  assertHasText,
  assertContainsText,
  assertHasAttribute,
  assertHasClass,
  assertCount,
  assertEnabled,
  assertDisabled,
  assertChecked,
  assertNotChecked,
  assertValue,
  assertURL,
  assertTitle
};
