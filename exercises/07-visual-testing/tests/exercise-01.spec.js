/**
 * Validation Tests for Exercise 01: VisualTester Utility
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('Exercise 01 Validation', () => {

  test.describe('File Structure', () => {
    
    test('should have JavaScript exercise file', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-01-visual-tester.js');
      expect(fs.existsSync(exercisePath)).toBeTruthy();
      
      const content = fs.readFileSync(exercisePath, 'utf-8');
      expect(content.length).toBeGreaterThan(2000);
    });

    test('should have TypeScript exercise file', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-01-visual-tester.ts');
      expect(fs.existsSync(exercisePath)).toBeTruthy();
      
      const content = fs.readFileSync(exercisePath, 'utf-8');
      expect(content.length).toBeGreaterThan(1000);
    });

    test('should have solution file', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-01-visual-tester.js');
      expect(fs.existsSync(solutionPath)).toBeTruthy();
      
      const content = fs.readFileSync(solutionPath, 'utf-8');
      expect(content.length).toBeGreaterThan(2000);
    });

  });

  test.describe('Exercise Content', () => {

    test('JavaScript exercise should have VisualTester class', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-01-visual-tester.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('class VisualTester');
      expect(content).toContain('captureBaseline');
      expect(content).toContain('compareWithBaseline');
    });

    test('TypeScript exercise should have type definitions', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-01-visual-tester.ts');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('interface VisualTesterOptions');
      expect(content).toContain('interface ComparisonResult');
    });

    test('exercises should have key methods', () => {
      const exercisePath = path.join(__dirname, '../exercises/exercise-01-visual-tester.js');
      const content = fs.readFileSync(exercisePath, 'utf-8');
      
      expect(content).toContain('captureFullPage');
      expect(content).toContain('captureElement');
      expect(content).toContain('captureWithMask');
      expect(content).toContain('getBaselinePath');
      expect(content).toContain('baselineExists');
    });

  });

  test.describe('Solution Content', () => {

    test('solution should have implementations', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-01-visual-tester.js');
      const content = fs.readFileSync(solutionPath, 'utf-8');
      
      expect(content).toContain('fs.mkdirSync');
      expect(content).toContain('page.screenshot');
      expect(content).toContain('toHaveScreenshot');
    });

    test('solution should have all three classes', () => {
      const solutionPath = path.join(__dirname, '../solutions/solution-01-visual-tester.js');
      const content = fs.readFileSync(solutionPath, 'utf-8');
      
      expect(content).toContain('class VisualTester');
      expect(content).toContain('class VisualComparator');
      expect(content).toContain('class BaselineManager');
    });

  });

});
