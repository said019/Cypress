# Módulo 06: Herramientas de Desarrollo de Playwright

## 🎯 Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

- Usar Playwright Inspector para depurar tests paso a paso
- Analizar ejecuciones de tests con Trace Viewer
- Generar código de tests automáticamente con Codegen
- Analizar artefactos de tests fallidos (screenshots, videos, traces)
- Usar el CLI de Playwright eficientemente
- Depurar tests en modo headed con slowMo

## 📚 Contenido del Módulo

### Ejercicio 01: Playwright Inspector
**Archivo**: `exercises/exercise-01-inspector-guide.md`

Aprende a usar Playwright Inspector para:
- Ejecutar tests paso a paso
- Probar locators en tiempo real
- Establecer breakpoints
- Inspeccionar el estado del DOM

### Ejercicio 02: Trace Viewer
**Archivo**: `exercises/exercise-02-trace-viewer-guide.md`

Domina el Trace Viewer para:
- Analizar ejecuciones de tests
- Revisar actividad de red
- Inspeccionar snapshots del DOM
- Identificar problemas de timing

### Ejercicio 03: Codegen
**Archivo**: `exercises/exercise-03-codegen-guide.md`

Usa Codegen para:
- Grabar interacciones de usuario
- Generar código de tests automáticamente
- Refinar código generado
- Acelerar la creación de tests

### Ejercicio 04: Análisis de Artefactos
**Archivos**: 
- `exercises/exercise-04-artifact-analysis.js`
- `exercises/exercise-04-artifact-analysis.ts`

Practica el análisis de:
- Screenshots de fallos
- Videos de ejecución
- Trace files
- Logs del navegador

## 🚀 Inicio Rápido

### Prerequisitos
- Completar Módulos 01-05
- Playwright instalado
- Navegadores instalados

### Comandos Básicos

```bash
# Ejecutar test con Inspector
npx playwright test --debug

# Ejecutar test específico con Inspector
npx playwright test tests/demo.spec.js --debug

# Generar trace
npx playwright test --trace on

# Abrir Trace Viewer
npx playwright show-trace trace.zip

# Usar Codegen
npx playwright codegen https://example.com

# Codegen con dispositivo específico
npx playwright codegen --device="iPhone 13" https://example.com
```

## 📖 Guías Detalladas

### 1. Playwright Inspector

El Inspector es tu mejor amigo para depurar tests. Te permite:

**Iniciar Inspector**:
```bash
# Opción 1: Agregar --debug al comando
npx playwright test --debug

# Opción 2: Usar page.pause() en el código
await page.pause();

# Opción 3: Variable de entorno
PWDEBUG=1 npx playwright test
```

**Características Principales**:
- **Step Over**: Ejecuta la siguiente línea
- **Step Into**: Entra en funciones
- **Step Out**: Sale de la función actual
- **Resume**: Continúa hasta el siguiente breakpoint
- **Locator Picker**: Selecciona elementos visualmente
- **Console**: Ejecuta comandos de Playwright

### 2. Trace Viewer

El Trace Viewer te da una vista completa de la ejecución:

**Generar Traces**:
```javascript
// En playwright.config.js
use: {
  trace: 'on-first-retry', // 'on' | 'off' | 'retain-on-failure'
}
```

**Abrir Traces**:
```bash
# Desde archivo local
npx playwright show-trace trace.zip

# Desde directorio de test-results
npx playwright show-trace test-results/my-test/trace.zip
```

**Información Disponible**:
- Timeline de acciones
- Screenshots de cada paso
- Network requests/responses
- Console logs
- DOM snapshots
- Source code

### 3. Codegen

Codegen acelera la creación de tests:

**Uso Básico**:
```bash
# Generar test para un sitio
npx playwright codegen https://rahulshettyacademy.com/client

# Con autenticación guardada
npx playwright codegen --load-storage=auth.json https://example.com

# Guardar autenticación
npx playwright codegen --save-storage=auth.json https://example.com
```

**Opciones Avanzadas**:
```bash
# Especificar navegador
npx playwright codegen --browser=firefox https://example.com

# Dispositivo móvil
npx playwright codegen --device="iPhone 13 Pro" https://example.com

# Viewport personalizado
npx playwright codegen --viewport-size=1280,720 https://example.com

# Generar en TypeScript
npx playwright codegen --target=typescript https://example.com
```

### 4. Configuración de Artefactos

Configura la captura automática de artefactos:

```javascript
// playwright.config.js
export default {
  use: {
    // Screenshots
    screenshot: 'only-on-failure', // 'on' | 'off' | 'only-on-failure'
    
    // Videos
    video: 'retain-on-failure', // 'on' | 'off' | 'retain-on-failure'
    
    // Traces
    trace: 'on-first-retry', // 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
  },
  
  // Directorio de artefactos
  outputDir: 'test-results',
};
```

## 🎓 Ejercicios Prácticos

