# Template para Nuevos Módulos

Este archivo sirve como plantilla para crear nuevos módulos de ejercicios.

## Estructura del Módulo

```
exercises/XX-nombre-modulo/
├── README.md                    # Descripción y objetivos del módulo
├── exercises/
│   ├── exercise-01.js          # Ejercicio 1 en JavaScript
│   ├── exercise-01.ts          # Ejercicio 1 en TypeScript
│   ├── exercise-02.js          # Ejercicio 2 en JavaScript
│   └── exercise-02.ts          # Ejercicio 2 en TypeScript
├── solutions/
│   ├── solution-01.js          # Solución 1 en JavaScript
│   ├── solution-01.ts          # Solución 1 en TypeScript
│   ├── solution-02.js          # Solución 2 en JavaScript
│   └── solution-02.ts          # Solución 2 en TypeScript
└── tests/
    ├── exercise-01.spec.js     # Test de validación 1 (JS)
    ├── exercise-01.spec.ts     # Test de validación 1 (TS)
    ├── exercise-02.spec.js     # Test de validación 2 (JS)
    └── exercise-02.spec.ts     # Test de validación 2 (TS)
```

## Template README.md del Módulo

```markdown
# Módulo XX: [Nombre del Módulo]

## 📋 Descripción

[Descripción breve del módulo y qué aprenderás]

## 🎯 Objetivos

Al completar este módulo, serás capaz de:

- Objetivo 1
- Objetivo 2
- Objetivo 3
- Objetivo 4

## 📚 Prerequisitos

- Módulo previo completado (si aplica)
- Conocimientos necesarios
- Herramientas requeridas

## 🏋️ Ejercicios

### Ejercicio 1: [Nombre del Ejercicio]

**Dificultad:** Principiante | Intermedio | Avanzado

**Descripción:**
[Descripción detallada de lo que debe hacer el ejercicio]

**Archivos:**
- `exercises/exercise-01.js` - Versión JavaScript
- `exercises/exercise-01.ts` - Versión TypeScript

**Instrucciones:**
1. Paso 1
2. Paso 2
3. Paso 3

**Conceptos Clave:**
- Concepto 1
- Concepto 2

**Validación:**
```bash
npm test -- exercises/XX-nombre-modulo/tests/exercise-01.spec.js
```

---

### Ejercicio 2: [Nombre del Ejercicio]

[Repetir estructura para cada ejercicio]

## 💡 Consejos

- Consejo 1
- Consejo 2
- Consejo 3

## 🔗 Recursos Adicionales

- [Enlace a documentación relevante]
- [Enlace a ejemplos]
- [Enlace a referencias]

## ✅ Checklist de Completitud

- [ ] Ejercicio 1 completado
- [ ] Ejercicio 2 completado
- [ ] Todos los tests pasando
- [ ] Código revisado y entendido
- [ ] Conceptos clave dominados

## 🎓 Siguiente Paso

Una vez completado este módulo, continúa con:
**Módulo [XX+1]: [Nombre del Siguiente Módulo]**
```

## Template de Ejercicio (JavaScript)

```javascript
/**
 * Ejercicio XX.YY: [Nombre del Ejercicio]
 * 
 * Objetivo: [Descripción breve del objetivo]
 * 
 * Instrucciones:
 * 1. [Instrucción 1]
 * 2. [Instrucción 2]
 * 3. [Instrucción 3]
 * 
 * Conceptos a practicar:
 * - Concepto 1
 * - Concepto 2
 */

const { test, expect } = require('@playwright/test');

test.describe('Ejercicio XX.YY - [Nombre]', () => {
  
  test('debe [descripción de lo que debe hacer]', async ({ page }) => {
    // TODO: Implementa tu solución aquí
    
    // Pista: [Pista útil si es necesario]
    
    // Ejemplo de estructura:
    // await page.goto('...');
    // await page.click('...');
    // await expect(page.locator('...')).toBeVisible();
  });
  
  test('debe [otro caso de prueba]', async ({ page }) => {
    // TODO: Implementa tu solución aquí
  });
  
});

/**
 * Notas:
 * - [Nota importante 1]
 * - [Nota importante 2]
 * 
 * Recursos:
 * - [Enlace a documentación relevante]
 */
```

## Template de Ejercicio (TypeScript)

