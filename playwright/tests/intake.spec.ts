import { test, expect } from '@playwright/test';

// Función para iniciar sesión
async function login(page) {
  await page.goto('https://development-members-app-2jv3ndpkoa-ue.a.run.app/login');
  await page.getByPlaceholder('Email').fill('emmanuel.sotomayor+residual3@functionhealth.com');
  await page.getByPlaceholder('Password').fill('Password10!');
  await page.getByRole('button', { name: 'Login' }).click();
  // Validación de inicio de sesión exitoso
  const successMessageLocator = '#app > div > div > div.appLayoutstyled__Container-sc-w3zvay-5.dxKRVP > main > div.appLayoutstyled__TopContent-sc-w3zvay-2.febHwe > div.appLayoutstyled__Content-sc-w3zvay-4.gBfDym > div > span';
  // Validación de que el mensaje de éxito es visible
  await expect(page.locator(successMessageLocator)).toBeVisible({ timeout: 20000 });
}

// Función para navegar a la página de visitas de laboratorio
async function navigateToLabVisits(page) {
  await page.goto('https://development-members-app-2jv3ndpkoa-ue.a.run.app/schedule-lab-visits/3e950fa1-9d70-41bd-8323-6f0ea65e6e9b');
  // Validación de navegación exitosa
  await expect(page).toHaveURL(/schedule-lab-visits/);
  }

// Función para completar la sección de información personal
async function completePersonalInfo(page) {
  await page.locator('span').filter({ hasText: 'Get Started' }).nth(2).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Preferred first name').fill('Emma');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de que el nombre preferido ha sido ingresado correctamente
  const preferredNameValidationSelector = '#app > div > div > div.appLayoutstyled__Container-sc-w3zvay-5.dxKRVP > main > div.appLayoutstyled__TopContent-sc-w3zvay-2.febHwe > div.appLayoutstyled__Content-sc-w3zvay-4.gBfDym > div > div.scheduleLabVisitsstyled__ContentContainer-sc-yp0iic-2.iHMFBM > form > div.questionnairestyled__CardContainer-sc-4fkcf1-1.jvbmiw > h4';
  // Validar que el texto correspondiente al nombre preferido es visible
  await expect(page.locator(preferredNameValidationSelector)).toBeVisible({ timeout: 10000 });
}

// Función para completar la sección de metas de salud
async function completeHealthGoals(page) {
  await page.getByRole('textbox').fill('Maintain a healthy weight through a balanced diet and regular exercise');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de metas de salud
  await expect(page.getByRole('textbox')).toHaveValue('Maintain a healthy weight through a balanced diet and regular exercise');
}

// Función para completar la sección de origen étnico
async function completeEthnicity(page) {
  await page.getByPlaceholder('e.g. Native American, Mexican').fill('Hispanic');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de origen étnico
  await expect(page.getByPlaceholder('e.g. Native American, Mexican')).toHaveValue('Hispanic');
}

//Hasta acá llega el test corretamente!

// Función para completar la sección de restricciones alimentarias
async function completeDietaryRestrictions(page) {
  // Espera a que el botón de opción "No" sea visible
  await page.waitForSelector('input[type="radio"][value="NO"]', { state: 'visible' });
  // Intenta hacer clic en el botón de opción "No"
  await page.getByLabel('No').click(); // Asegúrate que este selector es correcto
  // Asegúrate de que el siguiente elemento también es visible antes de continuar
  await page.locator('label').filter({ hasText: 'No eggs' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
}


// Función para completar la sección de frecuencia de ejercicio
async function completeExerciseFrequency(page) {
  await page.getByLabel('Once or twice a week').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de frecuencia de ejercicio
  await expect(page.getByLabel('Once or twice a week')).toBeChecked();
}

// Función para completar la sección de duración del ejercicio
async function completeExerciseDuration(page) {
  await page.getByLabel('to 60 minutes').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de duración de ejercicio
  await expect(page.getByLabel('to 60 minutes')).toBeChecked();
}

// Función para completar la sección de tipo de ejercicio
async function completeExerciseType(page) {
  await page.getByText('Yoga').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de tipo de ejercicio
  await expect(page.getByText('Yoga')).toHaveClass(/selected/);
}

// Función para completar la sección de vacunaciones
async function completeVaccinations(page) {
  await page.locator('label').filter({ hasText: 'Pfizer - Dose 2' }).click();
  await page.locator('label').filter({ hasText: 'Pfizer - Dose 1' }).locator('span').nth(1).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de vacunaciones
  await expect(page.locator('label').filter({ hasText: 'Pfizer - Dose 2' }).locator('input')).toBeChecked();
  await expect(page.locator('label').filter({ hasText: 'Pfizer - Dose 1' }).locator('input')).toBeChecked();
}

// Función para completar la sección de condiciones médicas familiares
async function completeFamilyMedicalHistory(page) {
  await page.getByPlaceholder('e.g. Dementia, Lung Cancer,').fill('Lung Cancer');
  await page.getByPlaceholder('Maternal grandmother').fill('Maternal Grandmother');
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de condiciones médicas familiares
  await expect(page.getByPlaceholder('e.g. Dementia, Lung Cancer,')).toHaveValue('Lung Cancer');
  await expect(page.getByPlaceholder('Maternal grandmother')).toHaveValue('Maternal Grandmother');
}

// Función para completar la sección de historial étnico familiar
async function completeFamilyEthnicHistory(page) {
  await page.getByText('Hispanic').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de historial étnico familiar
  await expect(page.getByText('Hispanic')).toHaveClass(/selected/);
}

// Función para completar la sección de motivación
async function completeMotivation(page) {
  await page.getByLabel('To understand my labs').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de motivación
  await expect(page.getByLabel('To understand my labs')).toBeChecked();
}

// Función para completar la sección de monitoreo de salud
async function completeHealthMonitoring(page) {
  await page.getByLabel('Heart health').check();
  await page.getByLabel('Cancer monitoring').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  // Validación de monitoreo de salud
  await expect(page.getByLabel('Heart health')).toBeChecked();
  await expect(page.getByLabel('Cancer monitoring')).toBeChecked();
}

// Test principal
test('test', async ({ page }) => {
  await login(page);
  await navigateToLabVisits(page);
  await completePersonalInfo(page);
  await completeHealthGoals(page);
  await completeEthnicity(page);
  await completeDietaryRestrictions(page);
  await completeExerciseFrequency(page);
  await completeExerciseDuration(page);
  await completeExerciseType(page);
  await completeVaccinations(page);
  await completeFamilyMedicalHistory(page);
  await completeFamilyEthnicHistory(page);
  await completeMotivation(page);
  await completeHealthMonitoring(page);
  // Validación final de la completitud del cuestionario
  await expect(page.locator('text=Your questionnaire is complete! Staying up to date with your information helps')).toBeVisible();
});
