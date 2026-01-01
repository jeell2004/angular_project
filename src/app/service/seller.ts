import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, Sellerdata } from '../interface/sellerdata';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Seller {
  issellerloggedin= new BehaviorSubject<boolean>(false)
  isLoginErr = new EventEmitter<boolean>(false)
  constructor(private http:HttpClient , private router:Router) {}
  sellersignup(data:Sellerdata){
    return this.http.post('http://localhost:3000/seller',data,{observe:'response'}).subscribe((result)=>{
      this.issellerloggedin.next(true),
      localStorage.setItem('seller',JSON.stringify(result.body))
      this.router.navigate(['sellerhome'])
    });
  }
  
  loginSeller(data: login) {
  return this.http
    .get<Sellerdata[]>(
      `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
      { observe: 'response' }
    ).subscribe((result) => {
if(result && result.body && result.body.length){
  this.issellerloggedin.next(true)
  localStorage.setItem('seller',JSON.stringify(result.body))
  this.router.navigate(['sellerhome'])
}      else{
        this.isLoginErr.next(true)
}
    });
}
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.issellerloggedin.next(true)
      this.router.navigate(['sellerhome'])
    }
  }
}
