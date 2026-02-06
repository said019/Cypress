/**
 * Ejercicio 03: Async/Await y Promises
 * 
 * Objetivo: Dominar programación asíncrona (FUNDAMENTAL para Playwright)
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa async/await correctamente
 * 3. Maneja errores con try/catch
 * 
 * Conceptos a practicar:
 * - Promises
 * - async/await
 * - Manejo de errores asíncronos
 * - Promise.all, Promise.race
 */

/**
 * TODO: Crea una función que retorne una Promise que se resuelve después de un delay
 * @param {number} ms - Milisegundos de delay
 * @param {*} valor - Valor a retornar
 * @returns {Promise} - Promise que se resuelve con el valor
 */
function esperarYRetornar(ms, valor) {
  // Tu código aquí
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(valor);
    }, ms);
  });
}

/**
 * TODO: Crea una función async que espere y retorne un saludo
 * @param {string} nombre - Nombre de la persona
 * @returns {Promise<string>} - Saludo después de 100ms
 */
async function saludarAsync(nombre) {
  // Tu código aquí
  await esperarYRetornar(100, null);
  return `Hola, ${nombre}!`;
}

/**
 * TODO: Crea una función que simule una llamada a API
 * Debe retornar un objeto de usuario después de un delay
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} - Objeto de usuario
 */
async function obtenerUsuario(userId) {
  // Tu código aquí
  await esperarYRetornar(50, null);
  return {
    id: userId,
    nombre: `Usuario ${userId}`,
    email: `usuario${userId}@example.com`
  };
}

/**
 * TODO: Crea una función que maneje errores con try/catch
 * @param {number} numero - Número a procesar
 * @returns {Promise<number>} - Número multiplicado por 2
 * @throws {Error} - Si el número es negativo
 */
async function procesarNumero(numero) {
  // Tu código aquí
  try {
    if (numero < 0) {
      throw new Error("El número no puede ser negativo");
    }
    await esperarYRetornar(50, null);
    return numero * 2;
  } catch (error) {
    throw error;
  }
}

/**
 * TODO: Crea una función que ejecute múltiples Promises en paralelo
 * Usa Promise.all
 * @param {number[]} userIds - Array de IDs de usuarios
 * @returns {Promise<Object[]>} - Array de usuarios
 */
async function obtenerMultiplesUsuarios(userIds) {
  // Tu código aquí
  const promises = userIds.map(id => obtenerUsuario(id));
  return Promise.all(promises);
}

/**
 * TODO: Crea una función que ejecute Promises y retorne la primera que se resuelva
 * Usa Promise.race
 * @param {Array<Promise>} promises - Array de promises
 * @returns {Promise} - Primera promise resuelta
 */
async function obtenerPrimero(promises) {
  // Tu código aquí
  return Promise.race(promises);
}

/**
 * TODO: Crea una función que encadene múltiples operaciones asíncronas
 * 1. Obtener usuario
 * 2. Esperar 100ms
 * 3. Retornar mensaje personalizado
 * @param {number} userId - ID del usuario
 * @returns {Promise<string>} - Mensaje personalizado
 */
async function procesarUsuario(userId) {
  // Tu código aquí
  const usuario = await obtenerUsuario(userId);
  await esperarYRetornar(100, null);
  return `Procesado: ${usuario.nombre}`;
}

/**
 * TODO: Crea una función que maneje errores y retorne un valor por defecto
 * @param {number} userId - ID del usuario
 * @returns {Promise<Object>} - Usuario o usuario por defecto si hay error
 */
async function obtenerUsuarioSeguro(userId) {
  // Tu código aquí
  try {
    if (userId < 0) {
      throw new Error("ID inválido");
    }
    return await obtenerUsuario(userId);
  } catch (error) {
    return {
      id: 0,
      nombre: "Usuario Desconocido",
      email: "desconocido@example.com"
    };
  }
}

/**
 * TODO: Crea una función que ejecute operaciones en secuencia
 * @param {number[]} numeros - Array de números
 * @returns {Promise<number[]>} - Array de números procesados
 */
async function procesarEnSecuencia(numeros) {
  // Tu código aquí
  const resultados = [];
  for (const numero of numeros) {
    const resultado = await procesarNumero(Math.abs(numero));
    resultados.push(resultado);
  }
  return resultados;
}

/**
 * Ejemplo de Promise con then/catch (estilo antiguo)
 */
function ejemploPromiseThenCatch() {
  return esperarYRetornar(100, "valor")
    .then(resultado => {
      console.log("Resuelto:", resultado);
      return resultado;
    })
    .catch(error => {
      console.error("Error:", error);
      throw error;
    })
    .finally(() => {
      console.log("Finalizado");
    });
}

// Exportar funciones para testing
module.exports = {
  esperarYRetornar,
  saludarAsync,
  obtenerUsuario,
  procesarNumero,
  obtenerMultiplesUsuarios,
  obtenerPrimero,
  procesarUsuario,
  obtenerUsuarioSeguro,
  procesarEnSecuencia,
  ejemploPromiseThenCatch
};

/**
 * Notas:
 * - async/await hace el código asíncrono más legible
 * - Siempre usa try/catch para manejar errores
 * - Promise.all ejecuta en paralelo (más rápido)
 * - await pausa la ejecución hasta que la Promise se resuelva
 * - En Playwright, TODAS las operaciones son asíncronas
 * 
 * Recursos:
 * - https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function
 */
