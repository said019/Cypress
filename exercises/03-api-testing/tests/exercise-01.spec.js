/**
 * Test de Validación: Ejercicio 01 - Enhanced API Utils
 */

const { test, expect } = require('@playwright/test');
const { EnhancedAPIUtils } = require('../solutions/solution-01-enhanced-api-utils');

test.describe('Ejercicio 01: Enhanced API Utils', () => {
  let apiUtils;

  test.beforeEach(() => {
    apiUtils = new EnhancedAPIUtils('https://jsonplaceholder.typicode.com');
  });

  test('debe crear instancia de EnhancedAPIUtils', () => {
    expect(apiUtils).toBeDefined();
    expect(apiUtils.baseURL).toBe('https://jsonplaceholder.typicode.com');
  });

  test('debe manejar token de autenticación', () => {
    const token = 'test-token-123';
    apiUtils.setToken(token);
    const headers = apiUtils.getAuthHeaders();
    expect(headers['Authorization']).toBe(`Bearer ${token}`);
  });

  test('debe agregar interceptors de request', async () => {
    const interceptor = async (config) => {
      config.headers = { ...config.headers, 'X-Custom': 'test' };
      return config;
    };
    apiUtils.addRequestInterceptor(interceptor);
    expect(apiUtils.interceptors.request.length).toBe(1);
  });

  test('debe agregar interceptors de response', async () => {
    const interceptor = async (response) => {
      response.modified = true;
      return response;
    };
    apiUtils.addResponseInterceptor(interceptor);
    expect(apiUtils.interceptors.response.length).toBe(1);
  });

  test('debe generar cache key correctamente', () => {
    const key = apiUtils.getCacheKey('GET', '/posts', { id: 1 });
    expect(key).toContain('GET');
    expect(key).toContain('/posts');
  });

  test('debe cachear respuestas GET', async () => {
    const data = { id: 1, title: 'Test' };
    const key = apiUtils.getCacheKey('GET', '/posts/1');
    apiUtils.setCachedResponse(key, data);
    const cached = apiUtils.getCachedResponse(key);
    expect(cached).toEqual(data);
  });

  test('debe realizar GET request', async () => {
    const data = await apiUtils.get('/posts/1');
    expect(data).toBeDefined();
    expect(data.id).toBe(1);
  });

  test('debe realizar POST request', async () => {
    const postData = { title: 'Test Post', body: 'Test Body', userId: 1 };
    const response = await apiUtils.post('/posts', postData);
    expect(response).toBeDefined();
    expect(response.title).toBe('Test Post');
  });

  test('debe realizar PUT request', async () => {
    const putData = { id: 1, title: 'Updated', body: 'Updated Body', userId: 1 };
    const response = await apiUtils.put('/posts/1', putData);
    expect(response).toBeDefined();
    expect(response.title).toBe('Updated');
  });

  test('debe realizar DELETE request', async () => {
    const status = await apiUtils.delete('/posts/1');
    expect(status).toBe(200);
  });

  test('debe aplicar retry logic en caso de fallo', async () => {
    let attempts = 0;
    const requestFn = async () => {
      attempts++;
      if (attempts < 2) throw new Error('Temporary failure');
      return 'success';
    };
    const result = await apiUtils.retryRequest(requestFn, 3, 100);
    expect(result).toBe('success');
    expect(attempts).toBe(2);
  });
});
