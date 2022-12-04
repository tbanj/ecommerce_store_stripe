import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from './../../services/cart.service';
import { CartItem } from './../../models/cart.model';

import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [
    {
    product: 'https://via.placeholder.com/150',
    name: 'snickers',
    price: 150,
    quantity: 1,
    id: 1
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 2
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'snickers',
        price: 150,
        quantity: 5,
        id: 3
        },
]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ]

  
  
  constructor(private _cartService: CartService, 
    private _http: HttpClient) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    console.log('cart', this.cart);
    this._cartService.cart.subscribe((_cart: Cart) =>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

    getTotal(items: Array<CartItem>): number {
      return this._cartService.getTotal(items);
    }

    onClearCart() {
      this._cartService.clearCart();
    }

    onRemoveFromCart(item: CartItem): void {
      this._cartService.removeFromCart(item)
    }


    onAddQuantity(item: CartItem): void { 
      this._cartService.addToCart(item)
    }
    // removeFromCart removeItemFromCart
    onRemoveQuantity(item: CartItem): void { 
      this._cartService.removeQuantity(item)
    }

    onCheckout(): void {
      /*  http://localhost:4242/checkout
      https://majastoreserver.mybluemix.net
        process.env.APP_BACKEND_API
      */
     console.warn('onCheckout', process.env['APP_BACKEND_API']);
     
      this._http.post('https://majastoreserver.mybluemix.net',{
        items: this.cart.items
      }).subscribe(async (res: any) => {
        let stripe = await loadStripe("pk_test_51MAzYNLKodB3e6CIAB41CDBgexdhBR0njjJqddCPhURe9DtzRjK6Pc0JzTQJ4BmKUKafEtAc69lFk3O5gJ1tGbbp00nhOqFe6l");
        stripe?.redirectToCheckout({
          sessionId: res.id
        })
      });
    }
}
