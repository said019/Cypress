/**
 * Solución 01: NetworkInterceptor Utility (TypeScript)
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

  async interceptRequest(urlPattern: string | RegExp, handler: RequestHandler): Promise<void> {
    const routeHandler: RequestHandler = async (route, request) => {
      await handler(route, request);
    };
    this.routes.set(urlPattern.toString(), routeHandler);
    await this.page.route(urlPattern, routeHandler);
  }

  async mockResponse(urlPattern: string | RegExp, mockData: any, options: MockOptions = {}): Promise<void> {
    await this.page.route(urlPattern, async (route) => {
      if (options.delay) {
        await new Promise(resolve => setTimeout(resolve, options.delay));
      }
      await route.fulfill({
        status: options.status || 200,
        headers: options.headers || { 'Content-Type': 'application/json' },
        body: JSON.stringify(mockData)
      });
    });
  }

  async blockRequest(urlPattern: string | RegExp): Promise<void> {
    await this.page.route(urlPattern, route => route.abort());
  }

  async modifyResponse(urlPattern: string | RegExp, modifier: ResponseModifier): Promise<void> {
    await this.page.route(urlPattern, async (route) => {
      const response = await route.fetch();
      const body = await response.json();
      const modifiedBody = modifier(body);
      await route.fulfill({
        response,
        body: JSON.stringify(modifiedBody)
      });
    });
  }

  async captureRequest(urlPattern: string | RegExp): Promise<void> {
    await this.page.route(urlPattern, async (route, request) => {
      this.interceptedRequests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        timestamp: Date.now()
      });
      await route.continue();
    });
  }

  async captureResponse(urlPattern: string | RegExp): Promise<void> {
    await this.page.route(urlPattern, async (route) => {
      const response = await route.fetch();
      const body = await response.text();
      this.interceptedResponses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        body: body,
        timestamp: Date.now()
      });
      await route.fulfill({ response });
    });
  }

  getInterceptedRequests(urlPattern?: string | RegExp): RequestInfo[] {
    if (!urlPattern) return this.interceptedRequests;
    const pattern = typeof urlPattern === 'string' ? urlPattern : urlPattern.source;
    return this.interceptedRequests.filter(req => 
      req.url.includes(pattern) || new RegExp(pattern).test(req.url)
    );
  }

  getInterceptedResponses(urlPattern?: string | RegExp): ResponseInfo[] {
    if (!urlPattern) return this.interceptedResponses;
    const pattern = typeof urlPattern === 'string' ? urlPattern : urlPattern.source;
    return this.interceptedResponses.filter(res => 
      res.url.includes(pattern) || new RegExp(pattern).test(res.url)
    );
  }

  async waitForRequest(urlPattern: string | RegExp, options: { timeout?: number } = {}): Promise<Request> {
    return await this.page.waitForRequest(urlPattern, options);
  }

  async waitForResponse(urlPattern: string | RegExp, options: { timeout?: number } = {}): Promise<Response> {
    return await this.page.waitForResponse(urlPattern, options);
  }

  clearInterceptions(): void {
    this.interceptedRequests = [];
    this.interceptedResponses = [];
  }

  async removeRoute(urlPattern: string | RegExp): Promise<void> {
    this.routes.delete(urlPattern.toString());
    await this.page.unroute(urlPattern);
  }

  async removeAllRoutes(): Promise<void> {
    for (const pattern of this.routes.keys()) {
      await this.page.unroute(pattern);
    }
    this.routes.clear();
  }

  async validateRequestPayload(urlPattern: string | RegExp, validator: RequestValidator): Promise<void> {
    await this.page.route(urlPattern, async (route, request) => {
      const postData = request.postData();
      if (postData) {
        const payload = JSON.parse(postData);
        if (!validator(payload)) {
          throw new Error(`Invalid request payload for ${request.url()}`);
        }
      }
      await route.continue();
    });
  }

  async delayResponse(urlPattern: string | RegExp, delayMs: number): Promise<void> {
    await this.page.route(urlPattern, async (route) => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await route.continue();
    });
  }
}

class NetworkMonitor {
  private page: Page;
  private requests: RequestInfo[] = [];
  private responses: ResponseInfo[] = [];
  private isMonitoring: boolean = false;

  constructor(page: Page) {
    this.page = page;
  }

  async startMonitoring(): Promise<void> {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    
    this.page.on('request', request => {
      this.requests.push({
        url: request.url(),
        method: request.method(),
        headers: request.headers(),
        postData: request.postData(),
        timestamp: Date.now()
      });
    });

    this.page.on('response', async response => {
      this.responses.push({
        url: response.url(),
        status: response.status(),
        headers: response.headers(),
        timestamp: Date.now()
      });
    });
  }

  async stopMonitoring(): Promise<void> {
    this.isMonitoring = false;
    this.page.removeAllListeners('request');
    this.page.removeAllListeners('response');
  }

  getRequests(filter?: (req: RequestInfo) => boolean): RequestInfo[] {
    if (!filter) return this.requests;
    return this.requests.filter(filter);
  }

  getResponses(filter?: (res: ResponseInfo) => boolean): ResponseInfo[] {
    if (!filter) return this.responses;
    return this.responses.filter(filter);
  }

  getFailedRequests(): RequestInfo[] {
    const failedUrls = this.responses.filter(res => res.status >= 400).map(res => res.url);
    return this.requests.filter(req => failedUrls.includes(req.url));
  }

  clear(): void {
    this.requests = [];
    this.responses = [];
  }

  getSummary(): { total: number; failed: number; successful: number } {
    const failed = this.responses.filter(res => res.status >= 400).length;
    const total = this.responses.length;
    return {
      total,
      failed,
      successful: total - failed
    };
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
