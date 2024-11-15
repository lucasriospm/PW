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

  async fillCardDetails(name: string, cardNumber: string, expiryDate: string, cvc: string) {
    console.log("Llenando nombre en la tarjeta...");
    await this.page.locator(giftingSelectors.nameOnCard).fill(name);
  
    console.log("Localizando iframe del número de tarjeta...");
    const cardIframeSelector = 'iframe[src*="js.stripe.com"]';
    const cardIframeElement = await this.page.locator(cardIframeSelector).first();
    const cardFrame = await cardIframeElement.contentFrame();
    if (!cardFrame) throw new Error('No se pudo cargar el contenido del iframe del número de tarjeta.');
  
    console.log("Localizando campo del número de tarjeta...");
    const cardNumberInput = cardFrame.locator('input[name="cardnumber"]');
    await cardNumberInput.waitFor({ state: 'visible', timeout: 60000 });
    console.log("Llenando el número de tarjeta...");
    await cardNumberInput.fill(cardNumber);
  
    console.log("Localizando iframe de la fecha de vencimiento...");
    const expiryIframeElement = await this.page.locator(cardIframeSelector).nth(1); // Segundo iframe para expiry
    const expiryFrame = await expiryIframeElement.contentFrame();
    if (!expiryFrame) throw new Error('No se pudo cargar el contenido del iframe de la fecha de vencimiento.');
  
    console.log("Localizando campo de fecha de vencimiento...");
    const expiryDateInput = expiryFrame.locator('input[placeholder="MM / YY"]');
    await expiryDateInput.waitFor({ state: 'visible', timeout: 60000 });
    await expiryDateInput.fill(expiryDate);
  
    console.log("Localizando iframe del CVC...");
    const cvcIframeElement = await this.page.locator(cardIframeSelector).nth(2); // Tercer iframe para CVC
    const cvcFrame = await cvcIframeElement.contentFrame();
    if (!cvcFrame) throw new Error('No se pudo cargar el contenido del iframe del CVC.');
  
    console.log("Localizando campo del CVC...");
    const cvcInput = cvcFrame.locator('input[placeholder="CVC"]');
    await cvcInput.waitFor({ state: 'visible', timeout: 60000 });
    await cvcInput.fill(cvc);
  }
  
  async selectCountry() {
    await this.page.locator(giftingSelectors.countrySelect).first().click();
  }

  async fillAddress(street: string, apt: string, city: string, state: string, zip: string) {
    console.log("Llenando dirección...");
    await this.page.locator(giftingSelectors.streetAddress).fill(street);
    await this.page.locator(giftingSelectors.apt).fill(apt);
    await this.page.locator(giftingSelectors.city).fill(city);
  
    console.log("Abriendo el menú desplegable de estado...");
    const stateDropdown = this.page.locator(giftingSelectors.state);
    await stateDropdown.click(); // Abre el menú desplegable
  
    // Esperar a que aparezca la lista desplegable y seleccionar la opción deseada
    const stateOption = this.page.locator(`.ant-select-item-option-content:has-text("${state}")`);
    await stateOption.waitFor({ state: 'visible', timeout: 5000 });
    await stateOption.click();
  
    console.log("Llenando código postal...");
    await this.page.locator(giftingSelectors.zip).fill(zip);
  }   
  
  async fillEmail(email: string) {
    console.log("Esperando a que el contenedor principal de la sección de pago esté visible...");
  
    // Seleccionar el contenedor principal de la sección de pago
    const paymentContainer = this.page.locator('.giftingCheckoutstyled__PaymentContainer-sc-1jbyls9-10');
    
    // Verificar si el contenedor principal está en el DOM
    if (await paymentContainer.count() === 0) {
      throw new Error("El contenedor principal de la sección de pago no está presente en el DOM.");
    }
  
    await paymentContainer.waitFor({ state: 'visible', timeout: 60000 });
  
    // Depurar y ver el contenido del contenedor principal
    console.log("Contenido del contenedor principal:", await paymentContainer.innerHTML());
  
    // Intentar localizar el campo de correo electrónico dentro del contenedor
    const emailField = paymentContainer.locator('input#email');
  
    if (await emailField.count() === 0) {
      throw new Error("El campo de correo electrónico no se encontró dentro del contenedor de pago.");
    }
  
    await emailField.waitFor({ state: 'visible', timeout: 60000 });
    console.log("Llenando el campo de correo electrónico...");
    await emailField.fill(email);
  }  
  
  async purchase() {
    await this.page.locator(giftingSelectors.purchaseButton).click();
  }

  async continueToRecipientDetails() {
    await this.page.locator(giftingSelectors.recipientDetailsButton).click();
  }

  async fillRecipientDetails(recipients: Array<{ name: string, date: string, email: string, phone: string, message: string }>) {
    console.log("Buscando el formulario de destinatarios en el DOM...");
  
    const recipientForm = this.page.locator(giftingSelectors.recipientForm);
  
    // Verifica que el formulario esté presente en el DOM
    const formCount = await recipientForm.count();
    if (formCount === 0) {
      throw new Error("No se encontró ningún formulario de destinatarios en el DOM.");
    }
  
    console.log("Llenando el formulario con los datos proporcionados...");
  
    for (const recipient of recipients) {
      console.log(`Llenando datos del destinatario: ${recipient.name}`);
      
      await recipientForm.locator(giftingSelectors.recipientName).fill(recipient.name);
      await recipientForm.locator('input[id^="\\30 _deliveryDate"]').fill(recipient.date); // Selector ajustado
      await recipientForm.locator(giftingSelectors.recipientEmail).fill(recipient.email);
      await recipientForm.locator(giftingSelectors.recipientPhone).fill(recipient.phone);
      await recipientForm.locator(giftingSelectors.giftMessage).fill(recipient.message);
    }
  
    console.log("Formulario completado con todos los datos.");
  }

  //Problemas al diferenciar un formulario especifico. Se llena un formulario pero el siguiente reemplaza los datos en el primer formulario en lugar de llenar el de abajo.
  //Probablemente un error en los selectores de la funcion fillRecipentDetails (recipentForm, recipentName, deliveryDate, etc..)

async agreeAndSend() {
    console.log("Marcando la casilla de acuerdo...");
    await this.page.locator(giftingSelectors.agreeCheckbox).first().click();
  
    console.log("Esperando a que el botón de envío esté habilitado...");
    const sendButton = this.page.locator(giftingSelectors.sendButton);
  
    while (!(await sendButton.isEnabled())) {
      await this.page.waitForTimeout(500);
    }
  
    console.log("Haciendo clic en el botón de envío...");
    await sendButton.click();
  }  

  async giftAnotherMembership() {
    await this.page.locator(giftingSelectors.giftAnotherButton).click();
  }
}
