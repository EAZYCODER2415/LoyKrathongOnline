import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const preserveDistRiverBackground = () => {
  let customRiverBackground;

  return {
    name: 'preserve-custom-dist-river-background',
    buildStart() {
      const imagePath = path.resolve('dist/images/river_bg.png');

      if (fs.existsSync(imagePath)) {
        customRiverBackground = fs.readFileSync(imagePath);
      }
    },
    closeBundle() {
      if (!customRiverBackground) return;

      const imagePath = path.resolve('dist/images/river_bg.png');
      fs.mkdirSync(path.dirname(imagePath), { recursive: true });
      fs.writeFileSync(imagePath, customRiverBackground);
    }
  };
};

export default defineConfig({
  base: './',
  plugins: [react(), preserveDistRiverBackground()],
  build: {
    emptyOutDir: false
  },
  server: {
    port: 3000
  }
});