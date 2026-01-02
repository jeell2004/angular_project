import { Component } from '@angular/core';
import { Product } from '../interface/productdata';
import { Productdata } from '../service/productdata';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  products: Product[] = [];
  isLoading = true;

  wishlist = new Set<string>();

  constructor(private productService: Productdata) {}

  ngOnInit(): void {
    this.productService.treandyProduct().subscribe((res) => {
      this.products = res.filter(p => p.status);
      this.isLoading = false;
    });
  }

  addToCart(product: Product) {
    console.log('Add to cart:', product);
    alert(`${product.name} added to cart`);
  }

  toggleWishlist(product: Product) {
    if (!product.id) return;

    if (this.wishlist.has(product.id)) {
      this.wishlist.delete(product.id);
    } else {
      this.wishlist.add(product.id);
    }
  }

  isWishlisted(product: Product): boolean {
    return product.id ? this.wishlist.has(product.id) : false;
  }
}
