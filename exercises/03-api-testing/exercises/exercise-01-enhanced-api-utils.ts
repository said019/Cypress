/**
 * Ejercicio 01: Enhanced API Utils (TypeScript)
 * 
 * Objetivo: Mejorar la clase APIUtils con features avanzadas
 */

import { request, APIRequestContext } from '@playwright/test';

interface RequestConfig {
  headers?: Record<string, string>;
  data?: any;
  cache?: boolean;
}

interface CachedResponse {
  data: any;
  timestamp: number;
}

type RequestInterceptor = (config: RequestConfig) => Promise<RequestConfig>;
type ResponseInterceptor = (response: any) => Promise<any>;

class EnhancedAPIUtils {
  private baseURL: string;
  private token: string | null = null;
  private cache: Map<string, CachedResponse> = new Map();
  private interceptors: {
    request: RequestInterceptor[];
    response: ResponseInterceptor[];
  } = { request: [], response: [] };

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  // Token Management
  setToken(token: string): void {
    this.token = token;
  }

  getAuthHeaders(): Record<string, string> {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  // Request Interceptors
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.interceptors.response.push(interceptor);
  }

  async applyRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    let modifiedConfig = { ...config };
    for (const interceptor of this.interceptors.request) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  async applyResponseInterceptors(response: any): Promise<any> {
    let modifiedResponse = response;
    for (const interceptor of this.interceptors.response) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  // Retry Logic with Exponential Backoff
  async retryRequest<T>(requestFn: () => Promise<T>, maxRetries: number = 3, baseDelay: number = 1000): Promise<T> {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    throw new Error('Max retries exceeded');
  }

  // Response Caching
  getCacheKey(method: string, url: string, data?: any): string {
    return `${method}:${url}:${JSON.stringify(data || {})}`;
  }

  getCachedResponse(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < 60000) {
      return cached.data;
    }
    return null;
  }

  setCachedResponse(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // HTTP Methods
  async get(url: string, options: RequestConfig = {}): Promise<any> {
    const cacheKey = this.getCacheKey('GET', url);
    const cached = this.getCachedResponse(cacheKey);
    if (cached && options.cache !== false) return cached;

    const context = await request.newContext();
    const config = await this.applyRequestInterceptors({
      ...options,
      headers: { ...this.getAuthHeaders(), ...options.headers }
    });

    const response = await this.retryRequest(async () => {
      return await context.get(`${this.baseURL}${url}`, config);
    });

    const data = await response.json();
    this.setCachedResponse(cacheKey, data);
    return await this.applyResponseInterceptors(data);
  }

  async post(url: string, data: any, options: RequestConfig = {}): Promise<any> {
    const context = await request.newContext();
    const config = await this.applyRequestInterceptors({
      data,
      ...options,
      headers: { ...this.getAuthHeaders(), ...options.headers }
    });

    const response = await context.post(`${this.baseURL}${url}`, config);
    const responseData = await response.json();
    return await this.applyResponseInterceptors(responseData);
  }

  async put(url: string, data: any, options: RequestConfig = {}): Promise<any> {
    const context = await request.newContext();
    const config = await this.applyRequestInterceptors({
      data,
      ...options,
      headers: { ...this.getAuthHeaders(), ...options.headers }
    });

    const response = await context.put(`${this.baseURL}${url}`, config);
    const responseData = await response.json();
    return await this.applyResponseInterceptors(responseData);
  }

  async delete(url: string, options: RequestConfig = {}): Promise<number> {
    const context = await request.newContext();
    const config = await this.applyRequestInterceptors({
      ...options,
      headers: { ...this.getAuthHeaders(), ...options.headers }
    });

    const response = await context.delete(`${this.baseURL}${url}`, config);
    return response.status();
  }
}

export { EnhancedAPIUtils, RequestConfig, RequestInterceptor, ResponseInterceptor };
