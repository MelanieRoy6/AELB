import { test, expect, type Page } from '@playwright/test';

/** Injecte un token JWT factice et un login_time valide dans localStorage avant le chargement d'Angular. */
async function loginAsAdmin(page: Page) {
  await page.addInitScript(() => {
    const payload = btoa(JSON.stringify({ sub: 'admin@aelb.fr', roles: ['ADMIN'] }));
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${payload}.fake`;
    localStorage.setItem('token', token);
    localStorage.setItem('login_time', Date.now().toString());
  });
}

/**
 * Retourne un tableau vide pour les GET admin : le service Angular
 * active alors son fallback sur les données mockées intégrées.
 */
async function mockAdminAPIs(page: Page) {
  await page.route('**/api/admin/reservations', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  );
  await page.route('**/api/admin/adherents', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  );
  await page.route('**/api/admin/equipe', route =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '[]' })
  );
}

test.describe('Espace Admin', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
    await mockAdminAPIs(page);
  });

  // ── Dashboard ────────────────────────────────────────────────────────

  test('dashboard – accessible avec un token valide et affiche "Tableau de bord"', async ({ page }) => {
    await page.goto('/admin/accueil');
    await expect(page.getByText('Tableau de bord')).toBeVisible();
  });

  test('dashboard – affiche la date du jour en français', async ({ page }) => {
    await page.goto('/admin/accueil');
    const today = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    await expect(page.locator('.dash-date')).toContainText(today);
  });

  test('dashboard – permet de créer un post-it et l\'affiche', async ({ page }) => {
    await page.goto('/admin/accueil');
    await page.getByRole('button', { name: /nouveau post-it/i }).click();
    await page.locator('textarea[placeholder*="mémo"]').fill('Note de test Playwright');
    await page.getByRole('button', { name: 'Ajouter' }).last().click();
    await expect(page.getByText('Note de test Playwright')).toBeVisible();
  });

  // ── Demandes de réservation ──────────────────────────────────────────

  test('demandes – page accessible avec le titre et les en-têtes du tableau', async ({ page }) => {
    await page.goto('/admin/demandes');
    await expect(page.getByText('Demandes de réservation')).toBeVisible();
    // Le tableau desktop affiche une colonne Demandeur
    await expect(page.getByRole('columnheader', { name: 'Demandeur' }).first()).toBeVisible();
  });

  test('demandes – affiche des réservations EN_ATTENTE depuis les données mockées', async ({ page }) => {
    await page.goto('/admin/demandes');
    // Le service tombe en fallback sur MOCK_RESERVATIONS qui contient des EN_ATTENTE
    // On vérifie qu'au moins un demandeur apparaît dans la liste
    await expect(page.locator('table tbody tr').first()).not.toBeEmpty();
  });

  test('demandes – bouton "Ajouter" ouvre la modal avec son formulaire', async ({ page }) => {
    await page.goto('/admin/demandes');
    await page.getByRole('button', { name: 'Ajouter' }).click();
    await expect(page.getByRole('heading', { name: 'Ajouter une réservation' })).toBeVisible();
    await expect(page.getByLabel('Prénom *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Confirmer la réservation' })).toBeVisible();
  });

  // ── Adhérents ────────────────────────────────────────────────────────

  test('adhérents – page accessible avec sa barre de recherche', async ({ page }) => {
    await page.goto('/admin/adherents');
    await expect(page.getByText('Gestion des adhérents')).toBeVisible();
    await expect(page.getByPlaceholder('Rechercher par nom, prénom, email ou section…')).toBeVisible();
  });

  test('adhérents – la recherche filtre la liste des adhérents', async ({ page }) => {
    await page.goto('/admin/adherents');
    const searchInput = page.getByPlaceholder('Rechercher par nom, prénom, email ou section…');
    // Attend que la liste se charge (au moins une ligne dans le tableau)
    await expect(page.locator('table tbody tr').first()).toBeVisible();
    const totalRows = await page.locator('table.admin-table tbody tr').count();

    // Filtre par nom "Aubert" (présent dans les mock data)
    await searchInput.fill('Aubert');
    const filteredRows = await page.locator('table.admin-table tbody tr').count();
    expect(filteredRows).toBeLessThan(totalRows);
    await expect(page.getByText('Aubert Lucas').first()).toBeVisible();
  });

});
