# Módulos de Ejercicios - Playwright Mastery Practice

Este directorio contiene módulos de aprendizaje estructurados para dominar Playwright desde los fundamentos hasta temas avanzados.

## 📚 Estructura de Módulos

Cada módulo sigue una estructura consistente:

```
exercises/XX-nombre-modulo/
├── README.md                    # Objetivos e instrucciones del módulo
├── exercises/
│   ├── exercise-01.js          # Implementación JavaScript
│   ├── exercise-01.ts          # Implementación TypeScript
│   ├── exercise-02.js
│   └── exercise-02.ts
├── solutions/
│   ├── solution-01.js          # Soluciones de referencia
│   ├── solution-01.ts
│   ├── solution-02.js
│   └── solution-02.ts
└── tests/
    ├── exercise-01.spec.js     # Tests de validación
    └── exercise-01.spec.ts
```

## 🎯 Ruta de Aprendizaje

### Nivel Principiante
1. **01-fundamentals** - Fundamentos de JavaScript y TypeScript
2. **02-web-automation** - Automatización web básica
3. **03-api-testing** - Testing de APIs

### Nivel Intermedio
4. **04-network-interception** - Interceptación de red y mocking
5. **05-dev-tools** - Herramientas de desarrollo de Playwright
6. **06-visual-testing** - Testing visual
7. **07-mobile-testing** - Emulación de dispositivos móviles

### Nivel Avanzado
8. **08-ai-integration** - Integración con AI Agents
9. **09-mcp-integration** - Servidores MCP
10. **10-cicd** - Integración CI/CD

### Temas Especializados
11. **11-test-data** - Gestión de datos de prueba
12. **12-error-handling** - Manejo de errores y debugging
13. **13-performance** - Testing de rendimiento
14. **14-accessibility** - Testing de accesibilidad
15. **15-cross-browser** - Testing multi-navegador
16. **16-test-organization** - Organización y mantenimiento

## 🚀 Cómo Usar Este Sistema

1. **Comienza con el módulo 01** si eres nuevo en JavaScript/TypeScript
2. **Revisa el README** de cada módulo para entender los objetivos
3. **Completa los ejercicios** en orden (JS o TS según tu preferencia)
4. **Ejecuta los tests** para validar tu solución
5. **Compara con las soluciones** si necesitas ayuda
6. **Avanza al siguiente módulo** cuando completes todos los ejercicios

## 📝 Convenciones

- **Archivos .js**: Implementaciones en JavaScript
- **Archivos .ts**: Implementaciones en TypeScript
- **Archivos .spec.js/.spec.ts**: Tests de validación
- **Comentarios en español**: Toda la documentación está en español

## 🧪 Ejecutar Tests

```bash
# Ejecutar todos los tests de un módulo
npm test -- exercises/01-fundamentals

# Ejecutar un test específico
npm test -- exercises/01-fundamentals/tests/exercise-01.spec.js

# Ejecutar en modo UI para debugging
npm test -- --ui exercises/01-fundamentals
```

## 📊 Seguimiento de Progreso

Tu progreso se rastrea automáticamente. Usa el sistema de validación para verificar que has completado todos los ejercicios de un módulo antes de avanzar.

## 💡 Consejos

- Practica ambas versiones (JS y TS) para entender las diferencias
- Lee los comentarios en el código - contienen explicaciones importantes
- No te saltes módulos - cada uno construye sobre el anterior
- Usa las herramientas de Playwright (Inspector, Trace Viewer) para aprender
- Experimenta modificando los ejercicios para profundizar tu comprensión

## 🆘 Ayuda

Si tienes problemas:
1. Revisa el README del módulo
2. Consulta las soluciones de referencia
3. Ejecuta los tests para ver qué falta
4. Revisa la documentación oficial de Playwright
5. Experimenta en modo headed para ver qué sucede

¡Buena suerte en tu viaje de aprendizaje con Playwright! 🎭
