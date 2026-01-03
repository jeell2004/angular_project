import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../interface/productdata';
import { AuthService } from './auth';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Cartservice {

  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient, private auth: AuthService) {}

  /* ================= ADD TO CART ================= */
  addToCart(product: Product) {
    if (this.auth.isLoggedIn()) {
      return this.addToCartServer(product);
    } else {
      this.addToCartLocal(product);
      return null;
    }
  }
 deleteCartItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }
  /* ================= LOCAL STORAGE ================= */
  addToCartLocal(product: Product) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find((p: any) => p.id === product.id);

    if (item) item.qty++;
    else cart.push({ ...product, qty: 1 });

    localStorage.setItem('cart', JSON.stringify(cart));
  }

  getLocalCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  }

  updateLocalCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  /* ================= SERVER ================= */
  addToCartServer(product: Product) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.post(this.apiUrl, {
      userId: user.id,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  /* ================= SYNC AFTER LOGIN ================= */
  syncLocalCartToServer(userId: number) {
    const localCart = this.getLocalCart();
    if (!localCart.length) return;

    localCart.forEach((item: any) => {
      this.http.post(this.apiUrl, {
        userId,
        productId: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        qty: item.qty,
      }).subscribe();
    });

    // 🧹 Clear guest cart
    localStorage.removeItem('cart');
  }
  getUserCart(userId: string|number) {
  return this.http.get<any[]>(
    `http://localhost:3000/cart?userId=${userId}`
  );
}

clearUserCart(userId: string) {
  return this.http.delete(`http://localhost:3000/cart/${userId}`);
}

}
