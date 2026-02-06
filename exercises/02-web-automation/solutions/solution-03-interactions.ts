/**
 * Ejercicio 03: Interacciones Avanzadas (TypeScript)
 * 
 * Objetivo: Implementar interacciones complejas con elementos de la página
 * 
 * Conceptos: Hover, Drag-and-drop, Keyboard, Frames, Windows, Dialogs
 */

import { Page, BrowserContext, Frame, FrameLocator } from '@playwright/test';

// Hover Actions
async function hoverElement(page: Page, selector: string): Promise<void> {
  await page.locator(selector).hover();
}

async function hoverAndClick(page: Page, hoverSelector: string, clickSelector: string): Promise<void> {
  await page.locator(hoverSelector).hover();
  await page.locator(clickSelector).click();
}

// Drag and Drop
async function dragAndDrop(page: Page, sourceSelector: string, targetSelector: string): Promise<void> {
  await page.locator(sourceSelector).dragTo(page.locator(targetSelector));
}

// Keyboard Interactions
async function pressKey(page: Page, key: string): Promise<void> {
  await page.keyboard.press(key);
}

async function typeText(page: Page, selector: string, text: string): Promise<void> {
  await page.locator(selector).type(text);
}

async function pressKeyboardShortcut(page: Page, modifiers: string, key: string): Promise<void> {
  await page.keyboard.press(`${modifiers}+${key}`);
}

// Mouse Events
async function doubleClick(page: Page, selector: string): Promise<void> {
  await page.locator(selector).dblclick();
}

async function rightClick(page: Page, selector: string): Promise<void> {
  await page.locator(selector).click({ button: 'right' });
}

// Frame Handling
async function switchToFrame(page: Page, frameSelector: string): Promise<FrameLocator> {
  return page.frameLocator(frameSelector);
}

async function getFrameByName(page: Page, frameName: string): Promise<Frame | null> {
  return page.frame({ name: frameName });
}

// Window Management
async function openNewTab(page: Page, url: string): Promise<Page> {
  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    page.click(`a[href="${url}"]`)
  ]);
  return newPage;
}

async function switchToWindow(context: BrowserContext, index: number): Promise<Page> {
  const pages = context.pages();
  return pages[index];
}

// Dialog Handling
async function acceptDialog(page: Page): Promise<void> {
  page.once('dialog', dialog => dialog.accept());
}

async function dismissDialog(page: Page): Promise<void> {
  page.once('dialog', dialog => dialog.dismiss());
}

async function getDialogMessage(page: Page): Promise<string> {
  return new Promise(resolve => {
    page.once('dialog', dialog => {
      resolve(dialog.message());
      dialog.dismiss();
    });
  });
}

export {
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
