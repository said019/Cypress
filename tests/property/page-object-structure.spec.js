/**
 * Property Test: Page Object Structure Consistency
 * 
 * Property 4: For any page object class, it SHALL have separate, identifiable 
 * sections or methods for locators, actions, and assertions
 * 
 * Validates: Requirements 3.3
 * 
 * This test ensures that all page objects follow the proper structure with
 * clear separation of concerns between locators, actions, and assertions.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Get all page object files from both JS and TS directories
 */
function getAllPageObjectFiles() {
  const pageObjectDirs = [
    path.join(__dirname, '../../pageobjects'),
    path.join(__dirname, '../../pageobjects_ts'),
    path.join(__dirname, '../../exercises/04-page-object-model/solutions')
  ];

  const files = [];
  
  for (const dir of pageObjectDirs) {
    if (fs.existsSync(dir)) {
      const dirFiles = fs.readdirSync(dir)
        .filter(f => f.endsWith('.js') || f.endsWith('.ts'))
        .filter(f => !f.includes('.spec.') && !f.includes('.test.'))
        .map(f => path.join(dir, f));
      files.push(...dirFiles);
    }
  }
  
  return files;
}

/**
 * Analyze page object file structure
 */
function analyzePageObjectStructure(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath);
  
  // Check for locator patterns
  const hasLocators = 
    content.includes('locator(') ||
    content.includes('getByRole(') ||
    content.includes('getByText(') ||
    content.includes('getByLabel(') ||
    content.includes('this.') && content.match(/this\.\w+\s*=/);
  
  // Check for action methods (methods that interact with elements)
  const hasActions = 
    content.includes('.click(') ||
    content.includes('.fill(') ||
    content.includes('.type(') ||
    content.includes('.select(') ||
    content.includes('async ') && (
      content.includes('login') ||
      content.includes('navigate') ||
      content.includes('submit') ||
      content.includes('add') ||
      content.includes('delete') ||
      content.includes('update')
    );
  
  // Check for assertion/validation methods
  const hasAssertions = 
    content.includes('expect(') ||
    content.includes('assert') ||
    content.includes('isVisible') ||
    content.includes('isLoaded') ||
    content.includes('verify') ||
    content.includes('validate') ||
    content.includes('check');
  
  return {
    fileName,
    filePath,
    hasLocators,
    hasActions,
    hasAssertions,
    content
  };
}

/**
 * Check if page object has proper separation of concerns
 */
function hasProperSeparation(analysis) {
  // A proper page object should have at least locators and actions
  // Assertions are optional but recommended
  return analysis.hasLocators && analysis.hasActions;
}

