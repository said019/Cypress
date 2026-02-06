/**
 * Test de Validación: Ejercicio 02 - API Client
 */

const { test, expect } = require('@playwright/test');
const { APIClient } = require('../solutions/solution-02-api-client');

test.describe('Ejercicio 02: API Client', () => {
  let apiClient;

  test.beforeEach(() => {
    apiClient = new APIClient('https://jsonplaceholder.typicode.com');
  });

  test('debe crear instancia de APIClient', () => {
    expect(apiClient).toBeDefined();
    expect(apiClient.baseURL).toBe('https://jsonplaceholder.typicode.com');
  });

  test('debe manejar token de autenticación', () => {
    const token = 'test-token-123';
    apiClient.setToken(token);
    const headers = apiClient.getHeaders();
    expect(headers['Authorization']).toBe(`Bearer ${token}`);
  });

  test('debe combinar headers correctamente', () => {
    apiClient.setToken('token123');
    const headers = apiClient.getHeaders({ 'X-Custom': 'value' });
    expect(headers['Authorization']).toBe('Bearer token123');
    expect(headers['X-Custom']).toBe('value');
  });

  test('debe validar schema correctamente', () => {
    const data = { id: 1, name: 'Test', email: 'test@test.com' };
    const schema = { id: 'number', name: 'string', email: 'string' };
    expect(apiClient.validateSchema(data, schema)).toBe(true);
  });

  test('debe fallar validación con schema incorrecto', () => {
    const data = { id: '1', name: 'Test' };
    const schema = { id: 'number', name: 'string', email: 'string' };
    expect(apiClient.validateSchema(data, schema)).toBe(false);
  });

  test('debe validar status codes', () => {
    expect(apiClient.validateStatusCode(200, [200, 201])).toBe(true);
    expect(apiClient.validateStatusCode(404, [200, 201])).toBe(false);
  });

  test('debe realizar GET request', async () => {
    const data = await apiClient.get('/posts/1');
    expect(data).toBeDefined();
    expect(data.id).toBe(1);
  });

  test('debe realizar GET con validación de schema', async () => {
    const schema = { id: 'number', userId: 'number', title: 'string', body: 'string' };
    const data = await apiClient.get('/posts/1', { schema });
    expect(data).toBeDefined();
  });

  test('debe realizar POST request', async () => {
    const postData = { title: 'Test', body: 'Body', userId: 1 };
    const response = await apiClient.post('/posts', postData);
    expect(response).toBeDefined();
    expect(response.title).toBe('Test');
  });

  test('debe realizar PUT request', async () => {
    const putData = { id: 1, title: 'Updated', body: 'Updated Body', userId: 1 };
    const response = await apiClient.put('/posts/1', putData);
    expect(response).toBeDefined();
  });

  test('debe realizar PATCH request', async () => {
    const patchData = { title: 'Patched' };
    const response = await apiClient.patch('/posts/1', patchData);
    expect(response).toBeDefined();
  });

  test('debe realizar DELETE request', async () => {
    const status = await apiClient.delete('/posts/1');
    expect(status).toBe(200);
  });

  test('debe obtener response headers', async () => {
    const headers = await apiClient.getResponseHeaders('/posts/1');
    expect(headers).toBeDefined();
    expect(headers['content-type']).toContain('application/json');
  });

  test('debe manejar errores correctamente', async () => {
    try {
      await apiClient.get('/invalid-endpoint-xyz');
      expect(true).toBe(false); // No debería llegar aquí
    } catch (error) {
      expect(error.message).toContain('[GET]');
    }
  });
});
