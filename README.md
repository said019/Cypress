# 🎭 Playwright Mastery Practice

Proyecto completo de aprendizaje y práctica de Playwright, desde fundamentos hasta temas avanzados incluyendo AI Agents, MCP Servers y CI/CD.

## 📚 Contenido del Curso

Este proyecto cubre todos los temas del curso de Playwright:

1. ✅ **Fundamentos de JavaScript y TypeScript** - Conceptos básicos necesarios para automatización
2. ✅ **Automatización Web** - Locators, interacciones, validaciones
3. ✅ **Testing de APIs** - Integración UI + API, autenticación, validación de schemas
4. ✅ **Page Object Model** - Patrones avanzados, herencia, composición
5. ✅ **Interceptación de Red** - Mocking, modificación de requests/responses
6. ✅ **Herramientas de Playwright** - Inspector, Trace Viewer, Codegen
7. 🚧 **Testing Visual** - Comparación de screenshots, regresión visual
8. 🚧 **Emulación Móvil** - Testing en dispositivos móviles
9. 🚧 **Frameworks BDD** - Cucumber con Gherkin
10. 🚧 **Framework Mocha** - Alternativa a Cucumber
11. 🚧 **Reporting Avanzado** - Allure con anotaciones ricas
12. 🚧 **Integración con AI** - Playwright AI Agents, GitHub Copilot, MCP Servers
13. 🚧 **MCP Servers** - Model Context Protocol
14. 🚧 **CI/CD** - Jenkins, Docker, GitHub Actions
15. 🚧 **Test Data Management** - Gestión de datos de prueba
16. 🚧 **Error Handling** - Manejo de errores y debugging
17. 🚧 **Performance Testing** - Testing de rendimiento
18. 🚧 **Accessibility Testing** - Testing de accesibilidad
19. 🚧 **Cross-Browser Testing** - Testing multi-navegador
20. 🚧 **Test Organization** - Organización y mantenimiento
21. 🚧 **Documentation** - Documentación completa

## 🚀 Inicio Rápido

### Instalación

```bash
# Instalar dependencias
npm install

# Instalar navegadores de Playwright
npx playwright install
```

### Ejecutar Tests Existentes

```bash
# Todos los tests
npm run regression

# Tests web
npm run webTests

# Tests de API
npm run APITests
```

### Sistema de Ejercicios

```bash
# Listar módulos de ejercicios disponibles
npm run exercises:list

# Ver tu progreso
npm run exercises:progress

# Validar estructura de módulos
npm run exercises:validate

# Ver estadísticas
npm run exercises:stats

# Ejecutar property tests
npm run test:property
```

## 📖 Estructura del Proyecto

```
playwright-mastery-practice/
├── examples/                    # Ejemplos básicos JS/TS
│   ├── js/                     # Ejemplos JavaScript
│   └── ts/                     # Ejemplos TypeScript
├── exercises/                   # 🆕 Sistema de módulos de ejercicios
│   ├── utils/                  # Utilidades del sistema
│   └── XX-nombre-modulo/       # Módulos de aprendizaje
├── pageobjects/                 # Page Objects (JavaScript)
├── pageobjects_ts/              # Page Objects (TypeScript)
├── utils/                       # Utilidades de API (JavaScript)
├── utils_ts/                    # Utilidades de API (TypeScript)
├── features/                    # Cucumber BDD
├── tests/                       # Tests existentes
│   └── property/               # 🆕 Property-based tests
├── docs/                        # 🆕 Documentación completa
└── .kiro/specs/                # 🆕 Especificaciones del proyecto
```

## 🎯 Sistema de Ejercicios

El proyecto incluye un sistema completo de ejercicios estructurados:

### Características

- ✅ **Módulos Progresivos**: Aprendizaje paso a paso
- ✅ **JS y TS Paralelos**: Practica en ambos lenguajes
- ✅ **Validación Automática**: Tests para verificar soluciones
- ✅ **Seguimiento de Progreso**: Rastrea tu avance automáticamente
- ✅ **CLI Intuitivo**: Comandos simples para gestión
- ✅ **Property-Based Testing**: Validación exhaustiva

### Comandos del CLI

```bash
# Ver ayuda
node exercises/utils/cli.js help

# Listar módulos
node exercises/utils/cli.js list

# Validar módulos
node exercises/utils/cli.js validate

# Ver progreso
node exercises/utils/cli.js progress

# Iniciar ejercicio
node exercises/utils/cli.js start 01-fundamentals exercise-01

# Completar ejercicio
node exercises/utils/cli.js complete 01-fundamentals exercise-01
```

