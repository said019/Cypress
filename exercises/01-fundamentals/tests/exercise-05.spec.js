/**
 * Test de Validación - Ejercicio 05: Manipulación de Objetos
 */

const { test, expect } = require('@playwright/test');
const ejercicio = require('../solutions/solution-05');

test.describe('Ejercicio 05: Manipulación de Objetos', () => {
  
  test('extraerDatos debe usar destructuring', () => {
    const usuario = { nombre: 'Juan', email: 'juan@test.com', edad: 25 };
    const resultado = ejercicio.extraerDatos(usuario);
    expect(resultado).toContain('Juan');
    expect(resultado).toContain('juan@test.com');
  });

  test('aplicarConfiguracion debe aplicar defaults', () => {
    const config1 = ejercicio.aplicarConfiguracion({ timeout: 3000 });
    expect(config1.timeout).toBe(3000);
    expect(config1.retries).toBe(3);
    expect(config1.headless).toBe(true);

    const config2 = ejercicio.aplicarConfiguracion({});
    expect(config2.timeout).toBe(5000);
  });

  test('combinarObjetos debe combinar correctamente', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { b: 3, c: 4 };
    const resultado = ejercicio.combinarObjetos(obj1, obj2);
    expect(resultado).toEqual({ a: 1, b: 3, c: 4 });
  });

  test('agregarPropiedad debe agregar sin modificar original', () => {
    const original = { nombre: 'Juan' };
    const resultado = ejercicio.agregarPropiedad(original, 'edad', 25);
    expect(resultado).toHaveProperty('edad');
    expect(resultado.edad).toBe(25);
    expect(original).not.toHaveProperty('edad');
  });

  test('obtenerPropiedades debe retornar keys', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const props = ejercicio.obtenerPropiedades(obj);
    expect(props).toContain('a');
    expect(props).toContain('b');
    expect(props).toContain('c');
  });

  test('obtenerValores debe retornar values', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const valores = ejercicio.obtenerValores(obj);
    expect(valores).toContain(1);
    expect(valores).toContain(2);
    expect(valores).toContain(3);
  });

  test('objetoAEntradas debe convertir a entries', () => {
    const obj = { a: 1, b: 2 };
    const entradas = ejercicio.objetoAEntradas(obj);
    expect(entradas).toContainEqual(['a', 1]);
    expect(entradas).toContainEqual(['b', 2]);
  });

  test('entradasAObjeto debe convertir entries a objeto', () => {
    const entradas = [['a', 1], ['b', 2]];
    const obj = ejercicio.entradasAObjeto(entradas);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  test('clonarObjeto debe crear copia', () => {
    const original = { a: 1, b: 2 };
    const clon = ejercicio.clonarObjeto(original);
    expect(clon).toEqual(original);
    expect(clon).not.toBe(original);
  });

  test('eliminarPropiedad debe eliminar sin modificar original', () => {
    const original = { a: 1, b: 2, c: 3 };
    const resultado = ejercicio.eliminarPropiedad(original, 'b');
    expect(resultado).not.toHaveProperty('b');
    expect(resultado).toHaveProperty('a');
    expect(resultado).toHaveProperty('c');
    expect(original).toHaveProperty('b');
  });

  test('renombrarPropiedad debe renombrar correctamente', () => {
    const original = { nombre: 'Juan', edad: 25 };
    const resultado = ejercicio.renombrarPropiedad(original, 'nombre', 'name');
    expect(resultado).toHaveProperty('name');
    expect(resultado).not.toHaveProperty('nombre');
    expect(resultado.name).toBe('Juan');
  });

  test('filtrarPropiedades debe filtrar según predicado', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const resultado = ejercicio.filtrarPropiedades(obj, (key, value) => value > 2);
    expect(resultado).toHaveProperty('c');
    expect(resultado).toHaveProperty('d');
    expect(resultado).not.toHaveProperty('a');
  });

  test('transformarValores debe transformar todos los valores', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const resultado = ejercicio.transformarValores(obj, v => v * 2);
    expect(resultado).toEqual({ a: 2, b: 4, c: 6 });
  });

  test('combinarMultiples debe combinar varios objetos', () => {
    const resultado = ejercicio.combinarMultiples(
      { a: 1 },
      { b: 2 },
      { c: 3 }
    );
    expect(resultado).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('tienePropiedad debe verificar existencia', () => {
    const obj = { nombre: 'Juan', edad: 25 };
    expect(ejercicio.tienePropiedad(obj, 'nombre')).toBeTruthy();
    expect(ejercicio.tienePropiedad(obj, 'email')).toBeFalsy();
  });

});
