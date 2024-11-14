import { Page } from '@playwright/test';
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

  async fillCardDetails(name: string, cardNumber: string, expiryDate: string, cvc: string) {
    await this.page.locator(giftingSelectors.nameOnCard).fill(name);

    const cardIframe = await this.page.locator(giftingSelectors.cvcIframe).first();
    await cardIframe.waitFor({ state: 'attached', timeout: 60000 });
    const cardFrame = await cardIframe.contentFrame();

    if (cardFrame) {
      await cardFrame.locator(giftingSelectors.cardNumber).waitFor({ state: 'visible', timeout: 60000 });
      await cardFrame.locator(giftingSelectors.cardNumber).fill(cardNumber);

      // Utilizando el selector simplificado para fecha de vencimiento
      const expiryDateField = cardFrame.locator(giftingSelectors.expiryDate);
      await expiryDateField.waitFor({ state: 'visible', timeout: 60000 });
      await expiryDateField.fill(expiryDate);

      const cvcField = cardFrame.locator(giftingSelectors.cvcInput);
      await cvcField.waitFor({ state: 'visible', timeout: 60000 });
      await cvcField.fill(cvc);
    } else {
      throw new Error('No se pudo acceder al iframe del formulario de tarjeta');
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
