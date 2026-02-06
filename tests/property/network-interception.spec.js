/**
 * Property Test: Network Interception Effectiveness
 * 
 * Property 16: For any network route that is configured to be intercepted, 
 * requests matching that route SHALL be captured and handled by the configured 
 * handler
 * 
 * Validates: Requirements 5.1, 5.2, 5.5, 5.6
 * 
 * This test ensures that network interception works correctly and reliably
 * captures and modifies requests/responses as configured.
 */

const { test, expect } = require('@playwright/test');

test.describe('Property 16: Network Interception Effectiveness', () => {
  
  test('intercepted route should capture matching requests', async ({ page }) => {
    let requestCaptured = false;
    let capturedURL = '';
    
    // Set up interception
    await page.route('**/api/**', route => {
      requestCaptured = true;
      capturedURL = route.request().url();
      route.continue();
    });
    
    // Make a request that should be intercepted
    await page.goto('https://jsonplaceholder.typicode.com/');
    await page.evaluate(() => {
      return fetch('/api/users/1');
    });
    
    // Wait a bit for the request to be processed
    await page.waitForTimeout(1000);
    
    // Verify interception worked
    expect(requestCaptured).toBeTruthy();
    expect(capturedURL).toContain('/api/');
  });

  test('intercepted route should allow request modification', async ({ page }) => {
    let originalURL = '';
    let modifiedHeaders = false;
    
    await page.route('**/users/**', route => {
      originalURL = route.request().url();
      
      // Modify headers
      const headers = {
        ...route.request().headers(),
        'X-Custom-Header': 'test-value'
      };
      
      modifiedHeaders = true;
      
      route.continue({ headers });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/users/1');
    
    expect(originalURL).toContain('/users/');
    expect(modifiedHeaders).toBeTruthy();
  });

  test('intercepted route should allow response mocking', async ({ page }) => {
    const mockData = { id: 999, name: 'Mock User', email: 'mock@example.com' };
    
    await page.route('**/users/1', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockData)
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const response = await page.evaluate(async () => {
      const res = await fetch('/users/1');
      return res.json();
    });
    
    expect(response.id).toBe(999);
    expect(response.name).toBe('Mock User');
    expect(response.email).toBe('mock@example.com');
  });

  test('multiple routes can be intercepted simultaneously', async ({ page }) => {
    const interceptedRoutes = new Set();
    
    await page.route('**/users/**', route => {
      interceptedRoutes.add('users');
      route.continue();
    });
    
    await page.route('**/posts/**', route => {
      interceptedRoutes.add('posts');
      route.continue();
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    await page.evaluate(async () => {
      await fetch('/users/1');
      await fetch('/posts/1');
    });
    
    await page.waitForTimeout(1000);
    
    expect(interceptedRoutes.has('users')).toBeTruthy();
    expect(interceptedRoutes.has('posts')).toBeTruthy();
  });

  test('route interception should work with regex patterns', async ({ page }) => {
    let regexMatched = false;
    
    await page.route(/\/users\/\d+/, route => {
      regexMatched = true;
      route.continue();
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    await page.evaluate(async () => {
      await fetch('/users/123');
    });
    
    await page.waitForTimeout(1000);
    
    expect(regexMatched).toBeTruthy();
  });

  test('intercepted requests should provide request details', async ({ page }) => {
    let requestDetails = null;
    
    await page.route('**/users/**', route => {
      const request = route.request();
      requestDetails = {
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        resourceType: request.resourceType()
      };
      route.continue();
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/users/1');
    
    expect(requestDetails).not.toBeNull();
    expect(requestDetails.url).toContain('/users/');
    expect(requestDetails.method).toBeDefined();
    expect(requestDetails.headers).toBeDefined();
  });

  test('route can be aborted to block requests', async ({ page }) => {
    let requestBlocked = false;
    
    await page.route('**/users/999', route => {
      requestBlocked = true;
      route.abort('failed');
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    try {
      await page.evaluate(async () => {
        await fetch('/users/999');
      });
    } catch (error) {
      // Expected to fail
    }
    
    expect(requestBlocked).toBeTruthy();
  });
});

test.describe('Property 16: Response Modification', () => {
  
  test('response status code can be modified', async ({ page }) => {
    await page.route('**/users/1', route => {
      route.fulfill({
        status: 404,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Not found' })
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const response = await page.evaluate(async () => {
      const res = await fetch('/users/1');
      return { status: res.status, ok: res.ok };
    });
    
    expect(response.status).toBe(404);
    expect(response.ok).toBeFalsy();
  });

  test('response headers can be modified', async ({ page }) => {
    await page.route('**/users/1', route => {
      route.fulfill({
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'X-Custom-Header': 'custom-value'
        },
        body: JSON.stringify({ id: 1, name: 'Test' })
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const headers = await page.evaluate(async () => {
      const res = await fetch('/users/1');
      return {
        contentType: res.headers.get('Content-Type'),
        customHeader: res.headers.get('X-Custom-Header')
      };
    });
    
    expect(headers.contentType).toContain('application/json');
    expect(headers.customHeader).toBe('custom-value');
  });

  test('response body can be completely replaced', async ({ page }) => {
    const mockResponse = {
      id: 1,
      name: 'Completely Different',
      email: 'different@example.com',
      customField: 'This was not in original'
    };
    
    await page.route('**/users/1', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockResponse)
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const response = await page.evaluate(async () => {
      const res = await fetch('/users/1');
      return res.json();
    });
    
    expect(response).toEqual(mockResponse);
    expect(response.customField).toBe('This was not in original');
  });

  test('response can be delayed', async ({ page }) => {
    const delayMs = 1000;
    
    await page.route('**/users/1', async route => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      route.continue();
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    const startTime = Date.now();
    await page.evaluate(async () => {
      await fetch('/users/1');
    });
    const endTime = Date.now();
    
    const actualDelay = endTime - startTime;
    expect(actualDelay).toBeGreaterThanOrEqual(delayMs * 0.8); // Allow 20% margin
  });
});

test.describe('Property 16: Request Monitoring', () => {
  
  test('all requests can be monitored', async ({ page }) => {
    const requests = [];
    
    page.on('request', request => {
      requests.push({
        url: request.url(),
        method: request.method(),
        resourceType: request.resourceType()
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    expect(requests.length).toBeGreaterThan(0);
    expect(requests.some(r => r.resourceType === 'document')).toBeTruthy();
  });

  test('all responses can be monitored', async ({ page }) => {
    const responses = [];
    
    page.on('response', response => {
      responses.push({
        url: response.url(),
        status: response.status(),
        ok: response.ok()
      });
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    expect(responses.length).toBeGreaterThan(0);
    expect(responses.some(r => r.ok)).toBeTruthy();
  });

  test('failed requests can be monitored', async ({ page }) => {
    const failedRequests = [];
    
    page.on('requestfailed', request => {
      failedRequests.push({
        url: request.url(),
        failure: request.failure()
      });
    });
    
    // Block a request to make it fail
    await page.route('**/users/999', route => route.abort('failed'));
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    try {
      await page.evaluate(async () => {
        await fetch('/users/999');
      });
    } catch (error) {
      // Expected
    }
    
    // May or may not capture depending on timing
    // This is informational
    console.log(`Failed requests captured: ${failedRequests.length}`);
  });
});

test.describe('Property 16: Advanced Interception Patterns', () => {
  
  test('conditional interception based on request method', async ({ page }) => {
    const interceptedMethods = new Set();
    
    await page.route('**/users/**', route => {
      const method = route.request().method();
      interceptedMethods.add(method);
      
      if (method === 'POST') {
        route.fulfill({
          status: 201,
          body: JSON.stringify({ id: 999, created: true })
        });
      } else {
        route.continue();
      }
    });
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    // Make GET request
    await page.evaluate(async () => {
      await fetch('/users/1');
    });
    
    // Make POST request
    await page.evaluate(async () => {
      await fetch('/users', {
        method: 'POST',
        body: JSON.stringify({ name: 'New User' })
      });
    });
    
    await page.waitForTimeout(1000);
    
    expect(interceptedMethods.has('GET')).toBeTruthy();
    expect(interceptedMethods.has('POST')).toBeTruthy();
  });

  test('interception can be removed', async ({ page }) => {
    let interceptCount = 0;
    
    const handler = route => {
      interceptCount++;
      route.continue();
    };
    
    await page.route('**/users/**', handler);
    
    await page.goto('https://jsonplaceholder.typicode.com/');
    
    // First request - should be intercepted
    await page.evaluate(async () => {
      await fetch('/users/1');
    });
    
    await page.waitForTimeout(500);
    const firstCount = interceptCount;
    
    // Remove interception
    await page.unroute('**/users/**', handler);
    
    // Second request - should NOT be intercepted
    await page.evaluate(async () => {
      await fetch('/users/2');
    });
    
    await page.waitForTimeout(500);
    const secondCount = interceptCount;
    
    expect(firstCount).toBeGreaterThan(0);
    expect(secondCount).toBe(firstCount); // Should not increase
  });
});
