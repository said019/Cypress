import { test, expect } from '@playwright/test';

// Ejemplo básico: abrir una página y verificar el título
test('Página principal tiene el título correcto', async ({ page }) => {
  await page.goto('https://example.com');
  // Verifica que el título sea 'Example Domain'
  await expect(page).toHaveTitle('Example Domain');
});
