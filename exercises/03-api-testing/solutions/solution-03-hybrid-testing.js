/**
 * Solución 03: Hybrid UI+API Testing (JavaScript)
 */

const { request } = require('@playwright/test');

class HybridTestHelper {
  constructor(page, baseURL) {
    this.page = page;
    this.baseURL = baseURL;
    this.apiContext = null;
    this.token = null;
  }

  async loginViaAPI(credentials) {
    this.apiContext = await request.newContext();
    const response = await this.apiContext.post(`${this.baseURL}/api/login`, {
      data: credentials
    });
    const data = await response.json();
    this.token = data.token;
    return this.token;
  }

  async setAuthCookie(token) {
    await this.page.context().addCookies([{
      name: 'auth_token',
      value: token,
      domain: new URL(this.baseURL).hostname,
      path: '/'
    }]);
  }

  async createProductViaAPI(product) {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    const response = await this.apiContext.post(`${this.baseURL}/api/products`, {
      data: product,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return await response.json();
  }

  async verifyProductInUI(productName) {
    await this.page.goto(`${this.baseURL}/products`);
    const product = this.page.locator(`text=${productName}`);
    return await product.isVisible();
  }

  async createOrderViaAPI(order) {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    const response = await this.apiContext.post(`${this.baseURL}/api/orders`, {
      data: order,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return await response.json();
  }

  async verifyOrderInUI(orderId) {
    await this.page.goto(`${this.baseURL}/orders`);
    const order = this.page.locator(`[data-order-id="${orderId}"]`);
    return await order.isVisible();
  }

  async deleteOrderViaAPI(orderId) {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    await this.apiContext.delete(`${this.baseURL}/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  async setupTestData() {
    const products = [];
    const orders = [];

    for (let i = 1; i <= 3; i++) {
      const product = await this.createProductViaAPI({
        name: `Test Product ${i}`,
        price: i * 10
      });
      products.push(product);
    }

    for (let i = 1; i <= 2; i++) {
      const order = await this.createOrderViaAPI({
        products: [products[0]],
        total: products[0].price
      });
      orders.push(order);
    }

    return { products, orders };
  }

  async cleanupTestData(orderIds) {
    for (const orderId of orderIds) {
      await this.deleteOrderViaAPI(orderId);
    }
  }

  async interceptAPICall(url, mockResponse) {
    await this.page.route(url, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse)
      });
    });
  }

  async waitForAPIResponse(urlPattern) {
    const response = await this.page.waitForResponse(
      response => response.url().includes(urlPattern) && response.status() === 200
    );
    return await response.json();
  }

  async validateAPIResponse(response, expectedSchema) {
    for (const [key, type] of Object.entries(expectedSchema)) {
      if (!(key in response)) return false;
      if (typeof response[key] !== type) return false;
    }
    return true;
  }

  async getSessionCookies() {
    return await this.page.context().cookies();
  }

  async restoreSession(cookies) {
    await this.page.context().addCookies(cookies);
  }

  async performUIAction(action, apiEndpoint) {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes(apiEndpoint)
    );
    
    await action();
    
    const response = await responsePromise;
    return await response.json();
  }
}

module.exports = { HybridTestHelper };
