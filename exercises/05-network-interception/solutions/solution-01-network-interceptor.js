/**
 * Solución 01: NetworkInterceptor Utility (JavaScript)
 */

class NetworkInterceptor {
  constructor(page) {
    this.page = page;
    this.interceptedRequests = [];
    this.interceptedResponses = [];
    this.routes = new Map();
  }

  async interceptRequest(urlPattern, handler) {
    const routeHandler = async (route, request) => {
      await handler(route, request);
    };
    this.routes.set(urlPattern.toString(), routeHandler);
    await this.page.route(urlPattern, routeHandler);
  }

  async mockResponse(urlPattern, mockData, options = {}) {
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

  async blockRequest(urlPattern) {
    await this.page.route(urlPattern, route => route.abort());
  }

  async modifyResponse(urlPattern, modifier) {
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

  async captureRequest(urlPattern) {
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

  async captureResponse(urlPattern) {
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

  getInterceptedRequests(urlPattern = null) {
    if (!urlPattern) return this.interceptedRequests;
    return this.interceptedRequests.filter(req => 
      req.url.includes(urlPattern) || new RegExp(urlPattern).test(req.url)
    );
  }

  getInterceptedResponses(urlPattern = null) {
    if (!urlPattern) return this.interceptedResponses;
    return this.interceptedResponses.filter(res => 
      res.url.includes(urlPattern) || new RegExp(urlPattern).test(res.url)
    );
  }

  async waitForRequest(urlPattern, options = {}) {
    return await this.page.waitForRequest(urlPattern, options);
  }

  async waitForResponse(urlPattern, options = {}) {
    return await this.page.waitForResponse(urlPattern, options);
  }

  clearInterceptions() {
    this.interceptedRequests = [];
    this.interceptedResponses = [];
  }

  async removeRoute(urlPattern) {
    this.routes.delete(urlPattern.toString());
    await this.page.unroute(urlPattern);
  }

  async removeAllRoutes() {
    for (const pattern of this.routes.keys()) {
      await this.page.unroute(pattern);
    }
    this.routes.clear();
  }

  async validateRequestPayload(urlPattern, validator) {
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

  async delayResponse(urlPattern, delayMs) {
    await this.page.route(urlPattern, async (route) => {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      await route.continue();
    });
  }
}

class NetworkMonitor {
  constructor(page) {
    this.page = page;
    this.requests = [];
    this.responses = [];
    this.isMonitoring = false;
  }

  async startMonitoring() {
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

  async stopMonitoring() {
    this.isMonitoring = false;
    this.page.removeAllListeners('request');
    this.page.removeAllListeners('response');
  }

  getRequests(filter = null) {
    if (!filter) return this.requests;
    return this.requests.filter(filter);
  }

  getResponses(filter = null) {
    if (!filter) return this.responses;
    return this.responses.filter(filter);
  }

  getFailedRequests() {
    return this.responses.filter(res => res.status >= 400);
  }

  clear() {
    this.requests = [];
    this.responses = [];
  }

  getSummary() {
    const failed = this.getFailedRequests().length;
    const total = this.responses.length;
    return {
      total,
      failed,
      successful: total - failed
    };
  }
}

module.exports = { NetworkInterceptor, NetworkMonitor };
