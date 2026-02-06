/**
 * Solución 03: Hybrid UI+API Testing (TypeScript)
 */

import { Page, APIRequestContext, request, Cookie } from '@playwright/test';

interface LoginCredentials {
  username: string;
  password: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
}

interface Order {
  id: string;
  products: Product[];
  total: number;
}

class HybridTestHelper {
  private page: Page;
  private apiContext: APIRequestContext | null = null;
  private baseURL: string;
  private token: string | null = null;

  constructor(page: Page, baseURL: string) {
    this.page = page;
    this.baseURL = baseURL;
  }

  async loginViaAPI(credentials: LoginCredentials): Promise<string> {
    this.apiContext = await request.newContext();
    const response = await this.apiContext.post(`${this.baseURL}/api/login`, {
      data: credentials
    });
    const data = await response.json();
    this.token = data.token;
    return this.token;
  }

  async setAuthCookie(token: string): Promise<void> {
    await this.page.context().addCookies([{
      name: 'auth_token',
      value: token,
      domain: new URL(this.baseURL).hostname,
      path: '/'
    }]);
  }

  async createProductViaAPI(product: Product): Promise<Product> {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    const response = await this.apiContext.post(`${this.baseURL}/api/products`, {
      data: product,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return await response.json();
  }

  async verifyProductInUI(productName: string): Promise<boolean> {
    await this.page.goto(`${this.baseURL}/products`);
    const product = this.page.locator(`text=${productName}`);
    return await product.isVisible();
  }

  async createOrderViaAPI(order: Order): Promise<Order> {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    const response = await this.apiContext.post(`${this.baseURL}/api/orders`, {
      data: order,
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    return await response.json();
  }

  async verifyOrderInUI(orderId: string): Promise<boolean> {
    await this.page.goto(`${this.baseURL}/orders`);
    const order = this.page.locator(`[data-order-id="${orderId}"]`);
    return await order.isVisible();
  }

  async deleteOrderViaAPI(orderId: string): Promise<void> {
    if (!this.apiContext) {
      this.apiContext = await request.newContext();
    }
    await this.apiContext.delete(`${this.baseURL}/api/orders/${orderId}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
  }

  async setupTestData(): Promise<{ products: Product[], orders: Order[] }> {
    const products: Product[] = [];
    const orders: Order[] = [];

    for (let i = 1; i <= 3; i++) {
      const product = await this.createProductViaAPI({
        id: `prod-${i}`,
        name: `Test Product ${i}`,
        price: i * 10
      });
      products.push(product);
    }

    for (let i = 1; i <= 2; i++) {
      const order = await this.createOrderViaAPI({
        id: `order-${i}`,
        products: [products[0]],
        total: products[0].price
      });
      orders.push(order);
    }

    return { products, orders };
  }

  async cleanupTestData(orderIds: string[]): Promise<void> {
    for (const orderId of orderIds) {
      await this.deleteOrderViaAPI(orderId);
    }
  }

  async interceptAPICall(url: string, mockResponse: any): Promise<void> {
    await this.page.route(url, route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse)
      });
    });
  }

  async waitForAPIResponse(urlPattern: string): Promise<any> {
    const response = await this.page.waitForResponse(
      response => response.url().includes(urlPattern) && response.status() === 200
    );
    return await response.json();
  }

  async validateAPIResponse(response: any, expectedSchema: Record<string, string>): Promise<boolean> {
    for (const [key, type] of Object.entries(expectedSchema)) {
      if (!(key in response)) return false;
      if (typeof response[key] !== type) return false;
    }
    return true;
  }

  async getSessionCookies(): Promise<Cookie[]> {
    return await this.page.context().cookies();
  }

  async restoreSession(cookies: Cookie[]): Promise<void> {
    await this.page.context().addCookies(cookies);
  }

  async performUIAction(action: () => Promise<void>, apiEndpoint: string): Promise<any> {
    const responsePromise = this.page.waitForResponse(
      response => response.url().includes(apiEndpoint)
    );
    
    await action();
    
    const response = await responsePromise;
    return await response.json();
  }
}

export { HybridTestHelper, LoginCredentials, Product, Order };
