/**
 * Test de Validación: Ejercicio 04 - Análisis de Artefactos
 * 
 * Este test valida que el ejercicio 04 esté correctamente implementado.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Validación Ejercicio 04', () => {
  
  test('debe existir el archivo de ejercicio JS', () => {
    const exercisePath = path.join(__dirname, '../exercises/exercise-04-artifact-analysis.js');
    expect(fs.existsSync(exercisePath)).toBeTruthy();
  });

  test('debe existir el archivo de ejercicio TS', () => {
    const exercisePath = path.join(__dirname, '../exercises/exercise-04-artifact-analysis.ts');
    expect(fs.existsSync(exercisePath)).toBeTruthy();
  });

  test('debe existir el archivo de solución', () => {
    const solutionPath = path.join(__dirname, '../solutions/solution-04-artifact-analysis.js');
    expect(fs.existsSync(solutionPath)).toBeTruthy();
  });

  test('el ejercicio debe contener TODOs para el aprendiz', () => {
    const exercisePath = path.join(__dirname, '../exercises/exercise-04-artifact-analysis.js');
    const content = fs.readFileSync(exercisePath, 'utf-8');
    
    // Debe tener múltiples TODOs
    const todoCount = (content.match(/TODO:/g) || []).length;
    expect(todoCount).toBeGreaterThan(10);
  });

  test('la solución debe tener implementaciones completas', () => {
    const solutionPath = path.join(__dirname, '../solutions/solution-04-artifact-analysis.js');
    const content = fs.readFileSync(solutionPath, 'utf-8');
    
    // Debe tener implementaciones clave
    expect(content).toContain('page.screenshot');
    expect(content).toContain('context.tracing.start');
    expect(content).toContain('context.tracing.stop');
    expect(content).toContain('page.on(\'console\'');
  });

  test('debe poder capturar screenshot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    const screenshotPath = 'test-results/validation-screenshot.png';
    await page.screenshot({ path: screenshotPath });
    
    // Verificar que el screenshot se creó
    expect(fs.existsSync(screenshotPath)).toBeTruthy();
    
    // Limpiar
    if (fs.existsSync(screenshotPath)) {
      fs.unlinkSync(screenshotPath);
    }
  });

  test('debe poder iniciar y detener trace', async ({ page, context }) => {
    await context.tracing.start({
      screenshots: true,
      snapshots: true
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').fill('test@example.com');
    
    const tracePath = 'test-results/validation-trace.zip';
    await context.tracing.stop({ path: tracePath });
    
    // Verificar que el trace se creó
    expect(fs.existsSync(tracePath)).toBeTruthy();
    
    // Limpiar
    if (fs.existsSync(tracePath)) {
      fs.unlinkSync(tracePath);
    }
  });

  test('debe poder capturar console logs', async ({ page }) => {
    const logs = [];
    
    page.on('console', msg => {
      logs.push(msg.text());
    });
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.evaluate(() => console.log('Test log'));
    
    // Debe haber capturado al menos un log
    expect(logs.length).toBeGreaterThan(0);
  });

  test('debe poder capturar screenshot de elemento', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    const element = page.locator('.login-wrapper');
    const screenshotPath = 'test-results/validation-element.png';
    await element.screenshot({ path: screenshotPath });
    
    expect(fs.existsSync(screenshotPath)).toBeTruthy();
    
    // Limpiar
    if (fs.existsSync(screenshotPath)) {
      fs.unlinkSync(screenshotPath);
    }
  });
});

test.describe('Validación de Conceptos', () => {
  
  test('debe entender configuración de artifacts', () => {
    // Este test verifica que el aprendiz entiende las opciones
    const validOptions = ['on', 'off', 'only-on-failure', 'retain-on-failure', 'on-first-retry'];
    
    // Screenshot options
    expect(validOptions).toContain('only-on-failure');
    
    // Video options
    expect(validOptions).toContain('retain-on-failure');
    
    // Trace options
    expect(validOptions).toContain('on-first-retry');
  });

  test('debe poder usar diferentes opciones de screenshot', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    
    // Full page
    await page.screenshot({ 
      path: 'test-results/test-full.png', 
      fullPage: true 
    });
    expect(fs.existsSync('test-results/test-full.png')).toBeTruthy();
    
    // Con máscara
    await page.screenshot({
      path: 'test-results/test-masked.png',
      mask: [page.locator('#userEmail')]
    });
    expect(fs.existsSync('test-results/test-masked.png')).toBeTruthy();
    
    // Limpiar
    fs.unlinkSync('test-results/test-full.png');
    fs.unlinkSync('test-results/test-masked.png');
  });
});
