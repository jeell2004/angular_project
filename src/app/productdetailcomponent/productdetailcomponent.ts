import { Component } from '@angular/core';

import { Product } from '../interface/productdata';
import { ActivatedRoute } from '@angular/router';
import { Productdata } from '../service/productdata';
import { NgFor, NgIf } from '@angular/common';
import { Cartservice } from '../service/cartservice';
@Component({
  selector: 'app-productdetailcomponent',
  imports: [NgIf, NgFor],
  templateUrl: './productdetailcomponent.html',
  styleUrl: './productdetailcomponent.css',
})
export class Productdetailcomponent {
product?: Product;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private productService: Productdata,
    private cartService: Cartservice
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.productService.selectedProduct(id).subscribe(res => {
        this.product = res;
        this.isLoading = false;
      });
    }
  }

  addToCart(product: Product) {
  const res = this.cartService.addToCart(product);

  if (res) {
    res.subscribe(() => alert('Added to cart (Server)'));
  } else {
    alert('Added to cart (Local)');
  }
}


}
