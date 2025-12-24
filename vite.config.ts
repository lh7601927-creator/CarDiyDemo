import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use relative base path to make the build agnostic to the deployment path.
  // This works for Vercel (root) and GitHub Pages (subdirectory) automatically.
  base: './', 
});