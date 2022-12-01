import { Component, OnInit } from '@angular/core';
import { Cart } from './models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  template: `
    
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  // title = 'majastore';
  cart: Cart = {items: []}
  
  constructor(private _cartService: CartService) { }

  /* this life cycle will run when the component run for the first time */
  ngOnInit() {
    this._cartService.cart.subscribe((_cart) => this.cart = _cart)
  }
}
