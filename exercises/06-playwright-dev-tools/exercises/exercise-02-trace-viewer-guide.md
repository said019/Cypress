# Ejercicio 02: Guía de Trace Viewer

## 🎯 Objetivo

Dominar el uso de Playwright Trace Viewer para analizar ejecuciones de tests, identificar problemas de timing, revisar network activity, y depurar tests fallidos de manera eficiente.

## 📚 Conceptos Clave

### ¿Qué es Trace Viewer?

Trace Viewer es una herramienta que te permite:
- Ver una grabación completa de la ejecución del test
- Analizar cada acción con screenshots
- Revisar todas las network requests/responses
- Inspeccionar DOM snapshots en cualquier punto
- Ver console logs y errores
- Analizar el timeline de eventos

### ¿Cuándo Usar Trace Viewer?

- ✅ Para analizar tests fallidos en CI
- ✅ Para entender problemas de timing
- ✅ Para revisar network activity
- ✅ Para debugging post-mortem
- ✅ Para documentar comportamiento de tests

## 🚀 Configuración de Traces

### Método 1: Configuración Global

```javascript
// playwright.config.js
export default {
  use: {
    trace: 'on-first-retry', // Opciones: 'on' | 'off' | 'retain-on-failure' | 'on-first-retry'
  },
};
```

**Opciones de Trace**:
- `'on'`: Siempre genera trace (⚠️ impacto en rendimiento)
- `'off'`: Nunca genera trace
- `'retain-on-failure'`: Solo guarda si el test falla
- `'on-first-retry'`: Solo en el primer retry (⭐ recomendado)

### Método 2: Por Test

```javascript
test.use({ trace: 'on' });

test('mi test con trace', async ({ page }) => {
  // Este test siempre generará trace
  await page.goto('https://example.com');
});
```

### Método 3: Programático

```javascript
test('trace programático', async ({ page, context }) => {
  // Iniciar trace
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });
  
  // Tu test aquí
  await page.goto('https://example.com');
  await page.click('button');
  
  // Detener y guardar trace
  await context.tracing.stop({ path: 'trace.zip' });
});
```

### Método 4: CLI

```bash
# Generar trace para todos los tests
npx playwright test --trace on

# Solo para tests fallidos
npx playwright test --trace retain-on-failure

# Test específico con trace
npx playwright test my-test.spec.js --trace on
```

## 🎮 Interfaz del Trace Viewer

### Abrir Trace Viewer

```bash
# Desde archivo local
npx playwright show-trace trace.zip

# Desde test-results
npx playwright show-trace test-results/my-test-chromium/trace.zip

# Abrir último trace
npx playwright show-trace test-results/**/trace.zip
```

### Interfaz Principal

```
┌────────────────────────────────────────────────────────┐
│  Trace Viewer - my-test.spec.js                        │
├────────────────────────────────────────────────────────┤
│  Timeline: [====|====|====|====|====]                  │
│            0s   1s   2s   3s   4s   5s                 │
├────────────────────────────────────────────────────────┤
│  Actions          │  Screenshot    │  Source           │
│  ├─ goto          │  [Image]       │  1 test('...', { │
│  ├─ click         │                │  2   await page   │
│  ├─ fill          │                │  3   await page   │
│  └─ expect        │                │  4 });            │
├────────────────────────────────────────────────────────┤
│  Network  │  Console  │  Snapshots  │  Metadata        │
│  GET /api │  log: ... │  Before     │  Duration: 5.2s  │
│  POST /   │  error:.. │  After      │  Browser: Chrome │
└────────────────────────────────────────────────────────┘
```

### Paneles Principales

1. **Timeline**: Línea de tiempo de todas las acciones
2. **Actions**: Lista de acciones ejecutadas
3. **Screenshot**: Captura visual de cada acción
4. **Source**: Código fuente del test
5. **Network**: Requests y responses
6. **Console**: Logs del navegador
7. **Snapshots**: Estado del DOM antes/después
8. **Metadata**: Información del test

## 📝 Ejercicios Prácticos

### Ejercicio 2.1: Generar y Analizar Primer Trace

**Objetivo**: Crear tu primer trace y familiarizarte con la interfaz

```javascript
// TODO: Crea un archivo test-trace-01.spec.js

import { test, expect } from '@playwright/test';

test('primer trace', async ({ page }) => {
  // 1. Navega al sitio
  await page.goto('https://rahulshettyacademy.com/client');
  
  // 2. Realiza login
  await page.locator('#userEmail').fill('test@example.com');
  await page.locator('#userPassword').fill('Test@123');
  await page.locator('#login').click();
  
  // 3. Espera carga
  await page.waitForLoadState('networkidle');
  
  // 4. Verifica URL
  await expect(page).toHaveURL(/client/);
});
```

