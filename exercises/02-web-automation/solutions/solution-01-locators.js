/**
 * Ejercicio 01: Estrategias de Locators (JavaScript)
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

const { test, expect } = require('@playwright/test');

/**
 * TODO: Localizar elemento por ID
 * Usa page.locator() con selector CSS #id
 */
async function locateById(page, elementId) {
  // Tu código aquí
  return page.locator(`#${elementId}`);
}

/**
 * TODO: Localizar elemento por clase CSS
 * Usa page.locator() con selector CSS .class
 */
async function locateByClass(page, className) {
  // Tu código aquí
  return page.locator(`.${className}`);
}

/**
 * TODO: Localizar elemento por atributo
 * Usa page.locator() con selector CSS [attribute="value"]
 */
async function locateByAttribute(page, attribute, value) {
  // Tu código aquí
  return page.locator(`[${attribute}="${value}"]`);
}

/**
 * TODO: Localizar elemento por texto visible
 * Usa page.getByText() para encontrar elementos por su texto
 */
async function locateByText(page, text) {
  // Tu código aquí
  return page.getByText(text);
}

/**
 * TODO: Localizar elemento por texto parcial
 * Usa page.getByText() con opción { exact: false }
 */
async function locateByPartialText(page, partialText) {
  // Tu código aquí
  return page.getByText(partialText, { exact: false });
}

/**
 * TODO: Localizar elemento por rol ARIA
 * Usa page.getByRole() para encontrar elementos por su rol
 * Roles comunes: button, link, textbox, heading, etc.
 */
async function locateByRole(page, role, options = {}) {
  // Tu código aquí
  return page.getByRole(role, options);
}

/**
 * TODO: Localizar botón por nombre
 * Usa page.getByRole('button', { name: 'texto' })
 */
async function locateButtonByName(page, buttonName) {
  // Tu código aquí
  return page.getByRole('button', { name: buttonName });
}

/**
 * TODO: Localizar link por texto
 * Usa page.getByRole('link', { name: 'texto' })
 */
async function locateLinkByText(page, linkText) {
  // Tu código aquí
  return page.getByRole('link', { name: linkText });
}

/**
 * TODO: Localizar input por placeholder
 * Usa page.getByPlaceholder()
 */
async function locateByPlaceholder(page, placeholder) {
  // Tu código aquí
  return page.getByPlaceholder(placeholder);
}

/**
 * TODO: Localizar input por label
 * Usa page.getByLabel()
 */
async function locateByLabel(page, labelText) {
  // Tu código aquí
  return page.getByLabel(labelText);
}

/**
 * TODO: Localizar elemento por test-id
 * Usa page.getByTestId() para data-testid attribute
 */
async function locateByTestId(page, testId) {
  // Tu código aquí
  return page.getByTestId(testId);
}

/**
 * TODO: Localizar elemento usando XPath
 * Usa page.locator() con xpath= prefix
 */
async function locateByXPath(page, xpath) {
  // Tu código aquí
  return page.locator(`xpath=${xpath}`);
}

/**
 * TODO: Localizar elemento hijo dentro de un padre
 * Usa locator chaining: parent.locator(child)
 */
async function locateChildElement(page, parentSelector, childSelector) {
  // Tu código aquí
  const parent = page.locator(parentSelector);
  return parent.locator(childSelector);
}

/**
 * TODO: Localizar elemento por posición (nth)
 * Usa .nth(index) para obtener el elemento en posición específica
 */
async function locateByPosition(page, selector, index) {
  // Tu código aquí
  return page.locator(selector).nth(index);
}

/**
 * TODO: Localizar primer elemento que coincida
 * Usa .first() para obtener el primer elemento
 */
async function locateFirst(page, selector) {
  // Tu código aquí
  return page.locator(selector).first();
}

/**
 * TODO: Localizar último elemento que coincida
 * Usa .last() para obtener el último elemento
 */
async function locateLast(page, selector) {
  // Tu código aquí
  return page.locator(selector).last();
}

/**
 * TODO: Filtrar locators por texto
 * Usa .filter({ hasText: 'texto' })
 */
async function filterByText(page, selector, text) {
  // Tu código aquí
  return page.locator(selector).filter({ hasText: text });
}

/**
 * TODO: Filtrar locators por otro locator
 * Usa .filter({ has: otherLocator })
 */
async function filterByLocator(page, selector, hasSelector) {
  // Tu código aquí
  const hasLocator = page.locator(hasSelector);
  return page.locator(selector).filter({ has: hasLocator });
}

/**
 * TODO: Contar elementos que coinciden
 * Usa .count() para obtener el número de elementos
 */
async function countElements(page, selector) {
  // Tu código aquí
  return await page.locator(selector).count();
}

/**
 * TODO: Verificar si elemento existe
 * Usa .count() > 0 para verificar existencia
 */
async function elementExists(page, selector) {
  // Tu código aquí
  const count = await page.locator(selector).count();
  return count > 0;
}

/**
 * TODO: Obtener todos los elementos que coinciden
 * Usa .all() para obtener array de locators
 */
async function getAllElements(page, selector) {
  // Tu código aquí
  return await page.locator(selector).all();
}

/**
 * TODO: Localizar elemento por CSS complejo
 * Combina selectores CSS para casos complejos
 * Ejemplo: 'div.container > ul li:nth-child(2)'
 */
async function locateByComplexCSS(page, cssSelector) {
  // Tu código aquí
  return page.locator(cssSelector);
}

/**
 * TODO: Localizar elemento hermano
 * Usa XPath o CSS para encontrar elementos hermanos
 */
async function locateSibling(page, elementSelector, siblingSelector) {
  // Tu código aquí - usa XPath following-sibling o CSS + combinator
  const element = page.locator(elementSelector);
  return element.locator(`xpath=following-sibling::${siblingSelector}`);
}

/**
 * TODO: Localizar elemento padre
 * Usa XPath parent axis o CSS :has()
 */
async function locateParent(page, childSelector) {
  // Tu código aquí
  return page.locator(childSelector).locator('xpath=..');
}

/**
 * TODO: Localizar elemento por múltiples atributos
 * Combina múltiples selectores de atributos
 */
async function locateByMultipleAttributes(page, attributes) {
  // Tu código aquí
  // attributes es un objeto: { attr1: 'value1', attr2: 'value2' }
  const selectors = Object.entries(attributes)
    .map(([key, value]) => `[${key}="${value}"]`)
    .join('');
  return page.locator(selectors);
}

// Exportar funciones para testing
module.exports = {
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
