import { defineConfig } from 'vite';

export default defineConfig({
  base: '/qingdao-badaguan-threejs-fable-5-plan-gpt-5-5-impl-attempt-2/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        textureLab: 'texture-lab.html',
      },
    },
  },
});
