/**
 * Ejercicio 01: Variables y Tipos de Datos (TypeScript)
 * 
 * Objetivo: Aprender a declarar variables con tipado estático
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa tipos explícitos donde sea apropiado
 * 3. Aprovecha las ventajas del tipado estático
 * 
 * Conceptos a practicar:
 * - Declaración de variables con tipos
 * - Tipos primitivos (string, number, boolean)
 * - Tipos complejos (arrays, objects, interfaces)
 */

/**
 * Interface para definir la estructura de un usuario
 */
interface Usuario {
  nombre: string;
  edad: number;
  activo: boolean;
}

/**
 * TODO: Declara una variable con tu nombre usando const
 * Debe tener tipo string explícito
 */
function declararNombre(): string {
  // Tu código aquí
  const nombre: string = "Tu Nombre";
  return nombre;
}

/**
 * TODO: Declara una variable con tu edad usando let
 * Debe tener tipo number explícito
 */
function declararEdad(): number {
  // Tu código aquí
  let edad: number = 25;
  return edad;
}

/**
 * TODO: Crea un objeto con información de usuario
 * Debe seguir la interface Usuario definida arriba
 */
function crearUsuario(): Usuario {
  // Tu código aquí
  const usuario: Usuario = {
    nombre: "Juan",
    edad: 30,
    activo: true
  };
  return usuario;
}

/**
 * TODO: Crea un array con 5 nombres de frutas
 * Debe tener tipo string[] explícito
 */
function crearArrayFrutas(): string[] {
  // Tu código aquí
  const frutas: string[] = ["manzana", "banana", "naranja", "uva", "pera"];
  return frutas;
}

/**
 * TODO: Crea una función que concatene dos strings
 * Nota: Los parámetros y retorno ya están tipados
 */
function concatenarStrings(str1: string, str2: string): string {
  // Tu código aquí
  return `${str1} ${str2}`;
}

/**
 * TODO: Crea una función que sume dos números
 * Nota: Los parámetros y retorno ya están tipados
 */
function sumarNumeros(num1: number, num2: number): number {
  // Tu código aquí
  return num1 + num2;
}

/**
 * TODO: Crea una función que verifique si un número es par
 * Nota: Los parámetros y retorno ya están tipados
 */
function esPar(numero: number): boolean {
  // Tu código aquí
  return numero % 2 === 0;
}

/**
 * TODO: Crea una función que obtenga el primer elemento de un array
 * Usa generics para mantener el tipo del elemento
 */
function obtenerPrimerElemento<T>(array: T[]): T | undefined {
  // Tu código aquí
  return array[0];
}

/**
 * TODO: Crea una función que obtenga una propiedad de un objeto
 * Usa keyof para asegurar que la propiedad existe
 */
function obtenerPropiedad<T, K extends keyof T>(objeto: T, propiedad: K): T[K] {
  // Tu código aquí
  return objeto[propiedad];
}

/**
 * TODO: Crea una función que modifique un array agregando un elemento
 * Usa generics para mantener el tipo consistente
 */
function agregarElemento<T>(array: T[], elemento: T): T[] {
  // Tu código aquí
  array.push(elemento);
  return array;
}

// Exportar funciones para testing
export {
  Usuario,
  declararNombre,
  declararEdad,
  crearUsuario,
  crearArrayFrutas,
  concatenarStrings,
  sumarNumeros,
  esPar,
  obtenerPrimerElemento,
  obtenerPropiedad,
  agregarElemento
};

/**
 * Notas TypeScript:
 * - Tipos explícitos mejoran la legibilidad y previenen errores
 * - Interfaces definen la estructura de objetos
 * - Generics (<T>) permiten funciones reutilizables con tipos seguros
 * - keyof asegura que solo uses propiedades que existen
 * 
 * Recursos:
 * - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */
