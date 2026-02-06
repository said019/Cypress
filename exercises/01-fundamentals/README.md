# Módulo 01: Fundamentos de JavaScript y TypeScript

## 📋 Descripción

Este módulo te introduce a los conceptos fundamentales de JavaScript y TypeScript necesarios para escribir tests de automatización efectivos con Playwright. Aprenderás las diferencias clave entre ambos lenguajes y cómo aplicar conceptos modernos de programación asíncrona.

## Objetivos

Al completar este módulo, serás capaz de:

- Entender las diferencias entre JavaScript y TypeScript
- Trabajar con variables, funciones y estructuras de datos
- Dominar programación asíncrona con async/await y Promises
- Utilizar métodos de arrays para manipular datos de prueba
- Aplicar tipado estático en TypeScript para código más robusto
- Migrar código de JavaScript a TypeScript con confianza

## 📚 Prerequisitos

- Conocimientos básicos de programación
- Node.js instalado (v14 o superior)
- Editor de código (VS Code recomendado)
- Ganas de aprender 🚀

## 🏋️ Ejercicios

### Ejercicio 1: Variables y Tipos de Datos

**Dificultad:** Principiante

**Descripción:**
Aprende a declarar variables usando `let`, `const` y `var`, y entiende las diferencias entre ellas. Practica con diferentes tipos de datos: strings, numbers, booleans, arrays y objects.

**Archivos:**
- `exercises/exercise-01.js` - Versión JavaScript
- `exercises/exercise-01.ts` - Versión TypeScript

**Conceptos Clave:**
- Declaración de variables (let, const, var)
- Tipos primitivos (string, number, boolean)
- Tipos complejos (array, object)
- Tipado explícito en TypeScript

**Validación:**
```bash
npm test -- exercises/01-fundamentals/tests/exercise-01.spec.js
```

---

### Ejercicio 2: Funciones y Arrow Functions

**Dificultad:** Principiante

**Descripción:**
Domina la creación de funciones tradicionales y arrow functions. Entiende el contexto (`this`) y cuándo usar cada tipo de función.

**Archivos:**
- `exercises/exercise-02.js` - Versión JavaScript
- `exercises/exercise-02.ts` - Versión TypeScript

**Conceptos Clave:**
- Funciones tradicionales vs arrow functions
- Parámetros y valores de retorno
- Tipado de funciones en TypeScript
- Contexto de ejecución (this)

**Validación:**
```bash
npm test -- exercises/01-fundamentals/tests/exercise-02.spec.js
```

---

### Ejercicio 3: Async/Await y Promises

**Dificultad:** Intermedio

**Descripción:**
Aprende a trabajar con código asíncrono usando Promises y async/await. Este es un concepto fundamental para Playwright, ya que todas las operaciones son asíncronas.

**Archivos:**
- `exercises/exercise-03.js` - Versión JavaScript
- `exercises/exercise-03.ts` - Versión TypeScript

**Conceptos Clave:**
- Promises (then, catch, finally)
- async/await syntax
- Manejo de errores asíncronos
- Promise.all y Promise.race
- Tipado de Promises en TypeScript

**Validación:**
```bash
npm test -- exercises/01-fundamentals/tests/exercise-03.spec.js
```

---

### Ejercicio 4: Métodos de Arrays

**Dificultad:** Intermedio

**Descripción:**
Domina los métodos de arrays más útiles para manipular datos de prueba: map, filter, reduce, find, forEach, etc.

**Archivos:**
- `exercises/exercise-04.js` - Versión JavaScript
- `exercises/exercise-04.ts` - Versión TypeScript

**Conceptos Clave:**
- map, filter, reduce
- find, findIndex, some, every
- forEach, for...of
- Tipado de arrays en TypeScript
- Generics en arrays

**Validación:**
```bash
npm test -- exercises/01-fundamentals/tests/exercise-04.spec.js
```

---

### Ejercicio 5: Manipulación de Objetos

**Dificultad:** Intermedio

**Descripción:**
Aprende a trabajar con objetos: destructuring, spread operator, Object.keys/values/entries, y cómo tipar objetos en TypeScript.

**Archivos:**
- `exercises/exercise-05.js` - Versión JavaScript
- `exercises/exercise-05.ts` - Versión TypeScript

**Conceptos Clave:**
- Destructuring de objetos
- Spread operator (...)
- Object.keys, Object.values, Object.entries
- Interfaces y tipos en TypeScript
- Optional properties

**Validación:**
```bash
npm test -- exercises/01-fundamentals/tests/exercise-05.spec.js
```

---

## 💡 Consejos

- **Practica ambas versiones**: Completa los ejercicios en JavaScript primero, luego en TypeScript para ver las diferencias
- **Lee los comentarios**: El código incluye explicaciones detalladas de cada concepto
- **Experimenta**: Modifica el código y observa qué sucede
- **Usa el debugger**: Coloca `debugger;` en tu código para pausar la ejecución
- **Consulta la documentación**: [MDN Web Docs](https://developer.mozilla.org) es tu mejor amigo

## 🔗 Recursos Adicionales

- [JavaScript MDN](https://developer.mozilla.org/es/docs/Web/JavaScript)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [JavaScript.info](https://javascript.info/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [Async/Await Tutorial](https://javascript.info/async-await)

## ✅ Checklist de Completitud

- [ ] Ejercicio 1: Variables y Tipos completado (JS y TS)
- [ ] Ejercicio 2: Funciones completado (JS y TS)
- [ ] Ejercicio 3: Async/Await completado (JS y TS)
- [ ] Ejercicio 4: Métodos de Arrays completado (JS y TS)
- [ ] Ejercicio 5: Manipulación de Objetos completado (JS y TS)
- [ ] Todos los tests pasando
- [ ] Código revisado y entendido
- [ ] Conceptos clave dominados

## 🎓 Siguiente Paso

Una vez completado este módulo, continúa con:
**Módulo 02: Mejoras de Automatización Web**

Donde aplicarás estos fundamentos para escribir tests de Playwright más efectivos.

---

**Tiempo Estimado:** 3-4 horas
**Nivel:** Principiante a Intermedio
**Prerequisitos:** Ninguno (comenzamos desde cero)
