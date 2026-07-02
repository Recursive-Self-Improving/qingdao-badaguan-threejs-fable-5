import { defineConfig } from 'vite';

export default defineConfig({
  base: '/qingdao-badaguan-threejs-fable-5/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        textureLab: 'texture-lab.html',
      },
    },
  },
});
