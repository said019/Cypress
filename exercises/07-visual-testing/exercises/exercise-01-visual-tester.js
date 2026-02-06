/**
 * Exercise 01: VisualTester Utility Class
 * 
 * Objetivo: Implementar una clase utilitaria para visual regression testing
 * que permita capturar baselines, comparar screenshots y generar diff images.
 * 
 * En este ejercicio aprenderás a:
 * - Capturar screenshots como baselines
 * - Comparar screenshots actuales con baselines
 * - Configurar thresholds de comparación
 * - Generar imágenes de diferencias (diff)
 * - Gestionar baselines para múltiples navegadores
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * VisualTester Class
 * 
 * Clase utilitaria para realizar visual regression testing.
 * Proporciona métodos para capturar, comparar y gestionar screenshots.
 */
class VisualTester {
  /**
   * Constructor
   * @param {Page} page - Playwright page object
   * @param {Object} options - Opciones de configuración
   * @param {string} options.baselineDir - Directorio para baselines
   * @param {number} options.threshold - Threshold de comparación (0-1)
   * @param {string} options.browser - Nombre del navegador
   */
  constructor(page, options = {}) {
    this.page = page;
    this.baselineDir = options.baselineDir || path.join(__dirname, '../baselines');
    this.threshold = options.threshold || 0.01; // 1% por defecto
    this.browser = options.browser || 'chromium';
    
    // TODO: Crear directorio de baselines si no existe
    // Usa fs.mkdirSync con { recursive: true }
  }

  /**
   * Captura un screenshot y lo guarda como baseline
   * @param {string} name - Nombre del baseline
   * @param {Object} options - Opciones de screenshot
   * @returns {Promise<string>} - Path del baseline guardado
   */
  async captureBaseline(name, options = {}) {
    // TODO: Implementar captura de baseline
    // 1. Construir path del baseline: baselineDir/browser/name.png
    // 2. Crear directorio del navegador si no existe
    // 3. Capturar screenshot con this.page.screenshot()
    // 4. Guardar en el path construido
    // 5. Retornar el path
    
    console.log(`📸 Baseline capturado: ${name}`);
  }

  /**
   * Compara un screenshot actual con el baseline
   * @param {string} name - Nombre del baseline a comparar
   * @param {Object} options - Opciones de comparación
   * @returns {Promise<Object>} - Resultado de la comparación
   */
  async compareWithBaseline(name, options = {}) {
    // TODO: Implementar comparación con baseline
    // 1. Obtener path del baseline
    // 2. Verificar que el baseline existe
    // 3. Capturar screenshot actual
    // 4. Usar expect(page).toHaveScreenshot() de Playwright
    // 5. Configurar threshold y otras opciones
    // 6. Retornar resultado de comparación
    
    console.log(`🔍 Comparando con baseline: ${name}`);
  }

  /**
   * Captura screenshot de página completa
   * @param {string} name - Nombre del screenshot
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Buffer>} - Buffer del screenshot
   */
  async captureFullPage(name, options = {}) {
    // TODO: Implementar captura de página completa
    // Usa page.screenshot({ fullPage: true, ...options })
    
    console.log(`📄 Capturando página completa: ${name}`);
  }

  /**
   * Captura screenshot de un elemento específico
   * @param {string} selector - Selector del elemento
   * @param {string} name - Nombre del screenshot
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Buffer>} - Buffer del screenshot
   */
  async captureElement(selector, name, options = {}) {
    // TODO: Implementar captura de elemento
    // 1. Localizar elemento con this.page.locator(selector)
    // 2. Capturar screenshot del elemento
    // 3. Guardar o retornar según opciones
    
    console.log(`🎯 Capturando elemento: ${selector}`);
  }

  /**
   * Captura screenshot con elementos enmascarados
   * @param {string} name - Nombre del screenshot
   * @param {Array<string>} maskSelectors - Selectores a enmascarar
   * @param {Object} options - Opciones adicionales
   * @returns {Promise<Buffer>} - Buffer del screenshot
   */
  async captureWithMask(name, maskSelectors = [], options = {}) {
    // TODO: Implementar captura con masking
    // 1. Construir array de locators para mask
    // 2. Usar page.screenshot({ mask: locators, ...options })
    // 3. Guardar o retornar screenshot
    
    console.log(`🎭 Capturando con mask: ${name}`);
  }

  /**
   * Obtiene el path del baseline para el navegador actual
   * @param {string} name - Nombre del baseline
   * @returns {string} - Path completo del baseline
   */
  getBaselinePath(name) {
    // TODO: Implementar construcción de path
    // Formato: baselineDir/browser/name.png
    
    return path.join(this.baselineDir, this.browser, `${name}.png`);
  }

