/**
 * Ejercicio 02: Manejo de Elementos Dinámicos (JavaScript)
 * 
 * Objetivo: Trabajar con elementos que cambian dinámicamente en la página
 * 
 * Instrucciones:
 * 1. Completa las funciones marcadas con TODO
 * 2. Usa estrategias de espera apropiadas
 * 3. Maneja diferentes tipos de elementos dinámicos
 * 
 * Conceptos a practicar:
 * - Dropdowns (select nativos y custom)
 * - Date pickers y calendarios
 * - Checkboxes y radio buttons
 * - File uploads
 * - Estrategias de espera (waitForSelector, waitForLoadState)
 */

const { test, expect } = require('@playwright/test');

/**
 * TODO: Seleccionar opción en dropdown nativo por valor
 * Usa selectOption() con value
 */
async function selectDropdownByValue(page, selector, value) {
  // Tu código aquí
  await page.locator(selector).selectOption(value);
}

/**
 * TODO: Seleccionar opción en dropdown nativo por texto visible
 * Usa selectOption() con label
 */
async function selectDropdownByLabel(page, selector, label) {
  // Tu código aquí
  await page.locator(selector).selectOption({ label: label });
}

/**
 * TODO: Seleccionar opción en dropdown nativo por índice
 * Usa selectOption() con index
 */
async function selectDropdownByIndex(page, selector, index) {
  // Tu código aquí
  await page.locator(selector).selectOption({ index: index });
}

/**
 * TODO: Obtener valor seleccionado en dropdown
 * Usa inputValue() para obtener el valor actual
 */
async function getSelectedDropdownValue(page, selector) {
  // Tu código aquí
  return await page.locator(selector).inputValue();
}

/**
 * TODO: Seleccionar opción en dropdown custom (no-select)
 * 1. Click en el dropdown para abrirlo
 * 2. Click en la opción deseada
 */
async function selectCustomDropdown(page, dropdownSelector, optionText) {
  // Tu código aquí
  await page.locator(dropdownSelector).click();
  await page.getByText(optionText, { exact: true }).click();
}

/**
 * TODO: Marcar checkbox
 * Usa check() para marcar
 */
async function checkCheckbox(page, selector) {
  // Tu código aquí
  await page.locator(selector).check();
}

/**
 * TODO: Desmarcar checkbox
 * Usa uncheck() para desmarcar
 */
async function uncheckCheckbox(page, selector) {
  // Tu código aquí
  await page.locator(selector).uncheck();
}

/**
 * TODO: Verificar si checkbox está marcado
 * Usa isChecked() para verificar estado
 */
async function isCheckboxChecked(page, selector) {
  // Tu código aquí
  return await page.locator(selector).isChecked();
}

/**
 * TODO: Toggle checkbox (cambiar estado)
 * Si está marcado, desmarca. Si está desmarcado, marca.
 */
async function toggleCheckbox(page, selector) {
  // Tu código aquí
  const isChecked = await page.locator(selector).isChecked();
  if (isChecked) {
    await page.locator(selector).uncheck();
  } else {
    await page.locator(selector).check();
  }
}

/**
 * TODO: Seleccionar radio button
 * Usa check() para seleccionar
 */
async function selectRadioButton(page, selector) {
  // Tu código aquí
  await page.locator(selector).check();
}

/**
 * TODO: Obtener radio button seleccionado en un grupo
 * Busca el radio button que está checked en un grupo
 */
async function getSelectedRadioButton(page, groupName) {
  // Tu código aquí
  const radios = page.locator(`input[name="${groupName}"]`);
  const count = await radios.count();
  
  for (let i = 0; i < count; i++) {
    const radio = radios.nth(i);
    if (await radio.isChecked()) {
      return await radio.getAttribute('value');
    }
  }
  return null;
}

/**
 * TODO: Subir archivo único
 * Usa setInputFiles() con la ruta del archivo
 */
async function uploadSingleFile(page, selector, filePath) {
  // Tu código aquí
  await page.locator(selector).setInputFiles(filePath);
}

/**
 * TODO: Subir múltiples archivos
 * Usa setInputFiles() con array de rutas
 */
async function uploadMultipleFiles(page, selector, filePaths) {
  // Tu código aquí
  await page.locator(selector).setInputFiles(filePaths);
}

/**
 * TODO: Limpiar archivo subido
 * Usa setInputFiles([]) para limpiar
 */
async function clearUploadedFile(page, selector) {
  // Tu código aquí
  await page.locator(selector).setInputFiles([]);
}

/**
 * TODO: Esperar a que elemento sea visible
 * Usa waitFor({ state: 'visible' })
 */
