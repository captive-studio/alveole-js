import { defineConfig, devices } from '@playwright/test';
import { currentAllocatedCpus } from '../../scripts/allocated-cpus.mjs';

const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './e2e',
  // Les pages sont servies statiquement : aucun état partagé entre elles, donc rien
  // n'empêche de les auditer en parallèle.
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  // Chaque page du catalogue embarque le bundle complet du design system et s'hydrate
  // avant d'être auditable : plus de 10 s par page quand plusieurs workers se partagent
  // la machine. Le plafond par défaut de 30 s déclenchait des échecs sans rapport avec
  // l'accessibilité.
  timeout: 90_000,
  reporter: process.env.CI ? [['github'], ['list'], ['html', { open: 'never' }]] : [['list']],
  use: {
    baseURL: BASE_URL,
  },
  // Playwright compte ses workers à partir d'`os.cpus()`, qui dans un conteneur rapporte les
  // cœurs du nœud Kubernetes et non ce que le pod peut consommer. Là où un plafond est
  // déclaré on le prend entier, ces suites calculant plus qu'elles n'attendent ; sinon on
  // garde la moitié, comme le défaut de Playwright, parce qu'on partage le nœud.
  workers: currentAllocatedCpus(),
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  // `expo export` produit un site statique : un simple serveur de fichiers suffit, et
  // réutiliser un serveur déjà lancé évite un rebuild à chaque itération en local.
  webServer: {
    command: `npx serve --no-clipboard --single --listen ${PORT} dist`,
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
