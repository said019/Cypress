# Módulo 02: Web Automation Fundamentals Enhancement

## Descripción

Este módulo mejora las capacidades de automatización web existentes con estrategias avanzadas de locators, manejo de elementos dinámicos, interacciones complejas y patrones de validación de UI. Construye sobre los tests existentes de ClientApp para proporcionar ejercicios prácticos con aplicaciones reales.

## Objetivos de Aprendizaje

Al completar este módulo, serás capaz de:

1. **Dominar Estrategias de Locators**: Usar CSS selectors, XPath, text-based locators y role-based locators de manera efectiva
2. **Manejar Elementos Dinámicos**: Trabajar con dropdowns, calendarios, checkboxes, radio buttons y file uploads
3. **Implementar Interacciones Avanzadas**: Realizar hover, drag-and-drop, keyboard interactions y mouse events
4. **Gestionar Contextos Complejos**: Manejar frames, ventanas múltiples y diálogos
5. **Validar Estado de UI**: Implementar checks de visibilidad, validación de texto, assertions de atributos
6. **Aplicar Estrategias de Espera**: Usar auto-waiting, explicit waits y custom wait conditions

## Prerequisitos

- Completar Módulo 01: JavaScript y TypeScript Fundamentals
- Conocimiento básico de HTML y CSS
- Familiaridad con selectores CSS
- Entender el DOM (Document Object Model)

## Estructura del Módulo

```
02-web-automation/
├── README.md                           # Este archivo
├── exercises/
│   ├── exercise-01-locators.js        # Estrategias de locators
│   ├── exercise-01-locators.ts
│   ├── exercise-02-dynamic-elements.js # Elementos dinámicos
│   ├── exercise-02-dynamic-elements.ts
│   ├── exercise-03-interactions.js     # Interacciones avanzadas
│   ├── exercise-03-interactions.ts
│   └── exercise-04-validations.js      # Patrones de validación
│   └── exercise-04-validations.ts
├── solutions/
│   ├── solution-01-locators.js
│   ├── solution-01-locators.ts
│   ├── solution-02-dynamic-elements.js
│   ├── solution-02-dynamic-elements.ts
│   ├── solution-03-interactions.js
│   ├── solution-03-interactions.ts
│   ├── solution-04-validations.js
│   └── solution-04-validations.ts
└── tests/
    ├── exercise-01.spec.js
    ├── exercise-02.spec.js
    ├── exercise-03.spec.js
    └── exercise-04.spec.js
```

## Ejercicios

### Ejercicio 01: Estrategias de Locators

**Objetivo**: Dominar diferentes estrategias para localizar elementos en la página

**Conceptos**:
- CSS Selectors (id, class, attribute, pseudo-classes)
- XPath (absolute, relative, axes)
- Text-based locators (getByText, getByRole)
- Role-based locators (ARIA roles)
- Best practices para locators robustos

**Tareas**:
1. Implementar funciones para localizar elementos usando CSS selectors
2. Crear locators usando XPath para casos complejos
3. Usar text-based locators para elementos con texto visible
4. Implementar role-based locators para accesibilidad
5. Comparar y elegir la mejor estrategia para cada caso

**Tiempo estimado**: 45 minutos

### Ejercicio 02: Manejo de Elementos Dinámicos

**Objetivo**: Trabajar con elementos que cambian dinámicamente en la página

**Conceptos**:
- Dropdowns (select, custom dropdowns)
- Date pickers y calendarios
- Checkboxes y radio buttons
- File uploads
- Estrategias de espera (waitForSelector, waitForLoadState)

**Tareas**:
1. Seleccionar opciones en dropdowns nativos y custom
2. Interactuar con date pickers y calendarios
3. Manejar checkboxes y radio buttons
4. Implementar file upload
5. Usar estrategias de espera apropiadas

**Tiempo estimado**: 60 minutos

### Ejercicio 03: Interacciones Avanzadas

**Objetivo**: Implementar interacciones complejas con elementos de la página

