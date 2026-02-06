/**
 * Test de Validación: Ejercicio 02 - Elementos Dinámicos
 */

const { test, expect } = require('@playwright/test');
const dynamic = require('../solutions/solution-02-dynamic-elements');

test.describe('Ejercicio 02: Elementos Dinámicos', () => {
  
  test('debe manejar dropdowns nativos', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');
    
    await dynamic.selectDropdownByIndex(page, '#dropdown', 1);
    const value = await dynamic.getSelectedDropdownValue(page, '#dropdown');
    expect(value).toBe('1');
  });

  test('debe manejar checkboxes', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/checkboxes');
    
    const checkbox = 'input[type="checkbox"]';
    await dynamic.checkCheckbox(page, checkbox);
    expect(await dynamic.isCheckboxChecked(page, checkbox)).toBeTruthy();
    
    await dynamic.uncheckCheckbox(page, checkbox);
    expect(await dynamic.isCheckboxChecked(page, checkbox)).toBeFalsy();
  });

  test('debe esperar elementos dinámicos', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dynamic_loading/1');
    
    await page.click('#start button');
    await dynamic.waitForElementVisible(page, '#finish', 10000);
    
    const text = await page.locator('#finish h4').textContent();
    expect(text).toContain('Hello World!');
  });
});

console.log('✓ Tests de validación para Ejercicio 02 configurados');
