import { test, expect } from '@playwright/test';

async function fillDateField(
  page: import('@playwright/test').Page,
  inputIndex: number,
  selectIndex: number,
  dateValue: string,
  timeValue: string
) {
  const dateInput = page.locator('input[type="date"]').nth(inputIndex);
  await dateInput.evaluate((el: HTMLInputElement, v: string) => {
    el.value = v;
    el.dispatchEvent(new Event('change', { bubbles: true }));
  }, dateValue);
  await page.locator('select').nth(selectIndex).selectOption(timeValue);
}

test.describe('Formulaire de réservation', () => {

  test.beforeEach(async ({ page }) => {
    await page.route('**/api/reservations/disponibilites**', route =>
      route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
    );
    await page.goto('/reservation');
  });

  test('bouton désactivé tant que le formulaire est vide', async ({ page }) => {
    const btn = page.getByRole('button', { name: 'Envoyer la demande' });
    await expect(btn).toBeDisabled();
  });

  test('tous les champs requis sont visibles', async ({ page }) => {
    await expect(page.getByPlaceholder('Ex: Jean Dupont')).toBeVisible();
    await expect(page.getByPlaceholder('votre@email.com')).toBeVisible();
    await expect(page.getByPlaceholder('06 00 00 00 00')).toBeVisible();
    await expect(page.getByPlaceholder('Description de votre événement...')).toBeVisible();
  });

  test('erreur si date de fin est avant la date de début', async ({ page }) => {
    await page.getByPlaceholder('Ex: Jean Dupont').fill('Jean Test');
    await page.getByPlaceholder('votre@email.com').fill('jean@test.fr');
    await page.getByPlaceholder('06 00 00 00 00').fill('0612345678');
    await page.getByPlaceholder('Description de votre événement...').fill('Test événement');

    // Début : 20/09/2027 14h
    await fillDateField(page, 0, 0, '2027-09-20', '14:00');
    // Fin : 19/09/2027 14h (avant le début)
    await fillDateField(page, 1, 1, '2027-09-19', '14:00');

    await page.getByRole('button', { name: 'Envoyer la demande' }).click();
    await expect(page.getByText('La date de fin doit être après la date de début')).toBeVisible();
  });

  test('soumission réussie affiche le message de confirmation', async ({ page }) => {
    await page.route('**/api/reservations', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 999, statut: 'EN_ATTENTE' }),
      })
    );

    await page.getByPlaceholder('Ex: Jean Dupont').fill('Marie Dupont');
    await page.getByPlaceholder('votre@email.com').fill('marie@test.fr');
    await page.getByPlaceholder('06 00 00 00 00').fill('0612345678');
    await page.getByPlaceholder('Description de votre événement...').fill('Anniversaire 30 ans');

    await fillDateField(page, 0, 0, '2027-10-10', '10:00');
    await fillDateField(page, 1, 1, '2027-10-11', '18:00');

    await page.getByRole('button', { name: 'Envoyer la demande' }).click();
    await expect(page.getByText('Merci pour votre demande !')).toBeVisible();
  });

  test('"Faire une autre demande" réinitialise le formulaire', async ({ page }) => {
    await page.route('**/api/reservations', route =>
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ id: 1000, statut: 'EN_ATTENTE' }),
      })
    );

    await page.getByPlaceholder('Ex: Jean Dupont').fill('Test Reset');
    await page.getByPlaceholder('votre@email.com').fill('reset@test.fr');
    await page.getByPlaceholder('06 00 00 00 00').fill('0600000000');
    await page.getByPlaceholder('Description de votre événement...').fill('Test reset');

    await fillDateField(page, 0, 0, '2027-11-15', '09:00');
    await fillDateField(page, 1, 1, '2027-11-16', '20:00');

    await page.getByRole('button', { name: 'Envoyer la demande' }).click();
    await expect(page.getByText('Merci pour votre demande !')).toBeVisible();

    await page.getByRole('button', { name: 'Faire une autre demande' }).click();
    const btn = page.getByRole('button', { name: 'Envoyer la demande' });
    await expect(btn).toBeVisible();
    await expect(btn).toBeDisabled();
  });

});
