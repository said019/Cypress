/**
 * Exercise 02: Visual Testing Scenarios
 * 
 * Objetivo: Practicar diferentes escenarios de visual regression testing
 * incluyendo full-page, element screenshots, masking y cross-browser testing.
 */

const { test, expect } = require('@playwright/test');

/**
 * PARTE 1: Full-Page Screenshots
 * 
 * Los screenshots de página completa capturan toda la página,
 * incluyendo contenido que requiere scroll.
 */
test.describe('Visual Testing - Full Page', () => {

  test('should capture full page screenshot', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar screenshot de página completa
    // Usa: await page.screenshot({ fullPage: true, path: 'full-page.png' })
    
    // TODO: Comparar con baseline usando toHaveScreenshot
    // await expect(page).toHaveScreenshot('playwright-full-page.png', {
    //   fullPage: true
    // });
  });

  test('should handle long scrolling pages', async ({ page }) => {
    await page.goto('https://playwright.dev/docs/intro');
    
    // TODO: Capturar página larga con scroll
    // Configura timeout más alto si es necesario
    
    console.log('✅ Página larga capturada');
  });

});

/**
 * PARTE 2: Element Screenshots
 * 
 * Capturar solo elementos específicos es más eficiente y reduce
 * falsos positivos por cambios en otras partes de la página.
 */
test.describe('Visual Testing - Elements', () => {

  test('should capture specific element', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar solo el navbar
    // const navbar = page.locator('.navbar');
    // await expect(navbar).toHaveScreenshot('navbar.png');
    
    console.log('✅ Elemento capturado');
  });

  test('should capture multiple elements', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar varios elementos importantes
    // - Header
    // - Hero section
    // - Footer
    
    console.log('✅ Múltiples elementos capturados');
  });

  test('should wait for element to be stable', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Esperar a que el elemento esté estable antes de capturar
    // Usa animations: 'disabled' para evitar animaciones
    
    // await expect(page.locator('.hero')).toHaveScreenshot('hero.png', {
    //   animations: 'disabled'
    // });
  });

});

/**
 * PARTE 3: Masked Screenshots
 * 
 * Enmascarar elementos dinámicos previene falsos positivos
 * por contenido que cambia frecuentemente.
 */
test.describe('Visual Testing - Masking', () => {

  test('should mask dynamic content', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Enmascarar elementos dinámicos
    // await expect(page).toHaveScreenshot('masked-page.png', {
    //   mask: [page.locator('.theme-doc-version-badge')]
    // });
    
    console.log('✅ Contenido dinámico enmascarado');
  });

  test('should mask multiple elements', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Enmascarar múltiples elementos
    // - Badges de versión
    // - Timestamps
    // - Contadores
    // - Anuncios
    
    console.log('✅ Múltiples elementos enmascarados');
  });

  test('should mask with custom color', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Enmascarar con color personalizado
    // Usa maskColor para especificar el color del mask
    
    console.log('✅ Mask con color personalizado');
  });

});

/**
 * PARTE 4: Threshold Configuration
 * 
 * Los thresholds controlan cuánta diferencia es aceptable
 * antes de considerar el test como fallido.
 */
test.describe('Visual Testing - Thresholds', () => {

  test('should use strict threshold for critical UI', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Usar threshold bajo (0.1%) para UI crítica
    // await expect(page.locator('.navbar')).toHaveScreenshot('navbar-strict.png', {
    //   maxDiffPixelRatio: 0.001 // 0.1%
    // });
    
    console.log('✅ Threshold estricto aplicado');
  });

  test('should use relaxed threshold for dynamic content', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Usar threshold más alto (2%) para contenido dinámico
    // maxDiffPixelRatio: 0.02 // 2%
    
    console.log('✅ Threshold relajado aplicado');
  });

  test('should configure pixel and ratio thresholds', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Configurar ambos thresholds
    // - maxDiffPixels: número absoluto de píxeles diferentes
    // - maxDiffPixelRatio: porcentaje de píxeles diferentes
    
    console.log('✅ Thresholds configurados');
  });

});

/**
 * PARTE 5: Cross-Browser Visual Testing
 * 
 * Diferentes navegadores pueden renderizar de forma ligeramente diferente.
 * Usa baselines específicos por navegador.
 */
