import { expect, Locator, Page } from "@playwright/test";

export async function expectText(page: Page, selector: string, expectedText: string): Promise<void> {
  await page.waitForSelector(selector);
  const text = await page.innerText(selector);
  expect(text).toContain(expectedText);
}

export async function expectVisible(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector, { state: "visible" });
  const isVisible = await page.isVisible(selector);
  expect(isVisible).toBeTruthy();
}

export async function expectNotVisible(page: Page, selector: string): Promise<void> {
  const isVisible = await page.isVisible(selector);
  expect(isVisible).toBeFalsy();
}

export async function expectTitle(page: Page, expectedTitle: string): Promise<void> {
  await expect(page).toHaveTitle(expectedTitle);
}

export async function expectTextsInContainer(page: Page, containerSelector: string, expectedTexts: string[]): Promise<void> {
  await page.waitForSelector(containerSelector);
  for (const text of expectedTexts) {
    const textExists = await page.locator(containerSelector).locator(`text=${text}`).count() > 0;
    expect(textExists).toBeTruthy();
  }
}

export async function expectClickable(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector, { state: "visible" }); // Ensure the element is visible
  const isEnabled = await page.isEnabled(selector); // Check if the element is enabled
  expect(isEnabled).toBeTruthy(); // Assert the element is clickable
}

export async function expectNotClickable(page: Page, selector: string): Promise<void> {
  const isClickable = await page.isEnabled(selector) && await page.isVisible(selector);
  expect(isClickable).toBeFalsy(); // Assert the element is not clickable
}

export async function expectUndoRedo(undoLocator: Locator, redoLocator: Locator, disabledUndo: boolean, disabledRedo: boolean) {
  await expect(await undoLocator.isDisabled()).toBe(disabledUndo)
  await expect(await redoLocator.isDisabled()).toBe(disabledRedo)
}