```typescript
/**
 * Ejercicio XX.YY: [Nombre del Ejercicio]
 * 
 * Objetivo: [Descripción breve del objetivo]
 * 
 * Instrucciones:
 * 1. [Instrucción 1]
 * 2. [Instrucción 2]
 * 3. [Instrucción 3]
 * 
 * Conceptos a practicar:
 * - Concepto 1
 * - Concepto 2
 */

import { test, expect, Page } from '@playwright/test';

test.describe('Ejercicio XX.YY - [Nombre]', () => {
  
  test('debe [descripción de lo que debe hacer]', async ({ page }: { page: Page }) => {
    // TODO: Implementa tu solución aquí
    
    // Pista: [Pista útil si es necesario]
    
    // Ejemplo de estructura:
    // await page.goto('...');
    // await page.click('...');
    // await expect(page.locator('...')).toBeVisible();
  });
  
  test('debe [otro caso de prueba]', async ({ page }: { page: Page }) => {
    // TODO: Implementa tu solución aquí
  });
  
});

/**
 * Notas:
 * - [Nota importante 1]
 * - [Nota importante 2]
 * 
 * Recursos:
 * - [Enlace a documentación relevante]
 */
```

## Template de Test de Validación

```javascript
/**
 * Test de Validación - Ejercicio XX.YY
 * 
 * Este test valida que el ejercicio se haya completado correctamente.
 */

const { test, expect } = require('@playwright/test');

test.describe('Validación Ejercicio XX.YY', () => {
  
  test('el ejercicio debe existir', async () => {
    const fs = require('fs');
    const path = require('path');
    
    const exercisePathJS = path.join(__dirname, '../exercises/exercise-XX.js');
    const exercisePathTS = path.join(__dirname, '../exercises/exercise-XX.ts');
    
    expect(fs.existsSync(exercisePathJS) || fs.existsSync(exercisePathTS)).toBeTruthy();
  });
  
  test('el ejercicio debe implementar la funcionalidad requerida', async ({ page }) => {
    // TODO: Implementar validaciones específicas
    
    // Ejemplo:
    // await page.goto('...');
    // const element = page.locator('...');
    // await expect(element).toBeVisible();
  });
  
  test('el ejercicio debe manejar casos edge', async ({ page }) => {
    // TODO: Validar casos edge
  });
  
});
```

## Convenciones de Nomenclatura

### Archivos de Ejercicios
- `exercise-01.js` / `exercise-01.ts`
- `exercise-02.js` / `exercise-02.ts`
- Usar números con dos dígitos (01, 02, 03, etc.)

### Archivos de Soluciones
- `solution-01.js` / `solution-01.ts`
- `solution-02.js` / `solution-02.ts`
- Mismo número que el ejercicio correspondiente

### Archivos de Tests
- `exercise-01.spec.js` / `exercise-01.spec.ts`
- `exercise-02.spec.js` / `exercise-02.spec.ts`
- Usar `.spec` antes de la extensión

### Directorios de Módulos
- `01-fundamentals`
- `02-web-automation`
- Usar números con dos dígitos seguidos de guión y nombre en kebab-case

## Checklist para Crear un Nuevo Módulo

- [ ] Crear directorio con nombre correcto (XX-nombre-modulo)
- [ ] Crear README.md con objetivos claros
- [ ] Crear subdirectorios: exercises/, solutions/, tests/
- [ ] Crear ejercicios en JS y TS
- [ ] Crear soluciones correspondientes en JS y TS
- [ ] Crear tests de validación
- [ ] Documentar conceptos clave en comentarios
- [ ] Agregar ejemplos y pistas útiles
- [ ] Validar con `npm run exercises:validate`
- [ ] Probar que los tests funcionan correctamente
- [ ] Actualizar README principal si es necesario

## Ejemplo de Uso

Para crear un nuevo módulo:

```bash
# 1. Crear estructura de directorios
mkdir -p exercises/17-nuevo-modulo/{exercises,solutions,tests}

# 2. Copiar este template como README
cp exercises/MODULE_TEMPLATE.md exercises/17-nuevo-modulo/README.md

# 3. Editar README con información del módulo
# 4. Crear ejercicios, soluciones y tests
# 5. Validar estructura

npm run exercises:validate 17-nuevo-modulo
```

## Recursos

- [Documentación de Playwright](https://playwright.dev)
- [Guía de Estilo de Código](https://github.com/airbnb/javascript)
- [Mejores Prácticas de Testing](https://playwright.dev/docs/best-practices)
