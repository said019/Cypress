# Utilidades del Sistema de Ejercicios

Este directorio contiene las utilidades principales para gestionar el sistema de ejercicios de Playwright.

## 📦 Componentes

### ExerciseLoader.js
Carga y descubre módulos de ejercicios disponibles.

**Funcionalidades:**
- Descubre automáticamente módulos en el directorio `exercises/`
- Carga información detallada de cada módulo
- Extrae objetivos de los archivos README
- Proporciona estadísticas generales

**Uso:**
```javascript
const ExerciseLoader = require('./ExerciseLoader');
const loader = new ExerciseLoader();

// Descubrir todos los módulos
const modules = loader.discoverModules();

// Cargar un módulo específico
const module = loader.loadModule('01-fundamentals');

// Obtener estadísticas
const stats = loader.getStatistics();
```

### ExerciseValidator.js
Valida la estructura y completitud de los módulos de ejercicios.

**Funcionalidades:**
- Valida que los módulos tengan la estructura correcta
- Verifica pares JS/TS para ejercicios
- Valida que cada ejercicio tenga su solución
- Genera reportes de validación detallados

**Uso:**
```javascript
const ExerciseValidator = require('./ExerciseValidator');
const validator = new ExerciseValidator(loader);

// Validar un módulo específico
const result = validator.validateModule('01-fundamentals');

// Validar todos los módulos
const allResults = validator.validateAllModules();

// Generar reporte
const report = validator.generateReport(result);
console.log(report);
```

### ProgressTracker.js
Rastrea el progreso del aprendiz a través de los módulos.

**Funcionalidades:**
- Registra ejercicios iniciados y completados
- Calcula progreso por módulo y general
- Guarda estado en archivo `.progress.json`
- Genera reportes de progreso

**Uso:**
```javascript
const ProgressTracker = require('./ProgressTracker');
const tracker = new ProgressTracker();

// Iniciar un ejercicio
tracker.startExercise('01-fundamentals', 'exercise-01');

// Completar un ejercicio
tracker.completeExercise('01-fundamentals', 'exercise-01', true);

// Obtener progreso
const progress = tracker.getOverallProgress(modules);

// Generar reporte
const report = tracker.generateReport(modules);
console.log(report);
```

### cli.js
Interfaz de línea de comandos para gestionar el sistema.

**Comandos disponibles:**
```bash
# Listar todos los módulos
node exercises/utils/cli.js list

# Validar módulos
node exercises/utils/cli.js validate
node exercises/utils/cli.js validate 01-fundamentals

# Ver progreso
node exercises/utils/cli.js progress

# Iniciar ejercicio
node exercises/utils/cli.js start 01-fundamentals exercise-01

# Completar ejercicio
node exercises/utils/cli.js complete 01-fundamentals exercise-01

# Ver estadísticas
node exercises/utils/cli.js stats

# Reiniciar progreso
node exercises/utils/cli.js reset --confirm

# Ayuda
node exercises/utils/cli.js help
```

## 🚀 Scripts NPM

También puedes usar los scripts definidos en `package.json`:

```bash
# Listar módulos
npm run exercises:list

# Validar módulos
npm run exercises:validate

# Ver progreso
npm run exercises:progress

# Ver estadísticas
npm run exercises:stats

# Ejecutar ejemplo de uso
npm run exercises:example
```

## 📊 Archivo de Progreso

El progreso se guarda automáticamente en `.progress.json` en la raíz del proyecto. Este archivo contiene:

```json
{
  "learnerId": "default",
  "startedAt": "2026-01-23T...",
  "lastActivity": "2026-01-23T...",
  "completedModules": [],
  "completedExercises": [],
  "currentModule": "01-fundamentals",
  "currentExercise": "exercise-01",
  "stats": {
    "totalExercises": 0,
    "completedExercises": 0,
    "passedTests": 0,
    "failedTests": 0,
    "totalTimeSpent": 0
  },
  "exerciseDetails": {}
}
```

## 🔧 Integración con Tests

Las utilidades están diseñadas para integrarse con property-based tests:

```javascript
// En un test de Playwright
const { test, expect } = require('@playwright/test');
const ExerciseLoader = require('../exercises/utils/ExerciseLoader');

test('Validar estructura de módulos', async () => {
  const loader = new ExerciseLoader();
  const modules = loader.discoverModules();
  
  expect(modules.length).toBeGreaterThan(0);
  
  for (const module of modules) {
    expect(module.hasReadme).toBeTruthy();
    expect(module.exercises.length).toBeGreaterThan(0);
  }
});
```

## 📝 Ejemplo Completo

Ver `example-usage.js` para un ejemplo completo de cómo usar todas las utilidades juntas.

```bash
node exercises/utils/example-usage.js
```

## 🛠️ Desarrollo

Si necesitas extender las utilidades:

1. Mantén la documentación JSDoc actualizada
2. Agrega tests para nuevas funcionalidades
3. Actualiza este README con ejemplos
4. Mantén la compatibilidad con el CLI

## 📚 Recursos

- [Documentación de Playwright](https://playwright.dev)
- [Fast-check para Property Testing](https://github.com/dubzzz/fast-check)
- [Guía de Módulos de Ejercicios](../README.md)
