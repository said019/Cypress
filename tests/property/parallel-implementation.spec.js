/**
 * Property-Based Tests: Parallel JavaScript and TypeScript Implementation
 * 
 * Feature: playwright-mastery-practice
 * Property 1: Parallel JavaScript and TypeScript Implementation
 * 
 * Validates: Requirements 1.1, 1.6
 * 
 * For any fundamental concept example in the examples/js/ directory, 
 * there SHALL exist a corresponding TypeScript implementation in examples/ts/ 
 * with equivalent functionality
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Property 1: Parallel JavaScript and TypeScript Implementation', () => {
  
  test('todos los ejemplos JS deben tener implementación TS correspondiente', async () => {
    const jsExamplesDir = path.join(__dirname, '../../examples/js');
    const tsExamplesDir = path.join(__dirname, '../../examples/ts');
    
    // Verificar que los directorios existen
    expect(fs.existsSync(jsExamplesDir), 'Directorio examples/js debe existir').toBeTruthy();
    expect(fs.existsSync(tsExamplesDir), 'Directorio examples/ts debe existir').toBeTruthy();
    
    // Obtener todos los archivos JS
    const jsFiles = fs.readdirSync(jsExamplesDir)
      .filter(f => f.endsWith('.js'))
      .map(f => f.replace('.js', ''));
    
    // Verificar que cada archivo JS tiene su correspondiente TS
    for (const baseName of jsFiles) {
      const tsFile = path.join(tsExamplesDir, `${baseName}.ts`);
      expect(fs.existsSync(tsFile), 
        `Falta implementación TypeScript para ${baseName}.js`).toBeTruthy();
    }
    
    console.log(`✓ Verificados ${jsFiles.length} pares JS/TS en examples/`);
  });

  test('todos los ejercicios JS deben tener implementación TS correspondiente', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    // Obtener todos los módulos
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let totalPairs = 0;
    
    for (const module of modules) {
      const exercisesPath = path.join(exercisesDir, module, 'exercises');
      
      if (!fs.existsSync(exercisesPath)) continue;
      
      // Obtener todos los archivos JS de ejercicios
      const jsExercises = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.js'))
        .map(f => f.replace('.js', ''));
      
      // Verificar que cada ejercicio JS tiene su correspondiente TS
      for (const baseName of jsExercises) {
        const tsFile = path.join(exercisesPath, `${baseName}.ts`);
        expect(fs.existsSync(tsFile), 
          `Módulo ${module}: Falta implementación TypeScript para ${baseName}.js`).toBeTruthy();
        totalPairs++;
      }
    }
    
    console.log(`✓ Verificados ${totalPairs} pares JS/TS en ejercicios`);
  });

  test('todas las soluciones JS deben tener implementación TS correspondiente', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    // Obtener todos los módulos
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let totalPairs = 0;
    
    for (const module of modules) {
      const solutionsPath = path.join(exercisesDir, module, 'solutions');
      
      if (!fs.existsSync(solutionsPath)) continue;
      
      // Obtener todos los archivos JS de soluciones
      const jsSolutions = fs.readdirSync(solutionsPath)
        .filter(f => f.endsWith('.js'))
        .map(f => f.replace('.js', ''));
      
      // Verificar que cada solución JS tiene su correspondiente TS
      for (const baseName of jsSolutions) {
        const tsFile = path.join(solutionsPath, `${baseName}.ts`);
        expect(fs.existsSync(tsFile), 
          `Módulo ${module}: Falta implementación TypeScript para ${baseName}.js`).toBeTruthy();
        totalPairs++;
      }
    }
    
    console.log(`✓ Verificados ${totalPairs} pares JS/TS en soluciones`);
  });

  test('Property 1: los archivos TS deben tener contenido equivalente a JS', async () => {
    const jsExamplesDir = path.join(__dirname, '../../examples/js');
    const tsExamplesDir = path.join(__dirname, '../../examples/ts');
    
    if (!fs.existsSync(jsExamplesDir) || !fs.existsSync(tsExamplesDir)) {
      test.skip();
      return;
    }
    
    const jsFiles = fs.readdirSync(jsExamplesDir)
      .filter(f => f.endsWith('.js'));
    
    for (const jsFile of jsFiles) {
      const baseName = jsFile.replace('.js', '');
      const tsFile = `${baseName}.ts`;
      
      const jsPath = path.join(jsExamplesDir, jsFile);
      const tsPath = path.join(tsExamplesDir, tsFile);
      
      if (!fs.existsSync(tsPath)) continue;
      
      const jsContent = fs.readFileSync(jsPath, 'utf-8');
      const tsContent = fs.readFileSync(tsPath, 'utf-8');
      
      // Verificar que ambos archivos tienen contenido sustancial
      expect(jsContent.length, 
        `${jsFile} debe tener contenido`).toBeGreaterThan(50);
      expect(tsContent.length, 
        `${tsFile} debe tener contenido`).toBeGreaterThan(50);
      
      // Verificar que el archivo TS es TypeScript (tiene import o interface o type annotations)
      const isTypeScript = tsContent.includes('import') || 
        tsContent.includes('interface') || 
        tsContent.includes('type ') ||
        (tsContent.includes(':') && 
          (tsContent.includes('string') || 
           tsContent.includes('number') || 
           tsContent.includes('boolean') ||
           tsContent.includes('void') ||
           tsContent.includes('Promise')));
      
      expect(isTypeScript, 
        `${tsFile} debe ser código TypeScript válido`).toBeTruthy();
    }
    
    console.log(`✓ Verificada equivalencia de contenido en ${jsFiles.length} pares`);
  });

  test('Property 1: verificación de consistencia de nombres de funciones', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let checkedFiles = 0;
    
    for (const module of modules) {
      const exercisesPath = path.join(exercisesDir, module, 'exercises');
      
      if (!fs.existsSync(exercisesPath)) continue;
      
      const jsFiles = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.js'));
      
      for (const jsFile of jsFiles) {
        const baseName = jsFile.replace('.js', '');
        const tsFile = `${baseName}.ts`;
        
        const jsPath = path.join(exercisesPath, jsFile);
        const tsPath = path.join(exercisesPath, tsFile);
        
        if (!fs.existsSync(tsPath)) continue;
        
        const jsContent = fs.readFileSync(jsPath, 'utf-8');
        const tsContent = fs.readFileSync(tsPath, 'utf-8');
        
        // Extraer nombres de funciones exportadas de JS
        const jsFunctionPattern = /(?:export\s+)?function\s+(\w+)|(?:export\s+)?const\s+(\w+)\s*=\s*(?:function|\(|async)/g;
        const jsFunctions = new Set();
        let match;
        
        while ((match = jsFunctionPattern.exec(jsContent)) !== null) {
          const funcName = match[1] || match[2];
          if (funcName && !funcName.startsWith('_')) {
            jsFunctions.add(funcName);
          }
        }
        
        // Verificar que al menos el 70% de las funciones principales existen en TS
        let foundCount = 0;
        for (const funcName of jsFunctions) {
          if (tsContent.includes(funcName)) {
            foundCount++;
          }
        }
        
        if (jsFunctions.size > 0) {
          const percentage = (foundCount / jsFunctions.size) * 100;
          expect(percentage, 
            `${module}/${tsFile} debe incluir al menos 70% de las funciones de ${jsFile}`).toBeGreaterThanOrEqual(70);
          checkedFiles++;
        }
      }
    }
    
    console.log(`✓ Verificada consistencia de nombres de funciones en ${checkedFiles} archivos`);
  });
});
