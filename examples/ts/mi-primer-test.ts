import { test, expect } from '@playwright/test';

// Mi primer test automatizado con Playwright y TypeScript
test('Validar el texto principal de example.com', async ({ page }) => {
  // Abro la página principal
  await page.goto('https://example.com');

  // Busco el elemento h1 y verifico su texto
  const titulo = await page.locator('h1');
  await expect(titulo).toHaveText('Example Domain');

  // Tomo una captura de pantalla como evidencia
  await page.screenshot({ path: 'evidencia-mi-primer-test.png' });
});
