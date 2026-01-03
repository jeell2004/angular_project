import { Component } from '@angular/core';

import { Product } from '../interface/productdata';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Productdata } from '../service/productdata';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-products-component',
  imports: [NgIf, NgFor,RouterLink],
  templateUrl: './products-component.html',
  styleUrl: './products-component.css',
})
export class ProductsComponent {
products: Product[] = [];
  groupedProducts: { [category: string]: Product[] } = {};
  isLoading = true;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
  this.isLoading = true;

  this.http.get<any[]>('http://localhost:3000/Products')
    .subscribe({
      next: (res) => {
        console.log('Products API Response:', res); // 🔥 DEBUG

        this.products = res || [];
        this.groupProductsByCategory();

        this.isLoading = false;
      },
      error: (err) => {
        console.error('API ERROR:', err);
        this.isLoading = false; // 🔥 VERY IMPORTANT
      }
    });
}



  groupProductsByCategory() {
    this.groupedProducts = this.products.reduce((acc: any, product) => {
      acc[product.category] = acc[product.category] || [];
      acc[product.category].push(product);
      return acc;
    }, {});
  }

  get categories() {
    return Object.keys(this.groupedProducts);
  }

}
