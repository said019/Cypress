/**
 * Solución 01: BasePage Abstract Class (TypeScript)
 */

import { Page, Locator } from '@playwright/test';

interface WaitOptions {
  timeout?: number;
  state?: 'attached' | 'detached' | 'visible' | 'hidden';
}

interface ClickOptions extends WaitOptions {
  force?: boolean;
  button?: 'left' | 'right' | 'middle';
}

interface TypeOptions extends WaitOptions {
  clear?: boolean;
  delay?: number;
}

abstract class BasePage {
  protected page: Page;
  protected timeout: number;

  constructor(page: Page) {
    this.page = page;
    this.timeout = 30000;
  }

  async waitForElement(selector: string, options: WaitOptions = {}): Promise<Locator> {
    const timeout = options.timeout || this.timeout;
    const state = options.state || 'visible';
    
    try {
      const element = this.page.locator(selector);
      await element.waitFor({ state, timeout });
      return element;
    } catch (error) {
      throw new Error(`Element "${selector}" not found within ${timeout}ms: ${(error as Error).message}`);
    }
  }

  async safeClick(selector: string, options: ClickOptions = {}): Promise<void> {
    try {
      const element = await this.waitForElement(selector, options);
      await element.click({
        force: options.force || false,
        button: options.button || 'left',
        timeout: options.timeout || this.timeout
      });
    } catch (error) {
      throw new Error(`Failed to click "${selector}": ${(error as Error).message}`);
    }
  }

  async safeType(selector: string, text: string, options: TypeOptions = {}): Promise<void> {
    try {
      const element = await this.waitForElement(selector, options);
      
      if (options.clear !== false) {
        await element.clear();
      }
      
      await element.fill(text, {
        timeout: options.timeout || this.timeout
      });
    } catch (error) {
      throw new Error(`Failed to type in "${selector}": ${(error as Error).message}`);
    }
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForLoadState('networkidle', { timeout: 10000 }).catch(() => {});
  }

  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  abstract isLoaded(): Promise<boolean>;

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getURL(): Promise<string> {
    return this.page.url();
  }

  async waitForURL(urlPattern: string | RegExp, options: WaitOptions = {}): Promise<void> {
    const timeout = options.timeout || this.timeout;
    await this.page.waitForURL(urlPattern, { timeout });
  }

  async scrollToElement(selector: string): Promise<void> {
    const element = this.page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      return await element.isVisible();
    } catch {
      return false;
    }
  }

  async isElementEnabled(selector: string): Promise<boolean> {
    try {
      const element = this.page.locator(selector);
      return await element.isEnabled();
    } catch {
      return false;
    }
  }

  async getText(selector: string): Promise<string> {
    const element = await this.waitForElement(selector);
    return await element.textContent() || '';
  }

  async getAttribute(selector: string, attribute: string): Promise<string | null> {
    const element = await this.waitForElement(selector);
    return await element.getAttribute(attribute);
  }

  async waitAndClick(selector: string, options: ClickOptions = {}): Promise<void> {
    await this.waitForElement(selector, options);
    await this.safeClick(selector, options);
  }

  async waitAndType(selector: string, text: string, options: TypeOptions = {}): Promise<void> {
    await this.waitForElement(selector, options);
    await this.safeType(selector, text, options);
  }

  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  }

  async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }

  async goForward(): Promise<void> {
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
    await this.waitForPageLoad();
  }
}

export { BasePage, WaitOptions, ClickOptions, TypeOptions };
