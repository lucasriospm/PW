import { Page } from "@playwright/test";

export async function waitAndClick(page: Page, selector: string, force = false, timeout: number): Promise<void> {
  await page.waitForSelector(selector, { timeout: timeout});
  // await page.waitForSelector(selector);
  await page.click(selector, { force: force });
}

export async function forceClick(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
  await page.click(selector, { force: true });
}

export async function waitForElement(page: Page, selector: string): Promise<void> {
  await page.waitForSelector(selector);
}

export async function fillAndSubmit(page: Page, selector: string, text: string): Promise<void> {
  await page.fill(selector, text);
  await page.press(selector, "Enter");
}

export async function fillInput(page: Page, selector: string, text: string): Promise<void> {
  await page.fill(selector, text);
}

export async function clearInputField(page: Page, selector: string, force = false): Promise<void> {
  await page.click(selector, { force: force, clickCount: 3 });
  await page.press(selector, "Backspace");
}

export async function clickAndPressBackspace(page: Page, selector: string): Promise<void> {
  await page.click(selector);
  await page.press(selector, "Backspace");
}

export async function hoverOverElement(page: Page, selector: string): Promise<void> {
  await page.hover(selector);
}

export async function goTo(page: Page, url: string): Promise<void> {
  await page.goto(url);
}

export async function selectOption(page: Page, selector: string, optionValue: string): Promise<void> {
  await page.selectOption(selector, optionValue);
}

export async function waitForElementAndDoAction(
  page: Page,
  selector: string,
  action: (element: any) => Promise<void>
): Promise<void> {
  const element = await page.waitForSelector(selector);
  if (await element.isVisible()) {
    await action(element);
  }
}

export async function uploadFile(page: Page, selector: string, filePath: string): Promise<void> {
  const inputUploadHandle = await page.waitForSelector(selector);
  if (await inputUploadHandle.isVisible()) {
    await inputUploadHandle.setInputFiles(filePath);
  }
}

export async function doubleClick(page: Page, selector: string): Promise<void> {
  const element = await page.waitForSelector(selector);
  if (await element.isVisible()) {
    await element.dblclick();
  }
}

export async function waitForVisibility(page: Page, selector: string): Promise<void> {
  const element = await page.waitForSelector(selector, { state: "visible" });
}

export async function waitForXPathAndReturnElement(page: Page, xpath: string): Promise<any> {
  await page.waitForSelector(xpath, { state: "attached" });
  return page.$(xpath);
}

export async function getElementText(page: Page, selector: string): Promise<string> {
  return page.$eval(selector, (element) => element.innerText);
}

export async function elementExists(page: Page, selector: string): Promise<boolean> {
  const element = await page.$(selector);
  return element !== null;
}

export async function findElementAndCheckText(
  page: Page,
  selector: string,
  textToCheck: string
): Promise<{ text: string; isPresent: boolean }> {
  const element = await page.$(selector);
  if (element) {
    const text = await element.evaluate((el) => el.textContent || "");
    return {
      text: text,
      isPresent: text.includes(textToCheck),
    };
  }
  throw new Error(`Element with selector "${selector}" was not found.`);
}

export async function getTextFromElement(page: Page, selector: string): Promise<string> {
  const element = await page.waitForSelector(selector);
  const text = await element.textContent();
  return text || "";
}

export async function typeInTextarea(page: Page, selector: string, text: string): Promise<void> {
  await page.fill(selector, text);
}

export async function waitForSelectorWithAttribute(page: Page, tagName: string, attributeName: string, attributeValue: string, extraSelector: string = ''): Promise<void> {
  const selector = `${tagName}${extraSelector}[${attributeName}="${attributeValue}"]`;
  await page.waitForSelector(selector, { state: "visible" });
  console.log(`Element with ${attributeName}="${attributeValue}" is now visible.`);
}