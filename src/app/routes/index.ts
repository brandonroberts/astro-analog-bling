import type { RouteMeta } from '@analogjs/router';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fetch$ } from '@tanstack/bling';

export const routeMeta: RouteMeta = {
  resolve: {
    loader: () =>
      fetch$(() => {
        console.log("I'm on the server");
        return { count: 5 };
      }),
  },
};

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="card">
      <button type="button" (click)="increment()">Count {{ count }}</button>
    </div>
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
