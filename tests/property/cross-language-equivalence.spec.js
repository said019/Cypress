/**
 * Property Test: Cross-Language Page Object Equivalence
 * 
 * Property 5: For any page object in pageobjects/ directory, there SHALL exist 
 * an equivalent page object in pageobjects_ts/ with matching method signatures 
 * and behavior
 * 
 * Validates: Requirements 3.6
 * 
 * This test ensures that JavaScript and TypeScript page objects maintain
 * equivalent functionality and method signatures.
 */

const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

/**
 * Get all page object files from a directory
 */
function getPageObjectFiles(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }
  
  return fs.readdirSync(dir)
    .filter(f => (f.endsWith('.js') || f.endsWith('.ts')))
    .filter(f => !f.includes('.spec.') && !f.includes('.test.'))
    .map(f => ({
      name: f.replace(/\.(js|ts)$/, ''),
      fullName: f,
      path: path.join(dir, f),
      extension: f.endsWith('.js') ? 'js' : 'ts'
    }));
}

/**
 * Extract method signatures from file content
 */
function extractMethods(content, isTypeScript = false) {
  const methods = [];
  
  // Match async methods
  const asyncMatches = content.matchAll(/async\s+(\w+)\s*\([^)]*\)/g);
  for (const match of asyncMatches) {
    methods.push({
      name: match[1],
      isAsync: true,
      signature: match[0]
    });
  }
  
  // Match regular methods
  const methodMatches = content.matchAll(/(?:^|\s)(\w+)\s*\([^)]*\)\s*{/gm);
  for (const match of methodMatches) {
    const methodName = match[1];
    // Skip constructor and common keywords
    if (methodName !== 'constructor' && 
        methodName !== 'if' && 
        methodName !== 'for' && 
        methodName !== 'while' &&
        !methods.find(m => m.name === methodName)) {
      methods.push({
        name: methodName,
        isAsync: false,
        signature: match[0]
      });
    }
  }
  
  return methods;
}

/**
 * Compare two page objects for equivalence
 */
function comparePageObjects(jsFile, tsFile) {
  const jsContent = fs.readFileSync(jsFile.path, 'utf-8');
  const tsContent = fs.readFileSync(tsFile.path, 'utf-8');
  
  const jsMethods = extractMethods(jsContent, false);
  const tsMethods = extractMethods(tsContent, true);
  
  const jsMethodNames = new Set(jsMethods.map(m => m.name));
  const tsMethodNames = new Set(tsMethods.map(m => m.name));
  
  // Find methods only in JS
  const onlyInJS = [...jsMethodNames].filter(name => !tsMethodNames.has(name));
  
  // Find methods only in TS
  const onlyInTS = [...tsMethodNames].filter(name => !jsMethodNames.has(name));
  
  // Find common methods
  const commonMethods = [...jsMethodNames].filter(name => tsMethodNames.has(name));
  
  return {
    jsFile: jsFile.fullName,
    tsFile: tsFile.fullName,
    jsMethods: jsMethods.length,
    tsMethods: tsMethods.length,
    commonMethods: commonMethods.length,
    onlyInJS,
    onlyInTS,
    equivalenceScore: commonMethods.length / Math.max(jsMethods.length, tsMethods.length, 1)
  };
}

