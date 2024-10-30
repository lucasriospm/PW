import { Page } from "@playwright/test";

export async function goTo(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

export async function reloadPage(page: Page): Promise<void> {
  await page.reload();
}

export async function scrollToElement(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  try {
    await page.evaluate((selector) => {
      const element = document.querySelector(selector);
      if (element) element.scrollIntoView();
    }, selector);
  } catch (error) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }
}

export async function navigateToDynamicElement(page: Page, metaDataSelector: () => Promise<string>): Promise<void> {
  const selector = await metaDataSelector();
  await page.click(selector);
}
