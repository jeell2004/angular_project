// import { Component } from '@angular/core';
// import { Product } from '../interface/productdata';
// import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Productdata } from '../service/productdata';
// import { CommonModule } from '@angular/common';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-updateproductdata',
//   imports: [CommonModule, ReactiveFormsModule,],
//   templateUrl: './updateproductdata.html',
//   styleUrl: './updateproductdata.css',
// })
// export class Updateproductdata {
//   productdata : Product| undefined ;
// addproductmessage: string|undefined ;
//   productForm!: FormGroup;
//  productId!: string;
//   message?: string;
//   sizes = ['S', 'M', 'L', 'XL', 'XXL'];
//   colors = ['Red', 'Blue', 'Black', 'White', 'Green'];

//   constructor(private fb: FormBuilder,private product:Productdata,private route : ActivatedRoute) {
//     this.createForm();
//   }
// ngOnInit():void{
//   const id = this.route.snapshot.paramMap.get('id');
// id && this.product.selectedProduct(id).subscribe((result) => {
//   this.productdata = result
//   this.productForm.patchValue(result);
  
// })  
//   // this.product.selectedProduct(id!).subscribe((result) => {
//   //   this.productForm.patchValue(result);
//   // });
// }
//   createForm() {
//     this.productForm = this.fb.group({
//       name: ['', Validators.required],
//       category: ['', Validators.required],
//       subCategory: ['', Validators.required],
//       price: ["", Validators.required],
//       discount: [""],
//       quantity: ["", Validators.required],
//       brand: ['', Validators.required],
//       size: [[]],
//       color: [[]],
//       description: [''],
//       image: ['', Validators.required],
//       status: [true]
//     });
//   }

//   toggleArrayValue(controlName: string, value: string) {
//     const control = this.productForm.get(controlName);
//     const current = control?.value as string[];

//     if (current.includes(value)) {
//       control?.setValue(current.filter(v => v !== value));
//     } else {
//       control?.setValue([...current, value]);
//     }
//   }
// submitProduct(data: Product) {
//   this.product.addProduct(data).subscribe((result) => {
//     if (result) {
//       this.addproductmessage = "Product Added Successfully";

//       this.productForm.reset({
//         status: true,
//         size: [],
//         color: []
//       });
//     }

//     setTimeout(() => {
//       this.addproductmessage = undefined;
//     }, 3000);
//   });
// }
// updateProduct() {
//     const updatedProduct: Product = {
//       id: this.productId, // ✅ FIX: ADD ID MANUALLY
//       ...this.productForm.value,
//     };

//     this.product.updateProduct(updatedProduct).subscribe(() => {
//       this.message = 'Product updated successfully';
//       setTimeout(() => (this.message = undefined), 3000);
//     });
//   }
// // updateproductdata(data:Product){
// //   this.product.updateProduct(data).subscribe((result)=>{
// //     console.log(result);
// //   });
  
// // }
// }
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Productdata } from '../service/productdata';
import { Product } from '../interface/productdata';

@Component({
  selector: 'app-updateproductdata',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './updateproductdata.html',
  styleUrl: './updateproductdata.css',
})
export class Updateproductdata implements OnInit {
  productForm!: FormGroup;
  productId!: string;
  message?: string;

  sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  colors = ['Red', 'Blue', 'Black', 'White', 'Green'];

  constructor(
    private fb: FormBuilder,
    private productService: Productdata,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();

    this.productId = this.route.snapshot.paramMap.get('id')!;

    this.productService.selectedProduct(this.productId).subscribe((res) => {
      this.productForm.patchValue(res);
    });
  }

  createForm() {
    this.productForm = this.fb.group({
      name: [''],
      category: [''],
      subCategory: [''],
      price: [''],
      discount: [''],
      quantity: [''],
      brand: [''],
      size: [[]],
      color: [[]],
      description: [''],
      image: [''],
      status: [true],
    });
  }

  toggleArrayValue(controlName: 'size' | 'color', value: string) {
    const control = this.productForm.get(controlName);
    const current = control?.value || [];

    if (current.includes(value)) {
      control?.setValue(current.filter((v: string) => v !== value));
    } else {
      control?.setValue([...current, value]);
    }
  }

  updateProduct() {
    const updatedProduct: Product = {
      id: this.productId, // ✅ FIX: ADD ID MANUALLY
      ...this.productForm.value,
    };

    this.productService.updateProduct(updatedProduct).subscribe(() => {
      this.message = 'Product updated successfully';
      setTimeout(() => (this.message = undefined), 3000);
    });
  }
}
