import { NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../interface/productdata';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Productdata } from '../service/productdata';

@Component({
  selector: 'app-searchcomponent',
  imports: [NgIf, NgFor,RouterLink],
  templateUrl: './searchcomponent.html',
  styleUrl: './searchcomponent.css',
})
export class Searchcomponent {
constructor(private route: ActivatedRoute, private productService: Productdata) {}
// ngOnInit(): void {
//   let query = this.route.snapshot.paramMap.get('query');
//   console.log(query);
  
// }
searchTerm: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  ngOnInit() {
    // Simulate API fetch
    this.products = [
      {
        "id": "79c0",
        "name": "nike",
        "category": "Shoes",
        "subCategory": "nike-air",
        "price": 10000,
        "discount": 10,
        "quantity": 10,
        "brand": "Nike",
        "size": ["S","L","M","XL","XXL"],
        "color": ["Red","Black","White"],
        "description": "Ahead of its time in '99...",
        "image": "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/ca69368c-012d-4507-9ca8-be4b0ccb92e2/W+NIKE+AIR+MAX+SNDR.png",
        "status": true
      },
      {
        "id": "773d",
        "name": "Sony BRAVIA 2 4K Ultra HD Smart Google LED TV",
        "category": "Electronics",
        "subCategory": "tv",
        "price": 42000,
        "discount": 10,
        "quantity": 5,
        "brand": "Sony",
        "size": [],
        "color": [],
        "description": "Resolution: 4K Ultra HD...",
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSRjse2asgTnZR5sK2nLMxBZv9guk1oQ4ceOfXcnDZeX22rUg9vK9KC4I2X5y0qRzzw4X_D8JdwADnaSE1r4Po7Gx_2HtZHVLh5CBCnkHhqsOnrHGEQ1HvoRw",
        "status": true
      },
      {
        "id": "892a",
        "name": "H&M Men's Regular Fit T-shirt",
        "category": "Clothes",
        "subCategory": "T-shirt",
        "price": 400,
        "discount": 10,
        "quantity": 10,
        "brand": "H&M",
        "size": ["XXL","XL","L","M"],
        "color": ["Blue","Black","White","Green","Red"],
        "description": "H&M Men's Regular Fit T-shirt",
        "image": "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ-Clw15A8w7zbkqj3IgmamkXKAp-mqk5eE2GhT_noTFlwxFnLj20PNRqv1odNMaDTueO-lIETogDzR_n0Gn2jLQKa3Kisndfxp_Lpa1QTZoFKF7sv7W2nCfg",
        "status": true
      },
      // ... add rest of your data
    ];

    // Show all initially
    this.filteredProducts = this.products;
  }

  searchProducts() {
    const term = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.subCategory.toLowerCase().includes(term) ||
      product.brand.toLowerCase().includes(term)
    );
  }

}
