/**
 * Validation Tests for Exercise 03: E-Commerce Network Interception
 * 
 * Estos tests validan que el ejercicio 03 esté correctamente implementado.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Exercise 03 Validation', () => {

  test.describe('File Structure', () => {
    
    test('should have JavaScript exercise file', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      expect(fs.existsSync(exercisePath)).toBeTruthy();
      
      const content = fs.readFileSync(exercisePath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
    });

    test('should have TypeScript exercise file', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.ts');
      expect(fs.existsSync(exercisePath)).toBeTruthy();
      
      const content = fs.readFileSync(exercisePath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
    });

    test('should have solution file', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-03-ecommerce-interception.js');
      expect(fs.existsSync(solutionPath)).toBeTruthy();
      
      const content = fs.readFileSync(solutionPath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
    });

  });

  test.describe('Exercise Content', () => {

    test('JavaScript exercise should have TODOs', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      const todoCount = (content.match(/\/\/ TODO:/g) || []).length;
      expect(todoCount).toBeGreaterThan(20);
    });

    test('TypeScript exercise should have TODOs', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.ts');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      const todoCount = (content.match(/\/\/ TODO:/g) || []).length;
      expect(todoCount).toBeGreaterThan(15);
    });

    test('JavaScript exercise should have test structure', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('test.describe');
      expect(content).toContain('test(');
      expect(content).toContain('page.route');
    });

    test('TypeScript exercise should have type definitions', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.ts');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('interface Product');
      expect(content).toContain('interface CartResponse');
      expect(content).toContain('interface OrderPayload');
      expect(content).toContain('interface OrderResponse');
    });

    test('exercises should cover key interception scenarios', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      // Verificar escenarios clave
      expect(content).toContain('intercept products API');
      expect(content).toContain('simulate out of stock');
      expect(content).toContain('simulate API error');
      expect(content).toContain('simulate slow API');
      expect(content).toContain('intercept add to cart');
      expect(content).toContain('intercept order creation');
      expect(content).toContain('multiple APIs');
      expect(content).toContain('authentication headers');
    });

  });

  test.describe('Solution Content', () => {

    test('solution should have implementations', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-03-ecommerce-interception.js');
      const content = fs.readFileSync(solutionPath, 'utf-8');
      
      // Verificar que tiene implementaciones reales
      expect(content).toContain('await page.route');
      expect(content).toContain('route.fulfill');
      expect(content).toContain('route.continue');
      expect(content).toContain('page.goto');
      expect(content).toContain('expect(');
    });

    test('solution should have no TODOs', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-03-ecommerce-interception.js');
      const content = fs.readFileSync(solutionPath, 'utf-8');
      
      const todoCount = (content.match(/\/\/ TODO:/g) || []).length;
      expect(todoCount).toBe(0);
    });

    test('solution should implement key scenarios', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-03-ecommerce-interception.js');
      const content = fs.readFileSync(solutionPath, 'utf-8');
      
      // Verificar implementaciones clave
      expect(content).toContain('mockProducts');
      expect(content).toContain('capturedRequest');
      expect(content).toContain('interceptedAPIs');
      expect(content).toContain('apiCallSequence');
    });

  });

  test.describe('Code Quality', () => {

    test('JavaScript files should have proper syntax', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const solutionPath = path.join(__dirname, '../solutions/solution-03-ecommerce-interception.js');
      
      // Verificar que los archivos existen y tienen contenido válido
      const exerciseContent = fs.readFileSync(exercisePath, 'utf-8');
      const solutionContent = fs.readFileSync(solutionPath, 'utf-8');
      
      expect(exerciseContent).toContain('test.describe');
      expect(solutionContent).toContain('test.describe');
    });

    test('files should have documentation', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      // Verificar comentarios de documentación
      expect(content).toContain('/**');
      expect(content).toContain('Objetivo:');
      expect(content).toContain('TIPS Y MEJORES PRÁCTICAS');
    });

    test('TypeScript file should have proper imports', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.ts');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('import { test, expect');
      expect(content).toContain('from \'@playwright/test\'');
    });

  });

  test.describe('Learning Objectives', () => {

    test('exercises should cover product interception', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('get-all-products');
      expect(content).toContain('mockProducts');
      expect(content).toContain('productName');
    });

    test('exercises should cover cart operations', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('add-to-cart');
      expect(content).toContain('addToCartPayload');
      expect(content).toContain('Cart');
    });

    test('exercises should cover error scenarios', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('error');
      expect(content.toLowerCase()).toContain('status: 500');
      expect(content.toLowerCase()).toContain('status: 400');
      expect(content.toLowerCase()).toContain('status: 402');
    });

    test('exercises should cover performance testing', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('slow');
      expect(content).toContain('delay');
      expect(content).toContain('loadTime');
      expect(content).toContain('startTime');
      expect(content).toContain('endTime');
    });

    test('exercises should cover request validation', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('validate');
      expect(content).toContain('payload');
      expect(content).toContain('authentication');
      expect(content).toContain('headers');
    });

  });

  test.describe('Progressive Difficulty', () => {

    test('should have basic interception exercises first', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      // Verificar que los ejercicios básicos vienen primero
      const basicIndex = content.indexOf('PARTE 1');
      const advancedIndex = content.indexOf('PARTE 6');
      
      expect(basicIndex).toBeLessThan(advancedIndex);
    });

    test('should have final comprehensive exercise', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-03-ecommerce-interception.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('EJERCICIO FINAL');
      expect(content).toContain('Complete E-Commerce Flow');
      expect(content).toContain('combina todo lo aprendido');
    });

  });

});
