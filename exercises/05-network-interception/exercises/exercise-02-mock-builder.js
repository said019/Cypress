/**
 * Ejercicio 02: MockResponseBuilder (JavaScript)
 * 
 * Objetivo: Crear builder para construir respuestas mock complejas
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

  // TODO: Implementar withStatus para establecer status code
  withStatus(status) {
    // Establecer status code
    // Retornar this para chaining
    // Tu código aquí
  }

  // TODO: Implementar withHeaders para agregar headers
  withHeaders(headers) {
    // Agregar headers
    // Retornar this
    // Tu código aquí
  }

  // TODO: Implementar withBody para establecer body
  withBody(body) {
    // Establecer body
    // Retornar this
    // Tu código aquí
  }

  // TODO: Implementar withDelay para agregar delay
  withDelay(delayMs) {
    // Establecer delay
    // Retornar this
    // Tu código aquí
  }

  // TODO: Implementar withError para crear error response
  withError(errorMessage, statusCode = 500) {
    // Crear response de error
    // Retornar this
    // Tu código aquí
  }

  // TODO: Implementar build para construir response final
  build() {
    // Retornar objeto de response completo
    // Tu código aquí
  }

  // TODO: Implementar static success para response exitosa
  static success(data) {
    // Crear builder con response exitosa
    // Tu código aquí
  }

  // TODO: Implementar static error para response de error
  static error(message, status = 500) {
    // Crear builder con response de error
    // Tu código aquí
  }

  // TODO: Implementar static notFound para 404
  static notFound(message = 'Not Found') {
    // Crear builder con 404
    // Tu código aquí
  }

  // TODO: Implementar static unauthorized para 401
  static unauthorized(message = 'Unauthorized') {
    // Crear builder con 401
    // Tu código aquí
  }
}

// Error Response Templates
class ErrorTemplates {
  // TODO: Implementar networkError
  static networkError() {
    // Template para error de red
    // Tu código aquí
  }

  // TODO: Implementar timeoutError
  static timeoutError() {
    // Template para timeout
    // Tu código aquí
  }

  // TODO: Implementar validationError
  static validationError(fields) {
    // Template para error de validación
    // Tu código aquí
  }

  // TODO: Implementar serverError
  static serverError(message = 'Internal Server Error') {
    // Template para error 500
    // Tu código aquí
  }
}

module.exports = { MockResponseBuilder, ErrorTemplates };
