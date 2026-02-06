/**
 * Property-Based Tests para Emparejamiento Ejercicio-Solución
 * 
 * Feature: playwright-mastery-practice
 * Property 11: Exercise Solution Pairing
 * 
 * Valida: Requirements 1.5, 7.1, 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6
 * 
 * Propiedad: Para cualquier archivo de ejercicio en un subdirectorio exercises/,
 * DEBE existir un archivo de solución correspondiente en el subdirectorio solutions/
 * con el mismo nombre base.
 */

const { test, expect } = require('@playwright/test');
const fc = require('fast-check');
const ExerciseLoader = require('../../exercises/utils/ExerciseLoader');
const fs = require('fs');
const path = require('path');

test.describe('Property 11: Exercise Solution Pairing @Property', () => {
  
  let loader;
  
  test.beforeAll(() => {
    loader = new ExerciseLoader();
  });

  test('cada ejercicio debe tener su solución correspondiente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Crear mapa de soluciones por nombre base
      const solutionMap = new Map();
      for (const solution of module.solutions) {
        const baseName = solution.name.replace(/^solution-/, '');
        if (!solutionMap.has(baseName)) {
          solutionMap.set(baseName, []);
        }
        solutionMap.get(baseName).push(solution.language);
      }
      
      // Verificar cada ejercicio
      for (const exercise of module.exercises) {
        const baseName = exercise.name.replace(/^exercise-/, '');
        
        expect(solutionMap.has(baseName),
          `Módulo ${module.id}: Ejercicio ${exercise.name}.${exercise.language === 'javascript' ? 'js' : 'ts'} debe tener solución correspondiente`
        ).toBeTruthy();
        
        // Verificar que existe en el mismo lenguaje
        if (solutionMap.has(baseName)) {
          const solutionLanguages = solutionMap.get(baseName);
          expect(solutionLanguages.includes(exercise.language),
            `Módulo ${module.id}: Ejercicio ${exercise.name} (${exercise.language}) debe tener solución en el mismo lenguaje`
          ).toBeTruthy();
        }
      }
    }
  });

  test('cada solución debe corresponder a un ejercicio existente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Crear mapa de ejercicios por nombre base
      const exerciseMap = new Map();
      for (const exercise of module.exercises) {
        const baseName = exercise.name.replace(/^exercise-/, '');
        if (!exerciseMap.has(baseName)) {
          exerciseMap.set(baseName, []);
        }
        exerciseMap.get(baseName).push(exercise.language);
      }
      
      // Verificar cada solución
      for (const solution of module.solutions) {
        const baseName = solution.name.replace(/^solution-/, '');
        
        expect(exerciseMap.has(baseName),
          `Módulo ${module.id}: Solución ${solution.name}.${solution.language === 'javascript' ? 'js' : 'ts'} debe corresponder a un ejercicio existente`
        ).toBeTruthy();
      }
    }
  });

  test('los archivos de ejercicios deben existir físicamente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      for (const exercise of module.exercises) {
        expect(fs.existsSync(exercise.path),
          `Archivo de ejercicio debe existir: ${exercise.path}`
        ).toBeTruthy();
        
        // Verificar que es un archivo (no directorio)
        const stats = fs.statSync(exercise.path);
        expect(stats.isFile(),
          `${exercise.path} debe ser un archivo`
        ).toBeTruthy();
      }
    }
  });

  test('los archivos de soluciones deben existir físicamente', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      for (const solution of module.solutions) {
        expect(fs.existsSync(solution.path),
          `Archivo de solución debe existir: ${solution.path}`
        ).toBeTruthy();
        
        // Verificar que es un archivo (no directorio)
        const stats = fs.statSync(solution.path);
        expect(stats.isFile(),
          `${solution.path} debe ser un archivo`
        ).toBeTruthy();
      }
    }
  });

  test('los nombres de archivos deben seguir convenciones', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Ejercicios deben empezar con 'exercise-'
      for (const exercise of module.exercises) {
        expect(exercise.file).toMatch(/^exercise-\d+\.(js|ts)$/,
          `Archivo de ejercicio debe seguir patrón exercise-XX.js/ts: ${exercise.file}`
        );
      }
      
      // Soluciones deben empezar con 'solution-'
      for (const solution of module.solutions) {
        expect(solution.file).toMatch(/^solution-\d+\.(js|ts)$/,
          `Archivo de solución debe seguir patrón solution-XX.js/ts: ${solution.file}`
        );
      }
    }
  });

  test('debe haber balance entre ejercicios JS y TS', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      const jsExercises = module.exercises.filter(e => e.language === 'javascript');
      const tsExercises = module.exercises.filter(e => e.language === 'typescript');
      
      // Debe haber aproximadamente la misma cantidad de ejercicios JS y TS
      // (permitimos diferencia de 1 para casos impares)
      const diff = Math.abs(jsExercises.length - tsExercises.length);
      expect(diff).toBeLessThanOrEqual(1,
        `Módulo ${module.id} debe tener balance entre ejercicios JS (${jsExercises.length}) y TS (${tsExercises.length})`
      );
    }
  });

  test('debe haber balance entre soluciones JS y TS', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      const jsSolutions = module.solutions.filter(s => s.language === 'javascript');
      const tsSolutions = module.solutions.filter(s => s.language === 'typescript');
      
      // Debe haber aproximadamente la misma cantidad de soluciones JS y TS
      const diff = Math.abs(jsSolutions.length - tsSolutions.length);
      expect(diff).toBeLessThanOrEqual(1,
        `Módulo ${module.id} debe tener balance entre soluciones JS (${jsSolutions.length}) y TS (${tsSolutions.length})`
      );
    }
  });

  test('Property: emparejamiento con fast-check', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    // Recopilar todos los ejercicios de todos los módulos
    const allExercises = modules.flatMap(m => 
      m.exercises.map(e => ({ module: m, exercise: e }))
    );
    
    if (allExercises.length === 0) {
      console.log('ℹ️  No hay ejercicios todavía');
      return;
    }
    
    // Usar fast-check para verificar la propiedad en todos los ejercicios
    await fc.assert(
      fc.asyncProperty(
        fc.constantFrom(...allExercises),
        async ({ module, exercise }) => {
          // Propiedad: Todo ejercicio debe tener su solución
          const baseName = exercise.name.replace(/^exercise-/, '');
          const expectedSolutionName = `solution-${baseName}`;
          
          // Buscar solución correspondiente
          const solution = module.solutions.find(s => 
            s.name === expectedSolutionName && s.language === exercise.language
          );
          
          // La solución debe existir
          if (!solution) return false;
          
          // El archivo de solución debe existir físicamente
          if (!fs.existsSync(solution.path)) return false;
          
          return true;
        }
      ),
      { 
        numRuns: Math.min(100, allExercises.length),
        verbose: true
      }
    );
  });

  test('Property: simetría de emparejamiento', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Crear conjuntos de nombres base
      const exerciseBaseNames = new Set(
        module.exercises.map(e => e.name.replace(/^exercise-/, ''))
      );
      
      const solutionBaseNames = new Set(
        module.solutions.map(s => s.name.replace(/^solution-/, ''))
      );
      
      // Propiedad de simetría: todo ejercicio tiene solución
      for (const baseName of exerciseBaseNames) {
        expect(solutionBaseNames.has(baseName),
          `Módulo ${module.id}: Ejercicio ${baseName} debe tener solución`
        ).toBeTruthy();
      }
      
      // Propiedad inversa: toda solución tiene ejercicio
      for (const baseName of solutionBaseNames) {
        expect(exerciseBaseNames.has(baseName),
          `Módulo ${module.id}: Solución ${baseName} debe tener ejercicio`
        ).toBeTruthy();
      }
    }
  });

  test('Property: consistencia de lenguajes', async () => {
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Agrupar por nombre base
      const exercisesByBase = new Map();
      const solutionsByBase = new Map();
      
      for (const exercise of module.exercises) {
        const baseName = exercise.name.replace(/^exercise-/, '');
        if (!exercisesByBase.has(baseName)) {
          exercisesByBase.set(baseName, []);
        }
        exercisesByBase.get(baseName).push(exercise.language);
      }
      
      for (const solution of module.solutions) {
        const baseName = solution.name.replace(/^solution-/, '');
        if (!solutionsByBase.has(baseName)) {
          solutionsByBase.set(baseName, []);
        }
        solutionsByBase.get(baseName).push(solution.language);
      }
      
      // Propiedad: para cada ejercicio en un lenguaje, debe existir solución en ese lenguaje
      for (const [baseName, exerciseLanguages] of exercisesByBase.entries()) {
        const solutionLanguages = solutionsByBase.get(baseName) || [];
        
        for (const lang of exerciseLanguages) {
          expect(solutionLanguages.includes(lang),
            `Módulo ${module.id}: Ejercicio ${baseName} en ${lang} debe tener solución en ${lang}`
          ).toBeTruthy();
        }
      }
    }
  });

});

