/**
 * Ejercicio 05: Manipulación de Objetos
 * 
 * Objetivo: Dominar operaciones con objetos (destructuring, spread, etc.)
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa destructuring y spread operator
 * 3. Trabaja con Object.keys, Object.values, Object.entries
 * 
 * Conceptos a practicar:
 * - Destructuring de objetos
 * - Spread operator (...)
 * - Object.keys, Object.values, Object.entries
 * - Clonación de objetos
 */

/**
 * TODO: Usa destructuring para extraer propiedades de un objeto
 * @param {Object} usuario - Objeto con {nombre, email, edad}
 * @returns {string} - String con formato "Nombre: X, Email: Y"
 */
function extraerDatos(usuario) {
  // Tu código aquí - usa destructuring
  const { nombre, email } = usuario;
  return `Nombre: ${nombre}, Email: ${email}`;
}

/**
 * TODO: Usa destructuring con valores por defecto
 * @param {Object} config - Objeto de configuración
 * @returns {Object} - Configuración con valores por defecto aplicados
 */
function aplicarConfiguracion(config) {
  // Tu código aquí - usa destructuring con defaults
  const { 
    timeout = 5000, 
    retries = 3, 
    headless = true 
  } = config;
  
  return { timeout, retries, headless };
}

/**
 * TODO: Usa spread operator para combinar dos objetos
 * @param {Object} obj1 - Primer objeto
 * @param {Object} obj2 - Segundo objeto
 * @returns {Object} - Objeto combinado (obj2 sobrescribe obj1)
 */
function combinarObjetos(obj1, obj2) {
  // Tu código aquí
  return { ...obj1, ...obj2 };
}

/**
 * TODO: Usa spread operator para agregar una propiedad a un objeto
 * @param {Object} usuario - Objeto usuario
 * @param {string} propiedad - Nombre de la propiedad
 * @param {*} valor - Valor de la propiedad
 * @returns {Object} - Nuevo objeto con la propiedad agregada
 */
function agregarPropiedad(usuario, propiedad, valor) {
  // Tu código aquí - no modifiques el objeto original
  return { ...usuario, [propiedad]: valor };
}

/**
 * TODO: Usa Object.keys para obtener todas las propiedades de un objeto
 * @param {Object} objeto - Objeto cualquiera
 * @returns {string[]} - Array con nombres de propiedades
 */
function obtenerPropiedades(objeto) {
  // Tu código aquí
  return Object.keys(objeto);
}

/**
 * TODO: Usa Object.values para obtener todos los valores de un objeto
 * @param {Object} objeto - Objeto cualquiera
 * @returns {Array} - Array con valores
 */
function obtenerValores(objeto) {
  // Tu código aquí
  return Object.values(objeto);
}

/**
 * TODO: Usa Object.entries para convertir objeto a array de pares [key, value]
 * @param {Object} objeto - Objeto cualquiera
 * @returns {Array<[string, *]>} - Array de pares [key, value]
 */
function objetoAEntradas(objeto) {
  // Tu código aquí
  return Object.entries(objeto);
}

/**
 * TODO: Convierte un array de pares [key, value] a objeto
 * @param {Array<[string, *]>} entradas - Array de pares
 * @returns {Object} - Objeto construido
 */
function entradasAObjeto(entradas) {
  // Tu código aquí
  return Object.fromEntries(entradas);
}

/**
 * TODO: Clona un objeto (copia superficial)
 * @param {Object} objeto - Objeto a clonar
 * @returns {Object} - Clon del objeto
 */
function clonarObjeto(objeto) {
  // Tu código aquí - usa spread o Object.assign
  return { ...objeto };
}

/**
 * TODO: Elimina una propiedad de un objeto (sin modificar el original)
 * @param {Object} objeto - Objeto original
 * @param {string} propiedad - Propiedad a eliminar
 * @returns {Object} - Nuevo objeto sin la propiedad
 */
function eliminarPropiedad(objeto, propiedad) {
  // Tu código aquí - usa destructuring con rest
  const { [propiedad]: removed, ...resto } = objeto;
  return resto;
}

/**
 * TODO: Renombra una propiedad de un objeto
 * @param {Object} objeto - Objeto original
 * @param {string} viejoNombre - Nombre actual de la propiedad
 * @param {string} nuevoNombre - Nuevo nombre para la propiedad
 * @returns {Object} - Nuevo objeto con propiedad renombrada
 */
function renombrarPropiedad(objeto, viejoNombre, nuevoNombre) {
  // Tu código aquí
  const { [viejoNombre]: valor, ...resto } = objeto;
  return { ...resto, [nuevoNombre]: valor };
}

/**
 * TODO: Filtra propiedades de un objeto según una condición
 * @param {Object} objeto - Objeto original
 * @param {Function} predicado - Función que recibe (key, value) y retorna boolean
 * @returns {Object} - Nuevo objeto solo con propiedades que cumplen la condición
 */
function filtrarPropiedades(objeto, predicado) {
  // Tu código aquí - usa Object.entries y reduce
  return Object.entries(objeto)
    .filter(([key, value]) => predicado(key, value))
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
}

/**
 * TODO: Transforma los valores de un objeto
 * @param {Object} objeto - Objeto original
 * @param {Function} transformador - Función que recibe value y retorna nuevo value
 * @returns {Object} - Nuevo objeto con valores transformados
 */
function transformarValores(objeto, transformador) {
  // Tu código aquí - usa Object.entries y reduce
  return Object.entries(objeto)
    .reduce((acc, [key, value]) => {
      acc[key] = transformador(value);
      return acc;
    }, {});
}

/**
 * TODO: Combina múltiples objetos en uno solo
 * @param {...Object} objetos - Objetos a combinar
 * @returns {Object} - Objeto combinado
 */
function combinarMultiples(...objetos) {
  // Tu código aquí - usa spread
  return Object.assign({}, ...objetos);
}

/**
 * TODO: Verifica si un objeto tiene una propiedad
 * @param {Object} objeto - Objeto a verificar
 * @param {string} propiedad - Propiedad a buscar
 * @returns {boolean} - true si la propiedad existe
 */
function tienePropiedad(objeto, propiedad) {
  // Tu código aquí - usa hasOwnProperty o 'in'
  return objeto.hasOwnProperty(propiedad);
}

// Exportar funciones para testing
module.exports = {
  extraerDatos,
  aplicarConfiguracion,
  combinarObjetos,
  agregarPropiedad,
  obtenerPropiedades,
  obtenerValores,
  objetoAEntradas,
  entradasAObjeto,
  clonarObjeto,
  eliminarPropiedad,
  renombrarPropiedad,
  filtrarPropiedades,
  transformarValores,
  combinarMultiples,
  tienePropiedad
};

/**
 * Notas:
 * - Destructuring: const { prop } = objeto
 * - Spread: { ...objeto }
 * - Computed properties: { [variable]: valor }
 * - Object.keys/values/entries son muy útiles para iterar
 * - Siempre crea nuevos objetos en lugar de modificar los existentes
 * 
 * Recursos:
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 */
