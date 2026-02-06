/**
 * Property-Based Tests: JavaScript Example Executability
 * 
 * Feature: playwright-mastery-practice
 * Property 2: JavaScript Example Executability
 * 
 * Validates: Requirements 1.3
 * 
 * For any JavaScript example file in the examples/ or exercises/ directories, 
 * executing it with Node.js SHALL complete without syntax errors
 */

const { test, expect } = require('@playwright/test');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

test.describe('Property 2: JavaScript Example Executability', () => {
  
  test('todos los ejemplos JS deben ejecutarse sin errores de sintaxis', async () => {
    const jsExamplesDir = path.join(__dirname, '../../examples/js');
    
    if (!fs.existsSync(jsExamplesDir)) {
      test.skip();
      return;
    }
    
    const jsFiles = fs.readdirSync(jsExamplesDir)
      .filter(f => f.endsWith('.js'));
    
    let checkedFiles = 0;
    
    for (const jsFile of jsFiles) {
      const filePath = path.join(jsExamplesDir, jsFile);
      
      try {
        // Verificar sintaxis con node --check
        execSync(`node --check "${filePath}"`, { 
          encoding: 'utf-8',
          timeout: 5000 
        });
        checkedFiles++;
      } catch (error) {
        throw new Error(`Error de sintaxis en ${jsFile}: ${error.message}`);
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos JS en examples/`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('todos los ejercicios JS deben tener sintaxis válida', async () => {
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
        const filePath = path.join(exercisesPath, jsFile);
        
        try {
          // Verificar sintaxis con node --check
          execSync(`node --check "${filePath}"`, { 
            encoding: 'utf-8',
            timeout: 5000 
          });
          checkedFiles++;
        } catch (error) {
          throw new Error(`Error de sintaxis en ${module}/${jsFile}: ${error.message}`);
        }
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos JS de ejercicios`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('todas las soluciones JS deben tener sintaxis válida', async () => {
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
      
      const jsFiles = fs.readdirSync(solutionsPath)
        .filter(f => f.endsWith('.js'));
      
      for (const jsFile of jsFiles) {
        const filePath = path.join(solutionsPath, jsFile);
        
        try {
          // Verificar sintaxis con node --check
          execSync(`node --check "${filePath}"`, { 
            encoding: 'utf-8',
            timeout: 5000 
          });
          checkedFiles++;
        } catch (error) {
          throw new Error(`Error de sintaxis en ${module}/${jsFile}: ${error.message}`);
        }
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos JS de soluciones`);
    expect(checkedFiles).toBeGreaterThan(0);
  });

  test('Property 2: archivos JS no deben tener errores comunes', async () => {
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
        const filePath = path.join(exercisesPath, jsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar que no hay errores comunes
        const hasUnclosedBraces = (content.match(/{/g) || []).length !== (content.match(/}/g) || []).length;
        const hasUnclosedParens = (content.match(/\(/g) || []).length !== (content.match(/\)/g) || []).length;
        const hasUnclosedBrackets = (content.match(/\[/g) || []).length !== (content.match(/\]/g) || []).length;
        
        expect(hasUnclosedBraces, 
          `${module}/${jsFile} tiene llaves sin cerrar`).toBeFalsy();
        expect(hasUnclosedParens, 
          `${module}/${jsFile} tiene paréntesis sin cerrar`).toBeFalsy();
        expect(hasUnclosedBrackets, 
          `${module}/${jsFile} tiene corchetes sin cerrar`).toBeFalsy();
        
        checkedFiles++;
      }
    }
    
    console.log(`✓ Verificados ${checkedFiles} archivos sin errores comunes`);
  });

  test('Property 2: archivos JS deben usar sintaxis moderna', async () => {
    const exercisesDir = path.join(__dirname, '../../exercises');
    
    const modules = fs.readdirSync(exercisesDir)
      .filter(f => {
        const fullPath = path.join(exercisesDir, f);
        return fs.statSync(fullPath).isDirectory() && 
               f.match(/^\d{2}-/);
      });
    
    let checkedFiles = 0;
    let modernSyntaxCount = 0;
    
    for (const module of modules) {
      const exercisesPath = path.join(exercisesDir, module, 'exercises');
      
      if (!fs.existsSync(exercisesPath)) continue;
      
      const jsFiles = fs.readdirSync(exercisesPath)
        .filter(f => f.endsWith('.js'));
      
      for (const jsFile of jsFiles) {
        const filePath = path.join(exercisesPath, jsFile);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Verificar uso de sintaxis moderna (const, let, arrow functions, async/await)
        const usesModernSyntax = 
          content.includes('const ') || 
          content.includes('let ') || 
          content.includes('=>') || 
          content.includes('async ') ||
          content.includes('await ');
        
        if (usesModernSyntax) {
          modernSyntaxCount++;
        }
        
        checkedFiles++;
      }
    }
    
    // Al menos el 80% de los archivos deben usar sintaxis moderna
    const percentage = (modernSyntaxCount / checkedFiles) * 100;
    expect(percentage, 
      'Al menos 80% de los archivos JS deben usar sintaxis moderna').toBeGreaterThanOrEqual(80);
    
    console.log(`✓ ${modernSyntaxCount}/${checkedFiles} archivos usan sintaxis moderna (${percentage.toFixed(1)}%)`);
  });
});
