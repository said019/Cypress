/**
 * Ejercicio 01: Enhanced API Utils (JavaScript)
 * 
 * Objetivo: Mejorar la clase APIUtils con features avanzadas
 */

const { request } = require('@playwright/test');

class EnhancedAPIUtils {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.token = null;
    this.cache = new Map();
    this.interceptors = { request: [], response: [] };
  }

  // Token Management
  setToken(token) {
    this.token = token;
  }

  getAuthHeaders() {
    return this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
  }

  // Request Interceptors
  addRequestInterceptor(interceptor) {
    this.interceptors.request.push(interceptor);
  }

  addResponseInterceptor(interceptor) {
    this.interceptors.response.push(interceptor);
  }

  async applyRequestInterceptors(config) {
    let modifiedConfig = { ...config };
    for (const interceptor of this.interceptors.request) {
      modifiedConfig = await interceptor(modifiedConfig);
    }
    return modifiedConfig;
  }

  async applyResponseInterceptors(response) {
    let modifiedResponse = response;
    for (const interceptor of this.interceptors.response) {
      modifiedResponse = await interceptor(modifiedResponse);
    }
    return modifiedResponse;
  }

  // Retry Logic with Exponential Backoff
  async retryRequest(requestFn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        if (attempt === maxRetries) throw error;
        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  // Response Caching
  getCacheKey(method, url, data) {
    return `${method}:${url}:${JSON.stringify(data || {})}`;
  }

  getCachedResponse(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < 60000) {
      return cached.data;
    }
    return null;
  }

  setCachedResponse(key, data) {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // HTTP Methods
  async get(url, options = {}) {
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

  async post(url, data, options = {}) {
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

  async put(url, data, options = {}) {
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

  async delete(url, options = {}) {
    const context = await request.newContext();
    const config = await this.applyRequestInterceptors({
      ...options,
      headers: { ...this.getAuthHeaders(), ...options.headers }
    });

    const response = await context.delete(`${this.baseURL}${url}`, config);
    return response.status();
  }
}

module.exports = { EnhancedAPIUtils };
