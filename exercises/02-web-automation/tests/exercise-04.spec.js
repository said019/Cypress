/**
 * Test de Validación: Ejercicio 04 - Validaciones de UI
 */

const { test, expect } = require('@playwright/test');
const validations = require('../solutions/solution-04-validations');

test.describe('Ejercicio 04: Validaciones de UI', () => {
  
  test('debe validar visibilidad', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await validations.assertVisible(page, 'h1');
    await validations.assertHasText(page, 'h1', 'Welcome to the-internet');
  });

  test('debe validar atributos', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    await validations.assertHasAttribute(page, 'a[href="/abtest"]', 'href', '/abtest');
  });

  test('debe contar elementos', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/');
    const links = page.locator('a');
    const count = await links.count();
    await validations.assertCount(page, 'a', count);
  });
});

console.log('✓ Tests de validación para Ejercicio 04 configurados');