  /**
   * Verifica si existe un baseline
   * @param {string} name - Nombre del baseline
   * @returns {boolean} - True si existe
   */
  baselineExists(name) {
    // TODO: Implementar verificación de existencia
    // Usa fs.existsSync()
    
    const baselinePath = this.getBaselinePath(name);
    return false; // Cambiar por implementación real
  }

  /**
   * Elimina un baseline
   * @param {string} name - Nombre del baseline a eliminar
   */
  deleteBaseline(name) {
    // TODO: Implementar eliminación de baseline
    // 1. Verificar que existe
    // 2. Eliminar con fs.unlinkSync()
    
    console.log(`🗑️  Baseline eliminado: ${name}`);
  }

  /**
   * Lista todos los baselines del navegador actual
   * @returns {Array<string>} - Array de nombres de baselines
   */
  listBaselines() {
    // TODO: Implementar listado de baselines
    // 1. Leer directorio del navegador
    // 2. Filtrar solo archivos .png
    // 3. Retornar array de nombres (sin extensión)
    
    return [];
  }

  /**
   * Actualiza threshold de comparación
   * @param {number} threshold - Nuevo threshold (0-1)
   */
  setThreshold(threshold) {
    // TODO: Validar y actualizar threshold
    // Threshold debe estar entre 0 y 1
    
    this.threshold = threshold;
    console.log(`⚙️  Threshold actualizado: ${threshold}`);
  }
}

/**
 * VisualComparator Class
 * 
 * Clase para comparación avanzada de imágenes.
 * Proporciona métodos para análisis detallado de diferencias.
 */
class VisualComparator {
  /**
   * Constructor
   * @param {Object} options - Opciones de comparación
   */
  constructor(options = {}) {
    this.threshold = options.threshold || 0.01;
    this.includeAA = options.includeAA !== false; // Anti-aliasing
  }

  /**
   * Compara dos imágenes y retorna métricas
   * @param {Buffer} image1 - Primera imagen
   * @param {Buffer} image2 - Segunda imagen
   * @returns {Object} - Métricas de comparación
   */
  async compare(image1, image2) {
    // TODO: Implementar comparación de imágenes
    // Puedes usar la librería pixelmatch o la funcionalidad nativa de Playwright
    // Retornar: { match: boolean, diffPixels: number, diffPercentage: number }
    
    return {
      match: true,
      diffPixels: 0,
      diffPercentage: 0
    };
  }

  /**
   * Genera imagen de diferencias
   * @param {Buffer} image1 - Primera imagen
   * @param {Buffer} image2 - Segunda imagen
   * @param {string} outputPath - Path para guardar diff
   * @returns {Promise<string>} - Path de la imagen diff
   */
  async generateDiff(image1, image2, outputPath) {
    // TODO: Implementar generación de diff image
    // Resaltar píxeles diferentes en color (ej: rojo)
    
    console.log(`📊 Diff generado: ${outputPath}`);
    return outputPath;
  }
}

/**
 * BaselineManager Class
 * 
 * Clase para gestionar baselines de múltiples navegadores.
 */
class BaselineManager {
  /**
   * Constructor
   * @param {string} baselineDir - Directorio raíz de baselines
   */
  constructor(baselineDir) {
    this.baselineDir = baselineDir || path.join(__dirname, '../baselines');
  }

  /**
   * Copia baselines de un navegador a otro
   * @param {string} sourceBrowser - Navegador origen
   * @param {string} targetBrowser - Navegador destino
   */
  copyBaselines(sourceBrowser, targetBrowser) {
    // TODO: Implementar copia de baselines
    // 1. Leer todos los baselines del navegador origen
    // 2. Copiar cada uno al directorio del navegador destino
    
    console.log(`📋 Copiando baselines: ${sourceBrowser} → ${targetBrowser}`);
  }

  /**
   * Sincroniza baselines entre navegadores
   * @param {Array<string>} browsers - Lista de navegadores
   */
  syncBaselines(browsers) {
    // TODO: Implementar sincronización
    // Asegurar que todos los navegadores tengan los mismos baselines
    
    console.log(`🔄 Sincronizando baselines para: ${browsers.join(', ')}`);
  }

  /**
   * Limpia baselines antiguos
   * @param {number} daysOld - Días de antigüedad
   */
  cleanOldBaselines(daysOld = 30) {
    // TODO: Implementar limpieza de baselines antiguos
    // Eliminar baselines no modificados en X días
    
    console.log(`🧹 Limpiando baselines antiguos (>${daysOld} días)`);
  }

  /**
   * Genera reporte de baselines
   * @returns {Object} - Reporte con estadísticas
   */
  generateReport() {
    // TODO: Implementar generación de reporte
    // Retornar: { totalBaselines, byBrowser: {}, totalSize: 0 }
    
    return {
      totalBaselines: 0,
      byBrowser: {},
      totalSize: 0
    };
  }
}

// ============================================================================
// TESTS DE EJEMPLO
// ============================================================================

