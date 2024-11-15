import { test } from '@playwright/test';
import { GiftingPage } from '../support/pages/GiftingPage';

test.only('test gifting flow', async ({ page }) => {
  const giftingPage = new GiftingPage(page);

  await page.goto('https://development-members-app4-2jv3ndpkoa-ue.a.run.app/gifting');

  // Seleccionar membresía
  await giftingPage.selectMembership();

  // Incrementar cantidad
  await giftingPage.incrementQuantity();

  // Continuar al siguiente paso
  await giftingPage.continue();
  await giftingPage.continue();

  // Llenar detalles de la tarjeta
  await giftingPage.fillCardDetails('Lucas Emanuel Rivas Hernandez', '4111111111111111', '12 / 25', '737');

  // Seleccionar país
  await giftingPage.selectCountry();

  // Llenar dirección
  await giftingPage.fillAddress('Willow Ave', '800', 'Hercules', 'CA', '90001');

  // Llenar email
  await giftingPage.fillEmail('lucas_emanuel@gmail.com');

  // Realizar compra
  await giftingPage.purchase();

  // Continuar a detalles del destinatario
  await giftingPage.continueToRecipientDetails();

  // Llenar detalles de los destinatarios
  await giftingPage.fillRecipientDetails([
    { name: 'Lucy Bustos', date: '11/22/2024', email: 'lucy_bustos@gmail.com', phone: '+1 510-313-4382', message: 'gift message' },
    { name: 'Coco Rios', date: '11/22/2024', email: 'coco.rios@hotmail.com', phone: '+1 (510) 313-4385', message: 'gift test message' }
  ]);

  // Aceptar términos y enviar
  await giftingPage.agreeAndSend();

  // Regalar otra membresía
  await giftingPage.giftAnotherMembership();
});
