/**
 * Ejercicio 01: NetworkInterceptor Utility (JavaScript)
 * 
 * Objetivo: Crear utilidad para interceptar y controlar tráfico de red
 */

class NetworkInterceptor {
  constructor(page) {
    this.page = page;
    this.interceptedRequests = [];
    this.interceptedResponses = [];
    this.routes = new Map();
  }

  // TODO: Implementar interceptRequest para interceptar requests
  async interceptRequest(urlPattern, handler) {
    // Usar page.route para interceptar
    // Guardar route en Map
    // Aplicar handler al request
    // Tu código aquí
  }

  // TODO: Implementar mockResponse para mockear respuestas
  async mockResponse(urlPattern, mockData, options = {}) {
    // Interceptar request
    // Retornar mock data
    // Aplicar delay si se especifica
    // Aplicar status code personalizado
    // Tu código aquí
  }

  // TODO: Implementar blockRequest para bloquear requests
  async blockRequest(urlPattern) {
    // Interceptar y abortar request
    // Tu código aquí
  }

  // TODO: Implementar modifyResponse para modificar respuestas
  async modifyResponse(urlPattern, modifier) {
    // Interceptar request
    // Obtener response original
    // Aplicar modifier function
    // Retornar response modificada
    // Tu código aquí
  }

  // TODO: Implementar captureRequest para capturar requests
  async captureRequest(urlPattern) {
    // Interceptar y guardar request
    // Continuar con request normal
    // Tu código aquí
  }

  // TODO: Implementar captureResponse para capturar responses
  async captureResponse(urlPattern) {
    // Interceptar y guardar response
    // Continuar con response normal
    // Tu código aquí
  }

  // TODO: Implementar getInterceptedRequests
  getInterceptedRequests(urlPattern = null) {
    // Retornar requests interceptados
    // Filtrar por pattern si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar getInterceptedResponses
  getInterceptedResponses(urlPattern = null) {
    // Retornar responses interceptados
    // Filtrar por pattern si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar waitForRequest para esperar request
  async waitForRequest(urlPattern, options = {}) {
    // Esperar request que coincida con pattern
    // Retornar request
    // Tu código aquí
  }

  // TODO: Implementar waitForResponse para esperar response
  async waitForResponse(urlPattern, options = {}) {
    // Esperar response que coincida con pattern
    // Retornar response
    // Tu código aquí
  }

  // TODO: Implementar clearInterceptions para limpiar
  clearInterceptions() {
    // Limpiar arrays de requests/responses
    // Tu código aquí
  }

  // TODO: Implementar removeRoute para remover interceptor
  async removeRoute(urlPattern) {
    // Remover route del Map
    // Unroute en page
    // Tu código aquí
  }

  // TODO: Implementar removeAllRoutes para remover todos
  async removeAllRoutes() {
    // Remover todos los routes
    // Tu código aquí
  }

  // TODO: Implementar validateRequestPayload
  async validateRequestPayload(urlPattern, validator) {
    // Interceptar request
    // Validar payload con validator function
    // Lanzar error si no válido
    // Tu código aquí
  }

  // TODO: Implementar delayResponse para agregar delay
  async delayResponse(urlPattern, delayMs) {
    // Interceptar request
    // Agregar delay antes de responder
    // Tu código aquí
  }
}

// NetworkMonitor para capturar todo el tráfico
class NetworkMonitor {
  constructor(page) {
    this.page = page;
    this.requests = [];
    this.responses = [];
    this.isMonitoring = false;
  }

  // TODO: Implementar startMonitoring
  async startMonitoring() {
    // Comenzar a capturar requests/responses
    // Tu código aquí
  }

  // TODO: Implementar stopMonitoring
  async stopMonitoring() {
    // Detener captura
    // Tu código aquí
  }

  // TODO: Implementar getRequests
  getRequests(filter = null) {
    // Retornar requests capturados
    // Aplicar filtro si se proporciona
    // Tu código aquí
  }

  // TODO: Implementar getResponses
  getResponses(filter = null) {
    // Retornar responses capturados
    // Tu código aquí
  }

  // TODO: Implementar getFailedRequests
  getFailedRequests() {
    // Retornar solo requests fallidos
    // Tu código aquí
  }

  // TODO: Implementar clear
  clear() {
    // Limpiar arrays
    // Tu código aquí
  }

  // TODO: Implementar getSummary
  getSummary() {
    // Retornar resumen de tráfico
    // Total requests, responses, failed, etc.
    // Tu código aquí
  }
}

module.exports = { NetworkInterceptor, NetworkMonitor };