async function waitForElementVisible(page, selector, timeout = 30000) {
  // Tu código aquí
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

/**
 * TODO: Esperar a que elemento sea oculto
 * Usa waitFor({ state: 'hidden' })
 */
async function waitForElementHidden(page, selector, timeout = 30000) {
  // Tu código aquí
  await page.locator(selector).waitFor({ state: 'hidden', timeout });
}

/**
 * TODO: Esperar a que elemento esté adjunto al DOM
 * Usa waitFor({ state: 'attached' })
 */
async function waitForElementAttached(page, selector, timeout = 30000) {
  // Tu código aquí
  await page.locator(selector).waitFor({ state: 'attached', timeout });
}

/**
 * TODO: Esperar a que elemento sea removido del DOM
 * Usa waitFor({ state: 'detached' })
 */
async function waitForElementDetached(page, selector, timeout = 30000) {
  // Tu código aquí
  await page.locator(selector).waitFor({ state: 'detached', timeout });
}

/**
 * TODO: Esperar a que la página termine de cargar
 * Usa waitForLoadState('load')
 */
async function waitForPageLoad(page) {
  // Tu código aquí
  await page.waitForLoadState('load');
}

/**
 * TODO: Esperar a que la red esté idle
 * Usa waitForLoadState('networkidle')
 */
async function waitForNetworkIdle(page) {
  // Tu código aquí
  await page.waitForLoadState('networkidle');
}

/**
 * TODO: Esperar a que el DOM esté completamente cargado
 * Usa waitForLoadState('domcontentloaded')
 */
async function waitForDOMContentLoaded(page) {
  // Tu código aquí
  await page.waitForLoadState('domcontentloaded');
}

/**
 * TODO: Esperar por timeout específico
 * Usa waitForTimeout() - usar solo cuando sea absolutamente necesario
 */
async function waitForTimeout(page, milliseconds) {
  // Tu código aquí
  await page.waitForTimeout(milliseconds);
}

/**
 * TODO: Esperar a que una función retorne true
 * Usa waitForFunction() para esperar condición custom
 */
async function waitForCondition(page, conditionFn, timeout = 30000) {
  // Tu código aquí
  await page.waitForFunction(conditionFn, { timeout });
}

/**
 * TODO: Seleccionar fecha en date picker nativo
 * Usa fill() con formato YYYY-MM-DD
 */
async function selectDateNative(page, selector, date) {
  // Tu código aquí - date debe estar en formato 'YYYY-MM-DD'
  await page.locator(selector).fill(date);
}

/**
 * TODO: Seleccionar fecha en date picker custom
 * Navega por el calendario y selecciona la fecha
 */
async function selectDateCustom(page, day, month, year) {
  // Tu código aquí - implementación depende del date picker específico
  // Este es un ejemplo genérico
  
  // 1. Abrir el date picker
  await page.locator('.date-picker-trigger').click();
  
  // 2. Seleccionar año si es necesario
  if (year) {
    await page.locator('.year-selector').selectOption(year.toString());
  }
  
  // 3. Seleccionar mes si es necesario
  if (month) {
    await page.locator('.month-selector').selectOption(month.toString());
  }
  
  // 4. Seleccionar día
  await page.locator(`.day[data-day="${day}"]`).click();
}

/**
 * TODO: Verificar si elemento está habilitado
 * Usa isEnabled()
 */
async function isElementEnabled(page, selector) {
  // Tu código aquí
  return await page.locator(selector).isEnabled();
}

/**
 * TODO: Verificar si elemento está deshabilitado
 * Usa isDisabled()
 */
async function isElementDisabled(page, selector) {
  // Tu código aquí
  return await page.locator(selector).isDisabled();
}

/**
 * TODO: Verificar si elemento es editable
 * Usa isEditable()
 */
async function isElementEditable(page, selector) {
  // Tu código aquí
  return await page.locator(selector).isEditable();
}

/**
 * TODO: Esperar y seleccionar opción en dropdown que carga dinámicamente
 * 1. Esperar a que el dropdown esté visible
 * 2. Esperar a que las opciones se carguen
 * 3. Seleccionar la opción
 */
async function selectDynamicDropdown(page, dropdownSelector, optionValue) {
  // Tu código aquí
  await page.locator(dropdownSelector).waitFor({ state: 'visible' });
  await page.waitForTimeout(500); // Esperar a que las opciones se carguen
  await page.locator(dropdownSelector).selectOption(optionValue);
}

// Exportar funciones para testing
module.exports = {
  selectDropdownByValue,
  selectDropdownByLabel,
  selectDropdownByIndex,
  getSelectedDropdownValue,
  selectCustomDropdown,
  checkCheckbox,
  uncheckCheckbox,
  isCheckboxChecked,
  toggleCheckbox,
  selectRadioButton,
  getSelectedRadioButton,
  uploadSingleFile,
  uploadMultipleFiles,
  clearUploadedFile,
  waitForElementVisible,
  waitForElementHidden,
  waitForElementAttached,
  waitForElementDetached,
  waitForPageLoad,
  waitForNetworkIdle,
  waitForDOMContentLoaded,
  waitForTimeout,
  waitForCondition,
  selectDateNative,
  selectDateCustom,
  isElementEnabled,
  isElementDisabled,
  isElementEditable,
  selectDynamicDropdown
};

/**
 * Notas sobre Elementos Dinámicos:
 * 
 * 1. Auto-waiting de Playwright:
 *    - Playwright espera automáticamente a que los elementos sean actionable
 *    - No necesitas waitForTimeout en la mayoría de casos
 * 
 * 2. Estrategias de espera:
 *    - waitFor({ state: 'visible' }) - Esperar visibilidad
 *    - waitForLoadState('networkidle') - Esperar red idle
 *    - waitForFunction() - Condiciones custom
 * 
 * 3. Dropdowns:
 *    - Nativos: usa selectOption()
 *    - Custom: usa click() + getByText()
 * 
 * 4. File uploads:
 *    - setInputFiles() funciona con input[type="file"]
 *    - Puede aceptar rutas absolutas o relativas
 * 
 * 5. Checkboxes y Radio buttons:
 *    - check() / uncheck() para checkboxes
 *    - check() para radio buttons
 *    - isChecked() para verificar estado
 * 
 * Recursos:
 * - https://playwright.dev/docs/input
 * - https://playwright.dev/docs/actionability
 * - https://playwright.dev/docs/api/class-locator#locator-wait-for
 */
