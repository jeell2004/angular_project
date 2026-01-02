import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { Productdata } from '../service/productdata';
import { Product } from '../interface/productdata';
import { ProductList } from '../product-list/product-list';

@Component({
  selector: 'app-homecomponent',
  imports: [NgbCarouselModule,NgFor,NgIf,ProductList],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.css',
})
export class Homecomponent {
popularProduct : undefined | Product[];
  constructor(private product : Productdata) {

  }
  ngOnInit(): void {
    this.product.popularProduct().subscribe((result) => {
      this.popularProduct = result
    })
  }
}
