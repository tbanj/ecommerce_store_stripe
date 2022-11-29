import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <p class="text-3xl font-bold underline">
      header works!
    </p>
  `,
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
