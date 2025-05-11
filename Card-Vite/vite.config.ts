import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Set base depending on deploy mode
const isDeployToGitHubPages = process.env.GHPAGES === 'true';

export default defineConfig({
  base: isDeployToGitHubPages ? '/Card-Vite/' : '/',
  plugins: [react()],
});
