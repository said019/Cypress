/**
 * Ejercicio 02: PageFragment Components (JavaScript)
 * 
 * Objetivo: Crear componentes UI reutilizables usando el patrón PageFragment
 */

// TODO: Implementar HeaderFragment
class HeaderFragment {
  constructor(page, containerSelector = 'header') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible() {
    // Verificar si el header es visible
    // Tu código aquí
  }

  // TODO: Implementar waitForVisible
  async waitForVisible() {
    // Esperar que el header sea visible
    // Tu código aquí
  }

  // TODO: Implementar getLogo
  async getLogo() {
    // Retornar locator del logo
    // Tu código aquí
  }

  // TODO: Implementar clickLogo
  async clickLogo() {
    // Hacer click en el logo
    // Tu código aquí
  }

  // TODO: Implementar getNavigationLinks
  async getNavigationLinks() {
    // Obtener todos los links de navegación
    // Retornar array de textos
    // Tu código aquí
  }

  // TODO: Implementar clickNavigationLink
  async clickNavigationLink(linkText) {
    // Hacer click en link de navegación por texto
    // Tu código aquí
  }

  // TODO: Implementar getUserMenu
  async getUserMenu() {
    // Retornar locator del menú de usuario
    // Tu código aquí
  }

  // TODO: Implementar isUserLoggedIn
  async isUserLoggedIn() {
    // Verificar si hay usuario logueado
    // Tu código aquí
  }
}

// TODO: Implementar FooterFragment
class FooterFragment {
  constructor(page, containerSelector = 'footer') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible() {
    // Tu código aquí
  }

  // TODO: Implementar waitForVisible
  async waitForVisible() {
    // Tu código aquí
  }

  // TODO: Implementar getCopyrightText
  async getCopyrightText() {
    // Obtener texto de copyright
    // Tu código aquí
  }

  // TODO: Implementar getSocialLinks
  async getSocialLinks() {
    // Obtener links de redes sociales
    // Tu código aquí
  }

  // TODO: Implementar clickSocialLink
  async clickSocialLink(platform) {
    // Click en link de red social específica
    // Tu código aquí
  }

  // TODO: Implementar getFooterLinks
  async getFooterLinks() {
    // Obtener todos los links del footer
    // Tu código aquí
  }
}

// TODO: Implementar SearchBoxFragment
class SearchBoxFragment {
  constructor(page, containerSelector = '[role="search"]') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible() {
    // Tu código aquí
  }

  // TODO: Implementar waitForVisible
  async waitForVisible() {
    // Tu código aquí
  }

  // TODO: Implementar search
  async search(query) {
    // Escribir en search box y presionar Enter
    // Tu código aquí
  }

  // TODO: Implementar getSearchInput
  async getSearchInput() {
    // Retornar locator del input
    // Tu código aquí
  }

  // TODO: Implementar clearSearch
  async clearSearch() {
    // Limpiar el search box
    // Tu código aquí
  }

  // TODO: Implementar getSearchResults
  async getSearchResults() {
    // Obtener resultados de búsqueda
    // Tu código aquí
  }

  // TODO: Implementar clickSearchResult
  async clickSearchResult(index) {
    // Click en resultado específico
    // Tu código aquí
  }
}

// TODO: Implementar NavigationMenuFragment
class NavigationMenuFragment {
  constructor(page, containerSelector = 'nav') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible() {
    // Tu código aquí
  }

  // TODO: Implementar waitForVisible
  async waitForVisible() {
    // Tu código aquí
  }

  // TODO: Implementar getMenuItems
  async getMenuItems() {
    // Obtener todos los items del menú
    // Tu código aquí
  }

  // TODO: Implementar clickMenuItem
  async clickMenuItem(itemText) {
    // Click en item del menú
    // Tu código aquí
  }

  // TODO: Implementar hoverMenuItem
  async hoverMenuItem(itemText) {
    // Hover sobre item del menú
    // Tu código aquí
  }

  // TODO: Implementar getSubMenuItems
  async getSubMenuItems(parentItem) {
    // Obtener sub-items de un item padre
    // Tu código aquí
  }

  // TODO: Implementar clickSubMenuItem
  async clickSubMenuItem(parentItem, subItem) {
    // Click en sub-item
    // Tu código aquí
  }
}

module.exports = {
  HeaderFragment,
  FooterFragment,
  SearchBoxFragment,
  NavigationMenuFragment
};
