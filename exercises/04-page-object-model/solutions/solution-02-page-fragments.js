/**
 * Solución 02: PageFragment Components (JavaScript)
 */

class HeaderFragment {
  constructor(page, containerSelector = 'header') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible() {
    return await this.container.isVisible();
  }

  async waitForVisible() {
    await this.container.waitFor({ state: 'visible' });
  }

  async getLogo() {
    return this.container.locator('[data-testid="logo"], .logo, img[alt*="logo" i]').first();
  }

  async clickLogo() {
    const logo = await this.getLogo();
    await logo.click();
  }

  async getNavigationLinks() {
    const links = this.container.locator('nav a, .nav-link');
    const count = await links.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickNavigationLink(linkText) {
    await this.container.locator(`nav a:has-text("${linkText}")`).click();
  }

  async getUserMenu() {
    return this.container.locator('[data-testid="user-menu"], .user-menu, .profile-menu').first();
  }

  async isUserLoggedIn() {
    const userMenu = await this.getUserMenu();
    return await userMenu.isVisible();
  }
}

class FooterFragment {
  constructor(page, containerSelector = 'footer') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible() {
    return await this.container.isVisible();
  }

  async waitForVisible() {
    await this.container.waitFor({ state: 'visible' });
  }

  async getCopyrightText() {
    const copyright = this.container.locator('.copyright, [data-testid="copyright"]').first();
    return await copyright.textContent() || '';
  }

  async getSocialLinks() {
    const links = this.container.locator('.social-links a, [data-testid="social-link"]');
    const count = await links.count();
    const hrefs = [];
    for (let i = 0; i < count; i++) {
      const href = await links.nth(i).getAttribute('href');
      if (href) hrefs.push(href);
    }
    return hrefs;
  }

  async clickSocialLink(platform) {
    await this.container.locator(`a[href*="${platform.toLowerCase()}"]`).first().click();
  }

  async getFooterLinks() {
    const links = this.container.locator('a');
    const count = await links.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      const text = await links.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }
}

class SearchBoxFragment {
  constructor(page, containerSelector = '[role="search"]') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible() {
    return await this.container.isVisible();
  }

  async waitForVisible() {
    await this.container.waitFor({ state: 'visible' });
  }

  async search(query) {
    const input = await this.getSearchInput();
    await input.fill(query);
    await input.press('Enter');
  }

  async getSearchInput() {
    return this.container.locator('input[type="search"], input[type="text"]').first();
  }

  async clearSearch() {
    const input = await this.getSearchInput();
    await input.clear();
  }

  async getSearchResults() {
    const results = this.page.locator('.search-result, [data-testid="search-result"]');
    await results.first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    const count = await results.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      const text = await results.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickSearchResult(index) {
    const results = this.page.locator('.search-result, [data-testid="search-result"]');
    await results.nth(index).click();
  }
}

class NavigationMenuFragment {
  constructor(page, containerSelector = 'nav') {
    this.page = page;
    this.container = page.locator(containerSelector);
  }

  async isVisible() {
    return await this.container.isVisible();
  }

  async waitForVisible() {
    await this.container.waitFor({ state: 'visible' });
  }

  async getMenuItems() {
    const items = this.container.locator('> ul > li, > .menu-item');
    const count = await items.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      const text = await items.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickMenuItem(itemText) {
    await this.container.locator(`li:has-text("${itemText}")`).first().click();
  }

  async hoverMenuItem(itemText) {
    await this.container.locator(`li:has-text("${itemText}")`).first().hover();
  }

  async getSubMenuItems(parentItem) {
    const parent = this.container.locator(`li:has-text("${parentItem}")`).first();
    const subItems = parent.locator('ul li, .submenu li');
    const count = await subItems.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      const text = await subItems.nth(i).textContent();
      if (text) texts.push(text.trim());
    }
    return texts;
  }

  async clickSubMenuItem(parentItem, subItem) {
    await this.hoverMenuItem(parentItem);
    const parent = this.container.locator(`li:has-text("${parentItem}")`).first();
    await parent.locator(`li:has-text("${subItem}")`).first().click();
  }
}

module.exports = {
  HeaderFragment,
  FooterFragment,
  SearchBoxFragment,
  NavigationMenuFragment
};
