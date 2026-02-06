# Módulo 07: Visual Testing Implementation

## Descripción

Este módulo enseña cómo implementar visual regression testing en Playwright. Aprenderás a capturar screenshots, comparar imágenes, detectar cambios visuales y manejar baselines para diferentes navegadores.

## Objetivos de Aprendizaje

1. **VisualTester Utility**: Crear clase para testing visual
2. **Baseline Management**: Gestionar imágenes de referencia
3. **Image Comparison**: Comparar screenshots y detectar diferencias
4. **Masked Screenshots**: Excluir elementos dinámicos
5. **Cross-Browser Testing**: Baselines específicos por navegador
6. **Diff Reports**: Generar reportes de diferencias visuales

## Prerequisitos

- Completar Módulos 01-06
- Conocimiento de screenshots en Playwright
- Entender conceptos de regresión visual
- Familiaridad con testing de UI

## Ejercicios

### Ejercicio 01: VisualTester Utility Class
- Capturar baselines
- Comparar con baseline
- Configurar thresholds
- Generar diff images
- Gestionar múltiples baselines

### Ejercicio 02: Visual Testing Scenarios
- Full-page screenshots
- Element screenshots
- Masked screenshots
- Threshold configuration
- Cross-browser baselines
- Dynamic content handling

### Ejercicio 03: Visual Regression Suite
- Suite completa de tests visuales
- Baseline management
- Failure reporting
- CI/CD integration

## Conceptos Clave

### Visual Regression Testing
Testing que compara screenshots de la UI actual con imágenes de referencia (baselines) para detectar cambios visuales no intencionales.

### Baseline
Imagen de referencia que representa el estado visual esperado de la aplicación.

### Threshold
Porcentaje de diferencia permitido entre baseline y screenshot actual antes de considerar el test como fallido.

### Masking
Técnica para excluir elementos dinámicos (fechas, anuncios, etc.) de la comparación visual.

## Recursos

- [Playwright Screenshots](https://playwright.dev/docs/screenshots)
- [Visual Testing Guide](https://playwright.dev/docs/test-snapshots)
- [Pixelmatch Library](https://github.com/mapbox/pixelmatch)

## Comandos

```bash
# Validar módulo
node exercises/utils/cli.js validate 07-visual-testing

# Ejecutar tests
npx playwright test exercises/07-visual-testing/tests/

# Actualizar baselines
npx playwright test exercises/07-visual-testing/tests/ --update-snapshots

# Ver diff images
open test-results/
```

## Estructura de Baselines

```
exercises/07-visual-testing/
├── baselines/
│   ├── chromium/
│   │   ├── homepage-full.png
│   │   └── login-form.png
│   ├── firefox/
│   │   ├── homepage-full.png
│   │   └── login-form.png
│   └── webkit/
│       ├── homepage-full.png
│       └── login-form.png
```

## Tips y Mejores Prácticas

### 1. Gestión de Baselines
- Mantén baselines en control de versiones
- Usa baselines específicos por navegador
- Actualiza baselines solo cuando los cambios son intencionales

### 2. Thresholds
- Usa thresholds bajos (0.1-0.5%) para UI crítica
- Usa thresholds más altos (1-2%) para contenido dinámico
- Ajusta según la sensibilidad requerida

### 3. Masking
- Enmascara elementos con contenido dinámico (fechas, contadores)
- Enmascara anuncios y contenido de terceros
- Usa selectores específicos para masking

### 4. Performance
- Captura solo las áreas necesarias (element screenshots)
- Usa full-page solo cuando sea necesario
- Considera el tamaño de las imágenes

### 5. CI/CD
- Ejecuta visual tests en entornos consistentes
- Usa Docker para consistencia de rendering
- Almacena baselines en artifact storage

## Troubleshooting

### Problema: Tests fallan en CI pero pasan localmente
**Solución**: Diferencias de rendering entre entornos. Usa Docker o baselines específicos de CI.

### Problema: Muchos falsos positivos
**Solución**: Ajusta thresholds o usa masking para elementos dinámicos.

### Problema: Baselines desactualizados
**Solución**: Ejecuta `--update-snapshots` después de cambios intencionales en UI.

### Problema: Diff images no se generan
**Solución**: Verifica configuración de Playwright y permisos de escritura.

