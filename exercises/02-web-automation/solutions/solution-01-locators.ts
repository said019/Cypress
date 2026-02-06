/**
 * Ejercicio 01: Estrategias de Locators (TypeScript)
 * 
 * Objetivo: Dominar diferentes estrategias para localizar elementos en la página
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa diferentes estrategias de locators según el caso
 * 3. Sigue las best practices de Playwright
 * 
 * Conceptos a practicar:
 * - CSS Selectors (id, class, attribute)
 * - XPath (relative, axes)
 * - Text-based locators (getByText, getByRole)
 * - Role-based locators (ARIA roles)
 * - Locator chaining y filtering
 */

import { test, expect, Page, Locator } from '@playwright/test';

/**
 * TODO: Localizar elemento por ID
 * Usa page.locator() con selector CSS #id
 */
async function locateById(page: Page, elementId: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(`#${elementId}`);
}

/**
 * TODO: Localizar elemento por clase CSS
 * Usa page.locator() con selector CSS .class
 */
async function locateByClass(page: Page, className: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(`.${className}`);
}

/**
 * TODO: Localizar elemento por atributo
 * Usa page.locator() con selector CSS [attribute="value"]
 */
async function locateByAttribute(page: Page, attribute: string, value: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(`[${attribute}="${value}"]`);
}

/**
 * TODO: Localizar elemento por texto visible
 * Usa page.getByText() para encontrar elementos por su texto
 */
async function locateByText(page: Page, text: string): Promise<Locator> {
  // Tu código aquí
  return page.getByText(text);
}

/**
 * TODO: Localizar elemento por texto parcial
 * Usa page.getByText() con opción { exact: false }
 */
async function locateByPartialText(page: Page, partialText: string): Promise<Locator> {
  // Tu código aquí
  return page.getByText(partialText, { exact: false });
}

/**
 * TODO: Localizar elemento por rol ARIA
 * Usa page.getByRole() para encontrar elementos por su rol
 * Roles comunes: button, link, textbox, heading, etc.
 */
async function locateByRole(page: Page, role: string, options: any = {}): Promise<Locator> {
  // Tu código aquí
  return page.getByRole(role as any, options);
}

/**
 * TODO: Localizar botón por nombre
 * Usa page.getByRole('button', { name: 'texto' })
 */
async function locateButtonByName(page: Page, buttonName: string): Promise<Locator> {
  // Tu código aquí
  return page.getByRole('button', { name: buttonName });
}

/**
 * TODO: Localizar link por texto
 * Usa page.getByRole('link', { name: 'texto' })
 */
async function locateLinkByText(page: Page, linkText: string): Promise<Locator> {
  // Tu código aquí
  return page.getByRole('link', { name: linkText });
}

/**
 * TODO: Localizar input por placeholder
 * Usa page.getByPlaceholder()
 */
async function locateByPlaceholder(page: Page, placeholder: string): Promise<Locator> {
  // Tu código aquí
  return page.getByPlaceholder(placeholder);
}

/**
 * TODO: Localizar input por label
 * Usa page.getByLabel()
 */
async function locateByLabel(page: Page, labelText: string): Promise<Locator> {
  // Tu código aquí
  return page.getByLabel(labelText);
}

/**
 * TODO: Localizar elemento por test-id
 * Usa page.getByTestId() para data-testid attribute
 */
async function locateByTestId(page: Page, testId: string): Promise<Locator> {
  // Tu código aquí
  return page.getByTestId(testId);
}

/**
 * TODO: Localizar elemento usando XPath
 * Usa page.locator() con xpath= prefix
 */
async function locateByXPath(page: Page, xpath: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(`xpath=${xpath}`);
}

/**
 * TODO: Localizar elemento hijo dentro de un padre
 * Usa locator chaining: parent.locator(child)
 */
async function locateChildElement(page: Page, parentSelector: string, childSelector: string): Promise<Locator> {
  // Tu código aquí
  const parent = page.locator(parentSelector);
  return parent.locator(childSelector);
}

/**
 * TODO: Localizar elemento por posición (nth)
 * Usa .nth(index) para obtener el elemento en posición específica
 */
async function locateByPosition(page: Page, selector: string, index: number): Promise<Locator> {
  // Tu código aquí
  return page.locator(selector).nth(index);
}

/**
 * TODO: Localizar primer elemento que coincida
 * Usa .first() para obtener el primer elemento
 */
async function locateFirst(page: Page, selector: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(selector).first();
}

