import { Page} from "@playwright/test";
import * as dotenv from "dotenv";
import selectors from "../selectors/loginSelectors";
import * as helpers from "../helpers/actionHelpers";
import homeSelectors from "../selectors/homeSelectors";

dotenv.config();

class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }


  getPage(): Page{
    return this.page
  }

  async selectOption(selector: string, optionValue: string): Promise<void> {
    console.log("select option");
    await helpers.selectOption(this.page, selector, optionValue);
  }

  async fillInput(selector: string, text: string): Promise<void> {
    console.log(`fill input on selector: ${selector}`);
    await helpers.fillInput(this.page, selector, text);
  }

  async clearInputField(selector: string, force = false): Promise<void> {
    console.log(`clear input on selector: ${selector}`);
    await helpers.clearInputField(this.page, selector, force);
  }

  public async navigateToProfile() {
    console.log("navigate to profile");
    await this.waitAndClick(homeSelectors.homePage.buttons.profile);
    await this.waitAndClick(homeSelectors.homePage.buttons.details);
    await this.page.waitForSelector(profileSelectors.profileTitle, { state: 'visible' });
  }

  async waitForElementAndSelectOption(selector: string, optionValue: string): Promise<void> {
    console.log("wait for element and select option");
    await helpers.waitForElementAndDoAction(this.page, selector, async (element) => {
      await element.selectOption(optionValue);
    });
  }

  async waitForElementAndUploadFile(selector: string, filePath: string): Promise<void> {
    console.log("wait for element and upload file");
    await helpers.uploadFile(this.page, selector, filePath);
  }

  async waitForElementAndDoubleClick(selector: string): Promise<void> {
    console.log("wait for element and double click: ", selector);
    await helpers.doubleClick(this.page, selector);
  }

  async waitForElementToBeVisible(selector: string): Promise<void> {
    console.log("wait for element to be visible: ", selector);
    await helpers.waitForVisibility(this.page, selector);
  }

  async goTo(url: string): Promise<void> {
    console.log("navigate to url: ", url);
    await helpers.goTo(this.page, url);
  }

  async waitAndClick(selector: string, force = false, timeout = Number(process.env.ACTION_TIMEOUT) || 45000): Promise<void> {
    console.log("wait and click: ", selector);
    await helpers.waitAndClick(this.page, selector, force, timeout);
  }

  async forceClick(selector: string): Promise<void> {
    console.log("force click: ", selector);
    await helpers.forceClick(this.page, selector);
  }

  async waitForElement(selector: string): Promise<void> {
    console.log("wait for element: ", selector);
    await helpers.waitForElement(this.page, selector);
  }
  async waitForImageToBeVisible(testId: string, imageSrc: string): Promise<void> {
    console.log(`Waiting for image with src "${imageSrc}" to be visible`);
    await helpers.waitForSelectorWithAttribute(this.page, "img", "src", imageSrc, `[data-testid="${testId}"]`);
  }


  async hoverOverElement(selector: string): Promise<void> {
    console.log("hover element");
    await helpers.hoverOverElement(this.page, selector);
  }

  async login(): Promise<void> {
    const username = process.env.QA_USERNAME || "";
    const password = process.env.QA_PASSWORD || "";
    const baseURL = process.env.BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
  }

  async navigateFeed(): Promise<void> {
    const baseURL = process.env.BASE_URL || "";
    await this.page.goto(baseURL);
  }

  public async navigateToComponentManager(): Promise<void> {
    console.log("navigate to component manager");
    await this.waitAndClick(homeSelectors.homePage.buttons.development);
    await this.waitAndClick(homeSelectors.homePage.buttons.componentManager);
    await this.page.waitForTimeout(5000);
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  public async navigateToPageManager(): Promise<void> {
    console.log("navigate to page manager");
    await this.waitAndClick(homeSelectors.homePage.buttons.development);
    await this.waitAndClick(homeSelectors.homePage.buttons.pageManager);
    await this.page.waitForTimeout(5000);
    await this.page.reload();
    await this.page.waitForLoadState("load");
  }

  protected async fillLogin(username, password): Promise<void> {
    try {
      await this.waitAndClick(selectors.loginPage.inputs.username, false, 10000);
      await this.fillInput(selectors.loginPage.inputs.username, username);
      await this.fillInput(selectors.loginPage.inputs.password, password);
      await this.waitAndClick(selectors.loginPage.buttons.login);
    } catch {
      await this.waitAndClick(selectors.keyCloakLoginPage.inputs.username);
      await this.fillInput(selectors.keyCloakLoginPage.inputs.username, username);
      await this.fillInput(selectors.keyCloakLoginPage.inputs.password, password);
      await this.waitAndClick(selectors.keyCloakLoginPage.buttons.login);
    }
  }
  
  public async glenmedeLogin(): Promise<void> {
    console.log("Log in as Jenn test");
    const username = process.env.GLN_TEST_USERNAME || "";
    const password = process.env.GLN_TEST_PASSWORD || "";
    const baseURL = process.env.TEST_GLN_BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
    await this.page.waitForSelector(homeSelectors.homePage.buttons.development);
  }

  //ACCESS
  async loginQA1(): Promise<void> {
    console.log("Log in as QA 1");
    const username = process.env.QA1_USERNAME || "";
    const password = process.env.QA1_PASSWORD || "";
    const baseURL = process.env.BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
    await this.page.waitForSelector(homeSelectors.homePage.buttons.development);
  }

  async loginQA2(): Promise<void> {
    console.log("Log in as QA 2");
    const username = process.env.QA2_USERNAME || "";
    const password = process.env.QA2_PASSWORD || "";
    const baseURL = process.env.BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
    await this.page.waitForSelector(homeSelectors.homePage.buttons.development);
  }

  async loginAsLena(): Promise<void> {
    console.log("Login as Lena");
    const username = process.env.PRODUCT_USER1 || "";
    const password = process.env.PRODUCT_PASS || "";
    const baseURL = process.env.BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
    await this.page.waitForSelector(homeSelectors.homePage.buttons.development);
    await this.page.waitForLoadState("networkidle");
  }

  async loginAsJohan(): Promise<void> {
    console.log("Login as Johan");
    const username = process.env.PRODUCT_USER2 || "";
    const password = process.env.PRODUCT_PASS || "";
    const baseURL = process.env.BASE_URL || "";

    await this.goTo(baseURL);
    await this.fillLogin(username, password);
    await this.page.waitForSelector(homeSelectors.homePage.buttons.development);
    await this.page.waitForLoadState("networkidle");
  }

  async logoutAndLogQA2(): Promise<void> {
    console.log("log out and log in as QA 2");
    const browser = await this.page.context().browser()
    if (browser) {
      const context = await browser.newContext({ 
        storageState: './sessions/SessionStateQA2.json', 
        recordVideo: {
          dir: './test-results/'
        }
      });
      this.page = await context.newPage();
    }
    await this.checkoutCmsBranch();
    await this.navigateFeed();
  }

  async logoutAndLogQA1(): Promise<void> {
    console.log("log out and log in as QA 1");
    const browser = await this.page.context().browser()
    if (browser) {
      const context = await browser.newContext({ 
        storageState: './sessions/SessionState.json', 
        recordVideo: {
          dir: './test-results/'
        }
      });
      this.page = await context.newPage();
    }

    await this.checkoutCmsBranch();
    await this.navigateFeed();
  }

  async logoutAndLogJohan(): Promise<void> {
    console.log("log out and log in as Albus");
    const browser = await this.page.context().browser()
    if (browser) {
      const context = await browser.newContext({ 
        storageState: './sessions/SessionStateAlbus.json', 
        recordVideo: {
          dir: './test-results/'
        }
      });
      this.page = await context.newPage();
    }

    await this.checkoutCmsBranch();
    await this.navigateFeed();
  }

  async logoutAndLogLena(): Promise<void> {
    console.log("log out and log in as Aurelius");
    const browser = await this.page.context().browser()
    if (browser) {
      // this.page.close()
      const context = await browser.newContext({ 
        storageState: './sessions/SessionStateAurelius.json', 
        recordVideo: {
          dir: './test-results/'
        }
      });
      this.page = await context.newPage();
    }

    await this.checkoutCmsBranch();
    await this.navigateFeed();
  }

  async checkoutCmsBranch(): Promise<void> {
    await this.navigateFeed();
    await this.navigateToProfile();
    const inputValue = fs.readFileSync('branchValue.txt', 'utf-8');
    await helpers.clearInputField(this.page, profileSelectors.branchingInput);
    await this.fillInput(profileSelectors.branchingInput, inputValue);
    //force checkout
    await this.page.click(profileSelectors.saveButton);
    await this.page.waitForTimeout(4000);
    await this.page.click(profileSelectors.saveButton);
    await this.waitForElement(profileSelectors.alertSelector);
    await this.page.waitForTimeout(10000);
  }

  async deleteCmsBranch(): Promise<void> {
    await this.checkoutCmsBranch();
    //delete branch
    await this.waitAndClick(profileSelectors.deleteBranchButton);
    await this.waitForElement(profileSelectors.alertSelector);
  }

  //MOVE TO FEED
  async setSliderValue(selector: string, value: number): Promise<void> {
    console.log("set slider value");
    if (value < 0 || value > 10) {
      throw new Error("Value must be between 0 and 10.");
    }

    const slider = this.page.locator(selector);
    await slider.waitFor({ state: "visible" });

    await slider.scrollIntoViewIfNeeded();

    const sliderBox = await slider.boundingBox();
    if (!sliderBox) {
      throw new Error("Slider not found.");
    }

    const stepWidth = sliderBox.width / 10;
    const xOffset = stepWidth * value;

    await this.page.mouse.click(sliderBox.x + xOffset, sliderBox.y + 1);
  }

}

export default BasePage;
