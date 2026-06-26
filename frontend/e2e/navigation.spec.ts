import { test, expect } from '@playwright/test';

test.describe('Navigation publique', () => {

  test('home – affiche le titre principal H1', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('La Salle Jean-Noël Prin');
  });

  test('home – le bouton "Réserver la salle" est un lien vers /reservation', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByRole('link', { name: /réserver la salle/i }).first();
    await expect(cta).toHaveAttribute('href', '/reservation');
  });

  test('nav – clic sur Évènements navigue vers /evenements', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /évènements/i }).first().click();
    await expect(page).toHaveURL('/evenements');
  });

  test('evenements – affiche au moins une carte d\'animation', async ({ page }) => {
    await page.goto('/evenements');
    await expect(page.getByText('Apéro / Concert')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Vide Grenier' })).toBeVisible();
  });

  test('salle – page accessible et affiche son titre', async ({ page }) => {
    await page.goto('/salle');
    await expect(page.locator('h1')).toContainText('La Salle Jean-Noël Prin');
    await expect(page.getByText('Un équipement polyvalent')).toBeVisible();
  });

});