/**
 * TODO: Localizar último elemento que coincida
 * Usa .last() para obtener el último elemento
 */
async function locateLast(page: Page, selector: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(selector).last();
}

/**
 * TODO: Filtrar locators por texto
 * Usa .filter({ hasText: 'texto' })
 */
async function filterByText(page: Page, selector: string, text: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(selector).filter({ hasText: text });
}

/**
 * TODO: Filtrar locators por otro locator
 * Usa .filter({ has: otherLocator })
 */
async function filterByLocator(page: Page, selector: string, hasSelector: string): Promise<Locator> {
  // Tu código aquí
  const hasLocator = page.locator(hasSelector);
  return page.locator(selector).filter({ has: hasLocator });
}

/**
 * TODO: Contar elementos que coinciden
 * Usa .count() para obtener el número de elementos
 */
async function countElements(page: Page, selector: string): Promise<number> {
  // Tu código aquí
  return await page.locator(selector).count();
}

/**
 * TODO: Verificar si elemento existe
 * Usa .count() > 0 para verificar existencia
 */
async function elementExists(page: Page, selector: string): Promise<boolean> {
  // Tu código aquí
  const count = await page.locator(selector).count();
  return count > 0;
}

/**
 * TODO: Obtener todos los elementos que coinciden
 * Usa .all() para obtener array de locators
 */
async function getAllElements(page: Page, selector: string): Promise<Locator[]> {
  // Tu código aquí
  return await page.locator(selector).all();
}

/**
 * TODO: Localizar elemento por CSS complejo
 * Combina selectores CSS para casos complejos
 * Ejemplo: 'div.container > ul li:nth-child(2)'
 */
async function locateByComplexCSS(page: Page, cssSelector: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(cssSelector);
}

/**
 * TODO: Localizar elemento hermano
 * Usa XPath o CSS para encontrar elementos hermanos
 */
async function locateSibling(page: Page, elementSelector: string, siblingSelector: string): Promise<Locator> {
  // Tu código aquí - usa XPath following-sibling o CSS + combinator
  const element = page.locator(elementSelector);
  return element.locator(`xpath=following-sibling::${siblingSelector}`);
}

/**
 * TODO: Localizar elemento padre
 * Usa XPath parent axis o CSS :has()
 */
async function locateParent(page: Page, childSelector: string): Promise<Locator> {
  // Tu código aquí
  return page.locator(childSelector).locator('xpath=..');
}

/**
 * TODO: Localizar elemento por múltiples atributos
 * Combina múltiples selectores de atributos
 */
async function locateByMultipleAttributes(page: Page, attributes: Record<string, string>): Promise<Locator> {
  // Tu código aquí
  // attributes es un objeto: { attr1: 'value1', attr2: 'value2' }
  const selectors = Object.entries(attributes)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join('');
  return page.locator(selectors);
}

// Exportar funciones para testing
export {
  locateById,
  locateByClass,
  locateByAttribute,
  locateByText,
  locateByPartialText,
  locateByRole,
  locateButtonByName,
  locateLinkByText,
  locateByPlaceholder,
  locateByLabel,
  locateByTestId,
  locateByXPath,
  locateChildElement,
  locateByPosition,
  locateFirst,
  locateLast,
  filterByText,
  filterByLocator,
  countElements,
  elementExists,
  getAllElements,
  locateByComplexCSS,
  locateSibling,
  locateParent,
  locateByMultipleAttributes
};

/**
 * Notas sobre Best Practices:
 * 
 * 1. Preferir locators basados en roles y texto:
 *    - page.getByRole('button', { name: 'Submit' })
 *    - page.getByText('Welcome')
 *    - page.getByLabel('Email')
 * 
 * 2. Usar data-testid para elementos sin texto/rol claro:
 *    - page.getByTestId('user-profile')
 * 
 * 3. Evitar selectores frágiles:
 *    - ❌ page.locator('div > div > span:nth-child(3)')
 *    - ✅ page.getByRole('heading', { name: 'Title' })
 * 
 * 4. Usar locator chaining para contexto:
 *    - page.locator('.card').getByRole('button', { name: 'Buy' })
 * 
 * 5. XPath solo cuando sea necesario:
 *    - Para navegación compleja (parent, sibling)
 *    - Cuando CSS no es suficiente
 * 
 * Recursos:
 * - https://playwright.dev/docs/locators
 * - https://playwright.dev/docs/best-practices#use-locators
 */
