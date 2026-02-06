/**
 * Ejercicio 02: API Client Implementation (TypeScript)
 * 
 * Objetivo: Crear un cliente API completo con validación de schemas y manejo de errores
 */

import { request, APIRequestContext, APIResponse } from '@playwright/test';

interface APIClientOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

interface RequestOptions {
  headers?: Record<string, string>;
  schema?: Record<string, string>;
  expectedStatus?: number[];
}

interface Schema {
  [key: string]: string;
}

class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;
  private timeout: number;
  private token: string | null = null;

  constructor(baseURL: string, options: APIClientOptions = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = options.headers || {};
    this.timeout = options.timeout || 30000;
  }

  // TODO: Implementar setToken para manejar autenticación
  setToken(token: string): void {
    // Tu código aquí
  }

  // TODO: Implementar getHeaders para combinar headers por defecto y auth
  getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    // Tu código aquí
    return {};
  }

  // TODO: Implementar validateSchema para validar respuestas contra un schema
  validateSchema(data: any, schema: Schema): boolean {
    // Validar que data cumple con schema
    // Schema ejemplo: { id: 'number', name: 'string', email: 'string' }
    // Tu código aquí
    return false;
  }

  // TODO: Implementar handleError para manejo centralizado de errores
  handleError(error: Error, context: string): Error {
    // Crear un error descriptivo con contexto
    // Tu código aquí
    return error;
  }

  // TODO: Implementar parseResponse para parsear respuestas
  async parseResponse(response: APIResponse): Promise<any> {
    // Verificar status code
    // Parsear JSON
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar GET request
  async get(endpoint: string, options: RequestOptions = {}): Promise<any> {
    // Crear request context
    // Hacer GET request
    // Parsear respuesta
    // Validar schema si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar POST request
  async post(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    // Crear request context
    // Hacer POST request con data
    // Parsear respuesta
    // Validar schema si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar PUT request
  async put(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    // Similar a POST pero con PUT
    // Tu código aquí
  }

  // TODO: Implementar PATCH request
  async patch(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    // Similar a POST pero con PATCH
    // Tu código aquí
  }

  // TODO: Implementar DELETE request
  async delete(endpoint: string, options: RequestOptions = {}): Promise<number> {
    // Hacer DELETE request
    // Retornar status code
    // Tu código aquí
    return 0;
  }

  // TODO: Implementar request genérico
  async request(method: string, endpoint: string, options: RequestOptions & { data?: any } = {}): Promise<any> {
    // Método genérico que soporta cualquier HTTP method
    // Tu código aquí
  }

  // TODO: Implementar validateStatusCode
  validateStatusCode(statusCode: number, expected: number[] = [200, 201, 204]): boolean {
    // Validar que el status code está en la lista de esperados
    // Tu código aquí
    return false;
  }

  // TODO: Implementar getResponseHeaders
  async getResponseHeaders(endpoint: string): Promise<Record<string, string>> {
    // Hacer request y retornar solo los headers
    // Tu código aquí
    return {};
  }

  // TODO: Implementar uploadFile
  async uploadFile(endpoint: string, filePath: string, fieldName: string = 'file'): Promise<any> {
    // Subir archivo usando multipart/form-data
    // Tu código aquí
  }

  // TODO: Implementar downloadFile
  async downloadFile(endpoint: string, savePath: string): Promise<void> {
    // Descargar archivo y guardarlo
    // Tu código aquí
  }
}

export { APIClient, APIClientOptions, RequestOptions, Schema };
