import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { json, serverFn$ } from '@tanstack/bling';

const sayHello = serverFn$(() => {
  console.log('Hello Angular');
  return json({ test: true });
});

@Component({
  selector: 'analogjs-root',
  standalone: true,
  imports: [JsonPipe],
  template: `
    <p>app works!!</p>

    {{ data | json }}
  `
})
export class AppComponent {
  data = {};

  ngOnInit() {
    sayHello(undefined).then(data => this.data = data);
  }
}