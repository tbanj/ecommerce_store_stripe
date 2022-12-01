import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart = new BehaviorSubject<Cart>({items: []});
  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: CartItem): void {
    const items =[...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items});
    this._snackBar.open('Item added to cart', 'Ok', { duration: 3000 });
    console.log(this.cart.value);
    
    
  }

  getTotal(items: Array<CartItem>): number {
    return items
      .map((item)=> item.price * item.quantity)
      .reduce((prev, current)=> prev+ current, 0)
  }
}
