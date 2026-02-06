# Ejercicio 03: Refactoring Existing Page Objects

## Objetivo

Refactorizar los page objects existentes del proyecto para aplicar mejores prácticas, herencia de BasePage, y patrones avanzados.

## Page Objects a Refactorizar

### 1. LoginPage
**Ubicación**: `pageobjects/LoginPage.js` y `pageobjects_ts/LoginPage.ts`

**Mejoras a Aplicar**:
- Heredar de BasePage
- Usar métodos safeClick y safeType
- Implementar isLoaded()
- Agregar fluent interface
- Mejorar manejo de errores

**Ejemplo de Refactoring**:

```javascript
// ANTES
class LoginPage {
  constructor(page) {
    this.page = page;
    this.signInbutton = page.locator("[value='Login']");
    this.cardTitle = page.locator(".card-body b");
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async validLogin(username, password) {
    await this.userName.type(username);
    await this.password.type(password);
    await this.signInbutton.click();
    await this.page.waitForLoadState('networkidle');
  }
}

// DESPUÉS
class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = "https://rahulshettyacademy.com/client";
  }

  // Locators
  get usernameInput() { return '#userEmail'; }
  get passwordInput() { return '#userPassword'; }
  get loginButton() { return "[value='Login']"; }
  get cardTitle() { return ".card-body b"; }

  async isLoaded() {
    return await this.isElementVisible(this.loginButton);
  }

  async login(username, password) {
    await this.safeType(this.usernameInput, username);
    await this.safeType(this.passwordInput, password);
    await this.safeClick(this.loginButton);
    await this.waitForPageLoad();
    return this; // Fluent interface
  }

  async goTo() {
    await this.navigate(this.url);
    return this;
  }
}
```

### 2. DashboardPage
**Ubicación**: `pageobjects/DashboardPage.js` y `pageobjects_ts/DashboardPage.ts`

**Mejoras a Aplicar**:
- Heredar de BasePage
- Usar PageFragments para componentes comunes
- Implementar isLoaded()
- Agregar métodos de búsqueda mejorados
- Fluent interface

### 3. CartPage
**Ubicación**: `pageobjects/CartPage.js` y `pageobjects_ts/CartPage.ts`

**Mejoras a Aplicar**:
- Heredar de BasePage
- Mejorar validaciones
- Implementar isLoaded()
- Agregar métodos helper
- Fluent interface

## Tareas

### TODO 1: Refactorizar LoginPage
1. Crear `exercises/04-page-object-model/refactored/LoginPageRefactored.js`
2. Heredar de BasePage
3. Implementar isLoaded()
4. Usar safeClick y safeType
5. Agregar fluent interface
6. Crear versión TypeScript

### TODO 2: Refactorizar DashboardPage
1. Crear `exercises/04-page-object-model/refactored/DashboardPageRefactored.js`
2. Heredar de BasePage
3. Usar HeaderFragment
4. Implementar isLoaded()
5. Mejorar métodos de búsqueda
6. Crear versión TypeScript

### TODO 3: Refactorizar CartPage
1. Crear `exercises/04-page-object-model/refactored/CartPageRefactored.js`
2. Heredar de BasePage
3. Implementar isLoaded()
4. Mejorar validaciones
5. Agregar fluent interface
6. Crear versión TypeScript

### TODO 4: Crear Tests de Comparación
1. Crear tests que comparen versión original vs refactorizada
2. Verificar que funcionalidad se mantiene
3. Demostrar mejoras en legibilidad y mantenibilidad

## Patrones a Aplicar

### 1. Herencia
```javascript
class LoginPage extends BasePage {
  // Hereda todos los métodos de BasePage
}
```

### 2. Composition (PageFragments)
```javascript
class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.header = new HeaderFragment(page);
  }
}
```

### 3. Fluent Interface
```javascript
await loginPage
  .goTo()
  .login(username, password);
```

### 4. Getters para Locators
```javascript
get loginButton() { return "[value='Login']"; }
```

## Criterios de Éxito

- ✅ Todos los page objects heredan de BasePage
- ✅ Método isLoaded() implementado
- ✅ Uso de safeClick y safeType
- ✅ Fluent interface aplicada
- ✅ PageFragments usados donde aplique
- ✅ Tests pasan con versión refactorizada
- ✅ Código más legible y mantenible

## Recursos

- `exercises/04-page-object-model/solutions/solution-01-base-page.js`
- `exercises/04-page-object-model/solutions/solution-02-page-fragments.js`
- `pageobjects/` - Page objects originales
