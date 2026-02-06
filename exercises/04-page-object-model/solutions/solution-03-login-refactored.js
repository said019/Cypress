/**
 * Solución 03: LoginPage Refactorizado (JavaScript)
 * 
 * Mejoras aplicadas:
 * - Herencia de BasePage
 * - Uso de safeClick y safeType
 * - Implementación de isLoaded()
 * - Fluent interface
 * - Getters para locators
 */

const { BasePage } = require('./solution-01-base-page');

class LoginPageRefactored extends BasePage {
  constructor(page) {
    super(page);
    this.url = "https://rahulshettyacademy.com/client";
  }

  // Locators como getters
  get usernameInput() { return '#userEmail'; }
  get passwordInput() { return '#userPassword'; }
  get loginButton() { return "[value='Login']"; }
  get cardTitle() { return ".card-body b"; }
  get errorMessage() { return '.toast-error'; }

  // Implementación de isLoaded
  async isLoaded() {
    return await this.isElementVisible(this.loginButton);
  }

  // Método de login mejorado con fluent interface
  async login(username, password) {
    await this.safeType(this.usernameInput, username);
    await this.safeType(this.passwordInput, password);
    await this.safeClick(this.loginButton);
    await this.waitForPageLoad();
    return this; // Fluent interface
  }

  // Navegación mejorada
  async goTo() {
    await this.navigate(this.url);
    await this.waitForElement(this.loginButton);
    return this; // Fluent interface
  }

  // Validaciones mejoradas
  async getCardTitle() {
    return await this.getText(this.cardTitle);
  }

  async hasErrorMessage() {
    return await this.isElementVisible(this.errorMessage);
  }

  async getErrorMessage() {
    if (await this.hasErrorMessage()) {
      return await this.getText(this.errorMessage);
    }
    return null;
  }

  // Método helper para login completo
  async performLogin(username, password) {
    return await this.goTo().then(() => this.login(username, password));
  }
}

module.exports = { LoginPageRefactored };
