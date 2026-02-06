/**
 * Ejercicio 01: BasePage Abstract Class (TypeScript)
 * 
 * Objetivo: Crear una clase base con funcionalidad común para todos los page objects
 */

import { Page, Locator } from '@playwright/test';

interface WaitOptions {
  timeout?: number;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
}

interface ClickOptions extends WaitOptions {
  force?: boolean;
  button?: 'left' | 'right' | 'middle';
}

interface TypeOptions extends WaitOptions {
  clear?: boolean;
  delay?: number;
}

abstract class BasePage {
  protected page: Page;
  protected timeout: number;

  constructor(page: Page) {
    this.page = page;
    this.timeout = 30000;
  }

  // TODO: Implementar waitForElement para esperar elementos
  async waitForElement(selector: string, options: WaitOptions = {}): Promise<Locator> {
    // Esperar que el elemento sea visible
    // Usar timeout configurable
    // Manejar errores con mensajes descriptivos
    // Tu código aquí
    return this.page.locator(selector);
  }

  // TODO: Implementar safeClick para clicks seguros
  async safeClick(selector: string, options: ClickOptions = {}): Promise<void> {
    // Esperar que el elemento sea visible
    // Esperar que sea clickeable
    // Hacer click
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar safeType para escritura segura
  async safeType(selector: string, text: string, options: TypeOptions = {}): Promise<void> {
    // Esperar que el elemento sea visible
    // Limpiar campo si clear=true
    // Escribir texto
    // Manejar errores
    // Tu código aquí
  }

  // TODO: Implementar waitForPageLoad para esperar carga completa
  async waitForPageLoad(): Promise<void> {
    // Esperar networkidle o domcontentloaded
    // Tu código aquí
  }

  // TODO: Implementar navigate para navegación
  async navigate(url: string): Promise<void> {
    // Navegar a URL
    // Esperar carga de página
    // Verificar que la página cargó correctamente
    // Tu código aquí
  }

  // TODO: Implementar isLoaded (método abstracto)
  abstract isLoaded(): Promise<boolean>;

  // TODO: Implementar getTitle para obtener título
  async getTitle(): Promise<string> {
    // Retornar título de la página
    // Tu código aquí
    return '';
  }

  // TODO: Implementar getURL para obtener URL actual
  async getURL(): Promise<string> {
    // Retornar URL actual
    // Tu código aquí
    return '';
  }

  // TODO: Implementar waitForURL para esperar URL específica
  async waitForURL(urlPattern: string | RegExp, options: WaitOptions = {}): Promise<void> {
    // Esperar que la URL coincida con el patrón
    // Tu código aquí
  }

  // TODO: Implementar scrollToElement para scroll
  async scrollToElement(selector: string): Promise<void> {
    // Hacer scroll hasta el elemento
    // Tu código aquí
  }

  // TODO: Implementar isElementVisible para verificar visibilidad
  async isElementVisible(selector: string): Promise<boolean> {
    // Verificar si elemento es visible
    // Retornar boolean
    // Tu código aquí
    return false;
  }

  // TODO: Implementar isElementEnabled para verificar estado
  async isElementEnabled(selector: string): Promise<boolean> {
    // Verificar si elemento está habilitado
    // Retornar boolean
    // Tu código aquí
    return false;
  }

  // TODO: Implementar getText para obtener texto
  async getText(selector: string): Promise<string> {
    // Obtener texto del elemento
    // Tu código aquí
    return '';
  }

  // TODO: Implementar getAttribute para obtener atributos
  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    // Obtener atributo del elemento
    // Tu código aquí
    return null;
  }

  // TODO: Implementar waitAndClick (combinación de wait + click)
  async waitAndClick(selector: string, options: ClickOptions = {}): Promise<void> {
    // Esperar elemento
    // Hacer click seguro
    // Tu código aquí
  }

  // TODO: Implementar waitAndType (combinación de wait + type)
  async waitAndType(selector: string, text: string, options: TypeOptions = {}): Promise<void> {
    // Esperar elemento
    // Escribir texto seguro
    // Tu código aquí
  }

  // TODO: Implementar takeScreenshot para capturas
  async takeScreenshot(name: string): Promise<void> {
    // Tomar screenshot con nombre
    // Tu código aquí
  }

  // TODO: Implementar reload para recargar página
  async reload(): Promise<void> {
    // Recargar página actual
    // Esperar carga completa
    // Tu código aquí
  }

  // TODO: Implementar goBack para navegación atrás
  async goBack(): Promise<void> {
    // Ir a página anterior
    // Esperar carga
    // Tu código aquí
  }

  // TODO: Implementar goForward para navegación adelante
  async goForward(): Promise<void> {
    // Ir a página siguiente
    // Esperar carga
    // Tu código aquí
  }
}

export { BasePage, WaitOptions, ClickOptions, TypeOptions };
