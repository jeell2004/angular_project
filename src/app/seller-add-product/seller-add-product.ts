import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Product } from '../interface/productdata';
import { Productdata } from '../service/productdata';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './seller-add-product.html',
  styleUrls: ['./seller-add-product.css']
})
export class SellerAddProductComponent {
  addproductmessage: string|undefined ;
  productForm!: FormGroup;

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  colors = ['Red', 'Blue', 'Black', 'White', 'Green'];

  constructor(private fb: FormBuilder,private product:Productdata) {
    this.createForm();
  }
ngOnInit():void{}
  createForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', Validators.required],
      price: ["", Validators.required],
      discount: [""],
      quantity: ["", Validators.required],
      brand: ['', Validators.required],
      size: [[]],
      color: [[]],
      description: [''],
      image: ['', Validators.required],
      status: [true]
    });
  }

  toggleArrayValue(controlName: string, value: string) {
    const control = this.productForm.get(controlName);
    const current = control?.value as string[];

    if (current.includes(value)) {
      control?.setValue(current.filter(v => v !== value));
    } else {
      control?.setValue([...current, value]);
    }
  }
submitProduct(data: Product) {
  this.product.addProduct(data).subscribe((result) => {
    if (result) {
      this.addproductmessage = "Product Added Successfully";

      this.productForm.reset({
        status: true,
        size: [],
        color: []
      });
    }

    setTimeout(() => {
      this.addproductmessage = undefined;
    }, 3000);
  });
}

//   submitProduct(data: Product) {
//  this.product.addProduct(data).subscribe((result) => {
//   console.log(result);
//   if(result){
//     this.addproductmessage = "Product Added Successfully";
//   }
//   setTimeout(() => {
//     this.addproductmessage = undefined
//   },3000)
//  });
//   }
}
