/**
 * Ejercicio 01: BasePage Abstract Class (JavaScript)
 * 
 * Objetivo: Crear una clase base con funcionalidad común para todos los page objects
 */

class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
  }

  // TODO: Implementar waitForElement para esperar elementos
  async waitForElement(selector, options = {}) {
    // Esperar que el elemento sea visible
    // Usar timeout configurable
    // Manejar errores con mensajes descriptivos
    // Tu código aquí
  }

  // TODO: Implementar safeClick para clicks seguros
  async safeClick(selector, options = {}) {
    // Esperar que el elemento sea visible
    // Esperar que sea clickeable
    // Hacer click
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar safeType para escritura segura
  async safeType(selector, text, options = {}) {
    // Esperar que el elemento sea visible
    // Limpiar campo si clear=true
    // Escribir texto
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar waitForPageLoad para esperar carga completa
  async waitForPageLoad() {
    // Esperar networkidle o domcontentloaded
    // Tu código aquí
  }

  // TODO: Implementar navigate para navegación
  async navigate(url) {
    // Navegar a URL
    // Esperar carga de página
    // Verificar que la página cargó correctamente
    // Tu código aquí
  }

  // TODO: Implementar isLoaded (método abstracto)
  async isLoaded() {
    // Este método debe ser implementado por clases hijas
    // Verificar que elementos clave de la página están presentes
    throw new Error('isLoaded() must be implemented by subclass');
  }

  // TODO: Implementar getTitle para obtener título
  async getTitle() {
    // Retornar título de la página
    // Tu código aquí
  }

  // TODO: Implementar getURL para obtener URL actual
  async getURL() {
    // Retornar URL actual
    // Tu código aquí
  }

  // TODO: Implementar waitForURL para esperar URL específica
  async waitForURL(urlPattern, options = {}) {
    // Esperar que la URL coincida con el patrón
    // Tu código aquí
  }

  // TODO: Implementar scrollToElement para scroll
  async scrollToElement(selector) {
    // Hacer scroll hasta el elemento
    // Tu código aquí
  }

  // TODO: Implementar isElementVisible para verificar visibilidad
  async isElementVisible(selector) {
    // Verificar si elemento es visible
    // Retornar boolean
    // Tu código aquí
  }

  // TODO: Implementar isElementEnabled para verificar estado
  async isElementEnabled(selector) {
    // Verificar si elemento está habilitado
    // Retornar boolean
    // Tu código aquí
  }

  // TODO: Implementar getText para obtener texto
  async getText(selector) {
    // Obtener texto del elemento
    // Tu código aquí
  }

  // TODO: Implementar getAttribute para obtener atributos
  async getAttribute(selector, attribute) {
    // Obtener atributo del elemento
    // Tu código aquí
  }

  // TODO: Implementar waitAndClick (combinación de wait + click)
  async waitAndClick(selector, options = {}) {
    // Esperar elemento
    // Hacer click seguro
    // Tu código aquí
  }

  // TODO: Implementar waitAndType (combinación de wait + type)
  async waitAndType(selector, text, options = {}) {
    // Esperar elemento
    // Escribir texto seguro
    // Tu código aquí
  }

  // TODO: Implementar takeScreenshot para capturas
  async takeScreenshot(name) {
    // Tomar screenshot con nombre
    // Tu código aquí
  }

  // TODO: Implementar reload para recargar página
  async reload() {
    // Recargar página actual
    // Esperar carga completa
    // Tu código aquí
  }

  // TODO: Implementar goBack para navegación atrás
  async goBack() {
    // Ir a página anterior
    // Esperar carga
    // Tu código aquí
  }

  // TODO: Implementar goForward para navegación adelante
  async goForward() {
    // Ir a página siguiente
    // Esperar carga
    // Tu código aquí
  }
}

module.exports = { BasePage };
