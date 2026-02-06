/**
 * Test de Validación: Ejercicio 02 - PageFragment Components
 */

const { test, expect } = require('@playwright/test');
const {
  HeaderFragment,
  FooterFragment,
  SearchBoxFragment,
  NavigationMenuFragment
} = require('../solutions/solution-02-page-fragments');

test.describe('Ejercicio 02: PageFragment Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev');
  });

  test.describe('HeaderFragment', () => {
    test('debe crear instancia de HeaderFragment', async ({ page }) => {
      const header = new HeaderFragment(page);
      expect(header).toBeDefined();
    });

    test('debe verificar visibilidad del header', async ({ page }) => {
      const header = new HeaderFragment(page);
      const isVisible = await header.isVisible();
      expect(isVisible).toBe(true);
    });

    test('debe obtener navigation links', async ({ page }) => {
      const header = new HeaderFragment(page, 'nav');
      const links = await header.getNavigationLinks();
      expect(Array.isArray(links)).toBe(true);
      expect(links.length).toBeGreaterThan(0);
    });
  });

  test.describe('FooterFragment', () => {
    test('debe crear instancia de FooterFragment', async ({ page }) => {
      const footer = new FooterFragment(page);
      expect(footer).toBeDefined();
    });

    test('debe verificar visibilidad del footer', async ({ page }) => {
      const footer = new FooterFragment(page);
      const isVisible = await footer.isVisible();
      expect(typeof isVisible).toBe('boolean');
    });

    test('debe obtener footer links', async ({ page }) => {
      const footer = new FooterFragment(page);
      const links = await footer.getFooterLinks();
      expect(Array.isArray(links)).toBe(true);
    });
  });

  test.describe('SearchBoxFragment', () => {
    test('debe crear instancia de SearchBoxFragment', async ({ page }) => {
      const searchBox = new SearchBoxFragment(page, '[aria-label="Search"]');
      expect(searchBox).toBeDefined();
    });

    test('debe tener método search', async ({ page }) => {
      const searchBox = new SearchBoxFragment(page, '[aria-label="Search"]');
      expect(typeof searchBox.search).toBe('function');
    });

    test('debe tener método getSearchInput', async ({ page }) => {
      const searchBox = new SearchBoxFragment(page, '[aria-label="Search"]');
      expect(typeof searchBox.getSearchInput).toBe('function');
    });
  });

  test.describe('NavigationMenuFragment', () => {
    test('debe crear instancia de NavigationMenuFragment', async ({ page }) => {
      const nav = new NavigationMenuFragment(page);
      expect(nav).toBeDefined();
    });

    test('debe verificar visibilidad del nav', async ({ page }) => {
      const nav = new NavigationMenuFragment(page);
      const isVisible = await nav.isVisible();
      expect(typeof isVisible).toBe('boolean');
    });

    test('debe obtener menu items', async ({ page }) => {
      const nav = new NavigationMenuFragment(page);
      const items = await nav.getMenuItems();
      expect(Array.isArray(items)).toBe(true);
    });
  });
});
