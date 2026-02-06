/**
 * Ejercicio 05: Manipulación de Objetos (TypeScript)
 * 
 * Objetivo: Dominar operaciones con objetos usando tipado estático
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa interfaces y tipos para estructurar datos
 * 3. Aprovecha Partial, Pick, Omit, Record
 * 
 * Conceptos a practicar:
 * - Destructuring tipado
 * - Spread operator con tipos
 * - Utility types (Partial, Pick, Omit, Record)
 * - Mapped types
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
 * Interface para Configuración
 */
interface Config {
  timeout?: number;
  retries?: number;
  headless?: boolean;
}

/**
 * TODO: Usa destructuring para extraer propiedades
 */
function extraerDatos(usuario: Usuario): string {
  // Tu código aquí - usa destructuring tipado
  const { nombre, email }: Usuario = usuario;
  return `Nombre: ${nombre}, Email: ${email}`;
}

/**
 * TODO: Usa destructuring con valores por defecto
 */
function aplicarConfiguracion(config: Config): Required<Config> {
  // Tu código aquí - Required<Config> asegura que todas las propiedades existan
  const { 
    timeout = 5000, 
    retries = 3, 
    headless = true 
  }: Config = config;
  
  return { timeout, retries, headless };
}

/**
 * TODO: Usa spread operator para combinar dos objetos
 */
function combinarObjetos<T extends object, U extends object>(
  obj1: T,
  obj2: U
): T & U {
  // Tu código aquí - el tipo de retorno es la intersección de T y U
  return { ...obj1, ...obj2 };
}

/**
 * TODO: Usa spread operator para agregar una propiedad
 */
function agregarPropiedad<T extends object, K extends string, V>(
  objeto: T,
  propiedad: K,
  valor: V
): T & Record<K, V> {
  // Tu código aquí
  return { ...objeto, [propiedad]: valor } as T & Record<K, V>;
}

/**
 * TODO: Usa Object.keys con tipado correcto
 */
function obtenerPropiedades<T extends object>(objeto: T): (keyof T)[] {
  // Tu código aquí
  return Object.keys(objeto) as (keyof T)[];
}

/**
 * TODO: Usa Object.values con tipado correcto
 */
function obtenerValores<T extends object>(objeto: T): T[keyof T][] {
  // Tu código aquí
  return Object.values(objeto) as T[keyof T][];
}

/**
 * TODO: Usa Object.entries con tipado correcto
 */
function objetoAEntradas<T extends object>(
  objeto: T
): [keyof T, T[keyof T]][] {
  // Tu código aquí
  return Object.entries(objeto) as [keyof T, T[keyof T]][];
}

/**
 * TODO: Convierte entradas a objeto
 */
function entradasAObjeto<K extends string, V>(
  entradas: [K, V][]
): Record<K, V> {
  // Tu código aquí
  return Object.fromEntries(entradas) as Record<K, V>;
}

/**
 * TODO: Clona un objeto (copia superficial)
 */
function clonarObjeto<T extends object>(objeto: T): T {
  // Tu código aquí
  return { ...objeto };
}

/**
 * TODO: Elimina una propiedad de un objeto
 * Usa Omit utility type
 */
function eliminarPropiedad<T extends object, K extends keyof T>(
  objeto: T,
  propiedad: K
): Omit<T, K> {
  // Tu código aquí - usa destructuring con rest
  const { [propiedad]: removed, ...resto } = objeto;
  return resto as Omit<T, K>;
}

/**
 * TODO: Selecciona solo ciertas propiedades de un objeto
 * Usa Pick utility type
 */
function seleccionarPropiedades<T extends object, K extends keyof T>(
  objeto: T,
  ...propiedades: K[]
): Pick<T, K> {
  // Tu código aquí
  const resultado = {} as Pick<T, K>;
  for (const prop of propiedades) {
    resultado[prop] = objeto[prop];
  }
  return resultado;
}

/**
 * TODO: Hace todas las propiedades opcionales
 * Usa Partial utility type
 */
function hacerOpcional<T extends object>(objeto: T): Partial<T> {
  // Tu código aquí
  return { ...objeto };
}

/**
 * TODO: Hace todas las propiedades requeridas
 * Usa Required utility type
 */
function hacerRequerido<T extends object>(objeto: T): Required<T> {
  // Tu código aquí - asume que todas las propiedades tienen valor
  return objeto as Required<T>;
}

/**
 * TODO: Filtra propiedades según una condición
 */
function filtrarPropiedades<T extends object>(
  objeto: T,
  predicado: (key: keyof T, value: T[keyof T]) => boolean
): Partial<T> {
  // Tu código aquí
  return Object.entries(objeto)
    .filter(([key, value]) => predicado(key as keyof T, value as T[keyof T]))
    .reduce((acc, [key, value]) => {
      (acc as any)[key] = value;
      return acc;
    }, {} as Partial<T>);
}

/**
 * TODO: Transforma los valores de un objeto
 */
function transformarValores<T extends object, U>(
  objeto: T,
  transformador: (value: T[keyof T]) => U
): Record<keyof T, U> {
  // Tu código aquí
  return Object.entries(objeto)
    .reduce((acc, [key, value]) => {
      (acc as any)[key] = transformador(value as T[keyof T]);
      return acc;
    }, {} as Record<keyof T, U>);
}

/**
 * TODO: Combina múltiples objetos del mismo tipo
 */
function combinarMultiples<T extends object>(...objetos: T[]): T {
  // Tu código aquí
  return Object.assign({}, ...objetos);
}

/**
 * TODO: Verifica si un objeto tiene una propiedad
 */
function tienePropiedad<T extends object, K extends string>(
  objeto: T,
  propiedad: K
): objeto is T & Record<K, unknown> {
  // Tu código aquí - type guard
  return objeto.hasOwnProperty(propiedad);
}

/**
 * Tipo para mapear propiedades a otro tipo
 */
type MapearTipo<T, U> = {
  [K in keyof T]: U;
};

/**
 * TODO: Crea un objeto con las mismas keys pero valores de otro tipo
 */
function mapearATipo<T extends object, U>(
  objeto: T,
  valorPorDefecto: U
): MapearTipo<T, U> {
  // Tu código aquí
  return Object.keys(objeto).reduce((acc, key) => {
    (acc as any)[key] = valorPorDefecto;
    return acc;
  }, {} as MapearTipo<T, U>);
}

// Exportar funciones para testing
export {
  Usuario,
  Config,
  MapearTipo,
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
  seleccionarPropiedades,
  hacerOpcional,
  hacerRequerido,
  filtrarPropiedades,
  transformarValores,
  combinarMultiples,
  tienePropiedad,
  mapearATipo
};

/**
 * Notas TypeScript:
 * - Utility types (Partial, Required, Pick, Omit, Record) son muy útiles
 * - keyof T obtiene las keys de un tipo como union
 * - T[K] obtiene el tipo de una propiedad
 * - Type guards (is) ayudan a refinar tipos
 * - Mapped types permiten transformar tipos
 * 
 * Recursos:
 * - https://www.typescriptlang.org/docs/handbook/utility-types.html
 * - https://www.typescriptlang.org/docs/handbook/2/mapped-types.html
 */
