import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Change 'autozen' to your GitHub repository name
  // If your repo is https://github.com/user/my-car-app, set this to '/my-car-app/'
  base: '/autozen/', 
});