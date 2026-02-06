/**
 * Ejercicio 02: PageFragment Components (TypeScript)
 * 
 * Objetivo: Crear componentes UI reutilizables usando el patrón PageFragment
 */

import { Page, Locator } from '@playwright/test';

// Interface base para todos los fragments
interface IPageFragment {
  isVisible(): Promise<boolean>;
  waitForVisible(): Promise<void>;
}

// TODO: Implementar HeaderFragment
class HeaderFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'header') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible(): Promise<boolean> {
    // Verificar si el header es visible
    // Tu código aquí
    return false;
  }

  // TODO: Implementar waitForVisible
  async waitForVisible(): Promise<void> {
    // Esperar que el header sea visible
    // Tu código aquí
  }

  // TODO: Implementar getLogo
  async getLogo(): Promise<Locator> {
    // Retornar locator del logo
    // Tu código aquí
    return this.page.locator('');
  }

  // TODO: Implementar clickLogo
  async clickLogo(): Promise<void> {
    // Hacer click en el logo
    // Tu código aquí
  }

  // TODO: Implementar getNavigationLinks
  async getNavigationLinks(): Promise<string[]> {
    // Obtener todos los links de navegación
    // Retornar array de textos
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clickNavigationLink
  async clickNavigationLink(linkText: string): Promise<void> {
    // Hacer click en link de navegación por texto
    // Tu código aquí
  }

  // TODO: Implementar getUserMenu
  async getUserMenu(): Promise<Locator> {
    // Retornar locator del menú de usuario
    // Tu código aquí
    return this.page.locator('');
  }

  // TODO: Implementar isUserLoggedIn
  async isUserLoggedIn(): Promise<boolean> {
    // Verificar si hay usuario logueado
    // Tu código aquí
    return false;
  }
}

// TODO: Implementar FooterFragment
class FooterFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'footer') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible(): Promise<boolean> {
    // Tu código aquí
    return false;
  }

  // TODO: Implementar waitForVisible
  async waitForVisible(): Promise<void> {
    // Tu código aquí
  }

  // TODO: Implementar getCopyrightText
  async getCopyrightText(): Promise<string> {
    // Obtener texto de copyright
    // Tu código aquí
    return '';
  }

  // TODO: Implementar getSocialLinks
  async getSocialLinks(): Promise<string[]> {
    // Obtener links de redes sociales
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clickSocialLink
  async clickSocialLink(platform: string): Promise<void> {
    // Click en link de red social específica
    // Tu código aquí
  }

  // TODO: Implementar getFooterLinks
  async getFooterLinks(): Promise<string[]> {
    // Obtener todos los links del footer
    // Tu código aquí
    return [];
  }
}

// TODO: Implementar SearchBoxFragment
class SearchBoxFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = '[role="search"]') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible(): Promise<boolean> {
    // Tu código aquí
    return false;
  }

  // TODO: Implementar waitForVisible
  async waitForVisible(): Promise<void> {
    // Tu código aquí
  }

  // TODO: Implementar search
  async search(query: string): Promise<void> {
    // Escribir en search box y presionar Enter
    // Tu código aquí
  }

  // TODO: Implementar getSearchInput
  async getSearchInput(): Promise<Locator> {
    // Retornar locator del input
    // Tu código aquí
    return this.page.locator('');
  }

  // TODO: Implementar clearSearch
  async clearSearch(): Promise<void> {
    // Limpiar el search box
    // Tu código aquí
  }

  // TODO: Implementar getSearchResults
  async getSearchResults(): Promise<string[]> {
    // Obtener resultados de búsqueda
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clickSearchResult
  async clickSearchResult(index: number): Promise<void> {
    // Click en resultado específico
    // Tu código aquí
  }
}

// TODO: Implementar NavigationMenuFragment
class NavigationMenuFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'nav') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  // TODO: Implementar isVisible
  async isVisible(): Promise<boolean> {
    // Tu código aquí
    return false;
  }

  // TODO: Implementar waitForVisible
  async waitForVisible(): Promise<void> {
    // Tu código aquí
  }

  // TODO: Implementar getMenuItems
  async getMenuItems(): Promise<string[]> {
    // Obtener todos los items del menú
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clickMenuItem
  async clickMenuItem(itemText: string): Promise<void> {
    // Click en item del menú
    // Tu código aquí
  }

  // TODO: Implementar hoverMenuItem
  async hoverMenuItem(itemText: string): Promise<void> {
    // Hover sobre item del menú
    // Tu código aquí
  }

  // TODO: Implementar getSubMenuItems
  async getSubMenuItems(parentItem: string): Promise<string[]> {
    // Obtener sub-items de un item padre
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clickSubMenuItem
  async clickSubMenuItem(parentItem: string, subItem: string): Promise<void> {
    // Click en sub-item
    // Tu código aquí
  }
}

export {
  IPageFragment,
  HeaderFragment,
  FooterFragment,
  SearchBoxFragment,
  NavigationMenuFragment
};