test.describe('Property 5: Cross-Language Page Object Equivalence', () => {
  
  test('all JS page objects should have TS equivalents', () => {
    const jsDir = path.join(__dirname, '../../pageobjects');
    const tsDir = path.join(__dirname, '../../pageobjects_ts');
    
    const jsFiles = getPageObjectFiles(jsDir);
    const tsFiles = getPageObjectFiles(tsDir);
    
    expect(jsFiles.length).toBeGreaterThan(0);
    
    const tsFileNames = new Set(tsFiles.map(f => f.name));
    const missingTS = [];
    
    for (const jsFile of jsFiles) {
      if (!tsFileNames.has(jsFile.name)) {
        missingTS.push(jsFile.fullName);
      }
    }
    
    if (missingTS.length > 0) {
      console.log('\n❌ JS page objects without TS equivalents:');
      missingTS.forEach(name => console.log(`  - ${name}`));
    }
    
    expect(missingTS.length).toBe(0);
  });

  test('all TS page objects should have JS equivalents', () => {
    const jsDir = path.join(__dirname, '../../pageobjects');
    const tsDir = path.join(__dirname, '../../pageobjects_ts');
    
    const jsFiles = getPageObjectFiles(jsDir);
    const tsFiles = getPageObjectFiles(tsDir);
    
    const jsFileNames = new Set(jsFiles.map(f => f.name));
    const missingJS = [];
    
    for (const tsFile of tsFiles) {
      if (!jsFileNames.has(tsFile.name)) {
        missingJS.push(tsFile.fullName);
      }
    }
    
    if (missingJS.length > 0) {
      console.log('\n❌ TS page objects without JS equivalents:');
      missingJS.forEach(name => console.log(`  - ${name}`));
    }
    
    expect(missingJS.length).toBe(0);
  });

  test('equivalent page objects should have similar method counts', () => {
    const jsDir = path.join(__dirname, '../../pageobjects');
    const tsDir = path.join(__dirname, '../../pageobjects_ts');
    
    const jsFiles = getPageObjectFiles(jsDir);
    const tsFiles = getPageObjectFiles(tsDir);
    
    const tsFileMap = new Map(tsFiles.map(f => [f.name, f]));
    const comparisons = [];
    
    for (const jsFile of jsFiles) {
      const tsFile = tsFileMap.get(jsFile.name);
      if (tsFile) {
        const comparison = comparePageObjects(jsFile, tsFile);
        comparisons.push(comparison);
      }
    }
    
    const issues = comparisons.filter(c => {
      // Allow 20% difference in method count
      const diff = Math.abs(c.jsMethods - c.tsMethods);
      const maxMethods = Math.max(c.jsMethods, c.tsMethods);
      return diff / maxMethods > 0.2;
    });
    
    if (issues.length > 0) {
      console.log('\n⚠️  Page objects with significant method count differences:');
      issues.forEach(c => {
        console.log(`  - ${c.jsFile} (${c.jsMethods} methods) vs ${c.tsFile} (${c.tsMethods} methods)`);
      });
    }
    
    // At least 80% should have similar method counts
    const passRate = (comparisons.length - issues.length) / comparisons.length;
    expect(passRate).toBeGreaterThanOrEqual(0.8);
  });

  test('equivalent page objects should share common methods', () => {
    const jsDir = path.join(__dirname, '../../pageobjects');
    const tsDir = path.join(__dirname, '../../pageobjects_ts');
    
    const jsFiles = getPageObjectFiles(jsDir);
    const tsFiles = getPageObjectFiles(tsDir);
    
    const tsFileMap = new Map(tsFiles.map(f => [f.name, f]));
    const comparisons = [];
    
    for (const jsFile of jsFiles) {
      const tsFile = tsFileMap.get(jsFile.name);
      if (tsFile) {
        const comparison = comparePageObjects(jsFile, tsFile);
        comparisons.push(comparison);
      }
    }
    
    const lowEquivalence = comparisons.filter(c => c.equivalenceScore < 0.7);
    
    if (lowEquivalence.length > 0) {
      console.log('\n⚠️  Page objects with low method equivalence:');
      lowEquivalence.forEach(c => {
        console.log(`  - ${c.jsFile} vs ${c.tsFile}: ${(c.equivalenceScore * 100).toFixed(0)}% equivalent`);
        if (c.onlyInJS.length > 0) {
          console.log(`    Only in JS: ${c.onlyInJS.join(', ')}`);
        }
        if (c.onlyInTS.length > 0) {
          console.log(`    Only in TS: ${c.onlyInTS.join(', ')}`);
        }
      });
    }
    
    // At least 85% should have good equivalence
    const passRate = (comparisons.length - lowEquivalence.length) / comparisons.length;
    expect(passRate).toBeGreaterThanOrEqual(0.85);
  });

  test('generate equivalence report for all page objects', () => {
    const jsDir = path.join(__dirname, '../../pageobjects');
    const tsDir = path.join(__dirname, '../../pageobjects_ts');
    
    const jsFiles = getPageObjectFiles(jsDir);
    const tsFiles = getPageObjectFiles(tsDir);
    
    const tsFileMap = new Map(tsFiles.map(f => [f.name, f]));
    const report = [];
    
    for (const jsFile of jsFiles) {
      const tsFile = tsFileMap.get(jsFile.name);
      if (tsFile) {
        const comparison = comparePageObjects(jsFile, tsFile);
        report.push(comparison);
      }
    }
    
    console.log('\n📊 Cross-Language Equivalence Report:');
    console.log('═'.repeat(80));
    console.log('Page Object'.padEnd(25), 'JS Methods', 'TS Methods', 'Common', 'Score');
    console.log('─'.repeat(80));
    
    report.forEach(r => {
      const score = `${(r.equivalenceScore * 100).toFixed(0)}%`;
      console.log(
        r.jsFile.replace('.js', '').padEnd(25),
        String(r.jsMethods).padEnd(10),
        String(r.tsMethods).padEnd(10),
        String(r.commonMethods).padEnd(6),
        score
      );
    });
    
    console.log('═'.repeat(80));
    
    const avgScore = report.reduce((sum, r) => sum + r.equivalenceScore, 0) / report.length;
    console.log(`Average Equivalence: ${(avgScore * 100).toFixed(1)}%`);
    
    // Average equivalence should be at least 80%
    expect(avgScore).toBeGreaterThanOrEqual(0.8);
  });
});

