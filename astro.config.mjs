import { defineConfig } from 'astro/config';

// https://astro.build/config
import analog from "@analogjs/astro-angular";
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
    optimizeDeps: {
      force: true
    },
    resolve: {
      alias: {
        'zone.js/node': 'zone.js/bundles/zone-node.umd.js'
      }
    },
    ssr: {
      noExternal: ['@analogjs/**', '@angular/**']
    },
    plugins: [
      {
        ...start(),
        enforce: 'post'
      },
      {
        name: 'bling-dynamic-import',
        enforce: 'post',
        transform(code) {
          if (/\.ts\?v=(.*?)\//.test(code)) {
            return {
              code: code.replaceAll(/\.ts\?v=(.*?)\//g, '.tsx/')
            }
          }

          return undefined;
        }
      }
    ]
  },
  integrations: [analog()],
});