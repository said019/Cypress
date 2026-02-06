/**
 * Ejercicio 03: Async/Await y Promises (TypeScript)
 * 
 * Objetivo: Dominar programación asíncrona con tipado
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa Promise<T> para tipar retornos asíncronos
 * 3. Maneja errores con try/catch
 * 
 * Conceptos a practicar:
 * - Promises tipadas
 * - async/await con tipos
 * - Manejo de errores
 * - Promise.all, Promise.race con tipos
 */

/**
 * Interface para el objeto Usuario
 */
interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

/**
 * TODO: Crea una función que retorne una Promise tipada
 */
function esperarYRetornar<T>(ms: number, valor: T): Promise<T> {
  // Tu código aquí
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(valor);
    }, ms);
  });
}

/**
 * TODO: Crea una función async que espere y retorne un saludo
 */
async function saludarAsync(nombre: string): Promise<string> {
  // Tu código aquí
  await esperarYRetornar(100, null);
  return `Hola, ${nombre}!`;
}

/**
 * TODO: Crea una función que simule una llamada a API
 * Debe retornar Promise<Usuario>
 */
async function obtenerUsuario(userId: number): Promise<Usuario> {
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
 * @throws {Error} - Si el número es negativo
 */
async function procesarNumero(numero: number): Promise<number> {
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
 * Usa Promise.all con tipado correcto
 */
async function obtenerMultiplesUsuarios(userIds: number[]): Promise<Usuario[]> {
  // Tu código aquí
  const promises: Promise<Usuario>[] = userIds.map(id => obtenerUsuario(id));
  return Promise.all(promises);
}

/**
 * TODO: Crea una función que ejecute Promises y retorne la primera
 * Usa Promise.race con generics
 */
async function obtenerPrimero<T>(promises: Promise<T>[]): Promise<T> {
  // Tu código aquí
  return Promise.race(promises);
}

/**
 * TODO: Crea una función que encadene múltiples operaciones asíncronas
 */
async function procesarUsuario(userId: number): Promise<string> {
  // Tu código aquí
  const usuario: Usuario = await obtenerUsuario(userId);
  await esperarYRetornar(100, null);
  return `Procesado: ${usuario.nombre}`;
}

/**
 * TODO: Crea una función que maneje errores y retorne valor por defecto
 */
async function obtenerUsuarioSeguro(userId: number): Promise<Usuario> {
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
 */
async function procesarEnSecuencia(numeros: number[]): Promise<number[]> {
  // Tu código aquí
  const resultados: number[] = [];
  for (const numero of numeros) {
    const resultado: number = await procesarNumero(Math.abs(numero));
    resultados.push(resultado);
  }
  return resultados;
}

/**
 * Tipo para una función asíncrona que retorna Usuario
 */
type ObtenerUsuarioFn = (id: number) => Promise<Usuario>;

/**
 * TODO: Crea una función que acepte una función asíncrona como parámetro
 */
async function ejecutarConReintento(
  fn: ObtenerUsuarioFn,
  userId: number,
  intentos: number = 3
): Promise<Usuario> {
  // Tu código aquí
  for (let i = 0; i < intentos; i++) {
    try {
      return await fn(userId);
    } catch (error) {
      if (i === intentos - 1) throw error;
      await esperarYRetornar(100, null);
    }
  }
  throw new Error("Todos los intentos fallaron");
}

/**
 * Ejemplo de Promise con then/catch (estilo antiguo) con tipos
 */
function ejemploPromiseThenCatch(): Promise<string> {
  return esperarYRetornar(100, "valor")
    .then((resultado: string) => {
      console.log("Resuelto:", resultado);
      return resultado;
    })
    .catch((error: Error) => {
      console.error("Error:", error);
      throw error;
    })
    .finally(() => {
      console.log("Finalizado");
    });
}

// Exportar funciones para testing
export {
  Usuario,
  ObtenerUsuarioFn,
  esperarYRetornar,
  saludarAsync,
  obtenerUsuario,
  procesarNumero,
  obtenerMultiplesUsuarios,
  obtenerPrimero,
  procesarUsuario,
  obtenerUsuarioSeguro,
  procesarEnSecuencia,
  ejecutarConReintento,
  ejemploPromiseThenCatch
};

/**
 * Notas TypeScript:
 * - Promise<T> indica el tipo del valor resuelto
 * - async siempre retorna Promise
 * - Tipar promises previene errores en cadenas asíncronas
 * - TypeScript infiere tipos de await automáticamente
 * 
 * Recursos:
 * - https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#promises
 */
