/**
 * Ejercicio 01: NetworkInterceptor Utility (TypeScript)
 * 
 * Objetivo: Crear utilidad para interceptar y controlar tráfico de red
 */

import { Page, Route, Request, Response } from '@playwright/test';

interface MockOptions {
  status?: number;
  headers?: Record<string, string>;
  delay?: number;
}

interface RequestInfo {
  url: string;
  method: string;
  headers: Record<string, string>;
  postData?: string;
  timestamp: number;
}

interface ResponseInfo {
  url: string;
  status: number;
  headers: Record<string, string>;
  body?: any;
  timestamp: number;
}

type RequestHandler = (route: Route, request: Request) => Promise<void>;
type ResponseModifier = (response: any) => any;
type RequestValidator = (payload: any) => boolean;

class NetworkInterceptor {
  private page: Page;
  private interceptedRequests: RequestInfo[] = [];
  private interceptedResponses: ResponseInfo[] = [];
  private routes: Map<string, RequestHandler> = new Map();

  constructor(page: Page) {
    this.page = page;
  }

  // TODO: Implementar interceptRequest para interceptar requests
  async interceptRequest(urlPattern: string | RegExp, handler: RequestHandler): Promise<void> {
    // Usar page.route para interceptar
    // Guardar route en Map
    // Aplicar handler al request
    // Tu código aquí
  }

  // TODO: Implementar mockResponse para mockear respuestas
  async mockResponse(urlPattern: string | RegExp, mockData: any, options: MockOptions = {}): Promise<void> {
    // Interceptar request
    // Retornar mock data
    // Aplicar delay si se especifica
    // Aplicar status code personalizado
    // Tu código aquí
  }

  // TODO: Implementar blockRequest para bloquear requests
  async blockRequest(urlPattern: string | RegExp): Promise<void> {
    // Interceptar y abortar request
    // Tu código aquí
  }

  // TODO: Implementar modifyResponse para modificar respuestas
  async modifyResponse(urlPattern: string | RegExp, modifier: ResponseModifier): Promise<void> {
    // Interceptar request
    // Obtener response original
    // Aplicar modifier function
    // Retornar response modificada
    // Tu código aquí
  }

  // TODO: Implementar captureRequest para capturar requests
  async captureRequest(urlPattern: string | RegExp): Promise<void> {
    // Interceptar y guardar request
    // Continuar con request normal
    // Tu código aquí
  }

  // TODO: Implementar captureResponse para capturar responses
  async captureResponse(urlPattern: string | RegExp): Promise<void> {
    // Interceptar y guardar response
    // Continuar con response normal
    // Tu código aquí
  }

  // TODO: Implementar getInterceptedRequests
  getInterceptedRequests(urlPattern?: string | RegExp): RequestInfo[] {
    // Retornar requests interceptados
    // Filtrar por pattern si se proporciona
    // Tu código aquí
    return [];
  }

  // TODO: Implementar getInterceptedResponses
  getInterceptedResponses(urlPattern?: string | RegExp): ResponseInfo[] {
    // Retornar responses interceptados
    // Filtrar por pattern si se proporciona
    // Tu código aquí
    return [];
  }

  // TODO: Implementar waitForRequest para esperar request
  async waitForRequest(urlPattern: string | RegExp, options: { timeout?: number } = {}): Promise<Request> {
    // Esperar request que coincida con pattern
    // Retornar request
    // Tu código aquí
    return {} as Request;
  }

  // TODO: Implementar waitForResponse para esperar response
  async waitForResponse(urlPattern: string | RegExp, options: { timeout?: number } = {}): Promise<Response> {
    // Esperar response que coincida con pattern
    // Retornar response
    // Tu código aquí
    return {} as Response;
  }

  // TODO: Implementar clearInterceptions para limpiar
  clearInterceptions(): void {
    // Limpiar arrays de requests/responses
    // Tu código aquí
  }

  // TODO: Implementar removeRoute para remover interceptor
  async removeRoute(urlPattern: string | RegExp): Promise<void> {
    // Remover route del Map
    // Unroute en page
    // Tu código aquí
  }

  // TODO: Implementar removeAllRoutes para remover todos
  async removeAllRoutes(): Promise<void> {
    // Remover todos los routes
    // Tu código aquí
  }

  // TODO: Implementar validateRequestPayload
  async validateRequestPayload(urlPattern: string | RegExp, validator: RequestValidator): Promise<void> {
    // Interceptar request
    // Validar payload con validator function
    // Lanzar error si no válido
    // Tu código aquí
  }

  // TODO: Implementar delayResponse para agregar delay
  async delayResponse(urlPattern: string | RegExp, delayMs: number): Promise<void> {
    // Interceptar request
    // Agregar delay antes de responder
    // Tu código aquí
  }
}

// NetworkMonitor para capturar todo el tráfico
class NetworkMonitor {
  private page: Page;
  private requests: RequestInfo[] = [];
  private responses: ResponseInfo[] = [];
  private isMonitoring: boolean = false;

  constructor(page: Page) {
    this.page = page;
  }

  // TODO: Implementar startMonitoring
  async startMonitoring(): Promise<void> {
    // Comenzar a capturar requests/responses
    // Tu código aquí
  }

  // TODO: Implementar stopMonitoring
  async stopMonitoring(): Promise<void> {
    // Detener captura
    // Tu código aquí
  }

  // TODO: Implementar getRequests
  getRequests(filter?: (req: RequestInfo) => boolean): RequestInfo[] {
    // Retornar requests capturados
    // Aplicar filtro si se proporciona
    // Tu código aquí
    return [];
  }

  // TODO: Implementar getResponses
  getResponses(filter?: (res: ResponseInfo) => boolean): ResponseInfo[] {
    // Retornar responses capturados
    // Tu código aquí
    return [];
  }

  // TODO: Implementar getFailedRequests
  getFailedRequests(): RequestInfo[] {
    // Retornar solo requests fallidos
    // Tu código aquí
    return [];
  }

  // TODO: Implementar clear
  clear(): void {
    // Limpiar arrays
    // Tu código aquí
  }

  // TODO: Implementar getSummary
  getSummary(): { total: number; failed: number; successful: number } {
    // Retornar resumen de tráfico
    // Total requests, responses, failed, etc.
    // Tu código aquí
    return { total: 0, failed: 0, successful: 0 };
  }
}

export {
  NetworkInterceptor,
  NetworkMonitor,
  MockOptions,
  RequestInfo,
  ResponseInfo,
  RequestHandler,
  ResponseModifier,
  RequestValidator
};
