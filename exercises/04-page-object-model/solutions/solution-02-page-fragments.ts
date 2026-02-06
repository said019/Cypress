/**
 * Solución 02: PageFragment Components (TypeScript)
 */

import { Page, Locator } from '@playwright/test';

interface IPageFragment {
  isVisible(): Promise<boolean>;
  waitForVisible(): Promise<void>;
}

class HeaderFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'header') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async getLogo(): Promise<Locator> {
    return this.container.locator('[data-testid="logo"], .logo, img[alt*="logo" i]').first();
  }

  async clickLogo(): Promise<void> {
    const logo = await this.getLogo();
    await logo.click();
  }

  async getNavigationLinks(): Promise<string[]> {
    const links = this.container.locator('nav a, .nav-link');
    const count = await links.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickNavigationLink(linkText: string): Promise<void> {
    await this.container.locator(`nav a:has-text("${linkText}")`).click();
  }

  async getUserMenu(): Promise<Locator> {
    return this.container.locator('[data-testid="user-menu"], .user-menu, .profile-menu').first();
  }

  async isUserLoggedIn(): Promise<boolean> {
    const userMenu = await this.getUserMenu();
    return await userMenu.isVisible();
  }
}

class FooterFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'footer') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async getCopyrightText(): Promise<string> {
    const copyright = this.container.locator('.copyright, [data-testid="copyright"]').first();
    return await copyright.textContent() || '';
  }

  async getSocialLinks(): Promise<string[]> {
    const links = this.container.locator('.social-links a, [data-testid="social-link"]');
    const count = await links.count();
    const hrefs: string[] = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  async clickSocialLink(platform: string): Promise<void> {
    await this.container.locator(`a[href*="${platform.toLowerCase()}"]`).first().click();
  }

  async getFooterLinks(): Promise<string[]> {
    const links = this.container.locator('a');
    const count = await links.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }
}

class SearchBoxFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = '[role="search"]') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async search(query: string): Promise<void> {
    const input = await this.getSearchInput();
    await input.fill(query);
    await input.press('Enter');
  }

  async getSearchInput(): Promise<Locator> {
    return this.container.locator('input[type="search"], input[type="text"]').first();
  }

  async clearSearch(): Promise<void> {
    const input = await this.getSearchInput();
    await input.clear();
  }

  async getSearchResults(): Promise<string[]> {
    const results = this.page.locator('.search-result, [data-testid="search-result"]');
    await results.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const count = await results.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickSearchResult(index: number): Promise<void> {
    const results = this.page.locator('.search-result, [data-testid="search-result"]');
    await results.nth(index).click();
  }
}

class NavigationMenuFragment implements IPageFragment {
  private page: Page;
  private container: Locator;

  constructor(page: Page, containerSelector: string = 'nav') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible(): Promise<boolean> {
    return await this.container.isVisible();
  }

  async waitForVisible(): Promise<void> {
    await this.container.waitFor({ state: 'visible' });
  }

  async getMenuItems(): Promise<string[]> {
    const items = this.container.locator('> ul > li, > .menu-item');
    const count = await items.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickMenuItem(itemText: string): Promise<void> {
    await this.container.locator(`li:has-text("${itemText}")`).first().click();
  }

  async hoverMenuItem(itemText: string): Promise<void> {
    await this.container.locator(`li:has-text("${itemText}")`).first().hover();
  }

  async getSubMenuItems(parentItem: string): Promise<string[]> {
    const parent = this.container.locator(`li:has-text("${parentItem}")`).first();
    const subItems = parent.locator('ul li, .submenu li');
    const count = await subItems.count();
    const texts: string[] = [];
    for (let i = 0; i < count; i++) {
      const text = await subItems.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickSubMenuItem(parentItem: string, subItem: string): Promise<void> {
    await this.hoverMenuItem(parentItem);
    const parent = this.container.locator(`li:has-text("${parentItem}")`).first();
    await parent.locator(`li:has-text("${subItem}")`).first().click();
  }
}

export {
  IPageFragment,
  HeaderFragment,
  FooterFragment,
  SearchBoxFragment,
  NavigationMenuFragment
};
