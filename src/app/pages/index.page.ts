import type { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fetch$ } from '@tanstack/bling';

export const routeMeta: RouteMeta = {
  resolve: {
    loader: () => {
      const fetcher = fetch$(() => {
        console.log("I'm on the server");
        return { count: 5 };
      })

      return fetcher();
    }
  },
};

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div>
      <a href="https://analogjs.org/" target="_blank">
        <img alt="Analog Logo" class="logo analog" src="/analog.svg" />
      </a>
    </div>

    <h2>Analog</h2>

    <h3>The fullstack meta-framework for Angular!</h3>

    <div class="card">
      <button type="button" (click)="increment()">Count {{ count }}</button>
    </div>

    <p class="read-the-docs">
      For guides on how to customize this project, visit the
      <a href="https://analogjs.org" target="_blank">Analog documentation</a>
    </p>
  `,
  styles: [
    `
      .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
      }
      .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
      }
      .logo.angular:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
      }
      .read-the-docs {
        color: #888;
      }
    `,
  ],
})
export default class HomeComponent {
  count = 0;
  loader = inject(ActivatedRoute).snapshot.data['loader'];

  ngOnInit() {
    this.count = this.loader.count;
  }

  increment() {
    this.count++;
  }
}
