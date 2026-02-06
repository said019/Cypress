/**
 * Solución 02: API Client Implementation (JavaScript)
 */

const { request } = require('@playwright/test');
const fs = require('fs');

class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = options.headers || {};
    this.timeout = options.timeout || 30000;
    this.token = null;
  }

  setToken(token) {
    this.token = token;
  }

  getHeaders(customHeaders = {}) {
    const authHeaders = this.token ? { 'Authorization': `Bearer ${this.token}` } : {};
    return { ...this.defaultHeaders, ...authHeaders, ...customHeaders };
  }

  validateSchema(data, schema) {
    for (const [key, type] of Object.entries(schema)) {
      if (!(key in data)) return false;
      if (typeof data[key] !== type) return false;
    }
    return true;
  }

  handleError(error, context) {
    return new Error(`[${context}] ${error.message}`);
  }

  async parseResponse(response) {
    if (!response.ok()) {
      throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
    }
    return await response.json();
  }

  async get(endpoint, options = {}) {
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
      throw this.handleError(error, 'GET');
    }
  }

  async post(endpoint, data, options = {}) {
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
      throw this.handleError(error, 'POST');
    }
  }

  async put(endpoint, data, options = {}) {
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
      throw this.handleError(error, 'PUT');
    }
  }

  async patch(endpoint, data, options = {}) {
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
      throw this.handleError(error, 'PATCH');
    }
  }

  async delete(endpoint, options = {}) {
    try {
      const context = await request.newContext();
      const response = await context.delete(`${this.baseURL}${endpoint}`, {
        headers: this.getHeaders(options.headers),
        timeout: this.timeout
      });

      return response.status();
    } catch (error) {
      throw this.handleError(error, 'DELETE');
    }
  }

  async request(method, endpoint, options = {}) {
    const context = await request.newContext();
    const response = await context.fetch(`${this.baseURL}${endpoint}`, {
      method,
      data: options.data,
      headers: this.getHeaders(options.headers),
      timeout: this.timeout
    });

    return await this.parseResponse(response);
  }

  validateStatusCode(statusCode, expected = [200, 201, 204]) {
    return expected.includes(statusCode);
  }

  async getResponseHeaders(endpoint) {
    const context = await request.newContext();
    const response = await context.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders()
    });

    return response.headers();
  }

  async uploadFile(endpoint, filePath, fieldName = 'file') {
    const context = await request.newContext();
    const response = await context.post(`${this.baseURL}${endpoint}`, {
      multipart: {
        [fieldName]: fs.createReadStream(filePath)
      },
      headers: this.getHeaders()
    });

    return await this.parseResponse(response);
  }

  async downloadFile(endpoint, savePath) {
    const context = await request.newContext();
    const response = await context.get(`${this.baseURL}${endpoint}`, {
      headers: this.getHeaders()
    });

    const buffer = await response.body();
    fs.writeFileSync(savePath, buffer);
  }
}

module.exports = { APIClient };
