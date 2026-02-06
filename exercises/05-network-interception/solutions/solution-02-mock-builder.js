/**
 * Solución 02: MockResponseBuilder (JavaScript)
 */

class MockResponseBuilder {
  constructor() {
    this.response = {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: {},
      delay: 0
    };
  }

  withStatus(status) {
    this.response.status = status;
    return this;
  }

  withHeaders(headers) {
    this.response.headers = { ...this.response.headers, ...headers };
    return this;
  }

  withBody(body) {
    this.response.body = body;
    return this;
  }

  withDelay(delayMs) {
    this.response.delay = delayMs;
    return this;
  }

  withError(errorMessage, statusCode = 500) {
    this.response.status = statusCode;
    this.response.body = { error: errorMessage, success: false };
    return this;
  }

  build() {
    return {
      status: this.response.status,
      headers: this.response.headers,
      body: JSON.stringify(this.response.body),
      delay: this.response.delay
    };
  }

  static success(data) {
    return new MockResponseBuilder()
      .withStatus(200)
      .withBody({ success: true, data });
  }

  static error(message, status = 500) {
    return new MockResponseBuilder()
      .withStatus(status)
      .withBody({ success: false, error: message });
  }

  static notFound(message = 'Not Found') {
    return new MockResponseBuilder()
      .withStatus(404)
      .withBody({ success: false, error: message });
  }

  static unauthorized(message = 'Unauthorized') {
    return new MockResponseBuilder()
      .withStatus(401)
      .withBody({ success: false, error: message });
  }
}

class ErrorTemplates {
  static networkError() {
    return {
      status: 0,
      headers: {},
      body: JSON.stringify({ error: 'Network Error', message: 'Failed to connect' })
    };
  }

  static timeoutError() {
    return {
      status: 408,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Request Timeout', message: 'Request took too long' })
    };
  }

  static validationError(fields) {
    return {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: 'Validation Error',
        fields: fields || []
      })
    };
  }

  static serverError(message = 'Internal Server Error') {
    return {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: message })
    };
  }
}

module.exports = { MockResponseBuilder, ErrorTemplates };
