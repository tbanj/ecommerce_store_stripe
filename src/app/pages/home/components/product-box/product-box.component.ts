import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  /* to send data from parent component, to child
   component make use of @Output()
   e.g <number> means it will return number data type
  */
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'Snickers',
    price: 150,
    category: 'shoes',
    description: 'description',
    image: 'https://via.placeholder.com/150'
  }

  @Output() addToCart = new EventEmitter();


  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