test.describe('Visual Testing - Cross-Browser', () => {

  test('should have browser-specific baselines', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Usar baseline específico del navegador
    // El nombre del screenshot incluye automáticamente el navegador
    // await expect(page).toHaveScreenshot(`${browserName}-homepage.png`);
    
    console.log(`✅ Baseline para ${browserName}`);
  });

  test('should handle browser rendering differences', async ({ page, browserName }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Ajustar threshold según el navegador
    // Webkit puede tener más diferencias de rendering
    
    const threshold = browserName === 'webkit' ? 0.02 : 0.01;
    
    // await expect(page).toHaveScreenshot('cross-browser.png', {
    //   maxDiffPixelRatio: threshold
    // });
    
    console.log(`✅ Threshold ajustado para ${browserName}: ${threshold}`);
  });

});

/**
 * PARTE 6: Responsive Visual Testing
 * 
 * Validar que la UI se ve correctamente en diferentes tamaños de viewport.
 */
test.describe('Visual Testing - Responsive', () => {

  test('should test mobile viewport', async ({ page }) => {
    // TODO: Configurar viewport móvil
    // await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE
    
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar screenshot móvil
    // await expect(page).toHaveScreenshot('mobile-homepage.png');
    
    console.log('✅ Viewport móvil testeado');
  });

  test('should test tablet viewport', async ({ page }) => {
    // TODO: Configurar viewport tablet
    // await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar screenshot tablet
    
    console.log('✅ Viewport tablet testeado');
  });

  test('should test desktop viewport', async ({ page }) => {
    // TODO: Configurar viewport desktop
    // await page.setViewportSize({ width: 1920, height: 1080 });
    
    await page.goto('https://playwright.dev');
    
    // TODO: Capturar screenshot desktop
    
    console.log('✅ Viewport desktop testeado');
  });

  test('should test multiple breakpoints', async ({ page }) => {
    const breakpoints = [
      { name: 'mobile', width: 375, height: 667 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'desktop', width: 1920, height: 1080 }
    ];

    await page.goto('https://playwright.dev');

    // TODO: Iterar sobre breakpoints y capturar cada uno
    // for (const bp of breakpoints) {
    //   await page.setViewportSize({ width: bp.width, height: bp.height });
    //   await expect(page).toHaveScreenshot(`${bp.name}-homepage.png`);
    // }
    
    console.log('✅ Múltiples breakpoints testeados');
  });

});

/**
 * PARTE 7: Visual Testing con Interacciones
 * 
 * Capturar estados de UI después de interacciones del usuario.
 */
test.describe('Visual Testing - Interactions', () => {

  test('should capture hover state', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Hacer hover sobre un elemento y capturar
    // await page.locator('.navbar__item').first().hover();
    // await expect(page).toHaveScreenshot('hover-state.png');
    
    console.log('✅ Estado hover capturado');
  });

  test('should capture focus state', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Enfocar un elemento y capturar
    // await page.locator('input[type="search"]').focus();
    // await expect(page).toHaveScreenshot('focus-state.png');
    
    console.log('✅ Estado focus capturado');
  });

  test('should capture modal/dialog state', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Abrir modal/dialog y capturar
    // Ejemplo: click en botón que abre modal
    
    console.log('✅ Estado modal capturado');
  });

});

/**
 * PARTE 8: Actualización de Baselines
 * 
 * Cuando hay cambios intencionales en la UI, los baselines deben actualizarse.
 */
test.describe('Visual Testing - Baseline Updates', () => {

  test('should update baseline when UI changes intentionally', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // TODO: Para actualizar baselines, ejecuta:
    // npx playwright test --update-snapshots
    
    // await expect(page).toHaveScreenshot('homepage.png');
    
    console.log('ℹ️  Ejecuta con --update-snapshots para actualizar baselines');
  });

});

/**
 * TIPS Y MEJORES PRÁCTICAS:
 * 
 * 1. Naming Conventions:
 *    - Usa nombres descriptivos: 'login-form-error-state.png'
 *    - Incluye el navegador si es necesario: 'webkit-homepage.png'
 *    - Usa kebab-case para consistencia
 * 
 * 2. Threshold Selection:
 *    - UI crítica (login, checkout): 0.1-0.5%
 *    - UI general: 1-2%
 *    - Contenido dinámico: 2-5%
 * 
 * 3. Masking Strategy:
 *    - Enmascara fechas, timestamps, contadores
 *    - Enmascara anuncios y contenido de terceros
 *    - Enmascara elementos con animaciones
 * 
 * 4. Performance:
 *    - Usa element screenshots cuando sea posible
 *    - Evita full-page para páginas muy largas
 *    - Considera el tamaño de los baselines
 * 
 * 5. CI/CD:
 *    - Usa Docker para consistencia de rendering
 *    - Almacena baselines en artifact storage
 *    - Genera reportes visuales de diferencias
 * 
 * 6. Maintenance:
 *    - Revisa baselines regularmente
 *    - Elimina baselines obsoletos
 *    - Documenta cambios en baselines
 */
