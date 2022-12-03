import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';


const STORE_BASE_URL = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {
  // sort = new BehaviorSubject<string>('desc');

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(limit = '12', sort ='desc'): Observable<Array<Product>> {
    return this._httpClient.get<Array<Product>>(`${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`)
  }
}
