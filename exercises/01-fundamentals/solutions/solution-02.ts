/**
 * Ejercicio 02: Funciones y Arrow Functions (TypeScript)
 * 
 * Objetivo: Dominar funciones con tipado estático
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Aprovecha el tipado de parámetros y retornos
 * 3. Usa tipos de función cuando sea apropiado
 * 
 * Conceptos a practicar:
 * - Funciones tipadas
 * - Arrow functions tipadas
 * - Tipos de función
 * - Generics en funciones
 */

/**
 * TODO: Crea una función tradicional que salude
 */
function saludar(nombre: string): string {
  // Tu código aquí
  return `Hola, ${nombre}!`;
}

/**
 * TODO: Crea una arrow function que despida
 */
const despedir = (nombre: string): string => {
  // Tu código aquí
  return `Adiós, ${nombre}!`;
};

/**
 * TODO: Crea una función con parámetro por defecto
 */
function saludarConDefault(nombre: string = "Invitado"): string {
  // Tu código aquí
  return `Bienvenido, ${nombre}!`;
}

/**
 * TODO: Crea una arrow function que multiplique dos números
 * Usa sintaxis corta
 */
const multiplicar = (a: number, b: number): number => a * b;

/**
 * TODO: Crea una función que sume todos los números pasados
 * Usa rest parameters con tipo
 */
function sumarTodos(...numeros: number[]): number {
  // Tu código aquí
  return numeros.reduce((sum, num) => sum + num, 0);
}

/**
 * Tipo para una función que toma un string y retorna un string
 */
type FuncionPrefijo = (mensaje: string) => string;

/**
 * TODO: Crea una función que retorne otra función (closure)
 * El retorno debe ser del tipo FuncionPrefijo
 */
function crearPrefijador(prefijo: string): FuncionPrefijo {
  // Tu código aquí
  return (mensaje: string): string => {
    return `${prefijo}: ${mensaje}`;
  };
}

/**
 * TODO: Crea una arrow function que filtre números pares
 */
const filtrarPares = (numeros: number[]): number[] => {
  // Tu código aquí
  return numeros.filter((num: number) => num % 2 === 0);
};

/**
 * TODO: Crea una función que transforme strings a mayúsculas
 */
function convertirAMayusculas(strings: string[]): string[] {
  // Tu código aquí
  return strings.map((str: string) => str.toUpperCase());
}

/**
 * TODO: Crea una arrow function que encuentre el máximo
 */
const encontrarMaximo = (numeros: number[]): number => {
  // Tu código aquí
  return Math.max(...numeros);
};

/**
 * TODO: Crea una función genérica que retorne el primer elemento
 * Usa generics para mantener el tipo
 */
function obtenerPrimero<T>(array: T[]): T | undefined {
  // Tu código aquí
  return array[0];
}

/**
 * TODO: Crea una función genérica que filtre elementos
 * @param array - Array de elementos
 * @param predicado - Función que determina si incluir el elemento
 */
function filtrarElementos<T>(
  array: T[],
  predicado: (elemento: T) => boolean
): T[] {
  // Tu código aquí
  return array.filter(predicado);
}

/**
 * Interface para demostrar tipado de métodos
 */
interface ObjetoConMetodos {
  nombre: string;
  metodoTradicional(): string;
  metodoArrow: () => string;
}

/**
 * Ejemplo de diferencia de contexto (this) con tipos
 */
const objetoEjemplo: ObjetoConMetodos = {
  nombre: "Objeto",
  
  // Función tradicional - 'this' se refiere al objeto
  metodoTradicional(): string {
    return `Método tradicional: ${this.nombre}`;
  },
  
  // Arrow function - 'this' se hereda del contexto padre
  metodoArrow: (): string => {
    // 'this' aquí NO se refiere al objeto
    // TypeScript te advertirá sobre esto
    return `Método arrow`;
  }
};

// Exportar funciones para testing
export {
  FuncionPrefijo,
  ObjetoConMetodos,
  saludar,
  despedir,
  saludarConDefault,
  multiplicar,
  sumarTodos,
  crearPrefijador,
  filtrarPares,
  convertirAMayusculas,
  encontrarMaximo,
  obtenerPrimero,
  filtrarElementos,
  objetoEjemplo
};

/**
 * Notas TypeScript:
 * - Tipar parámetros y retornos previene errores
 * - Tipos de función (type FuncionPrefijo) mejoran legibilidad
 * - Generics permiten funciones reutilizables con tipos seguros
 * - TypeScript infiere tipos en muchos casos, pero ser explícito ayuda
 * 
 * Recursos:
 * - https://www.typescriptlang.org/docs/handbook/2/functions.html
 */
