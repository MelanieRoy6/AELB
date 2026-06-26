import { test, expect } from '@playwright/test';

test.describe('Authentification', () => {

  test('login – affiche le formulaire avec le titre "Espace Admin"', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Espace Admin')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Se connecter' })).toBeVisible();
  });

  test('login – bouton désactivé si email ou mot de passe manquant', async ({ page }) => {
    await page.goto('/login');
    const btn = page.getByRole('button', { name: 'Se connecter' });
    // Initialement désactivé (formulaire vide)
    await expect(btn).toBeDisabled();
    // Seulement l'email → toujours désactivé
    await page.fill('input[type="email"]', 'admin@aelb.fr');
    await expect(btn).toBeDisabled();
  });

  test('login – identifiants incorrects affichent "Identifiants invalides"', async ({ page }) => {
    await page.route('**/api/auth/login', route =>
      route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Unauthorized' }),
      })
    );
    await page.goto('/login');
    await page.fill('input[type="email"]', 'faux@test.fr');
    await page.fill('input[type="password"]', 'mauvaismdp');
    await page.getByRole('button', { name: 'Se connecter' }).click();
    await expect(page.getByText('Identifiants invalides')).toBeVisible();
  });

  test('guard – accéder à /admin sans token redirige vers /login', async ({ page }) => {
    await page.goto('/admin');
    await expect(page).toHaveURL(/\/login/);
  });

});
