import { CartService } from './../../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id: number]: number} = {1: 400, 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
    
})
export class HomeComponent implements OnInit, OnDestroy {
  cols= 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product>  | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  constructor(private _cartService: CartService, private _storeService:
    StoreService    ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    console.warn('onSortChange', newSort);
    
    this.sort = newSort;
    this.getProducts();
  }

  getProducts(): void { 
    console.warn('getProducts', this.sort);
    
     this.productSubscription = this._storeService.getAllProducts(this.count, this.sort,
      this.category)
      .subscribe((_products) => { this.products = _products; })
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols =  colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols]; 
  }

  onShowCategory(newCategory: string): void{
    this.category = newCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this._cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    })
  }

  onItemsCountChange(newCount: number): void { 
    this.count = newCount.toString();
   this.getProducts();
 }

  
  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  
}
