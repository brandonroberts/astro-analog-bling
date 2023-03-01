import 'zone.js/node';
import type { APIContext } from 'astro';
import { enableProdMode } from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { provideFileRouter } from '@analogjs/router';
import { withEnabledBlockingInitialNavigation } from '@angular/router';
import { handleEvent, hasHandler } from '@tanstack/bling/server';

import { document } from './root';
import { AppComponent } from './app.component';

if (import.meta.env.PROD) {
  enableProdMode();
}

export const requestHandler = async({ request }: APIContext) => {
  const url = new URL(request.url).pathname;

  if (hasHandler(url)) {
    return handleEvent({
      request,
    });
  }

  const html = await renderApplication(AppComponent, {
    appId: 'analog-bling',
    document: document(),
    url,
    providers: [
      provideFileRouter(withEnabledBlockingInitialNavigation()),
    ],
  });

  return new Response(html, {
    headers: {
      "content-type": "text/html",
    },
  });
}