**Pasos**:
1. Ejecuta: `npx playwright test test-trace-01.spec.js --trace on`
2. Abre el trace: `npx playwright show-trace test-results/**/trace.zip`
3. Explora cada panel
4. Haz clic en cada acción del timeline
5. Observa los screenshots

**TODO: Responde estas preguntas**:
- ¿Cuántas acciones se ejecutaron?
- ¿Cuánto tiempo tomó el test completo?
- ¿Cuántas network requests se hicieron?
- ¿Qué acción tomó más tiempo?

### Ejercicio 2.2: Analizar Network Activity

**Objetivo**: Usar traces para entender network requests

```javascript
// TODO: Crea un archivo test-trace-02.spec.js

import { test, expect } from '@playwright/test';

test('analizar network', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Login
  await page.locator('#userEmail').fill('test@example.com');
  await page.locator('#userPassword').fill('Test@123');
  await page.locator('#login').click();
  
  // Espera que carguen productos
  await page.waitForLoadState('networkidle');
  
  // TODO: Agrega un producto al carrito
  await page.locator('.card-body').first().locator('text=Add To Cart').click();
  
  // Espera confirmación
  await page.waitForTimeout(1000);
});
```

**Pasos**:
1. Ejecuta con `--trace on`
2. Abre el trace
3. Ve al panel "Network"
4. Identifica:
   - Request de login
   - Request de productos
   - Request de agregar al carrito

**TODO: Documenta**:
```
Login Request:
- URL: _______________
- Method: _______________
- Status: _______________
- Response time: _______________

Products Request:
- URL: _______________
- Method: _______________
- Status: _______________
- Response time: _______________

Add to Cart Request:
- URL: _______________
- Method: _______________
- Status: _______________
- Payload: _______________
```

### Ejercicio 2.3: Debugging con DOM Snapshots

**Objetivo**: Usar snapshots para entender cambios en el DOM

```javascript
// TODO: Crea un archivo test-trace-03.spec.js

import { test, expect } from '@playwright/test';

test('analizar DOM snapshots', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Captura estado inicial
  await page.locator('#userEmail').fill('test@example.com');
  
  // Captura después de llenar
  await page.locator('#userPassword').fill('Test@123');
  
  // Captura antes de click
  await page.locator('#login').click();
  
  // Captura después de navegación
  await page.waitForLoadState('networkidle');
});
```

**Pasos**:
1. Ejecuta con `--trace on`
2. Abre el trace
3. Para cada acción, ve al panel "Snapshots"
4. Compara "Before" y "After"
5. Observa cómo cambia el DOM

**TODO: Analiza**:
- ¿Qué elementos aparecen después del login?
- ¿Qué elementos desaparecen?
- ¿Hay cambios en clases CSS?

### Ejercicio 2.4: Identificar Timing Issues

**Objetivo**: Usar traces para encontrar problemas de timing

```javascript
// TODO: Crea un archivo test-trace-04.spec.js

import { test, expect } from '@playwright/test';

test('timing issue', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  await page.locator('#userEmail').fill('test@example.com');
  await page.locator('#userPassword').fill('Test@123');
  await page.locator('#login').click();
  
  // Este locator puede fallar por timing
  // TODO: Intenta sin waitFor primero
  const product = page.locator('.card-body').first();
  await expect(product).toBeVisible();
  
  // TODO: Si falla, agrega wait apropiado
  // await page.waitForLoadState('networkidle');
});
```

**Pasos**:
1. Ejecuta sin el wait
2. Si falla, analiza el trace
3. Identifica cuándo aparece el elemento
4. Agrega el wait apropiado
5. Ejecuta de nuevo y compara traces

### Ejercicio 2.5: Analizar Test Fallido

**Objetivo**: Usar trace para debugging post-mortem

```javascript
// TODO: Crea un archivo test-trace-05.spec.js

import { test, expect } from '@playwright/test';

test('test que falla', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Locator incorrecto intencional
  await page.locator('#wrongSelector').fill('test@example.com');
  
  // Este código nunca se ejecutará
  await page.locator('#userPassword').fill('Test@123');
  await page.locator('#login').click();
});
```

**Pasos**:
1. Ejecuta: `npx playwright test test-trace-05.spec.js --trace on`
2. El test fallará
3. Abre el trace
4. Identifica en qué acción falló
5. Ve el screenshot del momento del fallo
6. Revisa el error en el panel de metadata
7. Corrige el test

