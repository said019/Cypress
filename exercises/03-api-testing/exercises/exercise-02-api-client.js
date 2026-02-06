/**
 * Ejercicio 02: API Client Implementation (JavaScript)
 * 
 * Objetivo: Crear un cliente API completo con validación de schemas y manejo de errores
 */

const { request } = require('@playwright/test');

class APIClient {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = options.headers || {};
    this.timeout = options.timeout || 30000;
    this.token = null;
  }

  // TODO: Implementar setToken para manejar autenticación
  setToken(token) {
    // Tu código aquí
  }

  // TODO: Implementar getHeaders para combinar headers por defecto y auth
  getHeaders(customHeaders = {}) {
    // Tu código aquí
  }

  // TODO: Implementar validateSchema para validar respuestas contra un schema
  validateSchema(data, schema) {
    // Validar que data cumple con schema
    // Schema ejemplo: { id: 'number', name: 'string', email: 'string' }
    // Tu código aquí
  }

  // TODO: Implementar handleError para manejo centralizado de errores
  handleError(error, context) {
    // Crear un error descriptivo con contexto
    // Tu código aquí
  }

  // TODO: Implementar parseResponse para parsear respuestas
  async parseResponse(response) {
    // Verificar status code
    // Parsear JSON
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar GET request
  async get(endpoint, options = {}) {
    // Crear request context
    // Hacer GET request
    // Parsear respuesta
    // Validar schema si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar POST request
  async post(endpoint, data, options = {}) {
    // Crear request context
    // Hacer POST request con data
    // Parsear respuesta
    // Validar schema si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar PUT request
  async put(endpoint, data, options = {}) {
    // Similar a POST pero con PUT
    // Tu código aquí
  }

  // TODO: Implementar PATCH request
  async patch(endpoint, data, options = {}) {
    // Similar a POST pero con PATCH
    // Tu código aquí
  }

  // TODO: Implementar DELETE request
  async delete(endpoint, options = {}) {
    // Hacer DELETE request
    // Retornar status code
    // Tu código aquí
  }

  // TODO: Implementar request genérico
  async request(method, endpoint, options = {}) {
    // Método genérico que soporta cualquier HTTP method
    // Tu código aquí
  }

  // TODO: Implementar validateStatusCode
  validateStatusCode(statusCode, expected = [200, 201, 204]) {
    // Validar que el status code está en la lista de esperados
    // Tu código aquí
  }

  // TODO: Implementar getResponseHeaders
  async getResponseHeaders(endpoint) {
    // Hacer request y retornar solo los headers
    // Tu código aquí
  }

  // TODO: Implementar uploadFile
  async uploadFile(endpoint, filePath, fieldName = 'file') {
    // Subir archivo usando multipart/form-data
    // Tu código aquí
  }

  // TODO: Implementar downloadFile
  async downloadFile(endpoint, savePath) {
    // Descargar archivo y guardarlo
    // Tu código aquí
  }
}

module.exports = { APIClient };
