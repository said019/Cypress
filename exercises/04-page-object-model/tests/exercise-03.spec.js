/**
 * Test de Validación: Ejercicio 03 - Refactoring Page Objects
 */

const { test, expect } = require('@playwright/test');
const { LoginPageRefactored } = require('../solutions/solution-03-login-refactored');
const { DashboardPageRefactored } = require('../solutions/solution-03-dashboard-refactored');

test.describe('Ejercicio 03: Refactored Page Objects', () => {
  test.describe('LoginPageRefactored', () => {
    test('debe heredar de BasePage', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      expect(loginPage).toBeDefined();
      expect(typeof loginPage.safeClick).toBe('function');
      expect(typeof loginPage.safeType).toBe('function');
      expect(typeof loginPage.waitForElement).toBe('function');
    });

    test('debe implementar isLoaded', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      expect(typeof loginPage.isLoaded).toBe('function');
    });

    test('debe tener getters para locators', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      expect(loginPage.usernameInput).toBeDefined();
      expect(loginPage.passwordInput).toBeDefined();
      expect(loginPage.loginButton).toBeDefined();
    });

    test('debe soportar fluent interface', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      await loginPage.goTo();
      const result = await loginPage.login('test@test.com', 'Test123');
      expect(result).toBe(loginPage);
    });

    test('debe navegar a la página de login', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      await loginPage.goTo();
      const url = await loginPage.getURL();
      expect(url).toContain('rahulshettyacademy.com/client');
    });
  });

  test.describe('DashboardPageRefactored', () => {
    test('debe heredar de BasePage', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(dashboardPage).toBeDefined();
      expect(typeof dashboardPage.safeClick).toBe('function');
      expect(typeof dashboardPage.waitForElement).toBe('function');
    });

    test('debe tener HeaderFragment', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(dashboardPage.header).toBeDefined();
      expect(typeof dashboardPage.header.isVisible).toBe('function');
    });

    test('debe implementar isLoaded', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(typeof dashboardPage.isLoaded).toBe('function');
    });

    test('debe tener métodos de búsqueda mejorados', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(typeof dashboardPage.getProducts).toBe('function');
      expect(typeof dashboardPage.searchProduct).toBe('function');
      expect(typeof dashboardPage.hasProduct).toBe('function');
    });

    test('debe soportar fluent interface', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(typeof dashboardPage.addProductToCart).toBe('function');
      expect(typeof dashboardPage.goToCart).toBe('function');
    });

    test('debe tener getters para locators', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(dashboardPage.productsContainer).toBeDefined();
      expect(dashboardPage.productCards).toBeDefined();
      expect(dashboardPage.cartIcon).toBeDefined();
    });
  });

  test.describe('Comparación con versiones originales', () => {
    test('LoginPageRefactored debe tener más métodos que original', async ({ page }) => {
      const loginPage = new LoginPageRefactored(page);
      const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(loginPage));
      expect(methods.length).toBeGreaterThan(10);
    });

    test('DashboardPageRefactored debe tener HeaderFragment', async ({ page }) => {
      const dashboardPage = new DashboardPageRefactored(page);
      expect(dashboardPage.header).toBeDefined();
    });
  });
});