test.describe('Validación de Archivos de Ejercicios @Property', () => {
  
  test('los archivos de ejercicios deben tener extensión válida', async () => {
    const loader = new ExerciseLoader();
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      for (const exercise of module.exercises) {
        const ext = path.extname(exercise.file);
        expect(['.js', '.ts'].includes(ext),
          `Ejercicio debe tener extensión .js o .ts: ${exercise.file}`
        ).toBeTruthy();
      }
      
      for (const solution of module.solutions) {
        const ext = path.extname(solution.file);
        expect(['.js', '.ts'].includes(ext),
          `Solución debe tener extensión .js o .ts: ${solution.file}`
        ).toBeTruthy();
      }
    }
  });

  test('los archivos deben estar en los directorios correctos', async () => {
    const loader = new ExerciseLoader();
    const modules = loader.discoverModules();
    
    if (modules.length === 0) {
      console.log('ℹ️  No hay módulos todavía - sistema recién inicializado');
      return;
    }
    
    for (const module of modules) {
      // Ejercicios deben estar en exercises/
      for (const exercise of module.exercises) {
        expect(exercise.path.includes('/exercises/'),
          `Ejercicio debe estar en directorio exercises/: ${exercise.path}`
        ).toBeTruthy();
      }
      
      // Soluciones deben estar en solutions/
      for (const solution of module.solutions) {
        expect(solution.path.includes('/solutions/'),
          `Solución debe estar en directorio solutions/: ${solution.path}`
        ).toBeTruthy();
      }
    }
  });

});
