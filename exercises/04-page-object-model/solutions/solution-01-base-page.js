/**
 * Solución 01: BasePage Abstract Class (JavaScript)
 */

class BasePage {
  constructor(page) {
    this.page = page;
    this.timeout = 30000;
  }

  async waitForElement(selector, options = {}) {
    const timeout = options.timeout || this.timeout;
    const state = options.state || 'visible';
    
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state, timeout });
      return element;
    } catch (error) {
      throw new Error(`Element "${selector}" not found within ${timeout}ms: ${error.message}`);
    }
  }

  async safeClick(selector, options = {}) {
    try {
      const element = await this.waitForElement(selector, options);
      await element.click({
        force: options.force || false,
        button: options.button || 'left',
        timeout: options.timeout || this.timeout
      });
    } catch (error) {
      throw new Error(`Failed to click "${selector}": ${error.message}`);
    }
  }

  async safeType(selector, text, options = {}) {
    try {
      const element = await this.waitForElement(selector, options);
      
      if (options.clear !== false) {
        await element.clear();
      }
      
      await element.fill(text, {
        timeout: options.timeout || this.timeout
      });
    } catch (error) {
      throw new Error(`Failed to type in "${selector}": ${error.message}`);
    }
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }

  async navigate(url) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async isLoaded() {
    throw new Error('isLoaded() must be implemented by subclass');
  }

  async getTitle() {
    return await this.page.title();
  }

  async getURL() {
    return this.page.url();
  }

  async waitForURL(urlPattern, options = {}) {
    const timeout = options.timeout || this.timeout;
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async scrollToElement(selector) {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  async isElementVisible(selector) {
    try {
      const element = this.page.locator(selector);
      return await element.isVisible();
    } catch {
      return false;
    }
  }

  async isElementEnabled(selector) {
    try {
      const element = this.page.locator(selector);
      return await element.isEnabled();
    } catch {
      return false;
    }
  }

  async getText(selector) {
    const element = await this.waitForElement(selector);
    return await element.textContent();
  }

  async getAttribute(selector, attribute) {
    const element = await this.waitForElement(selector);
    return await element.getAttribute(attribute);
  }

  async waitAndClick(selector, options = {}) {
    await this.waitForElement(selector, options);
    await this.safeClick(selector, options);
  }

  async waitAndType(selector, text, options = {}) {
    await this.waitForElement(selector, options);
    await this.safeType(selector, text, options);
  }

  async takeScreenshot(name) {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async reload() {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async goBack() {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async goForward() {
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }
}

module.exports = { BasePage };
