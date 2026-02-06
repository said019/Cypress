/**
 * Ejercicio 03: Hybrid UI+API Testing (JavaScript)
 * 
 * Objetivo: Combinar API y UI testing para escenarios eficientes
 */

const { request } = require('@playwright/test');

class HybridTestHelper {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
    this.apiContext = null;
    this.token = null;
  }

  // TODO: Implementar loginViaAPI para autenticación por API
  async loginViaAPI(credentials) {
    // Hacer POST a /api/login
    // Extraer token de la respuesta
    // Guardar token
    // Retornar token
    // Tu código aquí
  }

  // TODO: Implementar setAuthCookie para inyectar cookies de sesión
  async setAuthCookie(token) {
    // Crear cookie con el token
    // Inyectar cookie en el contexto del browser
    // Tu código aquí
  }

  // TODO: Implementar createProductViaAPI para crear productos por API
  async createProductViaAPI(product) {
    // POST a /api/products
    // Retornar producto creado
    // Tu código aquí
  }

  // TODO: Implementar verifyProductInUI para validar en UI
  async verifyProductInUI(productName) {
    // Navegar a página de productos
    // Buscar producto por nombre
    // Verificar que existe
    // Tu código aquí
  }

  // TODO: Implementar createOrderViaAPI para crear orden por API
  async createOrderViaAPI(order) {
    // POST a /api/orders con productos
    // Retornar orden creada
    // Tu código aquí
  }

  // TODO: Implementar verifyOrderInUI para validar orden en UI
  async verifyOrderInUI(orderId) {
    // Navegar a página de órdenes
    // Buscar orden por ID
    // Verificar detalles
    // Tu código aquí
  }

  // TODO: Implementar deleteOrderViaAPI para limpiar datos
  async deleteOrderViaAPI(orderId) {
    // DELETE a /api/orders/:id
    // Tu código aquí
  }

  // TODO: Implementar setupTestData para preparar datos de prueba
  async setupTestData() {
    // Crear múltiples productos
    // Crear múltiples órdenes
    // Retornar datos creados
    // Tu código aquí
  }

  // TODO: Implementar cleanupTestData para limpiar después de tests
  async cleanupTestData(orderIds) {
    // Eliminar todas las órdenes creadas
    // Tu código aquí
  }

  // TODO: Implementar interceptAPICall para interceptar llamadas
  async interceptAPICall(url, mockResponse) {
    // Usar page.route para interceptar
    // Retornar mock response
    // Tu código aquí
  }

  // TODO: Implementar waitForAPIResponse para esperar respuesta
  async waitForAPIResponse(urlPattern) {
    // Esperar por response que coincida con pattern
    // Retornar response data
    // Tu código aquí
  }

  // TODO: Implementar validateAPIResponse para validar respuesta
  async validateAPIResponse(response, expectedSchema) {
    // Validar que response cumple con schema
    // Tu código aquí
  }

  // TODO: Implementar getSessionCookies para extraer cookies
  async getSessionCookies() {
    // Obtener todas las cookies del contexto
    // Tu código aquí
  }

  // TODO: Implementar restoreSession para restaurar sesión
  async restoreSession(cookies) {
    // Inyectar cookies en el contexto
    // Tu código aquí
  }

  // TODO: Implementar performUIAction para acciones UI con validación API
  async performUIAction(action, apiEndpoint) {
    // Ejecutar acción UI
    // Esperar respuesta API
    // Validar respuesta
    // Retornar datos de API
    // Tu código aquí
  }
}

module.exports = { HybridTestHelper };
