/**
 * Test de Validación: Ejercicio 02 - MockResponseBuilder
 */

const { test, expect } = require('@playwright/test');
const { MockResponseBuilder, ErrorTemplates } = require('../solutions/solution-02-mock-builder');

test.describe('Ejercicio 02: MockResponseBuilder', () => {
  test.describe('MockResponseBuilder', () => {
    test('debe crear instancia de MockResponseBuilder', () => {
      const builder = new MockResponseBuilder();
      expect(builder).toBeDefined();
    });

    test('debe establecer status code', () => {
      const builder = new MockResponseBuilder();
      builder.withStatus(404);
      const response = builder.build();
      expect(response.status).toBe(404);
    });

    test('debe agregar headers', () => {
      const builder = new MockResponseBuilder();
      builder.withHeaders({ 'X-Custom': 'test' });
      const response = builder.build();
      expect(response.headers['X-Custom']).toBe('test');
    });

    test('debe establecer body', () => {
      const builder = new MockResponseBuilder();
      const data = { message: 'test' };
      builder.withBody(data);
      const response = builder.build();
      const body = JSON.parse(response.body);
      expect(body.message).toBe('test');
    });

    test('debe agregar delay', () => {
      const builder = new MockResponseBuilder();
      builder.withDelay(1000);
      const response = builder.build();
      expect(response.delay).toBe(1000);
    });

    test('debe soportar method chaining', () => {
      const response = new MockResponseBuilder()
        .withStatus(201)
        .withHeaders({ 'X-Test': 'value' })
        .withBody({ success: true })
        .withDelay(500)
        .build();
      
      expect(response.status).toBe(201);
      expect(response.headers['X-Test']).toBe('value');
      expect(response.delay).toBe(500);
    });

    test('debe crear success response', () => {
      const builder = MockResponseBuilder.success({ id: 1 });
      const response = builder.build();
      const body = JSON.parse(response.body);
      
      expect(response.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(1);
    });

    test('debe crear error response', () => {
      const builder = MockResponseBuilder.error('Something went wrong', 500);
      const response = builder.build();
      const body = JSON.parse(response.body);
      
      expect(response.status).toBe(500);
      expect(body.success).toBe(false);
      expect(body.error).toBe('Something went wrong');
    });

    test('debe crear notFound response', () => {
      const builder = MockResponseBuilder.notFound();
      const response = builder.build();
      
      expect(response.status).toBe(404);
    });

    test('debe crear unauthorized response', () => {
      const builder = MockResponseBuilder.unauthorized();
      const response = builder.build();
      
      expect(response.status).toBe(401);
    });
  });

  test.describe('ErrorTemplates', () => {
    test('debe crear network error template', () => {
      const error = ErrorTemplates.networkError();
      expect(error.status).toBe(0);
      expect(error.body).toContain('Network Error');
    });

    test('debe crear timeout error template', () => {
      const error = ErrorTemplates.timeoutError();
      expect(error.status).toBe(408);
      expect(error.body).toContain('Request Timeout');
    });

    test('debe crear validation error template', () => {
      const fields = ['email', 'password'];
      const error = ErrorTemplates.validationError(fields);
      expect(error.status).toBe(422);
      const body = JSON.parse(error.body);
      expect(body.fields).toEqual(fields);
    });

    test('debe crear server error template', () => {
      const error = ErrorTemplates.serverError();
      expect(error.status).toBe(500);
      expect(error.body).toContain('Internal Server Error');
    });
  });
});
