import { Component } from '@angular/core';
import { json, fetch$ } from '@tanstack/bling';
import { JsonPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

const sayHello = fetch$(() => {
  console.log('Hello Angular');
  return json({ test: true });
});

@Component({
  selector: 'analogjs-root',
  standalone: true,
  imports: [JsonPipe, RouterOutlet],
  template: `
    <h2>Analog$ + Bling$</h2>

    {{ data | json }}

    <router-outlet />
  `,
  styles: [
    `
      :host {
        max-width: 1280px;
        margin: 0 auto;
        padding: 2rem;
        text-align: center;
      }
    `,
  ]  
})
export class AppComponent {
  data = {};

  ngOnInit() {
    sayHello(undefined).then(data => this.data = data);
  }
}