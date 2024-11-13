import { Page, FrameLocator } from '@playwright/test';
import { giftingSelectors } from '../selectors/giftingSelectors';

export class GiftingPage {
  constructor(private page: Page) {}

  async selectMembership() {
    await this.page.locator(giftingSelectors.membershipCard).click();
  }

  async incrementQuantity() {
    await this.page.locator(giftingSelectors.quantityButton).nth(1).click();
  }

  async continue() {
    await this.page.locator(giftingSelectors.continueButton).click();
  }

  async continueAsGuest() {
    await this.page.locator(giftingSelectors.continueAsGuestButton).click();
  }

  async fillCardDetails(name: string, cvc: string) {
    await this.page.locator(giftingSelectors.nameOnCard).fill(name);

    const iframes = await this.page.locator(giftingSelectors.cvcIframe).elementHandles();
    for (const iframe of iframes) {
      const frame = await iframe.contentFrame();
      if (frame) {
        const cvcInput = await frame.locator(giftingSelectors.cvcInput);
        if (await cvcInput.count() > 0) {
          await cvcInput.fill(cvc);
          break;
        }
      }
    }
  }

  async selectCountry() {
    await this.page.locator(giftingSelectors.countrySelect).nth(1).click();
  }

  async fillAddress(street: string, apt: string, city: string, state: string, zip: string) {
    await this.page.locator(giftingSelectors.streetAddress).fill(street);
    await this.page.locator(giftingSelectors.apt).fill(apt);
    await this.page.locator(giftingSelectors.city).fill(city);
    await this.page.locator(giftingSelectors.state).selectOption({ label: state });
    await this.page.locator(giftingSelectors.zip).fill(zip);
  }

  async fillEmail(email: string) {
    await this.page.locator(giftingSelectors.email).fill(email);
  }

  async purchase() {
    await this.page.locator(giftingSelectors.purchaseButton).click();
  }

  async continueToRecipientDetails() {
    await this.page.locator(giftingSelectors.recipientDetailsButton).click();
  }

  async fillRecipientDetails(name: string, date: string, email: string, phone: string, message: string) {
    await this.page.locator(giftingSelectors.recipientName).fill(name);
    await this.page.locator(giftingSelectors.deliveryDate).fill(date);
    await this.page.locator(giftingSelectors.recipientEmail).fill(email);
    await this.page.locator(giftingSelectors.recipientPhone).fill(phone);
    await this.page.locator(giftingSelectors.giftMessage).fill(message);
  }

  async agreeAndSend() {
    await this.page.locator(giftingSelectors.agreeCheckbox).nth(1).click();
    await this.page.locator(giftingSelectors.sendButton).click();
  }

  async giftAnotherMembership() {
    await this.page.locator(giftingSelectors.giftAnotherButton).click();
  }
}
