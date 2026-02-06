/**
 * Test de Validación: Ejercicio 01 - Estrategias de Locators
 * 
 * Este test valida que las funciones del ejercicio 01 funcionan correctamente
 */

const { test, expect } = require('@playwright/test');
const locators = require('../solutions/solution-01-locators');

test.describe('Ejercicio 01: Estrategias de Locators', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a una página de prueba
    await page.goto('https://the-internet.herokuapp.com/');
  });

  test('debe localizar elementos por diferentes estrategias', async ({ page }) => {
    // Verificar que las funciones retornan locators válidos
    const byText = await locators.locateByText(page, 'A/B Testing');
    expect(await byText.count()).toBeGreaterThan(0);
    
    const byRole = await locators.locateByRole(page, 'link');
    expect(await byRole.count()).toBeGreaterThan(0);
  });

  test('debe contar elementos correctamente', async ({ page }) => {
    const count = await locators.countElements(page, 'a');
    expect(count).toBeGreaterThan(0);
  });

  test('debe verificar existencia de elementos', async ({ page }) => {
    const exists = await locators.elementExists(page, 'h1');
    expect(exists).toBeTruthy();
    
    const notExists = await locators.elementExists(page, '.elemento-inexistente');
    expect(notExists).toBeFalsy();
  });

  test('debe obtener primer y último elemento', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    
    if (count > 0) {
      const first = await locators.locateFirst(page, 'a');
      expect(await first.count()).toBe(1);
      
      const last = await locators.locateLast(page, 'a');
      expect(await last.count()).toBe(1);
    }
  });

  test('debe localizar elementos por posición', async ({ page }) => {
    const links = page.locator('a');
    const count = await links.count();
    
    if (count > 1) {
      const second = await locators.locateByPosition(page, 'a', 1);
      expect(await second.count()).toBe(1);
    }
  });
});

test.describe('Validación de Locators en ClientApp', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navegar a la aplicación de e-commerce
    await page.goto('https://rahulshettyacademy.com/client');
  });

  test('debe localizar elementos de login', async ({ page }) => {
    // Verificar que podemos localizar elementos de la página de login
    const emailInput = await locators.locateById(page, 'userEmail');
    expect(await emailInput.count()).toBe(1);
    
    const passwordInput = await locators.locateById(page, 'userPassword');
    expect(await passwordInput.count()).toBe(1);
    
    const loginButton = await locators.locateById(page, 'login');
    expect(await loginButton.count()).toBe(1);
  });

  test('debe localizar botones por rol', async ({ page }) => {
    const buttons = await locators.locateByRole(page, 'button');
    expect(await buttons.count()).toBeGreaterThan(0);
  });

  test('debe localizar links por texto', async ({ page }) => {
    const registerLink = await locators.locateByText(page, 'Register');
    expect(await registerLink.count()).toBeGreaterThan(0);
  });
});

console.log('✓ Tests de validación para Ejercicio 01 configurados');
