/**
 * Exercise 03: E-Commerce App Network Interception (TypeScript)
 * 
 * Objetivo: Aprender a interceptar y modificar llamadas de API en una aplicación
 * de e-commerce real para testing avanzado con TypeScript.
 */

import { test, expect, Page, Route } from '@playwright/test';

// URL de la aplicación de e-commerce
const ECOMMERCE_URL = 'https://rahulshettyacademy.com/client';

// Tipos para los datos de la aplicación
interface Product {
  _id: string;
  productName: string;
  productCategory: string;
  productSubCategory?: string;
  productPrice: number;
  productDescription: string;
  productImage: string;
  productRating: string;
  stock?: number;
}

interface CartResponse {
  message: string;
  success: boolean;
}

interface OrderPayload {
  products: string[];
  shippingInfo?: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod?: string;
}

interface OrderResponse {
  orders: string[];
  productOrderId: string[];
  message: string;
}

interface APICallRecord {
  url: string;
  method: string;
  timestamp: number;
  hasAuth: boolean;
}

test.describe('E-Commerce Network Interception (TypeScript)', () => {

  // ============================================================================
  // PARTE 1: Interceptar y Modificar Lista de Productos
  // ============================================================================

  test('should intercept products API and inject custom test data', async ({ page }: { page: Page }) => {
    // TODO: Crear datos de prueba personalizados con tipos
    const mockProducts: Product[] = [
      {
        _id: 'test-product-1',
        productName: 'Test Product 1',
        productCategory: 'electronics',
        productSubCategory: 'mobile',
        productPrice: 99999,
        productDescription: 'This is a test product for automation',
        productImage: 'https://via.placeholder.com/150',
        productRating: '5'
      },
      {
        _id: 'test-product-2',
        productName: 'Test Product 2',
        productCategory: 'fashion',
        productSubCategory: 'shirt',
        productPrice: 50000,
        productDescription: 'Another test product',
        productImage: 'https://via.placeholder.com/150',
        productRating: '4'
      }
    ];

    // TODO: Configurar interceptación con tipos
    // await page.route('**/api/ecom/product/get-all-products', async (route: Route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify(mockProducts)
    //   });
    // });

    // TODO: Navegar a la página de login

    // TODO: Hacer login

    // TODO: Verificar productos mockeados
    
    console.log('✅ Productos personalizados inyectados exitosamente');
  });

  test('should intercept and validate product request payload', async ({ page }: { page: Page }) => {
    let capturedRequest: APICallRecord | null = null;

    // TODO: Configurar interceptación con tipos
    // await page.route('**/api/ecom/product/get-all-products', async (route: Route) => {
    //   const request = route.request();
    //   capturedRequest = {
    //     url: request.url(),
    //     method: request.method(),
    //     timestamp: Date.now(),
    //     hasAuth: request.headers()['authorization'] !== undefined
    //   };
    //   await route.continue();
    // });

    // TODO: Navegar y hacer login

    // TODO: Validar request capturado
    
    console.log('✅ Request payload validado correctamente');
  });

  // ============================================================================
  // PARTE 2: Simular Escenarios de Error
  // ============================================================================

  test('should simulate out of stock scenario', async ({ page }: { page: Page }) => {
    const outOfStockProducts: Product[] = [
      {
        _id: 'oos-product-1',
        productName: 'Out of Stock Product',
        productCategory: 'electronics',
        productPrice: 99999,
        productDescription: 'This product is out of stock',
        productImage: 'https://via.placeholder.com/150',
        productRating: '5',
        stock: 0
      }
    ];

    // TODO: Interceptar y devolver productos agotados

    // TODO: Verificar manejo de stock = 0
    
    console.log('✅ Escenario de producto agotado simulado');
  });

  test('should simulate API error response', async ({ page }: { page: Page }) => {
    // TODO: Interceptar y devolver error 500
    // await page.route('**/api/ecom/product/get-all-products', async (route: Route) => {
    //   await route.fulfill({
    //     status: 500,
    //     contentType: 'application/json',
    //     body: JSON.stringify({ message: 'Internal Server Error' })
    //   });
    // });

    // TODO: Verificar manejo de error
    
    console.log('✅ Error de API simulado correctamente');
  });

  test('should simulate slow API response', async ({ page }: { page: Page }) => {
    // TODO: Interceptar con delay tipado
    // await page.route('**/api/ecom/product/get-all-products', async (route: Route) => {
    //   await page.waitForTimeout(3000);
    //   await route.continue();
    // });

    // TODO: Medir tiempo de carga
    const startTime: number = Date.now();
    // ... esperar carga
    const endTime: number = Date.now();
    const loadTime: number = endTime - startTime;

    // TODO: Verificar delay
    
    console.log(`✅ API lenta simulada: ${loadTime}ms`);
  });

  // ============================================================================
  // PARTE 3: Interceptar Operaciones de Carrito
  // ============================================================================

  test('should intercept add to cart API call', async ({ page }: { page: Page }) => {
    let addToCartPayload: any = null;

    // TODO: Interceptar POST con tipos
    // await page.route('**/api/ecom/user/add-to-cart', async (route: Route) => {
    //   const request = route.request();
    //   addToCartPayload = request.postDataJSON();
    //   await route.continue();
    // });

    // TODO: Agregar producto y validar payload
    
    console.log('✅ Payload de agregar al carrito capturado');
  });

  test('should mock successful cart addition', async ({ page }: { page: Page }) => {
    const mockResponse: CartResponse = {
      message: 'Product Added To Cart',
      success: true
    };

    // TODO: Interceptar y devolver respuesta tipada
    // await page.route('**/api/ecom/user/add-to-cart', async (route: Route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: 'application/json',
    //     body: JSON.stringify(mockResponse)
    //   });
    // });

    // TODO: Verificar éxito
    
    console.log('✅ Adición al carrito mockeada exitosamente');
  });

  test('should simulate cart full scenario', async ({ page }: { page: Page }) => {
    const errorResponse: CartResponse = {
      message: 'Cart is full',
      success: false
    };

    // TODO: Interceptar y devolver error tipado

    // TODO: Verificar manejo de error
    
    console.log('✅ Escenario de carrito lleno simulado');
  });

  // ============================================================================
  // PARTE 4: Interceptar Proceso de Checkout
  // ============================================================================

  test('should intercept order creation API', async ({ page }: { page: Page }) => {
    let orderPayload: OrderPayload | null = null;

    // TODO: Interceptar create-order con tipos
    // await page.route('**/api/ecom/order/create-order', async (route: Route) => {
    //   const request = route.request();
    //   orderPayload = request.postDataJSON() as OrderPayload;
    //   await route.continue();
    // });

    // TODO: Completar checkout y validar payload
    
    console.log('✅ Payload de orden capturado y validado');
  });

  test('should mock successful order placement', async ({ page }: { page: Page }) => {
    const mockOrderResponse: OrderResponse = {
      orders: ['mock-order-id-12345'],
      productOrderId: ['mock-product-order-id'],
      message: 'Order Placed Successfully'
    };

    // TODO: Interceptar y devolver orden exitosa tipada

    // TODO: Verificar mensaje de éxito
    
    console.log('✅ Orden mockeada exitosamente');
  });

  test('should simulate payment failure', async ({ page }: { page: Page }) => {
    interface PaymentError {
      message: string;
      success: boolean;
    }

    const paymentError: PaymentError = {
      message: 'Payment Failed',
      success: false
    };

    // TODO: Interceptar y devolver error de pago

    // TODO: Verificar manejo de error
    
    console.log('✅ Fallo de pago simulado');
  });

  // ============================================================================
  // PARTE 5: Interceptar Múltiples APIs Simultáneamente
  // ============================================================================

  test('should intercept multiple APIs in complete flow', async ({ page }: { page: Page }) => {
    interface InterceptedAPIs {
      products: boolean;
      addToCart: boolean;
      createOrder: boolean;
    }

    const interceptedAPIs: InterceptedAPIs = {
      products: false,
      addToCart: false,
      createOrder: false
    };

    // TODO: Configurar múltiples interceptaciones con tipos

    // TODO: Ejecutar flujo completo

    // TODO: Verificar todas las interceptaciones
    
    console.log('✅ Múltiples APIs interceptadas exitosamente');
  });

  // ============================================================================
  // PARTE 6: Validación Avanzada de Requests
  // ============================================================================

  test('should validate authentication headers in all requests', async ({ page }: { page: Page }) => {
    const requestsWithAuth: APICallRecord[] = [];
    const requestsWithoutAuth: APICallRecord[] = [];

    // TODO: Configurar listener tipado
    // page.on('request', (request) => {
    //   const record: APICallRecord = {
    //     url: request.url(),
    //     method: request.method(),
    //     timestamp: Date.now(),
    //     hasAuth: request.headers()['authorization'] !== undefined
    //   };
    //   
    //   if (record.hasAuth) {
    //     requestsWithAuth.push(record);
    //   } else {
    //     requestsWithoutAuth.push(record);
    //   }
    // });

    // TODO: Ejecutar acciones y validar
    
    console.log(`✅ Requests con auth: ${requestsWithAuth.length}`);
    console.log(`✅ Requests sin auth: ${requestsWithoutAuth.length}`);
  });

  test('should validate request timing and sequence', async ({ page }: { page: Page }) => {
    const apiCallSequence: APICallRecord[] = [];

    // TODO: Registrar secuencia de llamadas con tipos

    // TODO: Validar orden correcto
    
    console.log('✅ Secuencia de APIs validada');
  });

});

// ============================================================================
// EJERCICIO FINAL: Flujo Completo con Datos Personalizados
// ============================================================================

test.describe('Complete E-Commerce Flow with Custom Data (TypeScript)', () => {

  test('should complete full purchase flow with mocked data', async ({ page }: { page: Page }) => {
    // TODO: Ejercicio final con tipos completos
    // Combina todo lo aprendido con type safety

    console.log('🎯 Ejercicio final: Implementa el flujo completo con TypeScript');
  });

});

/**
 * VENTAJAS DE TYPESCRIPT EN NETWORK INTERCEPTION:
 * 
 * 1. Type Safety:
 *    - Interfaces para productos, respuestas, payloads
 *    - Autocompletado en IDE
 *    - Detección de errores en tiempo de desarrollo
 * 
 * 2. Mejor Documentación:
 *    - Los tipos sirven como documentación
 *    - Más fácil entender estructura de datos
 * 
 * 3. Refactoring Seguro:
 *    - Cambios en tipos se propagan
 *    - Errores detectados automáticamente
 * 
 * 4. Validación en Compile Time:
 *    - Errores antes de ejecutar tests
 *    - Menos bugs en runtime
 */
