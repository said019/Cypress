# Ejercicio 01: Guía de Playwright Inspector

## 🎯 Objetivo

Dominar el uso de Playwright Inspector para depurar tests de manera eficiente, probar locators en tiempo real, y entender el flujo de ejecución de tus tests.

## 📚 Conceptos Clave

### ¿Qué es Playwright Inspector?

Playwright Inspector es una herramienta GUI que te permite:
- Ejecutar tests paso a paso (step-by-step)
- Pausar la ejecución en cualquier punto
- Probar y refinar locators interactivamente
- Ver el estado del DOM en cada paso
- Ejecutar comandos de Playwright en tiempo real

### ¿Cuándo Usar Inspector?

- ✅ Cuando un test falla y no sabes por qué
- ✅ Para encontrar el locator correcto de un elemento
- ✅ Para entender el flujo de un test complejo
- ✅ Para verificar el estado de la página en un punto específico
- ✅ Para aprender cómo funciona Playwright

## 🚀 Formas de Iniciar Inspector

### Método 1: Flag --debug

```bash
# Ejecutar todos los tests con Inspector
npx playwright test --debug

# Ejecutar test específico
npx playwright test tests/demo.spec.js --debug

# Ejecutar con proyecto específico
npx playwright test --debug --project=chromium
```

### Método 2: page.pause()

```javascript
// En tu test
test('mi test', async ({ page }) => {
  await page.goto('https://example.com');
  
  // El Inspector se abrirá aquí
  await page.pause();
  
  await page.click('button');
});
```

### Método 3: Variable de Entorno

```bash
# Linux/Mac
PWDEBUG=1 npx playwright test

# Windows (PowerShell)
$env:PWDEBUG=1; npx playwright test

# Windows (CMD)
set PWDEBUG=1 && npx playwright test
```

### Método 4: Configuración en playwright.config.js

```javascript
// playwright.config.js
export default {
  use: {
    headless: false,
    launchOptions: {
      slowMo: 1000, // Pausa 1 segundo entre acciones
    }
  }
};
```

## 🎮 Interfaz del Inspector

### Panel Principal

```
┌─────────────────────────────────────────┐
│  Playwright Inspector                   │
├─────────────────────────────────────────┤
│  ▶ Resume  ⏭ Step Over  ⏬ Step Into   │
│  ⏫ Step Out  ⏸ Pause                   │
├─────────────────────────────────────────┤
│  Source Code:                           │
│  1  test('example', async ({ page }) => │
│  2    await page.goto('...');           │
│→ 3    await page.click('button');       │
│  4  });                                 │
├─────────────────────────────────────────┤
│  Locator:                               │
│  [text="Submit"]                        │
│  🎯 Pick Locator                        │
├─────────────────────────────────────────┤
│  Console:                               │
│  > await page.title()                   │
│  "Example Domain"                       │
└─────────────────────────────────────────┘
```

### Controles Principales

| Botón | Atajo | Descripción |
|-------|-------|-------------|
| ▶ Resume | F8 | Continúa hasta el siguiente breakpoint |
| ⏭ Step Over | F10 | Ejecuta la línea actual |
| ⏬ Step Into | F11 | Entra en la función |
| ⏫ Step Out | Shift+F11 | Sale de la función actual |
| ⏸ Pause | - | Pausa la ejecución |
| 🎯 Pick Locator | - | Selecciona elemento visualmente |

## 📝 Ejercicios Prácticos

### Ejercicio 1.1: Primer Uso del Inspector

**Objetivo**: Familiarizarte con la interfaz básica

```javascript
// TODO: Crea un archivo test-inspector-01.spec.js

import { test, expect } from '@playwright/test';

test('explorar con inspector', async ({ page }) => {
  // 1. Navega al sitio
  await page.goto('https://rahulshettyacademy.com/client');
  
  // 2. Pausa aquí para explorar
  await page.pause();
  
  // 3. Encuentra el campo de email
  // TODO: Usa el locator picker para encontrar el selector
  
  // 4. Encuentra el botón de login
  // TODO: Usa el locator picker para encontrar el selector
});
```

**Pasos**:
1. Ejecuta: `npx playwright test test-inspector-01.spec.js --debug`
2. Cuando se pause, usa el botón "Pick Locator" (🎯)
3. Haz clic en el campo de email
4. Copia el locator generado
5. Repite para el botón de login

### Ejercicio 1.2: Step-by-Step Debugging

**Objetivo**: Aprender a ejecutar tests paso a paso

```javascript
// TODO: Crea un archivo test-inspector-02.spec.js

import { test, expect } from '@playwright/test';

test('login paso a paso', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Pausa al inicio
  await page.pause();
  
  // TODO: Completa el flujo de login
  // 1. Ingresa email
  await page.locator('#userEmail').fill('TODO: tu email');
  
  // 2. Ingresa password
  await page.locator('#userPassword').fill('TODO: tu password');
  
  // 3. Click en login
  await page.locator('#login').click();
  
  // 4. Espera navegación
  await page.waitForLoadState('networkidle');
  
  // 5. Verifica que estás en dashboard
  await expect(page).toHaveURL(/client/);
});
```

**Pasos**:
1. Ejecuta con `--debug`
2. Usa "Step Over" (F10) para cada línea
3. Observa cómo cambia la página
4. Verifica el estado en cada paso

### Ejercicio 1.3: Probar Locators en Consola

**Objetivo**: Usar la consola para probar locators

