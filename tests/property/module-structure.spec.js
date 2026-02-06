/**
 * Property-Based Tests para Estructura de Módulos
 * 
 * Feature: playwright-mastery-practice
 * Property 10: Module Exercise Completeness
 * 
 * Valida: Requirements 1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6
 * 
 * Propiedad: Para cualquier módulo de ejercicios, DEBE contener archivos
 * de ejercicios que cubran todos los objetivos listados en su README.md
 */

const { test, expect } = require('@playwright/test');
const fc = require('fast-check');
const ExerciseLoader = require('../../exercises/utils/ExerciseLoader');
const ExerciseValidator = require('../../exercises/utils/ExerciseValidator');
const fs = require('fs');
const path = require('path');

test.describe('Property 10: Module Exercise Completeness @Property', () => {
  
  let loader;
  let validator;
  
  test.beforeAll(() => {
    loader = new ExerciseLoader();
    validator = new ExerciseValidator(loader);
  });

  test('todos los módulos deben tener estructura de directorios completa', async () => {
    const modules = loader.discoverModules();
    
    // Si no hay módulos aún, el test pasa (sistema recién inicializado)
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      const modulePath = module.path;
      
      // Validar que existe el directorio del módulo
      expect(fs.existsSync(modulePath), 
        `Módulo ${module.id} debe existir en ${modulePath}`
      ).toBeTruthy();
      
      // Validar directorios requeridos
      const requiredDirs = ['exercises', 'solutions', 'tests'];
      for (const dir of requiredDirs) {
        const dirPath = path.join(modulePath, dir);
        expect(fs.existsSync(dirPath),
          `Módulo ${module.id} debe tener directorio ${dir}/`
        ).toBeTruthy();
      }
      
      // Validar que existe README.md
      expect(module.hasReadme,
        `Módulo ${module.id} debe tener README.md`
      ).toBeTruthy();
    }
  });

  test('todos los módulos deben tener al menos un ejercicio', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      expect(module.exercises.length,
        `Módulo ${module.id} debe tener al menos un ejercicio`
      ).toBeGreaterThan(0);
    }
  });

  test('todos los módulos deben tener objetivos documentados en README', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      const moduleDetails = loader.loadModule(module.id);
      
      expect(moduleDetails.objectives,
        `Módulo ${module.id} debe tener objetivos definidos`
      ).toBeDefined();
      
      expect(moduleDetails.objectives.length,
        `Módulo ${module.id} debe tener al menos un objetivo`
      ).toBeGreaterThan(0);
    }
  });

  test('todos los módulos deben pasar validación básica', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      const validation = validator.validateModule(module.id);
      
      // El módulo debe ser válido (sin errores críticos)
      expect(validation.valid,
        `Módulo ${module.id} debe ser válido. Errores: ${validation.errors.join(', ')}`
      ).toBeTruthy();
    }
  });

  test('la estructura de módulos debe ser consistente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    // Todos los módulos deben seguir el patrón XX-nombre
    for (const module of modules) {
      expect(module.id).toMatch(/^\d{2}-[a-z-]+$/,
        `Módulo ${module.id} debe seguir el patrón XX-nombre-en-kebab-case`
      );
      
      // El número de orden debe coincidir con el prefijo
      const orderFromName = parseInt(module.id.substring(0, 2), 10);
      expect(module.order).toBe(orderFromName,
        `Módulo ${module.id} tiene orden inconsistente`
      );
    }
  });

  test('los módulos deben estar ordenados secuencialmente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length <= 1) {
      console.log('ℹ️  Menos de 2 módulos - no se puede validar secuencia');
      return;
    }
    
    // Verificar que los números de orden son secuenciales
    for (let i = 0; i < modules.length - 1; i++) {
      expect(modules[i].order).toBeLessThan(modules[i + 1].order,
        `Módulos deben estar ordenados: ${modules[i].id} vs ${modules[i + 1].id}`
      );
    }
  });

  test('cada módulo debe tener balance entre ejercicios, soluciones y tests', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Debe haber al menos tantas soluciones como ejercicios únicos
      const uniqueExercises = new Set(module.exercises.map(e => e.name));
      const uniqueSolutions = new Set(module.solutions.map(s => 
        s.name.replace(/^solution-/, '')
      ));
      
      expect(uniqueSolutions.size,
        `Módulo ${module.id} debe tener soluciones para todos los ejercicios`
      ).toBeGreaterThanOrEqual(uniqueExercises.size);
    }
  });

  test('Property: completitud de módulos con fast-check', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    // Usar fast-check para generar casos de prueba
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...modules),
        async (module) => {
          // Propiedad: Todo módulo debe tener estructura válida
          const validation = validator.validateModule(module.id);
          
          // Debe tener README
          if (!module.hasReadme) return false;
          
          // Debe tener ejercicios
          if (module.exercises.length === 0) return false;
          
          // Debe tener soluciones
          if (module.solutions.length === 0) return false;
          
          // No debe tener errores críticos
          if (!validation.valid) return false;
          
          return true;
        }
      ),
      { 
        numRuns: Math.min(100, modules.length * 10),
        verbose: true
      }
    );
  });

});

test.describe('Validación de Sistema de Ejercicios @Property', () => {
  
  test('el sistema de carga de módulos debe funcionar correctamente', async () => {
    const loader = new ExerciseLoader();
    
    // El loader debe poder descubrir módulos sin errores
    expect(() => loader.discoverModules()).not.toThrow();
    
    // El loader debe poder obtener estadísticas
    expect(() => loader.getStatistics()).not.toThrow();
    
    const stats = loader.getStatistics();
    expect(stats).toHaveProperty('totalModules');
    expect(stats).toHaveProperty('totalExercises');
    expect(stats).toHaveProperty('totalSolutions');
    expect(stats).toHaveProperty('totalTests');
  });

  test('el sistema de validación debe funcionar correctamente', async () => {
    const loader = new ExerciseLoader();
    const validator = new ExerciseValidator(loader);
    
    // El validator debe poder validar todos los módulos sin errores
    expect(() => validator.validateAllModules()).not.toThrow();
    
    const result = validator.validateAllModules();
    expect(result).toHaveProperty('totalModules');
    expect(result).toHaveProperty('validModules');
    expect(result).toHaveProperty('invalidModules');
    expect(result).toHaveProperty('totalErrors');
    expect(result).toHaveProperty('totalWarnings');
  });

  test('el sistema debe generar reportes sin errores', async () => {
    const loader = new ExerciseLoader();
    const validator = new ExerciseValidator(loader);
    
    const validation = validator.validateAllModules();
    
    // Debe poder generar reporte sin errores
    expect(() => validator.generateReport(validation)).not.toThrow();
    
    const report = validator.generateReport(validation);
    expect(typeof report).toBe('string');
    expect(report.length).toBeGreaterThan(0);
  });

});
