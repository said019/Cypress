/**
 * Test de Validación: Ejercicio 03 - Interacciones Avanzadas
 */

const { test, expect } = require('@playwright/test');
const interactions = require('../solutions/solution-03-interactions');

test.describe('Ejercicio 03: Interacciones Avanzadas', () => {
  
  test('debe realizar hover', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    await interactions.hoverElement(page, '.figure');
    await expect(page.locator('.figcaption')).toBeVisible();
  });

  test('debe manejar keyboard', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/key_presses');
    await interactions.pressKey(page, 'Enter');
    await expect(page.locator('#result')).toContainText('ENTER');
  });

  test('debe manejar dialogs', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
    interactions.acceptDialog(page);
    await page.click('button[onclick="jsAlert()"]');
    await expect(page.locator('#result')).toContainText('successfully');
  });
});

console.log('✓ Tests de validación para Ejercicio 03 configurados');
