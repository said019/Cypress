/**
 * Test de Validación: Ejercicio 03 - Hybrid UI+API Testing
 */

const { test, expect } = require('@playwright/test');
const { HybridTestHelper } = require('../solutions/solution-03-hybrid-testing');

test.describe('Ejercicio 03: Hybrid UI+API Testing', () => {
  let helper;

  test.beforeEach(async ({ page }) => {
    helper = new HybridTestHelper(page, 'https://example.com');
  });

  test('debe crear instancia de HybridTestHelper', ({ page }) => {
    expect(helper).toBeDefined();
    expect(helper.page).toBe(page);
    expect(helper.baseURL).toBe('https://example.com');
  });

  test('debe tener método loginViaAPI', () => {
    expect(typeof helper.loginViaAPI).toBe('function');
  });

  test('debe tener método setAuthCookie', () => {
    expect(typeof helper.setAuthCookie).toBe('function');
  });

  test('debe tener método createProductViaAPI', () => {
    expect(typeof helper.createProductViaAPI).toBe('function');
  });

  test('debe tener método verifyProductInUI', () => {
    expect(typeof helper.verifyProductInUI).toBe('function');
  });

  test('debe tener método createOrderViaAPI', () => {
    expect(typeof helper.createOrderViaAPI).toBe('function');
  });

  test('debe tener método verifyOrderInUI', () => {
    expect(typeof helper.verifyOrderInUI).toBe('function');
  });

  test('debe tener método deleteOrderViaAPI', () => {
    expect(typeof helper.deleteOrderViaAPI).toBe('function');
  });

  test('debe tener método setupTestData', () => {
    expect(typeof helper.setupTestData).toBe('function');
  });

  test('debe tener método cleanupTestData', () => {
    expect(typeof helper.cleanupTestData).toBe('function');
  });

  test('debe tener método interceptAPICall', () => {
    expect(typeof helper.interceptAPICall).toBe('function');
  });

  test('debe tener método waitForAPIResponse', () => {
    expect(typeof helper.waitForAPIResponse).toBe('function');
  });

  test('debe tener método validateAPIResponse', () => {
    expect(typeof helper.validateAPIResponse).toBe('function');
  });

  test('debe tener método getSessionCookies', () => {
    expect(typeof helper.getSessionCookies).toBe('function');
  });

  test('debe tener método restoreSession', () => {
    expect(typeof helper.restoreSession).toBe('function');
  });

  test('debe tener método performUIAction', () => {
    expect(typeof helper.performUIAction).toBe('function');
  });

  test('debe validar schema correctamente', async () => {
    const response = { id: 1, name: 'Test', price: 100 };
    const schema = { id: 'number', name: 'string', price: 'number' };
    const isValid = await helper.validateAPIResponse(response, schema);
    expect(isValid).toBe(true);
  });

  test('debe fallar validación con schema incorrecto', async () => {
    const response = { id: '1', name: 'Test' };
    const schema = { id: 'number', name: 'string', price: 'number' };
    const isValid = await helper.validateAPIResponse(response, schema);
    expect(isValid).toBe(false);
  });

  test('debe obtener cookies de sesión', async ({ page }) => {
    await page.context().addCookies([{
      name: 'test_cookie',
      value: 'test_value',
      domain: 'example.com',
      path: '/'
    }]);
    const cookies = await helper.getSessionCookies();
    expect(cookies).toBeDefined();
    expect(Array.isArray(cookies)).toBe(true);
  });
});