**TODO: Documenta el proceso**:
```
1. Acción que falló: _______________
2. Error exacto: _______________
3. Screenshot muestra: _______________
4. Solución: _______________
```

## 🎓 Técnicas Avanzadas

### 1. Filtrar Network Requests

```javascript
test('filtrar requests', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  
  // Capturar solo API calls
  page.on('request', request => {
    if (request.url().includes('/api/')) {
      console.log('API Request:', request.url());
    }
  });
  
  await page.goto('https://example.com');
  
  await context.tracing.stop({ path: 'trace-filtered.zip' });
});
```

### 2. Traces con Múltiples Páginas

```javascript
test('múltiples páginas', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  
  // Página principal
  await page.goto('https://example.com');
  
  // Nueva página
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    page.click('a[target="_blank"]')
  ]);
  
  await newPage.waitForLoadState();
  
  await context.tracing.stop({ path: 'trace-multi-page.zip' });
});
```

### 3. Traces Condicionales

```javascript
test('trace condicional', async ({ page, context }) => {
  let shouldTrace = false;
  
  // Iniciar trace solo si hay error
  page.on('pageerror', async () => {
    if (!shouldTrace) {
      shouldTrace = true;
      await context.tracing.start({ screenshots: true, snapshots: true });
    }
  });
  
  await page.goto('https://example.com');
  
  if (shouldTrace) {
    await context.tracing.stop({ path: 'trace-error.zip' });
  }
});
```

### 4. Comparar Traces

```javascript
// Genera traces de diferentes ejecuciones
test('trace run 1', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://example.com');
  await context.tracing.stop({ path: 'trace-run-1.zip' });
});

test('trace run 2', async ({ page, context }) => {
  await context.tracing.start({ screenshots: true, snapshots: true });
  await page.goto('https://example.com');
  await context.tracing.stop({ path: 'trace-run-2.zip' });
});

// TODO: Abre ambos traces y compara:
// - Tiempos de ejecución
// - Network requests
// - Screenshots
```

## 💡 Tips Profesionales

### 1. Configuración Óptima para CI

```javascript
// playwright.config.js
export default {
  use: {
    trace: 'on-first-retry', // Balance perfecto
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  retries: process.env.CI ? 2 : 0,
};
```

### 2. Traces Ligeros

```javascript
// Para traces más pequeños
await context.tracing.start({
  screenshots: false, // Deshabilita screenshots
  snapshots: true,    // Mantén snapshots
  sources: false      // No incluyas source code
});
```

### 3. Organizar Traces

```bash
# Estructura recomendada
test-results/
├── test-1-chromium/
│   └── trace.zip
├── test-2-firefox/
│   └── trace.zip
└── test-3-webkit/
    └── trace.zip
```

### 4. Compartir Traces

```bash
# Subir trace a trace.playwright.dev
npx playwright show-trace --upload trace.zip

# Genera un link compartible
```

## ✅ Checklist de Dominio

Marca cuando puedas hacer cada tarea sin ayuda:

- [ ] Configurar traces en playwright.config.js
- [ ] Generar traces desde CLI
- [ ] Abrir y navegar Trace Viewer
- [ ] Analizar timeline de acciones
- [ ] Revisar network requests/responses
- [ ] Inspeccionar DOM snapshots
- [ ] Identificar timing issues
- [ ] Analizar console logs
- [ ] Comparar múltiples traces
- [ ] Usar traces para debugging en CI

## 🔗 Recursos Adicionales

### Documentación
- [Trace Viewer Docs](https://playwright.dev/docs/trace-viewer)
- [Trace Viewer Intro](https://playwright.dev/docs/trace-viewer-intro)
- [Recording Options](https://playwright.dev/docs/test-use-options#recording-options)

### Videos
- [Trace Viewer Deep Dive](https://www.youtube.com/watch?v=lfxjs--9ZQs)
- [Debugging with Traces](https://www.youtube.com/watch?v=LM4yqrOzmFE)

### Herramientas
- [trace.playwright.dev](https://trace.playwright.dev) - Visor online
- [Trace Viewer API](https://playwright.dev/docs/api/class-tracing)

## 📊 Validación

Para validar que dominas Trace Viewer:

1. Crea un test complejo que falle intencionalmente
2. Genera el trace
3. Analiza el trace sin ver el código
4. Identifica:
   - Qué acción falló
   - Por qué falló
   - Qué requests se hicieron
   - Cuánto tiempo tomó cada acción
5. Corrige el test basándote solo en el trace

Si puedes hacer esto, ¡has dominado Trace Viewer! 🎉

---

**Tiempo Estimado**: 1.5-2 horas
**Dificultad**: Intermedio
**Próximo**: Ejercicio 03 - Codegen
