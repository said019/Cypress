/**
 * Solution 01: VisualTester Utility Class
 * 
 * Implementación completa de las clases para visual regression testing.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * VisualTester Class - Solución Completa
 */
class VisualTester {
  constructor(page, options = {}) {
    this.page = page;
    this.baselineDir = options.baselineDir || path.join(__dirname, '../baselines');
    this.threshold = options.threshold || 0.01;
    this.browser = options.browser || 'chromium';
    
    // Crear directorio de baselines si no existe
    if (!fs.existsSync(this.baselineDir)) {
      fs.mkdirSync(this.baselineDir, { recursive: true });
    }
    
    // Crear directorio del navegador
    const browserDir = path.join(this.baselineDir, this.browser);
    if (!fs.existsSync(browserDir)) {
      fs.mkdirSync(browserDir, { recursive: true });
    }
  }

  async captureBaseline(name, options = {}) {
    const baselinePath = this.getBaselinePath(name);
    const browserDir = path.dirname(baselinePath);
    
    // Asegurar que el directorio existe
    if (!fs.existsSync(browserDir)) {
      fs.mkdirSync(browserDir, { recursive: true });
    }
    
    // Capturar screenshot
    await this.page.screenshot({
      path: baselinePath,
      ...options
    });
    
    console.log(`📸 Baseline capturado: ${name} -> ${baselinePath}`);
    return baselinePath;
  }

  async compareWithBaseline(name, options = {}) {
    const baselinePath = this.getBaselinePath(name);
    
    // Verificar que el baseline existe
    if (!this.baselineExists(name)) {
      throw new Error(`Baseline no encontrado: ${name}`);
    }
    
    // Usar la funcionalidad nativa de Playwright para comparación
    try {
      await expect(this.page).toHaveScreenshot(`${this.browser}-${name}.png`, {
        maxDiffPixels: this.threshold * 1000000, // Convertir threshold a píxeles
        ...options
      });
      
      return {
        match: true,
        diffPixels: 0,
        diffPercentage: 0,
        baselinePath
      };
    } catch (error) {
      return {
        match: false,
        diffPixels: error.matcherResult?.diffPixels || 0,
        diffPercentage: error.matcherResult?.diffPercentage || 0,
        baselinePath,
        error: error.message
      };
    }
  }

  async captureFullPage(name, options = {}) {
    const screenshot = await this.page.screenshot({
      fullPage: true,
      ...options
    });
    
    console.log(`📄 Página completa capturada: ${name}`);
    return screenshot;
  }

  async captureElement(selector, name, options = {}) {
    const element = this.page.locator(selector);
    const screenshot = await element.screenshot(options);
    
    console.log(`🎯 Elemento capturado: ${selector}`);
    return screenshot;
  }

  async captureWithMask(name, maskSelectors = [], options = {}) {
    // Construir array de locators para mask
    const maskLocators = maskSelectors.map(selector => this.page.locator(selector));
    
    const screenshot = await this.page.screenshot({
      mask: maskLocators,
      ...options
    });
    
    console.log(`🎭 Screenshot con mask capturado: ${name}`);
    return screenshot;
  }

  getBaselinePath(name) {
    return path.join(this.baselineDir, this.browser, `${name}.png`);
  }

  baselineExists(name) {
    const baselinePath = this.getBaselinePath(name);
    return fs.existsSync(baselinePath);
  }

  deleteBaseline(name) {
    const baselinePath = this.getBaselinePath(name);
    
    if (this.baselineExists(name)) {
      fs.unlinkSync(baselinePath);
      console.log(`🗑️  Baseline eliminado: ${name}`);
    } else {
      console.log(`⚠️  Baseline no encontrado: ${name}`);
    }
  }

  listBaselines() {
    const browserDir = path.join(this.baselineDir, this.browser);
    
    if (!fs.existsSync(browserDir)) {
      return [];
    }
    
    const files = fs.readdirSync(browserDir);
    return files
      .filter(file => file.endsWith('.png'))
      .map(file => file.replace('.png', ''));
  }

  setThreshold(threshold) {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Threshold debe estar entre 0 y 1');
    }
    
    this.threshold = threshold;
    console.log(`⚙️  Threshold actualizado: ${threshold}`);
  }
}

/**
 * VisualComparator Class - Solución Completa
 */
class VisualComparator {
  constructor(options = {}) {
    this.threshold = options.threshold || 0.01;
    this.includeAA = options.includeAA !== false;
  }

  async compare(image1, image2) {
    // Nota: Para comparación real, se usaría una librería como pixelmatch
    // Esta es una implementación simplificada
    
    const size1 = image1.length;
    const size2 = image2.length;
    
    if (size1 !== size2) {
      return {
        match: false,
        diffPixels: Math.abs(size1 - size2),
        diffPercentage: (Math.abs(size1 - size2) / Math.max(size1, size2)) * 100,
        baselinePath: ''
      };
    }
    
    // Comparación byte a byte (simplificada)
    let diffPixels = 0;
    for (let i = 0; i < size1; i++) {
      if (image1[i] !== image2[i]) {
        diffPixels++;
      }
    }
    
    const diffPercentage = (diffPixels / size1) * 100;
    const match = diffPercentage <= (this.threshold * 100);
    
    return {
      match,
      diffPixels,
      diffPercentage,
      baselinePath: ''
    };
  }

