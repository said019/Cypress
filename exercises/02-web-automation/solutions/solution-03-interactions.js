/**
 * Ejercicio 03: Interacciones Avanzadas (JavaScript)
 * 
 * Objetivo: Implementar interacciones complejas con elementos de la página
 * 
 * Conceptos: Hover, Drag-and-drop, Keyboard, Frames, Windows, Dialogs
 */

const { test, expect } = require('@playwright/test');

// Hover Actions
async function hoverElement(page, selector) {
  await page.locator(selector).hover();
}

async function hoverAndClick(page, hoverSelector, clickSelector) {
  await page.locator(hoverSelector).hover();
  await page.locator(clickSelector).click();
}

// Drag and Drop
async function dragAndDrop(page, sourceSelector, targetSelector) {
  await page.locator(sourceSelector).dragTo(page.locator(targetSelector));
}

// Keyboard Interactions
async function pressKey(page, key) {
  await page.keyboard.press(key);
}

async function typeText(page, selector, text) {
  await page.locator(selector).type(text);
}

async function pressKeyboardShortcut(page, modifiers, key) {
  await page.keyboard.press(`${modifiers}+${key}`);
}

// Mouse Events
async function doubleClick(page, selector) {
  await page.locator(selector).dblclick();
}

async function rightClick(page, selector) {
  await page.locator(selector).click({ button: 'right' });
}

// Frame Handling
async function switchToFrame(page, frameSelector) {
  return page.frameLocator(frameSelector);
}

async function getFrameByName(page, frameName) {
  return page.frame({ name: frameName });
}

// Window Management
async function openNewTab(page, url) {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click(`a[href="${url}"]`)
  ]);
  return newPage;
}

async function switchToWindow(context, index) {
  const pages = context.pages();
  return pages[index];
}

// Dialog Handling
async function acceptDialog(page) {
  page.once('dialog', dialog => dialog.accept());
}

async function dismissDialog(page) {
  page.once('dialog', dialog => dialog.dismiss());
}

async function getDialogMessage(page) {
  return new Promise(resolve => {
    page.once('dialog', dialog => {
      resolve(dialog.message());
      dialog.dismiss();
    });
  });
}

module.exports = {
  hoverElement,
  hoverAndClick,
  dragAndDrop,
  pressKey,
  typeText,
  pressKeyboardShortcut,
  doubleClick,
  rightClick,
  switchToFrame,
  getFrameByName,
  openNewTab,
  switchToWindow,
  acceptDialog,
  dismissDialog,
  getDialogMessage
};