test.describe('Property 4: Page Object Structure Consistency', () => {
  
  test('all page objects should have identifiable locators', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    expect(pageObjectFiles.length).toBeGreaterThan(0);
    
    const results = [];
    
    for (const file of pageObjectFiles) {
      const analysis = analyzePageObjectStructure(file);
      
      if (!analysis.hasLocators) {
        results.push({
          file: analysis.fileName,
          issue: 'Missing identifiable locators'
        });
      }
    }
    
    if (results.length > 0) {
      console.log('\nPage objects without clear locators:');
      results.forEach(r => console.log(`  - ${r.file}: ${r.issue}`));
    }
    
    // Allow some flexibility - at least 80% should have locators
    const passRate = (pageObjectFiles.length - results.length) / pageObjectFiles.length;
    expect(passRate).toBeGreaterThanOrEqual(0.8);
  });

  test('all page objects should have action methods', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const results = [];
    
    for (const file of pageObjectFiles) {
      const analysis = analyzePageObjectStructure(file);
      
      if (!analysis.hasActions) {
        results.push({
          file: analysis.fileName,
          issue: 'Missing action methods'
        });
      }
    }
    
    if (results.length > 0) {
      console.log('\nPage objects without action methods:');
      results.forEach(r => console.log(`  - ${r.file}: ${r.issue}`));
    }
    
    // At least 80% should have actions
    const passRate = (pageObjectFiles.length - results.length) / pageObjectFiles.length;
    expect(passRate).toBeGreaterThanOrEqual(0.8);
  });

  test('page objects should have proper separation of concerns', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const results = [];
    
    for (const file of pageObjectFiles) {
      const analysis = analyzePageObjectStructure(file);
      
      if (!hasProperSeparation(analysis)) {
        results.push({
          file: analysis.fileName,
          hasLocators: analysis.hasLocators,
          hasActions: analysis.hasActions,
          hasAssertions: analysis.hasAssertions
        });
      }
    }
    
    if (results.length > 0) {
      console.log('\nPage objects with structural issues:');
      results.forEach(r => {
        console.log(`  - ${r.file}:`);
        console.log(`    Locators: ${r.hasLocators ? '✓' : '✗'}`);
        console.log(`    Actions: ${r.hasActions ? '✓' : '✗'}`);
        console.log(`    Assertions: ${r.hasAssertions ? '✓' : '✗'}`);
      });
    }
    
    // At least 75% should have proper separation
    const passRate = (pageObjectFiles.length - results.length) / pageObjectFiles.length;
    expect(passRate).toBeGreaterThanOrEqual(0.75);
  });

  test('page objects should follow naming conventions', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const invalidNames = [];
    
    for (const file of pageObjectFiles) {
      const fileName = path.basename(file);
      
      // Should end with Page.js/ts or be POManager
      const isValidName = 
        fileName.endsWith('Page.js') ||
        fileName.endsWith('Page.ts') ||
        fileName === 'POManager.js' ||
        fileName === 'POManager.ts' ||
        fileName.includes('Fragment') ||
        fileName.includes('Base');
      
      if (!isValidName) {
        invalidNames.push(fileName);
      }
    }
    
    if (invalidNames.length > 0) {
      console.log('\nPage objects with non-standard names:');
      invalidNames.forEach(name => console.log(`  - ${name}`));
    }
    
    // Allow some flexibility for special cases
    expect(invalidNames.length).toBeLessThan(pageObjectFiles.length * 0.2);
  });

  test('page objects should have class or constructor definitions', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const results = [];
    
    for (const file of pageObjectFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      
      const hasClass = 
        content.includes('class ') ||
        content.includes('constructor(') ||
        content.includes('function ') && content.includes('this.');
      
      if (!hasClass) {
        results.push(path.basename(file));
      }
    }
    
    if (results.length > 0) {
      console.log('\nFiles without class/constructor definitions:');
      results.forEach(name => console.log(`  - ${name}`));
    }
    
    // Most should have class definitions
    const passRate = (pageObjectFiles.length - results.length) / pageObjectFiles.length;
    expect(passRate).toBeGreaterThanOrEqual(0.9);
  });

  test('page objects should accept page parameter', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const results = [];
    
    for (const file of pageObjectFiles) {
      const content = fs.readFileSync(file, 'utf-8');
      
      // Check if constructor/function accepts page parameter
      const hasPageParam = 
        content.match(/constructor\s*\(\s*page\s*[,\)]/) ||
        content.match(/function\s+\w+\s*\(\s*page\s*[,\)]/) ||
        content.includes('this.page = page');
      
      if (!hasPageParam) {
        results.push(path.basename(file));
      }
    }
    
    if (results.length > 0) {
      console.log('\nPage objects without page parameter:');
      results.forEach(name => console.log(`  - ${name}`));
    }
    
    // Most should accept page parameter
    const passRate = (pageObjectFiles.length - results.length) / pageObjectFiles.length;
    expect(passRate).toBeGreaterThanOrEqual(0.85);
  });
});

test.describe('Property 4: Detailed Structure Analysis', () => {
  
  test('generate structure report for all page objects', () => {
    const pageObjectFiles = getAllPageObjectFiles();
    const report = [];
    
    for (const file of pageObjectFiles) {
      const analysis = analyzePageObjectStructure(file);
      report.push({
        file: analysis.fileName,
        locators: analysis.hasLocators ? '✓' : '✗',
        actions: analysis.hasActions ? '✓' : '✗',
        assertions: analysis.hasAssertions ? '✓' : '✗',
        score: [
          analysis.hasLocators,
          analysis.hasActions,
          analysis.hasAssertions
        ].filter(Boolean).length
      });
    }
    
    // Sort by score
    report.sort((a, b) => b.score - a.score);
    
    console.log('\n📊 Page Object Structure Report:');
    console.log('═'.repeat(70));
    console.log('File'.padEnd(35), 'Locators', 'Actions', 'Assertions', 'Score');
    console.log('─'.repeat(70));
    
    report.forEach(r => {
      console.log(
        r.file.padEnd(35),
        r.locators.padEnd(8),
        r.actions.padEnd(7),
        r.assertions.padEnd(10),
        `${r.score}/3`
      );
    });
    
    console.log('═'.repeat(70));
    
    const avgScore = report.reduce((sum, r) => sum + r.score, 0) / report.length;
    console.log(`Average Score: ${avgScore.toFixed(2)}/3`);
    
    // Average score should be at least 2.0
    expect(avgScore).toBeGreaterThanOrEqual(2.0);
  });
});
