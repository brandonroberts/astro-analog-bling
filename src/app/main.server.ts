import 'zone.js/node';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import type { APIContext } from 'astro';
// import { provideFileRouter } from '@analogjs/router';
// import { withEnabledBlockingInitialNavigation } from '@angular/router';

import { AppComponent } from './app.component';
import { handleEvent, hasHandler } from '@tanstack/bling/server';

if (import.meta.env.PROD) {
  enableProdMode();
}

const document = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>AnalogApp</title>
      <base href="/" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      <!-- <link rel="icon" type="image/x-icon" href="/src/favicon.ico" /> -->
      <!-- <link href="/src/styles.css" rel="stylesheet" /> -->
    </head>
    <body>
      <analogjs-root></analogjs-root>
      <script type="module" src="/src/app/main.ts"></script>
    </body>
  </html>
`;

export const requestHandler = async({ request }: APIContext) => {
  if (hasHandler(new URL(request.url).pathname)) {
    return handleEvent({
      request,
      // __hasRequest: true,
    });
  }

  const html = await renderApplication(AppComponent, {
    appId: 'analog-bling',
    document,
    url: request.url,
    // providers: [
    //   provideFileRouter(withEnabledBlockingInitialNavigation()),
    // ],
  });

  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}
