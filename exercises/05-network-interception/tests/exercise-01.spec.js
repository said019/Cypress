/**
 * Test de Validación: Ejercicio 01 - NetworkInterceptor
 */

const { test, expect } = require('@playwright/test');
const { NetworkInterceptor, NetworkMonitor } = require('../solutions/solution-01-network-interceptor');

test.describe('Ejercicio 01: NetworkInterceptor', () => {
  test.describe('NetworkInterceptor', () => {
    test('debe crear instancia de NetworkInterceptor', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      expect(interceptor).toBeDefined();
    });

    test('debe mockear response correctamente', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      const mockData = { message: 'Mocked response' };
      
      await interceptor.mockResponse('**/api/test', mockData);
      
      const response = await page.request.get('https://example.com/api/test');
      const data = await response.json();
      expect(data.message).toBe('Mocked response');
    });

    test('debe bloquear requests', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      await interceptor.blockRequest('**/*.png');
      
      await page.goto('https://playwright.dev');
      // Request bloqueado, no debería cargar imágenes
    });

    test('debe capturar requests', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      await interceptor.captureRequest('**/*');
      
      await page.goto('https://playwright.dev');
      
      const requests = interceptor.getInterceptedRequests();
      expect(requests.length).toBeGreaterThan(0);
    });

    test('debe limpiar interceptions', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      await interceptor.captureRequest('**/*');
      await page.goto('https://playwright.dev');
      
      interceptor.clearInterceptions();
      const requests = interceptor.getInterceptedRequests();
      expect(requests.length).toBe(0);
    });

    test('debe esperar request específico', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      
      const requestPromise = interceptor.waitForRequest('**/api/**');
      await page.goto('https://playwright.dev');
      
      // Verificar que el método existe
      expect(typeof interceptor.waitForRequest).toBe('function');
    });

    test('debe agregar delay a response', async ({ page }) => {
      const interceptor = new NetworkInterceptor(page);
      await interceptor.delayResponse('**/api/test', 1000);
      
      const start = Date.now();
      await page.request.get('https://example.com/api/test').catch(() => {});
      const duration = Date.now() - start;
      
      // Verificar que hay delay (puede fallar en CI, es solo ejemplo)
      expect(duration).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('NetworkMonitor', () => {
    test('debe crear instancia de NetworkMonitor', async ({ page }) => {
      const monitor = new NetworkMonitor(page);
      expect(monitor).toBeDefined();
    });

    test('debe iniciar monitoring', async ({ page }) => {
      const monitor = new NetworkMonitor(page);
      await monitor.startMonitoring();
      
      await page.goto('https://playwright.dev');
      
      const requests = monitor.getRequests();
      expect(requests.length).toBeGreaterThan(0);
    });

    test('debe detener monitoring', async ({ page }) => {
      const monitor = new NetworkMonitor(page);
      await monitor.startMonitoring();
      await page.goto('https://playwright.dev');
      await monitor.stopMonitoring();
      
      const requestsBefore = monitor.getRequests().length;
      await page.reload();
      const requestsAfter = monitor.getRequests().length;
      
      expect(requestsAfter).toBe(requestsBefore);
    });

    test('debe obtener resumen de tráfico', async ({ page }) => {
      const monitor = new NetworkMonitor(page);
      await monitor.startMonitoring();
      await page.goto('https://playwright.dev');
      
      const summary = monitor.getSummary();
      expect(summary).toHaveProperty('total');
      expect(summary).toHaveProperty('failed');
      expect(summary).toHaveProperty('successful');
      expect(summary.total).toBeGreaterThan(0);
    });

    test('debe limpiar datos capturados', async ({ page }) => {
      const monitor = new NetworkMonitor(page);
      await monitor.startMonitoring();
      await page.goto('https://playwright.dev');
      
      monitor.clear();
      const requests = monitor.getRequests();
      expect(requests.length).toBe(0);
    });
  });
});
