// https://astro.build/config
import { defineConfig } from 'astro/config';
import node from "@astrojs/node";

import analog from "@analogjs/astro-angular";
import start from '@tanstack/bling/vite';

import { fileURLToPath } from 'url';

// https://astro.build/config
export function astroBling() {
  let astroConfig;
  return {
    name: '',

    hooks: {
      'astro:config:setup': (config) => {
      },
      'astro:config:done': (config) => {
        astroConfig = config.config
      },
      'astro:build:ssr': (config) => {
        // console.log(astroConfig)
        let entryClient = fileURLToPath(
          new URL('./src/app/main.ts', astroConfig.root),
        );

        (config.manifest)['entry-client'] =
          config.manifest.entryModules[entryClient]
      },
      'astro:build:done': (config) => {},
      'astro:build:setup': (config) => {
        if (config.target === 'client') {
          if (Array.isArray(config.vite.build?.rollupOptions?.input)) {
            config.vite.build?.rollupOptions?.input.push(
              'src/app/main.ts',
            )
          }

          if (config.vite.build) {
            config.vite.build.ssrManifest = true
            config.vite.build.manifest = true
          }
        }
      },
    },
  }
}

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
  integrations: [astroBling(), analog()],
});