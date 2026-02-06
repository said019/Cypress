/**
 * Test de Validación - Ejercicio 04: Métodos de Arrays
 */

const { test, expect } = require('@playwright/test');
const ejercicio = require('../solutions/solution-04');

test.describe('Ejercicio 04: Métodos de Arrays', () => {
  
  test('duplicarNumeros debe multiplicar por 2', () => {
    expect(ejercicio.duplicarNumeros([1, 2, 3])).toEqual([2, 4, 6]);
  });

  test('filtrarPares debe filtrar solo pares', () => {
    expect(ejercicio.filtrarPares([1, 2, 3, 4, 5])).toEqual([2, 4]);
  });

  test('sumarArray debe sumar todos los elementos', () => {
    expect(ejercicio.sumarArray([1, 2, 3, 4])).toBe(10);
    expect(ejercicio.sumarArray([])).toBe(0);
  });

  test('encontrarUsuarioPorEmail debe encontrar usuario', () => {
    const usuarios = [
      { nombre: 'Juan', email: 'juan@test.com', edad: 25 },
      { nombre: 'Ana', email: 'ana@test.com', edad: 30 }
    ];
    const usuario = ejercicio.encontrarUsuarioPorEmail(usuarios, 'ana@test.com');
    expect(usuario).toBeDefined();
    expect(usuario.nombre).toBe('Ana');
  });

  test('encontrarIndiceFruta debe retornar índice correcto', () => {
    const frutas = ['manzana', 'banana', 'naranja'];
    expect(ejercicio.encontrarIndiceFruta(frutas, 'banana')).toBe(1);
    expect(ejercicio.encontrarIndiceFruta(frutas, 'uva')).toBe(-1);
  });

  test('existeMayorA10 debe verificar correctamente', () => {
    expect(ejercicio.existeMayorA10([1, 5, 15])).toBeTruthy();
    expect(ejercicio.existeMayorA10([1, 5, 9])).toBeFalsy();
  });

  test('todosSonPositivos debe verificar todos', () => {
    expect(ejercicio.todosSonPositivos([1, 2, 3])).toBeTruthy();
    expect(ejercicio.todosSonPositivos([1, -2, 3])).toBeFalsy();
  });

  test('extraerNombres debe extraer solo nombres', () => {
    const usuarios = [
      { nombre: 'Juan', email: 'juan@test.com', edad: 25 },
      { nombre: 'Ana', email: 'ana@test.com', edad: 30 }
    ];
    expect(ejercicio.extraerNombres(usuarios)).toEqual(['Juan', 'Ana']);
  });

  test('emailsDeUsuariosActivos debe filtrar y mapear', () => {
    const usuarios = [
      { nombre: 'Juan', email: 'juan@test.com', activo: true },
      { nombre: 'Ana', email: 'ana@test.com', activo: false },
      { nombre: 'Pedro', email: 'pedro@test.com', activo: true }
    ];
    const emails = ejercicio.emailsDeUsuariosActivos(usuarios);
    expect(emails).toEqual(['juan@test.com', 'pedro@test.com']);
  });

  test('agruparPorEdad debe agrupar correctamente', () => {
    const usuarios = [
      { nombre: 'Juan', edad: 25 },
      { nombre: 'Ana', edad: 30 },
      { nombre: 'Pedro', edad: 25 }
    ];
    const grupos = ejercicio.agruparPorEdad(usuarios);
    expect(grupos[25]).toHaveLength(2);
    expect(grupos[30]).toHaveLength(1);
  });

  test('contarOcurrencias debe contar correctamente', () => {
    const resultado = ejercicio.contarOcurrencias(['a', 'b', 'a', 'c', 'b', 'a']);
    expect(resultado).toEqual({ a: 3, b: 2, c: 1 });
  });

  test('promedioEdadActivos debe calcular promedio', () => {
    const usuarios = [
      { nombre: 'Juan', edad: 20, activo: true },
      { nombre: 'Ana', edad: 30, activo: true },
      { nombre: 'Pedro', edad: 40, activo: false }
    ];
    expect(ejercicio.promedioEdadActivos(usuarios)).toBe(25);
  });

  test('ordenarNumeros debe ordenar ascendente', () => {
    const numeros = [3, 1, 4, 1, 5];
    const ordenados = ejercicio.ordenarNumeros(numeros);
    expect(ordenados).toEqual([1, 1, 3, 4, 5]);
    expect(numeros).toEqual([3, 1, 4, 1, 5]); // No modifica original
  });

  test('ordenarPorNombre debe ordenar alfabéticamente', () => {
    const usuarios = [
      { nombre: 'Carlos' },
      { nombre: 'Ana' },
      { nombre: 'Beatriz' }
    ];
    const ordenados = ejercicio.ordenarPorNombre(usuarios);
    expect(ordenados[0].nombre).toBe('Ana');
    expect(ordenados[2].nombre).toBe('Carlos');
  });

  test('obtenerPrimeros debe retornar N elementos', () => {
    const array = [1, 2, 3, 4, 5];
    expect(ejercicio.obtenerPrimeros(array, 3)).toEqual([1, 2, 3]);
  });

});