```javascript
// TODO: Crea un archivo test-inspector-03.spec.js

import { test } from '@playwright/test';

test('probar locators', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.pause();
  
  // TODO: En la consola del Inspector, prueba estos comandos:
  // 1. await page.locator('button').count()
  // 2. await page.locator('text=Login').textContent()
  // 3. await page.locator('#userEmail').isVisible()
  // 4. await page.locator('[type="email"]').getAttribute('placeholder')
  
  // TODO: Encuentra cuántos productos hay en el dashboard
  // Pista: Usa .card-body
});
```

**Comandos Útiles en Consola**:
```javascript
// Contar elementos
await page.locator('selector').count()

// Verificar visibilidad
await page.locator('selector').isVisible()

// Obtener texto
await page.locator('selector').textContent()

// Obtener atributo
await page.locator('selector').getAttribute('name')

// Obtener todos los textos
await page.locator('selector').allTextContents()

// Verificar si está habilitado
await page.locator('selector').isEnabled()
```

### Ejercicio 1.4: Debugging de Test Fallido

**Objetivo**: Usar Inspector para encontrar por qué falla un test

```javascript
// TODO: Crea un archivo test-inspector-04.spec.js

import { test, expect } from '@playwright/test';

test('test con error intencional', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Este locator está mal intencionalmente
  await page.locator('#wrongEmail').fill('test@test.com');
  
  // TODO: 
  // 1. Ejecuta este test con --debug
  // 2. Cuando falle, usa el locator picker
  // 3. Encuentra el locator correcto
  // 4. Corrige el test
});
```

### Ejercicio 1.5: Breakpoints Condicionales

**Objetivo**: Pausar solo cuando se cumple una condición

```javascript
// TODO: Crea un archivo test-inspector-05.spec.js

import { test, expect } from '@playwright/test';

test('buscar producto específico', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  
  // Login
  await page.locator('#userEmail').fill('tu-email@test.com');
  await page.locator('#userPassword').fill('tu-password');
  await page.locator('#login').click();
  await page.waitForLoadState('networkidle');
  
  // Obtener todos los productos
  const products = page.locator('.card-body');
  const count = await products.count();
  
  // TODO: Pausa solo si hay más de 5 productos
  if (count > 5) {
    await page.pause();
  }
  
  // Buscar producto específico
  for (let i = 0; i < count; i++) {
    const productName = await products.nth(i).locator('b').textContent();
    
    // TODO: Pausa cuando encuentres "ZARA COAT 3"
    if (productName === 'ZARA COAT 3') {
      await page.pause();
      // Agregar al carrito
      await products.nth(i).locator('text=Add To Cart').click();
      break;
    }
  }
});
```

## 🎓 Técnicas Avanzadas

### 1. Inspeccionar Estado del DOM

```javascript
test('inspeccionar DOM', async ({ page }) => {
  await page.goto('https://example.com');
  await page.pause();
  
  // En la consola, puedes:
  // 1. Ver el HTML: await page.content()
  // 2. Evaluar JavaScript: await page.evaluate(() => document.title)
  // 3. Obtener estilos: await page.locator('h1').evaluate(el => getComputedStyle(el).color)
});
```

### 2. Debugging de Timing Issues

```javascript
test('timing issues', async ({ page }) => {
  await page.goto('https://example.com');
  
  // Pausa antes de elemento dinámico
  await page.pause();
  
  // Observa cuándo aparece el elemento
  await page.locator('.dynamic-element').waitFor();
  
  // Pausa después para verificar
  await page.pause();
});
```

### 3. Inspeccionar Network Requests

```javascript
test('network requests', async ({ page }) => {
  // Capturar requests
  page.on('request', request => {
    console.log('Request:', request.url());
  });
  
  page.on('response', response => {
    console.log('Response:', response.url(), response.status());
  });
  
  await page.goto('https://example.com');
  await page.pause();
  
  // Revisa la consola para ver las requests
});
```

## ✅ Checklist de Dominio

Marca cuando puedas hacer cada tarea sin ayuda:

- [ ] Iniciar Inspector con diferentes métodos
- [ ] Usar Step Over, Step Into, Step Out
- [ ] Usar el Locator Picker efectivamente
- [ ] Probar locators en la consola
- [ ] Ejecutar comandos de Playwright en consola
- [ ] Pausar ejecución en puntos específicos
- [ ] Inspeccionar estado del DOM
- [ ] Encontrar y corregir locators incorrectos
- [ ] Usar breakpoints condicionales
- [ ] Analizar timing issues

## 🔗 Recursos Adicionales

### Documentación
- [Playwright Inspector Docs](https://playwright.dev/docs/debug#playwright-inspector)
- [Debugging Guide](https://playwright.dev/docs/debug)
- [Selectors Guide](https://playwright.dev/docs/selectors)

### Videos
- [Inspector Tutorial](https://www.youtube.com/watch?v=tJF7UhA59Gc)
- [Debugging Best Practices](https://www.youtube.com/watch?v=LM4yqrOzmFE)

### Tips
- Usa Inspector regularmente, no solo cuando hay errores
- El Locator Picker es tu mejor amigo
- La consola es perfecta para experimentar
- Step-by-step ayuda a entender el flujo
- Combina Inspector con slowMo para mejor visualización

## 📊 Validación

Para validar que dominas el Inspector:

1. Crea un test complejo de login + búsqueda + compra
2. Ejecútalo con Inspector
3. Usa solo el Locator Picker para encontrar selectores
4. Prueba cada locator en la consola antes de usarlo
5. Ejecuta paso a paso todo el flujo

Si puedes hacer esto sin consultar documentación, ¡has dominado el Inspector! 🎉

---

**Tiempo Estimado**: 1-2 horas
**Dificultad**: Principiante-Intermedio
**Próximo**: Ejercicio 02 - Trace Viewer