**Conceptos**:
- Hover actions
- Drag and drop
- Keyboard interactions (press, type, shortcuts)
- Mouse events (click, double-click, right-click)
- Frame handling (iframes)
- Window management (múltiples ventanas/tabs)
- Dialog handling (alert, confirm, prompt)

**Tareas**:
1. Implementar hover actions para menús desplegables
2. Realizar drag and drop de elementos
3. Usar keyboard shortcuts y navegación
4. Manejar frames e iframes
5. Trabajar con múltiples ventanas
6. Manejar diálogos del navegador

**Tiempo estimado**: 75 minutos

### Ejercicio 04: Patrones de Validación de UI

**Objetivo**: Implementar validaciones robustas del estado de la UI

**Conceptos**:
- Visibility checks (isVisible, isHidden)
- Text content validation (toHaveText, toContainText)
- Attribute assertions (toHaveAttribute, toHaveClass)
- Element count verification (toHaveCount)
- State assertions (isEnabled, isDisabled, isChecked)
- Screenshot comparisons

**Tareas**:
1. Verificar visibilidad de elementos
2. Validar contenido de texto
3. Verificar atributos y clases
4. Contar elementos en la página
5. Validar estados de elementos
6. Implementar assertions complejas

**Tiempo estimado**: 45 minutos

## Aplicación de Práctica

Los ejercicios utilizan la aplicación e-commerce existente en el proyecto:
- **URL**: https://rahulshettyacademy.com/client
- **Credenciales de prueba**: Disponibles en los tests existentes

También se pueden usar sitios de práctica:
- https://the-internet.herokuapp.com/
- https://demo.playwright.dev/todomvc/

## Recursos Adicionales

### Documentación Oficial
- [Playwright Locators](https://playwright.dev/docs/locators)
- [Playwright Actions](https://playwright.dev/docs/input)
- [Playwright Assertions](https://playwright.dev/docs/test-assertions)
- [Playwright Auto-waiting](https://playwright.dev/docs/actionability)

### Guías y Tutoriales
- [Best Practices for Locators](https://playwright.dev/docs/best-practices#use-locators)
- [Handling Dynamic Content](https://playwright.dev/docs/network#wait-for-network-idle)
- [Working with Frames](https://playwright.dev/docs/frames)

### Tests Existentes para Referencia
- `tests/ClientApp.spec.js` - Tests básicos de la aplicación
- `tests/Calendar.spec.js` - Manejo de calendarios
- `tests/MoreValidations.spec.js` - Validaciones avanzadas

## Comandos Útiles

```bash
# Validar el módulo
node exercises/utils/cli.js validate 02-web-automation

# Ejecutar tests del módulo
npx playwright test exercises/02-web-automation/tests/

# Ejecutar en modo UI para debugging
npx playwright test exercises/02-web-automation/tests/ --ui

# Ejecutar un ejercicio específico
npx playwright test exercises/02-web-automation/tests/exercise-01.spec.js

# Generar código con Codegen
npx playwright codegen https://rahulshettyacademy.com/client
```

## Notas Importantes

1. **Auto-waiting**: Playwright espera automáticamente a que los elementos sean actionable antes de interactuar
2. **Locator Resilience**: Prefiere locators basados en roles y texto sobre CSS/XPath cuando sea posible
3. **Test Isolation**: Cada test debe ser independiente y no depender del estado de otros tests
4. **Error Handling**: Implementa manejo de errores apropiado para elementos que pueden no existir
5. **Performance**: Usa estrategias de espera eficientes para no ralentizar los tests

## Evaluación

Para completar este módulo exitosamente:

- ✅ Completar los 4 ejercicios (JS y TS)
- ✅ Todos los tests de validación deben pasar
- ✅ Código debe seguir best practices de Playwright
- ✅ Implementaciones JS y TS deben ser equivalentes
- ✅ Documentar cualquier desafío o aprendizaje

## Próximos Pasos

Después de completar este módulo, estarás listo para:
- Módulo 03: API Testing Integration
- Módulo 04: Network Interception and Mocking
- Módulo 05: Playwright Developer Tools

---

**¿Necesitas ayuda?** Revisa los tests existentes en el directorio `tests/` o consulta la documentación oficial de Playwright.
