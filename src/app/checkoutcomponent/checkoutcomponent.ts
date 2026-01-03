import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cartservice } from '../service/cartservice';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkoutcomponent',
  imports: [FormsModule],
  templateUrl: './checkoutcomponent.html',
  styleUrl: './checkoutcomponent.css',
})
export class Checkoutcomponent {
// constructor() {}

//   submitCheckout(form: any) {
//     if (!form.valid) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     const checkoutData = form.value;

//     console.log('Checkout Data:', checkoutData);

//     // Example: send data to server
//     // this.http.post('http://localhost:3000/orders', checkoutData).subscribe(...)

//     // For now, just show a success message
//     alert('Order placed successfully!');

//     // Optional: clear form
//     form.reset();
//   }
// cartItems: any[] = [];
//   totalAmount: number = 0;

//   constructor(private cartService: Cartservice, private http: HttpClient) {
//     // Load cart items
//     this.cartItems = this.cartService.getLocalCart();
//     this.totalAmount = this.cartItems.reduce(
//       (sum, item) => sum + item.price * item.qty,
//       0
//     );
//   }

//   submitCheckout(form: any) {
//     if (!form.valid) {
//       alert('Please fill all required fields.');
//       return;
//     }

//     const checkoutData = {
//       customer: form.value,
//       items: this.cartItems,
//       total: this.totalAmount,
//       date: new Date().toISOString()
//     };

//     // POST to API (JSON server example)
//     this.http.post('http://localhost:3000/orders', checkoutData)
//       .subscribe({
//         next: (res) => {
//           alert('Order placed successfully!');
//           console.log('Order response:', res);

//           // Clear local cart
//           this.cartService.updateLocalCart([]);
//           this.cartItems = [];
//           this.totalAmount = 0;

//           // Reset form
//           form.reset();
//         },
//         error: (err) => {
//           console.error('Failed to place order', err);
//           alert('Something went wrong. Try again!');
//         }
//       });
//   }
  cartItems: any[] = [];
  totalAmount = 0;
  userId!: string;

  constructor(
    private cartService: Cartservice,
    private http: HttpClient
  ) {
    const user = localStorage.getItem('user');
    if (user) {
      this.userId = JSON.parse(user).id;
      this.loadCart();
    }
  }

  loadCart() {
    this.cartService.getUserCart(this.userId).subscribe(res => {
      this.cartItems = res;
      this.totalAmount = this.cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
      );
    });
  }

  submitCheckout(form: any) {
    if (!form.valid) {
      alert('Fill all fields');
      return;
    }

    const orderData = {
      userId: this.userId,
      customer: form.value,
      items: this.cartItems,
      total: this.totalAmount,
      date: new Date().toISOString(),
      status: 'placed'
    };

    this.http.post('http://localhost:3000/orders', orderData)
      .subscribe(() => {
        alert('Order placed successfully');

        // Clear cart from server
        this.cartItems.forEach(item => {
          this.http.delete(`http://localhost:3000/cart/${item.id}`).subscribe();
        });

        this.cartItems = [];
        this.totalAmount = 0;
        form.reset();
      });
  }
}
