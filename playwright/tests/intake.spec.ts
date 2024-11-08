import { test, expect } from '@playwright/test';

// Función para iniciar sesión
async function login(page) {
  await page.goto('https://development-members-app-2jv3ndpkoa-ue.a.run.app/login');
  await page.getByPlaceholder('Email').fill('emmanuel.sotomayor+residual3@functionhealth.com');
  await page.getByPlaceholder('Password').fill('Password10!');
  await page.getByRole('button', { name: 'Login' }).click();
  
  // Validación de inicio de sesión exitoso (Texto Let's get started es visible)
  const successMessageLocator = 'span:has-text("Lets get started")';
  await expect(page.locator(successMessageLocator)).toBeVisible({ timeout: 50000 });
  await page.waitForTimeout(10000); // Esperar 10 segundos adicionales para asegurar que la página cargue
  await expect(page.locator(successMessageLocator)).toBeVisible({ timeout: 50000 }).catch(async (error) => {
    console.error('Error: ', error);
    await page.screenshot({ path: 'login-error.png' });
    throw error;
  });
}

// Función para navegar a la página de visitas de laboratorio
async function navigateToLabVisits(page) {
  await page.goto('https://development-members-app-2jv3ndpkoa-ue.a.run.app/schedule-lab-visits/3e950fa1-9d70-41bd-8323-6f0ea65e6e9b');
  await expect(page).toHaveURL(/schedule-lab-visits/);
}

// Función para completar la sección de información personal
async function completePersonalInfo(page) {
  await page.locator('span').filter({ hasText: 'Get Started' }).nth(2).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByPlaceholder('Preferred first name').fill('Emma');
  await page.getByRole('button', { name: 'Continue' }).click();
  const preferredNameValidationSelector = 'text=Preferred first name';
  await expect(page.locator(preferredNameValidationSelector)).toBeVisible({ timeout: 50000 });
}

// Función para completar la sección de metas de salud
async function completeHealthGoals(page) {
  await page.getByRole('textbox').fill('Maintain a healthy weight through a balanced diet and regular exercise');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('textbox')).toHaveValue('Maintain a healthy weight through a balanced diet and regular exercise');
}

// Función para completar la sección de origen étnico
async function completeEthnicity(page) {
  await page.getByPlaceholder('e.g. Native American, Mexican').fill('Hispanic');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByPlaceholder('e.g. Native American, Mexican')).toHaveValue('Hispanic');
}

