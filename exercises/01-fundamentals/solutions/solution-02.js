/**
 * Ejercicio 02: Funciones y Arrow Functions
 * 
 * Objetivo: Dominar diferentes formas de declarar funciones
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa funciones tradicionales y arrow functions apropiadamente
 * 3. Entiende las diferencias de contexto (this)
 * 
 * Conceptos a practicar:
 * - Funciones tradicionales
 * - Arrow functions
 * - Parámetros por defecto
 * - Rest parameters
 */

/**
 * TODO: Crea una función tradicional que salude
 * @param {string} nombre - Nombre de la persona
 * @returns {string} - Saludo personalizado
 */
function saludar(nombre) {
  // Tu código aquí
  return `Hola, ${nombre}!`;
}

/**
 * TODO: Crea una arrow function que despida
 * @param {string} nombre - Nombre de la persona
 * @returns {string} - Despedida personalizada
 */
const despedir = (nombre) => {
  // Tu código aquí
  return `Adiós, ${nombre}!`;
};

/**
 * TODO: Crea una función con parámetro por defecto
 * @param {string} nombre - Nombre de la persona (default: "Invitado")
 * @returns {string} - Saludo con nombre o "Invitado"
 */
function saludarConDefault(nombre = "Invitado") {
  // Tu código aquí
  return `Bienvenido, ${nombre}!`;
}

/**
 * TODO: Crea una arrow function que multiplique dos números
 * Usa sintaxis corta (sin llaves ni return)
 * @param {number} a - Primer número
 * @param {number} b - Segundo número
 * @returns {number} - Producto de a * b
 */
const multiplicar = (a, b) => a * b;

/**
 * TODO: Crea una función que sume todos los números pasados como argumentos
 * Usa rest parameters (...args)
 * @param {...number} numeros - Números a sumar
 * @returns {number} - Suma total
 */
function sumarTodos(...numeros) {
  // Tu código aquí
  return numeros.reduce((sum, num) => sum + num, 0);
}

/**
 * TODO: Crea una función que retorne otra función (closure)
 * @param {string} prefijo - Prefijo para el mensaje
 * @returns {Function} - Función que agrega el prefijo a un mensaje
 */
function crearPrefijador(prefijo) {
  // Tu código aquí
  return function(mensaje) {
    return `${prefijo}: ${mensaje}`;
  };
}

/**
 * TODO: Crea una arrow function que filtre números pares de un array
 * @param {number[]} numeros - Array de números
 * @returns {number[]} - Array solo con números pares
 */
const filtrarPares = (numeros) => {
  // Tu código aquí
  return numeros.filter(num => num % 2 === 0);
};

/**
 * TODO: Crea una función que transforme un array de strings a mayúsculas
 * @param {string[]} strings - Array de strings
 * @returns {string[]} - Array de strings en mayúsculas
 */
function convertirAMayusculas(strings) {
  // Tu código aquí
  return strings.map(str => str.toUpperCase());
}

/**
 * TODO: Crea una arrow function que encuentre el número máximo en un array
 * @param {number[]} numeros - Array de números
 * @returns {number} - Número máximo
 */
const encontrarMaximo = (numeros) => {
  // Tu código aquí
  return Math.max(...numeros);
};

/**
 * Ejemplo de diferencia de contexto (this)
 * Este objeto demuestra cómo 'this' funciona diferente
 */
const objetoEjemplo = {
  nombre: "Objeto",
  
  // Función tradicional - 'this' se refiere al objeto
  metodoTradicional: function() {
    return `Método tradicional: ${this.nombre}`;
  },
  
  // Arrow function - 'this' se hereda del contexto padre
  metodoArrow: () => {
    // 'this' aquí NO se refiere al objeto
    return `Método arrow: ${this.nombre}`;
  }
};

// Exportar funciones para testing
module.exports = {
  saludar,
  despedir,
  saludarConDefault,
  multiplicar,
  sumarTodos,
  crearPrefijador,
  filtrarPares,
  convertirAMayusculas,
  encontrarMaximo,
  objetoEjemplo
};

/**
 * Notas:
 * - Arrow functions son más concisas
 * - Arrow functions no tienen su propio 'this'
 * - Usa arrow functions para callbacks
 * - Usa funciones tradicionales para métodos de objetos
 * 
 * Recursos:
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/Arrow_functions
 */
