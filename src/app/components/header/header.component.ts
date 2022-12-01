import { CartService } from './../../services/cart.service';
import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
   
})
export class HeaderComponent implements OnInit {
  private _cart: Cart = { items: []};
  itemsQuantity= 0;

  @Input() 
  get cart(): Cart { 
    return this._cart; 
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
    .map((item) => item.quantity)
    .reduce((prev, current) => prev+ current,0)
  }

  /*  declaring parameter with private can only be use in this file
  but if we want to access the paramater in html, we wont attach private to it */
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
  }


  getTotal(items: Array<CartItem>): number {
    return this._cartService.getTotal(items);
  }

  onClearCart(): void {
    this._cartService.clearCart();
  }
}