// Función para completar la sección de restricciones alimentarias
async function completeDietaryRestrictions(page) {
  await page.getByText('No', { exact: true }).click();
  await page.getByLabel('No').click();
  await page.locator('label').filter({ hasText: 'No eggs' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
}

// Función para seleccionar "No eggs" y hacer clic en "Continue"
async function completeNoEggsSection(page) {
  console.log('Esperando a que la opción "No eggs" sea visible...');
  const noEggsLabel = page.locator('label').filter({ hasText: 'No eggs' });
  await noEggsLabel.waitFor({ state: 'visible' }).catch(error => {
    console.error('La opción "No eggs" no se volvió visible:', error);
    throw error;
  });
  console.log('La opción "No eggs" es visible. Haciendo clic en la opción...');
  await noEggsLabel.click();
  console.log('Opción "No eggs" seleccionada.');
  console.log('Esperando a que el botón "Continue" sea visible...');
  const continueButton = page.getByRole('button', { name: 'Continue' }).first();
  await continueButton.waitFor({ state: 'visible' }).catch(error => {
    console.error('El botón "Continue" no se volvió visible:', error);
    throw error;
  });
  console.log('El botón "Continue" es visible. Haciendo clic en el botón...');
  await continueButton.click();
  console.log('Botón Continue presionado.');
}

// Función para completar la sección de frecuencia de ejercicio
async function completeExerciseFrequency(page) {
  console.log('Esperando a que el radio button "Once or twice a week" sea visible...');
  const exerciseFrequencyLabel = page.getByLabel('Once or twice a week');
  await exerciseFrequencyLabel.waitFor({ state: 'visible' }).catch(error => {
    console.error('El radio button "Once or twice a week" no se volvió visible:', error);
    throw error;
  });
  console.log('El radio button "Once or twice a week" es visible.');
  await exerciseFrequencyLabel.check();
  const isChecked = await exerciseFrequencyLabel.isChecked();
  if (isChecked) {
    console.log('Frecuencia de ejercicio seleccionada correctamente.');
  } else {
    console.error('La frecuencia de ejercicio "Once or twice a week" no se seleccionó.');
    return;
  }
  console.log('Esperando a que el botón "Continue" sea visible...');
  const continueButton = page.getByRole('button', { name: 'Continue' }).first();
  await continueButton.waitFor({ state: 'visible' }).catch(error => {
    console.error('El botón "Continue" no se volvió visible:', error);
    throw error;
  });
  console.log('El botón "Continue" es visible. Haciendo clic en el botón...');
  await continueButton.click();
  console.log('Botón Continue presionado.');
}

// Función para completar la sección de monitoreo de salud
async function completeHealthMonitoring(page) {
  console.log('Esperando a que el contenedor de monitoreo de salud sea visible...');
  const healthMonitoringLabel = page.locator('label').filter({ hasText: 'I use a fitness tracker' });
  await healthMonitoringLabel.waitFor({ state: 'visible' }).catch(error => {
    console.error('La opción de monitoreo de salud no se volvió visible:', error);
    throw error;
  });
  console.log('La opción de monitoreo de salud es visible. Haciendo clic en la opción...');
  await healthMonitoringLabel.click();
  console.log('Opción de monitoreo de salud seleccionada.');
  console.log('Esperando a que el botón "Continue" sea visible...');
  const continueButton = page.getByRole('button', { name: 'Continue' }).first();
  await continueButton.waitFor({ state: 'visible' }).catch(error => {
    console.error('El botón "Continue" no se volvió visible:', error);
    throw error;
  });
  console.log('El botón "Continue" es visible. Haciendo clic en el botón...');
  await continueButton.click();
  console.log('Botón Continue presionado.');
}

// Función para completar la sección de motivación
async function completeMotivation(page) {
  console.log('Esperando a que la sección de motivación sea visible...');
  const motivationLabel = page.getByLabel('Stay healthy for my family');
  await motivationLabel.waitFor({ state: 'visible' }).catch(error => {
    console.error('La sección de motivación no se volvió visible:', error);
    throw error;
  });
  console.log('La sección de motivación es visible.');
  await motivationLabel.check();
  const isChecked = await motivationLabel.isChecked();
  if (isChecked) {
    console.log('Motivación seleccionada correctamente.');
  } else {
    console.error('La motivación no se seleccionó.');
    return;
  }
  console.log('Esperando a que el botón "Continue" sea visible...');
  const continueButton = page.getByRole('button', { name: 'Continue' }).first();
  await continueButton.waitFor({ state: 'visible' }).catch(error => {
    console.error('El botón "Continue" no se volvió visible:', error);
    throw error;
  });
  console.log('El botón "Continue" es visible. Haciendo clic en el botón...');
  await continueButton.click();
  console.log('Botón Continue presionado.');
}

// Test principal
test('test', async ({ page }) => {
  // Iniciar sesión
  await login(page);

  // Navegar a la página de visitas de laboratorio
  await navigateToLabVisits(page);

  // Completar la información personal
  await completePersonalInfo(page);

  // Completar metas de salud
  await completeHealthGoals(page);

  // Completar origen étnico
  await completeEthnicity(page);

  // Completar restricciones alimentarias
  await completeDietaryRestrictions(page);

  // Completar sección No Eggs
  await completeNoEggsSection(page);

  // Completar frecuencia de ejercicio
  await completeExerciseFrequency(page);

  // Completar monitoreo de salud
  await completeHealthMonitoring(page);

  // Completar sección de motivación
  //await completeMotivation(page);
});
