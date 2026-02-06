/**
 * Test de Validación - Ejercicio 02: Funciones y Arrow Functions
 */

const { test, expect } = require('@playwright/test');
const ejercicio = require('../solutions/solution-02');

test.describe('Ejercicio 02: Funciones y Arrow Functions', () => {
  
  test('saludar debe retornar un saludo', () => {
    const resultado = ejercicio.saludar('Juan');
    expect(resultado).toContain('Juan');
    expect(resultado).toContain('Hola');
  });

  test('despedir debe retornar una despedida', () => {
    const resultado = ejercicio.despedir('Ana');
    expect(resultado).toContain('Ana');
    expect(resultado).toContain('Adiós');
  });

  test('saludarConDefault debe usar valor por defecto', () => {
    const conNombre = ejercicio.saludarConDefault('Pedro');
    const sinNombre = ejercicio.saludarConDefault();
    expect(conNombre).toContain('Pedro');
    expect(sinNombre).toContain('Invitado');
  });

  test('multiplicar debe multiplicar dos números', () => {
    expect(ejercicio.multiplicar(3, 4)).toBe(12);
    expect(ejercicio.multiplicar(5, 5)).toBe(25);
  });

  test('sumarTodos debe sumar todos los argumentos', () => {
    expect(ejercicio.sumarTodos(1, 2, 3)).toBe(6);
    expect(ejercicio.sumarTodos(10, 20, 30, 40)).toBe(100);
    expect(ejercicio.sumarTodos()).toBe(0);
  });

  test('crearPrefijador debe retornar una función', () => {
    const prefijador = ejercicio.crearPrefijador('ERROR');
    expect(typeof prefijador).toBe('function');
    const resultado = prefijador('Algo salió mal');
    expect(resultado).toContain('ERROR');
    expect(resultado).toContain('Algo salió mal');
  });

  test('filtrarPares debe filtrar solo números pares', () => {
    const resultado = ejercicio.filtrarPares([1, 2, 3, 4, 5, 6]);
    expect(resultado).toEqual([2, 4, 6]);
  });

  test('convertirAMayusculas debe convertir strings a mayúsculas', () => {
    const resultado = ejercicio.convertirAMayusculas(['hola', 'mundo']);
    expect(resultado).toEqual(['HOLA', 'MUNDO']);
  });

  test('encontrarMaximo debe encontrar el número máximo', () => {
    expect(ejercicio.encontrarMaximo([1, 5, 3, 9, 2])).toBe(9);
    expect(ejercicio.encontrarMaximo([10, 20, 15])).toBe(20);
  });

  test('objetoEjemplo debe tener métodos', () => {
    expect(ejercicio.objetoEjemplo).toHaveProperty('metodoTradicional');
    expect(ejercicio.objetoEjemplo).toHaveProperty('metodoArrow');
    expect(typeof ejercicio.objetoEjemplo.metodoTradicional).toBe('function');
  });

});