### Ejercicio 1: Depuración con Inspector
1. Abre `exercises/exercise-04-artifact-analysis.js`
2. Ejecuta con `--debug`
3. Usa el locator picker para encontrar elementos
4. Practica step-by-step execution
5. Prueba diferentes locators en la consola

### Ejercicio 2: Análisis de Traces
1. Ejecuta un test con `--trace on`
2. Abre el trace generado
3. Analiza el timeline de acciones
4. Revisa network requests
5. Inspecciona DOM snapshots

### Ejercicio 3: Generación con Codegen
1. Usa codegen en el sitio de e-commerce
2. Graba un flujo de login
3. Graba agregar producto al carrito
4. Refina el código generado
5. Convierte a Page Object Model

### Ejercicio 4: Análisis de Fallos
1. Ejecuta `exercise-04-artifact-analysis.js`
2. Analiza los screenshots generados
3. Revisa el video de ejecución
4. Abre el trace file
5. Identifica la causa del fallo

## 🔍 Debugging Tips

### Modo Headed con SlowMo
```javascript
// En playwright.config.js
use: {
  headless: false,
  slowMo: 1000, // Pausa 1 segundo entre acciones
}
```

### Console Logs
```javascript
// Capturar logs del navegador
page.on('console', msg => console.log('Browser:', msg.text()));

// Capturar errores
page.on('pageerror', error => console.log('Error:', error));
```

### Screenshots Manuales
```javascript
// Screenshot de página completa
await page.screenshot({ path: 'screenshot.png', fullPage: true });

// Screenshot de elemento
await element.screenshot({ path: 'element.png' });

// Screenshot con máscara
await page.screenshot({
  path: 'masked.png',
  mask: [page.locator('.sensitive-data')]
});
```

### Traces Programáticos
```javascript
// Iniciar trace
await context.tracing.start({ screenshots: true, snapshots: true });

// Detener y guardar
await context.tracing.stop({ path: 'trace.zip' });
```

## 📊 Validación

### Tests de Validación
```bash
# Ejecutar tests de validación
npx playwright test exercises/06-playwright-dev-tools/tests/

# Test específico
npx playwright test exercises/06-playwright-dev-tools/tests/exercise-04.spec.js
```

### Criterios de Éxito
- ✅ Puedes usar Inspector para depurar tests
- ✅ Entiendes cómo analizar traces
- ✅ Puedes generar tests con Codegen
- ✅ Sabes configurar artefactos
- ✅ Puedes analizar fallos eficientemente

## 🔗 Recursos Adicionales

### Documentación Oficial
- [Playwright Inspector](https://playwright.dev/docs/debug#playwright-inspector)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer)
- [Codegen](https://playwright.dev/docs/codegen)
- [Test Artifacts](https://playwright.dev/docs/test-use-options#recording-options)

### Videos y Tutoriales
- [Debugging with Inspector](https://www.youtube.com/watch?v=tJF7UhA59Gc)
- [Trace Viewer Deep Dive](https://www.youtube.com/watch?v=lfxjs--9ZQs)
- [Codegen Best Practices](https://www.youtube.com/watch?v=LM4yqrOzmFE)

### Artículos
- [Effective Debugging Strategies](https://playwright.dev/docs/debug)
- [Understanding Traces](https://playwright.dev/docs/trace-viewer-intro)
- [Test Artifacts Guide](https://playwright.dev/docs/test-reporters)

## 🎯 Próximos Pasos

Después de completar este módulo:

1. **Módulo 07**: Visual Testing Implementation
2. **Módulo 08**: Mobile Device Emulation
3. **Módulo 09**: Cucumber BDD Framework Enhancement

## 💡 Tips Profesionales

1. **Usa Inspector regularmente**: No solo para depurar, también para explorar
2. **Configura traces inteligentemente**: `on-first-retry` es un buen balance
3. **Refina código de Codegen**: Nunca uses código generado sin revisarlo
4. **Analiza traces de CI**: Son invaluables para depurar fallos en CI
5. **Captura contexto**: Screenshots + traces + logs = debugging completo

## ❓ Preguntas Frecuentes

**P: ¿Cuándo usar Inspector vs Trace Viewer?**
R: Inspector para depuración interactiva, Trace Viewer para análisis post-mortem.

**P: ¿Los traces afectan el rendimiento?**
R: Sí, usa `on-first-retry` en CI para minimizar impacto.

**P: ¿Puedo usar Codegen para tests complejos?**
R: Úsalo como punto de partida, luego refactoriza a Page Objects.

**P: ¿Cómo depuro tests en CI?**
R: Configura artifacts y analiza traces descargados.

**P: ¿Qué hacer si Inspector no se abre?**
R: Verifica que no estés en modo headless y que PWDEBUG esté configurado.

---

**Tiempo Estimado**: 4-6 horas
**Dificultad**: Intermedio
**Prerequisitos**: Módulos 01-05

¡Domina las herramientas de Playwright y conviértete en un experto en debugging! 🎭
