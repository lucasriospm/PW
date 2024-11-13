export const giftingSelectors = {
  // Otros selectores
  membershipCard: 'div.giftingSelectMembershipstyled__CardsContainer-sc-rqvq4x-6.jWdLaJ > div:nth-child(1) > div.giftingSelectMembershipstyled__QuantityControlContainer-sc-rqvq4x-25.jIPLyV > div.giftingSelectMembershipstyled__QuantityButtonIconContainer-sc-rqvq4x-26.jbEvxi',
  quantityButton: 'div.giftingSelectMembershipstyled__QuantityControlContainer-sc-rqvq4x-25.jIPLyV > div.giftingSelectMembershipstyled__QuantityButtonIconContainer-sc-rqvq4x-26.jbEvxi',
  continueButton: 'button.giftingSelectMembershipstyled__ContinueButton-sc-rqvq4x-32.bcAzIf', // Selector más específico para el botón Continue
  continueAsGuestButton: 'button.ant-btn.ant-btn-primary:has-text("Continue as a Guest")', // Selector específico para "Continue as a Guest"
  nameOnCard: 'input[placeholder="Name on card"]',
  cvcIframe: 'iframe[name^="__privateStripeFrame"]',
  cvcInput: 'input[placeholder="CVC"]',
  countrySelect: 'text=United States',
  streetAddress: 'input[placeholder="Street address"]',
  apt: 'input[placeholder="Apt"]',
  city: 'input[placeholder="City"]',
  state: '#state',
  zip: 'input[placeholder="Zip"]',
  email: 'input[role="textbox"][name="Email"]',
  purchaseButton: 'button:has-text("Purchase")',
  recipientDetailsButton: 'text=Continue to Recipient Details',
  recipientName: '[id^="\\30 _name"]',
  deliveryDate: '[id^="\\30 _deliveryDate"]',
  recipientEmail: '[id^="\\30 _email"]',
  recipientPhone: '[id^="\\30 _phoneNumber"]',
  giftMessage: '[id^="\\30 _message"]',
  agreeCheckbox: 'label:has-text("I agree to Function’s Gift") span',
  sendButton: 'button:has-text("Send")',
  giftAnotherButton: 'text=Gift Another Membership'
};

