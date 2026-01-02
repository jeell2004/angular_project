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

  // updateProduct( data: Product) {

  //   console.log(data.id);
  //   console.log(data);
    
  //   return this.http.put<Product>(`http://localhost:3000/Products/${data.id}`, data);
  // }
}
