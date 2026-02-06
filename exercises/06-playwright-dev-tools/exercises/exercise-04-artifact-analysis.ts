/**
 * Ejercicio 04: Análisis de Artefactos de Tests (TypeScript)
 * 
 * Este ejercicio te enseña a:
 * - Configurar captura de screenshots
 * - Configurar grabación de videos
 * - Generar traces programáticamente
 * - Analizar artefactos de tests fallidos
 * - Capturar logs del navegador
 * 
 * IMPORTANTE: Este ejercicio incluye tests que fallan intencionalmente
 * para generar artefactos que luego analizarás.
 */

import { test, expect, Page, BrowserContext } from '@playwright/test';

// ============================================================================
// TIPOS PERSONALIZADOS
// ============================================================================

interface ConsoleLog {
  type: string;
  text: string;
  location: {
    url: string;
    lineNumber: number;
    columnNumber: number;
  };
}

interface PageError {
  message: string;
  stack?: string;
}

interface FailedRequest {
  url: string;
  method: string;
  failure: string | null;
}

// ============================================================================
// PARTE 1: Configuración de Artefactos
// ============================================================================

/**
 * TODO: Configura playwright.config.ts con estas opciones:
 * 
 * use: {
 *   screenshot: 'only-on-failure',
 *   video: 'retain-on-failure',
 *   trace: 'on-first-retry',
 * }
 */

// ============================================================================
// PARTE 2: Screenshots Manuales
// ============================================================================

test.describe('Screenshots', () => {
  
  test('capturar screenshot de página completa', async ({ page }: { page: Page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // TODO: Captura screenshot de página completa
    // Pista: usa page.screenshot() con fullPage: true
    
    // SOLUCIÓN:
    // await page.screenshot({ 
    //   path: 'test-results/full-page.png', 
    //   fullPage: true 
    // });
  });

  test('capturar screenshot de elemento específico', async ({ page }: { page: Page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    const loginForm = page.locator('.login-wrapper');
    
    // TODO: Captura screenshot solo del formulario de login
    // Pista: usa element.screenshot()
    
    // SOLUCIÓN:
    // await loginForm.screenshot({ 
    //   path: 'test-results/login-form.png' 
    // });
  });

  test('capturar screenshot con máscara', async ({ page }: { page: Page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // TODO: Captura screenshot ocultando datos sensibles
    // Pista: usa mask option con array de locators
    
    // SOLUCIÓN:
    // await page.screenshot({
    //   path: 'test-results/masked.png',
    //   mask: [page.locator('#userEmail'), page.locator('#userPassword')]
    // });
  });

  test('capturar screenshot en diferentes estados', async ({ page }: { page: Page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Screenshot del estado inicial
    await page.screenshot({ path: 'test-results/state-1-initial.png' });
    
    // Llenar formulario
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    
    // TODO: Captura screenshot después de llenar
    // await page.screenshot({ path: 'test-results/state-2-filled.png' });
    
    // Click en login
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // TODO: Captura screenshot después de login
    // await page.screenshot({ path: 'test-results/state-3-logged-in.png' });
  });
});

// ============================================================================
// PARTE 3: Videos
// ============================================================================

test.describe('Videos', () => {
  
  test('video de test exitoso', async ({ page }: { page: Page }) => {
    // Este test se ejecutará y generará video
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // Verificación
    await expect(page).toHaveURL(/client/);
    
    // TODO: Después de ejecutar, encuentra el video en test-results/
    // ¿Dónde está el video? ¿Se guardó o se eliminó?
  });

  test('video de test fallido', async ({ page }: { page: Page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Este test fallará intencionalmente
    await expect(page.locator('#nonExistentElement')).toBeVisible({ timeout: 5000 });
    
    // TODO: Después de ejecutar, encuentra el video
    // El video debe estar guardado porque el test falló
  });
});

// ============================================================================
// PARTE 4: Traces Programáticos
// ============================================================================

test.describe('Traces', () => {
  
  test('trace de flujo completo', async ({ page, context }: { page: Page; context: BrowserContext }) => {
    // TODO: Inicia trace con todas las opciones
    // Pista: context.tracing.start()
    
    // SOLUCIÓN:
    // await context.tracing.start({
    //   screenshots: true,
    //   snapshots: true,
    //   sources: true
    // });
    
    // Flujo de test
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // TODO: Detén y guarda trace
    // Pista: context.tracing.stop()
    
    // SOLUCIÓN:
    // await context.tracing.stop({ 
    //   path: 'test-results/trace-full-flow.zip' 
    // });
    
    // TODO: Abre el trace con: npx playwright show-trace test-results/trace-full-flow.zip
  });

  test('trace solo de sección específica', async ({ page, context }: { page: Page; context: BrowserContext }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Login sin trace
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // TODO: Inicia trace solo para la parte de búsqueda de productos
    // await context.tracing.start({ screenshots: true, snapshots: true });
    
    // Buscar producto
    const products = page.locator('.card-body');
    const count: number = await products.count();
    
    for (let i = 0; i < count; i++) {
      const productName: string | null = await products.nth(i).locator('b').textContent();
      if (productName === 'ZARA COAT 3') {
        await products.nth(i).locator('text=Add To Cart').click();
        break;
      }
    }
    
    // TODO: Detén trace
    // await context.tracing.stop({ path: 'test-results/trace-search.zip' });
  });

  test('trace con múltiples segmentos', async ({ page, context }: { page: Page; context: BrowserContext }) => {
    // Segmento 1: Login
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.tracing.stop({ path: 'test-results/trace-segment-1-login.zip' });
    
    // TODO: Segmento 2: Búsqueda de producto
    // Inicia nuevo trace, busca producto, detén trace
    
    // TODO: Segmento 3: Agregar al carrito
    // Inicia nuevo trace, agrega al carrito, detén trace
  });
});

// ============================================================================
// PARTE 5: Captura de Logs del Navegador
// ============================================================================

test.describe('Browser Logs', () => {
  
  test('capturar console logs', async ({ page }: { page: Page }) => {
    const consoleLogs: ConsoleLog[] = [];
    
    // TODO: Captura todos los console logs
    // Pista: page.on('console', ...)
    
    // SOLUCIÓN:
    // page.on('console', msg => {
    //   consoleLogs.push({
    //     type: msg.type(),
    //     text: msg.text(),
    //     location: msg.location()
    //   });
    // });
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // TODO: Imprime los logs capturados
    // console.log('Console Logs:', JSON.stringify(consoleLogs, null, 2));
  });

  test('capturar errores de página', async ({ page }: { page: Page }) => {
    const pageErrors: PageError[] = [];
    
    // TODO: Captura errores de JavaScript
    // Pista: page.on('pageerror', ...)
    
    // SOLUCIÓN:
    // page.on('pageerror', (error: Error) => {
    //   pageErrors.push({
    //     message: error.message,
    //     stack: error.stack
    //   });
    // });
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Intentar acción que puede causar error
    await page.evaluate(() => {
      // Este código puede generar errores en la consola
      console.error('Test error');
    });
    
    // TODO: Imprime los errores capturados
    // console.log('Page Errors:', JSON.stringify(pageErrors, null, 2));
  });

  test('capturar requests fallidos', async ({ page }: { page: Page }) => {
    const failedRequests: FailedRequest[] = [];
    
    // TODO: Captura requests que fallan
    // Pista: page.on('requestfailed', ...)
    
    // SOLUCIÓN:
    // page.on('requestfailed', request => {
    //   failedRequests.push({
    //     url: request.url(),
    //     method: request.method(),
    //     failure: request.failure()?.errorText || null
    //   });
    // });
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    // TODO: Imprime requests fallidos
    // console.log('Failed Requests:', JSON.stringify(failedRequests, null, 2));
  });
});

// ============================================================================
// PARTE 6: Test Fallido para Análisis
// ============================================================================

test.describe('Análisis de Fallos', () => {
  
  test('test fallido con artefactos completos', async ({ page, context }: { page: Page; context: BrowserContext }) => {
    // Inicia trace
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });
    
    // Captura logs
    const logs: string[] = [];
    page.on('console', msg => logs.push(msg.text()));
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Screenshot antes del fallo
    await page.screenshot({ path: 'test-results/before-failure.png' });
    
    // Este locator está mal intencionalmente
    await page.locator('#wrongSelector').fill('test@example.com');
    
    // Este código nunca se ejecutará
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    
    // Detén trace
    await context.tracing.stop({ path: 'test-results/trace-failure.zip' });
    
    // TODO: Después de ejecutar este test:
    // 1. Revisa el screenshot: test-results/before-failure.png
    // 2. Revisa el video en test-results/
    // 3. Abre el trace: npx playwright show-trace test-results/trace-failure.zip
    // 4. Analiza:
    //    - ¿En qué línea falló?
    //    - ¿Qué muestra el screenshot del fallo?
    //    - ¿Qué requests se hicieron?
    //    - ¿Hay errores en la consola?
  });
});

// ============================================================================
// PARTE 7: Ejercicio de Análisis
// ============================================================================

/**
 * EJERCICIO FINAL:
 * 
 * 1. Ejecuta todos los tests de este archivo:
 *    npx playwright test exercise-04-artifact-analysis.ts
 * 
 * 2. Analiza los artefactos generados:
 *    - Screenshots en test-results/
 *    - Videos en test-results/
 *    - Traces en test-results/
 * 
 * 3. Responde estas preguntas:
 * 
 * TODO: ¿Cuántos screenshots se generaron?
 * Respuesta: _______________
 * 
 * TODO: ¿Cuántos videos se guardaron?
 * Respuesta: _______________
 * 
 * TODO: ¿Cuántos traces se generaron?
 * Respuesta: _______________
 * 
 * TODO: ¿Qué test falló y por qué?
 * Respuesta: _______________
 * 
 * TODO: ¿Qué información te dio el trace del test fallido?
 * Respuesta: _______________
 * 
 * 4. Corrige el test fallido usando la información de los artefactos
 * 
 * 5. Ejecuta de nuevo y verifica que todos los tests pasen
 */

// ============================================================================
// RECURSOS ADICIONALES
// ============================================================================

/**
 * Comandos útiles:
 * 
 * # Ver todos los artefactos
 * ls -la test-results/
 * 
 * # Abrir trace específico
 * npx playwright show-trace test-results/trace-*.zip
 * 
 * # Ver video
 * open test-results/*-chromium/video.webm
 * 
 * # Limpiar artefactos
 * rm -rf test-results/
 * 
 * Documentación:
 * - Screenshots: https://playwright.dev/docs/screenshots
 * - Videos: https://playwright.dev/docs/videos
 * - Traces: https://playwright.dev/docs/trace-viewer
 * - Browser Logs: https://playwright.dev/docs/api/class-page#page-event-console
 */
