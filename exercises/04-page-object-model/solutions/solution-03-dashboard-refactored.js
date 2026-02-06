/**
 * Solución 03: DashboardPage Refactorizado (JavaScript)
 * 
 * Mejoras aplicadas:
 * - Herencia de BasePage
 * - Uso de HeaderFragment
 * - Implementación de isLoaded()
 * - Métodos de búsqueda mejorados
 * - Fluent interface
 */

const { BasePage } = require('./solution-01-base-page');
const { HeaderFragment } = require('./solution-02-page-fragments');

class DashboardPageRefactored extends BasePage {
  constructor(page) {
    super(page);
    this.header = new HeaderFragment(page);
  }

  // Locators
  get productsContainer() { return '.products'; }
  get productCards() { return '.card-body'; }
  get productTitles() { return '.card-body b'; }
  get addToCartButtons() { return '.card-body button:has-text("Add To Cart")'; }
  get cartIcon() { return '[routerlink*="cart"]'; }
  get cartBadge() { return '.cart-badge'; }

  // Implementación de isLoaded
  async isLoaded() {
    return await this.isElementVisible(this.productsContainer);
  }

  // Búsqueda de productos mejorada
  async getProducts() {
    const products = this.page.locator(this.productCards);
    const count = await products.count();
    const productList = [];
    
    for (let i = 0; i < count; i++) {
      const title = await products.nth(i).locator('b').textContent();
      const price = await products.nth(i).locator('.text-muted').textContent();
      productList.push({ title: title.trim(), price: price.trim() });
    }
    
    return productList;
  }

  // Agregar producto al carrito mejorado
  async addProductToCart(productName) {
    const products = this.page.locator(this.productCards);
    const count = await products.count();
    
    for (let i = 0; i < count; i++) {
      const title = await products.nth(i).locator('b').textContent();
      if (title.trim() === productName) {
        await products.nth(i).locator('button:has-text("Add To Cart")').click();
        await this.page.waitForTimeout(1000); // Esperar animación
        return this; // Fluent interface
      }
    }
    
    throw new Error(`Product "${productName}" not found`);
  }

  // Ir al carrito
  async goToCart() {
    await this.safeClick(this.cartIcon);
    await this.waitForPageLoad();
    return this; // Fluent interface
  }

  // Obtener cantidad de items en carrito
  async getCartCount() {
    const badge = this.page.locator(this.cartBadge);
    if (await badge.isVisible()) {
      const text = await badge.textContent();
      return parseInt(text.trim());
    }
    return 0;
  }

  // Buscar producto
  async searchProduct(productName) {
    const products = await this.getProducts();
    return products.find(p => p.title.includes(productName));
  }

  // Verificar si producto existe
  async hasProduct(productName) {
    const product = await this.searchProduct(productName);
    return product !== undefined;
  }
}

module.exports = { DashboardPageRefactored };
