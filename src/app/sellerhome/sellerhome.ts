import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Productdata } from '../service/productdata';
import { Product } from '../interface/productdata';

@Component({
  selector: 'app-sellerhome',
  imports: [NgFor, NgIf],
  templateUrl: './sellerhome.html',
  styleUrl: './sellerhome.css',
})
export class Sellerhome {
  products: Product[] = [];
  constructor(private product: Productdata) {}
  ngOnInit(): void {
    this.product.productlist().subscribe((result) => {
      // console.log(result);
      this.products = result;
    });
  }
 deleteProduct(id: string) {
  this.product.deleteProduct(id).subscribe((result) => {
    console.log('Deleted:', result);
    this.ngOnInit(); // refresh list
  });
}

  editProduct(id: string) {
    console.log(id);

  }
}
