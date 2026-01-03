import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../service/cartservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-component',
  standalone: true,
  imports: [CommonModule],   // ✅ REQUIRED
  templateUrl: './cart-component.html',
  styleUrl: './cart-component.css',
})
export class CartComponent implements OnInit {
cartItems: any[] = [];
  totalAmount = 0;
  isLoggedIn = false;
  userId!: number;

  constructor(private cartService: Cartservice,private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (user) {
      this.isLoggedIn = true;
      this.userId = JSON.parse(user).id;
      this.loadCartFromServer();   // ✅ JSON SERVER
    } else {
      this.loadCartFromLocal();    // ✅ LOCAL STORAGE
    }
  }

  /* ================= LOAD CART ================= */

  loadCartFromLocal() {
    this.cartItems = this.cartService.getLocalCart();
    this.calculateTotal();
  }

  loadCartFromServer() {
    this.cartService.getUserCart(this.userId).subscribe(res => {
      this.cartItems = res;
      this.calculateTotal();
    });
  }

  /* ================= ACTIONS ================= */

  increaseQty(item: any) {
    item.qty++;
    this.updateCart();
  }

  decreaseQty(item: any) {
    if (item.qty > 1) {
      item.qty--;
      this.updateCart();
    }
  }

  // removeItem(item: any) {
  //   this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  //   this.updateCart();
  // }

  updateCart() {
    if (this.isLoggedIn) {
      // ⚠️ JSON Server update optional (PUT/PATCH)
    } else {
      this.cartService.updateLocalCart(this.cartItems);
    }
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalAmount = this.cartItems.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  }
removeItem(item: any) {
  if (this.isLoggedIn) {
    this.cartService.deleteCartItem(item.id).subscribe({
      next: () => {
        // Remove from local array after successful deletion
        this.cartItems = this.cartItems.filter(i => i.id !== item.id);
        this.calculateTotal();
      },
      error: err => {
        console.error('Failed to remove item from server', err);
      }
    });
  } else {
    // Local storage
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.cartService.updateLocalCart(this.cartItems);
    this.calculateTotal();
  }
}
checkout() {
  this.router.navigate(['/checkout']);
}
}
