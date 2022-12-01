import { CartService } from './../../services/cart.service';
import { CartItem } from './../../models/cart.model';
import { Component, OnInit } from '@angular/core';
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

  
  
  constructor(private _cartService: CartService) { }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
    console.log('cart', this.cart);
  }

    getTotal(items: Array<CartItem>): number {
      return this._cartService.getTotal(items);
    }
}
