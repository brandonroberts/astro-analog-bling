import { manifest } from "astro:ssr-manifest";

export const document = () => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>Analog</title>
      <base href="/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <link rel="icon" type="image/x-icon" href="/src/favicon.ico" />
    </head>
    <body>
      <analogjs-root></analogjs-root>
      ${
        import.meta.env.DEV ?
        `<script type="module" src="/src/app/main.ts"></script>` :
        `<script type="module" src=${(manifest as any)['entry-client']}></script>`
      }
    </body>
  </html>
`;