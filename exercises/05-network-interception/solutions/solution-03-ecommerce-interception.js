/**
 * Solution 03: E-Commerce App Network Interception
 * 
 * Esta solución demuestra cómo interceptar y modificar llamadas de API
 * en una aplicación de e-commerce real.
 */

const { test, expect } = require('@playwright/test');

const ECOMMERCE_URL = 'https://rahulshettyacademy.com/client';
const TEST_EMAIL = 'anshika@gmail.com';
const TEST_PASSWORD = 'Iamking@000';

test.describe('E-Commerce Network Interception - Solutions', () => {

  test('should intercept products API and inject custom test data', async ({ page }) => {
    const mockProducts = [
      {
        _id: 'test-product-1',
        productName: 'Test Automation Product',
        productCategory: 'electronics',
        productSubCategory: 'mobile',
        productPrice: 99999,
        productDescription: 'This is a test product for automation',
        productImage: 'https://via.placeholder.com/150',
        productRating: '5'
      }
    ];

    // Interceptar API de productos
    await page.route('**/api/ecom/product/get-all-products', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProducts)
      });
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    // Esperar a que cargue el dashboard
    await page.waitForLoadState('networkidle');

    // Verificar que el producto mockeado aparece
    const productName = await page.locator('.card-body b').first().textContent();
    expect(productName).toContain('Test Automation Product');
    
    console.log('✅ Productos personalizados inyectados exitosamente');
  });

  test('should intercept and validate product request payload', async ({ page }) => {
    let capturedRequest = null;

    await page.route('**/api/ecom/product/get-all-products', async route => {
      const request = route.request();
      capturedRequest = {
        url: request.url(),
        method: request.method(),
        headers: request.headers()
      };
      await route.continue();
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Validar request capturado
    expect(capturedRequest).not.toBeNull();
    expect(capturedRequest.url).toContain('/api/ecom/product/get-all-products');
    expect(capturedRequest.method).toBe('GET');
    expect(capturedRequest.headers['authorization']).toBeDefined();
    
    console.log('✅ Request payload validado correctamente');
  });

  test('should simulate API error response', async ({ page }) => {
    await page.route('**/api/ecom/product/get-all-products', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' })
      });
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Verificar que no hay productos o hay mensaje de error
    const productCards = await page.locator('.card-body').count();
    expect(productCards).toBe(0);
    
    console.log('✅ Error de API simulado correctamente');
  });

  test('should simulate slow API response', async ({ page }) => {
    await page.route('**/api/ecom/product/get-all-products', async route => {
      await page.waitForTimeout(3000);
      await route.continue();
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    expect(loadTime).toBeGreaterThanOrEqual(3000);
    
    console.log(`✅ API lenta simulada: ${loadTime}ms`);
  });

  test('should intercept add to cart API call', async ({ page }) => {
    let addToCartPayload = null;

    await page.route('**/api/ecom/user/add-to-cart', async route => {
      const request = route.request();
      addToCartPayload = request.postDataJSON();
      await route.continue();
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Agregar primer producto al carrito
    await page.locator('.card-body button').first().click();
    await page.waitForTimeout(1000);

    // Validar payload
    expect(addToCartPayload).not.toBeNull();
    expect(addToCartPayload._id).toBeDefined();
    
    console.log('✅ Payload de agregar al carrito capturado:', addToCartPayload);
  });

  test('should mock successful cart addition', async ({ page }) => {
    await page.route('**/api/ecom/user/add-to-cart', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Product Added To Cart',
          success: true
        })
      });
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    await page.locator('.card-body button').first().click();
    
    // Verificar mensaje de éxito (toast notification)
    await page.waitForSelector('.toast-message', { timeout: 5000 });
    const toastMessage = await page.locator('.toast-message').textContent();
    expect(toastMessage).toContain('Product Added To Cart');
    
    console.log('✅ Adición al carrito mockeada exitosamente');
  });

  test('should intercept multiple APIs in complete flow', async ({ page }) => {
    const interceptedAPIs = {
      products: false,
      addToCart: false
    };

    // Interceptar productos
    await page.route('**/api/ecom/product/get-all-products', async route => {
      interceptedAPIs.products = true;
      await route.continue();
    });

    // Interceptar add-to-cart
    await page.route('**/api/ecom/user/add-to-cart', async route => {
      interceptedAPIs.addToCart = true;
      await route.continue();
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Agregar producto al carrito
    await page.locator('.card-body button').first().click();
    await page.waitForTimeout(1000);

    // Verificar interceptaciones
    expect(interceptedAPIs.products).toBeTruthy();
    expect(interceptedAPIs.addToCart).toBeTruthy();
    
    console.log('✅ Múltiples APIs interceptadas exitosamente');
  });

  test('should validate authentication headers in all requests', async ({ page }) => {
    const requestsWithAuth = [];
    const requestsWithoutAuth = [];

    page.on('request', request => {
      const url = request.url();
      const hasAuth = request.headers()['authorization'] !== undefined;

      // Solo registrar requests a la API
      if (url.includes('/api/ecom/')) {
        if (hasAuth) {
          requestsWithAuth.push(url);
        } else {
          requestsWithoutAuth.push(url);
        }
      }
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Verificar que requests a APIs protegidas tienen auth
    expect(requestsWithAuth.length).toBeGreaterThan(0);
    
    console.log(`✅ Requests con auth: ${requestsWithAuth.length}`);
    console.log(`✅ Requests sin auth: ${requestsWithoutAuth.length}`);
  });

  test('should validate request timing and sequence', async ({ page }) => {
    const apiCallSequence = [];

    await page.route('**/api/ecom/**', async route => {
      const url = route.request().url();
      const timestamp = Date.now();
      
      // Extraer el endpoint
      let endpoint = 'unknown';
      if (url.includes('get-all-products')) endpoint = 'products';
      if (url.includes('add-to-cart')) endpoint = 'add-to-cart';
      if (url.includes('create-order')) endpoint = 'create-order';

      apiCallSequence.push({ endpoint, timestamp });
      await route.continue();
    });

    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Agregar producto
    await page.locator('.card-body button').first().click();
    await page.waitForTimeout(1000);

    // Verificar secuencia
    expect(apiCallSequence.length).toBeGreaterThan(0);
    
    // Verificar que products viene antes que add-to-cart
    const productsIndex = apiCallSequence.findIndex(call => call.endpoint === 'products');
    const addToCartIndex = apiCallSequence.findIndex(call => call.endpoint === 'add-to-cart');
    
    if (productsIndex !== -1 && addToCartIndex !== -1) {
      expect(productsIndex).toBeLessThan(addToCartIndex);
    }
    
    console.log('✅ Secuencia de APIs validada:', apiCallSequence.map(c => c.endpoint));
  });

});

test.describe('Complete E-Commerce Flow - Solution', () => {

  test('should complete full purchase flow with mocked data', async ({ page }) => {
    const mockProducts = [
      {
        _id: 'mock-product-123',
        productName: 'Mock Test Product',
        productCategory: 'electronics',
        productPrice: 50000,
        productDescription: 'Complete flow test product',
        productImage: 'https://via.placeholder.com/150',
        productRating: '5'
      }
    ];

    const capturedPayloads = {
      addToCart: null,
      createOrder: null
    };

    // Mockear productos
    await page.route('**/api/ecom/product/get-all-products', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockProducts)
      });
    });

    // Interceptar add-to-cart
    await page.route('**/api/ecom/user/add-to-cart', async route => {
      capturedPayloads.addToCart = route.request().postDataJSON();
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Product Added To Cart', success: true })
      });
    });

    // Login
    await page.goto(ECOMMERCE_URL);
    await page.locator('#userEmail').fill(TEST_EMAIL);
    await page.locator('#userPassword').fill(TEST_PASSWORD);
    await page.locator('#login').click();

    await page.waitForLoadState('networkidle');

    // Verificar producto mockeado
    const productName = await page.locator('.card-body b').first().textContent();
    expect(productName).toContain('Mock Test Product');

    // Agregar al carrito
    await page.locator('.card-body button').first().click();
    await page.waitForTimeout(1000);

    // Verificar payload de add-to-cart
    expect(capturedPayloads.addToCart).not.toBeNull();
    expect(capturedPayloads.addToCart._id).toBe('mock-product-123');

    console.log('🎯 Flujo completo ejecutado exitosamente');
    console.log('Payloads capturados:', capturedPayloads);
  });

});
