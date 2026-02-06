# Sistema de Ejercicios - Playwright Mastery Practice

## 📖 Introducción

El Sistema de Ejercicios es una infraestructura completa para gestionar módulos de aprendizaje progresivo de Playwright. Proporciona herramientas para descubrir, validar y rastrear el progreso a través de ejercicios estructurados.

## 🏗️ Arquitectura

### Componentes Principales

```
Sistema de Ejercicios
├── ExerciseLoader      → Descubre y carga módulos
├── ExerciseValidator   → Valida estructura y completitud
├── ProgressTracker     → Rastrea progreso del aprendiz
└── CLI                 → Interfaz de línea de comandos
```

### Flujo de Trabajo

```
1. Descubrimiento
   ↓
2. Validación
   ↓
3. Ejecución de Ejercicios
   ↓
4. Seguimiento de Progreso
   ↓
5. Reportes
```

## 📁 Estructura de Directorios

```
exercises/
├── README.md                    # Documentación principal
├── MODULE_TEMPLATE.md           # Plantilla para nuevos módulos
├── utils/                       # Utilidades del sistema
│   ├── ExerciseLoader.js       # Carga módulos
│   ├── ExerciseValidator.js    # Valida módulos
│   ├── ProgressTracker.js      # Rastrea progreso
│   ├── cli.js                  # CLI
│   ├── example-usage.js        # Ejemplo de uso
│   └── README.md               # Documentación de utilidades
└── XX-nombre-modulo/           # Módulos de ejercicios
    ├── README.md               # Objetivos del módulo
    ├── exercises/              # Ejercicios a completar
    │   ├── exercise-01.js
    │   └── exercise-01.ts
    ├── solutions/              # Soluciones de referencia
    │   ├── solution-01.js
    │   └── solution-01.ts
    └── tests/                  # Tests de validación
        ├── exercise-01.spec.js
        └── exercise-01.spec.ts
```

## 🚀 Inicio Rápido

### 1. Listar Módulos Disponibles

```bash
npm run exercises:list
```

### 2. Ver Estadísticas

```bash
npm run exercises:stats
```

### 3. Validar Estructura

```bash
npm run exercises:validate
```

### 4. Ver Progreso

```bash
npm run exercises:progress
```

### 5. Ejecutar Ejemplo

```bash
npm run exercises:example
```

## 🎯 Uso del CLI

### Comandos Básicos

```bash
# Ver ayuda
node exercises/utils/cli.js help

# Listar módulos
node exercises/utils/cli.js list

# Validar todos los módulos
node exercises/utils/cli.js validate

# Validar un módulo específico
node exercises/utils/cli.js validate 01-fundamentals

# Ver progreso
node exercises/utils/cli.js progress

# Ver estadísticas
node exercises/utils/cli.js stats
```

### Gestión de Progreso

```bash
# Iniciar un ejercicio
node exercises/utils/cli.js start 01-fundamentals exercise-01

# Completar un ejercicio
node exercises/utils/cli.js complete 01-fundamentals exercise-01

# Reiniciar progreso (requiere confirmación)
node exercises/utils/cli.js reset --confirm
```

## 📊 Sistema de Progreso

### Archivo .progress.json

El progreso se guarda automáticamente en `.progress.json`:

```json
{
  "learnerId": "default",
  "startedAt": "2026-01-23T10:00:00.000Z",
  "lastActivity": "2026-01-23T15:30:00.000Z",
  "completedModules": ["01-fundamentals"],
  "completedExercises": [
    "01-fundamentals/exercise-01",
    "01-fundamentals/exercise-02"
  ],
  "currentModule": "02-web-automation",
  "currentExercise": "exercise-01",
  "stats": {
    "totalExercises": 50,
    "completedExercises": 12,
    "passedTests": 24,
    "failedTests": 3,
    "totalTimeSpent": 7200
  },
  "exerciseDetails": {
    "01-fundamentals/exercise-01": {
      "startedAt": "2026-01-23T10:00:00.000Z",
      "completedAt": "2026-01-23T10:45:00.000Z",
      "attempts": 2,
      "completed": true,
      "testsPassed": true
    }
  }
}
```

### Métricas Rastreadas