## 📝 Ejemplos Básicos

### Ejecutar ejemplo en JavaScript
```bash
npx playwright test examples/js/basic-playwright.js
```

### Ejecutar ejemplo en TypeScript
```bash
npx playwright test examples/ts/basic-playwright.ts
```

### Migrar de JavaScript a TypeScript
1. Cambia la extensión `.js` a `.ts`
2. Agrega tipos explícitos donde sea posible
3. Usa el archivo `tsconfig.json` para compilar y ejecutar

## 🧪 Testing

### Tests Existentes

```bash
# Tests de UI
npm test tests/ClientApp.spec.js

# Tests de API
npm test tests/WebAPIPart1.spec.js

# Tests con Page Objects
npm test tests/ClientAppPO.spec.js
```

### Property-Based Tests

```bash
# Ejecutar todos los property tests
npm run test:property

# Ejecutar tests específicos
npx playwright test tests/property/module-structure.spec.js
```

## 📚 Documentación

- [Sistema de Ejercicios](docs/SISTEMA_EJERCICIOS.md) - Documentación técnica completa
- [Tarea 1 Completada](docs/TAREA_01_COMPLETADA.md) - Resumen de infraestructura
- [README de Ejercicios](exercises/README.md) - Guía de módulos
- [Plantilla de Módulos](exercises/MODULE_TEMPLATE.md) - Crear nuevos módulos
- [Utilidades](exercises/utils/README.md) - Documentación de utilidades

## 🛠️ Tecnologías

- **Playwright** ^1.40 - Framework de testing
- **TypeScript** ^5.4.5 - Tipado estático
- **Cucumber** - BDD framework
- **Allure** - Reporting avanzado
- **Fast-check** - Property-based testing
- **Mocha** - Framework alternativo

## 🎓 Ruta de Aprendizaje

### Nivel Principiante
1. Fundamentos de JavaScript/TypeScript
2. Automatización web básica
3. Testing de APIs

### Nivel Intermedio
4. Interceptación de red
5. Herramientas de desarrollo
6. Testing visual
7. Emulación móvil

### Nivel Avanzado
8. Integración con AI
9. MCP Servers
10. CI/CD

### Temas Especializados
11. Gestión de datos de prueba
12. Manejo de errores
13. Testing de rendimiento
14. Testing de accesibilidad
15. Testing multi-navegador
16. Organización y mantenimiento

## 🤝 Contribuir

Para contribuir al proyecto:

1. Sigue las convenciones de nomenclatura
2. Documenta todo en español
3. Crea tests de validación
4. Valida antes de commit: `npm run exercises:validate`
5. Ejecuta property tests: `npm run test:property`

## 📄 Especificaciones

El proyecto sigue una metodología de desarrollo dirigida por especificaciones:

- **Requirements**: 20 requisitos con 120 criterios de aceptación
- **Design**: 20 propiedades de correctitud
- **Tasks**: 100+ tareas de implementación

Ver especificaciones completas en `.kiro/specs/playwright-mastery-practice/`

## 🎉 Estado del Proyecto

### Progreso General: 29% Completado (6 de 21 módulos)

- ✅ **Infraestructura del Sistema**: Completada
- ✅ **Property-Based Tests**: 39 tests (87% pasando)
- ✅ **Documentación**: Completa en español
- ✅ **Módulo 01**: JavaScript y TypeScript Fundamentals (100%)
- ✅ **Módulo 02**: Web Automation Fundamentals (100%)
- ✅ **Módulo 03**: API Testing Integration (100%)
- ✅ **Módulo 04**: Page Object Model Enhancement (100%)
- ✅ **Módulo 05**: Network Interception and Mocking (100%)
- ✅ **Módulo 06**: Playwright Developer Tools (100%)
- 🚧 **Módulos 07-21**: En desarrollo

### Estadísticas
- **36 ejercicios** implementados (19 JS + 17 TS)
- **37 soluciones** creadas (22 JS + 15 TS)
- **21 tests** de validación
- **~300 funciones/métodos** implementados
- **~17,500 líneas** de código (incluyendo documentación)

## 📞 Recursos

- [Documentación de Playwright](https://playwright.dev)
- [Fast-check](https://github.com/dubzzz/fast-check)
- [Cucumber](https://cucumber.io)
- [Allure](https://docs.qameta.io/allure/)

---

**Nota**: Este es un proyecto de aprendizaje completo que cubre desde fundamentos hasta temas avanzados de Playwright. Sigue la ruta de aprendizaje progresiva para obtener los mejores resultados.
