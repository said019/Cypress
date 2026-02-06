/**
 * Ejercicio 04: Métodos de Arrays (TypeScript)
 * 
 * Objetivo: Dominar métodos de arrays con tipado estático
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Aprovecha los generics para mantener tipos
 * 3. Usa interfaces para estructurar datos
 * 
 * Conceptos a practicar:
 * - Métodos de arrays tipados
 * - Generics en arrays
 * - Interfaces para datos estructurados
 */

/**
 * Interface para Usuario
 */
interface Usuario {
  nombre: string;
  email: string;
  edad: number;
  activo?: boolean;
}

/**
 * TODO: Usa map para transformar un array de números
 */
function duplicarNumeros(numeros: number[]): number[] {
  // Tu código aquí
  return numeros.map((num: number) => num * 2);
}

/**
 * TODO: Usa filter para obtener solo números pares
 */
function filtrarPares(numeros: number[]): number[] {
  // Tu código aquí
  return numeros.filter((num: number) => num % 2 === 0);
}

/**
 * TODO: Usa reduce para sumar todos los números
 */
function sumarArray(numeros: number[]): number {
  // Tu código aquí
  return numeros.reduce((sum: number, num: number) => sum + num, 0);
}

/**
 * TODO: Usa find para encontrar el primer usuario con email específico
 */
function encontrarUsuarioPorEmail(usuarios: Usuario[], email: string): Usuario | undefined {
  // Tu código aquí
  return usuarios.find((usuario: Usuario) => usuario.email === email);
}

/**
 * TODO: Usa findIndex para encontrar la posición de un elemento
 */
function encontrarIndiceFruta(frutas: string[], fruta: string): number {
  // Tu código aquí
  return frutas.findIndex((f: string) => f === fruta);
}

/**
 * TODO: Usa some para verificar si existe al menos un número mayor a 10
 */
function existeMayorA10(numeros: number[]): boolean {
  // Tu código aquí
  return numeros.some((num: number) => num > 10);
}

/**
 * TODO: Usa every para verificar si todos los números son positivos
 */
function todosSonPositivos(numeros: number[]): boolean {
  // Tu código aquí
  return numeros.every((num: number) => num > 0);
}

/**
 * TODO: Usa map para extraer solo los nombres de usuarios
 */
function extraerNombres(usuarios: Usuario[]): string[] {
  // Tu código aquí
  return usuarios.map((usuario: Usuario) => usuario.nombre);
}

/**
 * TODO: Combina filter y map para obtener emails de usuarios activos
 */
function emailsDeUsuariosActivos(usuarios: Usuario[]): string[] {
  // Tu código aquí
  return usuarios
    .filter((usuario: Usuario) => usuario.activo === true)
    .map((usuario: Usuario) => usuario.email);
}

/**
 * Tipo para el resultado de agrupar por edad
 */
type GruposPorEdad = Record<number, Usuario[]>;

/**
 * TODO: Usa reduce para agrupar usuarios por edad
 */
function agruparPorEdad(usuarios: Usuario[]): GruposPorEdad {
  // Tu código aquí
  return usuarios.reduce((grupos: GruposPorEdad, usuario: Usuario) => {
    const edad: number = usuario.edad;
    if (!grupos[edad]) {
      grupos[edad] = [];
    }
    grupos[edad].push(usuario);
    return grupos;
  }, {});
}

/**
 * Tipo para conteo de ocurrencias
 */
type Conteo = Record<string, number>;

/**
 * TODO: Usa reduce para contar ocurrencias de cada elemento
 */
function contarOcurrencias(elementos: string[]): Conteo {
  // Tu código aquí
  return elementos.reduce((conteo: Conteo, elemento: string) => {
    conteo[elemento] = (conteo[elemento] || 0) + 1;
    return conteo;
  }, {});
}

/**
 * TODO: Combina múltiples métodos para obtener el promedio de edades
 */
function promedioEdadActivos(usuarios: Usuario[]): number {
  // Tu código aquí
  const activos: Usuario[] = usuarios.filter((u: Usuario) => u.activo === true);
  if (activos.length === 0) return 0;
  
  const sumaEdades: number = activos.reduce((sum: number, u: Usuario) => sum + u.edad, 0);
  return sumaEdades / activos.length;
}

/**
 * TODO: Usa sort para ordenar números de menor a mayor
 * Usa generics para que funcione con cualquier tipo comparable
 */
function ordenarNumeros(numeros: number[]): number[] {
  // Tu código aquí
  return [...numeros].sort((a: number, b: number) => a - b);
}

/**
 * TODO: Usa sort para ordenar usuarios por nombre alfabéticamente
 */
function ordenarPorNombre(usuarios: Usuario[]): Usuario[] {
  // Tu código aquí
  return [...usuarios].sort((a: Usuario, b: Usuario) => 
    a.nombre.localeCompare(b.nombre)
  );
}

/**
 * TODO: Usa slice para obtener los primeros N elementos
 * Usa generics para mantener el tipo
 */
function obtenerPrimeros<T>(array: T[], n: number): T[] {
  // Tu código aquí
  return array.slice(0, n);
}

/**
 * TODO: Crea una función genérica que filtre elementos según un predicado
 */
function filtrarPorCondicion<T>(
  array: T[],
  predicado: (elemento: T) => boolean
): T[] {
  // Tu código aquí
  return array.filter(predicado);
}

/**
 * TODO: Crea una función genérica que transforme elementos
 */
function transformar<T, U>(
  array: T[],
  transformador: (elemento: T) => U
): U[] {
  // Tu código aquí
  return array.map(transformador);
}

/**
 * TODO: Crea una función que agrupe elementos por una propiedad
 */
function agruparPor<T, K extends keyof T>(
  array: T[],
  propiedad: K
): Record<string, T[]> {
  // Tu código aquí
  return array.reduce((grupos: Record<string, T[]>, elemento: T) => {
    const clave: string = String(elemento[propiedad]);
    if (!grupos[clave]) {
      grupos[clave] = [];
    }
    grupos[clave].push(elemento);
    return grupos;
  }, {});
}

// Exportar funciones para testing
export {
  Usuario,
  GruposPorEdad,
  Conteo,
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
  obtenerPrimeros,
  filtrarPorCondicion,
  transformar,
  agruparPor
};

/**
 * Notas TypeScript:
 * - Generics (<T>) permiten funciones reutilizables con tipos seguros
 * - Record<K, V> es útil para objetos con keys dinámicas
 * - keyof T obtiene las keys de un tipo como union
 * - TypeScript infiere tipos en callbacks de arrays automáticamente
 * 
 * Recursos:
 * - https://www.typescriptlang.org/docs/handbook/2/generics.html
 */
