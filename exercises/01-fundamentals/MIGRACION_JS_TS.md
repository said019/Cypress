# Guía de Migración: JavaScript a TypeScript

Este documento muestra ejemplos de cómo migrar código de JavaScript a TypeScript, destacando las diferencias y ventajas del tipado estático.

## 1. Variables y Tipos Básicos

### JavaScript
```javascript
let nombre = "Juan";
let edad = 30;
let activo = true;
```

### TypeScript
```typescript
let nombre: string = "Juan";
let edad: number = 30;
let activo: boolean = true;
```

**Ventajas:**
- El compilador detecta errores de tipo
- Mejor autocompletado en el IDE
- Documentación implícita del código

## 2. Funciones

### JavaScript
```javascript
function saludar(nombre) {
  return `Hola, ${nombre}!`;
}
```

### TypeScript
```typescript
function saludar(nombre: string): string {
  return `Hola, ${nombre}!`;
}
```

**Ventajas:**
- Previene pasar argumentos del tipo incorrecto
- El IDE sugiere el tipo de retorno
- Errores detectados en tiempo de compilación

## 3. Objetos e Interfaces

### JavaScript
```javascript
const usuario = {
  nombre: "Juan",
  email: "juan@example.com",
  edad: 30
};

function procesarUsuario(usuario) {
  return usuario.nombre.toUpperCase();
}
```

### TypeScript
```typescript
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

const usuario: Usuario = {
  nombre: "Juan",
  email: "juan@example.com",
  edad: 30
};

function procesarUsuario(usuario: Usuario): string {
  return usuario.nombre.toUpperCase();
}
```

**Ventajas:**
- Estructura de datos claramente definida
- Autocompletado de propiedades
- Detecta propiedades faltantes o incorrectas

## 4. Arrays

### JavaScript
```javascript
const numeros = [1, 2, 3, 4, 5];
const nombres = ["Ana", "Juan", "Pedro"];

function sumar(numeros) {
  return numeros.reduce((sum, num) => sum + num, 0);
}
```

### TypeScript
```typescript
const numeros: number[] = [1, 2, 3, 4, 5];
const nombres: string[] = ["Ana", "Juan", "Pedro"];

function sumar(numeros: number[]): number {
  return numeros.reduce((sum, num) => sum + num, 0);
}
```

**Ventajas:**
- Asegura que el array contiene el tipo correcto
- Previene mezclar tipos accidentalmente
- Mejor inferencia de tipos en métodos de arrays

## 5. Async/Await y Promises

### JavaScript
```javascript
async function obtenerUsuario(id) {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

### TypeScript
```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

async function obtenerUsuario(id: number): Promise<Usuario> {
  const response = await fetch(`/api/users/${id}`);
  return response.json();
}
```

**Ventajas:**
- Tipo de retorno de Promise claramente definido
- El IDE conoce la estructura del objeto retornado
- Detecta errores en el manejo de datos asíncronos

## 6. Generics

### JavaScript
```javascript
function obtenerPrimero(array) {
  return array[0];
}

const numero = obtenerPrimero([1, 2, 3]); // ¿Qué tipo es numero?
const texto = obtenerPrimero(["a", "b"]); // ¿Qué tipo es texto?
```

### TypeScript
```typescript
function obtenerPrimero<T>(array: T[]): T | undefined {
  return array[0];
}

const numero = obtenerPrimero([1, 2, 3]); // TypeScript sabe que es number
const texto = obtenerPrimero(["a", "b"]); // TypeScript sabe que es string
```

**Ventajas:**
- Funciones reutilizables con tipos seguros
- TypeScript infiere el tipo automáticamente
- No pierdes información de tipos

## 7. Propiedades Opcionales

### JavaScript
```javascript
function crearConfig(opciones) {
  return {
    timeout: opciones.timeout || 5000,
    retries: opciones.retries || 3,
    headless: opciones.headless !== undefined ? opciones.headless : true
  };
}
```

### TypeScript
```typescript
interface ConfigOpciones {
  timeout?: number;
  retries?: number;
  headless?: boolean;
}

interface Config {
  timeout: number;
  retries: number;
  headless: boolean;
}

function crearConfig(opciones: ConfigOpciones = {}): Config {
  return {
    timeout: opciones.timeout ?? 5000,
    retries: opciones.retries ?? 3,
    headless: opciones.headless ?? true
  };
}
```

**Ventajas:**
- Claridad sobre qué propiedades son opcionales
- Mejor manejo de valores por defecto
- Previene errores de propiedades undefined

## 8. Union Types

### JavaScript
```javascript
function formatear(valor) {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else if (typeof valor === "number") {
    return valor.toFixed(2);
  }
  return String(valor);
}
```

### TypeScript
```typescript
function formatear(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else {
    return valor.toFixed(2);
  }
}
```

**Ventajas:**
- Tipos permitidos claramente definidos
- TypeScript verifica que manejas todos los casos
- Narrowing automático de tipos en condicionales

## 9. Utility Types

TypeScript proporciona tipos de utilidad que no existen en JavaScript:

```typescript
interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

// Partial - Hace todas las propiedades opcionales
type UsuarioParcial = Partial<Usuario>;

// Pick - Selecciona solo ciertas propiedades
type UsuarioBasico = Pick<Usuario, 'id' | 'nombre'>;

// Omit - Excluye ciertas propiedades
type UsuarioSinId = Omit<Usuario, 'id'>;

// Required - Hace todas las propiedades requeridas
type UsuarioCompleto = Required<Usuario>;

// Record - Crea un tipo de objeto con keys y values específicos
type UsuariosPorId = Record<number, Usuario>;
```

## 10. Type Guards

### JavaScript
```javascript
function procesarValor(valor) {
  if (typeof valor === "string") {
    return valor.length;
  } else if (Array.isArray(valor)) {
    return valor.length;
  }
  return 0;
}
```

### TypeScript
```typescript
function procesarValor(valor: string | number[]): number {
  if (typeof valor === "string") {
    // TypeScript sabe que aquí valor es string
    return valor.length;
  } else {
    // TypeScript sabe que aquí valor es number[]
    return valor.length;
  }
}
```

**Ventajas:**
- TypeScript refina automáticamente los tipos
- Previene acceder a propiedades que no existen
- Código más seguro y predecible

## Pasos para Migrar un Proyecto

1. **Renombrar archivos**: Cambia `.js` a `.ts`
2. **Agregar tsconfig.json**: Configura el compilador
3. **Agregar tipos básicos**: Empieza con parámetros de funciones
4. **Crear interfaces**: Define estructuras de datos
5. **Usar utility types**: Aprovecha Partial, Pick, Omit, etc.
6. **Agregar generics**: Para funciones reutilizables
7. **Refinar tipos**: Usa union types, type guards, etc.

## Configuración Recomendada (tsconfig.json)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

## Recursos Adicionales

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)
- [TypeScript Cheatsheet](https://www.typescriptlang.org/cheatsheets)
- [Migración Oficial](https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html)

## Conclusión

La migración de JavaScript a TypeScript es incremental. Puedes empezar agregando tipos básicos y gradualmente aprovechar características más avanzadas. Los beneficios incluyen:

- ✅ Menos errores en tiempo de ejecución
- ✅ Mejor experiencia de desarrollo (autocompletado, refactoring)
- ✅ Código más mantenible y documentado
- ✅ Detección temprana de errores
- ✅ Refactoring más seguro
