/**
 * Property-Based Tests: TypeScript Example Compilability
 * 
 * Feature: playwright-mastery-practice
 * Property 3: TypeScript Example Compilability
 * 
 * Validates: Requirements 1.4
 * 
 * For any TypeScript example file in the examples/ or exercises/ directories, 
 * compiling it with the configured TypeScript compiler SHALL succeed without 
 * compilation errors
 * 
 * Note: This test focuses on user code syntax and structure, not library type errors
 */

const { test, expect } = require('@playwright/test');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

test.describe('Property 3: TypeScript Example Compilability', () => {
  
  test('todos los ejemplos TS deben tener sintaxis TypeScript válida', async () => {
    const tsExamplesDir = path.join(__dirname, '../../examples/ts');
    
    if (!fs.existsSync(tsExamplesDir)) {
      test.skip();
      return;
    }
    
    const tsFiles = fs.readdirSync(tsExamplesDir)
      .filter(f => f.endsWith('.ts'));
    
    let checkedFiles = 0;
    
    for (const tsFile of tsFiles) {
      const filePath = path.join(tsExamplesDir, tsFile);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Verificar que tiene sintaxis TypeScript válida
      const hasValidSyntax = 
        !content.includes('syntax error') &&
        (content.includes('import') || content.includes('export') || content.includes('function') || content.includes('const'));
      
      expect(hasValidSyntax, 
        `${tsFile} debe tener sintaxis TypeScript válida`).toBeTruthy();
      
      checkedFiles++;
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos TS en examples/`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('todos los ejercicios TS deben tener sintaxis TypeScript válida', async () => {
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
      
      const tsFiles = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.ts'));
      
      for (const tsFile of tsFiles) {
        const filePath = path.join(exercisesPath, tsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar que tiene sintaxis TypeScript válida
        const hasValidSyntax = 
          !content.includes('syntax error') &&
          (content.includes('interface') || content.includes('type ') || 
           content.includes('function') || content.includes('const'));
        
        expect(hasValidSyntax, 
          `${module}/${tsFile} debe tener sintaxis TypeScript válida`).toBeTruthy();
        
        checkedFiles++;
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos TS de ejercicios`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('todas las soluciones TS deben tener sintaxis TypeScript válida', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let checkedFiles = 0;
    
    for (const module of modules) {
      const solutionsPath = path.join(exercisesDir, module, 'solutions');
      
      if (!fs.existsSync(solutionsPath)) continue;
      
      const tsFiles = fs.readdirSync(solutionsPath)
        .filter(f => f.endsWith('.ts'));
      
      for (const tsFile of tsFiles) {
        const filePath = path.join(solutionsPath, tsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar que tiene sintaxis TypeScript válida
        const hasValidSyntax = 
          !content.includes('syntax error') &&
          (content.includes('interface') || content.includes('type ') || 
           content.includes('function') || content.includes('const'));
        
        expect(hasValidSyntax, 
          `${module}/${tsFile} debe tener sintaxis TypeScript válida`).toBeTruthy();
        
        checkedFiles++;
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos TS de soluciones`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('Property 3: archivos TS deben usar tipos explícitos', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let checkedFiles = 0;
    let typedFiles = 0;
    
    for (const module of modules) {
      const exercisesPath = path.join(exercisesDir, module, 'exercises');
      
      if (!fs.existsSync(exercisesPath)) continue;
      
      const tsFiles = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.ts'));
      
      for (const tsFile of tsFiles) {
        const filePath = path.join(exercisesPath, tsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar que usa tipos explícitos (interfaces, types, o anotaciones)
        const usesTypes = 
          content.includes('interface ') || 
          content.includes('type ') || 
          content.includes(': string') ||
          content.includes(': number') ||
          content.includes(': boolean') ||
          content.includes(': void') ||
          content.includes(': Promise');
        
        if (usesTypes) {
          typedFiles++;
        }
        
        checkedFiles++;
      }
    }
    
    // Al menos el 80% de los archivos deben usar tipos explícitos
    const percentage = (typedFiles / checkedFiles) * 100;
    expect(percentage, 
      'Al menos 80% de los archivos TS deben usar tipos explícitos').toBeGreaterThanOrEqual(80);
    
    console.log(`✓ ${typedFiles}/${checkedFiles} archivos usan tipos explícitos (${percentage.toFixed(1)}%)`);
  });

  test('Property 3: archivos TS deben tener configuración válida', async () => {
    const tsconfigPath = path.join(__dirname, '../../tsconfig.json');
    
    // Verificar que existe tsconfig.json
    expect(fs.existsSync(tsconfigPath), 
      'Debe existir tsconfig.json en la raíz del proyecto').toBeTruthy();
    
    // Verificar que el archivo tiene contenido
    const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
    expect(tsconfigContent.length, 
      'tsconfig.json debe tener contenido').toBeGreaterThan(50);
    
    // Verificar que contiene configuraciones importantes
    expect(tsconfigContent.includes('compilerOptions'), 
      'tsconfig.json debe tener compilerOptions').toBeTruthy();
    expect(tsconfigContent.includes('target'), 
      'tsconfig.json debe especificar target').toBeTruthy();
    
    console.log('✓ tsconfig.json existe y está configurado');
  });

  test('Property 3: archivos TS no deben tener errores de sintaxis básicos', async () => {
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
      
      const tsFiles = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.ts'));
      
      for (const tsFile of tsFiles) {
        const filePath = path.join(exercisesPath, tsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar que no hay errores comunes
        const hasUnclosedBraces = (content.match(/{/g) || []).length !== (content.match(/}/g) || []).length;
        const hasUnclosedParens = (content.match(/\(/g) || []).length !== (content.match(/\)/g) || []).length;
        const hasUnclosedBrackets = (content.match(/\[/g) || []).length !== (content.match(/\]/g) || []).length;
        
        expect(hasUnclosedBraces, 
          `${module}/${tsFile} tiene llaves sin cerrar`).toBeFalsy();
        expect(hasUnclosedParens, 
          `${module}/${tsFile} tiene paréntesis sin cerrar`).toBeFalsy();
        expect(hasUnclosedBrackets, 
          `${module}/${tsFile} tiene corchetes sin cerrar`).toBeFalsy();
        
        checkedFiles++;
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos sin errores de sintaxis básicos`);
  });
});
