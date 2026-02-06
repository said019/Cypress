# Módulo 04: Page Object Model Enhancement

## Descripción

Este módulo mejora el patrón Page Object Model (POM) con clases base, componentes reutilizables y patrones avanzados. Aprenderás a crear page objects robustos, mantenibles y escalables.

## Objetivos de Aprendizaje

1. **BasePage Abstract Class**: Crear clase base con funcionalidad común
2. **PageFragment Pattern**: Implementar componentes UI reutilizables
3. **Refactoring Exercises**: Mejorar page objects existentes
4. **Inheritance & Composition**: Aplicar patrones de diseño
5. **Fluent Interface**: Crear APIs fluidas para tests
6. **Best Practices**: Seguir convenciones y estándares

## Prerequisitos

- Completar Módulo 01, 02 y 03
- Conocimiento de POO (Programación Orientada a Objetos)
- Entender herencia y composición
- Familiaridad con patrones de diseño

## Ejercicios

### Ejercicio 01: BasePage Abstract Class
- Métodos comunes: waitForElement, safeClick, safeType
- Navigation helpers
- isLoaded abstract method
- Error handling

### Ejercicio 02: PageFragment Components
- Header component
- Footer component
- Navigation menu
- Search box
- Composition pattern

### Ejercicio 03: Refactoring Existing Page Objects
- Mejorar LoginPage
- Mejorar DashboardPage
- Mejorar CartPage
- Aplicar herencia
- Fluent interface

## Recursos

- [Page Object Model Pattern](https://playwright.dev/docs/pom)
- [Design Patterns](https://refactoring.guru/design-patterns)

## Comandos

```bash
# Validar módulo
node exercises/utils/cli.js validate 04-page-object-model

# Ejecutar tests
npx playwright test exercises/04-page-object-model/tests/
```
