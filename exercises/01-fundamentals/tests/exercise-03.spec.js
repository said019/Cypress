/**
 * Test de Validación - Ejercicio 03: Async/Await y Promises
 */

const { test, expect } = require('@playwright/test');
const ejercicio = require('../solutions/solution-03');

test.describe('Ejercicio 03: Async/Await y Promises', () => {
  
  test('esperarYRetornar debe retornar una Promise', async () => {
    const resultado = ejercicio.esperarYRetornar(10, 'test');
    expect(resultado).toBeInstanceOf(Promise);
    const valor = await resultado;
    expect(valor).toBe('test');
  });

  test('saludarAsync debe esperar y retornar saludo', async () => {
    const resultado = await ejercicio.saludarAsync('María');
    expect(resultado).toContain('María');
    expect(resultado).toContain('Hola');
  });

  test('obtenerUsuario debe retornar un objeto usuario', async () => {
    const usuario = await ejercicio.obtenerUsuario(1);
    expect(usuario).toHaveProperty('id');
    expect(usuario).toHaveProperty('nombre');
    expect(usuario).toHaveProperty('email');
    expect(usuario.id).toBe(1);
  });

  test('procesarNumero debe procesar números positivos', async () => {
    const resultado = await ejercicio.procesarNumero(5);
    expect(resultado).toBe(10);
  });

  test('procesarNumero debe lanzar error con números negativos', async () => {
    await expect(ejercicio.procesarNumero(-5)).rejects.toThrow();
  });

  test('obtenerMultiplesUsuarios debe retornar array de usuarios', async () => {
    const usuarios = await ejercicio.obtenerMultiplesUsuarios([1, 2, 3]);
    expect(Array.isArray(usuarios)).toBeTruthy();
    expect(usuarios.length).toBe(3);
    usuarios.forEach(u => {
      expect(u).toHaveProperty('id');
      expect(u).toHaveProperty('nombre');
    });
  });

  test('obtenerPrimero debe retornar la primera Promise resuelta', async () => {
    const promises = [
      ejercicio.esperarYRetornar(50, 'lento'),
      ejercicio.esperarYRetornar(10, 'rápido')
    ];
    const resultado = await ejercicio.obtenerPrimero(promises);
    expect(resultado).toBe('rápido');
  });

  test('procesarUsuario debe encadenar operaciones', async () => {
    const resultado = await ejercicio.procesarUsuario(1);
    expect(resultado).toContain('Procesado');
    expect(resultado).toContain('Usuario');
  });

  test('obtenerUsuarioSeguro debe retornar usuario por defecto en error', async () => {
    const usuario = await ejercicio.obtenerUsuarioSeguro(-1);
    expect(usuario).toHaveProperty('id');
    expect(usuario.id).toBe(0);
    expect(usuario.nombre).toContain('Desconocido');
  });

  test('procesarEnSecuencia debe procesar en orden', async () => {
    const resultados = await ejercicio.procesarEnSecuencia([1, 2, 3]);
    expect(resultados).toEqual([2, 4, 6]);
  });

});
