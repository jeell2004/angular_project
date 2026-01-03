import { Component } from '@angular/core';
import { Orders } from '../service/orders';
import { CommonModule } from '@angular/common';
import { RupeePipe } from '../pipe/rupee-pipe';
import { PaymentPipe } from '../pipe/payment-pipe';
import { OrderStatusPipe } from '../pipe/order-status-pipe';

@Component({
  selector: 'app-myordercomponent',
  imports: [OrderStatusPipe,
    PaymentPipe,
    RupeePipe,
CommonModule],
  templateUrl: './myordercomponent.html',
  styleUrl: './myordercomponent.css',
})
export class Myordercomponent {
orders: any[] = [];
  loading = true;

  constructor(private ordersService: Orders) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe({
      next: (res) => {
        this.orders = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load orders', err);
        this.loading = false;
      }
    });
  }
 cancelOrder(orderId: string) {
    const confirmCancel = confirm('Are you sure you want to cancel this order?');

    if (!confirmCancel) return;

    this.ordersService.cancelOrder(orderId).subscribe({
      next: () => {
        alert('Order cancelled successfully');

        // Remove from UI instantly
        this.orders = this.orders.filter(order => order.id !== orderId);
      },
      error: (err) => {
        console.error('Cancel failed', err);
      }
    });
  }
}
