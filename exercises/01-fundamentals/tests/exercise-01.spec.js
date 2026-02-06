/**
 * Test de Validación - Ejercicio 01: Variables y Tipos
 * 
 * Este test valida que las funciones del ejercicio 01 funcionen correctamente
 */

const { test, expect } = require('@playwright/test');
const ejercicio = require('../solutions/solution-01');

test.describe('Ejercicio 01: Variables y Tipos', () => {
  
  test('declararNombre debe retornar un string', () => {
    const nombre = ejercicio.declararNombre();
    expect(typeof nombre).toBe('string');
    expect(nombre.length).toBeGreaterThan(0);
  });

  test('declararEdad debe retornar un number', () => {
    const edad = ejercicio.declararEdad();
    expect(typeof edad).toBe('number');
    expect(edad).toBeGreaterThan(0);
  });

  test('crearUsuario debe retornar un objeto con propiedades correctas', () => {
    const usuario = ejercicio.crearUsuario();
    expect(usuario).toHaveProperty('nombre');
    expect(usuario).toHaveProperty('edad');
    expect(usuario).toHaveProperty('activo');
    expect(typeof usuario.nombre).toBe('string');
    expect(typeof usuario.edad).toBe('number');
    expect(typeof usuario.activo).toBe('boolean');
  });

  test('crearArrayFrutas debe retornar un array de strings', () => {
    const frutas = ejercicio.crearArrayFrutas();
    expect(Array.isArray(frutas)).toBeTruthy();
    expect(frutas.length).toBe(5);
    frutas.forEach(fruta => {
      expect(typeof fruta).toBe('string');
    });
  });

  test('concatenarStrings debe unir dos strings con espacio', () => {
    const resultado = ejercicio.concatenarStrings('Hola', 'Mundo');
    expect(resultado).toBe('Hola Mundo');
  });

  test('sumarNumeros debe sumar correctamente', () => {
    expect(ejercicio.sumarNumeros(2, 3)).toBe(5);
    expect(ejercicio.sumarNumeros(10, 20)).toBe(30);
    expect(ejercicio.sumarNumeros(-5, 5)).toBe(0);
  });

  test('esPar debe identificar números pares', () => {
    expect(ejercicio.esPar(2)).toBeTruthy();
    expect(ejercicio.esPar(4)).toBeTruthy();
    expect(ejercicio.esPar(3)).toBeFalsy();
    expect(ejercicio.esPar(7)).toBeFalsy();
  });

  test('obtenerPrimerElemento debe retornar el primer elemento', () => {
    expect(ejercicio.obtenerPrimerElemento([1, 2, 3])).toBe(1);
    expect(ejercicio.obtenerPrimerElemento(['a', 'b', 'c'])).toBe('a');
  });

  test('obtenerPropiedad debe retornar el valor de una propiedad', () => {
    const obj = { nombre: 'Juan', edad: 30 };
    expect(ejercicio.obtenerPropiedad(obj, 'nombre')).toBe('Juan');
    expect(ejercicio.obtenerPropiedad(obj, 'edad')).toBe(30);
  });

  test('agregarElemento debe agregar un elemento al array', () => {
    const arr = [1, 2, 3];
    const resultado = ejercicio.agregarElemento(arr, 4);
    expect(resultado).toContain(4);
    expect(resultado.length).toBe(4);
  });

});