test.describe('Visual Testing - VisualTester', () => {

  test('should capture baseline screenshot', async ({ page }) => {
    const visualTester = new VisualTester(page, {
      browser: 'chromium',
      threshold: 0.01
    });

    await page.goto('https://playwright.dev');
    
    // TODO: Capturar baseline
    // await visualTester.captureBaseline('playwright-homepage');
    
    // TODO: Verificar que el baseline fue creado
    // expect(visualTester.baselineExists('playwright-homepage')).toBeTruthy();
  });

  test('should compare with baseline', async ({ page }) => {
    const visualTester = new VisualTester(page);

    await page.goto('https://playwright.dev');
    
    // TODO: Comparar con baseline existente
    // const result = await visualTester.compareWithBaseline('playwright-homepage');
    
    // TODO: Verificar resultado
    // expect(result.match).toBeTruthy();
  });

  test('should capture full page screenshot', async ({ page }) => {
    const visualTester = new VisualTester(page);

    await page.goto('https://playwright.dev');
    
    // TODO: Capturar página completa
    // const screenshot = await visualTester.captureFullPage('full-page');
    
    // TODO: Verificar que el screenshot fue capturado
    // expect(screenshot).toBeDefined();
  });

  test('should capture element screenshot', async ({ page }) => {
    const visualTester = new VisualTester(page);

    await page.goto('https://playwright.dev');
    
    // TODO: Capturar elemento específico
    // const screenshot = await visualTester.captureElement('.navbar', 'navbar');
    
    // TODO: Verificar captura
    // expect(screenshot).toBeDefined();
  });

  test('should capture with masked elements', async ({ page }) => {
    const visualTester = new VisualTester(page);

    await page.goto('https://playwright.dev');
    
    // TODO: Capturar con elementos enmascarados
    // const screenshot = await visualTester.captureWithMask(
    //   'masked-page',
    //   ['.dynamic-content', '.ads']
    // );
    
    // TODO: Verificar captura
    // expect(screenshot).toBeDefined();
  });

});

test.describe('Visual Testing - VisualComparator', () => {

  test('should compare two images', async () => {
    const comparator = new VisualComparator({ threshold: 0.01 });

    // TODO: Cargar dos imágenes para comparar
    // const image1 = fs.readFileSync('path/to/image1.png');
    // const image2 = fs.readFileSync('path/to/image2.png');
    
    // TODO: Comparar imágenes
    // const result = await comparator.compare(image1, image2);
    
    // TODO: Verificar resultado
    // expect(result).toHaveProperty('match');
    // expect(result).toHaveProperty('diffPercentage');
  });

  test('should generate diff image', async () => {
    const comparator = new VisualComparator();

    // TODO: Generar imagen de diferencias
    // const diffPath = await comparator.generateDiff(image1, image2, 'diff.png');
    
    // TODO: Verificar que se generó
    // expect(fs.existsSync(diffPath)).toBeTruthy();
  });

});

test.describe('Visual Testing - BaselineManager', () => {

  test('should list all baselines', () => {
    const manager = new BaselineManager();

    // TODO: Listar baselines
    // const report = manager.generateReport();
    
    // TODO: Verificar reporte
    // expect(report).toHaveProperty('totalBaselines');
    // expect(report).toHaveProperty('byBrowser');
  });

  test('should copy baselines between browsers', () => {
    const manager = new BaselineManager();

    // TODO: Copiar baselines
    // manager.copyBaselines('chromium', 'firefox');
    
    // TODO: Verificar que se copiaron
  });

});

// ============================================================================
// EXPORTS
// ============================================================================

module.exports = {
  VisualTester,
  VisualComparator,
  BaselineManager
};

/**
 * TIPS Y MEJORES PRÁCTICAS:
 * 
 * 1. Gestión de Baselines:
 *    - Mantén baselines en control de versiones (Git LFS para archivos grandes)
 *    - Usa nombres descriptivos para baselines
 *    - Organiza por navegador y feature
 * 
 * 2. Thresholds:
 *    - Usa thresholds bajos (0.1-0.5%) para UI crítica
 *    - Ajusta según anti-aliasing y rendering differences
 *    - Documenta por qué elegiste cada threshold
 * 
 * 3. Masking:
 *    - Enmascara contenido dinámico (fechas, contadores, anuncios)
 *    - Usa selectores específicos
 *    - Documenta qué elementos están enmascarados y por qué
 * 
 * 4. Performance:
 *    - Captura solo lo necesario (element screenshots cuando sea posible)
 *    - Considera el tamaño de las imágenes
 *    - Usa compresión apropiada
 * 
 * 5. CI/CD:
 *    - Ejecuta en entornos consistentes (Docker)
 *    - Almacena baselines en artifact storage
 *    - Genera reportes visuales de diferencias
 */
