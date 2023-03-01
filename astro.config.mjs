import { defineConfig } from 'astro/config';

// https://astro.build/config
import analogjsangular from "@analogjs/astro-angular";
import start from '@tanstack/bling/vite';

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone"
  }),
  vite: {
    ssr: {
      noExternal: ['@analogjs/**', '@angular/**']
    },
    plugins: [
      {
        ...start(),
        enforce: 'post'
      }
    ]
  },
  integrations: [analogjsangular()],
});