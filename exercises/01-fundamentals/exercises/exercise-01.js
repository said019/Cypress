/**
 * Ejercicio 01: Variables y Tipos de Datos
 * 
 * Objetivo: Aprender a declarar variables y trabajar con diferentes tipos de datos
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa let, const apropiadamente
 * 3. Trabaja con strings, numbers, booleans, arrays y objects
 * 
 * Conceptos a practicar:
 * - Declaración de variables (let, const, var)
 * - Tipos primitivos
 * - Tipos complejos (arrays, objects)
 */

/**
 * TODO: Declara una variable con tu nombre usando const
 * Debe ser una string
 */
function declararNombre() {
  // Tu código aquí
  const nombre = "Tu Nombre";
  return nombre;
}

/**
 * TODO: Declara una variable con tu edad usando let
 * Debe ser un number
 */
function declararEdad() {
  // Tu código aquí
  let edad = 25;
  return edad;
}

/**
 * TODO: Crea un objeto con información de usuario
 * Debe tener: nombre (string), edad (number), activo (boolean)
 */
function crearUsuario() {
  // Tu código aquí
  const usuario = {
    nombre: "Juan",
    edad: 30,
    activo: true
  };
  return usuario;
}

/**
 * TODO: Crea un array con 5 nombres de frutas
 * Debe ser un array de strings
 */
function crearArrayFrutas() {
  // Tu código aquí
  const frutas = ["manzana", "banana", "naranja", "uva", "pera"];
  return frutas;
}

/**
 * TODO: Crea una función que concatene dos strings
 * @param {string} str1 - Primera string
 * @param {string} str2 - Segunda string
 * @returns {string} - Strings concatenadas con un espacio entre ellas
 */
function concatenarStrings(str1, str2) {
  // Tu código aquí
  return str1 + " " + str2;
}

/**
 * TODO: Crea una función que sume dos números
 * @param {number} num1 - Primer número
 * @param {number} num2 - Segundo número
 * @returns {number} - Suma de los números
 */
function sumarNumeros(num1, num2) {
  // Tu código aquí
  return num1 + num2;
}

/**
 * TODO: Crea una función que verifique si un número es par
 * @param {number} numero - Número a verificar
 * @returns {boolean} - true si es par, false si es impar
 */
function esPar(numero) {
  // Tu código aquí
  return numero % 2 === 0;
}

/**
 * TODO: Crea una función que obtenga el primer elemento de un array
 * @param {Array} array - Array de elementos
 * @returns {*} - Primer elemento del array
 */
function obtenerPrimerElemento(array) {
  // Tu código aquí
  return array[0];
}

/**
 * TODO: Crea una función que obtenga una propiedad de un objeto
 * @param {Object} objeto - Objeto del cual obtener la propiedad
 * @param {string} propiedad - Nombre de la propiedad
 * @returns {*} - Valor de la propiedad
 */
function obtenerPropiedad(objeto, propiedad) {
  // Tu código aquí
  return objeto[propiedad];
}

/**
 * TODO: Crea una función que modifique un array agregando un elemento
 * @param {Array} array - Array original
 * @param {*} elemento - Elemento a agregar
 * @returns {Array} - Array modificado
 */
function agregarElemento(array, elemento) {
  // Tu código aquí
  array.push(elemento);
  return array;
}

// Exportar funciones para testing
module.exports = {
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
 * Notas:
 * - const: Usa para valores que no cambiarán
 * - let: Usa para valores que pueden cambiar
 * - var: Evita usarlo (scope issues)
 * 
 * Recursos:
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Grammar_and_types
 */
