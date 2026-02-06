/**
 * Solución 04: Análisis de Artefactos de Tests
 * 
 * Esta es la solución completa del ejercicio 04.
 * Todos los TODOs están implementados.
 */

const { test, expect } = require('@playwright/test');

// ============================================================================
// PARTE 2: Screenshots Manuales - SOLUCIÓN
// ============================================================================

test.describe('Screenshots', () => {
  
  test('capturar screenshot de página completa', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.screenshot({ 
      path: 'test-results/full-page.png', 
      fullPage: true 
    });
  });

  test('capturar screenshot de elemento específico', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    const loginForm = page.locator('.login-wrapper');
    await loginForm.screenshot({ 
      path: 'test-results/login-form.png' 
    });
  });

  test('capturar screenshot con máscara', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.screenshot({
      path: 'test-results/masked.png',
      mask: [page.locator('#userEmail'), page.locator('#userPassword')]
    });
  });

  test('capturar screenshot en diferentes estados', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Screenshot del estado inicial
    await page.screenshot({ path: 'test-results/state-1-initial.png' });
    
    // Llenar formulario
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.screenshot({ path: 'test-results/state-2-filled.png' });
    
    // Click en login
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'test-results/state-3-logged-in.png' });
  });
});

// ============================================================================
// PARTE 3: Videos - SOLUCIÓN
// ============================================================================

test.describe('Videos', () => {
  
  test('video de test exitoso', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    await expect(page).toHaveURL(/client/);
    
    // El video se genera automáticamente según configuración
    // Con 'retain-on-failure', este video se eliminará porque el test pasó
  });

  test.skip('video de test fallido', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Este test fallará intencionalmente
    await expect(page.locator('#nonExistentElement')).toBeVisible({ timeout: 5000 });
    
    // El video se guardará porque el test falló
  });
});

// ============================================================================
// PARTE 4: Traces Programáticos - SOLUCIÓN
// ============================================================================

test.describe('Traces', () => {
  
  test('trace de flujo completo', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    await context.tracing.stop({ 
      path: 'test-results/trace-full-flow.zip' 
    });
  });

  test('trace solo de sección específica', async ({ page, context }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Login sin trace
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    // Inicia trace solo para búsqueda
    await context.tracing.start({ screenshots: true, snapshots: true });
    
    const products = page.locator('.card-body');
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
      const productName = await products.nth(i).locator('b').textContent();
      if (productName === 'ZARA COAT 3') {
        await products.nth(i).locator('text=Add To Cart').click();
        break;
      }
    }
    
    await context.tracing.stop({ path: 'test-results/trace-search.zip' });
  });

  test('trace con múltiples segmentos', async ({ page, context }) => {
    // Segmento 1: Login
    await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.tracing.stop({ path: 'test-results/trace-segment-1-login.zip' });
    
    // Segmento 2: Búsqueda de producto
    await context.tracing.start({ screenshots: true, snapshots: true });
    const products = page.locator('.card-body');
    const count = await products.count();
    let productFound = false;
    
    for (let i = 0; i < count; i++) {
      const productName = await products.nth(i).locator('b').textContent();
      if (productName === 'ZARA COAT 3') {
        productFound = true;
        await context.tracing.stop({ path: 'test-results/trace-segment-2-search.zip' });
        
        // Segmento 3: Agregar al carrito
        await context.tracing.start({ screenshots: true, snapshots: true });
        await products.nth(i).locator('text=Add To Cart').click();
        await page.waitForTimeout(1000);
        await context.tracing.stop({ path: 'test-results/trace-segment-3-add-cart.zip' });
        break;
      }
    }
    
    if (!productFound) {
      await context.tracing.stop({ path: 'test-results/trace-segment-2-search.zip' });
    }
  });
});

// ============================================================================
// PARTE 5: Captura de Logs del Navegador - SOLUCIÓN
// ============================================================================

test.describe('Browser Logs', () => {
  
  test('capturar console logs', async ({ page }) => {
    const consoleLogs = [];
    
    page.on('console', msg => {
      consoleLogs.push({
        type: msg.type(),
        text: msg.text(),
        location: msg.location()
      });
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    console.log('Console Logs capturados:', consoleLogs.length);
    if (consoleLogs.length > 0) {
      console.log('Primer log:', consoleLogs[0]);
    }
  });

  test('capturar errores de página', async ({ page }) => {
    const pageErrors = [];
    
    page.on('pageerror', error => {
      pageErrors.push({
        message: error.message,
        stack: error.stack
      });
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.evaluate(() => {
      console.error('Test error');
    });
    
    console.log('Page Errors capturados:', pageErrors.length);
  });

  test('capturar requests fallidos', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        method: request.method(),
        failure: request.failure()
      });
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    console.log('Failed Requests:', failedRequests.length);
  });
});

// ============================================================================
// PARTE 6: Test Fallido Corregido - SOLUCIÓN
// ============================================================================

test.describe('Análisis de Fallos', () => {
  
  test('test corregido con artefactos completos', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true,
      sources: true
    });
    
    const logs = [];
    page.on('console', msg => logs.push(msg.text()));
    
    await page.goto('https://rahulshettyacademy.com/client');
    
    await page.screenshot({ path: 'test-results/before-login.png' });
    
    // CORREGIDO: Usar el selector correcto
    await page.locator('#userEmail').fill('test@example.com');
    await page.locator('#userPassword').fill('Test@123');
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    
    await page.screenshot({ path: 'test-results/after-login.png' });
    
    // Verificar que el login fue exitoso
    await expect(page).toHaveURL(/client/);
    
    await context.tracing.stop({ path: 'test-results/trace-success.zip' });
    
    console.log('Test completado exitosamente');
    console.log('Logs capturados:', logs.length);
  });
});
