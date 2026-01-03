import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus'
})
export class OrderStatusPipe implements PipeTransform {

 transform(value: string): string {
    if (!value) return '';

    switch (value.toLowerCase()) {
      case 'placed':
        return '🟢 Placed';
      case 'shipped':
        return '🟡 Shipped';
      case 'delivered':
        return '✅ Delivered';
      case 'cancelled':
        return '❌ Cancelled';
      default:
        return value;
    }
  }
}
