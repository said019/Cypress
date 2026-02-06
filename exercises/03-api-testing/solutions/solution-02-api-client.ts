/**
 * Solución 02: API Client Implementation (TypeScript)
 */

import { request, APIRequestContext, APIResponse } from '@playwright/test';
import * as fs from 'fs';

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

  setToken(token: string): void {
    this.token = token;
  }

  getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const authHeaders = this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    return { ...this.defaultHeaders, ...authHeaders, ...customHeaders };
  }

  validateSchema(data: any, schema: Schema): boolean {
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in data)) return false;
      if (typeof data[key] !== type) return false;
    }
    return true;
  }

  handleError(error: Error, context: string): Error {
    return new Error(`[${context}] ${error.message}`);
  }

  async parseResponse(response: APIResponse): Promise<any> {
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
    }
    return await response.json();
  }

  async get(endpoint: string, options: RequestOptions = {}): Promise<any> {
    try {
      const context = await request.newContext();
      const response = await context.get(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      if (options.expectedStatus && !this.validateStatusCode(response.status(), options.expectedStatus)) {
        throw new Error(`Unexpected status: ${response.status()}`);
      }

      const data = await this.parseResponse(response);
      
      if (options.schema && !this.validateSchema(data, options.schema)) {
        throw new Error('Response does not match schema');
      }

      return data;
    } catch (error) {
      throw this.handleError(error as Error, 'GET');
    }
  }

  async post(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    try {
      const context = await request.newContext();
      const response = await context.post(`${this.baseURL}${endpoint}`, {
        data,
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      if (options.expectedStatus && !this.validateStatusCode(response.status(), options.expectedStatus)) {
        throw new Error(`Unexpected status: ${response.status()}`);
      }

      const responseData = await this.parseResponse(response);
      
      if (options.schema && !this.validateSchema(responseData, options.schema)) {
        throw new Error('Response does not match schema');
      }

      return responseData;
    } catch (error) {
      throw this.handleError(error as Error, 'POST');
    }
  }

  async put(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    try {
      const context = await request.newContext();
      const response = await context.put(`${this.baseURL}${endpoint}`, {
        data,
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      const responseData = await this.parseResponse(response);
      
      if (options.schema && !this.validateSchema(responseData, options.schema)) {
        throw new Error('Response does not match schema');
      }

      return responseData;
    } catch (error) {
      throw this.handleError(error as Error, 'PUT');
    }
  }

  async patch(endpoint: string, data: any, options: RequestOptions = {}): Promise<any> {
    try {
      const context = await request.newContext();
      const response = await context.patch(`${this.baseURL}${endpoint}`, {
        data,
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      const responseData = await this.parseResponse(response);
      
      if (options.schema && !this.validateSchema(responseData, options.schema)) {
        throw new Error('Response does not match schema');
      }

      return responseData;
    } catch (error) {
      throw this.handleError(error as Error, 'PATCH');
    }
  }

  async delete(endpoint: string, options: RequestOptions = {}): Promise<number> {
    try {
      const context = await request.newContext();
      const response = await context.delete(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      return response.status();
    } catch (error) {
      throw this.handleError(error as Error, 'DELETE');
    }
  }

  async request(method: string, endpoint: string, options: RequestOptions & { data?: any } = {}): Promise<any> {
    const context = await request.newContext();
    const response = await context.fetch(`${this.baseURL}${endpoint}`, {
      method,
      data: options.data,
      headers: this.getHeaders(options.headers),
      timeout: this.timeout
    });

    return await this.parseResponse(response);
  }

  validateStatusCode(statusCode: number, expected: number[] = [200, 201, 204]): boolean {
    return expected.includes(statusCode);
  }

  async getResponseHeaders(endpoint: string): Promise<Record<string, string>> {
    const context = await request.newContext();
    const response = await context.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders()
    });

    return response.headers();
  }

  async uploadFile(endpoint: string, filePath: string, fieldName: string = 'file'): Promise<any> {
    const context = await request.newContext();
    const response = await context.post(`${this.baseURL}${endpoint}`, {
      multipart: {
        [fieldName]: fs.createReadStream(filePath)
      },
      headers: this.getHeaders()
    });

    return await this.parseResponse(response);
  }

  async downloadFile(endpoint: string, savePath: string): Promise<void> {
    const context = await request.newContext();
    const response = await context.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders()
    });

    const buffer = await response.body();
    fs.writeFileSync(savePath, buffer);
  }
}

export { APIClient, APIClientOptions, RequestOptions, Schema };
