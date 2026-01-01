import { AuthGuard } from './../auth-guard';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Seller } from '../service/seller';
import { Router, RouterLink } from '@angular/router';
import { login, Sellerdata } from '../interface/sellerdata';

@Component({
  selector: 'app-sellerauthcomponent',
  imports: [FormsModule,NgIf,RouterLink],
  templateUrl: './sellerauthcomponent.html',
  styleUrl: './sellerauthcomponent.css',
})
export class Sellerauthcomponent {
  isloggedin = false;
  loginError = false;
  authErr = "";
  constructor(private seller: Seller,private router:Router) {}
  ngOnInit() {
    this.seller.reloadSeller();
  }
  registerSeller(data: Sellerdata): void {
    this.seller.sellersignup(data);
  }
  openLogin() {
    this.isloggedin = true;
    // this.loginError = false;
  }
  opensignup() {
    this.isloggedin = false;
    // this.loginError = false;
  }
  loginSeller(data: login) {
    console.log(data);
    this.authErr = "";
    
this.seller.loginSeller(data);
this.seller.isLoginErr.subscribe((isError) => {
  if (isError) {
    this.authErr = "Invalid Email or Password";
  }
})
  }
// registerSeller(data: Sellerdata):void {
//   this.seller.sellersignup(data).subscribe((result) => {
//     if (result) {
//      this.router.navigate(['sellerhome'])
//     }
//   });
// }
}
