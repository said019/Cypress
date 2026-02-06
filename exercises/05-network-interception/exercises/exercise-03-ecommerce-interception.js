/**
 * Exercise 03: E-Commerce App Network Interception
 * 
 * Objetivo: Aprender a interceptar y modificar llamadas de API en una aplicación
 * de e-commerce real para testing avanzado.
 * 
 * En este ejercicio aprenderás a:
 * - Interceptar llamadas de productos de la API
 * - Inyectar datos de prueba personalizados
 * - Validar payloads de requests
 * - Simular diferentes escenarios (productos agotados, errores, etc.)
 * - Modificar respuestas para testing de edge cases
 */

const { test, expect } = require('@playwright/test');

// URL de la aplicación de e-commerce
const ECOMMERCE_URL = 'https://rahulshettyacademy.com/client';

test.describe('E-Commerce Network Interception', () => {

  // ============================================================================
  // PARTE 1: Interceptar y Modificar Lista de Productos
  // ============================================================================

  test('should intercept products API and inject custom test data', async ({ page }) => {
    // TODO: Crear datos de prueba personalizados
    const mockProducts = [
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

    // TODO: Configurar interceptación de la API de productos
    // Ruta típica: **/api/ecom/product/get-all-products
    // Debes:
    // 1. Interceptar la ruta con page.route()
    // 2. Responder con mockProducts usando route.fulfill()
    // 3. Incluir status 200 y contentType 'application/json'

    // TODO: Navegar a la página de login
    // await page.goto(ECOMMERCE_URL);

    // TODO: Hacer login (usa credenciales de prueba)
    // Email: anshika@gmail.com
    // Password: Iamking@000

    // TODO: Esperar a que cargue el dashboard

    // TODO: Verificar que los productos mockeados aparecen en la página
    // Busca elementos con los nombres de los productos de prueba
    
    console.log('✅ Productos personalizados inyectados exitosamente');
  });

  test('should intercept and validate product request payload', async ({ page }) => {
    let capturedRequest = null;

    // TODO: Configurar interceptación para capturar el request
    // Debes:
    // 1. Usar page.route() para interceptar **/api/ecom/product/get-all-products
    // 2. Guardar los detalles del request en capturedRequest
    // 3. Continuar con el request original usando route.continue()

    // TODO: Navegar y hacer login

    // TODO: Esperar a que se haga el request

    // TODO: Validar el request capturado
    // Verifica:
    // - URL contiene la ruta correcta
    // - Método es GET
    // - Headers incluyen authorization token
    
    console.log('✅ Request payload validado correctamente');
  });

  // ============================================================================
  // PARTE 2: Simular Escenarios de Error
  // ============================================================================

  test('should simulate out of stock scenario', async ({ page }) => {
    // TODO: Crear productos con stock = 0
    const outOfStockProducts = [
      {
        _id: 'oos-product-1',
        productName: 'Out of Stock Product',
        productCategory: 'electronics',
        productPrice: 99999,
        productDescription: 'This product is out of stock',
        productImage: 'https://via.placeholder.com/150',
        productRating: '5',
        stock: 0  // Producto agotado
      }
    ];

    // TODO: Interceptar API y devolver productos agotados

    // TODO: Navegar, login y verificar

    // TODO: Intentar agregar al carrito y verificar mensaje de error
    
    console.log('✅ Escenario de producto agotado simulado');
  });

  test('should simulate API error response', async ({ page }) => {
    // TODO: Interceptar API de productos
    // Debes:
    // 1. Usar route.fulfill() para devolver un error
    // 2. Status: 500
    // 3. Body: { message: 'Internal Server Error' }

    // TODO: Navegar y hacer login

    // TODO: Verificar que se muestra mensaje de error apropiado
    // O que la página maneja el error correctamente
    
    console.log('✅ Error de API simulado correctamente');
  });

  test('should simulate slow API response', async ({ page }) => {
    // TODO: Interceptar API con delay
    // Debes:
    // 1. Usar page.route()
    // 2. Agregar un delay de 3000ms antes de route.continue()
    // 3. Usar setTimeout o page.waitForTimeout()

    // TODO: Navegar y hacer login

    // TODO: Medir el tiempo de carga
    const startTime = Date.now();
    // ... esperar carga de productos
    const endTime = Date.now();
    const loadTime = endTime - startTime;

    // TODO: Verificar que el tiempo de carga es >= 3000ms
    
    console.log(`✅ API lenta simulada: ${loadTime}ms`);
  });

  // ============================================================================
  // PARTE 3: Interceptar Operaciones de Carrito
  // ============================================================================

  test('should intercept add to cart API call', async ({ page }) => {
    let addToCartPayload = null;

    // TODO: Interceptar POST a **/api/ecom/user/add-to-cart
    // Debes:
    // 1. Capturar el payload del request
    // 2. Guardar en addToCartPayload
    // 3. Continuar con route.continue()

    // TODO: Navegar, login y agregar producto al carrito

    // TODO: Validar el payload capturado
    // Debe contener:
    // - productId
    // - userId (o similar)
    
    console.log('✅ Payload de agregar al carrito capturado');
  });

  test('should mock successful cart addition', async ({ page }) => {
    // TODO: Interceptar add-to-cart API
    // Devolver respuesta exitosa mockeada:
    // {
    //   message: 'Product Added To Cart',
    //   success: true
    // }

    // TODO: Navegar, login y agregar producto

    // TODO: Verificar mensaje de éxito
    
    console.log('✅ Adición al carrito mockeada exitosamente');
  });

  test('should simulate cart full scenario', async ({ page }) => {
    // TODO: Interceptar add-to-cart API
    // Devolver error de carrito lleno:
    // Status: 400
    // Body: { message: 'Cart is full', success: false }

    // TODO: Navegar, login e intentar agregar producto

    // TODO: Verificar mensaje de error apropiado
    
    console.log('✅ Escenario de carrito lleno simulado');
  });

  // ============================================================================
  // PARTE 4: Interceptar Proceso de Checkout
  // ============================================================================

  test('should intercept order creation API', async ({ page }) => {
    let orderPayload = null;

    // TODO: Interceptar POST a **/api/ecom/order/create-order
    // Capturar el payload completo del pedido

    // TODO: Navegar, login, agregar producto y proceder al checkout

    // TODO: Completar el formulario de checkout

    // TODO: Validar el payload del pedido
    // Debe incluir:
    // - productos
    // - información de envío
    // - método de pago
    
    console.log('✅ Payload de orden capturado y validado');
  });

  test('should mock successful order placement', async ({ page }) => {
    // TODO: Interceptar create-order API
    // Devolver orden exitosa con ID de orden mockeado:
    // {
    //   orders: ['mock-order-id-12345'],
    //   productOrderId: ['mock-product-order-id'],
    //   message: 'Order Placed Successfully'
    // }

    // TODO: Navegar, login, agregar producto y hacer checkout

    // TODO: Verificar mensaje de éxito con order ID
    
    console.log('✅ Orden mockeada exitosamente');
  });

  test('should simulate payment failure', async ({ page }) => {
    // TODO: Interceptar create-order API
    // Devolver error de pago:
    // Status: 402
    // Body: { message: 'Payment Failed', success: false }

    // TODO: Navegar, login, agregar producto e intentar checkout

    // TODO: Verificar mensaje de error de pago
    
    console.log('✅ Fallo de pago simulado');
  });

  // ============================================================================
  // PARTE 5: Interceptar Múltiples APIs Simultáneamente
  // ============================================================================

  test('should intercept multiple APIs in complete flow', async ({ page }) => {
    const interceptedAPIs = {
      products: false,
      addToCart: false,
      createOrder: false
    };

    // TODO: Configurar interceptación para productos
    // Marcar interceptedAPIs.products = true cuando se intercepte

    // TODO: Configurar interceptación para add-to-cart
    // Marcar interceptedAPIs.addToCart = true cuando se intercepte

    // TODO: Configurar interceptación para create-order
    // Marcar interceptedAPIs.createOrder = true cuando se intercepte

    // TODO: Ejecutar flujo completo:
    // 1. Login
    // 2. Ver productos
    // 3. Agregar al carrito
    // 4. Hacer checkout

    // TODO: Verificar que todas las APIs fueron interceptadas
    // expect(interceptedAPIs.products).toBeTruthy();
    // expect(interceptedAPIs.addToCart).toBeTruthy();
    // expect(interceptedAPIs.createOrder).toBeTruthy();
    
    console.log('✅ Múltiples APIs interceptadas exitosamente');
  });

  // ============================================================================
  // PARTE 6: Validación Avanzada de Requests
  // ============================================================================

  test('should validate authentication headers in all requests', async ({ page }) => {
    const requestsWithAuth = [];
    const requestsWithoutAuth = [];

    // TODO: Configurar listener para todos los requests
    // page.on('request', request => { ... })
    // Clasificar requests según tengan o no header de autorización

    // TODO: Navegar, login y realizar acciones

    // TODO: Validar que requests a APIs protegidas tienen auth
    // TODO: Validar que requests a recursos públicos pueden no tener auth
    
    console.log(`✅ Requests con auth: ${requestsWithAuth.length}`);
    console.log(`✅ Requests sin auth: ${requestsWithoutAuth.length}`);
  });

  test('should validate request timing and sequence', async ({ page }) => {
    const apiCallSequence = [];

    // TODO: Configurar interceptación para múltiples endpoints
    // Registrar el orden y timestamp de cada llamada

    // TODO: Ejecutar flujo de usuario

    // TODO: Validar que las llamadas ocurren en el orden correcto
    // Ejemplo: products -> add-to-cart -> create-order
    
    console.log('✅ Secuencia de APIs validada');
  });

});

// ============================================================================
// EJERCICIO FINAL: Flujo Completo con Datos Personalizados
// ============================================================================

test.describe('Complete E-Commerce Flow with Custom Data', () => {

  test('should complete full purchase flow with mocked data', async ({ page }) => {
    // TODO: Este es el ejercicio final que combina todo lo aprendido
    // Debes:
    // 1. Mockear productos personalizados
    // 2. Interceptar y validar add-to-cart
    // 3. Mockear respuesta de orden exitosa
    // 4. Validar todo el flujo end-to-end
    // 5. Capturar y validar todos los payloads
    // 6. Verificar que la UI refleja los datos mockeados

    console.log('🎯 Ejercicio final: Implementa el flujo completo');
  });

});

/**
 * TIPS Y MEJORES PRÁCTICAS:
 * 
 * 1. Interceptación de Rutas:
 *    - Usa patrones específicos para evitar interceptar requests no deseados
 *    - Ejemplo: '**/api/ecom/**' en lugar de '**'
 * 
 * 2. Validación de Payloads:
 *    - Siempre valida estructura y tipos de datos
 *    - Verifica que campos requeridos estén presentes
 * 
 * 3. Manejo de Errores:
 *    - Simula diferentes códigos de error (400, 401, 500, etc.)
 *    - Verifica que la UI maneja errores apropiadamente
 * 
 * 4. Performance Testing:
 *    - Usa delays para simular APIs lentas
 *    - Mide tiempos de respuesta
 * 
 * 5. Datos de Prueba:
 *    - Crea datos realistas pero identificables
 *    - Usa IDs únicos para evitar conflictos
 * 
 * 6. Limpieza:
 *    - Recuerda que las interceptaciones son por test
 *    - No necesitas limpiar entre tests
 */
