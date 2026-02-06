/**
 * Ejercicio 04: Métodos de Arrays
 * 
 * Objetivo: Dominar métodos de arrays para manipular datos de prueba
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa métodos de arrays (map, filter, reduce, etc.)
 * 3. Practica con datos similares a los que usarás en tests
 * 
 * Conceptos a practicar:
 * - map, filter, reduce
 * - find, findIndex, some, every
 * - forEach, for...of
 */

/**
 * TODO: Usa map para transformar un array de números
 * Multiplica cada número por 2
 * @param {number[]} numeros - Array de números
 * @returns {number[]} - Array con números multiplicados por 2
 */
function duplicarNumeros(numeros) {
  // Tu código aquí
  return numeros.map(num => num * 2);
}

/**
 * TODO: Usa filter para obtener solo números pares
 * @param {number[]} numeros - Array de números
 * @returns {number[]} - Array solo con números pares
 */
function filtrarPares(numeros) {
  // Tu código aquí
  return numeros.filter(num => num % 2 === 0);
}

/**
 * TODO: Usa reduce para sumar todos los números
 * @param {number[]} numeros - Array de números
 * @returns {number} - Suma total
 */
function sumarArray(numeros) {
  // Tu código aquí
  return numeros.reduce((sum, num) => sum + num, 0);
}

/**
 * TODO: Usa find para encontrar el primer usuario con email específico
 * @param {Object[]} usuarios - Array de usuarios
 * @param {string} email - Email a buscar
 * @returns {Object|undefined} - Usuario encontrado o undefined
 */
function encontrarUsuarioPorEmail(usuarios, email) {
  // Tu código aquí
  return usuarios.find(usuario => usuario.email === email);
}

/**
 * TODO: Usa findIndex para encontrar la posición de un elemento
 * @param {string[]} frutas - Array de frutas
 * @param {string} fruta - Fruta a buscar
 * @returns {number} - Índice de la fruta o -1 si no existe
 */
function encontrarIndiceFruta(frutas, fruta) {
  // Tu código aquí
  return frutas.findIndex(f => f === fruta);
}

/**
 * TODO: Usa some para verificar si existe al menos un número mayor a 10
 * @param {number[]} numeros - Array de números
 * @returns {boolean} - true si existe al menos uno mayor a 10
 */
function existeMayorA10(numeros) {
  // Tu código aquí
  return numeros.some(num => num > 10);
}

/**
 * TODO: Usa every para verificar si todos los números son positivos
 * @param {number[]} numeros - Array de números
 * @returns {boolean} - true si todos son positivos
 */
function todosSonPositivos(numeros) {
  // Tu código aquí
  return numeros.every(num => num > 0);
}

/**
 * TODO: Usa map para extraer solo los nombres de usuarios
 * @param {Object[]} usuarios - Array de usuarios con {nombre, email, edad}
 * @returns {string[]} - Array solo con nombres
 */
function extraerNombres(usuarios) {
  // Tu código aquí
  return usuarios.map(usuario => usuario.nombre);
}

/**
 * TODO: Combina filter y map para obtener emails de usuarios activos
 * @param {Object[]} usuarios - Array de usuarios con {nombre, email, activo}
 * @returns {string[]} - Array de emails de usuarios activos
 */
function emailsDeUsuariosActivos(usuarios) {
  // Tu código aquí
  return usuarios
    .filter(usuario => usuario.activo)
    .map(usuario => usuario.email);
}

/**
 * TODO: Usa reduce para agrupar usuarios por edad
 * @param {Object[]} usuarios - Array de usuarios con {nombre, edad}
 * @returns {Object} - Objeto con edades como keys y arrays de usuarios como values
 * Ejemplo: { 25: [{nombre: "Juan", edad: 25}], 30: [{nombre: "Ana", edad: 30}] }
 */
function agruparPorEdad(usuarios) {
  // Tu código aquí
  return usuarios.reduce((grupos, usuario) => {
    const edad = usuario.edad;
    if (!grupos[edad]) {
      grupos[edad] = [];
    }
    grupos[edad].push(usuario);
    return grupos;
  }, {});
}

/**
 * TODO: Usa reduce para contar ocurrencias de cada elemento
 * @param {string[]} elementos - Array de strings
 * @returns {Object} - Objeto con conteo de cada elemento
 * Ejemplo: ["a", "b", "a"] => { a: 2, b: 1 }
 */
function contarOcurrencias(elementos) {
  // Tu código aquí
  return elementos.reduce((conteo, elemento) => {
    conteo[elemento] = (conteo[elemento] || 0) + 1;
    return conteo;
  }, {});
}

/**
 * TODO: Combina múltiples métodos para obtener el promedio de edades de usuarios activos
 * @param {Object[]} usuarios - Array de usuarios con {nombre, edad, activo}
 * @returns {number} - Promedio de edades (0 si no hay usuarios activos)
 */
function promedioEdadActivos(usuarios) {
  // Tu código aquí
  const activos = usuarios.filter(u => u.activo);
  if (activos.length === 0) return 0;
  
  const sumaEdades = activos.reduce((sum, u) => sum + u.edad, 0);
  return sumaEdades / activos.length;
}

/**
 * TODO: Usa sort para ordenar números de menor a mayor
 * @param {number[]} numeros - Array de números
 * @returns {number[]} - Array ordenado (crea una copia, no modifiques el original)
 */
function ordenarNumeros(numeros) {
  // Tu código aquí
  return [...numeros].sort((a, b) => a - b);
}

/**
 * TODO: Usa sort para ordenar usuarios por nombre alfabéticamente
 * @param {Object[]} usuarios - Array de usuarios con {nombre}
 * @returns {Object[]} - Array ordenado por nombre
 */
function ordenarPorNombre(usuarios) {
  // Tu código aquí
  return [...usuarios].sort((a, b) => a.nombre.localeCompare(b.nombre));
}

/**
 * TODO: Usa slice para obtener los primeros N elementos
 * @param {Array} array - Array de elementos
 * @param {number} n - Cantidad de elementos a obtener
 * @returns {Array} - Primeros N elementos
 */
function obtenerPrimeros(array, n) {
  // Tu código aquí
  return array.slice(0, n);
}

// Exportar funciones para testing
module.exports = {
  duplicarNumeros,
  filtrarPares,
  sumarArray,
  encontrarUsuarioPorEmail,
  encontrarIndiceFruta,
  existeMayorA10,
  todosSonPositivos,
  extraerNombres,
  emailsDeUsuariosActivos,
  agruparPorEdad,
  contarOcurrencias,
  promedioEdadActivos,
  ordenarNumeros,
  ordenarPorNombre,
  obtenerPrimeros
};

/**
 * Notas:
 * - map: Transforma cada elemento
 * - filter: Filtra elementos que cumplen condición
 * - reduce: Reduce array a un solo valor
 * - find: Encuentra primer elemento que cumple condición
 * - some: Verifica si al menos uno cumple
 * - every: Verifica si todos cumplen
 * - sort: Ordena (modifica el array original, usa spread para copiar)
 * 
 * Recursos:
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array
 */
