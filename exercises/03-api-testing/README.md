# Módulo 03: API Testing Integration

## Descripción

Este módulo mejora las capacidades de testing de APIs y crea escenarios híbridos UI+API. Aprenderás a usar APIs para setup de datos, validación de respuestas, manejo de autenticación y testing end-to-end eficiente.

## Objetivos de Aprendizaje

1. **Mejorar APIUtils**: Interceptors, retry logic, caching
2. **Crear APIClient**: Métodos HTTP completos, validación de schemas
3. **Testing Híbrido**: Combinar UI y API para tests eficientes
4. **Autenticación**: Token-based, cookies, OAuth
5. **Validación de Respuestas**: Status codes, headers, body, schemas
6. **Manejo de Errores**: Retries, timeouts, error handling

## Prerequisitos

- Completar Módulo 01 y 02
- Conocimiento básico de REST APIs
- Entender HTTP methods (GET, POST, PUT, DELETE)
- Familiaridad con JSON

## Ejercicios

### Ejercicio 01: Enhanced API Utils
- Request/response interceptors
- Retry logic con exponential backoff
- Response caching
- Token management

### Ejercicio 02: API Client Implementation
- GET, POST, PUT, DELETE methods
- Schema validation
- Error handling
- Response parsing

### Ejercicio 03: Hybrid UI+API Testing
- API para setup, UI para validación
- Session management
- Cookie handling
- Auth patterns

## Recursos

- [Playwright API Testing](https://playwright.dev/docs/api-testing)
- [REST API Best Practices](https://restfulapi.net/)

## Comandos

```bash
# Validar módulo
node exercises/utils/cli.js validate 03-api-testing

# Ejecutar tests
npx playwright test exercises/03-api-testing/tests/
```
