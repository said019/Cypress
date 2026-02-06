/**
 * Ejercicio 04: Patrones de Validación de UI (TypeScript)
 * 
 * Objetivo: Implementar validaciones robustas del estado de la UI
 * 
 * Conceptos: Visibility, Text, Attributes, Count, State
 */

import { expect, Page } from '@playwright/test';

// Visibility Checks
async function assertVisible(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeVisible();
}

async function assertHidden(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeHidden();
}

// Text Validation
async function assertHasText(page: Page, selector: string, text: string): Promise<void> {
  await expect(page.locator(selector)).toHaveText(text);
}

async function assertContainsText(page: Page, selector: string, text: string): Promise<void> {
  await expect(page.locator(selector)).toContainText(text);
}

// Attribute Assertions
async function assertHasAttribute(page: Page, selector: string, attribute: string, value: string): Promise<void> {
  await expect(page.locator(selector)).toHaveAttribute(attribute, value);
}

async function assertHasClass(page: Page, selector: string, className: string): Promise<void> {
  await expect(page.locator(selector)).toHaveClass(new RegExp(className));
}

// Count Verification
async function assertCount(page: Page, selector: string, count: number): Promise<void> {
  await expect(page.locator(selector)).toHaveCount(count);
}

// State Assertions
async function assertEnabled(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeEnabled();
}

async function assertDisabled(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeDisabled();
}

async function assertChecked(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).toBeChecked();
}

async function assertNotChecked(page: Page, selector: string): Promise<void> {
  await expect(page.locator(selector)).not.toBeChecked();
}

// Value Assertions
async function assertValue(page: Page, selector: string, value: string): Promise<void> {
  await expect(page.locator(selector)).toHaveValue(value);
}

// URL Assertions
async function assertURL(page: Page, url: string): Promise<void> {
  await expect(page).toHaveURL(url);
}

async function assertTitle(page: Page, title: string): Promise<void> {
  await expect(page).toHaveTitle(title);
}

export {
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