- **Módulos completados**: Lista de módulos finalizados
- **Ejercicios completados**: Lista de ejercicios finalizados
- **Tests pasados/fallidos**: Contadores de tests
- **Tiempo invertido**: Tiempo total de práctica
- **Intentos por ejercicio**: Número de intentos
- **Módulo/ejercicio actual**: Ubicación actual en el aprendizaje

## 🔍 Sistema de Validación

### Validaciones Realizadas

1. **Estructura de Directorios**
   - Verifica que existan los directorios requeridos
   - Valida la presencia de README.md

2. **Pares JS/TS**
   - Verifica que cada ejercicio tenga versión JS y TS
   - Advierte sobre implementaciones faltantes

3. **Soluciones**
   - Valida que cada ejercicio tenga su solución
   - Verifica correspondencia de nombres

4. **Tests**
   - Verifica que existan tests de validación
   - Advierte sobre tests faltantes

5. **Objetivos**
   - Extrae objetivos del README
   - Valida que estén documentados

### Ejemplo de Reporte de Validación

```
=== REPORTE DE VALIDACIÓN DE MÓDULOS ===

Total de módulos: 16
Módulos válidos: 14
Módulos inválidos: 2
Total de errores: 3
Total de advertencias: 8

--- Módulo: Fundamentals (01-fundamentals) ---
Estado: ✓ VÁLIDO
Ejercicios: 5
Soluciones: 5
Tests: 5
Objetivos: 6

✓ Módulo completamente válido

--- Módulo: Web Automation (02-web-automation) ---
Estado: ✗ INVÁLIDO
Ejercicios: 8
Soluciones: 7
Tests: 6
Objetivos: 10

Errores:
  ✗ Ejercicio exercise-03.js no tiene solución correspondiente

Advertencias:
  ⚠ ejercicios: exercise-04 solo tiene versión javascript, falta TypeScript
  ⚠ Ejercicio exercise-05 no tiene test de validación
```

## 🛠️ Uso Programático

### Ejemplo Completo

```javascript
const ExerciseLoader = require('./exercises/utils/ExerciseLoader');
const ExerciseValidator = require('./exercises/utils/ExerciseValidator');
const ProgressTracker = require('./exercises/utils/ProgressTracker');

// Inicializar componentes
const loader = new ExerciseLoader();
const validator = new ExerciseValidator(loader);
const tracker = new ProgressTracker();

// Descubrir módulos
const modules = loader.discoverModules();
console.log(`Encontrados ${modules.length} módulos`);

// Cargar módulo específico
const module = loader.loadModule('01-fundamentals');
console.log(`Módulo: ${module.name}`);
console.log(`Ejercicios: ${module.exercises.length}`);

// Validar módulo
const validation = validator.validateModule('01-fundamentals');
if (validation.valid) {
  console.log('✓ Módulo válido');
} else {
  console.log('✗ Errores encontrados:', validation.errors);
}

// Gestionar progreso
tracker.startExercise('01-fundamentals', 'exercise-01');
// ... realizar ejercicio ...
tracker.completeExercise('01-fundamentals', 'exercise-01', true);

// Obtener progreso
const progress = tracker.getOverallProgress(modules);
console.log(`Progreso: ${progress.percentage}%`);
```

## 📝 Crear Nuevos Módulos

### Paso a Paso

1. **Crear estructura de directorios**
   ```bash
   mkdir -p exercises/17-nuevo-modulo/{exercises,solutions,tests}
   ```

2. **Copiar template de README**
   ```bash
   cp exercises/MODULE_TEMPLATE.md exercises/17-nuevo-modulo/README.md
   ```

3. **Editar README con información del módulo**
   - Definir objetivos claros
   - Describir prerequisitos
   - Listar ejercicios planificados

4. **Crear ejercicios**
   - Implementar versiones JS y TS
   - Agregar comentarios explicativos
   - Incluir pistas útiles

5. **Crear soluciones**
   - Implementar soluciones completas
   - Documentar decisiones de diseño
   - Mostrar mejores prácticas

6. **Crear tests de validación**
   - Validar funcionalidad requerida
   - Probar casos edge
   - Verificar manejo de errores

7. **Validar módulo**
   ```bash
   npm run exercises:validate 17-nuevo-modulo
   ```

### Convenciones

- **Nombres de módulos**: `XX-nombre-en-kebab-case`
- **Nombres de ejercicios**: `exercise-01.js`, `exercise-01.ts`
- **Nombres de soluciones**: `solution-01.js`, `solution-01.ts`
- **Nombres de tests**: `exercise-01.spec.js`, `exercise-01.spec.ts`
- **Numeración**: Usar dos dígitos (01, 02, ..., 10, 11, ...)

