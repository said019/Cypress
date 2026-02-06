# Módulo 05: Network Interception and Mocking

## Descripción

Este módulo enseña cómo interceptar y mockear llamadas de red en Playwright. Aprenderás a controlar respuestas API, simular errores, inyectar datos de prueba y monitorear tráfico de red.

## Objetivos de Aprendizaje

1. **NetworkInterceptor**: Interceptar requests y modificar responses
2. **MockResponseBuilder**: Construir respuestas mock complejas
3. **Network Monitoring**: Capturar y analizar tráfico
4. **Request Blocking**: Bloquear recursos innecesarios
5. **Error Simulation**: Simular errores de red y timeouts
6. **Data Injection**: Inyectar datos de prueba en responses

## Prerequisitos

- Completar Módulos 01-04
- Conocimiento de REST APIs
- Entender HTTP requests/responses
- Familiaridad con JSON

## Ejercicios

### Ejercicio 01: NetworkInterceptor Utility ✅
- Interceptar requests por URL pattern
- Modificar responses
- Bloquear requests
- Capturar tráfico de red
- Validar payloads

### Ejercicio 02: MockResponseBuilder ✅
- Builder pattern para responses
- Delays personalizados
- Custom headers y status codes
- Error response templates
- Response chaining

### Ejercicio 03: E-commerce App Interception ✅
- Interceptar llamadas de productos
- Inyectar datos de prueba
- Simular errores de API
- Validar request payloads
- Testing sin backend

## Recursos

- [Playwright Network Interception](https://playwright.dev/docs/network)
- [Mock Service Worker](https://mswjs.io/)

## Comandos

```bash
# Validar módulo
node exercises/utils/cli.js validate 05-network-interception

# Ejecutar tests
npx playwright test exercises/05-network-interception/tests/
```
