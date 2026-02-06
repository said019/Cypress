/**
 * Test de Validación: Ejercicio 01 - BasePage Abstract Class
 */

const { test, expect } = require('@playwright/test');
const { BasePage } = require('../solutions/solution-01-base-page');

// Crear una clase concreta para testing
class TestPage extends BasePage {
  async isLoaded() {
    return await this.isElementVisible('body');
  }
}

test.describe('Ejercicio 01: BasePage Abstract Class', () => {
  let basePage;

  test.beforeEach(async ({ page }) => {
    basePage = new TestPage(page);
    await page.goto('https://playwright.dev');
  });

  test('debe crear instancia de BasePage', ({ page }) => {
    expect(basePage).toBeDefined();
    expect(basePage.page).toBe(page);
    expect(basePage.timeout).toBe(30000);
  });

  test('debe obtener título de la página', async () => {
    const title = await basePage.getTitle();
    expect(title).toBeTruthy();
    expect(typeof title).toBe('string');
  });

  test('debe obtener URL actual', async () => {
    const url = await basePage.getURL();
    expect(url).toContain('playwright.dev');
  });

  test('debe verificar si elemento es visible', async () => {
    const isVisible = await basePage.isElementVisible('body');
    expect(isVisible).toBe(true);
  });

  test('debe verificar si elemento no visible retorna false', async () => {
    const isVisible = await basePage.isElementVisible('#non-existent-element-xyz');
    expect(isVisible).toBe(false);
  });

  test('debe obtener texto de elemento', async () => {
    const text = await basePage.getText('h1');
    expect(text).toBeTruthy();
  });

  test('debe esperar elemento visible', async () => {
    const element = await basePage.waitForElement('h1');
    expect(element).toBeDefined();
  });

  test('debe hacer click seguro en elemento', async () => {
    await expect(async () => {
      await basePage.safeClick('a[href="/docs/intro"]');
    }).not.toThrow();
  });

  test('debe navegar a URL', async () => {
    await basePage.navigate('https://playwright.dev/docs/intro');
    const url = await basePage.getURL();
    expect(url).toContain('/docs/intro');
  });

  test('debe recargar página', async () => {
    const urlBefore = await basePage.getURL();
    await basePage.reload();
    const urlAfter = await basePage.getURL();
    expect(urlAfter).toBe(urlBefore);
  });

  test('debe verificar que isLoaded está implementado', async () => {
    const loaded = await basePage.isLoaded();
    expect(typeof loaded).toBe('boolean');
  });

  test('debe lanzar error si isLoaded no está implementado', async ({ page }) => {
    const abstractPage = new BasePage(page);
    await expect(abstractPage.isLoaded()).rejects.toThrow('must be implemented by subclass');
  });

  test('debe hacer scroll a elemento', async () => {
    await expect(async () => {
      await basePage.scrollToElement('footer');
    }).not.toThrow();
  });

  test('debe verificar si elemento está habilitado', async () => {
    const isEnabled = await basePage.isElementEnabled('a');
    expect(typeof isEnabled).toBe('boolean');
  });

  test('debe obtener atributo de elemento', async () => {
    const href = await basePage.getAttribute('a', 'href');
    expect(href).toBeTruthy();
  });

  test('debe esperar y hacer click', async () => {
    await expect(async () => {
      await basePage.waitAndClick('a[href="/docs/intro"]');
    }).not.toThrow();
  });
});
