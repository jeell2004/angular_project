import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../interface/productdata';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Productdata {
  constructor(private http: HttpClient, private router: Router) {}
  // addProduct(data:Product){
  //   return this.http.post('http://localhost:3000/product',data,{observe:'response'}).subscribe((result)=>{
  //     this.router.navigate(['seller-add-product'])
  //   });
  // }
  addProduct(data: Product) {
    return this.http.post('http://localhost:3000/Products', data);
  }
  productlist() {
    return this.http.get<Product[]>('http://localhost:3000/Products');
  }
  deleteProduct(id: string) {
    return this.http.delete(`http://localhost:3000/Products/${id}`);
  }
  selectedProduct(id: string) {
    return this.http.get<Product>(`http://localhost:3000/Products/${id}`);
  }
  updateProduct(data: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:3000/Products/${data.id}`, data);
  }

  popularProduct() {
    return this.http.get<Product[]>('http://localhost:3000/Products?_sort=sold&_order=desc&_limit=3');
  }
  treandyProduct() {
    return this.http.get<Product[]>('http://localhost:3000/Products?_sort=createdAt&_order=desc&_limit=8');
  }
  searchProducts(keyword: string) {
    console.log(keyword);
    
    return this.http.get<Product[]>(
      `http://localhost:3000/Products?query=${keyword}`
    );
  }

}
