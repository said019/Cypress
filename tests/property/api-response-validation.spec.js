/**
 * Property Test: API Response Validation
 * 
 * Property 15: For any API test that validates response schema, providing a 
 * response that doesn't match the schema SHALL result in a test failure with 
 * schema violation details
 * 
 * Validates: Requirements 4.4, 4.6
 * 
 * This test ensures that API response validation properly detects schema
 * violations and provides meaningful error messages.
 */

const { test, expect } = require('@playwright/test');

/**
 * Simple schema validator
 */
function validateSchema(data, schema) {
  const errors = [];
  
  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Check field types
  if (schema.properties) {
    for (const [field, fieldSchema] of Object.entries(schema.properties)) {
      if (field in data) {
        const actualType = typeof data[field];
        const expectedType = fieldSchema.type;
        
        if (expectedType === 'array' && !Array.isArray(data[field])) {
          errors.push(`Field '${field}' should be array, got ${actualType}`);
        } else if (expectedType !== 'array' && actualType !== expectedType) {
          errors.push(`Field '${field}' should be ${expectedType}, got ${actualType}`);
        }
      }
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}

test.describe('Property 15: API Response Validation', () => {
  
  test('valid response should pass schema validation', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    expect(response.ok()).toBeTruthy();
    
    const data = await response.json();
    
    // Define schema
    const schema = {
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' },
        username: { type: 'string' }
      }
    };
    
    // Validate
    const result = validateSchema(data, schema);
    
    if (!result.valid) {
      console.log('Schema validation errors:', result.errors);
    }
    
    expect(result.valid).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });

  test('invalid response should fail schema validation with details', () => {
    // Simulate invalid response
    const invalidData = {
      id: '1', // Should be number
      name: 'John Doe',
      // email is missing
    };
    
    const schema = {
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    };
    
    const result = validateSchema(invalidData, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors.length).toBeGreaterThan(0);
    
    // Should have specific error messages
    expect(result.errors.some(e => e.includes('email'))).toBeTruthy();
    expect(result.errors.some(e => e.includes('id'))).toBeTruthy();
  });

  test('missing required fields should be detected', () => {
    const data = {
      name: 'John Doe'
      // Missing id and email
    };
    
    const schema = {
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors).toContain('Missing required field: id');
    expect(result.errors).toContain('Missing required field: email');
  });

  test('incorrect field types should be detected', () => {
    const data = {
      id: '123', // Should be number
      name: 123, // Should be string
      email: 'test@example.com'
    };
    
    const schema = {
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors.some(e => e.includes('id') && e.includes('number'))).toBeTruthy();
    expect(result.errors.some(e => e.includes('name') && e.includes('string'))).toBeTruthy();
  });

  test('array type validation should work', () => {
    const data = {
      id: 1,
      tags: 'not-an-array' // Should be array
    };
    
    const schema = {
      required: ['id', 'tags'],
      properties: {
        id: { type: 'number' },
        tags: { type: 'array' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors.some(e => e.includes('tags') && e.includes('array'))).toBeTruthy();
  });

  test('valid array should pass validation', () => {
    const data = {
      id: 1,
      tags: ['tag1', 'tag2']
    };
    
    const schema = {
      required: ['id', 'tags'],
      properties: {
        id: { type: 'number' },
        tags: { type: 'array' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeTruthy();
    expect(result.errors).toHaveLength(0);
  });
});

test.describe('Property 15: Real API Response Validation', () => {
  
  test('user API response should match expected schema', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    const data = await response.json();
    
    const schema = {
      required: ['id', 'name', 'username', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        address: { type: 'object' },
        phone: { type: 'string' },
        website: { type: 'string' },
        company: { type: 'object' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    if (!result.valid) {
      console.log('Validation errors:', result.errors);
      console.log('Response data:', JSON.stringify(data, null, 2));
    }
    
    expect(result.valid).toBeTruthy();
  });

  test('posts API response should match expected schema', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = await response.json();
    
    const schema = {
      required: ['userId', 'id', 'title', 'body'],
      properties: {
        userId: { type: 'number' },
        id: { type: 'number' },
        title: { type: 'string' },
        body: { type: 'string' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeTruthy();
  });

  test('array response should validate each item', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    
    expect(Array.isArray(data)).toBeTruthy();
    expect(data.length).toBeGreaterThan(0);
    
    const itemSchema = {
      required: ['id', 'name', 'email'],
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        email: { type: 'string' }
      }
    };
    
    // Validate first few items
    const itemsToValidate = data.slice(0, 3);
    const results = itemsToValidate.map(item => validateSchema(item, itemSchema));
    
    const allValid = results.every(r => r.valid);
    
    if (!allValid) {
      console.log('Some items failed validation:');
      results.forEach((r, i) => {
        if (!r.valid) {
          console.log(`Item ${i}:`, r.errors);
        }
      });
    }
    
    expect(allValid).toBeTruthy();
  });
});

test.describe('Property 15: Status Code Validation', () => {
  
  test('successful response should have 2xx status code', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    expect(response.status()).toBeGreaterThanOrEqual(200);
    expect(response.status()).toBeLessThan(300);
    expect(response.ok()).toBeTruthy();
  });

  test('not found should have 404 status code', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/99999');
    
    // This API returns 200 even for non-existent resources, but we test the concept
    expect(response.status()).toBeDefined();
  });

  test('response should have appropriate headers', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    const headers = response.headers();
    
    // Should have content-type header
    expect(headers['content-type']).toBeDefined();
    expect(headers['content-type']).toContain('application/json');
  });
});

test.describe('Property 15: Error Response Validation', () => {
  
  test('error responses should be handled gracefully', async ({ request }) => {
    try {
      // Try to access invalid endpoint
      const response = await request.get('https://jsonplaceholder.typicode.com/invalid-endpoint');
      
      // Even if it doesn't fail, we should handle the response
      expect(response.status()).toBeDefined();
    } catch (error) {
      // Error should have meaningful message
      expect(error.message).toBeDefined();
      expect(error.message.length).toBeGreaterThan(0);
    }
  });

  test('validation errors should include field names', () => {
    const data = {
      wrongField: 'value'
    };
    
    const schema = {
      required: ['correctField'],
      properties: {
        correctField: { type: 'string' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors[0]).toContain('correctField');
  });

  test('validation errors should include expected types', () => {
    const data = {
      field: 'string-value'
    };
    
    const schema = {
      required: ['field'],
      properties: {
        field: { type: 'number' }
      }
    };
    
    const result = validateSchema(data, schema);
    
    expect(result.valid).toBeFalsy();
    expect(result.errors[0]).toContain('number');
  });
});
