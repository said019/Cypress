# Ejercicio 03: Guía de Codegen

## 🎯 Objetivo

Dominar el uso de Playwright Codegen para generar código de tests automáticamente, acelerar la creación de tests, y aprender mejores prácticas para refinar código generado.

## 📚 Conceptos Clave

### ¿Qué es Codegen?

Codegen (Code Generator) es una herramienta que:
- Graba tus interacciones con el navegador
- Genera código de Playwright automáticamente
- Soporta múltiples lenguajes (JS, TS, Python, C#, Java)
- Puede emular diferentes dispositivos
- Guarda y carga estado de autenticación

### ¿Cuándo Usar Codegen?

- ✅ Para crear tests rápidamente
- ✅ Para aprender selectores de Playwright
- ✅ Para explorar aplicaciones nuevas
- ✅ Como punto de partida para tests complejos
- ⚠️ NO como solución final (siempre refactoriza)

## 🚀 Uso Básico de Codegen

### Comando Básico

```bash
# Iniciar Codegen
npx playwright codegen

# Con URL específica
npx playwright codegen https://rahulshettyacademy.com/client

# Con navegador específico
npx playwright codegen --browser=firefox https://example.com

# Múltiples navegadores
npx playwright codegen --browser=chromium --browser=firefox https://example.com
```

### Interfaz de Codegen

```
┌─────────────────────────────────────────┐
│  Playwright Inspector                   │
├─────────────────────────────────────────┤
│  🔴 Recording  ⏸ Pause  🗑 Clear        │
├─────────────────────────────────────────┤
│  Target: JavaScript                     │
│  ▼ Test Generator                       │
├─────────────────────────────────────────┤
│  import { test, expect } from '@play... │
│                                         │
│  test('test', async ({ page }) => {    │
│    await page.goto('https://...');     │
│    await page.click('text=Login');     │
│    await page.fill('#email', 'test');  │
│  });                                    │
├─────────────────────────────────────────┤
│  📋 Copy  💾 Save                       │
└─────────────────────────────────────────┘
```

## 📝 Ejercicios Prácticos

### Ejercicio 3.1: Primer Test con Codegen

**Objetivo**: Generar tu primer test automáticamente

**Pasos**:
1. Ejecuta: `npx playwright codegen https://rahulshettyacademy.com/client`
2. Realiza estas acciones:
   - Ingresa email: `test@example.com`
   - Ingresa password: `Test@123`
   - Click en "Login"
   - Espera que cargue el dashboard
3. Copia el código generado
4. Guárdalo como `test-codegen-01.spec.js`

**TODO: Pega aquí el código generado**:
```javascript
// TODO: Pega el código que Codegen generó


```

**TODO: Analiza el código**:
- ¿Qué tipo de selectores usó?
- ¿Hay waits explícitos?
- ¿Es el código óptimo?

### Ejercicio 3.2: Generar con Diferentes Targets

**Objetivo**: Aprender a generar código en diferentes formatos

```bash
# JavaScript
npx playwright codegen --target=javascript https://example.com

# TypeScript
npx playwright codegen --target=typescript https://example.com

# Python
npx playwright codegen --target=python https://example.com

# C#
npx playwright codegen --target=csharp https://example.com

# Java
npx playwright codegen --target=java https://example.com
```

**TODO: Genera el mismo flujo en JS y TS**:
1. Ejecuta codegen con `--target=javascript`
2. Realiza login en el sitio de e-commerce
3. Guarda como `codegen-js.spec.js`
4. Ejecuta codegen con `--target=typescript`
5. Realiza el mismo flujo
6. Guarda como `codegen-ts.spec.ts`
7. Compara ambos archivos

**TODO: ¿Qué diferencias encuentras?**:
```
Diferencias:
1. _______________
2. _______________
3. _______________
```

### Ejercicio 3.3: Emulación de Dispositivos

**Objetivo**: Generar tests para dispositivos móviles

```bash
# iPhone 13
npx playwright codegen --device="iPhone 13" https://example.com

# iPad Pro
npx playwright codegen --device="iPad Pro" https://example.com

# Pixel 5
npx playwright codegen --device="Pixel 5" https://example.com

# Lista de dispositivos disponibles
npx playwright show-devices
```

**TODO: Genera test móvil**:
1. Ejecuta: `npx playwright codegen --device="iPhone 13" https://rahulshettyacademy.com/client`
2. Realiza login
3. Navega por productos
4. Guarda como `test-mobile-codegen.spec.js`

**TODO: Observa**:
- ¿El viewport es diferente?
- ¿Los selectores son los mismos?
- ¿Hay diferencias en la interacción?

### Ejercicio 3.4: Viewport Personalizado

**Objetivo**: Generar tests con tamaños de pantalla específicos

```bash
# Desktop grande
npx playwright codegen --viewport-size=1920,1080 https://example.com

# Tablet
npx playwright codegen --viewport-size=768,1024 https://example.com

# Mobile
npx playwright codegen --viewport-size=375,667 https://example.com
```

**TODO: Prueba diferentes viewports**:
1. Genera test con viewport 1920x1080
2. Genera test con viewport 375x667
3. Compara los códigos generados
4. ¿Hay diferencias en los selectores?

### Ejercicio 3.5: Guardar y Cargar Autenticación

**Objetivo**: Reutilizar sesiones de autenticación

**Paso 1: Guardar autenticación**
```bash
npx playwright codegen --save-storage=auth.json https://rahulshettyacademy.com/client
```

**Pasos**:
1. Ejecuta el comando
2. Realiza login
3. Navega por el sitio autenticado
4. Cierra el navegador
5. Verifica que se creó `auth.json`

**Paso 2: Cargar autenticación**
```bash
npx playwright codegen --load-storage=auth.json https://rahulshettyacademy.com/client
```

**Pasos**:
1. Ejecuta el comando
2. Observa que ya estás autenticado
3. Genera código para acciones post-login
4. Guarda como `test-with-auth.spec.js`

**TODO: Ventajas de este approach**:
```
Ventajas:
1. _______________
2. _______________
3. _______________
```

## 🎓 Refactorización de Código Generado

### Antes: Código Generado

```javascript
// Código típico de Codegen
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/client');
  await page.locator('#userEmail').click();
  await page.locator('#userEmail').fill('test@example.com');
  await page.locator('#userPassword').click();
  await page.locator('#userPassword').fill('Test@123');
  await page.locator('#login').click();
  await page.locator('text=ZARA COAT 3').click();
  await page.locator('text=Add To Cart').click();
});
```

### Después: Código Refactorizado

```javascript
// TODO: Refactoriza el código anterior siguiendo estos pasos

import { test, expect } from '@playwright/test';

test('agregar producto al carrito', async ({ page }) => {
  // 1. Extrae login a una función helper
  async function login(page, email, password) {
    // TODO: Implementa
  }
  
  // 2. Extrae búsqueda de producto a función
  async function findProduct(page, productName) {
    // TODO: Implementa
  }
  
  // 3. Extrae agregar al carrito a función
  async function addToCart(page, productLocator) {
    // TODO: Implementa
  }
  
  // 4. Usa las funciones
  await page.goto('https://rahulshettyacademy.com/client');
  await login(page, 'test@example.com', 'Test@123');
  
  const product = await findProduct(page, 'ZARA COAT 3');
  await addToCart(page, product);
  
  // 5. Agrega assertions
  await expect(page.locator('.cart-item')).toBeVisible();
});
```

### Mejores Prácticas de Refactorización

1. **Elimina clicks redundantes**
```javascript
// ❌ Generado por Codegen
await page.locator('#email').click();
await page.locator('#email').fill('test@test.com');

// ✅ Refactorizado
await page.locator('#email').fill('test@test.com');
```

2. **Usa mejores selectores**
```javascript
// ❌ Generado por Codegen
await page.locator('body > div > div > button').click();

// ✅ Refactorizado
await page.locator('button:has-text("Submit")').click();
// o mejor aún
await page.getByRole('button', { name: 'Submit' }).click();
```

3. **Agrega waits apropiados**
```javascript
// ❌ Sin waits
await page.click('button');
await page.locator('.result').textContent();

// ✅ Con waits
await page.click('button');
await page.waitForLoadState('networkidle');
await page.locator('.result').textContent();
```

4. **Extrae a Page Objects**
```javascript
// ❌ Todo en el test
test('login', async ({ page }) => {
  await page.goto('...');
  await page.locator('#email').fill('...');
  await page.locator('#password').fill('...');
  await page.locator('#login').click();
});

// ✅ Con Page Object
test('login', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('email', 'password');
});
```

## 💡 Tips Profesionales

### 1. Codegen como Exploración

```bash
# Usa Codegen para explorar una app nueva
npx playwright codegen https://nueva-app.com

# Observa:
# - Estructura del DOM
# - Selectores que Playwright elige
# - Timing de elementos
# - Network requests
```

### 2. Combinar con Inspector

```bash
# Inicia Codegen con Inspector
npx playwright codegen --debug https://example.com

# Beneficios:
# - Puedes pausar la grabación
# - Probar selectores en tiempo real
# - Ver el código generado paso a paso
```

### 3. Generar Assertions

```javascript
// Codegen NO genera assertions automáticamente
// TODO: Siempre agrega assertions manualmente

test('test generado', async ({ page }) => {
  await page.goto('...');
  await page.click('button');
  
  // ✅ Agrega assertions
  await expect(page.locator('.success')).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h1')).toHaveText('Welcome');
});
```

### 4. Organizar Código Generado

```
tests/
├── generated/           # Código crudo de Codegen
│   ├── flow-1.spec.js
│   └── flow-2.spec.js
├── refactored/         # Código refactorizado
│   ├── login.spec.js
│   └── checkout.spec.js
└── page-objects/       # Versión final con POM
    ├── LoginPage.js
    └── CheckoutPage.js
```

## ✅ Checklist de Dominio

Marca cuando puedas hacer cada tarea sin ayuda:

- [ ] Iniciar Codegen con diferentes opciones
- [ ] Generar código en JS y TS
- [ ] Usar emulación de dispositivos
- [ ] Configurar viewport personalizado
- [ ] Guardar y cargar autenticación
- [ ] Identificar código que necesita refactorización
- [ ] Eliminar clicks redundantes
- [ ] Mejorar selectores generados
- [ ] Agregar waits apropiados
- [ ] Convertir código a Page Objects

## 🔗 Recursos Adicionales

### Documentación
- [Codegen Docs](https://playwright.dev/docs/codegen)
- [Test Generator](https://playwright.dev/docs/codegen-intro)
- [Selectors](https://playwright.dev/docs/selectors)

### Videos
- [Codegen Tutorial](https://www.youtube.com/watch?v=LM4yqrOzmFE)
- [Best Practices](https://www.youtube.com/watch?v=tJF7UhA59Gc)

### Artículos
- [Refactoring Generated Code](https://playwright.dev/docs/best-practices)
- [Page Object Model](https://playwright.dev/docs/pom)

## 📊 Ejercicio Final

**Objetivo**: Crear un test completo usando Codegen y refactorización

**Pasos**:
1. Usa Codegen para grabar este flujo:
   - Login en el sitio de e-commerce
   - Buscar producto "ZARA COAT 3"
   - Agregar al carrito
   - Ir al carrito
   - Proceder al checkout
   - Llenar información de envío
   - Completar orden

2. Guarda el código generado como `generated-checkout.spec.js`

3. Refactoriza el código:
   - Elimina clicks redundantes
   - Mejora selectores
   - Agrega waits apropiados
   - Extrae funciones helper
   - Agrega assertions
   - Guarda como `refactored-checkout.spec.js`

4. Convierte a Page Objects:
   - Crea LoginPage
   - Crea ProductsPage
   - Crea CartPage
   - Crea CheckoutPage
   - Guarda como `pom-checkout.spec.js`

5. Compara los tres archivos:
   - ¿Cuál es más legible?
   - ¿Cuál es más mantenible?
   - ¿Cuál es más reutilizable?

Si completaste este ejercicio, ¡has dominado Codegen! 🎉

---

**Tiempo Estimado**: 1.5-2 horas
**Dificultad**: Principiante-Intermedio
**Próximo**: Ejercicio 04 - Análisis de Artefactos