## 🧪 Integración con Tests

### Property-Based Tests

```javascript
const { test, expect } = require('@playwright/test');
const ExerciseLoader = require('../exercises/utils/ExerciseLoader');
const fc = require('fast-check');

test('Property: Todos los módulos tienen estructura válida', async () => {
  const loader = new ExerciseLoader();
  const modules = loader.discoverModules();
  
  for (const module of modules) {
    // Validar que tiene README
    expect(module.hasReadme).toBeTruthy();
    
    // Validar que tiene ejercicios
    expect(module.exercises.length).toBeGreaterThan(0);
    
    // Validar que tiene soluciones
    expect(module.solutions.length).toBeGreaterThan(0);
  }
});

test('Property: Cada ejercicio JS tiene su par TS', async () => {
  const loader = new ExerciseLoader();
  const modules = loader.discoverModules();
  
  for (const module of modules) {
    const jsExercises = module.exercises
      .filter(e => e.language === 'javascript')
      .map(e => e.name);
    
    const tsExercises = module.exercises
      .filter(e => e.language === 'typescript')
      .map(e => e.name);
    
    for (const jsName of jsExercises) {
      expect(tsExercises).toContain(jsName);
    }
  }
});
```

## 📈 Reportes y Análisis

### Reporte de Progreso

```bash
npm run exercises:progress
```

Genera:
```
=== REPORTE DE PROGRESO ===

Progreso General: 45%
Módulos: 7/16
Ejercicios: 23/50
Tests Pasados: 46
Tests Fallidos: 2
Iniciado: 23/01/2026
Última Actividad: 23/01/2026

Módulo Actual: 08-ai-integration
Ejercicio Actual: exercise-02

--- Progreso por Módulo ---

✓ Fundamentals (01-fundamentals)
   5/5 ejercicios (100%)

✓ Web Automation (02-web-automation)
   8/8 ejercicios (100%)

→ AI Integration (08-ai-integration)
   2/6 ejercicios (33%)
   [MÓDULO ACTUAL]
```

### Exportar Progreso

```javascript
const tracker = new ProgressTracker();

// Exportar a JSON
const jsonData = tracker.export('json');
fs.writeFileSync('progreso.json', jsonData);

// Exportar a CSV
const csvData = tracker.export('csv');
fs.writeFileSync('progreso.csv', csvData);
```

## 🔧 Configuración Avanzada

### Personalizar Directorio de Ejercicios

```javascript
const loader = new ExerciseLoader('ruta/personalizada/ejercicios');
```

### Personalizar Archivo de Progreso

```javascript
const tracker = new ProgressTracker('.mi-progreso.json');
```

### Validación Personalizada

```javascript
const validator = new ExerciseValidator(loader);

// Validar solo módulos específicos
const modulesToValidate = ['01-fundamentals', '02-web-automation'];
for (const moduleId of modulesToValidate) {
  const result = validator.validateModule(moduleId);
  console.log(validator.generateReport(result));
}
```

## 🐛 Troubleshooting

### Problema: No se encuentran módulos

**Solución**: Verifica que los módulos estén en el directorio `exercises/` y sigan el formato `XX-nombre-modulo`.

### Problema: Validación falla

**Solución**: Ejecuta `npm run exercises:validate` para ver errores específicos y corrige la estructura.

### Problema: Progreso no se guarda

**Solución**: Verifica permisos de escritura en el directorio raíz del proyecto.

### Problema: Tests no se ejecutan

**Solución**: Asegúrate de que los archivos de test tengan la extensión `.spec.js` o `.spec.ts`.

## 📚 Recursos Adicionales

- [Documentación de Playwright](https://playwright.dev)
- [Fast-check Documentation](https://github.com/dubzzz/fast-check)
- [Template de Módulos](../exercises/MODULE_TEMPLATE.md)
- [README de Utilidades](../exercises/utils/README.md)

## 🤝 Contribuir

Para contribuir al sistema de ejercicios:

1. Sigue las convenciones de nomenclatura
2. Documenta todo en español
3. Crea tests de validación
4. Valida antes de commit
5. Actualiza documentación

## 📄 Licencia

Este sistema es parte del proyecto Playwright Mastery Practice.