  async generateDiff(image1, image2, outputPath) {
    // Nota: Para generación real de diff, se usaría pixelmatch
    // Esta es una implementación placeholder
    
    const diffDir = path.dirname(outputPath);
    if (!fs.existsSync(diffDir)) {
      fs.mkdirSync(diffDir, { recursive: true });
    }
    
    // Guardar una de las imágenes como diff (placeholder)
    fs.writeFileSync(outputPath, image1);
    
    console.log(`📊 Diff generado: ${outputPath}`);
    return outputPath;
  }
}

/**
 * BaselineManager Class - Solución Completa
 */
class BaselineManager {
  constructor(baselineDir) {
    this.baselineDir = baselineDir || path.join(__dirname, '../baselines');
  }

  copyBaselines(sourceBrowser, targetBrowser) {
    const sourceDir = path.join(this.baselineDir, sourceBrowser);
    const targetDir = path.join(this.baselineDir, targetBrowser);
    
    if (!fs.existsSync(sourceDir)) {
      console.log(`⚠️  Directorio origen no existe: ${sourceBrowser}`);
      return;
    }
    
    // Crear directorio destino
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Copiar todos los archivos
    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      fs.copyFileSync(sourcePath, targetPath);
    });
    
    console.log(`📋 ${files.length} baselines copiados: ${sourceBrowser} → ${targetBrowser}`);
  }

  syncBaselines(browsers) {
    // Obtener todos los baselines únicos
    const allBaselines = new Set();
    
    browsers.forEach(browser => {
      const browserDir = path.join(this.baselineDir, browser);
      if (fs.existsSync(browserDir)) {
        const files = fs.readdirSync(browserDir);
        files.forEach(file => allBaselines.add(file));
      }
    });
    
    // Asegurar que todos los navegadores tengan todos los baselines
    browsers.forEach(browser => {
      const browserDir = path.join(this.baselineDir, browser);
      if (!fs.existsSync(browserDir)) {
        fs.mkdirSync(browserDir, { recursive: true });
      }
      
      const existingFiles = new Set(fs.readdirSync(browserDir));
      
      allBaselines.forEach(baseline => {
        if (!existingFiles.has(baseline)) {
          // Copiar desde el primer navegador que lo tenga
          for (const sourceBrowser of browsers) {
            const sourcePath = path.join(this.baselineDir, sourceBrowser, baseline);
            if (fs.existsSync(sourcePath)) {
              const targetPath = path.join(browserDir, baseline);
              fs.copyFileSync(sourcePath, targetPath);
              break;
            }
          }
        }
      });
    });
    
    console.log(`🔄 Baselines sincronizados para: ${browsers.join(', ')}`);
  }

  cleanOldBaselines(daysOld = 30) {
    const cutoffDate = Date.now() - (daysOld * 24 * 60 * 60 * 1000);
    let deletedCount = 0;
    
    const browsers = fs.readdirSync(this.baselineDir);
    
    browsers.forEach(browser => {
      const browserDir = path.join(this.baselineDir, browser);
      if (!fs.statSync(browserDir).isDirectory()) return;
      
      const files = fs.readdirSync(browserDir);
      
      files.forEach(file => {
        const filePath = path.join(browserDir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.mtimeMs < cutoffDate) {
          fs.unlinkSync(filePath);
          deletedCount++;
        }
      });
    });
    
    console.log(`🧹 ${deletedCount} baselines antiguos eliminados (>${daysOld} días)`);
  }

  generateReport() {
    const report = {
      totalBaselines: 0,
      byBrowser: {},
      totalSize: 0
    };
    
    if (!fs.existsSync(this.baselineDir)) {
      return report;
    }
    
    const browsers = fs.readdirSync(this.baselineDir);
    
    browsers.forEach(browser => {
      const browserDir = path.join(this.baselineDir, browser);
      if (!fs.statSync(browserDir).isDirectory()) return;
      
      const files = fs.readdirSync(browserDir);
      const pngFiles = files.filter(f => f.endsWith('.png'));
      
      report.byBrowser[browser] = pngFiles.length;
      report.totalBaselines += pngFiles.length;
      
      // Calcular tamaño total
      pngFiles.forEach(file => {
        const filePath = path.join(browserDir, file);
        const stats = fs.statSync(filePath);
        report.totalSize += stats.size;
      });
    });
    
    return report;
  }
}

// ============================================================================
// TESTS DE DEMOSTRACIÓN
// ============================================================================

test.describe('Visual Testing - Solution Demo', () => {

  test('demo: capture and compare baseline', async ({ page, browserName }) => {
    const visualTester = new VisualTester(page, {
      browser: browserName,
      threshold: 0.01
    });

    await page.goto('https://playwright.dev');
    
    // Capturar baseline si no existe
    if (!visualTester.baselineExists('playwright-homepage')) {
      await visualTester.captureBaseline('playwright-homepage');
    }
    
    // Comparar con baseline
    const result = await visualTester.compareWithBaseline('playwright-homepage');
    console.log('Resultado de comparación:', result);
  });

  test('demo: capture with masking', async ({ page }) => {
    const visualTester = new VisualTester(page);

    await page.goto('https://playwright.dev');
    
    // Capturar con elementos enmascarados
    const screenshot = await visualTester.captureWithMask(
      'masked-homepage',
      ['.theme-doc-version-badge'] // Enmascar elementos dinámicos
    );
    
    expect(screenshot).toBeDefined();
  });

  test('demo: baseline management', async () => {
    const manager = new BaselineManager();
    
    // Generar reporte
    const report = manager.generateReport();
    console.log('Reporte de baselines:', report);
    
    expect(report).toHaveProperty('totalBaselines');
    expect(report).toHaveProperty('byBrowser');
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