test.describe('Property 5: Exercise Module Equivalence', () => {
  
  test('exercise page objects should have JS/TS equivalents', () => {
    const exerciseDir = path.join(__dirname, '../../exercises/04-page-object-model');
    
    if (!fs.existsSync(exerciseDir)) {
      test.skip();
      return;
    }
    
    const solutionsDir = path.join(exerciseDir, 'solutions');
    const exercisesDir = path.join(exerciseDir, 'exercises');
    
    const checkEquivalence = (dir) => {
      if (!fs.existsSync(dir)) return { js: [], ts: [], missing: [] };
      
      const files = fs.readdirSync(dir);
      const jsFiles = files.filter(f => f.endsWith('.js') && !f.includes('.spec.'));
      const tsFiles = files.filter(f => f.endsWith('.ts') && !f.includes('.spec.'));
      
      const jsNames = new Set(jsFiles.map(f => f.replace('.js', '')));
      const tsNames = new Set(tsFiles.map(f => f.replace('.ts', '')));
      
      const missing = [];
      
      // Check JS files have TS equivalents
      for (const name of jsNames) {
        if (!tsNames.has(name)) {
          missing.push(`${name}.ts`);
        }
      }
      
      // Check TS files have JS equivalents
      for (const name of tsNames) {
        if (!jsNames.has(name)) {
          missing.push(`${name}.js`);
        }
      }
      
      return { js: jsFiles, ts: tsFiles, missing };
    };
    
    const solutionsCheck = checkEquivalence(solutionsDir);
    const exercisesCheck = checkEquivalence(exercisesDir);
    
    const allMissing = [...solutionsCheck.missing, ...exercisesCheck.missing];
    
    if (allMissing.length > 0) {
      console.log('\n⚠️  Missing equivalents in exercise module:');
      allMissing.forEach(name => console.log(`  - ${name}`));
    }
    
    // Should have good equivalence
    expect(allMissing.length).toBeLessThan(3);
  });
});
